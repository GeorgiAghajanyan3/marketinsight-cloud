from fastapi import FastAPI

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
