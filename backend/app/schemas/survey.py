from pydantic import BaseModel


class SurveyBase(BaseModel):
    name: str
    status: str


class SurveyCreate(SurveyBase):
    pass


class SurveyResponse(SurveyBase):
    id: int

    class Config:
        from_attributes = True