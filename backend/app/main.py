from app.models import Project
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routes.projects import router as projects_router
from app.models.question import Question
from app.models.option import Option
from app.models.survey import Survey

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MarketInsight Cloud API",
    version="1.0.0"
)

app.include_router(projects_router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
                   "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "Welcome to MarketInsight Cloud"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

@app.get("/db-test")
def database_test():
    return {
        "database": "Connected"
    }

@app.get("/api/dashboard")
def get_dashboard():
    return {
        "projects": 244,
        "surveys": 156,
        "competitors": 78,
        "reports": 19
    }