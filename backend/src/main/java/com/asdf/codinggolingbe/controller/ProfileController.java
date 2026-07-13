package com.asdf.codinggolingbe.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asdf.codinggolingbe.common.ApiResponse;
import com.asdf.codinggolingbe.dto.WeakConceptResponse;
import com.asdf.codinggolingbe.service.ProfileService;

import lombok.RequiredArgsConstructor;

/**
 * 화면7(마이페이지) — 11번 문서.
 * 프로필 요약(언어/스트릭/총xp/완료수)은 기존 GET /users/me + GET /progress 로 충분하므로
 * 여기서는 취약 개념만 추가한다.
 */
@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping("/weak-concepts")
    public ApiResponse<List<WeakConceptResponse>> getWeakConcepts(Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        return ApiResponse.success(profileService.getWeakConcepts(userId));
    }
}
