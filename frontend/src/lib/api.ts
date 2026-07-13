/**
 * 백엔드(CodingGoling-Be) 호출 래퍼.
 *
 * - 공통 응답 포맷 { success, data, message, error } 을 벗겨서 data 만 돌려준다.
 * - 실패하면 ApiError 를 throw (호출부는 try/catch 로만 다루면 된다).
 * - JWT 는 localStorage 에 두고 매 요청 Authorization 헤더에 자동 첨부.
 * - API 경계는 snake_case, 프론트는 camelCase → 여기서 양방향 변환한다.
 */

const BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api/v1";

const TOKEN_KEY = "coderun-token";

/* ------------------------------------------------------------------ 토큰 */

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

/* ------------------------------------------------------------------ 에러 */

/** 백엔드 ErrorCode 와 1:1 (E001 = 이메일 중복 …) */
export class ApiError extends Error {
  constructor(
    readonly code: string,
    message: string,
    readonly status: number,
    /** @Valid 실패 시 필드별 메시지 */
    readonly fields?: Record<string, string>
  ) {
    super(message);
    this.name = "ApiError";
  }

  /** 로그인이 필요하거나 토큰이 만료된 상태 */
  get isUnauthorized() {
    return this.status === 401;
  }
}

/* ------------------------------------------- snake_case ↔ camelCase 변환 */

const toCamel = (s: string) => s.replace(/_([a-z0-9])/g, (_, c) => c.toUpperCase());
const toSnake = (s: string) => s.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);

const convertKeys = (value: unknown, convert: (k: string) => string): unknown => {
  if (Array.isArray(value)) return value.map((v) => convertKeys(v, convert));
  if (value === null || typeof value !== "object") return value;

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([k, v]) => [
      convert(k),
      convertKeys(v, convert),
    ])
  );
};

/* ------------------------------------------------------------------ 요청 */

type ApiEnvelope<T> = {
  success: boolean;
  data: T | null;
  message: string | null;
  error: { code: string; message: string; fields?: Record<string, string> } | null;
};

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  /** 로그인/회원가입처럼 토큰 없이 부르는 요청 */
  auth?: boolean;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, auth = true } = options;

  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";

  const token = getToken();
  if (auth && token) headers.Authorization = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(convertKeys(body, toSnake)),
    });
  } catch {
    // 네트워크 자체가 안 됨 (서버 꺼짐 등) — 응답 포맷이 없으므로 여기서 만들어 던진다
    throw new ApiError("NETWORK", "서버에 연결할 수 없어요.", 0);
  }

  const envelope = (await res.json().catch(() => null)) as ApiEnvelope<unknown> | null;

  if (!res.ok || !envelope?.success) {
    const error = envelope?.error;
    // 토큰이 만료/위조면 들고 있어봐야 쓸모없다 — 버리고 호출부가 /login 으로 보내게 한다
    if (res.status === 401) clearToken();
    throw new ApiError(
      error?.code ?? "UNKNOWN",
      error?.message ?? "알 수 없는 오류가 발생했어요.",
      res.status,
      error?.fields
    );
  }

  return convertKeys(envelope.data, toCamel) as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) => request<T>(path, { method: "POST", body }),
  /** 토큰 없이 (로그인/회원가입) */
  postPublic: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body, auth: false }),
};

/* ------------------------------------------------- 백엔드 응답 타입 (camelCase) */

export type AuthResult = {
  accessToken: string;
  userId: number;
  onboardingCompleted: boolean;
};

export type Me = {
  userId: number;
  email: string;
  nickname: string;
  selectedLanguage: string | null;
  onboardingCompleted: boolean;
  learningGoal: string | null;
  selfReportedLevel: string | null;
  dailyGoalMinutes: number | null;
};

export type Progress = {
  xp: number;
  energy: number;
  gems: number;
  streakCount: number;
  lastActiveDate: string | null;
  completedLessonIds: string[];
};

export type Ranker = {
  rank: number;
  nickname: string;
  xp: number;
  isMe: boolean;
};

export type Quest = {
  id: number;
  title: string;
  goalValue: number;
  progress: number;
  completed: boolean;
  aiGenerated: boolean;
};

export type ShopItem = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  costGems: number;
  action: string | null;
  owned: boolean;
};

export type Purchase = { itemId: string; progress: Progress };

export type WeakConcept = {
  challengeId: string;
  attemptCount: number;
  wrongCount: number;
  accuracy: number;
};

/** 온보딩 결과 — 게스트로 진행한 뒤 회원가입 직후 1회 서버에 넘긴다 */
export type OnboardingSync = {
  language: string; // "PYTHON" | "C" | ...
  learningGoal?: string;
  selfReportedLevel?: string;
  dailyGoalMinutes?: number;
  startingUnitId?: string;
  diagnosticScoreRatio?: number;
  completedLessonIds?: string[];
};

export type LessonComplete = {
  lessonId: string;
  scoreRatio: number;
  xpEarned: number;
  gemsEarned: number;
  energyDelta: number;
  attempts?: { challengeId: string; correct: boolean }[];
};

/* ------------------------------------------------------------ 엔드포인트 */

export const authApi = {
  signup: (body: { email: string; password: string; nickname: string }) =>
    api.postPublic<AuthResult>("/auth/signup", body),
  login: (body: { email: string; password: string }) =>
    api.postPublic<AuthResult>("/auth/login", body),
  me: () => api.get<Me>("/users/me"),
  syncOnboarding: (body: OnboardingSync) => api.post<Me>("/onboarding/sync", body),
};

export const progressApi = {
  get: () => api.get<Progress>("/progress"),
  completeLesson: (body: LessonComplete) =>
    api.post<Progress>("/progress/lesson-complete", body),
  changeEnergy: (delta: number) => api.post<Progress>("/progress/energy", { delta }),
};

export const leaderboardApi = {
  get: () => api.get<Ranker[]>("/leaderboard"),
};

export const questApi = {
  list: () => api.get<Quest[]>("/quests"),
};

export const shopApi = {
  items: () => api.get<ShopItem[]>("/shop/items"),
  inventory: () => api.get<ShopItem[]>("/shop/inventory"),
  purchase: (itemId: string) => api.post<Purchase>("/shop/purchase", { itemId }),
};

export const profileApi = {
  weakConcepts: () => api.get<WeakConcept[]>("/profile/weak-concepts"),
};

export type AiHint = {
  hint: string;
  conceptsToReview: string[];
  /** "ai" = AI 서버가 생성, "static" = 폴백(정적 힌트) */
  source: "ai" | "static";
};

export type AiHintRequest = {
  language: string;
  problemTitle?: string;
  problemDescription?: string;
  code: string;
  errorMessage?: string;
  failedTestCase?: { input: string; expectedOutput: string; userOutput: string };
  /** AI 서버가 죽었을 때 폴백으로 쓸 정적 힌트 (content.ts 의 explanation) */
  fallbackExplanation?: string;
};

export const aiApi = {
  hint: (body: AiHintRequest) => api.post<AiHint>("/ai/hint", body),
  quest: (body?: { xp?: number; streak?: number; recentAccuracy?: number }) =>
    api.post<Quest[]>("/ai/quest", body ?? {}),
};
