package com.asdf.codinggolingbe.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asdf.codinggolingbe.common.ApiResponse;
import com.asdf.codinggolingbe.dto.EnergyRequest;
import com.asdf.codinggolingbe.dto.LessonCompleteRequest;
import com.asdf.codinggolingbe.dto.ProgressResponse;
import com.asdf.codinggolingbe.service.ProgressService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/** 화면2·3(학습 홈/레슨 풀이) — 09번 문서. */
@RestController
@RequestMapping("/api/v1/progress")
@RequiredArgsConstructor
public class ProgressController {

    private final ProgressService progressService;

    @GetMapping
    public ApiResponse<ProgressResponse> getProgress(Authentication authentication) {
        return ApiResponse.success(progressService.getProgress(userId(authentication)));
    }

    @PostMapping("/lesson-complete")
    public ApiResponse<ProgressResponse> completeLesson(
            Authentication authentication,
            @Valid @RequestBody LessonCompleteRequest request) {
        return ApiResponse.success(progressService.completeLesson(userId(authentication), request));
    }

    @PostMapping("/energy")
    public ApiResponse<ProgressResponse> changeEnergy(
            Authentication authentication,
            @Valid @RequestBody EnergyRequest request) {
        return ApiResponse.success(progressService.changeEnergy(userId(authentication), request));
    }

    private Long userId(Authentication authentication) {
        return (Long) authentication.getPrincipal();
    }
}
