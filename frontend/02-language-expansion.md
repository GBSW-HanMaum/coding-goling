# 02. Java / JavaScript 언어 확장

> 지금 `Language = "python" | "c"`만 지원. 4개 언어(C/Python/Java/JS) 맞추려면 이 작업 필요.

## 타입 확장 (`src/data/types.ts`)
```ts
export type Language = "python" | "c" | "java" | "javascript";
```
이 타입 하나 바꾸면 TS가 어디서 분기 누락됐는지 컴파일 에러로 다 잡아줌 — Claude Code에게
"이 타입 바꾸고 나서 뜨는 TS 에러 위치를 전부 따라가서 처리해"라고 지시하면 누락 없이 확장 가능.

## 언어별 실행 채점 전략 (중요 — 언어마다 다르게 가야 함)

| 언어 | 실행 방식 | 구현 난이도 | 비고 |
|---|---|---|---|
| Python | Pyodide (이미 구현됨) | - | 그대로 유지 |
| C | 백엔드 Docker 샌드박스 | 중 | 03번 문서 |
| JavaScript | **브라우저에서 바로 실행 가능** | 낮음 | `Function` 생성자나 격리된 iframe + `postMessage`로 stdout 흉내(console.log 캡처). Web Worker 안에서 실행하면 Pyodide와 동일한 패턴(타임아웃/무한루프 방지)으로 짤 수 있음. **가장 빨리 추가 가능한 언어** |
| Java | 브라우저 실행 불가 (컴파일 필요) | 높음 | 백엔드 Docker 샌드박스 필수 (03번 문서와 동일 서버에 JDK 이미지 추가). 컴파일 시간이 있어서 UX상 "실행 중..." 로딩 상태 필요 |

**추천 순서**: JS부터 먼저 (Pyodide 패턴 그대로 복붙 가능한 수준) → C(백엔드) → Java(백엔드, C 서버에 얹기)

## JS 실행기 구현 가이드 (`src/lib/jsRunner.ts` 신규)
`pyRunner.ts`와 동일한 인터페이스(`runResult = { stdout, stderr, timedOut }`)로 맞춰서
`grade.ts`가 언어 상관없이 재사용되게 설계:
```ts
// public/js-worker.js 신규 — Web Worker 안에서
self.onmessage = (e) => {
  const { id, code } = e.data;
  let stdout = "";
  const fakeConsole = { log: (...args) => (stdout += args.join(" ") + "\n") };
  try {
    new Function("console", code)(fakeConsole);
    self.postMessage({ id, stdout, stderr: "" });
  } catch (err) {
    self.postMessage({ id, stdout, stderr: String(err) });
  }
};
```
- `runJavaScript(code, stdin)` 함수를 `pyRunner.ts` 패턴 그대로 복제해서 만들면 됨 (워커 spawn, 타임아웃 처리 로직 동일)
- `grade.ts`의 `gradeCode`가 현재 `runPython`을 하드코딩해서 부르고 있음 → 언어별 러너를 인자로 받도록 리팩터:
  ```ts
  export async function gradeCode(code: string, testCases: TestCase[], language: Language)
  ```
  내부에서 `language === "python" ? runPython : language === "javascript" ? runJavaScript : runRemote(language, ...)` 분기

## 콘텐츠 추가 (`src/data/content.ts`)
- `python`, `c` Course 객체 옆에 `java`, `javascript` Course 추가
- Java는 초반엔 `WRITE`/`BUGFIX`(실행 채점) 유형 없이 `SELECT`/`FILL`/`PARSONS`만으로 구성해도 됨 (백엔드 준비 전까지 임시)
- `courses` 배열(현재 `python, c`로 export되는 부분 확인 필요)에 새 코스 등록해야 `/learn`의 코스 스위처에 표시됨

## CodeMirror 문법 하이라이트
```bash
npm install @codemirror/lang-java @codemirror/lang-javascript
```
`CodeChallenge.tsx`의 `langExt` 분기에 Java/JS 케이스 추가.

## 온보딩(01번 문서) 언어 선택 카드도 4개로 자동 대응됨 (타입 확장만 하면 카드 목록은 `courses` 배열 기반으로 자동 생성되게 짜는 게 좋음 — 하드코딩 X)
