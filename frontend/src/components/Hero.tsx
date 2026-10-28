import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, ChevronRight, Activity } from 'lucide-react';

interface HeroProps {
  onCheckRiskClick: () => void;
  onExploreClick: () => void;
}

export function Hero({ onCheckRiskClick, onExploreClick }: HeroProps) {
  return (
    <section id="home" className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background ambient radial gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] sm:w-[900px] sm:h-[600px] bg-gradient-to-tr from-rose-500/15 via-rose-400/10 to-teal-400/10 blur-[120px] rounded-full -z-10"
      />

      {/* Background Animated ECG Line */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.14] dark:opacity-[0.18] -z-10 overflow-hidden">
        <svg
          viewBox="0 0 1440 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto min-w-[1200px]"
        >
          <path
            d="M0 130 H400 L430 130 L450 70 L470 190 L500 40 L530 210 L560 110 L580 140 L600 130 H1440"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-rose-500"
            style={{
              strokeDasharray: '1200',
              animation: 'ecgSweep 5s linear infinite'
            }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Confident Typography & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium glass-pill text-neutral-700 dark:text-neutral-300 mb-6 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span className="text-rose-600 dark:text-rose-400 font-semibold">Dil Dekho Intelligence</span>
              <span className="text-neutral-300 dark:text-neutral-600">•</span>
              <span>KNN Machine Learning Model</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.08]"
            >
              Know Your Heart.{' '}
              <span className="bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
                Before It Speaks.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0"
            >
              Analyze your cardiovascular profile in seconds. Evaluate resting blood pressure, cholesterol, electrographic signals, and clinical stress biomarkers through a trained K-Nearest Neighbors classifier.
            </motion.p>

            {/* Primary & Secondary Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={onCheckRiskClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-rose-600 via-rose-500 to-coral-500 hover:opacity-95 shadow-lg shadow-rose-500/30 hover:shadow-rose-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-500/50"
              >
                <span>Check My Risk</span>
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-base font-medium text-neutral-700 dark:text-neutral-200 glass-pill hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-all duration-200"
              >
                <Activity className="w-4 h-4 text-teal-500 stroke-[2.2]" />
                <span>How It Works</span>
              </button>
            </motion.div>

            {/* Trust & Privacy Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 pt-6 border-t border-neutral-200/70 dark:border-neutral-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-neutral-500 dark:text-neutral-400 font-medium"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-500 stroke-[2.2]" />
                <span>100% Client-Side Privacy</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500 stroke-[2.2]" />
                <span>Zero Health Data Saved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-500" />
                <span>Sub-Second ML Inference</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D-Style Heart Illustration & Biometric Floating Badges */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 flex items-center justify-center animate-soft-float"
            >
              {/* Outer soft glowing rings */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500/20 via-coral-400/20 to-teal-400/10 blur-2xl" />
              <div className="absolute inset-4 rounded-full border border-rose-500/20 dark:border-rose-500/30 animate-pulse" />

              {/* Central 3D-styled SVG Heart */}
              <div className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 filter drop-shadow-[0_20px_40px_rgba(255,45,85,0.35)]">
                <svg
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full animate-heartbeat"
                >
                  <defs>
                    <linearGradient id="heartGradient" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FF3B62" />
                      <stop offset="45%" stopColor="#E11D48" />
                      <stop offset="100%" stopColor="#9F1239" />
                    </linearGradient>
                    <linearGradient id="heartSpecular" x1="40" y1="30" x2="120" y2="110" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="ecgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>

                  {/* Main Heart Body */}
                  <path
                    d="M100 175 C100 175 25 125 25 70 C25 45 45 25 70 25 C85 25 95 35 100 45 C105 35 115 25 130 25 C155 25 175 45 175 70 C175 125 100 175 100 175 Z"
                    fill="url(#heartGradient)"
                  />

                  {/* Specular 3D Highlight curve */}
                  <path
                    d="M70 32 C50 32 35 48 35 70 C35 90 55 120 75 140 C65 115 55 90 55 70 C55 48 65 35 70 32 Z"
                    fill="url(#heartSpecular)"
                  />

                  {/* Inset ECG Wave */}
                  <path
                    d="M40 85 H70 L78 70 L86 110 L94 58 L104 118 L114 78 L122 92 L130 85 H160"
                    stroke="url(#ecgGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Floating Glass Biomarker Badge 1 (Top Left) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -top-2 -left-4 sm:-left-8 glass-panel px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 text-xs"
              >
                <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                  BP
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-white">120/80 mm Hg</div>
                  <div className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">Optimal Systolic</div>
                </div>
              </motion.div>

              {/* Floating Glass Biomarker Badge 2 (Bottom Right) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-3 -right-4 sm:-right-8 glass-panel px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 text-xs"
              >
                <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold">
                  HR
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-white">72 bpm</div>
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium">Resting Sinus Rhythm</div>
                </div>
              </motion.div>

              {/* Floating Glass Biomarker Badge 3 (Top Right) */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="hidden sm:flex absolute -top-4 right-0 glass-panel px-3 py-1.5 rounded-xl shadow-lg items-center gap-2 text-[11px]"
              >
                <div className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                <span className="font-medium text-neutral-700 dark:text-neutral-300">ECG: Normal</span>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
