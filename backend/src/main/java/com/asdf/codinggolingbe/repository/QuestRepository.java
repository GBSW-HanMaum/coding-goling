package com.asdf.codinggolingbe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.asdf.codinggolingbe.domain.Quest;

public interface QuestRepository extends JpaRepository<Quest, Long> {

    List<Quest> findByUserIdOrderByGoalValueAsc(Long userId);

    boolean existsByUserId(Long userId);
}
