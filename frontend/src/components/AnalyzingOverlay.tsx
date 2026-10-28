import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ANALYSIS_STEPS = [
  "Normalizing biometric inputs with StandardScaler...",
  "Querying K-Nearest Neighbors vector space...",
  "Evaluating electrographic and ischemic indicators...",
  "Synthesizing personalized cardiovascular risk profile..."
];

export function AnalyzingOverlay() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % ANALYSIS_STEPS.length);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 z-40 rounded-3xl backdrop-blur-md bg-white/70 dark:bg-[#0A0B10]/80 flex flex-col items-center justify-center p-6 text-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="max-w-md w-full glass-panel p-8 rounded-3xl shadow-2xl border border-rose-500/20 flex flex-col items-center"
      >
        {/* Pulsing Heart with ECG sweep */}
        <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-xl animate-pulse" />
          
          <svg
            viewBox="0 0 100 100"
            className="w-20 h-20 text-rose-500 animate-heartbeat"
            fill="currentColor"
          >
            <path d="M50 88.5 L43.8 82.9 C22.8 63.8 9 51.3 9 35.8 C9 23.3 18.8 13.5 31.3 13.5 C38.3 13.5 45.1 16.8 49.5 22 C53.9 16.8 60.7 13.5 67.7 13.5 C80.2 13.5 90 23.3 90 35.8 C90 51.3 76.2 63.8 55.2 82.9 L50 88.5 Z" />
          </svg>
        </div>

        {/* Dynamic Sweeping ECG Line */}
        <div className="w-full max-w-xs h-12 mb-6 overflow-hidden">
          <svg
            viewBox="0 0 300 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path
              d="M0 30 H80 L90 30 L96 15 L104 48 L114 8 L124 54 L132 25 L138 33 L144 30 H300"
              stroke="#FF2D55"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: '300',
                animation: 'ecgSweep 1.8s linear infinite'
              }}
            />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white mb-2">
          Analyzing your biometrics...
        </h3>

        {/* Dynamic step caption */}
        <motion.p
          key={stepIndex}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium h-6"
        >
          {ANALYSIS_STEPS[stepIndex]}
        </motion.p>

        {/* Linear progress bar */}
        <div className="w-48 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden mt-6">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.1, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
