package com.asdf.codinggolingbe.common;

import lombok.Getter;

/**
 * 도메인 에러 코드. 생성자는 (code, status, message) — 기존 팀 컨벤션 그대로.
 * status 는 HTTP 상태코드(숫자)로 들고 있다가 GlobalExceptionHandler 에서 그대로 내려준다.
 */
@Getter
public enum ErrorCode {

    // 공통
    INVALID_INPUT("E000", 400, "입력값이 올바르지 않습니다."),

    // 인증/유저 (08번 문서)
    EMAIL_ALREADY_EXISTS("E001", 409, "이미 사용 중인 이메일입니다."),
    INVALID_CREDENTIALS("E002", 401, "이메일 또는 비밀번호가 올바르지 않습니다."),
    USER_NOT_FOUND("E003", 404, "사용자를 찾을 수 없습니다."),
    ONBOARDING_ALREADY_COMPLETED("E004", 409, "이미 온보딩이 완료된 계정입니다."),

    // 실행/AI (03·04번 문서)
    EXECUTION_TIMEOUT("E005", 408, "코드 실행 시간이 초과되었습니다."),
    AI_SERVICE_UNAVAILABLE("E006", 503, "AI 서비스에 일시적으로 연결할 수 없습니다."),

    // 인증 토큰
    UNAUTHORIZED("E007", 401, "인증이 필요합니다."),

    // 라우팅
    NOT_FOUND("E008", 404, "요청한 리소스를 찾을 수 없습니다."),
    METHOD_NOT_ALLOWED("E009", 405, "지원하지 않는 HTTP 메서드입니다."),

    // 상점 (11번 문서 화면6)
    SHOP_ITEM_NOT_FOUND("E010", 404, "존재하지 않는 상점 아이템입니다."),
    NOT_ENOUGH_GEMS("E011", 400, "젬이 부족합니다."),

    // 서버
    INTERNAL_ERROR("E999", 500, "서버 오류가 발생했습니다.");

    private final String code;
    private final int status;
    private final String message;

    ErrorCode(String code, int status, String message) {
        this.code = code;
        this.status = status;
        this.message = message;
    }
}
