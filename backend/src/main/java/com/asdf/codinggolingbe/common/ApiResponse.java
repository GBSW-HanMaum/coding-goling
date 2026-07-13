package com.asdf.codinggolingbe.common;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;

/**
 * 모든 API 의 공통 응답 포맷 — { success, data, message, error }.
 * 생성자는 private, 아래 정적 팩토리로만 만든다.
 */
@Getter
@JsonInclude(JsonInclude.Include.ALWAYS)
public class ApiResponse<T> {

    private final boolean success;
    private final T data;
    private final String message;
    private final ErrorResponse error;

    private ApiResponse(boolean success, T data, String message, ErrorResponse error) {
        this.success = success;
        this.data = data;
        this.message = message;
        this.error = error;
    }

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, data, null, null);
    }

    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>(true, data, message, null);
    }

    public static <T> ApiResponse<T> fail(ErrorCode errorCode) {
        return new ApiResponse<>(false, null, null, new ErrorResponse(errorCode));
    }

    public static <T> ApiResponse<T> fail(ErrorResponse error) {
        return new ApiResponse<>(false, null, null, error);
    }
}
