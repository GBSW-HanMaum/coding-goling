from typing import Any, Dict

from app.prompts.hint_prompts import HINT_GENERATION_SYSTEM_PROMPT
from app.schemas import HintGenerateRequest
from app.services.openai_service import call_openai_json


def generate_hint(request: HintGenerateRequest) -> Dict[str, Any]:
    user_prompt = f"""
Generate a hint for the learner.

problem_title: {request.problem_title}
problem_description: {request.problem_description}
language: {request.language}
user_code: {request.user_code}
hint_level: {request.hint_level}

Return JSON with this exact structure:
{{
  "hint": "string",
  "hint_level": {request.hint_level}
}}
"""

    return call_openai_json(
        system_prompt=HINT_GENERATION_SYSTEM_PROMPT,
        user_prompt=user_prompt,
        temperature=0.35,
    )
