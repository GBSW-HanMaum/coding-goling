package com.asdf.codinggolingbe.dto;

import java.time.LocalDate;
import java.util.List;

import com.asdf.codinggolingbe.domain.UserProgress;
import com.fasterxml.jackson.annotation.JsonProperty;

/** 프론트 useGame 스토어를 그대로 채울 수 있는 형태 (09번 문서). */
public record ProgressResponse(
        int xp,
        int energy,
        int gems,
        @JsonProperty("streak_count") int streakCount,
        @JsonProperty("last_active_date") LocalDate lastActiveDate,
        @JsonProperty("completed_lesson_ids") List<String> completedLessonIds) {

    public static ProgressResponse of(UserProgress progress, List<String> completedLessonIds) {
        return new ProgressResponse(
                progress.getXp(),
                progress.getEnergy(),
                progress.getGems(),
                progress.getStreakCount(),
                progress.getLastActiveDate(),
                completedLessonIds);
    }
}
