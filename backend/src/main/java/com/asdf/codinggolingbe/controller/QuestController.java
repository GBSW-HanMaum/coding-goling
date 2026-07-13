package com.asdf.codinggolingbe.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asdf.codinggolingbe.common.ApiResponse;
import com.asdf.codinggolingbe.dto.QuestResponse;
import com.asdf.codinggolingbe.service.QuestService;

import lombok.RequiredArgsConstructor;

/** 화면5(퀘스트) — 11번 문서. AI 생성(POST /ai/quest)은 04번 문서에서 추가. */
@RestController
@RequestMapping("/api/v1/quests")
@RequiredArgsConstructor
public class QuestController {

    private final QuestService questService;

    @GetMapping
    public ApiResponse<List<QuestResponse>> getQuests(Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        return ApiResponse.success(questService.getQuests(userId));
    }
}
