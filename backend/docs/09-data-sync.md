# 09. 유저 진행상황 백엔드 연동 (XP/에너지/스트릭/완료레슨)

> 08번(로그인) 끝난 다음. 지금까지 Zustand `persist(localStorage)`에만 있던 데이터를
> 실제 DB로 옮기고, 여러 기기/브라우저에서도 진행상황이 유지되게 만드는 작업.

## 백엔드 엔티티

### `UserProgress` (유저 1명당 1row, User와 1:1)
| 필드 | 타입 |
|---|---|
| userId | Long, FK |
| xp | int |
| energy | int |
| gems | int |
| streakCount | int |
| lastActiveDate | LocalDate |

### `LessonCompletion` (유저별 완료한 레슨 기록, 1:N)
| 필드 | 타입 |
|---|---|
| userId | Long, FK |
| lessonId | String | 프론트 content.ts의 lesson id 그대로 사용 |
| scoreRatio | double |
| completedAt | LocalDateTime |

### `ChallengeAttempt` (개념별 취약점 집계용, 05번 프로필 문서와 연결)
| 필드 | 타입 |
|---|---|
| userId | Long, FK |
| challengeId | String |
| isCorrect | boolean |
| createdAt | LocalDateTime |

## 엔드포인트

```
GET  /api/v1/progress          # 내 진행상황 전체 조회 (xp, energy, streak, 완료레슨 목록)
POST /api/v1/progress/lesson-complete
POST /api/v1/progress/energy   # 에너지 증감 (힌트 사용/정답 보상 등, delta 값 전달)
```

### `POST /progress/lesson-complete` 요청
```json
{ "lessonId": "unit2-lesson1", "scoreRatio": 0.8, "xpEarned": 15, "energyDelta": 3 }
```
- 서버에서 `UserProgress`의 xp/energy 갱신 + `LessonCompletion` 기록 한 트랜잭션으로 처리
- 스트릭 계산: `lastActiveDate`가 어제면 +1, 오늘이면 유지, 그 이전이면 1로 리셋 — 이 로직은 서버가 갖고 있는 게 맞음 (여러 기기에서 조작 못 하게)

### `POST /progress/energy` 요청 (힌트 사용 시 차감 등)
```json
{ "delta": -2 }
```
- 에너지가 음수로 안 내려가게 서버에서 clamp

## 프론트 리팩터 (`store/useGame.ts`)
지금까지 스토어 안에서 직접 `xp += 15` 하던 로직들을 전부 API 호출로 교체:

```ts
// Before (로컬 계산)
addXp: (amount) => set((s) => ({ xp: s.xp + amount }))

// After (낙관적 업데이트 + 서버 동기화)
addXp: async (amount) => {
  set((s) => ({ xp: s.xp + amount })); // 화면은 즉시 반영 (낙관적 업데이트)
  try {
    await api.post('/progress/lesson-complete', { ... });
  } catch {
    // 실패 시 롤백 또는 재시도 큐 — 해커톤 시간 고려하면 일단 콘솔 에러 로깅만 해도 무방
  }
}
```
- 앱 시작 시 `GET /progress`로 서버 값을 가져와서 스토어 초기화 (`persist`가 들고 있던 로컬값보다 서버값 우선)
- `persist(localStorage)`는 완전히 걷어내지 않고 **오프라인 캐시/즉시 렌더용**으로만 남겨도 됨 — 단, 앱 시작 시 항상 서버값으로 덮어쓰기

## 순서
1. `UserProgress`, `LessonCompletion`, `ChallengeAttempt` 엔티티 + Repository
2. `GET /progress` 부터 (읽기만 되면 로그인 후 화면에 실제 서버값 나오는지 눈으로 확인 가능)
3. `lesson-complete`, `energy` 순으로 쓰기 API 연결
4. `useGame.ts`의 각 액션(addXp, useHint, completeLesson 등)을 하나씩 API 호출로 교체하면서 매번 화면에서 정상 반영되는지 확인
