package com.asdf.codinggolingbe.dto;

/** JPQL constructor expression 용 내부 행 (users + user_progress 조인 결과). */
public record LeaderboardRow(Long userId, String nickname, int xp) {
}
