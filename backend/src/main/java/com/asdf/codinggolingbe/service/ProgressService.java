package com.asdf.codinggolingbe.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asdf.codinggolingbe.common.CustomException;
import com.asdf.codinggolingbe.common.ErrorCode;
import com.asdf.codinggolingbe.domain.ChallengeAttempt;
import com.asdf.codinggolingbe.domain.LessonCompletion;
import com.asdf.codinggolingbe.domain.UserProgress;
import com.asdf.codinggolingbe.dto.EnergyRequest;
import com.asdf.codinggolingbe.dto.LessonCompleteRequest;
import com.asdf.codinggolingbe.dto.ProgressResponse;
import com.asdf.codinggolingbe.repository.ChallengeAttemptRepository;
import com.asdf.codinggolingbe.repository.LessonCompletionRepository;
import com.asdf.codinggolingbe.repository.UserProgressRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProgressService {

    private final UserProgressRepository userProgressRepository;
    private final LessonCompletionRepository lessonCompletionRepository;
    private final ChallengeAttemptRepository challengeAttemptRepository;

    @Transactional(readOnly = true)
    public ProgressResponse getProgress(Long userId) {
        return ProgressResponse.of(findProgress(userId), completedLessonIds(userId));
    }

    /**
     * 레슨 완료 — xp/energy 갱신 + 스트릭 + lesson_completion + challenge_attempt 를 한 트랜잭션으로.
     * 같은 레슨을 다시 깨면 완료 기록은 중복 생성하지 않되(유니크 제약), xp/에너지 보상은 그대로 준다.
     */
    @Transactional
    public ProgressResponse completeLesson(Long userId, LessonCompleteRequest request) {
        UserProgress progress = findProgress(userId);

        progress.addXp(request.xpEarned());
        progress.addGems(request.gemsEarned());
        progress.changeEnergy(request.energyDelta());
        progress.touchStreak(LocalDate.now());

        if (!lessonCompletionRepository.existsByUserIdAndLessonId(userId, request.lessonId())) {
            lessonCompletionRepository.save(
                    LessonCompletion.of(userId, request.lessonId(), request.scoreRatio()));
        }

        if (request.attempts() != null) {
            request.attempts().stream()
                    .filter(a -> a.challengeId() != null && !a.challengeId().isBlank())
                    .map(a -> ChallengeAttempt.of(userId, a.challengeId(), a.correct()))
                    .forEach(challengeAttemptRepository::save);
        }

        return ProgressResponse.of(progress, completedLessonIds(userId));
    }

    /** 에너지 증감 (힌트 사용 등). 음수/최대치 초과는 엔티티에서 clamp. */
    @Transactional
    public ProgressResponse changeEnergy(Long userId, EnergyRequest request) {
        UserProgress progress = findProgress(userId);
        progress.changeEnergy(request.delta());
        return ProgressResponse.of(progress, completedLessonIds(userId));
    }

    private List<String> completedLessonIds(Long userId) {
        return lessonCompletionRepository.findByUserId(userId).stream()
                .map(LessonCompletion::getLessonId)
                .toList();
    }

    private UserProgress findProgress(Long userId) {
        return userProgressRepository.findByUserId(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
    }
}
