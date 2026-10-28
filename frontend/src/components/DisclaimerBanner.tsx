import { AlertCircle } from 'lucide-react';

export function DisclaimerBanner() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-amber-500/30 bg-amber-500/5 flex items-start gap-3.5 shadow-sm">
        <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
          <AlertCircle className="w-4 h-4 stroke-[2.2]" />
        </div>
        <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          <span className="font-semibold text-neutral-900 dark:text-white">Medical Disclaimer: </span>
          This tool is for educational purposes and is not a medical diagnosis. Please consult a doctor or certified healthcare provider for medical evaluations or before making health decisions.
        </div>
      </div>
    </div>
  );
}
