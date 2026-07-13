package com.asdf.codinggolingbe.dto;

import com.asdf.codinggolingbe.domain.Quest;
import com.fasterxml.jackson.annotation.JsonProperty;

/** 프론트 QUESTS 목업(title/value)과 매핑. progress 는 현재 xp 기준으로 서버가 채워준다. */
public record QuestResponse(
        Long id,
        String title,
        @JsonProperty("goal_value") int goalValue,
        int progress,
        boolean completed,
        @JsonProperty("ai_generated") boolean aiGenerated) {

    public static QuestResponse of(Quest quest, int currentXp) {
        int progress = Math.min(currentXp, quest.getGoalValue());
        return new QuestResponse(
                quest.getId(),
                quest.getTitle(),
                quest.getGoalValue(),
                progress,
                progress >= quest.getGoalValue(),
                quest.isAiGenerated());
    }
}
