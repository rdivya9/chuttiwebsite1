'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function VisitStepper({ steps, defaultActive = 3 }) {
  const [activeStep, setActiveStep] = useState(defaultActive);

  return (
    <ol className="space-y-0">
      {steps.map((step, i) => {
        const isActive = i === activeStep;
        const isDone   = i < activeStep;
        return (
          <li key={step.number} className="flex gap-4">

            {/* Left column: circle + connector */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => setActiveStep(i)}
                className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2"
                style={{
                  background: isActive ? '#E0246F' : isDone ? '#6CBF4A' : 'rgba(224,36,111,0.12)',
                  color: isActive || isDone ? '#fff' : '#E0246F',
                }}
                aria-expanded={isActive}
              >
                <span className="font-display font-bold text-[14px]">
                  {isDone ? '✓' : step.number}
                </span>
              </button>
              {i < steps.length - 1 && (
                <div className="w-[2px] flex-1 min-h-[12px] bg-brand-pink/20 my-1" aria-hidden="true" />
              )}
            </div>

            {/* Right column: content */}
            <div
              className={`flex-1 rounded-2xl px-4 py-3 mb-2 cursor-pointer transition-all duration-200 ${
                isActive ? 'bg-brand-pink/8 border border-brand-pink/20' : 'hover:bg-brand-pink/5'
              }`}
              onClick={() => setActiveStep(i)}
            >
              <p className={`font-body font-semibold text-[15px] leading-snug transition-colors ${isActive ? 'text-brand-pink' : 'text-brand-navy'}`}>
                {step.title}
              </p>
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.p
                    key="body"
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="font-body text-[14px] text-brand-navy/70 leading-relaxed overflow-hidden"
                  >
                    {step.body}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

          </li>
        );
      })}
    </ol>
  );
}
