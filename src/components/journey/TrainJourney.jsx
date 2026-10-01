'use client';

import { useState } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { journeyStages } from '@/data/journeyStages';
import IllustrationImage from '@/components/ui/IllustrationImage';

// ── Per-stage visual config ───────────────────────────────────────────────
const STYLES = {
  babies: {
    sectionBg:   '#FEF3F7',          // lighter than blush so card reads darker
    tabActiveBg: 'bg-brand-pink',
    tabActiveText:'text-white',
    tabInactiveBg:'bg-blush',
    panelBg:     'bg-blush',
    border:      'border-brand-pink',
    checkBg:     'bg-brand-pink/15',
    checkIcon:   'text-brand-pink',
    ageLabel:    'text-brand-pink',
    chip:        'bg-brand-pink/10 text-brand-pink hover:bg-brand-pink/20',
    passengerAsset: 'train-passengers-babies',
  },
  toddlers: {
    sectionBg:   '#F1F9EE',          // lighter than leaf-mint so card reads darker
    tabActiveBg: 'bg-brand-green',
    tabActiveText:'text-white',
    tabInactiveBg:'bg-leaf-mint',
    panelBg:     'bg-leaf-mint',
    border:      'border-brand-green',
    checkBg:     'bg-brand-green/15',
    checkIcon:   'text-brand-green',
    ageLabel:    'text-brand-green',
    chip:        'bg-brand-green/10 text-brand-green hover:bg-brand-green/20',
    passengerAsset: 'train-passengers-toddlers',
  },
  kids: {
    sectionBg:   '#F5FBFE',          // lighter than sky-mist so card reads darker
    tabActiveBg: 'bg-brand-navy',
    tabActiveText:'text-white',
    tabInactiveBg:'bg-sky-mist',
    panelBg:     'bg-sky-mist',
    border:      'border-brand-navy',
    checkBg:     'bg-brand-navy/10',
    checkIcon:   'text-brand-navy',
    ageLabel:    'text-brand-navy',
    chip:        'bg-brand-navy/10 text-brand-navy hover:bg-brand-navy/15',
    passengerAsset: 'train-passengers-kids',
  },
  teens: {
    sectionBg:   '#FFF8D6',          // sun-yellow lighter
    tabActiveBg: 'bg-sun-yellow',
    tabActiveText:'text-brand-navy',
    tabInactiveBg:'bg-sun-yellow/40',
    panelBg:     'bg-sun-yellow/50',
    border:      'border-brand-navy',
    checkBg:     'bg-brand-navy/10',
    checkIcon:   'text-brand-navy',
    ageLabel:    'text-brand-navy/60',
    chip:        'bg-brand-navy/10 text-brand-navy hover:bg-brand-navy/15',
    passengerAsset: 'train-passengers-teens',
  },
};

// Stagger animation for care-point list
const listVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden: { opacity: 0, x: -14 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.28, ease: 'easeOut' } },
};

export default function TrainJourney() {
  const [active, setActive] = useState(3);
  const stage = journeyStages[active];
  const st    = STYLES[stage.id];

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="birth-to-teen"
        aria-label="One dental home, birth to teen"
        className="w-full py-section-mobile md:py-section-desktop transition-colors duration-500"
        style={{ backgroundColor: STYLES[stage.id].sectionBg }}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-10 space-y-4">

          {/* ── Section heading ─────────────────────────────────────────── */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-h2-mobile md:text-h2-desktop text-brand-navy">
              One dental home,{' '}
              <span className="text-brand-pink">birth to teen.</span>
            </h2>
            <p className="font-body text-body-sm md:text-body-lg text-brand-navy/70 leading-relaxed">
              The same doctor and team at every stage — from the first tooth through wisdom-tooth monitoring.
            </p>
          </div>

          {/* ── Stage selector tabs ─────────────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {journeyStages.map((s, i) => {
              const ss       = STYLES[s.id];
              const isActive = i === active;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={[
                    'relative text-left rounded-xl px-4 py-2.5 outline-none transition-all duration-200',
                    'focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2',
                    isActive
                      ? `${ss.tabActiveBg} ${ss.tabActiveText} shadow-card -translate-y-0.5`
                      : `${ss.tabInactiveBg} text-brand-navy/60 hover:text-brand-navy/80 hover:brightness-95`,
                  ].join(' ')}
                >
                  <span className={`block font-body text-[10px] font-semibold uppercase tracking-widest mb-0.5 ${isActive ? 'opacity-70' : ss.ageLabel}`}>
                    {s.ageRange}
                  </span>
                  <span className="block font-display font-bold text-[17px] leading-tight">
                    {s.label}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-5 right-5 h-[3px] rounded-full bg-white/30" />
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Content panel ───────────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            <m.div
              key={active}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{    opacity: 0, y: -14 }}
              transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className={`${st.panelBg} rounded-[24px] border-l-[5px] ${st.border} shadow-card overflow-hidden`}>
                <div className="grid md:grid-cols-[1fr_280px] gap-0 items-end">

                  {/* Left: text content */}
                  <div className="p-4 space-y-2">

                    {/* Stage headline */}
                    <div className="space-y-1">
                      <p className={`font-body text-[12px] font-semibold uppercase tracking-widest ${st.ageLabel}`}>
                        {stage.ageRange}
                      </p>
                      <h3 className="font-display font-bold text-[22px] md:text-[26px] text-brand-navy leading-none">
                        {stage.label}
                      </h3>
                    </div>

                    {/* Summary */}
                    <p className="font-body text-[13px] text-brand-navy/75 leading-relaxed max-w-lg line-clamp-2">
                      {stage.summary}
                    </p>

                    {/* Care points — staggered */}
                    <m.ul
                      variants={listVariants}
                      initial="hidden"
                      animate="show"
                      className="space-y-1"
                    >
                      {stage.carePoints.map((point) => (
                        <m.li key={point} variants={itemVariants} className="flex gap-3 items-start">
                          <span className={`flex items-center justify-center w-[18px] h-[18px] rounded-full ${st.checkBg} shrink-0 mt-[3px]`}>
                            <Check size={10} className={st.checkIcon} aria-hidden="true" />
                          </span>
                          <span className="font-body text-[14px] text-brand-navy/80 leading-relaxed">{point}</span>
                        </m.li>
                      ))}
                    </m.ul>

                    {/* Service chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {stage.chips.map(chip => (
                        <Link
                          key={chip.href}
                          href={chip.href}
                          className={`inline-flex items-center font-body text-[13px] font-medium px-3.5 py-1.5 rounded-chip transition-colors ${st.chip}`}
                        >
                          {chip.label} →
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Right: passenger illustration — fills column width, sits at bottom */}
                  <div className="hidden md:block">
                    <IllustrationImage
                      name={st.passengerAsset}
                      alt={`${stage.label} stage`}
                      className="w-full h-auto"
                    />
                  </div>

                </div>
              </div>
            </m.div>
          </AnimatePresence>

        </div>
      </section>
    </LazyMotion>
  );
}
