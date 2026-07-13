package com.asdf.codinggolingbe.common;

import java.util.Map;

import lombok.Getter;

/** ApiResponse.error 에 실리는 에러 상세. */
@Getter
public class ErrorResponse {

    private final String code;
    private final String message;
    /** 필드 검증 실패 시에만 채워진다 (필드명 → 메시지) */
    private final Map<String, String> fields;

    public ErrorResponse(ErrorCode errorCode) {
        this(errorCode, errorCode.getMessage(), null);
    }

    public ErrorResponse(ErrorCode errorCode, String message) {
        this(errorCode, message, null);
    }

    public ErrorResponse(ErrorCode errorCode, String message, Map<String, String> fields) {
        this.code = errorCode.getCode();
        this.message = message;
        this.fields = fields;
    }
}
