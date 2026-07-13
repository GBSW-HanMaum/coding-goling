package com.asdf.codinggolingbe.config;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * application.yml 의 cors.allowed-origins (YAML 리스트) 바인딩.
 * ※ @Value("${cors.allowed-origins}") 로는 YAML 리스트를 못 읽는다 —
 *   리스트는 allowed-origins[0], [1] … 인덱스 프로퍼티로 들어오기 때문.
 */
@ConfigurationProperties(prefix = "cors")
public record CorsProperties(List<String> allowedOrigins) {
}
