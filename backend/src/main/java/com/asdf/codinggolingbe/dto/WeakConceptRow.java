package com.asdf.codinggolingbe.dto;

/** JPQL constructor expression 용 집계 행 (challenge_id 별 시도/오답 수). */
public record WeakConceptRow(String challengeId, long attemptCount, long wrongCount) {
}
