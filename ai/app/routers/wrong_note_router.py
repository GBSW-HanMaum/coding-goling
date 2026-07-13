from fastapi import APIRouter, HTTPException

from app.schemas import WrongNoteAnalyzeRequest, WrongNoteAnalyzeResponse
from app.services.wrong_note_service import analyze_wrong_note

router = APIRouter()


@router.post("/analyze", response_model=WrongNoteAnalyzeResponse)
def analyze_wrong_note_endpoint(request: WrongNoteAnalyzeRequest):
    try:
        return analyze_wrong_note(request)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
