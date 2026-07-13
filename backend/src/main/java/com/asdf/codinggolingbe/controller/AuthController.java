package com.asdf.codinggolingbe.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asdf.codinggolingbe.common.ApiResponse;
import com.asdf.codinggolingbe.dto.AuthResponse;
import com.asdf.codinggolingbe.dto.LoginRequest;
import com.asdf.codinggolingbe.dto.OnboardingSyncRequest;
import com.asdf.codinggolingbe.dto.SignupRequest;
import com.asdf.codinggolingbe.dto.UserMeResponse;
import com.asdf.codinggolingbe.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/** 화면1(로그인/회원가입) — 08번 문서. */
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/auth/signup")
    public ApiResponse<AuthResponse> signup(@Valid @RequestBody SignupRequest request) {
        return ApiResponse.success(authService.signup(request), "회원가입이 완료되었습니다.");
    }

    @PostMapping("/auth/login")
    public ApiResponse<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ApiResponse.success(authService.login(request));
    }

    @GetMapping("/users/me")
    public ApiResponse<UserMeResponse> me(Authentication authentication) {
        return ApiResponse.success(authService.getMe(userId(authentication)));
    }

    @PostMapping("/onboarding/sync")
    public ApiResponse<UserMeResponse> syncOnboarding(
            Authentication authentication,
            @Valid @RequestBody OnboardingSyncRequest request) {
        return ApiResponse.success(authService.syncOnboarding(userId(authentication), request));
    }

    /** 07번 컨벤션: userId 는 principal 에서 꺼낸다. */
    private Long userId(Authentication authentication) {
        return (Long) authentication.getPrincipal();
    }
}
