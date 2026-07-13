# 07. 백엔드 전체 개요 (Spring Boot, 이제부터 실작업 시작)

> 01~06번 문서(온보딩, 언어확장, 실행/AI 스펙, 프로필, 디자인)는 프론트 기준 완료.
> 이제 실제로 백엔드를 만들어서 하나씩 연결한다.

## 구조 확정
```
songmin/CodingGoling/     ← 프론트 (Vite+React), 기존 그대로
songmin/CodingGoling-Be/   ← Spring Boot 단일 백엔드 (실제 세팅 완료: Web/JPA/Security/Validation/Lombok/MySQL)
```
인증, 실행 채점(C), AI, 유저 데이터 전부 이 프로젝트 하나 안에서 처리한다 (이전에 검토했던
"실행 서버 별도 분리" 안은 폐기 — 로그인까지 필요해진 시점부터 굳이 나눌 이유 없음).


## 공통 컨벤션 (기존에 쓰던 방식 그대로 유지)
- 엔티티: 비즈니스 메서드 사용, setter 금지
- API 응답 포맷: `{ success, data, message, error }`, `ApiResponse.success(data)` 정적 팩토리
- `ErrorCode` 생성자: `(String code, int status, String message)`, HTTP status는 숫자
- 토큰/JSON 필드명: snake_case (`access_token` 등) — 프론트가 camelCase 쓰는 곳(Zustand)과는
  API 경계에서 매핑 필요 (axios interceptor나 응답 변환 유틸로 처리)
- `userId`는 컨트롤러에서 `(Long) authentication.getPrincipal()`로 획득
- `@PrePersist`/`@PreUpdate`로 시간 필드 수동 관리
- `ddl-auto=update` — 필드 추가는 자동 반영되지만 이름 변경/삭제는 수동 SQL 필요하다는 점 유의

## 스택
- Spring Boot 3.x + Java 21, Gradle
- MySQL (또는 PostgreSQL, 팀 익숙한 쪽 — Run a B에서 MySQL 썼으니 동일하게 MySQL 추천)
- Spring Security + JWT (jjwt 라이브러리)
- Spring Data JPA
- Docker Java 실행은 03번 문서 그대로, 이 프로젝트 안의 `ExecutionService`로 흡수
- AI(OpenAI) 연동은 04번 문서 그대로, `AiController`로 흡수

## 마일스톤 순서 (이 순서 그대로 하나씩)
0. `10-db-setup.md` — 프로젝트는 이미 만들어졌으니, DB 연결 확인 + 공통 베이스(ApiResponse, ErrorCode, 예외 핸들러) 세팅
1. `08-auth.md` — 로그인/회원가입 (JWT)
2. `09-data-sync.md` — 유저 진행상황(XP/에너지/스트릭/완료레슨)을 localStorage에서 백엔드로 이전
3. 03번(C 실행) — 이 프로젝트 안의 컨트롤러로 실제 구현
4. 04번(AI 힌트/퀘스트) — 이 프로젝트 안의 컨트롤러로 실제 구현
5. 실제 리더보드 (주간 XP 랭킹 쿼리)

## 프론트 쪽 준비
- `src/lib/api.ts` 신규: axios(또는 fetch wrapper) 인스턴스, baseURL = `VITE_API_BASE_URL`,
  요청 인터셉터에서 JWT를 `Authorization: Bearer {token}` 헤더로 자동 첨부
- `.env`에 `VITE_API_BASE_URL=http://localhost:8080/api/v1` 추가
- Zustand `useGame` 스토어는 완전히 버리지 않고, **로컬 캐시 + 낙관적 업데이트 용도로 유지**하면서
  실제 진실 소스(source of truth)는 백엔드로 옮기는 방향 (09번 문서에서 구체화)

## Claude Code에게 던질 첫 프롬프트
```
songmin/CodingGoling-Be 프로젝트 이미 초기 세팅 끝났어 (Web/JPA/Security/Validation/Lombok/MySQL 의존성 다 있음).
docs/ 안의 07~10번 md 순서대로 읽고, 10-db-setup.md부터 시작해줘.
DB 연결 확인하고 공통 베이스(ApiResponse, ErrorCode, GlobalExceptionHandler) 세팅한 다음
확인받고 08-auth.md로 넘어가자.
```

