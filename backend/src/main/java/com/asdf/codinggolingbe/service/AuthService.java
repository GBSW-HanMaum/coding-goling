package com.asdf.codinggolingbe.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asdf.codinggolingbe.common.CustomException;
import com.asdf.codinggolingbe.common.ErrorCode;
import com.asdf.codinggolingbe.domain.LessonCompletion;
import com.asdf.codinggolingbe.domain.User;
import com.asdf.codinggolingbe.domain.UserProgress;
import com.asdf.codinggolingbe.dto.AuthResponse;
import com.asdf.codinggolingbe.dto.LoginRequest;
import com.asdf.codinggolingbe.dto.OnboardingSyncRequest;
import com.asdf.codinggolingbe.dto.SignupRequest;
import com.asdf.codinggolingbe.dto.UserMeResponse;
import com.asdf.codinggolingbe.repository.LessonCompletionRepository;
import com.asdf.codinggolingbe.repository.UserProgressRepository;
import com.asdf.codinggolingbe.repository.UserRepository;
import com.asdf.codinggolingbe.security.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final UserProgressRepository userProgressRepository;
    private final LessonCompletionRepository lessonCompletionRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final QuestService questService;

    /**
     * 회원가입 — user, user_progress, 기본 퀘스트를 한 트랜잭션으로 함께 만든다 (11번 문서).
     * 기본 퀘스트가 있어야 첫 진입부터 퀘스트 화면이 비어 보이지 않는다.
     */
    @Transactional
    public AuthResponse signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new CustomException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }

        User user = userRepository.save(User.signup(
                request.email(),
                passwordEncoder.encode(request.password()),
                request.nickname()));

        userProgressRepository.save(UserProgress.createFor(user.getId()));
        questService.createDefaultQuests(user.getId());

        return new AuthResponse(
                jwtTokenProvider.createAccessToken(user.getId()),
                user.getId(),
                user.isOnboardingCompleted());
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new CustomException(ErrorCode.INVALID_CREDENTIALS));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            // 이메일이 없을 때와 같은 에러 — 어떤 이메일이 가입돼 있는지 흘리지 않기 위해
            throw new CustomException(ErrorCode.INVALID_CREDENTIALS);
        }

        return new AuthResponse(
                jwtTokenProvider.createAccessToken(user.getId()),
                user.getId(),
                user.isOnboardingCompleted());
    }

    @Transactional(readOnly = true)
    public UserMeResponse getMe(Long userId) {
        return UserMeResponse.from(findUser(userId));
    }

    /**
     * 온보딩 결과 반영. 이미 완료된 유저가 다시 호출하면 아무것도 바꾸지 않고 현재 상태만 돌려준다
     * (idempotent — 로그인 유저가 실수로 온보딩을 다시 타도 진행상황이 날아가지 않게).
     */
    @Transactional
    public UserMeResponse syncOnboarding(Long userId, OnboardingSyncRequest request) {
        User user = findUser(userId);
        if (user.isOnboardingCompleted()) {
            return UserMeResponse.from(user);
        }

        user.completeOnboarding(
                request.language(),
                request.learningGoal(),
                request.selfReportedLevel(),
                request.dailyGoalMinutes());

        // 진단 테스트로 건너뛴 레슨들을 완료 처리 → 프론트 Learn.tsx 의 진행도 로직이 그대로 동작
        List<String> skipped = request.completedLessonIds();
        if (skipped != null) {
            double ratio = request.diagnosticScoreRatio() == null ? 1.0 : request.diagnosticScoreRatio();
            skipped.stream()
                    .filter(lessonId -> !lessonCompletionRepository.existsByUserIdAndLessonId(userId, lessonId))
                    .map(lessonId -> LessonCompletion.of(userId, lessonId, ratio))
                    .forEach(lessonCompletionRepository::save);
        }

        return UserMeResponse.from(user);
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
    }
}
