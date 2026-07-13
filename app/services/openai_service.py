import json
from typing import Any, Dict

from openai import OpenAI

from app.config import settings


_client: OpenAI | None = None


def get_openai_client() -> OpenAI:
    global _client

    if not settings.openai_api_key:
        raise RuntimeError(
            "OPENAI_API_KEY is not set. Add your API key to the .env file before calling AI endpoints."
        )

    if _client is None:
        _client = OpenAI(api_key=settings.openai_api_key)

    return _client


def call_openai_json(
    system_prompt: str,
    user_prompt: str,
    temperature: float = 0.4,
) -> Dict[str, Any]:
    """Call OpenAI Chat Completions and parse a JSON object response."""

    client = get_openai_client()

    response = client.chat.completions.create(
        model=settings.openai_model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        response_format={"type": "json_object"},
        temperature=temperature,
    )

    content = response.choices[0].message.content
    if content is None:
        raise RuntimeError("OpenAI returned empty content.")

    try:
        return json.loads(content)
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"OpenAI returned invalid JSON: {content}") from exc
