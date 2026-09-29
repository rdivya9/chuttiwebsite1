'use client';

import { useRef, useState } from 'react';
import {
  LazyMotion, domAnimation, m,
  useScroll, useTransform, useSpring,
  useReducedMotion, useMotionValueEvent, AnimatePresence,
} from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import IllustrationImage from '@/components/ui/IllustrationImage';
import TappableCharacter from '@/components/characters/TappableCharacter';
import { journeyStages } from '@/data/journeyStages';
import { characters } from '@/data/characters';

const charByID = (id) => characters.find(c => c.id === id) || {};

// ── Stage card ────────────────────────────────────────────────────────────
function StageCard({ stage, isActive }) {
  const tintMap = {
    blush:       'bg-blush',
    'leaf-mint': 'bg-leaf-mint',
    'sky-mist':  'bg-sky-mist',
    'sun-yellow':'bg-sun-yellow/30',
  };

  return (
    <div className={`rounded-card p-5 md:p-6 shadow-card max-w-sm w-full ${tintMap[stage.color] || 'bg-morning-white'}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-bold text-h3-mobile text-brand-navy">{stage.label}</h3>
        <span className="font-body text-[12px] text-brand-navy/50 bg-morning-white/60 px-2.5 py-0.5 rounded-chip">
          {stage.ageRange}
        </span>
      </div>
      <p className="font-body text-[14px] text-brand-navy/75 leading-relaxed mb-4">
        {stage.summary}
      </p>
      <ul className="space-y-1.5 mb-4">
        {stage.carePoints.slice(0, 4).map((point, i) => (
          <li key={i} className="flex gap-2 font-body text-[13px] text-brand-navy/70">
            <span className="text-brand-green font-bold mt-0.5 shrink-0">✓</span>
            {point}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-1.5">
        {stage.chips.map(chip => (
          <Link
            key={chip.href}
            href={chip.href}
            className="font-body text-[12px] text-brand-navy/60 bg-morning-white/70 hover:bg-brand-pink/10 hover:text-brand-pink px-2.5 py-1 rounded-chip transition-colors"
          >
            {chip.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

// ── Desktop horizontal journey (≥ 1024px, pinned, 300vh) ─────────────────
function DesktopJourney({ prefersReducedMotion }) {
  const sectionRef   = useRef(null);
  const [activeStop, setActiveStop] = useState(0);

  const { scrollYProgress: q } = useScroll({
    target:  sectionRef,
    offset:  ['start start', 'end end'],
  });
  const qSpring = useSpring(q, { stiffness: 100, damping: 25 });

  // Station thresholds
  const STATIONS = [0.12, 0.37, 0.62, 0.87];

  // Track x movement — piecewise to slow at stations
  const trackX = useTransform(
    qSpring,
    [0, 0.04, 0.20, 0.29, 0.45, 0.54, 0.70, 0.79, 0.95, 1.0],
    ['0%', '0%', '-28%', '-32%', '-60%', '-64%', '-92%', '-96%', '-96%', '-96%']
  );

  // Update active stop on scroll
  useMotionValueEvent(qSpring, 'change', (latest) => {
    const newStop = STATIONS.reduce((acc, t, i) => (latest >= t - 0.08 ? i : acc), 0);
    setActiveStop(prev => prev !== newStop ? newStop : prev);
  });


  const scrollToStation = (i) => {
    if (!sectionRef.current) return;
    const sectionTop    = sectionRef.current.offsetTop;
    const sectionHeight = sectionRef.current.offsetHeight;
    window.scrollTo({ top: sectionTop + STATIONS[i] * sectionHeight, behavior: 'smooth' });
  };

  return (
    <div ref={sectionRef} style={{ height: '300svh' }} className="relative">
      <div className="sticky top-0 overflow-hidden" style={{ height: '100svh' }}>
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, #EAF6FC 0%, #e8f5e8 100%)' }}
          aria-hidden="true"
        />

        {/* Scrolling track */}
        <m.div
          className="absolute bottom-1/4 left-0 flex items-end gap-4"
          style={{ x: trackX, width: '400%' }}
          aria-hidden="true"
        >
          {/* Journey track */}
          <IllustrationImage name="journey-track" alt="" className="h-24 w-auto" />

          {/* Foliage clusters along the way */}
          {['journey-foliage-1', 'journey-foliage-2', 'journey-foliage-3'].map((f, i) => (
            <div key={i} className="shrink-0 w-20">
              <IllustrationImage name={f} alt="" className="w-full h-auto" />
            </div>
          ))}
        </m.div>

        {/* Train moving along the track */}
        <m.div
          className="absolute bottom-[28%] left-8 flex items-end"
          style={{ x: useTransform(qSpring, [0, 1], ['0vw', '50vw']) }}
          aria-hidden="true"
        >
          <div className="w-48">
            <IllustrationImage name="train-engine" alt="" className="w-full h-auto" />
          </div>
        </m.div>

        {/* Stage card */}
        <div className="absolute top-1/2 -translate-y-1/2 right-12 max-w-md">
          <AnimatePresence mode="wait">
            <m.div
              key={activeStop}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0,  opacity: 1 }}
              exit={{    y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <StageCard stage={journeyStages[activeStop]} isActive />
            </m.div>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {journeyStages.map((stage, i) => (
            <button
              key={stage.id}
              onClick={() => scrollToStation(i)}
              aria-label={`Jump to ${stage.label} stage`}
              className={`flex flex-col items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy rounded`}
            >
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i <= activeStop ? 'bg-brand-pink scale-110' : 'bg-brand-navy/20'
                }`}
              />
              <span className={`font-body text-[11px] ${i <= activeStop ? 'text-brand-pink font-semibold' : 'text-brand-navy/40'}`}>
                {stage.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Mobile / tablet vertical journey (< 1024px) ───────────────────────────
function MobileJourney() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ['start start', 'end end'],
  });

  const engineY = useTransform(scrollYProgress, [0, 1], ['0%', '85%']);

  return (
    <div ref={sectionRef} className="relative py-16 px-5">
      <div className="relative flex">
        {/* Vertical track + engine */}
        <div className="relative w-12 shrink-0 mr-6">
          <div className="absolute inset-x-0 top-0 bottom-0 flex justify-center">
            <IllustrationImage name="journey-track-vertical" alt="" className="w-8 h-full object-cover" />
          </div>
          <m.div className="absolute left-0 right-0 w-10" style={{ top: engineY }}>
            <IllustrationImage name="train-engine-top" alt="" className="w-full h-auto" />
          </m.div>
        </div>

        {/* Stage cards stacked */}
        <div className="flex-1 space-y-12">
          {journeyStages.map((stage) => {
            const passengerChar = charByID(`passenger-${stage.id}`);
            return (
              <m.div
                key={stage.id}
                className="space-y-4"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4 }}
              >
                {/* Passenger illustration */}
                <TappableCharacter
                  characterId={`passenger-${stage.id}`}
                  name={passengerChar.name || stage.label}
                  asset={stage.passengerAsset}
                  fact={passengerChar.fact}
                  fallbackFact={passengerChar.fallbackFact}
                  approved={passengerChar.approved}
                  reaction="wave"
                  imageClassName="w-32 h-auto"
                />
                <StageCard stage={stage} isActive={false} />
              </m.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Reduced motion: static 4-card layout ─────────────────────────────────
function StaticJourney() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 px-5 md:px-8 py-16 max-w-6xl mx-auto">
      {journeyStages.map(stage => <StageCard key={stage.id} stage={stage} isActive={false} />)}
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────
export default function TrainJourney() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <section id="birth-to-18" aria-label="Birth to 18 — Chutti Express train journey">
        <div className="bg-morning-white">
          <div className="max-w-6xl mx-auto px-5 md:px-8 pt-section-mobile md:pt-section-desktop pb-8">
            <h2 className="font-display font-bold text-h2-mobile md:text-h2-desktop text-brand-navy mb-4">
              One dental home, birth to 18.
            </h2>
            <p className="font-body text-body-sm md:text-body-lg text-brand-navy/70 max-w-2xl leading-relaxed">
              The Chutti Express carries children through every stage of care. One doctor, one team,
              the same familiar place — from the first tooth to 18.
            </p>
          </div>

          {prefersReducedMotion ? (
            <StaticJourney />
          ) : (
            <>
              {/* Desktop horizontal (lg+) */}
              <div className="hidden lg:block">
                <DesktopJourney />
              </div>
              {/* Mobile / tablet vertical */}
              <div className="lg:hidden">
                <MobileJourney />
              </div>
            </>
          )}
        </div>
      </section>
    </LazyMotion>
  );
}
