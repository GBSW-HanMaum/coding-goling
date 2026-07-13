# CodingGoring AI Server

코딩고링의 AI 기능을 담당하는 FastAPI 서버입니다.

현재 백엔드 Spring Boot 코드가 없어도 독립적으로 실행하고 Swagger에서 테스트할 수 있도록 구성했습니다.

## 역할

AI 서버는 MySQL에 직접 접근하지 않고, JSON 요청을 받아 OpenAI를 호출한 뒤 JSON 응답을 반환합니다.

- 문제 생성
- 비슷한 문제 생성
- 힌트 생성
- 모범 답안 및 해설 생성
- 오답노트 분석

추천 전체 구조:

```txt
Frontend
  ↓
Spring Boot Backend
  ↓ HTTP
FastAPI AI Server
  ↓
OpenAI API
```

## 프로젝트 구조

```txt
coding-goring-ai/
├── app/
│   ├── main.py
│   ├── config.py
│   ├── schemas.py
│   ├── routers/
│   │   ├── problem_router.py
│   │   ├── hint_router.py
│   │   ├── solution_router.py
│   │   └── wrong_note_router.py
│   ├── services/
│   │   ├── openai_service.py
│   │   ├── problem_service.py
│   │   ├── hint_service.py
│   │   ├── solution_service.py
│   │   └── wrong_note_service.py
│   └── prompts/
│       ├── problem_prompts.py
│       ├── hint_prompts.py
│       ├── solution_prompts.py
│       └── wrong_note_prompts.py
├── tests/
│   └── test_problem_generation.py
├── .env
├── .env.example
├── requirements.txt
├── .gitignore
└── README.md
```

## 실행 준비

```bash
conda create -n codingGoring python=3.11
conda activate codingGoring
pip install -r requirements.txt
```

`.env` 파일에 OpenAI API Key를 넣습니다.

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
```

> `.env` 파일은 `.gitignore`에 포함되어 있으므로 GitHub에 올리지 않습니다.

## 실행

프로젝트 루트에서 실행합니다.

```bash
uvicorn app.main:app --reload --port 8000
```

브라우저에서 Swagger 문서를 확인합니다.

```txt
http://localhost:8000/docs
```

헬스 체크:

```txt
GET http://localhost:8000/health
```

## API 목록

### 1. 문제 생성

```http
POST /ai/problems/generate
```

Request:

```json
{
  "language": "python",
  "concept": "for loop",
  "difficulty": "beginner",
  "problem_type": "coding",
  "user_level": 1
}
```

### 2. 비슷한 문제 생성

```http
POST /ai/problems/generate-similar
```

Request:

```json
{
  "language": "python",
  "original_problem_title": "1부터 N까지 더하기",
  "original_problem_description": "정수 N이 주어졌을 때 1부터 N까지의 합을 출력하세요.",
  "target_concepts": ["for loop", "accumulation"],
  "difficulty": "beginner"
}
```

### 3. 힌트 생성

```http
POST /ai/hints/generate
```

Request:

```json
{
  "problem_title": "1부터 N까지 더하기",
  "problem_description": "정수 N이 주어졌을 때 1부터 N까지의 합을 출력하세요.",
  "language": "python",
  "user_code": "n = int(input())\nprint(n)",
  "hint_level": 1
}
```

### 4. 모범 답안 및 해설 생성

```http
POST /ai/solutions/generate
```

Request:

```json
{
  "language": "python",
  "problem_title": "1부터 N까지 더하기",
  "problem_description": "정수 N이 주어졌을 때 1부터 N까지의 합을 출력하세요.",
  "input_description": "첫째 줄에 정수 N이 주어집니다.",
  "output_description": "합을 출력합니다.",
  "constraints": ["1 <= N <= 1000"]
}
```

### 5. 오답 분석

```http
POST /ai/wrong-notes/analyze
```

Request:

```json
{
  "language": "python",
  "problem_title": "1부터 N까지 더하기",
  "problem_description": "정수 N이 주어졌을 때 1부터 N까지의 합을 출력하세요.",
  "user_code": "n = int(input())\nprint(n)",
  "error_message": "",
  "failed_test_case": {
    "input": "5",
    "expected_output": "15",
    "user_output": "5"
  }
}
```

## 테스트

```bash
pytest
```

## 백엔드 연동 전까지의 개발 방식

백엔드가 아직 없어도 Swagger에서 직접 JSON을 넣어 테스트하면 됩니다.

나중에 Spring Boot 백엔드가 준비되면, 백엔드에서 아래처럼 HTTP 요청을 보내도록 맞추면 됩니다.

```txt
Spring Boot → http://localhost:8000/ai/problems/generate
```

초기에는 DB 접근은 Spring Boot만 담당하고, AI 서버는 DB에 직접 접근하지 않는 구조를 권장합니다.