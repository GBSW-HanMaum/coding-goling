package com.asdf.codinggolingbe.execution;

import com.asdf.codinggolingbe.domain.Language;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/** POST /execute (03번 문서) */
public record ExecuteRequest(
        @NotNull(message = "language 는 필수입니다.")
        Language language,

        @NotBlank(message = "code 는 필수입니다.")
        String code,

        String stdin) {

    public String stdinOrEmpty() {
        return stdin == null ? "" : stdin;
    }
}
