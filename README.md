# 코드런 (CodingGoling)

실행 기반 게이미피케이션 코딩 학습 플랫폼 (듀오링고 스타일). 전체 코드를 한 리포에 모았습니다.

```
coding-goling/
├── frontend/   Vite + React + TypeScript (Zustand, TailwindCSS)
│               온보딩·학습·리더보드·퀘스트·상점·프로필, Pyodide/JS 브라우저 실행
├── backend/    Spring Boot + Java 21 (JPA, Security/JWT, MySQL)
│               인증·진행상황·리더보드·상점·퀘스트·프로필·C/Java Docker 실행
└── ai/         FastAPI (OpenAI) — 오답 분석·힌트·문제 생성 (백엔드와 별도 운영, 앱에서는 미사용)
```

## 실행 순서

```bash
# 1. DB (MySQL) — 스키마 적용
mysql -u root -p < backend/docs/schema.sql

# 2. 백엔드 (8080)
cd backend && ./gradlew bootRun

# 3. 프론트 (5173) — .env 의 VITE_API_BASE_URL 이 백엔드를 가리킴
cd frontend && npm install && npm run dev
```

## 아키텍처

```
프론트 → 백엔드(Spring) → ┬ MySQL
                          └ Docker 샌드박스 (C/Java 실행)
```

- Python/JavaScript 실행 채점은 프론트에서(Pyodide / Web Worker), C/Java 는 백엔드 Docker 샌드박스에서.
- AI 튜터(힌트) 기능은 제거됨 — 퀘스트는 AI 생성 없이 기본 퀘스트만 사용한다.

## 검증

```bash
cd backend && ./scripts/verify.sh --exec   # 백엔드 E2E 시나리오
```
