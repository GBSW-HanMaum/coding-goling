# 코드런 (CodingGoling)

실행 기반 게이미피케이션 코딩 학습 플랫폼 (듀오링고 스타일). 전체 코드를 한 리포에 모았습니다.

```
coding-goling/
├── frontend/   Vite + React + TypeScript (Zustand, TailwindCSS)
│               온보딩·학습·리더보드·퀘스트·상점·프로필, Pyodide/JS 브라우저 실행
├── backend/    Spring Boot + Java 21 (JPA, Security/JWT, MySQL)
│               인증·진행상황·리더보드·상점·퀘스트·프로필·C/Java Docker 실행·AI 프록시
└── ai/         FastAPI (OpenAI) — 오답 분석·힌트·문제 생성
```

## 실행 순서

```bash
# 1. DB (MySQL) — 스키마 적용
mysql -u root -p < backend/docs/schema.sql

# 2. AI 서버 (8000) — ai/.env 에 OPENAI_API_KEY 필요
cd ai && python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
.venv/bin/uvicorn app.main:app --port 8000

# 3. 백엔드 (8080) — 퀘스트 생성용 OPENAI_API_KEY 환경변수 필요
cd backend && OPENAI_API_KEY=... ./gradlew bootRun

# 4. 프론트 (5173) — .env 의 VITE_API_BASE_URL 이 백엔드를 가리킴
cd frontend && npm install && npm run dev
```

## 아키텍처

```
프론트 → 백엔드(Spring) → ┬ MySQL
                          ├ Docker 샌드박스 (C/Java 실행)
                          └ AI 서버(FastAPI) → OpenAI
```

- Python/JavaScript 실행 채점은 프론트에서(Pyodide / Web Worker), C/Java 는 백엔드 Docker 샌드박스에서.
- AI 힌트는 백엔드가 AI 서버로 프록시, AI 퀘스트는 백엔드가 OpenAI 직접 호출. 둘 다 실패 시 정적 힌트/기본 퀘스트로 폴백한다.

## 검증

```bash
cd backend && ./scripts/verify.sh --exec --ai   # 백엔드 E2E 시나리오
```
