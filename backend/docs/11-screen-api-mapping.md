# 11. 화면별 백엔드 연결 매핑 (듀오링고급 완성)

> 프론트 최신 코드(`CodingGoling-Fe`) 실측 기준. "이 화면 → 이 API → 이 테이블" 을 화면 단위로 정리.
> 지금 프론트는 전부 Zustand + localStorage로만 돌아가고, 리더보드/퀘스트/상점은 `data/misc.ts` 목업.
> 이걸 아래대로 하나씩 백엔드로 갈아끼운다.

## 현재 프론트 실측 요약 (백엔드가 알아야 할 것)
- 라우팅: `RequireOnboarding` 가드가 `onboardingCompleted`(로컬)만 보고 메인 진입 막음 → **여기에 로그인 체크 추가 필요**
- 언어: `Language = "python" | "c"` (아직 Java/JS 없음 — 백엔드 enum도 4개 다 넣되 프론트는 2개만 씀)
- 상태 소스: `useGame` 스토어 (energy 25 max, gems 500 시작, xp/streak/completedLessons/completedChallenges/usedHints)
- 에너지 애니메이션(`EnergyBattery.tsx`, `EnergyToast.tsx`)은 이미 구현됨 → 백엔드는 숫자만 정확히 주면 됨
- 목업 파일: `data/misc.ts`의 `QUESTS`, `RIVALS`, `SHOP_ITEMS` → 각각 quest/leaderboard/shop_item 테이블로 대체

---

## 화면 1: 로그인 / 회원가입 (신규 페이지)
현재 없음. `Marketing.tsx`("시작하기")에서 온보딩으로 바로 감. 로그인 게이트는 **온보딩 끝(진단 결과 다음)** 에 배치 (01번 문서 Step4 참고).

| 액션 | API | 테이블 |
|---|---|---|
| 회원가입 | `POST /auth/signup` | users, user_progress(자동 생성) |
| 로그인 | `POST /auth/login` | users |
| 내 정보/로그인 유지 | `GET /users/me` | users |
| 온보딩 데이터 반영 | `POST /onboarding/sync` | users, user_progress, lesson_completion |

- 회원가입 성공 시 서버가 `user_progress` 행도 같이 생성(xp=0, energy=25, gems=500, streak=1)
- 프론트: `RequireOnboarding` 가드를 `RequireAuth`로 확장 — 토큰 없으면 `/login`으로

---

## 화면 2: 학습 홈 `/learn` (Learn.tsx) — 스킬트리/진도
가장 중요한 화면. 유닛맵에서 완료 레슨/현재 위치 표시.

| 액션 | API | 테이블 |
|---|---|---|
| 내 진행상황 로드 (완료레슨, xp, energy 등) | `GET /progress` | user_progress, lesson_completion |
| 레슨 완료 저장 | `POST /progress/lesson-complete` | user_progress, lesson_completion, challenge_attempt |

- `Learn.tsx`의 `activeIdx`는 `completedLessons` 기준으로 계산됨 → `GET /progress`가 완료 레슨 id 목록을 주면 그대로 렌더
- 레슨 콘텐츠(유닛/레슨/문제)는 **DB에 안 넣음** — 프론트 `content.ts` 유지, id 문자열로만 연결

---

## 화면 3: 레슨 풀이 `/lesson/:lessonId` (Lesson.tsx)
문제 풀고 채점하는 화면. 실행 채점은 언어별로 나뉨.

| 액션 | API | 테이블/비고 |
|---|---|---|
| Python/JS 실행 채점 | (프론트) Pyodide/브라우저 | **백엔드 안 탐** — 이미 프론트에서 실행됨 |
| C/Java 실행 채점 | `POST /execute` | 없음 (Docker 실행, 03번 문서) |
| AI 힌트 요청 | `POST /ai/hint` | 없음 (OpenAI, 04번 문서) |
| 문제별 정답/오답 기록 | `POST /progress/lesson-complete` 안에 포함 | challenge_attempt |
| 힌트 사용해서 에너지 차감 | `POST /progress/energy` (delta 음수) | user_progress |
| 정답 보상 에너지 충전 | 레슨완료 API에 energyDelta로 포함 | user_progress |

- 힌트/정답 에너지 로직은 지금 프론트 `useHint`/`gainEnergy`에 있음 → 서버 동기화만 추가(낙관적 업데이트 유지)

---

## 화면 4: 리더보드 `/leaderboard` (Leaderboard.tsx)
현재 `RIVALS` 목업 8명 + 내 xp 얹어서 정렬. 이걸 실제 유저 랭킹으로.

