package com.asdf.codinggolingbe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.asdf.codinggolingbe.domain.LessonCompletion;

public interface LessonCompletionRepository extends JpaRepository<LessonCompletion, Long> {

    List<LessonCompletion> findByUserId(Long userId);

    boolean existsByUserIdAndLessonId(Long userId, String lessonId);
}
