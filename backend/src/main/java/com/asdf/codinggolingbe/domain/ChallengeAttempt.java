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
 * 문제별 정답/오답 기록 (schema.sql 의 challenge_attempt).
 * 마이페이지 "취약 개념" 집계에 쓰인다 — challenge_id 는 프론트 content.ts 의 Challenge.id 그대로.
 */
@Entity
@Table(name = "challenge_attempt")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChallengeAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "challenge_id", nullable = false, length = 100)
    private String challengeId;

    @Column(name = "is_correct", nullable = false)
    private boolean correct;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    private ChallengeAttempt(Long userId, String challengeId, boolean correct) {
        this.userId = userId;
        this.challengeId = challengeId;
        this.correct = correct;
    }

    public static ChallengeAttempt of(Long userId, String challengeId, boolean correct) {
        return new ChallengeAttempt(userId, challengeId, correct);
    }

    @PrePersist
    void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
