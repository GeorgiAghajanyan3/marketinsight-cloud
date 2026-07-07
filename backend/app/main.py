from fastapi import FastAPI
from app.database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MarketInsight Cloud API",
    version="1.0.0"
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
