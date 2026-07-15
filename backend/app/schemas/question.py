from pydantic import BaseModel

class QuestionCreate(BaseModel):
    survey_id: int
    text: str

class QuestionResponse(BaseModel):
    id: int
    survey_id: int
    text: str

    class Config:
        from_attributes = True