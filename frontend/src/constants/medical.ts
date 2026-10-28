import type { HeartFormData } from '../types/heart';

export const DEFAULT_FORM_DATA: HeartFormData = {
  age: 40,
  sex: 'M',
  restingBP: 120,
  cholesterol: 200,
  fastingBS: 0,
  maxHR: 150,
  chestPain: 'ATA',
  restingECG: 'Normal',
  exerciseAngina: 'N',
  oldpeak: 1.0,
  stSlope: 'Up',
  ca: 0,
  thal: 'Normal'
};

export interface MedicalTermInfo {
  title: string;
  simpleExplanation: string;
  clinicalSignificance: string;
  healthyRange?: string;
}

export const MEDICAL_EXPLANATIONS: Record<string, MedicalTermInfo> = {
  age: {
    title: "Patient Age",
    simpleExplanation: "Chronological age in years. Cardiovascular risk naturally increases as blood vessels gradually stiffen with aging.",
    clinicalSignificance: "Primary non-modifiable risk biomarker in epidemiological risk modeling.",
    healthyRange: "All ages (Risk increases notably > 45 in men, > 55 in women)"
  },
  sex: {
    title: "Biological Sex",
    simpleExplanation: "Biological male or female. Biological males historically exhibit onset of cardiovascular symptoms earlier in life.",
    clinicalSignificance: "Hormonal cardioprotection factors (such as estrogen in pre-menopausal females) influence arterial elasticity.",
    healthyRange: "Biological baseline"
  },
  restingBP: {
    title: "Resting Blood Pressure",
    simpleExplanation: "The systolic blood pressure (top number) measured in millimeters of mercury (mm Hg) while sitting quietly at rest.",
    clinicalSignificance: "Chronic high pressure strains the arterial walls, creating micro-tears where atherosclerotic plaque accumulates.",
    healthyRange: "< 120 mm Hg (Normal), 120-129 (Elevated), ≥ 130 (Hypertension)"
  },
  cholesterol: {
    title: "Serum Cholesterol",
    simpleExplanation: "Total concentration of lipid molecules circulating in your bloodstream, measured in milligrams per deciliter (mg/dL).",
    clinicalSignificance: "Excess low-density lipoprotein deposits inside coronary arteries, narrowing the blood supply to cardiac tissue.",
    healthyRange: "< 200 mg/dL (Desirable), 200-239 (Borderline), ≥ 240 (High)"
  },
  fastingBS: {
    title: "Fasting Blood Sugar",
    simpleExplanation: "Blood glucose concentration after fasting for at least 8 hours. Categorized as normal (≤ 120 mg/dL) or elevated (> 120 mg/dL).",
    clinicalSignificance: "Hyperglycemia can accelerate arterial inflammation, stiffen capillaries, and multiply cardiovascular risk.",
    healthyRange: "≤ 120 mg/dL (Normal fasting glycemic level)"
  },
  maxHR: {
    title: "Maximum Heart Rate Achieved",
    simpleExplanation: "The peak beats per minute reached during stress testing or intense cardiovascular exertion.",
    clinicalSignificance: "Inability to achieve expected peak heart rate (roughly 220 minus age) may signal chronotropic incompetence or coronary insufficiency.",
    healthyRange: "Target peak exercise: 75% - 95% of (220 - Age)"
  },
  chestPain: {
    title: "Chest Pain Category",
    simpleExplanation: "Classification of discomfort: Typical Angina (exertional pressure), Atypical Angina (non-classical symptoms), Non-Anginal (muscular/digestive), or Asymptomatic (silent).",
    clinicalSignificance: "Essential clinical indicator for assessing probability of obstructive coronary artery disease.",
    healthyRange: "Asymptomatic or non-ischemic discomfort"
  },
  restingECG: {
    title: "Resting Electrocardiogram (ECG)",
    simpleExplanation: "The electrical waveform of the resting heart. Normal means standard rhythm; ST wave abnormality means irregular repolarization; LVH indicates ventricular enlargement.",
    clinicalSignificance: "Detects underlying structural hypertrophy or sub-clinical conduction abnormalities.",
    healthyRange: "Normal electrical pattern"
  },
  exerciseAngina: {
    title: "Exercise-Induced Angina",
    simpleExplanation: "Whether physical exertion provokes chest pain or constriction that subsides upon resting.",
    clinicalSignificance: "Key symptom indicating mismatch between cardiac oxygen demand and arterial supply during exertion.",
    healthyRange: "Absent (No pain during physical effort)"
  },
  oldpeak: {
    title: "ST Depression (Oldpeak)",
    simpleExplanation: "The downward shift (in millimeters) of the electrocardiogram ST segment during exercise relative to rest.",
    clinicalSignificance: "A depressed ST segment > 1.5mm is a classic hallmark of exertional myocardial ischemia (reduced blood supply to heart muscle).",
    healthyRange: "0.0 - 1.0 mm (Minimal to no ST depression)"
  },
  stSlope: {
    title: "Peak Exercise ST Slope",
    simpleExplanation: "The geometric slope of the ST segment during peak exercise: Upsloping (healthy response), Flat (suspicious for ischemia), or Downsloping (strong indicator of ischemia).",
    clinicalSignificance: "Horizontal or downsloping ST segments strongly correlate with multi-vessel coronary obstruction.",
    healthyRange: "Upsloping (Healthy cardiac electrophysiology)"
  },
  ca: {
    title: "Major Vessels Colored by Fluoroscopy",
    simpleExplanation: "Number of major coronary blood vessels (0 to 3) showing open contrast dye flow under X-ray imaging.",
    clinicalSignificance: "Direct anatomical visualization of patent coronary arteries.",
    healthyRange: "0-3 vessels freely patent"
  },
  thal: {
    title: "Thallium Stress Test Scintigraphy",
    simpleExplanation: "Nuclear imaging showing blood flow to heart tissue: Normal, Fixed Defect (previous scar), or Reversible Defect (temporary reduced flow under stress).",
    clinicalSignificance: "Pinpoints viable vs scarred myocardial tissue under stress testing.",
    healthyRange: "Normal perfusion"
  }
};

