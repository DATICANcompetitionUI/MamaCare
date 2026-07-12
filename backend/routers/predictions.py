from fastapi import APIRouter, HTTPException, Depends, Query
from datetime import datetime, timezone
from bson import ObjectId
from core.database import get_db
from middleware.auth_middleware import get_current_patient, get_current_provider
from models.prediction import HealthInputData
from services.gemini import predict_risk

router = APIRouter(prefix="/api/v1/predictions", tags=["Predictions"])


def serialize_prediction(pred: dict) -> dict:
    """Convert MongoDB document to JSON-serializable dict."""
    pred["id"] = str(pred.pop("_id"))
    return pred


@router.post("")
async def create_prediction(
    payload: HealthInputData,
    current_user: dict = Depends(get_current_patient)
):
    """
    Submit health data → Gemini risk assessment → Save → Return result.
    """
    db = get_db()
    uid = current_user["uid"]

    # Fetch User & Profile for static data
    user_doc = await db.users.find_one({"firebase_uid": uid})
    profile_doc = await db.patient_profiles.find_one({"user_id": uid})

    if not user_doc or not profile_doc:
        raise HTTPException(status_code=400, detail="User profile incomplete")

    # Calculate Age
    dob_str = user_doc.get("date_of_birth")
    age = 25 # Default fallback
    if dob_str:
        try:
            dob = datetime.fromisoformat(dob_str.replace("Z", "+00:00")).replace(tzinfo=timezone.utc)
            now_dt = datetime.now(timezone.utc)
            age = now_dt.year - dob.year - ((now_dt.month, now_dt.day) < (dob.month, dob.day))
        except ValueError:
            pass

    # Parse Blood Pressure
    bp_systolic = None
    bp_diastolic = None
    if payload.bp:
        parts = payload.bp.split("/")
        if len(parts) == 2:
            try:
                bp_systolic = int(parts[0].strip())
                bp_diastolic = int(parts[1].strip())
            except ValueError:
                pass

    # Build comprehensive health data package for Gemini
    health_data = {
        "age": age,
        "gestational_age_weeks": payload.gestational_age_weeks or profile_doc.get("gestational_age_weeks", 0),
        "bp_systolic": bp_systolic,
        "bp_diastolic": bp_diastolic,
        "blood_sugar": payload.blood_sugar,
        "temperature": payload.temperature,
        "heart_rate": payload.heart_rate,
        "haemoglobin": payload.haemoglobin,
        "symptoms": payload.symptoms,
        "other_info": payload.other_info,
        "previous_pregnancies": profile_doc.get("previous_pregnancies", 0),
        "pre_existing_conditions": profile_doc.get("pre_existing_conditions", [])
    }

    # Call Gemini
    ai_result = await predict_risk(health_data, language=payload.language)

    now = datetime.now(timezone.utc).isoformat()

    # Save to MongoDB
    prediction_doc = {
        "patient_id": uid,
        "input_data": health_data,
        "risk_level": ai_result.get("risk_level", "MODERATE"),
        "conditions_flagged": ai_result.get("conditions_flagged", []),
        "recommendations": ai_result.get("recommendations", []),
        "explanation": ai_result.get("explanation", ""),
        "gemini_raw_response": str(ai_result),
        "created_at": now,
    }

    result = await db.predictions.insert_one(prediction_doc)
    prediction_doc["id"] = str(result.inserted_id)
    prediction_doc.pop("_id", None)

    return prediction_doc


@router.get("")
async def get_my_predictions(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=50),
    current_user: dict = Depends(get_current_patient)
):
    """Get paginated list of current patient's predictions, newest first."""
    db = get_db()
    uid = current_user["uid"]
    skip = (page - 1) * limit

    cursor = db.predictions.find(
        {"patient_id": uid},
        {"gemini_raw_response": 0}  # exclude raw response from list
    ).sort("created_at", -1).skip(skip).limit(limit)

    predictions = []
    async for pred in cursor:
        predictions.append(serialize_prediction(pred))

    total = await db.predictions.count_documents({"patient_id": uid})

    return {
        "predictions": predictions,
        "total": total,
        "page": page,
        "pages": (total + limit - 1) // limit
    }


@router.get("/{prediction_id}")
async def get_prediction_detail(
    prediction_id: str,
    current_user: dict = Depends(get_current_patient)
):
    """Get full details of a single prediction."""
    db = get_db()
    uid = current_user["uid"]

    try:
        obj_id = ObjectId(prediction_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid prediction ID")

    pred = await db.predictions.find_one(
        {"_id": obj_id, "patient_id": uid}
    )

    if not pred:
        raise HTTPException(status_code=404, detail="Prediction not found")

    return serialize_prediction(pred)



