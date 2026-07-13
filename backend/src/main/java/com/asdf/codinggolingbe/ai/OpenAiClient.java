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
 * 퀘스트 생성용 OpenAI 직접 호출 (04번 문서).
 * 팀원 AI 서버에는 퀘스트 엔드포인트가 없으므로 이건 Spring 이 직접 부른다.
 * 키가 없으면 사용 불가 상태이며, 호출부(AiService)가 기본 퀘스트로 폴백한다.
 */
@Slf4j
@Component
public class OpenAiClient {

    private static final String CHAT_URL = "https://api.openai.com/v1/chat/completions";

    private final RestClient restClient;
    private final String apiKey;
    private final String model;

    public OpenAiClient(
            @Value("${openai.api-key}") String apiKey,
            @Value("${openai.model}") String model) {
        this.apiKey = apiKey;
        this.model = model;

        HttpClient httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(3))
                .build();
        JdkClientHttpRequestFactory factory = new JdkClientHttpRequestFactory(httpClient);
        factory.setReadTimeout(Duration.ofSeconds(10)); // OpenAI 는 응답에 시간이 걸릴 수 있다

        this.restClient = RestClient.builder()
                .baseUrl(CHAT_URL)
                .requestFactory(factory)
                .build();
    }

    /** 키가 설정돼 있는지 — 없으면 호출부가 곧바로 폴백한다 */
    public boolean isConfigured() {
        return apiKey != null && !apiKey.isBlank();
    }

    /**
     * 프롬프트를 보내고 모델의 응답 텍스트를 돌려준다.
     * JSON 강제(response_format)로 파싱 안정성을 높인다.
     */
    public String complete(String prompt) {
        if (!isConfigured()) {
            throw new IllegalStateException("OPENAI_API_KEY 가 설정되지 않았습니다.");
        }

        Map<String, Object> body = Map.of(
                "model", model,
                "messages", List.of(
                        Map.of("role", "system",
                                "content", "너는 코딩 학습 앱의 도우미야. 항상 유효한 JSON 만 응답해."),
                        Map.of("role", "user", "content", prompt)),
                "temperature", 0.8,
                "response_format", Map.of("type", "json_object"));

        @SuppressWarnings("unchecked")
        Map<String, Object> res = restClient.post()
                .header("Authorization", "Bearer " + apiKey)
                .body(body)
                .retrieve()
                .body(Map.class);

        return extractContent(res);
    }

    @SuppressWarnings("unchecked")
    private static String extractContent(Map<String, Object> res) {
        if (res == null) {
            throw new IllegalStateException("OpenAI 응답이 비었습니다.");
        }
        List<Map<String, Object>> choices = (List<Map<String, Object>>) res.get("choices");
        if (choices == null || choices.isEmpty()) {
            throw new IllegalStateException("OpenAI 응답에 choices 가 없습니다.");
        }
        Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
        return String.valueOf(message.get("content"));
    }
}
