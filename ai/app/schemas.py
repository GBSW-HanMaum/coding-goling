from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


class TestCase(BaseModel):
    input: str = Field(..., description="Input string for the test case")
    output: str = Field(..., description="Expected output string for the test case")


class ProblemGenerateRequest(BaseModel):
    language: str = Field(..., examples=["python"])
    concept: str = Field(..., examples=["for loop"])
    difficulty: str = Field(..., examples=["beginner"])
    problem_type: str = Field(default="coding", examples=["coding"])
    user_level: Optional[int] = Field(default=None, examples=[1])


class ProblemGenerateResponse(BaseModel):
    title: str
    description: str
    input_description: str
    output_description: str
    constraints: List[str]
    sample_input: str
    sample_output: str
    difficulty: str
    concepts: List[str]
    test_cases: List[TestCase]
    solution_code: str
    explanation: str


class SimilarProblemGenerateRequest(BaseModel):
    language: str = Field(..., examples=["python"])
    original_problem_title: str
    original_problem_description: str
    target_concepts: List[str] = Field(default_factory=list)
    difficulty: str = Field(..., examples=["beginner"])


class HintGenerateRequest(BaseModel):
    problem_title: str
    problem_description: str
    language: str = Field(..., examples=["python"])
    user_code: Optional[str] = ""
    hint_level: int = Field(default=1, ge=1, le=3)


class HintGenerateResponse(BaseModel):
    hint: str
    hint_level: int


class SolutionGenerateRequest(BaseModel):
    language: str = Field(..., examples=["python"])
    problem_title: str
    problem_description: str
    input_description: Optional[str] = ""
    output_description: Optional[str] = ""
    constraints: List[str] = Field(default_factory=list)


class SolutionGenerateResponse(BaseModel):
    solution_code: str
    explanation: str
    time_complexity: str
    space_complexity: str


class FailedTestCase(BaseModel):
    input: str
    expected_output: str
    user_output: str


class SimilarProblemRequestInfo(BaseModel):
    concept: str
    difficulty: str


class WrongNoteAnalyzeRequest(BaseModel):
    language: str = Field(..., examples=["python"])
    problem_title: str
    problem_description: str
    user_code: str
    error_message: Optional[str] = ""
    failed_test_case: Optional[FailedTestCase] = None


class WrongNoteAnalyzeResponse(BaseModel):
    mistake_summary: str
    concepts_to_review: List[str]
    feedback: str
    recommended_hint: str
    similar_problem_request: SimilarProblemRequestInfo
    extra: Optional[Dict[str, Any]] = None
