package com.asdf.codinggolingbe.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 취약 문제 (11번 문서 화면7).
 * 프론트는 challenge_id 로 content.ts 의 conceptTags 를 찾아 "반복문에서 자주 틀려요" 같은 문구를 만든다.
 */
public record WeakConceptResponse(
        @JsonProperty("challenge_id") String challengeId,
        @JsonProperty("attempt_count") long attemptCount,
        @JsonProperty("wrong_count") long wrongCount,
        double accuracy) {

    public static WeakConceptResponse from(WeakConceptRow row) {
        double accuracy = row.attemptCount() == 0
                ? 0.0
                : (double) (row.attemptCount() - row.wrongCount()) / row.attemptCount();
        return new WeakConceptResponse(
                row.challengeId(),
                row.attemptCount(),
                row.wrongCount(),
                Math.round(accuracy * 100) / 100.0);
    }
}
