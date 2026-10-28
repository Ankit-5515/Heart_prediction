import { useState } from 'react';
import { Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MEDICAL_EXPLANATIONS } from '../constants/medical';
import type { MedicalTermInfo } from '../constants/medical';

interface MedicalTooltipProps {
  termKey: string;
}

export function MedicalTooltip({ termKey }: MedicalTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const info: MedicalTermInfo | undefined = MEDICAL_EXPLANATIONS[termKey];

  if (!info) return null;

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        aria-label={`Information about ${info.title}`}
        className="p-1 rounded-full text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
      >
        <Info className="w-4 h-4 stroke-[2]" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-3.5 rounded-2xl glass-panel shadow-2xl z-50 pointer-events-auto border border-neutral-200/80 dark:border-white/10"
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">
                {info.title}
              </h4>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-2">
              {info.simpleExplanation}
            </p>

            {info.healthyRange && (
              <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800 text-[11px]">
                <span className="font-medium text-neutral-900 dark:text-neutral-200">Clinical Reference: </span>
                <span className="text-teal-600 dark:text-teal-400">{info.healthyRange}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
