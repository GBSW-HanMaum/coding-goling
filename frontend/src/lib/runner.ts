import type { Language } from "@/data/types";

import { runJavaScript } from "./jsRunner";
import { runPython } from "./pyRunner";
import { runRemote } from "./remoteRunner";

/** 모든 실행기의 공통 반환 형태 (pyRunner 가 원본) */
export type RunResult = {
  stdout: string;
  stderr: string;
  timedOut: boolean;
};

export type Runner = (code: string, stdin?: string) => Promise<RunResult>;

/**
 * 언어별 실행기 선택.
 * - Python: Pyodide (브라우저)
 * - C/Java: 백엔드 Docker 샌드박스
 * (JS 를 추가하면 여기 한 줄 — jsRunner 를 붙이면 된다)
 */
const python: Runner = async (code, stdin) => {
  const r = await runPython(code, stdin ?? "");
  return { stdout: r.stdout, stderr: r.stderr, timedOut: !!r.timedOut };
};

export const runnerFor = (language: Language): Runner => {
  switch (language) {
    case "python":
      return python;
    case "javascript":
      return runJavaScript;
    case "c":
      return runRemote("C");
    case "java":
      return runRemote("JAVA");
  }
};

/** 브라우저에서 바로 실행 가능한 언어인지 (실행 엔진 로딩 UI 판단용) */
export const isClientSide = (language: Language) =>
  language === "python" || language === "javascript";
