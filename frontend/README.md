# 코딩고링 (CodingGoling) — 초안

> 실행 기반 게이미피케이션 코딩 학습 플랫폼 · 팀 **글릭** · 2026 경북 SWgo 해커톤
> 학교 캡스톤용(비상업). UI/디자인은 [duolingo-clone](https://github.com/sanidhyy/duolingo-clone)(MIT)과 듀오링고의 공개 디자인 시스템을 오마주했습니다.

## 이게 뭔가요

듀오링고식 학습 루프를 **코딩**에 적용하되, 기존 코딩 학습 앱의 세 가지 한계를 정면으로 해결하는 것을 목표로 합니다.

| 기존 앱의 문제 | 코딩고링의 해결 |
| --- | --- |
| 복수 정답 중 하나만 인정 | **실행 기반 채점** — 문자열 비교가 아니라 실제 실행 후 테스트케이스 통과로 판정 |
| 정답에도 하트(배터리) 소모 → 이탈 | **에너지** — 정답·오답엔 소모 0, 힌트/AI 튜터에만 사용, 오답 재도전 성공 시 회복 |
| 수준 무관 반복 | (예정) **SRS** 개인화 복습 |

## 초안에서 "진짜" 되는 것 vs 목업

- ✅ **실제 Python 실행 채점** — 브라우저에서 **Pyodide(WASM Python)** 를 **Web Worker**로 돌려 사용자 코드를 진짜 실행하고, 테스트케이스 stdout으로 채점(부분 점수 포함). 무한 루프는 워커 타임아웃으로 강제 종료(계획서의 "샌드박스 + 리소스 리밋"을 프런트에서 축소 구현).
- ✅ 문제 유형 5종: 객관식(출력 예측)·빈칸 채우기·**Parsons**(라인 재배열)·버그 수정·직접 작성
- ✅ 에너지/XP/젬/연속·진행도 저장(localStorage), 학습 경로·레슨·리더보드·퀘스트·상점
- 🚧 **C 트랙 실행 채점** — 초안은 출력 예측/빈칸/재배열 위주. 실제 C 실행은 계획서의 **Docker + seccomp + gVisor 백엔드 샌드박스** 연동 예정
- 🚧 계정/서버 저장/AI 튜터/SRS 엔진 — 예정 (초안은 프런트 단독으로 데모 가능하게 구성)

## 기술 스택

- **Vite + React 18 + TypeScript + Tailwind CSS** (참조 클론의 디자인 시스템을 포팅)
- **Pyodide** (CDN, Web Worker) — 실행 채점 엔진
- **CodeMirror** — 코드 에디터(Python/C 문법 하이라이트)
- **Zustand** (+persist) — 게임 상태 / **React Router** — 라우팅

> 참조 클론은 Next.js + Clerk + Neon + Stripe 풀스택이라 외부 계정 3개가 필요합니다.
> 초안은 데모 문턱을 없애기 위해 **디자인·컴포넌트·레이아웃만 포팅**하고 스택을 경량화했습니다.

## 실행 방법

```bash
npm install
npm run dev      # http://localhost:5173
```

> 첫 코드 작성(WRITE/BUGFIX) 문제 진입 시 Pyodide를 CDN에서 내려받습니다(수 초, 인터넷 필요).

## 폴더 구조

```
src/
  data/         콘텐츠(코스·유닛·레슨·챌린지)와 타입  ← 계획서대로 코드와 분리
  lib/          pyRunner(실행 워커 제어), grade(채점), utils
  store/        useGame — 에너지/XP/젬/진행도 (localStorage)
  components/   Button·Progress·Mascot·Sidebar·레이아웃 등 (듀오링고 UI 포팅)
  pages/        Marketing·Learn·Lesson·Leaderboard·Quests·Shop
    learn/      스킬트리 경로(Unit·UnitBanner·LessonButton)
    lesson/     퀴즈 플로우(Quiz·Header·Footer·challenges/*)
public/
  py-worker.js  Pyodide 실행 워커 (CDN에서 로드)
```

## 콘텐츠 추가하기

`src/data/content.ts` 의 `python` / `c` 코스에 유닛·레슨·챌린지를 추가하면 됩니다.
WRITE/BUGFIX 문제는 `testCases: [{ stdin, expected, hidden? }]` 로 채점 케이스를 정의합니다.
(향후 이 데이터를 JSON/YAML로 분리해 백엔드에서 관리하도록 확장)
