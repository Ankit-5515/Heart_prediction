import os
import joblib
import pandas as pd
from typing import Optional, Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field

# Initialize FastAPI app
app = FastAPI(
    title="Dil Dekho — Heart Disease Risk Prediction API",
    description="Production-grade ML inference API matching the clinical KNN Heart model",
    version="2.0.0"
)

# Enable CORS for local dev and frontends
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load saved ML model, scaler, and expected feature columns
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "KNN_heart.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "scaler.pkl")
COLUMNS_PATH = os.path.join(BASE_DIR, "columns.pkl")

try:
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    expected_columns = joblib.load(COLUMNS_PATH)
    print(f"[API] Successfully loaded model, scaler, and {len(expected_columns)} feature columns.")
except Exception as e:
    print(f"[API ERROR] Failed to load model artifacts: {e}")
    model, scaler, expected_columns = None, None, None


class HeartPredictionInput(BaseModel):
    # Personal Biometrics
    age: int = Field(default=40, ge=1, le=120, description="Age in years")
    sex: str = Field(default="M", description="Biological Sex ('M' or 'F')")
    
    # Vitals
    resting_bp: float = Field(default=120, ge=50, le=250, description="Resting Blood Pressure (mm Hg)")
    cholesterol: float = Field(default=200, ge=0, le=700, description="Serum Cholesterol (mg/dL)")
    fasting_bs: int = Field(default=0, ge=0, le=1, description="Fasting Blood Sugar > 120 mg/dL (1=True, 0=False)")
    max_hr: float = Field(default=150, ge=40, le=250, description="Maximum Heart Rate achieved (bpm)")
    
    # Clinical Cardiac Indicators
    chest_pain: str = Field(default="ATA", description="Chest Pain Type: 'ATA', 'NAP', 'TA', or 'ASY'")
    resting_ecg: str = Field(default="Normal", description="Resting ECG: 'Normal', 'ST', or 'LVH'")
    exercise_angina: str = Field(default="N", description="Exercise-induced angina: 'Y' or 'N'")
    oldpeak: float = Field(default=1.0, ge=-2.0, le=10.0, description="ST Depression induced by exercise relative to rest")
    st_slope: str = Field(default="Up", description="Slope of the peak exercise ST segment: 'Up', 'Flat', or 'Down'")
    
    # Optional supplementary features
    ca: Optional[int] = Field(default=0, description="Number of major vessels (0-3) colored by fluoroscopy")
    thal: Optional[str] = Field(default="Normal", description="Thalassemia status")

    class Config:
        # Allow alternate aliases (e.g. PascalCase or snake_case)
        populate_by_name = True


