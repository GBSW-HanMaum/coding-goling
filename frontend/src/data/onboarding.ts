import type { Language } from "./types";

/**
 * 온보딩 대화 콘텐츠.
 * Step 3의 "AI 추천 요약"은 MVP에서는 규칙 기반 템플릿으로 만든다.
 * (API 키/백엔드 없이 데모가 되어야 하므로 — 04번 문서에서 실제 AI 호출로 교체)
 */

export type OnboardingOption = {
  id: string;
  emoji: string;
  label: string;
  desc: string;
};

export const LEARNING_GOALS: OnboardingOption[] = [
  { id: "job", emoji: "💼", label: "취업 · 전공 공부", desc: "코딩테스트와 전공 과목을 준비해요" },
  { id: "hobby", emoji: "🎨", label: "취미로", desc: "재미로 뭔가 만들어보고 싶어요" },
  { id: "school", emoji: "🏫", label: "학교 과제", desc: "당장 과제를 해결해야 해요" },
  { id: "career", emoji: "🚀", label: "커리어 전환", desc: "다른 분야에서 개발자로 넘어가요" },
];

export const SELF_LEVELS: OnboardingOption[] = [
  { id: "none", emoji: "🌱", label: "전혀 모름", desc: "처음이에요. 기초부터 알려주세요" },
  { id: "syntax", emoji: "📗", label: "문법만 조금", desc: "본 적은 있는데 직접 짜본 적은 별로 없어요" },
  { id: "project", emoji: "🛠️", label: "프로젝트 경험 있음", desc: "코드를 짜서 뭔가 만들어봤어요" },
];

export const DAILY_GOALS: OnboardingOption[] = [
  { id: "5", emoji: "🐣", label: "하루 5분", desc: "가볍게" },
  { id: "10", emoji: "🐤", label: "하루 10분", desc: "적당히" },
  { id: "15", emoji: "🐥", label: "하루 15분", desc: "진지하게" },
  { id: "20", emoji: "🦅", label: "하루 20분", desc: "빡세게" },
];

export const LANGUAGE_LABEL: Record<Language, string> = {
  python: "파이썬",
  c: "C",
  java: "자바",
  javascript: "자바스크립트",
};

/** 언어별로 "이런 걸 배우게 될 거예요"에 쓸 대표 주제 */
const LANGUAGE_TOPICS: Record<Language, string> = {
  python: "출력과 변수부터 시작해서, 조건문·반복문·리스트까지",
  c: "printf와 자료형에서 시작해서, 포인터와 메모리 관리까지",
  java: "출력과 변수부터 시작해서, 클래스와 객체까지",
  javascript: "console.log와 변수부터 시작해서, 배열·함수·객체까지",
};

const GOAL_LINE: Record<string, string> = {
  job: "코딩테스트에서 자주 나오는 유형 위주로 문제를 골라줄게.",
  hobby: "부담 없이, 짧고 재밌는 문제부터 하나씩 풀어보자.",
  school: "과제에서 바로 써먹을 수 있는 기본기를 빠르게 훑을게.",
  career: "실무에서 쓰이는 코드 읽는 힘부터 차근차근 쌓아보자.",
};

const LEVEL_LINE: Record<string, string> = {
  none: "처음이라고 했으니 개념 하나에 문제 하나씩, 천천히 갈게.",
  syntax: "문법은 봤다고 했으니 눈으로만 알던 걸 직접 돌려보는 데 집중할게.",
  project: "경험이 있으니 기초는 빠르게 넘기고 실행·디버깅 문제를 더 줄게.",
};

/**
 * 1·2번 답변으로 마스코트 대사 2~3줄 생성 (규칙 기반).
 * 04번 문서에서 이 함수 자리에 실제 AI 응답을 끼워넣으면 된다.
 */
export const buildRecommendation = (
  language: Language,
  goalId?: string,
  levelId?: string
): string[] => [
  `${LANGUAGE_LABEL[language]}는 ${LANGUAGE_TOPICS[language]} 배우게 될 거야.`,
  goalId ? GOAL_LINE[goalId] : "",
  levelId ? LEVEL_LINE[levelId] : "",
  "그리고 여기선 코드를 진짜로 실행해서 채점해. 동작만 맞으면 어떻게 짜든 정답이야!",
].filter(Boolean);
