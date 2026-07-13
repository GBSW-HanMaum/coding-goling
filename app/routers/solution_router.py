from fastapi import APIRouter, HTTPException

from app.schemas import SolutionGenerateRequest, SolutionGenerateResponse
from app.services.solution_service import generate_solution

router = APIRouter()


@router.post("/generate", response_model=SolutionGenerateResponse)
def generate_solution_endpoint(request: SolutionGenerateRequest):
    try:
        return generate_solution(request)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
