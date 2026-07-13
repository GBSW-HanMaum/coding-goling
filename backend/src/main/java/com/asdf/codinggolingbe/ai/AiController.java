package com.asdf.codinggolingbe.ai;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asdf.codinggolingbe.common.ApiResponse;
import com.asdf.codinggolingbe.dto.QuestResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/** 화면3·5 — AI 힌트 / AI 퀘스트 (04번 문서). */
@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    /** 실패 로그 기반 힌트 — 팀원 AI 서버 프록시, 실패 시 정적 폴백 */
    @PostMapping("/hint")
    public ApiResponse<HintResponse> hint(@Valid @RequestBody HintRequest request) {
        return ApiResponse.success(aiService.getHint(request));
    }

    /** AI 퀘스트 생성 — Spring 이 OpenAI 직접 호출, 실패 시 기본 퀘스트 폴백 */
    @PostMapping("/quest")
    public ApiResponse<List<QuestResponse>> quest(
            Authentication authentication,
            @RequestBody(required = false) QuestGenRequest request) {
        Long userId = (Long) authentication.getPrincipal();
        QuestGenRequest req = request != null ? request : new QuestGenRequest(null, null, null);
        return ApiResponse.success(aiService.getOrGenerateQuests(userId, req));
    }
}
