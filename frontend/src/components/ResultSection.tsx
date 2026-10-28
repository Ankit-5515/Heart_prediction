import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { PredictionResult, HeartFormData } from '../types/heart';
import { LIFESTYLE_RECOMMENDATIONS } from '../constants/medical';
import { generatePdfReport } from '../utils/generatePdf';
import {
  Heart,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Activity,
  Apple,
  Moon,
  ShieldCheck,
  Flame,
  Clipboard,
  Shield
} from 'lucide-react';

interface ResultSectionProps {
  result: PredictionResult;
  formData: HeartFormData;
  onReset: () => void;
}

export function ResultSection({ result, formData, onReset }: ResultSectionProps) {
  const [animatedPercent, setAnimatedPercent] = useState(0);

  // Animate count-up percentage
  useEffect(() => {
    let start = 0;
    const end = Math.min(100, Math.max(0, Math.round(result.probability)));
    const duration = 1600; // ms
    const increment = end / (duration / 25);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedPercent(end);
        clearInterval(timer);
      } else {
        setAnimatedPercent(Math.round(start));
      }
    }, 25);

    return () => clearInterval(timer);
  }, [result.probability]);

  // Soft sparkle celebration for low risk
  useEffect(() => {
    if (result.risk_level === 'Low') {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#14B8A6', '#10B981', '#34D399', '#6EE7B7'],
          disableForReducedMotion: true
        });
      } catch {
        // Fallback gracefully
      }
    }
  }, [result.risk_level]);

  // Circular gauge calculations
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedPercent / 100) * circumference;

  const colorConfig = {
    Low: {
      text: 'text-teal-500',
      bgGlow: 'bg-teal-500/10 shadow-teal-500/20',
      border: 'border-teal-500/30',
      badge: 'bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30',
      hex: '#14B8A6',
      icon: CheckCircle2,
      subtitle: 'Optimal Cardiovascular Profile'
    },
    Moderate: {
      text: 'text-amber-500',
      bgGlow: 'bg-amber-500/10 shadow-amber-500/20',
      border: 'border-amber-500/30',
      badge: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
      hex: '#F59E0B',
      icon: AlertCircle,
      subtitle: 'Sub-Optimal Lifestyle Markers'
    },
    High: {
      text: 'text-rose-500',
      bgGlow: 'bg-rose-500/10 shadow-rose-500/20',
      border: 'border-rose-500/30',
      badge: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
      hex: '#FF2D55',
      icon: AlertTriangle,
      subtitle: 'Clinically Elevated Coronary Risk'
    }
  }[result.risk_level];

  const StatusIcon = colorConfig.icon;
  const recommendations = LIFESTYLE_RECOMMENDATIONS[result.risk_level];

  const getRecommendationIcon = (iconName: string) => {
    switch (iconName) {
      case 'activity':
        return <Activity className="w-4 h-4 text-rose-500" />;
      case 'apple':
        return <Apple className="w-4 h-4 text-teal-500" />;
      case 'moon':
        return <Moon className="w-4 h-4 text-indigo-400" />;
      case 'shield-check':
        return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
      case 'flame':
        return <Flame className="w-4 h-4 text-amber-500" />;
      case 'clipboard':
        return <Clipboard className="w-4 h-4 text-teal-500" />;
      case 'alert-triangle':
        return <AlertTriangle className="w-4 h-4 text-rose-500" />;
      case 'shield':
        return <Shield className="w-4 h-4 text-rose-500" />;
      default:
        return <Heart className="w-4 h-4 text-rose-500" />;
    }
  };

  return (
    <motion.section
      id="results"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 180 }}
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="relative glass-panel rounded-3xl p-6 sm:p-12 shadow-2xl overflow-hidden border border-neutral-200/60 dark:border-white/10">
        
        {/* Soft Ambient Glow in backdrop */}
        <div
          aria-hidden="true"
          className={`absolute top-0 right-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none ${
            result.risk_level === 'Low'
              ? 'bg-teal-500/15'
              : result.risk_level === 'Moderate'
              ? 'bg-amber-500/15'
              : 'bg-rose-500/15'
          }`}
        />

        {/* Top Header Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-neutral-200/60 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider glass-pill text-neutral-600 dark:text-neutral-300 mb-2">
              <StatusIcon className={`w-3.5 h-3.5 ${colorConfig.text}`} />
              <span>Assessment Completed</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Cardiovascular Risk Evaluation
            </h2>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => generatePdfReport(formData, result)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 glass-pill hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-all duration-200"
            >
              <Download className="w-4 h-4 stroke-[2.2]" />
              <span>Download Report (PDF)</span>
            </button>

            <button
              onClick={onReset}
              className="inline-flex items-center justify-center gap-1.5 p-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white glass-pill hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-all"
              title="Check Again"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Check Again</span>
            </button>
          </div>
        </div>

        {/* Center: Hero Circular Gauge & Classification Message */}
        <div className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Animated Gauge */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-56 h-56 flex items-center justify-center">
              {/* SVG Circular Ring */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                {/* Background Ring */}
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-neutral-200/70 dark:text-neutral-800"
                  fill="transparent"
                />
                {/* Active Colored Progress Ring */}
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  stroke={colorConfig.hex}
                  strokeWidth="13"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              {/* Inner Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-1"
                >
                  <Heart className={`w-6 h-6 ${colorConfig.text} fill-current animate-heartbeat`} />
                </motion.div>
                <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                  {animatedPercent}%
                </div>
                <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-0.5">
                  Risk Probability
                </div>
              </div>
            </div>

            {/* Classification Pill Badge */}
            <div className={`mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${colorConfig.badge}`}>
              <span>{result.risk_level} Risk Level</span>
            </div>
          </div>

          {/* Right Clinical Summary */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div>
              <span className={`text-xs font-bold tracking-wide uppercase ${colorConfig.text}`}>
                {colorConfig.subtitle}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mt-1">
                {result.risk_level === 'Low'
                  ? 'Your heart biometrics are in a healthy zone.'
                  : result.risk_level === 'Moderate'
                  ? 'Key biometrics indicate borderline risk.'
                  : 'Actionable indicators require physician review.'}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
              {result.message}
            </p>

            <div className="p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/50 border border-neutral-200/60 dark:border-neutral-800 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              <span className="font-semibold text-neutral-900 dark:text-white">Inference Engine: </span>
              K-Nearest Neighbors (KNN) classifier matching multi-dimensional Euclidean proximity across 11 features.
            </div>
          </div>
        </div>

        {/* Biometric Factor Breakdown Table / Grid */}
        <div className="pt-8 border-t border-neutral-200/60 dark:border-white/10">
          <h4 className="text-base font-bold text-neutral-900 dark:text-white mb-4">
            Recorded Biomarker Analysis
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {result.factors.map((factor, index) => {
              const statusColors = {
                optimal: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
                elevated: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
                warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
                critical: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
                neutral: 'bg-neutral-500/10 text-neutral-500 border-neutral-500/20'
              }[factor.status];

              return (
                <div
                  key={index}
                  className="p-3.5 rounded-2xl bg-white/40 dark:bg-neutral-900/40 border border-neutral-200/70 dark:border-neutral-800/80 flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                      {factor.vital}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${statusColors}`}>
                      {factor.status}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-neutral-900 dark:text-white mb-1">
                    {factor.value}
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
                    {factor.note}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4 Lifestyle Guidance Recommendations */}
        <div className="mt-10 pt-8 border-t border-neutral-200/60 dark:border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-bold text-neutral-900 dark:text-white">
              Evidence-Based Recommendations
            </h4>
            <span className="text-xs text-neutral-400">Tailored to your risk tier</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommendations.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl glass-panel border border-neutral-200/60 dark:border-white/10 hover:shadow-md transition-shadow duration-200 flex items-start gap-3.5"
              >
                <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 flex items-center justify-center shrink-0">
                  {getRecommendationIcon(item.icon)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="text-sm font-bold text-neutral-900 dark:text-white">
                      {item.title}
                    </h5>
                    <span className="text-[10px] font-semibold text-neutral-400 px-1.5 py-0.2 rounded-md bg-neutral-200/50 dark:bg-neutral-800">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.section>
  );
}