export const CHEST_PAIN_OPTIONS = [
  { value: 'ATA', label: 'Atypical Angina', subtitle: 'Discomfort not meeting all classical angina criteria' },
  { value: 'NAP', label: 'Non-Anginal Pain', subtitle: 'Atypical chest ache, often musculoskeletal or digestive' },
  { value: 'TA', label: 'Typical Angina', subtitle: 'Exertional pressure or constriction relieved by rest' },
  { value: 'ASY', label: 'Asymptomatic', subtitle: 'No perceived chest distress or exertional pain' },
];

export const RESTING_ECG_OPTIONS = [
  { value: 'Normal', label: 'Normal', subtitle: 'Standard electrical repolarization waveform' },
  { value: 'ST', label: 'ST-T Wave Abnormality', subtitle: 'T-wave inversions or ST deviation > 0.05 mV' },
  { value: 'LVH', label: 'Left Ventricular Hypertrophy', subtitle: 'Estes criteria indicating enlarged ventricular wall' },
];

export const ST_SLOPE_OPTIONS = [
  { value: 'Up', label: 'Upsloping', subtitle: 'Rapid upward return (characteristic of healthy myocardium)' },
  { value: 'Flat', label: 'Flat / Horizontal', subtitle: 'Delayed recovery (potential subendocardial ischemia)' },
  { value: 'Down', label: 'Downsloping', subtitle: 'Downward shift (significant correlation with CAD)' },
];

export const LIFESTYLE_RECOMMENDATIONS = {
  Low: [
    {
      title: "Maintain Aerobic Stamina",
      description: "Target at least 150 minutes of moderate aerobic activity (e.g. brisk walking, cycling) per week to keep the vascular endothelium resilient.",
      category: "Activity",
      icon: "activity"
    },
    {
      title: "Mediterranean-Style Nutrition",
      description: "Emphasize cold-pressed olive oil, dietary fibers, omega-3 fatty acids, and vibrant antioxidant-rich vegetables.",
      category: "Nutrition",
      icon: "apple"
    },
    {
      title: "Circadian Rhythm & Recovery",
      description: "Prioritize 7-8 hours of restful sleep. Restorative sleep optimizes cortisol regulation and autonomic tone.",
      category: "Recovery",
      icon: "moon"
    },
    {
      title: "Annual Biometric Check",
      description: "Continue scheduled annual lipid panels and resting blood pressure screenings with your primary physician.",
      category: "Prevention",
      icon: "shield-check"
    }
  ],
  Moderate: [
    {
      title: "Targeted Blood Pressure Control",
      description: "Incorporate low-sodium seasoning alternatives and track resting blood pressure weekly in a calm home environment.",
      category: "Vitals",
      icon: "activity"
    },
    {
      title: "Cardiorespiratory Conditioning",
      description: "Engage in structured Zone 2 aerobic workouts (conversational pace) to strengthen myocardial efficiency without excess strain.",
      category: "Exercise",
      icon: "flame"
    },
    {
      title: "Lipid Optimization",
      description: "Consult with your healthcare practitioner regarding advanced lipid testing (ApoB, Lp(a)) to assess arterial plaque risk.",
      category: "Biomarkers",
      icon: "clipboard"
    },
    {
      title: "Stress Regulation Protocols",
      description: "Practice diaphragmatic breathing or meditation 10 minutes daily to dampen chronic sympathetic vascular constriction.",
      category: "Wellness",
      icon: "heart"
    }
  ],
  High: [
    {
      title: "Comprehensive Clinical Consultation",
      description: "Schedule a formal consultation with a board-certified cardiologist for formal stress echocardiography or CT coronary calcium scoring.",
      category: "Urgent",
      icon: "alert-triangle"
    },
    {
      title: "Prescription Biomarker Review",
      description: "Review current pharmacotherapy options (statins, antihypertensives) with your physician to proactively manage arterial resistance.",
      category: "Medical",
      icon: "shield"
    },
    {
      title: "Monitored Cardiac Exercise",
      description: "Exercise under supervised cardiac rehabilitation guidance before attempting high-intensity exertion or heavy weight training.",
      category: "Safety",
      icon: "activity"
    },
    {
      title: "Strict Heart-Healthy Diet",
      description: "Eliminate ultra-processed foods, saturated trans fats, and excess dietary sodium to reduce vascular inflammation immediately.",
      category: "Nutrition",
      icon: "apple"
    }
  ]
};
