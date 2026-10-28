export type Sex = 'M' | 'F';
export type ChestPainType = 'ATA' | 'NAP' | 'TA' | 'ASY';
export type RestingECG = 'Normal' | 'ST' | 'LVH';
export type ExerciseAngina = 'Y' | 'N';
export type STSlope = 'Up' | 'Flat' | 'Down';
export type Thalassemia = 'Normal' | 'Fixed' | 'Reversible';

export interface HeartFormData {
  // Personal
  age: number;
  sex: Sex;
  
  // Vitals
  restingBP: number;
  cholesterol: number;
  fastingBS: number; // 0 or 1
  maxHR: number;

  // Clinical
  chestPain: ChestPainType;
  restingECG: RestingECG;
  exerciseAngina: ExerciseAngina;
  oldpeak: number;
  stSlope: STSlope;
  ca: number; // 0-3
  thal: Thalassemia;
}

export type RiskLevel = 'Low' | 'Moderate' | 'High';

export interface VitalFactor {
  vital: string;
  status: 'optimal' | 'elevated' | 'warning' | 'critical' | 'neutral';
  value: string;
  note: string;
}

export interface PredictionResult {
  prediction: number;
  risk_level: RiskLevel;
  probability: number;
  message: string;
  factors: VitalFactor[];
  model_type?: string;
  timestamp?: string;
}
