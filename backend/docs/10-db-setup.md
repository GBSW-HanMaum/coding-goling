# 10. Milestone 0 — DB 연결 & 공통 베이스 세팅

> 프로젝트 초기화는 이미 끝났음 (Web/JPA/Security/Validation/Lombok/devtools/MySQL 의존성 확인됨).
> 이 문서는 "기능 개발 전에 한 번만 세팅해두면 되는 것들" 모음. 여기 끝나야 08번(인증)부터 편해짐.

## 1. MySQL 준비
로컬에 MySQL 띄우기 (이미 있으면 스킵). Docker로 가장 빠름:
```bash
docker run --name codingoling-mysql \
  -e MYSQL_ROOT_PASSWORD=root1234 \
  -e MYSQL_DATABASE=codingoling_db \
  -p 3306:3306 -d mysql:8
```

## 2. `application.yml`
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/codingoling_db?serverTimezone=Asia/Seoul&characterEncoding=UTF-8
    username: root
    password: root1234
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true

jwt:
  secret: ${JWT_SECRET:change-this-to-a-long-random-string-later}
  expiration-ms: 604800000   # 7일

cors:
  allowed-origins: http://localhost:5173

openai:
  api-key: ${OPENAI_API_KEY:}

execution:
  docker-timeout-seconds: 5
```
- `jwt.secret`, `openai.api-key`는 실제 값은 환경변수로 주입, `.gitignore`에 로컬 설정 파일 있으면 그쪽에 (커밋 금지)

## 3. 공통 응답 포맷 (`common/ApiResponse.java`)
```java
@Getter
public class ApiResponse<T> {
    private final boolean success;
    private final T data;
    private final String message;
    private final ErrorResponse error;

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, data, null, null);
    }
    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>(true, data, message, null);
    }
    public static <T> ApiResponse<T> fail(ErrorCode errorCode) {
        return new ApiResponse<>(false, null, null, new ErrorResponse(errorCode));
    }
    // 생성자는 private, 위 정적 팩토리로만 생성
}
```

## 4. `ErrorCode` (enum, 기존 컨벤션 그대로)
```java
public enum ErrorCode {
    EMAIL_ALREADY_EXISTS("E001", 409, "이미 사용 중인 이메일입니다."),
    INVALID_CREDENTIALS("E002", 401, "이메일 또는 비밀번호가 올바르지 않습니다."),
    USER_NOT_FOUND("E003", 404, "사용자를 찾을 수 없습니다."),
    ONBOARDING_ALREADY_COMPLETED("E004", 409, "이미 온보딩이 완료된 계정입니다."),
    EXECUTION_TIMEOUT("E005", 408, "코드 실행 시간이 초과되었습니다."),
    AI_SERVICE_UNAVAILABLE("E006", 503, "AI 서비스에 일시적으로 연결할 수 없습니다.");

    private final String code;
    private final int status;
    private final String message;
    // 생성자 (String code, int status, String message)
}
```

## 5. `GlobalExceptionHandler` (`@RestControllerAdvice`)
- `CustomException(ErrorCode)` 하나 정의해서 서비스 레이어에서 `throw new CustomException(ErrorCode.EMAIL_ALREADY_EXISTS)` 식으로 던지면
  여기서 잡아서 `ApiResponse.fail(errorCode)` + 해당 HTTP status로 응답
- Validation 실패(`MethodArgumentNotValidException`)도 여기서 잡아서 필드별 에러 메시지 모아서 반환

## 6. CORS 설정 (`SecurityConfig` 또는 `WebMvcConfigurer`)
- `application.yml`의 `cors.allowed-origins` 값 읽어서 프론트(`http://localhost:5173`) 허용
- 나중에 배포 시 프론트 도메인 추가되는 거 고려해서 리스트로 관리

## 7. 헬스체크 확인
```java
@RestController
class HealthController {
    @GetMapping("/api/v1/health")
    ApiResponse<String> health() { return ApiResponse.success("ok"); }
}
```
- 서버 켜고 `curl http://localhost:8080/api/v1/health` 쳤을 때 `{"success":true,"data":"ok",...}` 나오면 이 단계 끝

## 완료 기준 (다음 단계로 넘어가는 조건)
- [ ] `./gradlew bootRun`으로 서버 정상 기동, MySQL 연결 에러 없음
- [ ] `/api/v1/health` 정상 응답
- [ ] `ApiResponse`, `ErrorCode`, `GlobalExceptionHandler` 파일 생성 완료
- [ ] 위 4개 확인되면 08-auth.md로 이동
