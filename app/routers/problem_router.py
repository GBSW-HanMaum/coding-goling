from fastapi import APIRouter, HTTPException

from app.schemas import (
    ProblemGenerateRequest,
    ProblemGenerateResponse,
    SimilarProblemGenerateRequest,
)
from app.services.problem_service import generate_problem, generate_similar_problem

router = APIRouter()


@router.post("/generate", response_model=ProblemGenerateResponse)
def generate_problem_endpoint(request: ProblemGenerateRequest):
    try:
        return generate_problem(request)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@router.post("/generate-similar", response_model=ProblemGenerateResponse)
def generate_similar_problem_endpoint(request: SimilarProblemGenerateRequest):
    try:
        return generate_similar_problem(request)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
