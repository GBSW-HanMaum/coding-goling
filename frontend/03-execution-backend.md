# 03. 실행 백엔드 (C / Java 실제 실행)

> 지금 C는 `CodeChallenge.tsx`에서 "C 실행 채점은 백엔드 샌드박스 연동 예정" 메시지만 뜨는 스텁 상태.
> 이걸 실제로 채우는 작업. Python(Pyodide)은 이미 프론트에서 해결됐으니 건드릴 필요 없음.

## 왜 브라우저에서 못 하나
Python은 Pyodide(WASM)가 있어서 브라우저에서 됐지만, C/Java는 컴파일이 필요하고
WASM 컴파일 툴체인을 브라우저에 올리는 건 이 프로젝트 규모에서 비효율적. 별도 서버에서
Docker로 컴파일+실행하는 게 안전하고 빠름.

## 최소 구성 (해커톤 시간 고려한 축소판)
Next.js/Clerk 같은 거 다 필요 없고, **FastAPI(or Express) 서버 1개만** 새로 만들면 됨.

```
execution-server/
  main.py          # FastAPI, POST /execute
  Dockerfile.gcc    # C 컴파일+실행용 이미지
  Dockerfile.java   # Java 컴파일+실행용 이미지 (시간 되면)
```

### `POST /execute` 요청/응답
```json
// 요청
{ "language": "c", "code": "...", "stdin": "..." }

// 응답 (프론트의 GradeResult.results 형태와 맞춰서 grade.ts가 그대로 재사용하게)
{ "stdout": "...", "stderr": "...", "timedOut": false, "compileError": null }
```
→ 프론트의 `runResult` 인터페이스(`{ stdout, stderr, timedOut }`)와 동일하게 맞추면
`grade.ts`에서 `runC(code, stdin)` 함수 하나 추가하는 것만으로 기존 채점 로직 재사용 가능
(`fetch`로 이 API 호출하는 것만 다르고, 정규화/비교 로직은 `grade.ts`에 이미 있는 거 그대로 씀)

## 실행 흐름 (C 기준)
1. 컨테이너에 코드 파일 작성 (`solution.c`)
2. `gcc solution.c -o solution` 컴파일 → 컴파일 에러면 `compileError`로 즉시 반환
3. `./solution < stdin` 실행, 5초 타임아웃
4. stdout/stderr 캡처해서 반환

## 보안 필수 (발표에서 강조 포인트, 계획서 원안 그대로)
- `docker run --network none --memory 128m --cpus 0.5 --read-only --tmpfs /tmp ...`
- 실행 타임아웃 5초, 무한루프 시 컨테이너 kill
- 사용자 코드가 호스트 파일시스템에 절대 접근 못 하게 볼륨 마운트 금지

## 프론트 연동
`src/lib/` 에 `remoteRunner.ts` 추가:
```ts
const EXECUTION_SERVER_URL = import.meta.env.VITE_EXECUTION_SERVER_URL;

export async function runRemote(language: "c" | "java", code: string, stdin = "") {
  const res = await fetch(`${EXECUTION_SERVER_URL}/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ language, code, stdin }),
  });
  return res.json();
}
```
`.env`에 `VITE_EXECUTION_SERVER_URL=http://localhost:8000` 추가 (Vite는 `VITE_` 프리픽스 필수).

`CodeChallenge.tsx`의 `check()` 함수에서 `if (!isPython)` 분기 부분을
"메시지만 반환"하던 걸 → `runRemote` 호출로 교체.

## 배포
- 로컬 데모면 팀원 PC에서 `uvicorn main:app`으로 띄우고 `.env`에 로컬 주소만 넣어도 충분
- 온라인 데모/제출용이면 이 서버만 별도로 EC2나 Fly.io 같은 데 배포 (Next.js 프론트 없이 이 서버 하나만 배포하면 되니 부담 적음)

## 우선순위
C부터 완성 → 시간 남으면 Java용 Dockerfile 추가(같은 서버, `language` 분기만 늘리면 됨)
