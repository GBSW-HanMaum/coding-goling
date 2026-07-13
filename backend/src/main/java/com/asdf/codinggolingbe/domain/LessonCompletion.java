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
 * 완료한 레슨 (schema.sql 의 lesson_completion).
 * lesson_id 는 프론트 content.ts 의 Lesson.id 문자열 그대로 (레슨 콘텐츠는 DB에 안 넣음).
 */
@Entity
@Table(name = "lesson_completion")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LessonCompletion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "lesson_id", nullable = false, length = 100)
    private String lessonId;

    @Column(name = "score_ratio", nullable = false)
    private double scoreRatio;

    @Column(name = "completed_at", nullable = false)
    private LocalDateTime completedAt;

    private LessonCompletion(Long userId, String lessonId, double scoreRatio) {
        this.userId = userId;
        this.lessonId = lessonId;
        this.scoreRatio = scoreRatio;
    }

    public static LessonCompletion of(Long userId, String lessonId, double scoreRatio) {
        return new LessonCompletion(userId, lessonId, scoreRatio);
    }

    @PrePersist
    void onCreate() {
        this.completedAt = LocalDateTime.now();
    }
}
