from sqlalchemy import Column, Integer, String
from app.database import Base

class Survey(Base):
    __tablename__ = "surveys"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    status = Column(String)