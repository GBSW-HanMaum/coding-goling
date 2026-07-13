package com.asdf.codinggolingbe.ai;

import jakarta.validation.constraints.NotBlank;

/**
 * 프론트 → Spring 힌트 요청 (04번 문서).
 * fallbackExplanation 은 content.ts 의 정적 explanation — AI 서버가 죽으면 이걸로 폴백한다.
 */
public record HintRequest(
        @NotBlank(message = "language 는 필수입니다.")
        String language,
        String problemTitle,
        String problemDescription,
        @NotBlank(message = "code 는 필수입니다.")
        String code,
        String errorMessage,
        FailedTestCase failedTestCase,
        String fallbackExplanation) {

    public record FailedTestCase(String input, String expectedOutput, String userOutput) {
    }
}
