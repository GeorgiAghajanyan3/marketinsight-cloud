from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models import Project
from app.models.option import Option
from app.models.question import Question
from app.models.survey import Survey
from app.routes.projects import router as projects_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MarketInsight Cloud API",
    version="1.0.0"
)

# CORS-ը ավելացնում ենք ՄԵԿ անգամ՝ թույլատրելով բոլոր origin-ները
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(projects_router)


@app.get("/")
def root():
    return {"message": "Welcome to MarketInsight Cloud"}


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.get("/db-test")
def database_test():
    return {"database": "Connected"}


@app.get("/api/dashboard")
def get_dashboard():
    return {
        "projects": 244,
        "surveys": 156,
        "competitors": 78,
        "reports": 19,
    }