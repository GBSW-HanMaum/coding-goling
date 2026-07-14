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

/**
 * 유저별 퀘스트 (schema.sql 의 quest).
 * 진행률은 goal_value 대비 현재 xp 로 프론트가 계산하므로, 서버는 목표치만 들고 있으면 된다.
 * ai_generated 는 04번 문서의 AI 퀘스트 생성에서 true 로 들어온다.
 */
@Entity
@Table(name = "quest")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Quest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(name = "goal_value", nullable = false)
    private int goalValue;

    @Column(nullable = false)
    private int progress;

    @Column(name = "ai_generated", nullable = false)
    private boolean aiGenerated;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    private Quest(Long userId, String title, int goalValue, boolean aiGenerated, LocalDateTime expiresAt) {
        this.userId = userId;
        this.title = title;
        this.goalValue = goalValue;
        this.aiGenerated = aiGenerated;
        this.expiresAt = expiresAt;
        this.progress = 0;
    }

    /** 회원가입 시 넣어두는 기본 퀘스트 (AI 아님, 만료 없음) */
    public static Quest defaultQuest(Long userId, String title, int goalValue) {
        return new Quest(userId, title, goalValue, false, null);
    }

    @PrePersist
    void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
