# 01. 온보딩 플로우 (Vite/React 기준)

> 최우선 구현. 지금 `Marketing.tsx`에서 "시작하기" 누르면 바로 `/learn`으로 가는데,
> 그 사이에 이 플로우를 끼워넣는 것.

## 라우팅 변경
`router.tsx`에 새 라우트 추가:
```tsx
{ path: "/onboarding/language", element: <OnboardingLanguage /> },
{ path: "/onboarding/profile", element: <OnboardingProfile /> },
{ path: "/onboarding/diagnostic", element: <OnboardingDiagnostic /> },
```
`Marketing.tsx`의 "시작하기" 버튼 `to="/learn"` → `to="/onboarding/language"`로 변경.
"이미 계정이 있어요"는 계정 시스템이 없으니 그냥 `/learn`으로 유지(온보딩 스킵).

## Zustand 스토어 확장 (`store/useGame.ts`)
현재 `Language = "python" | "c"` 타입에 `activeCourse`, `energy`, `xp`, `gems`, `streak`만 있음.
아래 필드 추가:
```ts
onboardingCompleted: boolean;
learningGoal?: string;        // 온보딩 Step1
selfReportedLevel?: string;   // 온보딩 Step2
dailyGoalMinutes?: number;    // 온보딩 Step3
startingUnitId?: string;      // 진단테스트 결과

completeOnboarding: (data: {...}) => void;
```
`persist` 미들웨어 그대로 쓰면 되고, 초기값 `onboardingCompleted: false`.

`router.tsx` 최상단 또는 `Layout.tsx`에서 `onboardingCompleted === false`면
`/learn` 등 메인 라우트 진입 시 `/onboarding/language`로 리다이렉트.

## Step 1 — 언어 선택 (`OnboardingLanguage.tsx`)
- 카드 4개: Python, C, Java, JS (Java/JS는 02번 문서로 타입 확장 먼저 필요)
- Marketing.tsx의 FEATURES 카드 스타일(`rounded-2xl border-2 border-swan p-5`) 재사용
- 선택 시 `setCourse(lang)` (기존 함수 재사용) + `/onboarding/profile`로 이동

## Step 2 — 캐릭터 온보딩 (`OnboardingProfile.tsx`) — 5단계 대화형
기존 `Mascot` 컴포넌트를 챗봇처럼 말풍선 형태로 배치 (Quiz 완료 화면의 `<Mascot size={130} />` 연출 재사용).
한 화면에 한 질문씩, "다음" 버튼으로 진행(`Footer.tsx`의 버튼 스타일 재사용 가능).

1. **이유**: "왜 {언어}를 배우려고 하나요?" — 객관식 카드 (취업/전공, 취미, 학교 과제, 커리어 전환)
2. **사전 지식**: "{언어}를 얼마나 알고 있나요?" — 객관식 (전혀 모름/문법만 조금/프로젝트 경험 있음)
3. **AI 추천 요약**: 1,2 답변 기반으로 마스코트가 "이런 걸 배우게 될 거예요" 2~3줄 말해줌
   - MVP는 AI 호출 없이 **규칙 기반 템플릿 문장**으로 시작(백엔드/API키 없어도 데모 가능), 04번 문서에서 실제 AI 연동으로 교체
4. **일일 목표**: 5분/10분/15분/20분 카드 선택
5. **시작점**: "기초부터 시작" vs "AI가 내 레벨 찾기" — 전자는 바로 `/learn`, 후자는 `/onboarding/diagnostic`

## Step 3 — 진단 테스트 (`OnboardingDiagnostic.tsx`)
- 기존 `Quiz.tsx` 컴포넌트를 재사용/변형: 별도의 "진단용 챌린지 세트"를 `content.ts`에 추가 (예: `python.diagnosticChallenges`)
- 문제 유형은 `SELECT`(출력예측)와 `PARSONS`(라인재배열) 위주 6~8개, 실행 채점(`WRITE`/`BUGFIX`) 유형은 시간 오래 걸리니 제외 추천
- 채점 후 정답률 계산 → 시작 Unit 결정 (예: 80%+ → 3번째 유닛부터, 50~80% → 2번째, 미만 → 1번째)
- 결과 화면: 기존 `ResultCard`(xp/energy 카드 스타일) 재사용해서 "정답률 X%", "AI가 분석한 시작점: Unit N" 표시
- `completeOnboarding({ startingUnitId, ... })` 호출 → `/learn`으로 이동

## 완료 후 `/learn` 진입 시
- `Learn.tsx`의 `activeIdx` 계산 로직이 이미 `completedLessons` 기준으로 되어있으니,
  진단테스트로 정해진 `startingUnitId` 이전 레슨들을 온보딩 완료 시점에 `completedLessons`에 일괄 표시해주면
  기존 로직 그대로 "시작점부터 열림" 처리 가능 (별도 로직 안 짜도 됨 — 기존 상태 재활용하는 게 핵심)
