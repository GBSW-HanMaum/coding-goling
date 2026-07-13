package com.asdf.codinggolingbe.dto;

import java.util.List;

import com.asdf.codinggolingbe.domain.Language;

import jakarta.validation.constraints.NotNull;

/**
 * 게스트로 진행한 온보딩 결과를 회원가입 직후 1회 서버에 반영 (08번 문서).
 * completedLessonIds 는 진단 결과로 건너뛴 레슨들 — 프론트의 placementFor()가 이미 계산해 갖고 있다.
 * (서버는 content.ts 를 모르므로 "시작 유닛 이전 레슨" 을 스스로 계산할 수 없다.)
 */
public record OnboardingSyncRequest(
        @NotNull(message = "언어는 필수입니다.")
        Language language,
        String learningGoal,
        String selfReportedLevel,
        Integer dailyGoalMinutes,
        String startingUnitId,
        Double diagnosticScoreRatio,
        List<String> completedLessonIds) {
}
