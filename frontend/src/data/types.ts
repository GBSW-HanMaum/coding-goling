export type Language = "python" | "c" | "java" | "javascript";

/** 문제가 다루는 개념 — 취약 개념 집계의 단위 */
export type ConceptTag =
  | "output" // 출력
  | "variable" // 변수·자료형
  | "operator" // 연산자
  | "string" // 문자열·인덱싱
  | "condition" // 조건문
  | "loop" // 반복문
  | "list" // 리스트·배열
  | "function" // 함수
  | "pointer" // 포인터
  | "memory" // 메모리 관리
  | "io" // 입력 처리
  | "debug"; // 디버깅

/** 프로필에 보여줄 한국어 라벨 */
export const CONCEPT_LABEL: Record<ConceptTag, string> = {
  output: "출력",
  variable: "변수·자료형",
  operator: "연산자",
  string: "문자열",
  condition: "조건문",
  loop: "반복문",
  list: "리스트·배열",
  function: "함수",
  pointer: "포인터",
  memory: "메모리 관리",
  io: "입력 처리",
  debug: "디버깅",
};

export type ChallengeType =
  | "SELECT" // 객관식 (출력 예측 / 개념)
  | "FILL" // 빈칸 채우기
  | "PARSONS" // 코드 라인 재배열
  | "BUGFIX" // 버그 수정 (실행 채점)
  | "WRITE"; // 직접 작성 (실행 채점)

export type TestCase = {
  stdin?: string;
  expected: string; // 기대 stdout
  hidden?: boolean; // 숨김 케이스 (통과율에는 반영, 내용은 비공개)
};

export type SelectOption = {
  id: string;
  text: string;
  correct: boolean;
  code?: boolean; // 코드 폰트로 표시할지
};

export type Challenge = {
  id: string;
  type: ChallengeType;
  language: Language;
  question: string; // 질문 프롬프트 (텍스트만)
  /** 질문과 함께 보여줄 코드 블록. 질문 문자열을 "\n\n"으로 쪼개던 방식을 대체한다. */
  codeSnippet?: string;
  explanation: string; // 힌트/해설 (에너지 소모하고 열람)
  /**
   * 개념 태그 — 마이페이지의 "취약 개념" 집계에 쓴다 (05번 문서).
   * 서버는 challenge_id 별 오답 수만 주고, 태그 매핑은 이 필드로 프론트가 한다.
   */
  conceptTags?: ConceptTag[];

  // SELECT
  options?: SelectOption[];

  // FILL — code 안의 {{0}}, {{1}} … 을 입력칸으로 렌더
  fillCode?: string;
  fillAnswers?: string[][]; // 칸별 허용 정답들 (복수 정답 인정)

  // PARSONS — 정답 순서대로의 라인들 (내부에서 셔플)
  parsonsLines?: string[];

  // BUGFIX / WRITE — 실제 실행해 채점
  starterCode?: string;
  testCases?: TestCase[];
};

export type Lesson = {
  id: string;
  title: string;
  challenges: Challenge[];
};

export type Unit = {
  id: string;
  order: number;
  title: string;
  description: string;
  lessons: Lesson[];
};

export type Course = {
  id: Language;
  title: string;
  emoji: string;
  description: string;
  units: Unit[];
};
