package com.asdf.codinggolingbe.security;

import java.io.IOException;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.asdf.codinggolingbe.common.ApiResponse;
import com.asdf.codinggolingbe.common.ErrorCode;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import tools.jackson.databind.ObjectMapper; // Spring Boot 4 는 Jackson 3 (패키지가 tools.jackson.*)

/**
 * 토큰 없이 보호된 경로에 오면 스프링 기본 403 대신 401 + 공통 응답 포맷으로 내려준다.
 * (프론트가 401을 보고 /login 으로 보내야 하는데 403이면 구분이 안 된다.)
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper;

    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException) throws IOException {

        ErrorCode code = ErrorCode.UNAUTHORIZED;
        response.setStatus(code.getStatus());
        response.setContentType("application/json;charset=UTF-8");
        objectMapper.writeValue(response.getWriter(), ApiResponse.fail(code));
    }
}
