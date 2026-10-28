import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HeartForm } from './components/HeartForm';
import { AnalyzingOverlay } from './components/AnalyzingOverlay';
import { ResultSection } from './components/ResultSection';
import { HowItWorks } from './components/HowItWorks';
import { Methodology } from './components/Methodology';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { Footer } from './components/Footer';
import type { HeartFormData, PredictionResult } from './types/heart';
import { DEFAULT_FORM_DATA } from './constants/medical';
import { predictHeartRisk } from './services/api';

export function App() {
  const [formData, setFormData] = useState<HeartFormData>(DEFAULT_FORM_DATA);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePredict = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const startTime = Date.now();

    try {
      // Execute inference
      const predictionResponse = await predictHeartRisk(formData);

      // Enforce 2-second minimum duration for Apple-style high-precision perception
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 2100 - elapsed);

      await new Promise((resolve) => setTimeout(resolve, remaining));

      setResult(predictionResponse);
      setIsLoading(false);

      // Smooth scroll to the result section
      setTimeout(() => {
        handleScrollTo('results');
      }, 100);
    } catch (err: unknown) {
      const errorStr = err instanceof Error ? err.message : 'Prediction computation error';
      setErrorMessage(errorStr);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    handleScrollTo('predict');
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-[#0A0B10] text-neutral-900 dark:text-neutral-100 selection:bg-rose-500 selection:text-white">
      {/* Sticky Glass Navbar */}
      <Navbar onCheckRiskClick={() => handleScrollTo('predict')} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onCheckRiskClick={() => handleScrollTo('predict')}
          onExploreClick={() => handleScrollTo('how-it-works')}
        />

        {/* Prediction Form & Dynamic State Container */}
        <section className="relative">
          <div
            className={`transition-all duration-500 ease-out ${
              isLoading ? 'filter blur-sm scale-[0.98] pointer-events-none opacity-60' : ''
            }`}
          >
            <HeartForm
              formData={formData}
              onChange={setFormData}
              onSubmit={handlePredict}
              isLoading={isLoading}
            />
          </div>

          {/* iOS-style Analyzing Overlay during 2s inference sweep */}
          <AnimatePresence>
            {isLoading && <AnalyzingOverlay />}
          </AnimatePresence>
        </section>

        {/* Error Notification if any */}
        {errorMessage && (
          <div className="max-w-xl mx-auto px-4 mt-6">
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-sm text-center font-medium">
              {errorMessage}
            </div>
          </div>
        )}

        {/* Spring-Revealed Result Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              key="results-view"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 160, damping: 20 }}
            >
              <ResultSection
                result={result}
                formData={formData}
                onReset={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* How It Works Section */}
        <HowItWorks />

        {/* Machine Learning Methodology */}
        <Methodology />

        {/* Medical Disclaimer Banner */}
        <DisclaimerBanner />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