def analyze_vitals(data: HeartPredictionInput) -> list:
    """Analyze individual biomarkers against medical clinical guidelines."""
    indicators = []
    
    # Blood Pressure Analysis (AHA Guidelines)
    if data.resting_bp < 120:
        indicators.append({"vital": "Resting Blood Pressure", "status": "optimal", "value": f"{int(data.resting_bp)} mm Hg", "note": "Optimal systolic range (< 120 mm Hg)"})
    elif data.resting_bp <= 129:
        indicators.append({"vital": "Resting Blood Pressure", "status": "elevated", "value": f"{int(data.resting_bp)} mm Hg", "note": "Elevated pre-hypertensive zone"})
    elif data.resting_bp <= 139:
        indicators.append({"vital": "Resting Blood Pressure", "status": "warning", "value": f"{int(data.resting_bp)} mm Hg", "note": "Stage 1 Hypertension (130-139 mm Hg)"})
    else:
        indicators.append({"vital": "Resting Blood Pressure", "status": "critical", "value": f"{int(data.resting_bp)} mm Hg", "note": "Stage 2 Hypertension (>= 140 mm Hg)"})

    # Cholesterol Analysis
    if data.cholesterol == 0:
        indicators.append({"vital": "Serum Cholesterol", "status": "neutral", "value": "Unmeasured", "note": "Zero value treated as clinical non-record"})
    elif data.cholesterol < 200:
        indicators.append({"vital": "Serum Cholesterol", "status": "optimal", "value": f"{int(data.cholesterol)} mg/dL", "note": "Desirable level (< 200 mg/dL)"})
    elif data.cholesterol <= 239:
        indicators.append({"vital": "Serum Cholesterol", "status": "elevated", "value": f"{int(data.cholesterol)} mg/dL", "note": "Borderline high (200-239 mg/dL)"})
    else:
        indicators.append({"vital": "Serum Cholesterol", "status": "critical", "value": f"{int(data.cholesterol)} mg/dL", "note": "High cholesterol (>= 240 mg/dL)"})

    # Fasting Blood Sugar
    if data.fasting_bs == 0:
        indicators.append({"vital": "Fasting Blood Sugar", "status": "optimal", "value": "Normal (≤ 120 mg/dL)", "note": "Within healthy glycemic index"})
    else:
        indicators.append({"vital": "Fasting Blood Sugar", "status": "warning", "value": "Elevated (> 120 mg/dL)", "note": "Indicates impaired fasting glucose or diabetes risk"})

    # Maximum Heart Rate
    expected_max = 220 - data.age
    ratio = data.max_hr / expected_max if expected_max > 0 else 1.0
    if ratio >= 0.85:
        indicators.append({"vital": "Cardiac Capacity (Max HR)", "status": "optimal", "value": f"{int(data.max_hr)} bpm", "note": f"Robust cardiovascular response ({int(ratio*100)}% of age-predicted max)"})
    elif ratio >= 0.70:
        indicators.append({"vital": "Cardiac Capacity (Max HR)", "status": "elevated", "value": f"{int(data.max_hr)} bpm", "note": f"Moderate cardiovascular response ({int(ratio*100)}% of age max)"})
    else:
        indicators.append({"vital": "Cardiac Capacity (Max HR)", "status": "warning", "value": f"{int(data.max_hr)} bpm", "note": "Below target peak exercise capacity"})

    # Exercise Angina & ST Depression
    if data.exercise_angina.upper() == "Y":
        indicators.append({"vital": "Exercise-Induced Angina", "status": "critical", "value": "Present", "note": "Chest distress during exertion is a strong cardiac indicator"})
    else:
        indicators.append({"vital": "Exercise-Induced Angina", "status": "optimal", "value": "Absent", "note": "No ischemic symptoms during exercise"})

    if data.oldpeak > 2.0:
        indicators.append({"vital": "ST Depression (Oldpeak)", "status": "critical", "value": f"{data.oldpeak:.1f} mm", "note": "Significant ST depression suggests myocardial ischemia"})
    elif data.oldpeak > 1.0:
        indicators.append({"vital": "ST Depression (Oldpeak)", "status": "elevated", "value": f"{data.oldpeak:.1f} mm", "note": "Moderate ST shift during recovery"})
    else:
        indicators.append({"vital": "ST Depression (Oldpeak)", "status": "optimal", "value": f"{data.oldpeak:.1f} mm", "note": "Normal electrographic recovery"})

    return indicators


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Dil Dekho Prediction API",
        "model_loaded": model is not None,
        "features_count": len(expected_columns) if expected_columns else 0
    }