| 액션 | API | 테이블 |
|---|---|---|
| 주간 XP 랭킹 조회 | `GET /leaderboard` | users + user_progress |

- 별도 랭킹 테이블 없이 `user_progress.xp` 기준 `ORDER BY xp DESC LIMIT 20` 쿼리
- 응답: `[{ nickname, xp, isMe }]` — 프론트 `Ranker` 타입과 매핑 (emoji는 닉네임 해시로 프론트에서 붙이거나 서버가 랜덤 배정)
- ⚠️ 데모에 유저가 나 혼자면 랭킹이 썰렁하니, **시드로 더미 유저 몇 명 미리 넣어두는 것 추천** (RIVALS를 실제 users 행으로 INSERT)

---

## 화면 5: 퀘스트 `/quests` (QuestsPage.tsx)
현재 `QUESTS` 고정 5개 + xp 기준 진행률 표시. 이걸 유저별 퀘스트로.

| 액션 | API | 테이블 |
|---|---|---|
| 내 퀘스트 목록 | `GET /quests` | quest |
| AI 퀘스트 생성/갱신 (하루 1회) | `POST /ai/quest` | quest |

- 진행률(progress)은 `quest.goal_value` 대비 현재 xp로 계산 (프론트가 이미 그렇게 함)
- AI 생성 실패 시 기본 퀘스트로 폴백 — 서버가 항상 유효한 퀘스트 목록 보장 (04번 문서)
- 회원가입 시 기본 퀘스트 3개 정도 quest 테이블에 미리 넣어두면 첫 화면부터 채워짐

---

## 화면 6: 상점 `/shop` (Shop.tsx)
현재 `SHOP_ITEMS` 목업 4개, 젬으로 구매(로컬). 이걸 서버 검증 구매로.

| 액션 | API | 테이블 |
|---|---|---|
| 상점 아이템 목록 | `GET /shop/items` | shop_item |
| 아이템 구매 | `POST /shop/purchase` | user_progress(젬 차감), user_inventory |

- 아이템은 `shop_item` 테이블 시드로 이미 넣음(schema.sql 참고)
- 구매 시 서버에서 젬 잔액 검증 → 부족하면 에러, 충분하면 젬 차감 + 인벤토리 기록 (한 트랜잭션)
- `refill`(에너지 충전) 같은 특수 action은 서버가 처리 후 갱신된 progress 반환

---

## 화면 7: 마이페이지 / 프로필 (신규 — 05번 문서)
현재 없음. `Sidebar.tsx`에 메뉴 추가 필요.

| 액션 | API | 테이블 |
|---|---|---|
| 프로필 요약 (언어/스트릭/총xp/완료수) | `GET /users/me` + `GET /progress` | users, user_progress, lesson_completion |
| 취약 개념 리스트 | `GET /profile/weak-concepts` | challenge_attempt |
| 보유 아이템 | `GET /shop/inventory` | user_inventory |

- 취약 개념: `challenge_attempt`에서 `is_correct=false` 많은 challenge를 개념 태그별로 집계
  (challenge의 개념 태그는 프론트 content.ts에 있으니, 서버는 challenge_id별 오답 수만 주고 프론트가 태그 매핑해도 됨)

---

## 공통 컨트롤러 구성 (백엔드 패키지 정리)
```
controller/
  AuthController          # 화면1: signup, login, me, onboarding/sync
  ProgressController      # 화면2,3: progress 조회, lesson-complete, energy
  LeaderboardController   # 화면4: leaderboard
  QuestController         # 화면5: quests 조회
  ShopController          # 화면6: shop items, purchase, inventory
  ProfileController       # 화면7: weak-concepts
  ExecutionController     # 화면3: execute (C/Java, 03번 문서)
  AiController            # 화면3,5: ai/hint, ai/quest (04번 문서)
```

## 마일스톤 순서 (이 화면 매핑 기준 권장 순서)
1. 화면1 (인증) — `08-auth.md` + `10-db-setup.md`
2. 화면2,3 (진도/레슨완료/에너지) — `09-data-sync.md` — **여기까지면 핵심 루프가 서버로 돈다**
3. 화면4 (리더보드) — 쿼리 하나라 빠름
4. 화면6 (상점) — 젬 구매 검증
5. 화면5 (퀘스트) — 기본 퀘스트 먼저, AI는 `04-ai-features.md`
6. 화면7 (마이페이지) — `05-profile-and-stretch.md`
7. C 실행(`03`), AI(`04`)는 병렬로 시간 날 때
