package com.asdf.codinggolingbe.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.asdf.codinggolingbe.domain.Quest;

public interface QuestRepository extends JpaRepository<Quest, Long> {

    List<Quest> findByUserIdOrderByGoalValueAsc(Long userId);

    boolean existsByUserId(Long userId);

    /** 아직 만료되지 않은 AI 퀘스트 — 하루 1회 갱신 판단용 (04번 문서) */
    List<Quest> findByUserIdAndAiGeneratedTrueAndExpiresAtAfter(Long userId, LocalDateTime now);

    /** 새 AI 퀘스트로 교체하기 전에 이 유저의 기존 AI 퀘스트를 지운다 */
    @Modifying
    @Query("delete from Quest q where q.userId = :userId and q.aiGenerated = true")
    void deleteAiQuestsByUserId(@Param("userId") Long userId);
}
