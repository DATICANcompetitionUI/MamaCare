from pydantic import BaseModel
from typing import Optional, List

class HealthInputData(BaseModel):
    gestational_age_weeks: Optional[int] = None
    bp: Optional[str] = None # e.g. "120/80"
    blood_sugar: Optional[float] = None
    temperature: Optional[float] = None
    heart_rate: Optional[int] = None
    haemoglobin: Optional[float] = None
    symptoms: List[str] = []
    other_info: Optional[str] = ""
    language: Optional[str] = "en"

class PredictionResponse(BaseModel):
    id: str
    risk_level: str
    conditions_flagged: List[str]
    recommendations: List[str]
    explanation: str
    created_at: str
