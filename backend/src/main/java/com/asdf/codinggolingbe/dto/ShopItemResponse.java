package com.asdf.codinggolingbe.dto;

import com.asdf.codinggolingbe.domain.ShopItem;
import com.fasterxml.jackson.annotation.JsonProperty;

/** 프론트 SHOP_ITEMS 의 ShopItem 타입과 매핑. */
public record ShopItemResponse(
        String id,
        String title,
        String description,
        String emoji,
        @JsonProperty("cost_gems") int costGems,
        String action,
        /** 이미 보유 중인지 (refill 처럼 반복 구매 가능한 건 항상 false 로 두지 않고 그대로 노출) */
        boolean owned) {

    public static ShopItemResponse of(ShopItem item, boolean owned) {
        return new ShopItemResponse(
                item.getId(),
                item.getTitle(),
                item.getDescription(),
                item.getEmoji(),
                item.getCostGems(),
                item.getAction(),
                owned);
    }
}
