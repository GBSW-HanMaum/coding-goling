package com.asdf.codinggolingbe.dto;

import com.asdf.codinggolingbe.domain.User;
import com.fasterxml.jackson.annotation.JsonProperty;

public record UserMeResponse(
        @JsonProperty("user_id") Long userId,
        String email,
        String nickname,
        @JsonProperty("selected_language") String selectedLanguage,
        @JsonProperty("onboarding_completed") boolean onboardingCompleted,
        @JsonProperty("learning_goal") String learningGoal,
        @JsonProperty("self_reported_level") String selfReportedLevel,
        @JsonProperty("daily_goal_minutes") Integer dailyGoalMinutes) {

    public static UserMeResponse from(User user) {
        return new UserMeResponse(
                user.getId(),
                user.getEmail(),
                user.getNickname(),
                user.getSelectedLanguage() == null ? null : user.getSelectedLanguage().name(),
                user.isOnboardingCompleted(),
                user.getLearningGoal(),
                user.getSelfReportedLevel(),
                user.getDailyGoalMinutes());
    }
}
