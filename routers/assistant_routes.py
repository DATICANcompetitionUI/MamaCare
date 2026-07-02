from fastapi import APIRouter

router = APIRouter( prefix="/assistant",tags = ["assistant"])

@router.get("/ping")
def ping():
    return {"status":"assistant router is working"}