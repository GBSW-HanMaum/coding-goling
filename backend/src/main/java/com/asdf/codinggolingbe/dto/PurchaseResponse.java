package com.asdf.codinggolingbe.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 구매 결과 — 갱신된 progress 를 그대로 돌려준다 (11번 문서:
 * "refill 같은 특수 action 은 서버가 처리 후 갱신된 progress 반환").
 */
public record PurchaseResponse(
        @JsonProperty("item_id") String itemId,
        ProgressResponse progress) {
}
