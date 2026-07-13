import json
from typing import Any, Dict

from app.prompts.problem_prompts import (
    PROBLEM_GENERATION_SYSTEM_PROMPT,
    SIMILAR_PROBLEM_GENERATION_SYSTEM_PROMPT,
)
from app.schemas import ProblemGenerateRequest, SimilarProblemGenerateRequest
from app.services.openai_service import call_openai_json


PROBLEM_RESPONSE_JSON_FORMAT = """
{
  "title": "string",
  "description": "string",
  "input_description": "string",
  "output_description": "string",
  "constraints": ["string"],
  "sample_input": "string",
  "sample_output": "string",
  "difficulty": "string",
  "concepts": ["string"],
  "test_cases": [
    {
      "input": "string",
      "output": "string"
    }
  ],
  "solution_code": "string",
  "explanation": "string"
}
"""


def generate_problem(request: ProblemGenerateRequest) -> Dict[str, Any]:
    user_prompt = f"""
Generate a coding problem with the following conditions.

language: {request.language}
concept: {request.concept}
difficulty: {request.difficulty}
problem_type: {request.problem_type}
user_level: {request.user_level}

Return JSON with this exact structure:
{PROBLEM_RESPONSE_JSON_FORMAT}
"""

    return call_openai_json(
        system_prompt=PROBLEM_GENERATION_SYSTEM_PROMPT,
        user_prompt=user_prompt,
        temperature=0.4,
    )


def generate_similar_problem(request: SimilarProblemGenerateRequest) -> Dict[str, Any]:
    target_concepts = json.dumps(request.target_concepts, ensure_ascii=False)

    user_prompt = f"""
Generate a new coding problem similar to the original problem below.

language: {request.language}
difficulty: {request.difficulty}
target_concepts: {target_concepts}

original_problem_title: {request.original_problem_title}
original_problem_description: {request.original_problem_description}

The new problem should practice the same or closely related concepts, but it must not be a direct copy.

Return JSON with this exact structure:
{PROBLEM_RESPONSE_JSON_FORMAT}
"""

    return call_openai_json(
        system_prompt=SIMILAR_PROBLEM_GENERATION_SYSTEM_PROMPT,
        user_prompt=user_prompt,
        temperature=0.45,
    )
