from sqlalchemy import Column, Integer, ForeignKey
from app.database import Base


class Response(Base):
    __tablename__ = "responses"

    id = Column(Integer, primary_key=True, index=True)

    question_id = Column(
        Integer,
        ForeignKey("questions.id")
    )

    option_id = Column(
        Integer,
        ForeignKey("options.id")
    )