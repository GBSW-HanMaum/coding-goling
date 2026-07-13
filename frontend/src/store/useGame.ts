import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Language } from "@/data/types";
import { getToken, progressApi } from "@/lib/api";

/**
 * 코드런 게임 상태 — 듀오링고와 결정적으로 다른 지점은 "에너지".
 * - 정답/오답으로는 에너지가 줄지 않는다 (하트=배터리 문제 해결).
 * - 에너지는 힌트·해설·AI 튜터 등 '도움 요청'에만 쓴다.
 * - 정답을 맞히면 에너지가 조금씩(랜덤) 충전된다.
 */

export const MAX_ENERGY = 25;

/** 힌트 비용 (요청마다 랜덤) */
export const HINT_COST_MIN = 1;
export const HINT_COST_MAX = 3;

/** 정답 1개당 충전량 (랜덤) */
export const CORRECT_ENERGY_MIN = 1;
export const CORRECT_ENERGY_MAX = 5;

/**
 * 에너지가 변할 때마다 갱신되는 신호 — 배터리 애니메이션과 토스트가 이걸 구독한다.
 * id는 같은 값(+2, +2)이 연속돼도 새 토스트로 인식되게 하려는 것.
 */
export type EnergyPulse = { delta: number; id: number };

let pulseSeq = 0;
const pulse = (delta: number): EnergyPulse => ({ delta, id: ++pulseSeq });

/** 온보딩에서 모은 답변 + 진단 결과 */
export type OnboardingResult = {
  learningGoal?: string;
  selfReportedLevel?: string;
  dailyGoalMinutes?: number;
  startingUnitId?: string;
  /** 진단 정답률 (0~1). 회원가입 시 서버로 넘긴다 */
  diagnosticScoreRatio?: number;
  /** 진단 결과로 건너뛰는 레슨들 — 기존 completedLessons 로직을 그대로 재활용한다 */
  unlockedLessonIds?: string[];
};

type GameState = {
  activeCourse: Language;
  energy: number;
  xp: number;
  gems: number;
  streak: number;
  completedChallenges: Record<string, boolean>;
  completedLessons: Record<string, boolean>;
  usedHints: Record<string, boolean>; // 챌린지별 힌트 사용 여부
  energyPulse: EnergyPulse | null; // 최근 에너지 변동 (애니메이션/토스트용, 저장 안 함)

  onboardingCompleted: boolean;
  learningGoal?: string;
  selfReportedLevel?: string;
  dailyGoalMinutes?: number;
  startingUnitId?: string;
  diagnosticScoreRatio?: number;

  setCourse: (c: Language) => void;
  completeOnboarding: (data: OnboardingResult) => void;
  /** 서버(GET /progress)의 값으로 덮어쓴다 — 진실 소스는 서버 (09번 문서) */
  hydrate: (p: ServerProgress) => void;
  spendEnergy: (n: number) => boolean; // 부족하면 false
  gainEnergy: (n: number) => void;
  addXp: (n: number) => void;
  addGems: (n: number) => void;
  useHint: (challengeId: string) => boolean; // 에너지 1~3 소모하고 힌트 오픈
  completeChallenge: (id: string) => void;
  completeLesson: (id: string) => void;
  reset: () => void;
};

/** GET /progress 응답 중 스토어가 쓰는 부분 */
export type ServerProgress = {
  xp: number;
  energy: number;
  gems: number;
  streakCount: number;
  completedLessonIds: string[];
};

const randomBetween = (min: number, max: number) =>
  min + Math.floor(Math.random() * (max - min + 1));

/**
 * 에너지 변동을 서버에 반영하고, 돌아온 값으로 스토어를 정합화한다.
 * 화면은 이미 낙관적으로 갱신된 뒤이므로 실패해도 흐름을 끊지 않는다 (로그인 전이면 아예 호출 안 함).
 */
const syncEnergy = (delta: number) => {
  if (!getToken()) return;
  progressApi
    .changeEnergy(delta)
    .then((p) => useGame.getState().hydrate(p))
    .catch((e) => console.error("에너지 서버 동기화 실패", e));
};

export const useGame = create<GameState>()(
  persist(
    (set, get) => ({
      activeCourse: "python",
      energy: MAX_ENERGY,
      xp: 0,
      gems: 500,
      streak: 1,
      completedChallenges: {},
      completedLessons: {},
      usedHints: {},
      energyPulse: null,

      onboardingCompleted: false,

      setCourse: (c) => set({ activeCourse: c }),

      hydrate: (p) =>
        set({
          xp: p.xp,
          energy: p.energy,
          gems: p.gems,
          streak: p.streakCount,
          completedLessons: Object.fromEntries(
            p.completedLessonIds.map((id) => [id, true] as const)
          ),
        }),

      completeOnboarding: ({ unlockedLessonIds = [], ...answers }) =>
        set((s) => ({
          ...answers,
          onboardingCompleted: true,
          completedLessons: unlockedLessonIds.reduce(
            (acc, id) => ({ ...acc, [id]: true }),
            s.completedLessons
          ),
        })),

      spendEnergy: (n) => {
        if (get().energy < n) return false;
        set((s) => ({
          energy: Math.max(0, s.energy - n),
          energyPulse: pulse(-n),
        }));
        return true;
      },

      gainEnergy: (n) =>
        set((s) => {
          const next = Math.min(MAX_ENERGY, s.energy + n);
          const gained = next - s.energy; // 상한에 걸리면 실제 충전량만 알린다
          return gained > 0
            ? { energy: next, energyPulse: pulse(gained) }
            : { energy: next };
        }),

      addXp: (n) => set((s) => ({ xp: s.xp + n })),
      addGems: (n) => set((s) => ({ gems: s.gems + n })),

      useHint: (challengeId) => {
        const { usedHints, energy } = get();
        if (usedHints[challengeId]) return true; // 이미 열었으면 무료
        if (energy < HINT_COST_MIN) return false;

        // 비용은 매번 랜덤. 남은 에너지보다 크면 남은 만큼만 받는다
        // (에너지가 1~2 남았을 때 힌트가 영영 안 열리는 상황을 막기 위함)
        const cost = Math.min(randomBetween(HINT_COST_MIN, HINT_COST_MAX), energy);
        syncEnergy(-cost); // 화면은 아래에서 즉시 반영, 서버는 뒤따라 맞춘다
        set((s) => ({
          energy: s.energy - cost,
          energyPulse: pulse(-cost),
          usedHints: { ...s.usedHints, [challengeId]: true },
        }));
        return true;
      },

      completeChallenge: (id) =>
        set((s) => ({
          completedChallenges: { ...s.completedChallenges, [id]: true },
        })),

      completeLesson: (id) =>
        set((s) => ({
          completedLessons: { ...s.completedLessons, [id]: true },
        })),

      reset: () =>
        set({
          energy: MAX_ENERGY,
          xp: 0,
          gems: 500,
          streak: 1,
          completedChallenges: {},
          completedLessons: {},
          usedHints: {},
          energyPulse: null,
          onboardingCompleted: false,
          learningGoal: undefined,
          selfReportedLevel: undefined,
          dailyGoalMinutes: undefined,
          startingUnitId: undefined,
          diagnosticScoreRatio: undefined,
        }),
    }),
    {
      name: "coderun-game",
      // energyPulse는 순간적인 UI 신호라 저장하지 않는다 (새로고침 시 토스트가 다시 뜨면 안 됨)
      partialize: ({ energyPulse: _drop, ...rest }) => rest,
    }
  )
);
