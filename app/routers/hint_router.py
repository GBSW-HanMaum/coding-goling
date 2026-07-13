from fastapi import APIRouter, HTTPException

from app.schemas import HintGenerateRequest, HintGenerateResponse
from app.services.hint_service import generate_hint

router = APIRouter()


@router.post("/generate", response_model=HintGenerateResponse)
def generate_hint_endpoint(request: HintGenerateRequest):
    try:
        return generate_hint(request)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
