from pydantic import BaseModel

class OptionCreate(BaseModel):
    question_id: int
    text: str


class OptionResponse(BaseModel):
    id: int
    question_id: int
    text: str

    class Config:
        from_attributes = True