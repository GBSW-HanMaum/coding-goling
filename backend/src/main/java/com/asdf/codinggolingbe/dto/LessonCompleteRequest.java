package com.asdf.codinggolingbe.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;

/**
 * 레슨 완료 (09번 문서). attempts 는 이 레슨에서 푼 문제별 정답/오답 —
 * 11번 문서대로 challenge_attempt 기록을 레슨완료 API 안에 함께 담는다.
 */
public record LessonCompleteRequest(
        @NotBlank(message = "lessonId 는 필수입니다.")
        String lessonId,
        double scoreRatio,
        int xpEarned,
        int energyDelta,
        /** 레슨 완료 보상 젬 (프론트가 주던 +10) — 서버가 진실 소스이므로 여기서 함께 적립한다 */
        int gemsEarned,
        List<Attempt> attempts) {

    public record Attempt(String challengeId, boolean correct) {
    }
}
