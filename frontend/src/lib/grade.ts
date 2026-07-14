import type { Language, TestCase } from "@/data/types";

import { runnerFor } from "./runner";

export type TestResult = {
  pass: boolean;
  expected: string;
  got: string;
  stdin?: string;
  hidden?: boolean;
  error?: string;
};

export type GradeResult = {
  passed: number;
  total: number;
  ratio: number; // 부분 점수 (통과 비율)
  correct: boolean; // 전부 통과해야 정답 처리
  results: TestResult[];
  code: string; // 채점한 사용자 코드
};

/** 출력 비교용 정규화: 개행 통일 + 줄 끝 공백 제거 + 끝 개행 제거 */
function norm(s: string): string {
  return s
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.replace(/\s+$/, ""))
    .join("\n")
    .replace(/\n+$/, "");
}

const looksLikeError = (stderr: string) =>
  !!stderr &&
  // Python / C(segfault·gcc) / Java(예외·javac) 진단을 모두 잡는다
  /(Traceback|Error|Exception|초과|Segmentation|fault|error:|core dumped|at Main\.)/.test(
    stderr
  );

/**
 * 실행 기반 채점 — 문자열 정확일치가 아니라, 사용자 코드를 실제로 실행해
 * 각 테스트케이스의 stdout이 기대값과 같은지로 판정한다.
 * 동작이 같은 여러 풀이(x+=1, x=x+1 …)를 모두 정답으로 인정하게 되는 이유.
 * 러너는 언어별로 달라도(Pyodide / Docker) 이 채점 로직은 그대로 재사용된다.
 */
export async function gradeCode(
  code: string,
  testCases: TestCase[],
  language: Language
): Promise<GradeResult> {
  const run = runnerFor(language);
  const results: TestResult[] = [];

  for (const tc of testCases) {
    const { stdout, stderr, timedOut } = await run(code, tc.stdin ?? "");
    const got = norm(stdout);
    const expected = norm(tc.expected);
    const errored = timedOut || looksLikeError(stderr);
    const pass = !errored && got === expected;

    results.push({
      pass,
      expected,
      got,
      stdin: tc.stdin,
      hidden: tc.hidden,
      error: timedOut ? "시간 초과" : looksLikeError(stderr) ? stderr : undefined,
    });
  }

  const passed = results.filter((r) => r.pass).length;
  const total = results.length;

  return {
    passed,
    total,
    ratio: total ? passed / total : 0,
    correct: total > 0 && passed === total,
    results,
    code,
  };
}
