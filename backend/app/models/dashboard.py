from sqlalchemy import Column, Integer
from app.database import Base


class Dashboard(Base):
    __tablename__ = "dashboard"

    id = Column(Integer, primary_key=True, index=True)

    projects = Column(Integer, default=0)
    surveys = Column(Integer, default=0)
    competitors = Column(Integer, default=0)
    reports = Column(Integer, default=0)
