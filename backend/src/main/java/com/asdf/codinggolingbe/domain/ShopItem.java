package com.asdf.codinggolingbe.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 상점 아이템 마스터 (schema.sql 의 shop_item, 시드로 이미 4건 들어있음).
 * id 는 'refill' 같은 문자열 (프론트 SHOP_ITEMS 의 id 그대로).
 */
@Entity
@Table(name = "shop_item")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ShopItem {

    /** 에너지를 최대치로 채우는 특수 동작 */
    public static final String ACTION_REFILL = "refill";

    @Id
    @Column(length = 50)
    private String id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(length = 10)
    private String emoji;

    @Column(name = "cost_gems", nullable = false)
    private int costGems;

    @Column(length = 30)
    private String action;

    public boolean isRefill() {
        return ACTION_REFILL.equals(action);
    }
}
