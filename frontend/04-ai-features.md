# 04. AI 기능 (실패 로그 기반 힌트 + AI 퀘스트 생성) — Spring Boot

> ⚠️ 업데이트: 팀원이 별도 FastAPI AI 서버(`coding-goling-ai`, GBSW-HanMaum 리포)를 이미 만들어뒀음.
> Spring Boot가 OpenAI를 직접 호출하지 않고, 이 AI 서버를 호출하는 구조로 변경.

## 구조
```
프론트 → Spring Boot(8080) → FastAPI AI 서버(8000, 팀원 코드) → OpenAI
```
- AI 서버는 DB 접근 없음 (순수 JSON in/out). Spring Boot가 유일하게 DB를 아는 쪽.
- OpenAI API 키는 AI 서버(`coding-goling-ai/.env`)에만 있음 — Spring Boot는 몰라도 됨.
- Spring Boot `application.yml`에 `ai-server.base-url: http://localhost:8000` 추가.

## 팀원 AI 서버가 이미 제공하는 것 (그대로 재사용)
```
POST /ai/wrong-notes/analyze   # 오답 분석 → 힌트로 활용
POST /ai/hints/generate         # 단계별 힌트 (1~3)
POST /ai/problems/generate      # 문제 생성 (지금은 MVP 범위 밖, 향후 심화팩용)
POST /ai/problems/generate-similar
```

## 1. 실패 로그 기반 AI 힌트 (`HintButton.tsx` 확장)
기존 계획(Spring Boot가 직접 프롬프트 짜서 OpenAI 호출)을 버리고, **팀원의 `/ai/wrong-notes/analyze`를 그대로 호출**.
이게 우리가 원했던 "실행 로그 기반 힌트"랑 정확히 같은 입력을 받음 (`user_code`, `error_message`, `failed_test_case`).

### 흐름
```
프론트: 실패 시 "AI 튜터에게 물어보기" 버튼 (에너지 소모)
   ↓
Spring Boot: POST /api/v1/ai/hint
   ↓ (내부에서 AI 서버 호출, WebClient)
FastAPI: POST /ai/wrong-notes/analyze
   { language, problem_title, problem_description, user_code, error_message, failed_test_case }
   ↓
FastAPI 응답: { mistake_summary, concepts_to_review, feedback, recommended_hint, similar_problem_request }
   ↓
Spring Boot: ApiResponse.success(data)로 감싸서 프론트에 반환 (recommended_hint를 힌트로 노출)
```

### Spring Boot `AiController`
```
POST /api/v1/ai/hint
요청: { code, problemTitle, problemDescription, language, errorMessage, failedTestCase }
```
- 내부에서 `WebClient`로 `{ai-server.base-url}/ai/wrong-notes/analyze` 호출
- AI 서버가 죽어있거나 타임아웃(3초 권장) → 기존 정적 `explanation`으로 폴백 (04번 원안의 안전장치 유지)
- `concepts_to_review`는 나중에 마이페이지 취약개념(11번 문서)이랑 합쳐서 보여줘도 좋음 (지금은 힌트만 노출해도 충분)

## 2. AI 퀘스트 생성 — 팀원 서버에 없는 기능이라 Spring Boot가 직접 처리
팀원 AI 서버는 문제/힌트/오답분석만 있고 퀘스트 생성 엔드포인트가 없음.
→ **이건 기존 04번 원안대로 Spring Boot가 직접 OpenAI 호출** (간단한 프롬프트라 별도 서버 안 거쳐도 됨).

```
POST /api/v1/ai/quest
요청: { xp, streak, recentAccuracy }
프롬프트: "사용자 XP {xp}, 연속학습 {streak}일, 최근 정답률 {recentAccuracy}%.
동기부여될 만한 일일 퀘스트 3개를 JSON 배열로: [{ title, value }]"
```
- Spring Boot `application.yml`에 `openai.api-key` 추가 (AI 서버랑 별개로, 퀘스트용은 여기서 직접 키 필요)
- JSON 파싱 실패 시 기본 퀘스트 세트로 폴백 (이미 회원가입 때 기본 3개 있으니 그걸로 대체 가능)
- 하루 1회 갱신 (quest 테이블의 `expires_at` 활용, Quest 엔티티에 이미 `aiQuest()` 팩토리 열려있음 — 09번 작업 때 미리 준비해둔 부분)

## MVP 범위 안 (지금 할 것)
- AI 힌트 (팀원 서버 프록시)
- AI 퀘스트 생성 (Spring Boot 직접)

## MVP 범위 밖 (향후 확장, 지금 안 함)
- **AI 맞춤 문제 생성**: 팀원 서버의 `/ai/problems/generate`를 활용해 "온보딩 정보 기반 난이도 조절 + 심화 문제팩(젬으로 구매)" 기능. 이건 두 가지가 더 필요해서 이번 라운드에 안 함:
  1. Spring Boot에 "유저 데이터(온보딩+진단+최근 정답률) → concept/difficulty 결정" 로직
  2. AI가 만든 `solution_code`를 실행 엔진(03번에서 만든 Docker/Pyodide)으로 **자체 검증**해서 test_cases를 실제로 통과하는지 확인 후 저장 (검증 실패 시 재생성/폐기) — 이거 없이 AI 문제를 그대로 내보내면 "정답이 틀린 문제" 사고 위험 있음
  - 이 두 가지는 MVP 완성하고 시간 남으면 별도 문서(04-2)로 설계

## 구현 순서
1. Spring Boot `AiController` + `AiService`: `/ai/hint`는 AI 서버 프록시(WebClient), `/ai/quest`는 직접 OpenAI 호출
2. `application.yml`에 `ai-server.base-url`, `openai.api-key` 추가
3. 팀원 AI 서버(`coding-goling-ai`)를 로컬에서 `uvicorn app.main:app --port 8000`으로 같이 띄워두기 (README 그대로)
4. 프론트 `HintButton.tsx` 옆에 "AI 튜터" 버튼, `QuestsPage.tsx`는 AI 퀘스트 우선 + 폴백
5. AI 서버 꺼져있어도 데모가 안 끊기는지(폴백 동작) 반드시 확인 — 발표 중 AI 서버 하나 죽어도 안전망 있어야 함
