package com.asdf.codinggolingbe.domain;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 계정 + 온보딩 정보 (schema.sql 의 users 테이블).
 * setter 금지 — 상태 변경은 아래 비즈니스 메서드로만.
 */
@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password; // BCrypt 해시

    @Column(nullable = false, length = 50)
    private String nickname;

    @Enumerated(EnumType.STRING)
    @Column(name = "selected_language", length = 20)
    private Language selectedLanguage; // 온보딩 전엔 null

    @Column(name = "onboarding_completed", nullable = false)
    private boolean onboardingCompleted;

    @Column(name = "learning_goal", length = 100)
    private String learningGoal;

    @Column(name = "self_reported_level", length = 50)
    private String selfReportedLevel;

    @Column(name = "daily_goal_minutes")
    private Integer dailyGoalMinutes;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    private User(String email, String encodedPassword, String nickname) {
        this.email = email;
        this.password = encodedPassword;
        this.nickname = nickname;
        this.onboardingCompleted = false;
    }

    /** 비밀번호는 반드시 인코딩된 값을 받는다 (평문 저장 방지). */
    public static User signup(String email, String encodedPassword, String nickname) {
        return new User(email, encodedPassword, nickname);
    }

    @PrePersist
    void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    /** 온보딩 완료 — 이미 완료된 유저에게 다시 부르면 아무것도 하지 않는다 (idempotent). */
    public void completeOnboarding(
            Language language,
            String learningGoal,
            String selfReportedLevel,
            Integer dailyGoalMinutes) {
        if (this.onboardingCompleted) {
            return;
        }
        this.selectedLanguage = language;
        this.learningGoal = learningGoal;
        this.selfReportedLevel = selfReportedLevel;
        this.dailyGoalMinutes = dailyGoalMinutes;
        this.onboardingCompleted = true;
    }
}
