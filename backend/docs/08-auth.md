# 08. 인증 (회원가입 / 로그인) — Spring Boot

> 이번 프로젝트는 해커톤 캡스톤이라 이메일 인증 2단계(Run a B 방식)까지는 시간상 생략,
> 이메일+비밀번호 기본 인증 + JWT만 우선 구현. 시간 남으면 이메일 인증 나중에 추가.

## 엔티티: `User`
| 필드 | 타입 | 비고 |
|---|---|---|
| id | Long, PK | |
| email | String, unique | |
| password | String | BCrypt 해시 저장 |
| nickname | String | |
| selectedLanguage | String | "PYTHON"/"C"/"JAVA"/"JAVASCRIPT", nullable (온보딩 전엔 null) |
| onboardingCompleted | boolean | default false |
| createdAt | LocalDateTime | @PrePersist |

- 비즈니스 메서드로 다룰 것: `User.completeOnboarding(language, ...)`, setter 금지

## 엔드포인트

### `POST /api/v1/auth/signup`
```json
// 요청
{ "email": "...", "password": "...", "nickname": "..." }
// 응답 data
{ "access_token": "...", "user_id": 1 }
```
- 비밀번호는 BCryptPasswordEncoder로 해시 후 저장
- 이메일 중복 체크 → 중복이면 `ErrorCode`로 409 반환

### `POST /api/v1/auth/login`
```json
// 요청
{ "email": "...", "password": "..." }
// 응답 data
{ "access_token": "...", "user_id": 1, "onboarding_completed": false }
```

### `GET /api/v1/users/me`
- `Authorization: Bearer {token}` 필요
- 현재 로그인한 유저 정보 반환 (온보딩 상태 포함) — 프론트가 앱 시작 시 이 API로 로그인 여부/온보딩 완료 여부 판단

### `POST /api/v1/onboarding/sync` (신규 — 01번 문서 Step 4와 연결)
- 회원가입 직후 1회 호출. 게스트로 진행한 온보딩 데이터를 서버에 반영
```json
// 요청
{
  "language": "PYTHON",
  "learningGoal": "취업/전공",
  "selfReportedLevel": "문법만 조금",
  "dailyGoalMinutes": 10,
  "startingUnitId": "unit2",
  "diagnosticScoreRatio": 1.0
}
```
- 서버에서 `User.completeOnboarding(...)` 호출 + `UserProgress` 초기화(시작 유닛 이전 레슨들 completed 처리, 09번 문서 참고)
- 이미 온보딩 완료된 유저가 다시 호출하면 무시(idempotent 처리) — 로그인 유저가 실수로 온보딩 다시 안 타게 방어

## JWT 설계
- Run a B처럼 TEMP/ACCESS 토큰 분리까지는 안 하고, **단일 ACCESS 토큰**으로 단순화 (이메일 인증 단계가 없으니 TEMP 토큰 자체가 불필요)
- 만료시간: 7일 정도로 넉넉하게 (해커톤 데모 중 토큰 만료로 끊기면 안 되니)
- `JwtAuthenticationFilter`에서 매 요청마다 토큰 검증 후 `SecurityContext`에 유저 정보 세팅

## Spring Security 설정 시 주의 (예전에 Run a B에서 겪었던 이슈 참고)
- `SecurityConfig`에서 `/api/v1/auth/**` 경로는 반드시 `permitAll()` 처리했는지 확인
  → 예전 프로젝트에서 이 부분 누락으로 403 겪은 적 있으니 처음부터 명시적으로 체크
- CORS 설정: 프론트 개발 서버 origin(`http://localhost:5173` 등) 허용 필수

## 프론트 연동 (`src/`)
1. `pages/Login.tsx`, `pages/Signup.tsx` 신규 (기존에 계정 시스템이 없었으니 새로 추가)
2. `lib/api.ts`의 axios 인스턴스로 `/auth/login`, `/auth/signup` 호출
3. 로그인 성공 시 `access_token`을 어디에 저장할지:
   - localStorage에 토큰만 저장 (진행상황 전체를 저장하던 기존 방식과 달리 **토큰만** 저장하고 나머지는 API로 매번 조회)
4. 앱 진입 시 토큰 있으면 `/users/me` 호출해서 로그인 상태/온보딩 여부 확인 → 라우팅 분기
   (`onboardingCompleted === false`면 기존처럼 `/onboarding/language`로)
5. 라우트 가드: 로그인 안 된 상태로 `/learn` 등 접근 시 `/login`으로 리다이렉트

## 이번 라운드에 안 할 것 (시간 아끼기)
- 이메일 인증
- 구글 로그인
- 비밀번호 재설정
→ 전부 시간 남으면 나중에. 지금은 이메일/비밀번호 로그인만 확실히 동작하게.
