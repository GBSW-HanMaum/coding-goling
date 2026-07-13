package com.asdf.codinggolingbe.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asdf.codinggolingbe.common.CustomException;
import com.asdf.codinggolingbe.common.ErrorCode;
import com.asdf.codinggolingbe.domain.Quest;
import com.asdf.codinggolingbe.domain.UserProgress;
import com.asdf.codinggolingbe.dto.QuestResponse;
import com.asdf.codinggolingbe.repository.QuestRepository;
import com.asdf.codinggolingbe.repository.UserProgressRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuestService {

    /** 회원가입 시 넣어두는 기본 퀘스트 (프론트 QUESTS 목업의 앞 3개) */
    private static final List<int[]> DEFAULT_GOALS = List.of(
            new int[] { 10 }, new int[] { 30 }, new int[] { 50 });

    private final QuestRepository questRepository;
    private final UserProgressRepository userProgressRepository;

    /** 회원가입 직후 호출 — 첫 화면부터 퀘스트가 채워져 있게 (11번 문서). */
    @Transactional
    public void createDefaultQuests(Long userId) {
        if (questRepository.existsByUserId(userId)) {
            return;
        }
        DEFAULT_GOALS.stream()
                .map(goal -> Quest.defaultQuest(userId, goal[0] + " XP 획득하기", goal[0]))
                .forEach(questRepository::save);
    }

    @Transactional(readOnly = true)
    public List<QuestResponse> getQuests(Long userId) {
        UserProgress progress = userProgressRepository.findByUserId(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        return questRepository.findByUserIdOrderByGoalValueAsc(userId).stream()
                .map(quest -> QuestResponse.of(quest, progress.getXp()))
                .toList();
    }
}
