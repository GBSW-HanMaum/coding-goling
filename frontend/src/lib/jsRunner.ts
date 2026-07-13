/**
 * 브라우저에서 JavaScript를 실행한다 (02번 문서).
 *
 * pyRunner와 같은 인터페이스(RunResult)로 맞춰서 grade.ts가 언어 상관없이 재사용한다.
 * JS는 Pyodide 같은 로딩 과정이 없어 훨씬 가볍지만, 무한 루프 격리를 위해
 * Python과 동일하게 Web Worker에서 돌리고 시간 초과 시 워커를 terminate 한다.
 */

import type { RunResult } from "./runner";

const WORKER_URL = "/js-worker.js";
const EXEC_TIMEOUT_MS = 5000;

let worker: Worker | null = null;
let seq = 0;
const pending = new Map<number, { resolve: (r: RunResult) => void; timer: number }>();

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
      p.resolve({ stdout: stdout ?? "", stderr: stderr ?? "", timedOut: false });
    }
  };
  return w;
}

export async function runJavaScript(code: string, stdin = ""): Promise<RunResult> {
  if (!worker) worker = spawn();
  const w = worker;
  const id = ++seq;

  return new Promise<RunResult>((resolve) => {
    const timer = window.setTimeout(() => {
      pending.delete(id);
      // 폭주하는 실행을 강제 종료하고 다음 실행을 위해 새 워커를 띄운다.
      w.terminate();
      worker = null;
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
