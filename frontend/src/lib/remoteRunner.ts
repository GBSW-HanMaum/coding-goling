import { api } from "./api";
import type { RunResult } from "./runner";

/** 백엔드 POST /execute 응답 (snake_case → api.ts 가 camelCase 로 변환) */
type ExecuteResponse = {
  stdout: string;
  stderr: string;
  timedOut: boolean;
  compileError: string | null;
};

/**
 * C/Java 는 브라우저에서 컴파일할 수 없으므로 백엔드 Docker 샌드박스에서 실행한다 (03번 문서).
 * 반환 형태는 pyRunner 의 RunResult 와 같아서 grade.ts 가 언어 상관없이 재사용한다.
 */
export const runRemote =
  (language: "C" | "JAVA") =>
  async (code: string, stdin = ""): Promise<RunResult> => {
    try {
      const res = await api.post<ExecuteResponse>("/execute", {
        language,
        code,
        stdin,
      });

      // 컴파일 에러는 stderr 로 흘려보내 grade.ts 가 오답으로 처리하게 한다
      if (res.compileError) {
        return { stdout: "", stderr: res.compileError, timedOut: false };
      }
      return { stdout: res.stdout, stderr: res.stderr, timedOut: res.timedOut };
    } catch (e) {
      return {
        stdout: "",
        stderr: e instanceof Error ? e.message : "실행 서버에 연결하지 못했어요.",
        timedOut: false,
      };
    }
  };
