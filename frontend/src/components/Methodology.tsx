import { motion } from 'framer-motion';
import { Database, Binary, ShieldCheck, HeartPulse } from 'lucide-react';

export function Methodology() {
  return (
    <section id="methodology" className="py-20 relative border-t border-neutral-200/60 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Explanatory Content */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 mb-3">
              Technical Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
              Clinical Machine Learning with K-Nearest Neighbors
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
              Unlike generic deep-learning black boxes, the K-Nearest Neighbors (KNN) algorithm provides interpretable, distance-based classification. Your biometric vector is mapped into normalized 11-dimensional feature space, finding the closest verified patient profiles to determine your individualized risk index.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                    Standardized Feature Scaling
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Continuous values like resting blood pressure and cholesterol are scaled with zero-mean unit-variance to eliminate dimensional bias.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Binary className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                    One-Hot Encoded Categoricals
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Categorical clinical markers (Chest Pain types, Resting ECG abnormalities, ST Slope morphology) are mapped to dummy indicator vectors.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                    Strict Client-Side Privacy
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Your health biometrics are calculated ephemerally. Zero health data is persisted to cookies, local databases, or marketing trackers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Code/Feature Matrix Card */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200/60 dark:border-white/10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200/60 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <HeartPulse className="w-5 h-5 text-rose-500" />
                  <span className="text-sm font-bold text-neutral-900 dark:text-white">
                    Trained Model Artifacts
                  </span>
                </div>
                <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                  Scikit-Learn 1.x
                </span>
              </div>

              <div className="mt-5 space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900/80 border border-neutral-200/60 dark:border-neutral-800/80 flex justify-between items-center">
                  <span className="text-neutral-500 dark:text-neutral-400">Model Algorithm:</span>
                  <span className="font-semibold text-rose-600 dark:text-rose-400">KNeighborsClassifier</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900/80 border border-neutral-200/60 dark:border-neutral-800/80 flex justify-between items-center">
                  <span className="text-neutral-500 dark:text-neutral-400">Preprocessor:</span>
                  <span className="font-semibold text-teal-600 dark:text-teal-400">scaler.pkl (StandardScaler)</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900/80 border border-neutral-200/60 dark:border-neutral-800/80 flex justify-between items-center">
                  <span className="text-neutral-500 dark:text-neutral-400">Feature Vector:</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">15 Expected Columns</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900/80 border border-neutral-200/60 dark:border-neutral-800/80 flex justify-between items-center">
                  <span className="text-neutral-500 dark:text-neutral-400">Target Output:</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">HeartDisease (0=Normal, 1=Risk)</span>
                </div>
              </div>

              <div className="mt-6 p-3.5 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-700 dark:text-teal-300">
                <span className="font-bold">Original Backend Compatibility: </span>
                Our API payload is designed as a drop-in replacement that strictly preserves the exact column serialization used in your model training.
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
