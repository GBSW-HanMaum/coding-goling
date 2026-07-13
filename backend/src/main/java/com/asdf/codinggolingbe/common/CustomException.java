package com.asdf.codinggolingbe.common;

import lombok.Getter;

/**
 * 서비스 레이어에서 던지는 도메인 예외.
 * 예) throw new CustomException(ErrorCode.EMAIL_ALREADY_EXISTS);
 */
@Getter
public class CustomException extends RuntimeException {

    private final ErrorCode errorCode;

    public CustomException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public CustomException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }
}
