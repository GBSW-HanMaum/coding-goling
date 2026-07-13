package com.asdf.codinggolingbe.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/** 토큰/JSON 필드명은 snake_case (07번 컨벤션). */
public record AuthResponse(
        @JsonProperty("access_token") String accessToken,
        @JsonProperty("user_id") Long userId,
        @JsonProperty("onboarding_completed") boolean onboardingCompleted) {
}
