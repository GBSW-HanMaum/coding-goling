import json
from typing import Any, Dict

from app.prompts.wrong_note_prompts import WRONG_NOTE_ANALYSIS_SYSTEM_PROMPT
from app.schemas import WrongNoteAnalyzeRequest
from app.services.openai_service import call_openai_json


def analyze_wrong_note(request: WrongNoteAnalyzeRequest) -> Dict[str, Any]:
    failed_test_case = (
        request.failed_test_case.model_dump()
        if request.failed_test_case is not None
        else None
    )

    user_prompt = f"""
Analyze the learner's wrong answer.

language: {request.language}
problem_title: {request.problem_title}
problem_description: {request.problem_description}
user_code:
{request.user_code}

error_message: {request.error_message}
failed_test_case: {json.dumps(failed_test_case, ensure_ascii=False)}

Return JSON with this exact structure:
{{
  "mistake_summary": "string",
  "concepts_to_review": ["string"],
  "feedback": "string",
  "recommended_hint": "string",
  "similar_problem_request": {{
    "concept": "string",
    "difficulty": "string"
  }}
}}
"""

    return call_openai_json(
        system_prompt=WRONG_NOTE_ANALYSIS_SYSTEM_PROMPT,
        user_prompt=user_prompt,
        temperature=0.3,
    )
