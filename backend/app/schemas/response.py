from pydantic import BaseModel


class ResponseCreate(BaseModel):
    question_id: int
    option_id: int


class ResponseOut(BaseModel):
    id: int
    question_id: int
    option_id: int

    class Config:
        from_attributes = True