from fastapi import FastAPI
from routers import assistant_routes

app = FastAPI()
app.include_router(assistant_routes.router)

@app.get("/")
def home():
    return {"message":"MamaCare AI backend running"}

#uvicorn main:app --reload