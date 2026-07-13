package com.asdf.codinggolingbe.common;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import lombok.extern.slf4j.Slf4j;

/** 모든 예외를 ApiResponse.fail 포맷 + ErrorCode 의 HTTP status 로 변환한다. */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ApiResponse<Void>> handleCustom(CustomException e) {
        ErrorCode code = e.getErrorCode();
        log.warn("CustomException: {} - {}", code.getCode(), e.getMessage());
        return ResponseEntity
                .status(code.getStatus())
                .body(ApiResponse.fail(new ErrorResponse(code, e.getMessage())));
    }

    /** @Valid 실패 — 필드별 메시지를 모아서 내려준다. */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidation(MethodArgumentNotValidException e) {
        Map<String, String> fields = new LinkedHashMap<>();
        for (FieldError fe : e.getBindingResult().getFieldErrors()) {
            fields.putIfAbsent(fe.getField(), fe.getDefaultMessage());
        }
        ErrorCode code = ErrorCode.INVALID_INPUT;
        return ResponseEntity
                .status(code.getStatus())
                .body(ApiResponse.fail(new ErrorResponse(code, code.getMessage(), fields)));
    }

    /**
     * 없는 경로 / 허용 안 되는 메서드는 500이 아니라 있는 그대로 404·405로 돌려준다.
     * (아래 캐치올이 이걸 삼켜서 E999로 바꾸면, 오타 난 URL 하나가 서버 장애처럼 보인다.)
     */
    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleNotFound(NoResourceFoundException e) {
        log.warn("No handler for {} {}", e.getHttpMethod(), e.getResourcePath());
        return ResponseEntity
                .status(404)
                .body(ApiResponse.fail(new ErrorResponse(
                        ErrorCode.NOT_FOUND,
                        "존재하지 않는 API 경로입니다: " + e.getResourcePath())));
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ApiResponse<Void>> handleMethodNotAllowed(HttpRequestMethodNotSupportedException e) {
        log.warn("Method not allowed: {}", e.getMessage());
        return ResponseEntity
                .status(405)
                .body(ApiResponse.fail(new ErrorResponse(
                        ErrorCode.METHOD_NOT_ALLOWED,
                        "지원하지 않는 HTTP 메서드입니다: " + e.getMethod())));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleUnexpected(Exception e) {
        log.error("Unhandled exception", e);
        ErrorCode code = ErrorCode.INTERNAL_ERROR;
        return ResponseEntity.status(code.getStatus()).body(ApiResponse.fail(code));
    }
}
