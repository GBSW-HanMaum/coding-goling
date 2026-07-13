from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import hint_router, problem_router, solution_router, wrong_note_router

app = FastAPI(
    title="CodingGoring AI Server",
    description="AI server for problem generation, hints, solutions, explanations, and wrong-note review.",
    version="0.1.0",
)

# 개발 단계에서는 전체 허용. 배포 시에는 프론트/백엔드 도메인으로 제한하세요.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(problem_router.router, prefix="/ai/problems", tags=["Problems"])
app.include_router(hint_router.router, prefix="/ai/hints", tags=["Hints"])
app.include_router(solution_router.router, prefix="/ai/solutions", tags=["Solutions"])
app.include_router(wrong_note_router.router, prefix="/ai/wrong-notes", tags=["Wrong Notes"])


@app.get("/")
def root():
    return {"message": "CodingGoring AI Server is running"}


@app.get("/health")
def health_check():
    return {"status": "ok"}
