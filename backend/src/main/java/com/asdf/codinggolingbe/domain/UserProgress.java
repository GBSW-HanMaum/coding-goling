package com.asdf.codinggolingbe.domain;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 유저 1명당 1행 (schema.sql 의 user_progress).
 * 회원가입 시점에 프론트 초기값(xp 0 / energy 25 / gems 500 / streak 1)으로 생성된다.
 */
@Entity
@Table(name = "user_progress")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserProgress {

    public static final int MAX_ENERGY = 25;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false, unique = true)
    private Long userId;

    @Column(nullable = false)
    private int xp;

    @Column(nullable = false)
    private int energy;

    @Column(nullable = false)
    private int gems;

    @Column(name = "streak_count", nullable = false)
    private int streakCount;

    @Column(name = "last_active_date")
    private LocalDate lastActiveDate;

    private UserProgress(Long userId) {
        this.userId = userId;
        this.xp = 0;
        this.energy = MAX_ENERGY;
        this.gems = 500;
        this.streakCount = 1;
    }

    public static UserProgress createFor(Long userId) {
        return new UserProgress(userId);
    }

    /** 에너지 증감 — 0 미만/최대치 초과로 넘어가지 않게 서버에서 clamp (09번 문서). */
    public void changeEnergy(int delta) {
        this.energy = Math.max(0, Math.min(MAX_ENERGY, this.energy + delta));
    }

    public void addXp(int amount) {
        this.xp += Math.max(0, amount);
    }

    /**
     * 학습 활동이 있었음을 기록하고 연속 학습(streak)을 갱신한다.
     * 어제 활동했으면 +1, 오늘 이미 했으면 유지, 그보다 오래됐으면 1로 리셋.
     * (클라이언트가 아니라 서버가 날짜를 판단한다 — 09번 문서)
     */
    public void touchStreak(LocalDate today) {
        if (lastActiveDate == null) {
            this.streakCount = 1;
        } else if (lastActiveDate.equals(today)) {
            return; // 오늘 이미 반영됨 — lastActiveDate 도 그대로
        } else if (lastActiveDate.equals(today.minusDays(1))) {
            this.streakCount += 1;
        } else {
            this.streakCount = 1;
        }
        this.lastActiveDate = today;
    }

    public void addGems(int amount) {
        this.gems += Math.max(0, amount);
    }

    public void spendGems(int amount) {
        this.gems = Math.max(0, this.gems - amount);
    }
}
