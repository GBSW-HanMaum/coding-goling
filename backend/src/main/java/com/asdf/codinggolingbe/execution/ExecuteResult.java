package com.asdf.codinggolingbe.execution;

/**
 * 프론트 pyRunner 의 runResult({ stdout, stderr, timedOut }) 와 같은 모양.
 * 이렇게 맞춰야 grade.ts 의 채점 로직(정규화·비교)을 언어 상관없이 그대로 재사용할 수 있다.
 * compileError 는 컴파일 단계에서 실패했을 때만 채워진다.
 */
public record ExecuteResult(
        String stdout,
        String stderr,
        boolean timedOut,
        String compileError) {

    public static ExecuteResult ok(String stdout, String stderr) {
        return new ExecuteResult(stdout, stderr, false, null);
    }

    public static ExecuteResult timeout() {
        return new ExecuteResult("", "실행 시간이 초과되었습니다.", true, null);
    }

    public static ExecuteResult compileFailed(String message) {
        return new ExecuteResult("", "", false, message);
    }
}
