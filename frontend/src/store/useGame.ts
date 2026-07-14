import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Language } from "@/data/types";
import { getToken, progressApi } from "@/lib/api";

/**
 * 코드런 게임 상태 — 에너지(배터리)가 핵심.
 * - 오답을 내면 에너지가 1씩 줄어든다.
 * - 정답을 3번 연속으로 맞히면(스트릭) 에너지가 랜덤 1~5 충전된다 (최대치는 못 넘음).
 * - 힌트·해설 등 '도움 요청'에도 에너지를 쓴다.
 */

export const MAX_ENERGY = 25;

/** 힌트 비용 (요청마다 랜덤) */
export const HINT_COST_MIN = 1;
export const HINT_COST_MAX = 3;

/** 오답 1개당 에너지 감소량 */
export const WRONG_ANSWER_PENALTY = 1;

/** 이만큼 연속으로 맞히면 보너스 충전 */
export const CORRECT_STREAK_TARGET = 3;

/** 스트릭 보너스 충전량 (랜덤) */
export const STREAK_BONUS_MIN = 1;
export const STREAK_BONUS_MAX = 5;

/**
 * 에너지가 변할 때마다 갱신되는 신호 — 배터리 애니메이션과 토스트가 이걸 구독한다.
 * id는 같은 값(+2, +2)이 연속돼도 새 토스트로 인식되게 하려는 것.
 */
export type EnergyPulse = { delta: number; id: number };

/** 애니메이션이 다 끝날 만큼 지나면 스토어에서 지운다 — EnergyToast/EnergyBattery의
 * lastPulseId 는 컴포넌트별 useRef라 리마운트(레이아웃↔레슨 이동 등) 시 초기화되는데,
 * 지우지 않으면 리마운트 때마다 옛 pulse를 "방금 일어난 일"로 착각해 토스트가 다시 뜬다. */
const PULSE_CLEAR_MS = 2200;

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
  correctStreak: number; // 현재까지 연속으로 맞힌 문제 수 (3이 되면 보너스 충전 후 0으로 리셋)
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
  /** 정답 처리 — 연속 정답 카운트를 올리고, 3번째마다 에너지를 랜덤 충전한다. 실제로 충전된 양(0일 수도)을 돌려준다 */
  recordCorrectAnswer: () => number;
  /** 오답 처리 — 연속 정답 카운트를 끊고 에너지를 1 깎는다. 실제로 줄어든 양(음수, 0일 수도)을 돌려준다 */
  recordWrongAnswer: () => number;
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
    (set, get) => {
      /** pulse를 쏘고, 그 pulse가 여전히 최신이면 잠시 뒤 스스로 지운다 (더 새 pulse가 이미 왔으면 안 지움). */
      const firePulse = (delta: number): EnergyPulse => {
        const p = pulse(delta);
        setTimeout(() => {
          if (get().energyPulse?.id === p.id) set({ energyPulse: null });
        }, PULSE_CLEAR_MS);
        return p;
      };

      return {
        activeCourse: "python",
        energy: MAX_ENERGY,
        xp: 0,
        gems: 500,
        streak: 1,
        correctStreak: 0,
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
            energyPulse: firePulse(-n),
          }));
          return true;
        },

        gainEnergy: (n) =>
          set((s) => {
            const next = Math.min(MAX_ENERGY, s.energy + n);
            const gained = next - s.energy; // 상한에 걸리면 실제 충전량만 알린다
            return gained > 0
              ? { energy: next, energyPulse: firePulse(gained) }
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
            energyPulse: firePulse(-cost),
            usedHints: { ...s.usedHints, [challengeId]: true },
          }));
          return true;
        },

        recordCorrectAnswer: () => {
          const s = get();
          const nextStreak = s.correctStreak + 1;
          if (nextStreak < CORRECT_STREAK_TARGET) {
            set({ correctStreak: nextStreak });
            return 0;
          }
          const bonus = randomBetween(STREAK_BONUS_MIN, STREAK_BONUS_MAX);
          const nextEnergy = Math.min(MAX_ENERGY, s.energy + bonus);
          const gained = nextEnergy - s.energy; // 상한에 걸리면 실제 충전량만
          set({
            correctStreak: 0,
            energy: nextEnergy,
            ...(gained > 0 ? { energyPulse: firePulse(gained) } : {}),
          });
          return gained;
        },

        recordWrongAnswer: () => {
          const s = get();
          const nextEnergy = Math.max(0, s.energy - WRONG_ANSWER_PENALTY);
          const lost = nextEnergy - s.energy; // 이미 0이면 0
          set({
            correctStreak: 0,
            energy: nextEnergy,
            ...(lost < 0 ? { energyPulse: firePulse(lost) } : {}),
          });
          return lost;
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
            correctStreak: 0,
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
      };
    },
    {
      name: "coderun-game",
      // energyPulse는 순간적인 UI 신호라 저장하지 않는다 (새로고침 시 토스트가 다시 뜨면 안 됨)
      partialize: ({ energyPulse: _drop, ...rest }) => rest,
    }
  )
);
