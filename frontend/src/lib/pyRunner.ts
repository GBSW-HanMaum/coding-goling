/**
 * 실행 기반 자동 채점의 핵심 — 브라우저 안에서 진짜 Python을 돌린다.
 *
 * Pyodide(WASM Python)를 Web Worker에서 로드해 사용자 코드를 실제 실행한다.
 * Worker로 격리했기 때문에 무한 루프가 나도 메인 UI는 얼지 않고,
 * 실행 시간이 초과되면 워커를 terminate 해 강제 종료한다.
 * → 계획서의 "샌드박스 + 리소스 리밋" 개념을 프런트에서 축소 구현한 것.
 *   (실서비스에서는 Docker + seccomp + gVisor 백엔드로 대체)
 */

export type RunResult = { stdout: string; stderr: string; timedOut?: boolean };

const WORKER_URL = "/py-worker.js";
const EXEC_TIMEOUT_MS = 8000;

let worker: Worker | null = null;
let readyPromise: Promise<void> | null = null;
let seq = 0;
const pending = new Map<
  number,
  { resolve: (r: RunResult) => void; timer: number }
>();

function spawn(): Worker {
  const w = new Worker(WORKER_URL);
  w.onmessage = (e: MessageEvent) => {
    const data = e.data;
    if (!data || data.type === "ready") return;
    const { id, stdout, stderr } = data;
    const p = pending.get(id);
    if (p) {
      clearTimeout(p.timer);
      pending.delete(id);
      p.resolve({ stdout: stdout ?? "", stderr: stderr ?? "" });
    }
  };
  return w;
}

/** Python 런타임을 미리 로드해 둔다 (레슨 진입 시 워밍업). */
export function initPython(): Promise<void> {
  if (readyPromise) return readyPromise;
  worker = spawn();
  readyPromise = new Promise<void>((resolve) => {
    const onReady = (e: MessageEvent) => {
      if (e.data?.type === "ready") {
        worker?.removeEventListener("message", onReady);
        resolve();
      }
    };
    worker!.addEventListener("message", onReady);
  });
  return readyPromise;
}

/** 사용자 코드를 실행하고 stdout/stderr를 돌려준다. */
export async function runPython(code: string, stdin = ""): Promise<RunResult> {
  await initPython();
  const w = worker!;
  const id = ++seq;
  return new Promise<RunResult>((resolve) => {
    const timer = window.setTimeout(() => {
      pending.delete(id);
      // 폭주하는 실행을 강제 종료하고 엔진을 리셋한다.
      w.terminate();
      worker = null;
      readyPromise = null;
      resolve({
        stdout: "",
        stderr: "⏱ 실행 시간 초과 — 무한 루프이거나 너무 오래 걸립니다.",
        timedOut: true,
      });
    }, EXEC_TIMEOUT_MS);
    pending.set(id, { resolve, timer });
    w.postMessage({ id, code, stdin });
  });
}
