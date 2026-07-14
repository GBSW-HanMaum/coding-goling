/* 코딩고링 JavaScript 실행 워커 — 사용자 코드를 Web Worker 안에서 실행한다. */
/* Worker로 격리했기 때문에 무한 루프가 나도 메인 UI는 얼지 않고,
   jsRunner가 시간 초과 시 워커를 terminate 해 강제 종료한다. */

self.postMessage({ type: "ready" });

self.onmessage = (e) => {
  const { id, code, stdin } = e.data || {};
  if (id == null) return;

  let stdout = "";
  const write = (args) => {
    stdout += args.map((a) => format(a)).join(" ") + "\n";
  };
  const fakeConsole = {
    log: (...args) => write(args),
    info: (...args) => write(args),
    warn: (...args) => write(args),
    error: (...args) => write(args),
  };

  // stdin을 줄 단위로 소비하는 input() — 파이썬처럼 쓸 수 있게 제공한다.
  const lines = String(stdin ?? "").split("\n");
  let cursor = 0;
  const input = () => (cursor < lines.length ? lines[cursor++] : "");
  const prompt = () => input(); // 브라우저 prompt() 흉내

  try {
    // console/input/prompt 만 주입하고, 나머지 전역(fetch, XMLHttpRequest 등)은
    // Worker 스코프라 접근은 되지만 네트워크는 페이지 CSP에 종속된다.
    const fn = new Function("console", "input", "prompt", code || "");
    fn(fakeConsole, input, prompt);
    self.postMessage({ id, stdout, stderr: "" });
  } catch (err) {
    // stdout은 죽기 직전까지 찍힌 걸 살려서 함께 보낸다
    self.postMessage({ id, stdout, stderr: formatError(err) });
  }
};

/** 값 하나를 사람이 읽을 수 있게 (객체/배열은 JSON, 그 외는 String) */
function format(v) {
  if (typeof v === "string") return v;
  if (v === null) return "null";
  if (v === undefined) return "undefined";
  if (typeof v === "object") {
    try {
      return JSON.stringify(v);
    } catch {
      return String(v);
    }
  }
  return String(v);
}

function formatError(err) {
  if (err instanceof Error) {
    return `${err.name}: ${err.message}`;
  }
  return String(err);
}
