import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type {
  HeartFormData,
  Sex,
  ChestPainType,
  RestingECG,
  ExerciseAngina,
  STSlope,
  Thalassemia
} from '../types/heart';
import {
  CHEST_PAIN_OPTIONS,
  RESTING_ECG_OPTIONS,
  ST_SLOPE_OPTIONS,
  DEFAULT_FORM_DATA
} from '../constants/medical';
import { MedicalTooltip } from './MedicalTooltip';
import {
  User,
  Activity,
  Stethoscope,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Lock,
  RotateCcw
} from 'lucide-react';

interface HeartFormProps {
  formData: HeartFormData;
  onChange: (updated: HeartFormData) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function HeartForm({ formData, onChange, onSubmit, isLoading }: HeartFormProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const updateField = <K extends keyof HeartFormData>(key: K, value: HeartFormData[K]) => {
    onChange({ ...formData, [key]: value });
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
  };

  const loadPreset = (type: 'healthy' | 'risk') => {
    if (type === 'healthy') {
      onChange({
        age: 34,
        sex: 'F',
        restingBP: 115,
        cholesterol: 180,
        fastingBS: 0,
        maxHR: 172,
        chestPain: 'ATA',
        restingECG: 'Normal',
        exerciseAngina: 'N',
        oldpeak: 0.2,
        stSlope: 'Up',
        ca: 0,
        thal: 'Normal'
      });
    } else {
      onChange({
        age: 58,
        sex: 'M',
        restingBP: 148,
        cholesterol: 285,
        fastingBS: 1,
        maxHR: 118,
        chestPain: 'ASY',
        restingECG: 'ST',
        exerciseAngina: 'Y',
        oldpeak: 2.8,
        stSlope: 'Flat',
        ca: 2,
        thal: 'Reversible'
      });
    }
  };

  return (
    <div id="predict" className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 mb-3">
          Clinical Assessment
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Cardiovascular Risk Calculator
        </h2>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
          Input your physiological and clinical vitals below. Our machine learning model evaluates risk probability based on 11 validated cardiac biomarkers.
        </p>

        {/* Quick presets */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="text-xs text-neutral-400">Quick presets:</span>
          <button
            type="button"
            onClick={() => loadPreset('healthy')}
            className="text-xs px-2.5 py-1 rounded-lg glass-pill text-teal-600 dark:text-teal-400 hover:bg-teal-500/10 transition-colors font-medium"
          >
            Sample Low Risk
          </button>
          <button
            type="button"
            onClick={() => loadPreset('risk')}
            className="text-xs px-2.5 py-1 rounded-lg glass-pill text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors font-medium"
          >
            Sample High Risk
          </button>
          <button
            type="button"
            onClick={() => onChange(DEFAULT_FORM_DATA)}
            className="text-xs px-2 py-1 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors inline-flex items-center gap-1"
            title="Reset to defaults"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Glass Form Card */}
      <div className="relative glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl transition-all duration-300">
        {/* Step Progress Navigation */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-2 max-w-md mx-auto mb-3">
            {[
              { num: 1, label: 'Personal', icon: User },
              { num: 2, label: 'Vitals', icon: Activity },
              { num: 3, label: 'Clinical', icon: Stethoscope },
            ].map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.num;
              const isPassed = currentStep > step.num;

              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => setCurrentStep(step.num as 1 | 2 | 3)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
                      : isPassed
                      ? 'text-rose-500 hover:bg-rose-500/10'
                      : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs ${
                      isActive ? 'bg-white/20' : isPassed ? 'bg-rose-500/10' : 'bg-neutral-200/60 dark:bg-neutral-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
              );
            })}
          </div>

          {/* Progress track */}
          <div className="w-full max-w-md mx-auto h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-rose-500 to-rose-600 rounded-full"
              initial={false}
              animate={{ width: `${(currentStep / 3) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (currentStep < 3) {
              handleNext();
            } else {
              onSubmit();
            }
          }}
        >
          <AnimatePresence mode="wait">
            {/* STEP 1: PERSONAL BIOMETRICS */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                <div className="border-b border-neutral-200/60 dark:border-white/10 pb-4">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    Step 1: Patient Demographics
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Basic physiological characteristics foundational for epidemiological baseline risk.
                  </p>
                </div>

                {/* Age Slider */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <label htmlFor="age" className="text-sm font-semibold text-neutral-900 dark:text-white">
                        Age
                      </label>
                      <MedicalTooltip termKey="age" />
                    </div>
                    <span className="text-base font-bold text-rose-500 px-3 py-1 rounded-xl bg-rose-500/10">
                      {formData.age} <span className="text-xs font-normal text-neutral-500">years</span>
                    </span>
                  </div>
                  <input
                    id="age"
                    type="range"
                    min={18}
                    max={95}
                    value={formData.age}
                    onChange={(e) => updateField('age', Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[11px] text-neutral-400 mt-2 font-medium">
                    <span>18 yrs</span>
                    <span>40 yrs (Median)</span>
                    <span>95 yrs</span>
                  </div>
                </div>

                {/* Sex Segmented Control */}
                <div>
                  <div className="flex items-center gap-1.5 mb-3">
                    <label className="text-sm font-semibold text-neutral-900 dark:text-white">
                      Biological Sex
                    </label>
                    <MedicalTooltip termKey="sex" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-neutral-200/60 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
                    {(['M', 'F'] as Sex[]).map((option) => {
                      const isSelected = formData.sex === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField('sex', option)}
                          className={`relative py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                            isSelected
                              ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-md'
                              : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                          }`}
                        >
                          <span>{option === 'M' ? 'Male (M)' : 'Female (F)'}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-2">
                    Used to adjust coronary artery baseline risk calculation.
                  </p>
                </div>
              </motion.div>
            )}

            {/* STEP 2: VITALS & HEMODYNAMICS */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                <div className="border-b border-neutral-200/60 dark:border-white/10 pb-4">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    Step 2: Hemodynamic & Metabolic Vitals
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Resting physiological measurements reflecting cardiovascular pressure and metabolic balance.
                  </p>
                </div>

                {/* Resting Blood Pressure Slider */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <label htmlFor="restingBP" className="text-sm font-semibold text-neutral-900 dark:text-white">
                        Resting Blood Pressure
                      </label>
                      <MedicalTooltip termKey="restingBP" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        formData.restingBP < 120
                          ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400'
                          : formData.restingBP < 130
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                      }`}>
                        {formData.restingBP < 120 ? 'Optimal' : formData.restingBP < 130 ? 'Elevated' : 'Hypertensive'}
                      </span>
                      <span className="text-base font-bold text-rose-500 px-3 py-1 rounded-xl bg-rose-500/10">
                        {formData.restingBP} <span className="text-xs font-normal text-neutral-500">mm Hg</span>
                      </span>
                    </div>
                  </div>
                  <input
                    id="restingBP"
                    type="range"
                    min={80}
                    max={200}
                    value={formData.restingBP}
                    onChange={(e) => updateField('restingBP', Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[11px] text-neutral-400 mt-2 font-medium">
                    <span>80 mm Hg</span>
                    <span className="text-teal-600 dark:text-teal-400">120 (Standard Normal)</span>
                    <span>200 mm Hg</span>
                  </div>
                </div>

                {/* Serum Cholesterol Slider */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <label htmlFor="cholesterol" className="text-sm font-semibold text-neutral-900 dark:text-white">
                        Serum Cholesterol
                      </label>
                      <MedicalTooltip termKey="cholesterol" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        formData.cholesterol < 200
                          ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400'
                          : formData.cholesterol < 240
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                      }`}>
                        {formData.cholesterol < 200 ? 'Desirable' : formData.cholesterol < 240 ? 'Borderline' : 'High'}
                      </span>
                      <span className="text-base font-bold text-rose-500 px-3 py-1 rounded-xl bg-rose-500/10">
                        {formData.cholesterol} <span className="text-xs font-normal text-neutral-500">mg/dL</span>
                      </span>
                    </div>
                  </div>
                  <input
                    id="cholesterol"
                    type="range"
                    min={100}
                    max={550}
                    value={formData.cholesterol}
                    onChange={(e) => updateField('cholesterol', Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[11px] text-neutral-400 mt-2 font-medium">
                    <span>100 mg/dL</span>
                    <span className="text-teal-600 dark:text-teal-400">&lt; 200 (Desirable)</span>
                    <span>550 mg/dL</span>
                  </div>
                </div>

                {/* Peak Exercise Heart Rate Slider */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <label htmlFor="maxHR" className="text-sm font-semibold text-neutral-900 dark:text-white">
                        Peak Heart Rate Achieved (Max HR)
                      </label>
                      <MedicalTooltip termKey="maxHR" />
                    </div>
                    <span className="text-base font-bold text-rose-500 px-3 py-1 rounded-xl bg-rose-500/10">
                      {formData.maxHR} <span className="text-xs font-normal text-neutral-500">bpm</span>
                    </span>
                  </div>
                  <input
                    id="maxHR"
                    type="range"
                    min={60}
                    max={210}
                    value={formData.maxHR}
                    onChange={(e) => updateField('maxHR', Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[11px] text-neutral-400 mt-2 font-medium">
                    <span>60 bpm</span>
                    <span>150 bpm (Standard Peak)</span>
                    <span>210 bpm</span>
                  </div>
                </div>

                {/* Fasting Blood Sugar Toggle */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <label className="text-sm font-semibold text-neutral-900 dark:text-white">
                        Fasting Blood Sugar
                      </label>
                      <MedicalTooltip termKey="fastingBS" />
                    </div>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      formData.fastingBS === 0
                        ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400'
                        : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                    }`}>
                      {formData.fastingBS === 0 ? 'Normal Range' : 'Elevated'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-neutral-200/60 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
                    <button
                      type="button"
                      onClick={() => updateField('fastingBS', 0)}
                      className={`py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                        formData.fastingBS === 0
                          ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-md'
                          : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      ≤ 120 mg/dL (Normal)
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField('fastingBS', 1)}
                      className={`py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                        formData.fastingBS === 1
                          ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-md'
                          : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      &gt; 120 mg/dL (Elevated)
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: CLINICAL CARDIAC & ELECTROGRAPHIC INDICATORS */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                <div className="border-b border-neutral-200/60 dark:border-white/10 pb-4">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    Step 3: Clinical & Electrocardiographic Biomarkers
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Specialized diagnostic parameters from resting ECG and exercise cardiac stress tests.
                  </p>
                </div>

                {/* Chest Pain Presentation */}
                <div>
                  <div className="flex items-center gap-1.5 mb-3">
                    <label className="text-sm font-semibold text-neutral-900 dark:text-white">
                      Chest Pain Type
                    </label>
                    <MedicalTooltip termKey="chestPain" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {CHEST_PAIN_OPTIONS.map((opt) => {
                      const isSelected = formData.chestPain === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => updateField('chestPain', opt.value as ChestPainType)}
                          className={`p-3.5 rounded-2xl text-left border transition-all duration-200 ${
                            isSelected
                              ? 'border-rose-500 bg-rose-500/10 dark:bg-rose-500/15 shadow-md shadow-rose-500/10'
                              : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white/40 dark:bg-neutral-900/40'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-sm text-neutral-900 dark:text-white">
                              {opt.label} ({opt.value})
                            </span>
                            {isSelected && (
                              <span className="w-2 h-2 rounded-full bg-rose-500" />
                            )}
                          </div>
                          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 leading-snug">
                            {opt.subtitle}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Resting ECG */}
                <div>
                  <div className="flex items-center gap-1.5 mb-3">
                    <label className="text-sm font-semibold text-neutral-900 dark:text-white">
                      Resting Electrocardiogram (ECG)
                    </label>
                    <MedicalTooltip termKey="restingECG" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {RESTING_ECG_OPTIONS.map((opt) => {
                      const isSelected = formData.restingECG === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => updateField('restingECG', opt.value as RestingECG)}
                          className={`p-3 rounded-2xl text-left border transition-all duration-200 ${
                            isSelected
                              ? 'border-rose-500 bg-rose-500/10 dark:bg-rose-500/15'
                              : 'border-neutral-200 dark:border-neutral-800 bg-white/40 dark:bg-neutral-900/40 hover:border-neutral-300 dark:hover:border-neutral-700'
                          }`}
                        >
                          <div className="font-semibold text-xs text-neutral-900 dark:text-white">
                            {opt.label}
                          </div>
                          <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                            {opt.subtitle}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Exercise-Induced Angina Segmented Control */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <label className="text-sm font-semibold text-neutral-900 dark:text-white">
                        Exercise-Induced Angina
                      </label>
                      <MedicalTooltip termKey="exerciseAngina" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-neutral-200/60 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
                    {(['N', 'Y'] as ExerciseAngina[]).map((opt) => {
                      const isSelected = formData.exerciseAngina === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => updateField('exerciseAngina', opt)}
                          className={`py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                            isSelected
                              ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-md'
                              : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                          }`}
                        >
                          {opt === 'N' ? 'No (Absent)' : 'Yes (Present During Effort)'}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ST Depression (Oldpeak) Slider */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <label htmlFor="oldpeak" className="text-sm font-semibold text-neutral-900 dark:text-white">
                        ST Depression (Oldpeak)
                      </label>
                      <MedicalTooltip termKey="oldpeak" />
                    </div>
                    <span className="text-base font-bold text-rose-500 px-3 py-1 rounded-xl bg-rose-500/10">
                      {formData.oldpeak.toFixed(1)} <span className="text-xs font-normal text-neutral-500">mm</span>
                    </span>
                  </div>
                  <input
                    id="oldpeak"
                    type="range"
                    min={0.0}
                    max={6.0}
                    step={0.1}
                    value={formData.oldpeak}
                    onChange={(e) => updateField('oldpeak', parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[11px] text-neutral-400 mt-2 font-medium">
                    <span className="text-teal-600 dark:text-teal-400">0.0 mm (Normal)</span>
                    <span>2.0 mm (Moderate Ischemia)</span>
                    <span>6.0 mm (Severe)</span>
                  </div>
                </div>

                {/* ST Slope Segmented Control */}
                <div>
                  <div className="flex items-center gap-1.5 mb-3">
                    <label className="text-sm font-semibold text-neutral-900 dark:text-white">
                      Peak Exercise ST Slope
                    </label>
                    <MedicalTooltip termKey="stSlope" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {ST_SLOPE_OPTIONS.map((opt) => {
                      const isSelected = formData.stSlope === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => updateField('stSlope', opt.value as STSlope)}
                          className={`p-3 rounded-2xl text-left border transition-all duration-200 ${
                            isSelected
                              ? 'border-rose-500 bg-rose-500/10 dark:bg-rose-500/15'
                              : 'border-neutral-200 dark:border-neutral-800 bg-white/40 dark:bg-neutral-900/40 hover:border-neutral-300 dark:hover:border-neutral-700'
                          }`}
                        >
                          <div className="font-semibold text-xs text-neutral-900 dark:text-white">
                            {opt.label}
                          </div>
                          <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                            {opt.subtitle}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Optional Supplementary: Major Vessels & Thal */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <label htmlFor="ca" className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                        Major Vessels (Fluoroscopy)
                      </label>
                      <MedicalTooltip termKey="ca" />
                    </div>
                    <select
                      id="ca"
                      value={formData.ca}
                      onChange={(e) => updateField('ca', Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900 text-xs font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    >
                      <option value={0}>0 Major Vessels</option>
                      <option value={1}>1 Major Vessel</option>
                      <option value={2}>2 Major Vessels</option>
                      <option value={3}>3 Major Vessels</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <label htmlFor="thal" className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                        Thallium Scintigraphy
                      </label>
                      <MedicalTooltip termKey="thal" />
                    </div>
                    <select
                      id="thal"
                      value={formData.thal}
                      onChange={(e) => updateField('thal', e.target.value as Thalassemia)}
                      className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900 text-xs font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    >
                      <option value="Normal">Normal Blood Flow</option>
                      <option value="Fixed">Fixed Defect (Past Scar)</option>
                      <option value="Reversible">Reversible Defect (Ischemia)</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Wizard Footer Controls */}
          <div className="mt-10 pt-6 border-t border-neutral-200/60 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                disabled={isLoading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold text-neutral-700 dark:text-neutral-300 glass-pill hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
                <span>Previous Step</span>
              </button>
            ) : (
              <div className="hidden sm:block" />
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl text-sm font-semibold text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 hover:opacity-90 shadow-md transition-all active:scale-95"
              >
                <span>Continue to {currentStep === 1 ? 'Vitals' : 'Clinical Indicators'}</span>
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:shadow-xl hover:shadow-rose-500/30 active:scale-95 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50"
              >
                <Sparkles className="w-5 h-5 stroke-[2.2]" />
                <span>Analyze Cardiovascular Risk</span>
              </button>
            )}
          </div>
        </form>

        {/* Client-Side Privacy Notice Footer */}
        <div className="mt-6 pt-4 flex items-center justify-center gap-2 text-xs text-neutral-400 font-medium">
          <Lock className="w-3.5 h-3.5 text-teal-500" />
          <span>Your biometric data is processed strictly in memory and is never logged or saved to disk.</span>
        </div>
      </div>
    </div>
  );
}
