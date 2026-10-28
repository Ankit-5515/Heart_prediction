import { motion } from 'framer-motion';
import { Sliders, Cpu, LineChart } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Enter Biometrics',
    description: 'Provide physiological indicators including resting blood pressure, cholesterol, peak exercise heart rate, and fasting glucose levels.',
    icon: Sliders,
    badge: '11 Biomarkers'
  },
  {
    step: '02',
    title: 'AI KNN Analysis',
    description: 'The trained K-Nearest Neighbors classifier transforms your multi-feature vector and calculates Euclidean distances against verified medical cohort benchmarks.',
    icon: Cpu,
    badge: 'Standardized Vectors'
  },
  {
    step: '03',
    title: 'Get Insights & Report',
    description: 'Receive an instant risk probability percentage, factor-by-factor breakdown, lifestyle recommendations, and an exportable clinical PDF summary.',
    icon: LineChart,
    badge: 'Instant Results'
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 mb-3">
            Workflow Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            How Dil Dekho Evaluates Your Risk
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            A three-step clinical screening framework combining user-friendly biometrics entry with proven algorithmic classification.
          </p>
        </div>

        {/* 3 Step Animated Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative glass-panel rounded-3xl p-8 shadow-xl hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-neutral-200/60 dark:border-white/10 group"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-rose-500/10 dark:bg-rose-500/15 text-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-2xl font-black text-neutral-300 dark:text-neutral-700 tracking-tight">
                      {item.step}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Badge */}
                <div className="mt-6 pt-4 border-t border-neutral-200/50 dark:border-neutral-800/80">
                  <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
                    {item.badge}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
