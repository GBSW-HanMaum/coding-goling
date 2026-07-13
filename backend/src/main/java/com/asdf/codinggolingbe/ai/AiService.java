package com.asdf.codinggolingbe.ai;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asdf.codinggolingbe.domain.Quest;
import com.asdf.codinggolingbe.domain.UserProgress;
import com.asdf.codinggolingbe.dto.QuestResponse;
import com.asdf.codinggolingbe.repository.QuestRepository;
import com.asdf.codinggolingbe.repository.UserProgressRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

/**
 * AI 기능 오케스트레이션 (04번 문서).
 *  - 힌트: 팀원 AI 서버(/ai/wrong-notes/analyze) 프록시, 실패 시 정적 explanation 폴백
 *  - 퀘스트: Spring 이 OpenAI 직접 호출, 실패 시 기본 퀘스트 폴백, 하루 1회 캐싱
 *
 * 핵심 원칙: AI 는 부가 기능이므로 어떤 실패도 사용자 흐름을 끊지 않는다 (발표 중 AI 죽어도 안전).
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AiService {

    private static final String FALLBACK_HINT =
            "출력이 기대값과 어떻게 다른지 한 줄씩 비교해 보세요. 자료형이나 공백, 개행 차이가 흔한 원인이에요.";

    private final AiServerClient aiServerClient;
    private final OpenAiClient openAiClient;
    private final QuestRepository questRepository;
    private final UserProgressRepository userProgressRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    /** 실패 로그 기반 힌트. AI 서버가 답을 주면 그걸, 아니면 정적 힌트를 돌려준다 (절대 예외를 밖으로 안 냄). */
    public HintResponse getHint(HintRequest request) {
        try {
            AiServerClient.AnalyzeResult result = aiServerClient.analyzeWrongNote(request);
            return HintResponse.ai(result.recommendedHint(), result.conceptsToReview());
        } catch (Exception e) {
            log.warn("AI 힌트 실패 — 정적 힌트로 폴백: {}", e.getMessage());
            String fallback = request.fallbackExplanation() != null
                    && !request.fallbackExplanation().isBlank()
                    ? request.fallbackExplanation()
                    : FALLBACK_HINT;
            return HintResponse.fallback(fallback);
        }
    }

    /**
     * AI 퀘스트. 오늘 만든 게 있으면 그대로 주고, 없으면 OpenAI 로 새로 만든다.
     * OpenAI 실패/미설정이면 기존(기본) 퀘스트를 반환한다.
     */
    @Transactional
    public List<QuestResponse> getOrGenerateQuests(Long userId, QuestGenRequest request) {
        UserProgress progress = userProgressRepository.findByUserId(userId).orElseThrow();

        // 아직 유효한 AI 퀘스트가 있으면 재생성하지 않는다 (하루 1회, 비용 절약)
        List<Quest> active = questRepository
                .findByUserIdAndAiGeneratedTrueAndExpiresAtAfter(userId, LocalDateTime.now());
        if (!active.isEmpty()) {
            return toResponses(active, progress.getXp());
        }

        List<Quest> generated = tryGenerate(userId, progress, request);
        if (generated != null) {
            questRepository.deleteAiQuestsByUserId(userId); // 만료된 옛 AI 퀘스트 정리
            List<Quest> saved = questRepository.saveAll(generated);
            return toResponses(saved, progress.getXp());
        }

        // 폴백: 기본 퀘스트(회원가입 때 넣어둔 것)를 그대로 노출
        return toResponses(
                questRepository.findByUserIdOrderByGoalValueAsc(userId), progress.getXp());
    }

    /** OpenAI 호출 + 파싱. 실패하면 null 을 돌려 폴백을 유도한다. */
    private List<Quest> tryGenerate(Long userId, UserProgress progress, QuestGenRequest request) {
        if (!openAiClient.isConfigured()) {
            log.info("OPENAI_API_KEY 미설정 — 기본 퀘스트로 폴백");
            return null;
        }

        int xp = request.xp() != null ? request.xp() : progress.getXp();
        int streak = request.streak() != null ? request.streak() : progress.getStreakCount();
        int accuracy = request.recentAccuracy() != null ? request.recentAccuracy() : 70;

        String prompt = """
                사용자 XP %d, 연속학습 %d일, 최근 정답률 %d%%.
                동기부여될 만한 일일 퀘스트 3개를 아래 JSON 형식으로만 응답해.
                title 은 한국어 한 문장, value 는 목표 XP(정수).
                {"quests": [{"title": "...", "value": 20}, ...]}
                """.formatted(xp, streak, accuracy);

        try {
            String content = openAiClient.complete(prompt);
            JsonNode root = objectMapper.readTree(content);
            JsonNode arr = root.path("quests");
            if (!arr.isArray() || arr.isEmpty()) {
                log.warn("AI 퀘스트 파싱 실패(quests 배열 없음) — 폴백");
                return null;
            }

            LocalDateTime expires = LocalDateTime.now().plusDays(1);
            List<Quest> quests = new java.util.ArrayList<>();
            for (JsonNode q : arr) {
                String title = q.path("title").asString("");
                int value = q.path("value").asInt(0);
                if (!title.isBlank() && value > 0) {
                    quests.add(Quest.aiQuest(userId, title, value, expires));
                }
            }
            return quests.isEmpty() ? null : quests;
        } catch (Exception e) {
            log.warn("AI 퀘스트 생성 실패 — 폴백: {}", e.getMessage());
            return null;
        }
    }

    private List<QuestResponse> toResponses(List<Quest> quests, int currentXp) {
        return quests.stream()
                .sorted(java.util.Comparator.comparingInt(Quest::getGoalValue))
                .map(q -> QuestResponse.of(q, currentXp))
                .toList();
    }
}