@app.post("/predict")
@app.post("/api/predict")
def predict_heart_disease(payload: Dict[str, Any]):
    if model is None or scaler is None or expected_columns is None:
        raise HTTPException(status_code=500, detail="ML model artifacts not loaded on server.")

    try:
        # Extract fields supporting both camelCase, PascalCase, and snake_case
        age = int(payload.get("age", payload.get("Age", 40)))
        sex = str(payload.get("sex", payload.get("Sex", "M"))).strip().upper()
        if sex not in ["M", "F"]:
            sex = "M"

        chest_pain = str(payload.get("chest_pain", payload.get("chestPain", payload.get("ChestPainType", "ATA")))).strip().upper()
        if chest_pain not in ["ATA", "NAP", "TA", "ASY"]:
            chest_pain = "ATA"

        resting_bp = float(payload.get("resting_bp", payload.get("restingBP", payload.get("RestingBP", 120))))
        cholesterol = float(payload.get("cholesterol", payload.get("Cholesterol", 200)))
        fasting_bs = int(payload.get("fasting_bs", payload.get("fastingBS", payload.get("FastingBS", 0))))
        resting_ecg = str(payload.get("resting_ecg", payload.get("restingECG", payload.get("RestingECG", "Normal")))).strip()
        if resting_ecg not in ["Normal", "ST", "LVH"]:
            resting_ecg = "Normal"

        max_hr = float(payload.get("max_hr", payload.get("maxHR", payload.get("MaxHR", 150))))
        exercise_angina = str(payload.get("exercise_angina", payload.get("exerciseAngina", payload.get("ExerciseAngina", "N")))).strip().upper()
        if exercise_angina not in ["Y", "N"]:
            exercise_angina = "N"

        oldpeak = float(payload.get("oldpeak", payload.get("Oldpeak", 1.0)))
        st_slope = str(payload.get("st_slope", payload.get("stSlope", payload.get("ST_Slope", "Up")))).strip().capitalize()
        if st_slope not in ["Up", "Flat", "Down"]:
            st_slope = "Up"

        ca = int(payload.get("ca", 0))
        thal = str(payload.get("thal", "Normal"))

        # Exact encoding from original app.py
        raw_input = {
            'Age': age,
            'RestingBP': resting_bp,
            'Cholesterol': cholesterol,
            'FastingBS': fasting_bs,
            'MaxHR': max_hr,
            'Oldpeak': oldpeak,
            'Sex_' + sex: 1,
            'ChestPainType_' + chest_pain: 1,
            'RestingECG_' + resting_ecg: 1,
            'ExerciseAngina_' + exercise_angina: 1,
            'ST_Slope_' + st_slope: 1
        }

        # Create input dataframe
        input_df = pd.DataFrame([raw_input])

        # Fill in missing columns with 0s
        for col in expected_columns:
            if col not in input_df.columns:
                input_df[col] = 0

        # Reorder columns strictly to match scaler & model expected format
        input_df = input_df[expected_columns]

        # Scale the input
        scaled_input = scaler.transform(input_df)

        # Make prediction
        prediction = int(model.predict(scaled_input)[0])

        # Calculate exact probability from KNN if available
        if hasattr(model, 'predict_proba'):
            proba = model.predict_proba(scaled_input)[0]
            # proba[1] is the probability of class 1 (heart disease)
            prob_percent = float(proba[1]) * 100.0
        else:
            prob_percent = 85.0 if prediction == 1 else 15.0

        # Risk level categorization
        if prob_percent >= 60.0 or prediction == 1:
            risk_level = "High"
            message = "Elevated cardiovascular risk profile detected. Clinical biomarkers suggest significant probability of coronary artery involvement."
        elif prob_percent >= 30.0:
            risk_level = "Moderate"
            message = "Moderate cardiovascular risk profile detected. Several sub-optimal vitals indicate benefit from proactive lifestyle modifications."
        else:
            risk_level = "Low"
            message = "Favorable cardiovascular risk profile detected. Your current biometrics align with healthy cardiac patterns."

        # Generate biomarker factor breakdown
        typed_input = HeartPredictionInput(
            age=age, sex=sex, resting_bp=resting_bp, cholesterol=cholesterol,
            fasting_bs=fasting_bs, max_hr=max_hr, chest_pain=chest_pain,
            resting_ecg=resting_ecg, exercise_angina=exercise_angina,
            oldpeak=oldpeak, st_slope=st_slope, ca=ca, thal=thal
        )
        factors = analyze_vitals(typed_input)

        return {
            "prediction": prediction,
            "risk_level": risk_level,
            "probability": round(prob_percent, 1),
            "message": message,
            "factors": factors,
            "model_type": "K-Nearest Neighbors (KNN)",
            "status": "success"
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Inference computation error: {str(e)}")


# Serve static frontend if built
FRONTEND_DIST = os.path.join(BASE_DIR, "frontend", "dist")
if os.path.exists(FRONTEND_DIST):
    app.mount("/assets", StaticFiles(directory=os.path.join(FRONTEND_DIST, "assets")), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        file_path = os.path.join(FRONTEND_DIST, full_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(FRONTEND_DIST, "index.html"))


if __name__ == "__main__":
    import uvicorn
    print("Starting Dil Dekho API server on http://localhost:5000 ...")
    uvicorn.run("server:app", host="0.0.0.0", port=5000, reload=True)
