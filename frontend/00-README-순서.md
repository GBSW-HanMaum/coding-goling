# 코드런(CodeRun) — Claude Code 작업 지시서 v2 (팀원 프론트 기준)

> ⚠️ 이전 버전(00~08)은 Next.js+Clerk+Drizzle+Docker 기준으로 짠 문서였는데,
> 팀원(재성?)이 이미 **Vite + React SPA**로 완전히 다른, 더 진도 나간 코드를 만들어놨습니다.
> **이 v2 문서 세트를 기준으로 진행하세요. 이전 00~08 문서는 폐기.**

## 지금 코드가 뭘로 되어있나 (실측)
- **Vite + React 18 + TypeScript + Tailwind**, Next.js 아님. 라우팅은 `react-router-dom`.
- 상태관리: **Zustand + persist(localStorage)** — 백엔드/DB/로그인 없음. 새로고침해도 유지되지만 브라우저 로컬에만 저장됨.
- **실행 채점이 이미 진짜로 동작함**: Pyodide(WASM Python)를 Web Worker에서 돌려서 사용자 코드를 실제 실행 → stdout 비교 → 부분 점수까지 계산 (`src/lib/pyRunner.ts`, `src/lib/grade.ts`)
- 코드 에디터: CodeMirror (Python/C 문법 하이라이트 이미 붙어있음)
- 언어는 현재 **Python, C 2개만** 타입에 정의됨 (`src/data/types.ts`의 `Language = "python" | "c"`) — Java/JS 없음
- C는 에디터/문제까지는 있는데 **실제 실행은 스텁**("C 실행 채점은 백엔드 샌드박스 연동 예정" 메시지만 뜸)
- 문제 유형 5종(`SELECT`/`FILL`/`PARSONS`/`BUGFIX`/`WRITE`) 다 구현되어 있고 화면 렌더링/채점 분기까지 완성
- **테스트케이스별 pass/fail + 입력/기대/실제 diff 뷰가 이미 있음** (`CodeChallenge.tsx` 하단) → 우리가 "차별점"이라고 짰던 기능 중 하나가 이미 완성 상태
- 힌트 버튼 있음, 근데 **AI 아니고 정적 텍스트**(문제 데이터에 미리 써둔 `explanation`)를 에너지 1 소모하고 보여주는 것 — AI 실시간 힌트는 아직 없음
- 리더보드/퀘스트/상점 페이지 다 있는데 **전부 목업 데이터** (`src/data/misc.ts`) — 리더보드 라이벌 8명 고정, 퀘스트 5개 고정, 로그인/계정 없어서 "나"는 그냥 게스트
- **온보딩 없음**: 랜딩(`Marketing.tsx`)에서 "시작하기" 누르면 바로 `/learn`으로 감. 언어 선택 화면, 캐릭터 대화형 온보딩, 진단 테스트 다 없음
- 프로필 페이지 없음
- 디자인 시스템은 이미 확정 완료 (듀오링고 팔레트 참고, 브랜드색은 코랄(`#ff6b4a`), 마스코트 이름 "코리") — 07번 문서는 "만들 것"이 아니라 "이미 있는 것" 참고용으로만 사용

## 작업 우선순위 (해커톤 남은 시간 기준)

**1순위 — 없으면 발표가 안 되는 것**
1. `01-onboarding-flow.md` — 언어선택→캐릭터온보딩→진단테스트. 지금 제일 크게 빠진 부분.

**2순위 — 있으면 차별점이 확실히 사는 것**
2. `02-language-expansion.md` — Java/JS 추가 (언어 4개 맞추기로 했으면 필수)
3. `03-execution-backend.md` — C 실제 실행 (지금 스텁 상태인 걸 진짜로)
4. `04-ai-features.md` — AI 힌트(실패 로그 기반) + AI 퀘스트 생성

**3순위 — 시간 남으면**
5. `05-profile-and-stretch.md` — 프로필 페이지, 진짜 백엔드/로그인/리더보드

**참고용 (구현 필요 없음, 확인만)**
- `06-design-system-reference.md` — 이미 구현된 디자인 토큰 정리

## Claude Code에게 던질 첫 프롬프트
```
coding-goling 프로젝트 열어서 npm install && npm run dev 먼저 돌려서 현재 상태 확인해.
docs/ 안의 00번부터 순서대로 읽고, 01-onboarding-flow.md부터 구현 시작해.
기존 Zustand 스토어(useGame)랑 디자인 토큰(coral/feather/macaw 등) 그대로 재사용하고,
새 파일 만들 때도 기존 컴포넌트 스타일(border-2 border-swan, rounded-2xl 등) 따라가.
```
