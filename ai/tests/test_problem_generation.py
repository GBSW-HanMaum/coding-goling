from fastapi.testclient import TestClient

from app.main import app
from app.services import problem_service

client = TestClient(app)


def test_problem_generate_endpoint(monkeypatch):
    fake_response = {
        "title": "1부터 N까지 더하기",
        "description": "정수 N이 주어졌을 때 1부터 N까지의 합을 출력하세요.",
        "input_description": "첫째 줄에 정수 N이 주어집니다.",
        "output_description": "합을 출력합니다.",
        "constraints": ["1 <= N <= 1000"],
        "sample_input": "5",
        "sample_output": "15",
        "difficulty": "beginner",
        "concepts": ["for loop", "accumulation"],
        "test_cases": [
            {"input": "5", "output": "15"},
            {"input": "1", "output": "1"},
            {"input": "10", "output": "55"},
        ],
        "solution_code": "n = int(input())\nanswer = 0\nfor i in range(1, n + 1):\n    answer += i\nprint(answer)",
        "explanation": "반복문으로 1부터 N까지 더합니다.",
    }

    def fake_call_openai_json(*args, **kwargs):
        return fake_response

    monkeypatch.setattr(problem_service, "call_openai_json", fake_call_openai_json)

    response = client.post(
        "/ai/problems/generate",
        json={
            "language": "python",
            "concept": "for loop",
            "difficulty": "beginner",
            "problem_type": "coding",
            "user_level": 1,
        },
    )

    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "1부터 N까지 더하기"
    assert len(data["test_cases"]) == 3
