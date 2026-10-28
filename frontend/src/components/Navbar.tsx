import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onCheckRiskClick: () => void;
}

export function Navbar({ onCheckRiskClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 dark:bg-[#0A0B10]/75 border-b border-black/[0.06] dark:border-white/[0.08] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('home');
          }}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-xl"
        >
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-coral-400 p-[1.5px] shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full rounded-[14px] bg-white dark:bg-[#0E1017] flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-rose-500 animate-heartbeat"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-base sm:text-lg tracking-tight text-neutral-900 dark:text-white">
                Dil Dekho
              </span>
              <span className="text-[10px] font-medium tracking-wide uppercase px-1.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                AI ML
              </span>
            </div>
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 -mt-0.5 font-medium">
              Heart Disease Intelligence
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => scrollTo('home')}
            className="px-3.5 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-neutral-800/40 rounded-xl transition-all"
          >
            Home
          </button>
          <button
            onClick={() => scrollTo('predict')}
            className="px-3.5 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-neutral-800/40 rounded-xl transition-all"
          >
            Check Risk
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            className="px-3.5 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-neutral-800/40 rounded-xl transition-all"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollTo('methodology')}
            className="px-3.5 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-neutral-800/40 rounded-xl transition-all"
          >
            Methodology
          </button>
          <button
            onClick={() => scrollTo('about')}
            className="px-3.5 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-neutral-800/40 rounded-xl transition-all"
          >
            About
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <ThemeToggle />

          <button
            onClick={onCheckRiskClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:shadow-lg hover:shadow-rose-500/25 active:scale-95 transition-all duration-200"
          >
            <span>Check My Risk</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2]" />
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile navigation menu"
            className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 md:hidden focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-[#0A0B10]/95 backdrop-blur-xl px-4 py-4 space-y-2"
          >
            <button
              onClick={() => scrollTo('home')}
              className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('predict')}
              className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Check Risk
            </button>
            <button
              onClick={() => scrollTo('how-it-works')}
              className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollTo('methodology')}
              className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Methodology
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              About
            </button>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onCheckRiskClick();
                }}
                className="w-full py-2.5 rounded-xl text-center text-sm font-medium text-white bg-gradient-to-r from-rose-600 to-rose-500 shadow-md"
              >
                Check My Risk Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
