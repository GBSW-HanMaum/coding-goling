import { create } from "zustand";

import type { Language } from "@/data/types";
import {
  authApi,
  clearToken,
  getToken,
  progressApi,
  setToken,
  type Me,
  type OnboardingSync,
} from "@/lib/api";

import { useGame } from "./useGame";

/**
 * 로그인 상태. 토큰은 localStorage(api.ts)에 두고, 여기서는 유저 정보만 들고 있는다.
 *
 * 온보딩은 "게스트로 먼저 진행 → 회원가입 시점에 서버로 넘기는" 흐름이다.
 * 그래서 signup 이 성공하면 곧바로 useGame 에 쌓인 온보딩 결과를 /onboarding/sync 로 보낸다.
 */

type Status = "loading" | "authed" | "guest";

type AuthState = {
  user: Me | null;
  status: Status;

  /** 앱 시작 시 1회 — 토큰이 있으면 /users/me 로 살아있는 세션인지 확인 */
  bootstrap: () => Promise<void>;
  login: (email: string, password: string) => Promise<Me>;
  signup: (email: string, password: string, nickname: string) => Promise<Me>;
  logout: () => void;
  /** 이미 로그인된 유저가 온보딩을 (다시) 마쳤을 때 서버로 반영 */
  syncOnboarding: () => Promise<Me>;
};

const LANGUAGE_TO_SERVER: Record<Language, string> = {
  python: "PYTHON",
  c: "C",
  java: "JAVA",
  javascript: "JAVASCRIPT",
};

/** useGame 에 쌓인 게스트 온보딩 결과를 서버 요청 형태로 */
const onboardingPayload = (): OnboardingSync => {
  const s = useGame.getState();
  return {
    language: LANGUAGE_TO_SERVER[s.activeCourse],
    learningGoal: s.learningGoal,
    selfReportedLevel: s.selfReportedLevel,
    dailyGoalMinutes: s.dailyGoalMinutes,
    startingUnitId: s.startingUnitId,
    diagnosticScoreRatio: s.diagnosticScoreRatio,
    // 진단으로 건너뛴 레슨들 — 서버는 content.ts 를 모르므로 프론트가 계산해 넘긴다
    completedLessonIds: Object.keys(s.completedLessons).filter(
      (id) => s.completedLessons[id]
    ),
  };
};

/** 서버가 진실 소스 — 로그인/부팅 시 온보딩 완료 여부를 로컬 스토어에 맞춰둔다 */
const applyServerOnboarding = (me: Me) => {
  if (me.onboardingCompleted) {
    useGame.setState({ onboardingCompleted: true });
  }
};

/**
 * 서버의 진행상황으로 로컬 스토어를 덮어쓴다 (09번 문서).
 * persist(localStorage) 는 즉시 렌더용 캐시로 남기되, 시작 시엔 항상 서버값이 이긴다.
 */
const pullProgress = async () => {
  try {
    useGame.getState().hydrate(await progressApi.get());
  } catch (e) {
    console.error("진행상황 불러오기 실패 — 로컬 캐시로 계속합니다", e);
  }
};

export const useAuth = create<AuthState>()((set, get) => ({
  user: null,
  // 토큰이 없으면 확인할 것도 없이 게스트
  status: getToken() ? "loading" : "guest",

  bootstrap: async () => {
    if (!getToken()) {
      set({ status: "guest", user: null });
      return;
    }
    try {
      const me = await authApi.me();
      applyServerOnboarding(me);
      await pullProgress();
      set({ user: me, status: "authed" });
    } catch {
      // 만료/위조 토큰 — api.ts 가 이미 지웠다
      set({ user: null, status: "guest" });
    }
  },

  login: async (email, password) => {
    const result = await authApi.login({ email, password });
    setToken(result.accessToken);
    const me = await authApi.me();
    applyServerOnboarding(me);
    await pullProgress();
    set({ user: me, status: "authed" });
    return me;
  },

  signup: async (email, password, nickname) => {
    const result = await authApi.signup({ email, password, nickname });
    setToken(result.accessToken);

    // 게스트로 온보딩을 마쳤다면 그 결과를 그대로 서버에 넘긴다
    const me = useGame.getState().onboardingCompleted
      ? await authApi.syncOnboarding(onboardingPayload())
      : await authApi.me();

    applyServerOnboarding(me);
    // 가입 시 서버가 만든 초기 진행상황(에너지 25 / 젬 500 …)을 받아온다
    await pullProgress();
    set({ user: me, status: "authed" });
    return me;
  },

  syncOnboarding: async () => {
    const me = await authApi.syncOnboarding(onboardingPayload());
    applyServerOnboarding(me);
    set({ user: me, status: "authed" });
    return me;
  },

  logout: () => {
    clearToken();
    set({ user: null, status: "guest" });
    // 로컬에 남은 진행상황도 정리 (다음 유저가 이어받지 않게)
    useGame.getState().reset();
  },
}));

/** 로그인 여부에 따라 온보딩 완료를 어디로 보낼지 결정 */
export const isLoggedIn = () => !!getToken();
