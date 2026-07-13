import json
from typing import Any, Dict

from app.prompts.solution_prompts import SOLUTION_GENERATION_SYSTEM_PROMPT
from app.schemas import SolutionGenerateRequest
from app.services.openai_service import call_openai_json


def generate_solution(request: SolutionGenerateRequest) -> Dict[str, Any]:
    constraints = json.dumps(request.constraints, ensure_ascii=False)

    user_prompt = f"""
Generate a model solution for the following coding problem.

language: {request.language}
problem_title: {request.problem_title}
problem_description: {request.problem_description}
input_description: {request.input_description}
output_description: {request.output_description}
constraints: {constraints}

Return JSON with this exact structure:
{{
  "solution_code": "string",
  "explanation": "string",
  "time_complexity": "string",
  "space_complexity": "string"
}}
"""

    return call_openai_json(
        system_prompt=SOLUTION_GENERATION_SYSTEM_PROMPT,
        user_prompt=user_prompt,
        temperature=0.25,
    )
