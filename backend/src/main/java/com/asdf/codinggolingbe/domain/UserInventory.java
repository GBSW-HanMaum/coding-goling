package com.asdf.codinggolingbe.domain;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/** 유저가 구매/보유한 아이템 (schema.sql 의 user_inventory). */
@Entity
@Table(name = "user_inventory")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserInventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "shop_item_id", nullable = false, length = 50)
    private String shopItemId;

    @Column(name = "acquired_at", nullable = false)
    private LocalDateTime acquiredAt;

    private UserInventory(Long userId, String shopItemId) {
        this.userId = userId;
        this.shopItemId = shopItemId;
    }

    public static UserInventory of(Long userId, String shopItemId) {
        return new UserInventory(userId, shopItemId);
    }

    @PrePersist
    void onCreate() {
        this.acquiredAt = LocalDateTime.now();
    }
}
