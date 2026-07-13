package com.asdf.codinggolingbe.ai;

import java.net.http.HttpClient;
import java.time.Duration;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import lombok.extern.slf4j.Slf4j;

/**
 * 팀원 FastAPI AI 서버(coding-goling-ai) 호출 전용 클라이언트.
 * 힌트는 그 서버의 /ai/wrong-notes/analyze 를 그대로 프록시한다 (04번 문서).
 *
 * 서버가 죽어있거나 3초 안에 응답하지 않으면 예외를 던지고, 호출부(AiService)가 정적 힌트로 폴백한다.
 * FastAPI 는 snake_case 라 여기서는 Map 으로 직접 필드명을 맞춘다 (Spring 의 SNAKE_CASE 설정과 무관하게).
 */
@Slf4j
@Component
public class AiServerClient {

    private final RestClient restClient;

    public AiServerClient(
            @Value("${ai-server.base-url}") String baseUrl,
            @Value("${ai-server.timeout-ms}") long timeoutMs) {

        // JDK HttpClient 로 커넥트/읽기 타임아웃을 준다 — 3초 안에 응답 없으면 예외 → 폴백
        HttpClient httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofMillis(timeoutMs))
                .build();
        JdkClientHttpRequestFactory factory = new JdkClientHttpRequestFactory(httpClient);
        factory.setReadTimeout(Duration.ofMillis(timeoutMs));

        this.restClient = RestClient.builder()
                .baseUrl(baseUrl)
                .requestFactory(factory)
                .build();
    }

    /**
     * 오답 분석 → 힌트. 성공하면 recommended_hint 와 concepts_to_review 를 담아 돌려주고,
     * 어떤 이유로든(서버 다운/타임아웃/OpenAI 키 없음 등) 실패하면 예외를 던진다.
     */
    public AnalyzeResult analyzeWrongNote(HintRequest req) {
        Map<String, Object> body = new java.util.HashMap<>();
        body.put("language", req.language());
        body.put("problem_title", nullToEmpty(req.problemTitle()));
        body.put("problem_description", nullToEmpty(req.problemDescription()));
        body.put("user_code", req.code());
        body.put("error_message", nullToEmpty(req.errorMessage()));
        if (req.failedTestCase() != null) {
            var tc = req.failedTestCase();
            body.put("failed_test_case", Map.of(
                    "input", nullToEmpty(tc.input()),
                    "expected_output", nullToEmpty(tc.expectedOutput()),
                    "user_output", nullToEmpty(tc.userOutput())));
        }

        @SuppressWarnings("unchecked")
        Map<String, Object> res = restClient.post()
                .uri("/ai/wrong-notes/analyze")
                .body(body)
                .retrieve()
                .body(Map.class);

        if (res == null || res.get("recommended_hint") == null) {
            throw new IllegalStateException("AI 서버 응답에 recommended_hint 가 없습니다.");
        }

        String hint = String.valueOf(res.get("recommended_hint"));
        Object concepts = res.get("concepts_to_review");
        List<String> conceptList = concepts instanceof List<?> list
                ? list.stream().map(String::valueOf).toList()
                : List.of();

        return new AnalyzeResult(hint, conceptList);
    }

    public record AnalyzeResult(String recommendedHint, List<String> conceptsToReview) {
    }

    private static String nullToEmpty(String s) {
        return s == null ? "" : s;
    }
}
