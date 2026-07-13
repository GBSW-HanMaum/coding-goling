package com.asdf.codinggolingbe.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 프론트 Ranker 타입과 매핑 (11번 문서).
 * emoji 는 서버가 주지 않는다 — users 테이블에 emoji 컬럼이 없고, 문서가 허용한 대로
 * 프론트가 닉네임 해시로 붙이면 된다.
 */
public record RankerResponse(
        int rank,
        String nickname,
        int xp,
        @JsonProperty("is_me") boolean isMe) {
}
