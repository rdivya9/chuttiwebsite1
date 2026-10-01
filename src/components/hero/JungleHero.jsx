'use client';

import {
  useRef, useState, useEffect, useCallback,
} from 'react';
import {
  LazyMotion, domAnimation, m,
  useScroll, useTransform, useSpring,
  useReducedMotion, useMotionValueEvent,
} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, Star, ChevronDown } from 'lucide-react';
import IllustrationImage from '@/components/ui/IllustrationImage';
import TappableCharacter from '@/components/characters/TappableCharacter';
import { useBooking } from '@/components/booking/BookingProvider';
import { characters } from '@/data/characters';
import siteConfig from '@/data/siteConfig';

// ── Character data helpers ───────────────────────────────────────────────
const charByID = (id) => characters.find(c => c.id === id) || {};

// ── Wheel rotation helper ────────────────────────────────────────────────
// Wheel circumference ≈ 2π × 40px radius → ~251px
const WHEEL_CIRC = 2 * Math.PI * 40;

// ── Settled / reduced-motion scene ───────────────────────────────────────
function SettledScene({ children }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Sky */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, #EAF6FC 0%, #FFF1E6 100%)' }}
        aria-hidden="true"
      />
      {/* All layers in final position */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute bottom-0 left-0 right-0 h-2/5">
          <IllustrationImage name="hero-canopy-back" alt="" className="w-full h-full object-cover object-bottom hidden md:block" />
          <IllustrationImage name="hero-canopy-back-mobile" alt="" className="w-full h-full object-cover object-bottom md:hidden" />
        </div>
        {/* Giraffe bush — covers neck cutoff */}
        <div className="absolute top-[70%] left-[24%] w-44" aria-hidden="true">
          <IllustrationImage name="hero-giraffe-bush" alt="" className="w-full h-auto" />
        </div>

        <div className="absolute -top-16 bottom-0 left-0 w-[42%]">
          <IllustrationImage name="hero-foliage-mid-left" alt="" className="w-full h-full object-contain object-bottom-left hidden md:block" />
          <IllustrationImage name="hero-foliage-mid-left-mobile" alt="" className="w-full h-full object-contain object-bottom-left md:hidden" />
        </div>
        <div className="absolute -top-16 bottom-0 right-0 w-[42%]">
          <IllustrationImage name="hero-foliage-mid-right" alt="" className="w-full h-full object-contain object-bottom-right hidden md:block" />
          <IllustrationImage name="hero-foliage-mid-right-mobile" alt="" className="w-full h-full object-contain object-bottom-right md:hidden" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/4">
          <IllustrationImage name="hero-ground-track" alt="" className="w-full h-full object-cover object-bottom hidden md:block" />
          <IllustrationImage name="hero-ground-track-mobile" alt="" className="w-full h-full object-cover object-bottom md:hidden" />
        </div>
        {/* Train in place */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/4 w-[80%] md:w-[72%]">
          <IllustrationImage name="train-engine" alt="" className="w-full h-auto" />
        </div>
        {/* Giraffe — body hidden behind foliage/ground */}
        <div className="absolute top-[31%] left-1/4 w-20 md:w-28">
          <IllustrationImage name="hero-giraffe-head" alt="" className="w-full h-auto" />
        </div>
        {/* Bird perched */}
        <div className="absolute top-[31%] left-[8%] w-24 md:w-36 scale-x-[-1]">
          <IllustrationImage name="hero-bird-perched" alt="" className="w-full h-auto" />
        </div>
        {/* Curtain open — small remnants at edges */}
        <div className="absolute inset-y-0 left-0 w-8 md:w-12">
          <IllustrationImage name="hero-leaf-curtain-left" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-y-0 right-0 w-8 md:w-12">
          <IllustrationImage name="hero-leaf-curtain-right" alt="" className="w-full h-full object-cover" />
        </div>
      </div>
      {children}
    </div>
  );
}

// ── Content Card ─────────────────────────────────────────────────────────
function HeroContentCard({ openBooking }) {
  const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappPrefill)}`;

  return (
    <div
      className={[
        // Desktop: left 40%, vertically centred
        'relative z-10 md:absolute md:top-1/2 md:-translate-y-1/2 md:left-10 lg:left-16',
        // Mobile: top of viewport below header
        'w-full md:max-w-[44%] lg:max-w-[40%]',
        // Billboard style — solid board with jungle-wood frame
        'bg-morning-white rounded-2xl p-6 md:p-8',
        'border-[5px] border-[#7C4D2A] shadow-2xl',
        'mx-5 md:mx-0 mt-4 md:mt-0',
      ].join(' ')}
    >
      {/* Wooden top rail */}
      <div className="absolute -top-3 left-4 right-4 h-3 bg-[#7C4D2A] rounded-t-sm" aria-hidden="true" />
      {/* Doctor chip */}
      <div className="flex items-center gap-2.5 mb-4">
        <Image
          src={siteConfig.doctor.photo}
          alt={siteConfig.doctor.name}
          width={44}
          height={44}
          className="w-10 h-10 rounded-full object-cover object-top border-2 border-white shadow-sm shrink-0"
          priority
        />
        <span className="font-body text-[13px] text-brand-navy/70 leading-tight">
          Led by <strong className="text-brand-navy">{siteConfig.doctor.name}</strong>, MDS
        </span>
      </div>

      {/* Headline — LCP element */}
      <h1 className="font-display font-extrabold text-hero-mobile md:text-[44px] lg:text-hero-desktop text-brand-navy leading-[1.05] mb-4">
        A dental home for your child — from the first tooth to the teen years.
      </h1>

      <p className="font-body text-[15px] md:text-body-sm text-brand-navy/70 mb-6 leading-relaxed">
        Pediatric and preventive dentistry in Pallikaranai, Chennai.
        We don't just treat teeth — we create a great dental experience.
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3 mb-5">
        <button
          onClick={() => openBooking()}
          className="px-6 py-3 bg-brand-pink text-white font-body font-semibold text-btn rounded-pill hover:bg-[#c41d63] transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2"
        >
          Book a visit
        </button>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-white text-brand-navy font-body font-semibold text-btn rounded-pill border border-brand-navy/15 hover:bg-brand-navy/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2"
        >
          <MessageCircle size={16} aria-hidden="true" />
          WhatsApp Us
        </a>
      </div>

      {/* Trust line */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-4">
        <span className="flex items-center gap-1 font-body text-[13px] text-brand-navy/60">
          <Star size={12} className="fill-sun-yellow text-sun-yellow" aria-hidden="true" />
          {siteConfig.rating.value} · {siteConfig.rating.count} Google reviews
        </span>
        <span className="font-body text-[13px] text-brand-navy/60">{siteConfig.hours.display}</span>
      </div>

      {/* Skip link */}
      <a
        href="#services"
        className="inline-flex items-center gap-1 font-body text-[13px] text-brand-navy/40 hover:text-brand-navy transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-navy rounded"
      >
        <ChevronDown size={13} aria-hidden="true" />
        Explore our services
      </a>
    </div>
  );
}

// ── Animated Hero (full scroll sequence) ─────────────────────────────────
function AnimatedHero({ prefersReducedMotion }) {
  const { openBooking } = useBooking();
  const sectionRef       = useRef(null);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [blinkActive,    setBlinkActive]    = useState(false);
  const [steamPuffs,     setSteamPuffs]     = useState([]);
  const [wingUp,         setWingUp]         = useState(true);

  // One-shot arm triggers — re-arm when p drops below threshold - 0.05
  const blinkArmed    = useRef(true);
  const monkeyArmed   = useRef(true);
  const [monkeyDown,  setMonkeyDown]  = useState(false);
  const steamArmed    = useRef([true, true, true, true, true]);
  const pRef          = useRef(0);

  // ── Scroll progress ────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ['start start', 'end end'],
  });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // ── One-shot listeners ─────────────────────────────────────────────────
  useMotionValueEvent(p, 'change', (latest) => {
    // Scroll hint: show after 1.5s with no scroll (handled by useEffect below)
    // Hide once scrolling starts
    if (latest > 0.03) setShowScrollHint(false);

    pRef.current = latest;

    // Re-arm triggers when scrolling back up
    if (latest < 0.59) blinkArmed.current   = true;
    if (latest < 0.75) monkeyArmed.current  = true;
    if (latest < 0.57) steamArmed.current[0] = true;
    if (latest < 0.62) steamArmed.current[1] = true;
    if (latest < 0.67) steamArmed.current[2] = true;
    if (latest < 0.72) steamArmed.current[3] = true;
    if (latest < 0.77) steamArmed.current[4] = true;

    // Giraffe blink at p ≈ 0.64
    if (latest >= 0.64 && blinkArmed.current) {
      blinkArmed.current = false;
      setBlinkActive(true);
      setTimeout(() => setBlinkActive(false), 160);
    }

    // Steam puffs at p 0.60, 0.65, 0.70, 0.75, 0.80
    const steamThresholds = [0.60, 0.65, 0.70, 0.75, 0.80];
    steamThresholds.forEach((t, i) => {
      if (latest >= t && steamArmed.current[i]) {
        steamArmed.current[i] = false;
        const id = Date.now() + i;
        setSteamPuffs(prev => [...prev, id]);
        setTimeout(() => setSteamPuffs(prev => prev.filter(s => s !== id)), 1000);
      }
    });

    // Monkey descends at p 0.80–0.92
    if (latest >= 0.80 && monkeyArmed.current) {
      monkeyArmed.current = false;
      setMonkeyDown(true);
    }

  });

  // ── Scroll hint: appears after 1.5s idle ──────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setShowScrollHint(true), 1500);
    return () => clearTimeout(t);
  }, []);

  // ── Idle steam: continuous puffs once train is settled ────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      if (pRef.current >= 0.86) {
        const id = Date.now();
        setSteamPuffs(prev => [...prev, id]);
        setTimeout(() => setSteamPuffs(prev => prev.filter(s => s !== id)), 1000);
      }
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  // ── Giraffe natural blinking — varied interval 2–6s ─────────────────
  useEffect(() => {
    let timer;
    const scheduleBlink = () => {
      const delay = 2000 + Math.random() * 4000; // 2–6s
      timer = setTimeout(() => {
        setBlinkActive(true);
        setTimeout(() => setBlinkActive(false), 120 + Math.random() * 80); // 120–200ms
        scheduleBlink();
      }, delay);
    };
    scheduleBlink();
    return () => clearTimeout(timer);
  }, []);

  // ── Bird wing flap (time-based) ───────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => setWingUp(v => !v), 180);
    return () => clearInterval(interval);
  }, []);

  // ── useTransform values ───────────────────────────────────────────────
  // Clouds
  const cloudL1x  = useTransform(p, [0, 0.22], ['0%',   '-65vw']);
  const cloudR1x  = useTransform(p, [0, 0.22], ['0%',   '+65vw']);
  const cloudMy   = useTransform(p, [0, 0.22], ['0px',  '-30vh']);
  const cloudOp   = useTransform(p, [0.10, 0.22], [1, 0]);

  // Canopy
  const canopyY   = useTransform(p, [0, 0.22], [40, 0]);

  // Foliage parallax
  const foliageLx = useTransform(p, [0.28, 0.58], ['0%',  '-12%']);
  const foliageRx = useTransform(p, [0.28, 0.58], ['0%',  '+12%']);

  // Leaf curtain
  const curtainLx = useTransform(p, [0.28, 0.58], ['0%',  '-42%']);
  const curtainRx = useTransform(p, [0.28, 0.58], ['0%',  '+42%']);
  const curtainLr = useTransform(p, [0.28, 0.58], [0,     -7]);
  const curtainRr = useTransform(p, [0.28, 0.58], [0,      7]);

  // Giraffe
  const giraffeY  = useTransform(p, [0.42, 0.64], [140, 0]);

  // Train
  const trainX    = useTransform(p, [0.54, 0.86], ['115vw', '-6vw']);
  const trainDist = useTransform(p, [0.54, 0.86], [0, 600]);
  const wheelRot  = useTransform(trainDist, d => -((d / WHEEL_CIRC) * 360));

  // Bird arc
  const birdX     = useTransform(p, [0.12, 0.64], ['105vw', '-83vw']);
  const birdY     = useTransform(p, [0.12, 0.30, 0.54, 0.64], ['8vh', '22vh', '30vh', '32vh']);
  const birdRot   = useTransform(p, [0.12, 0.64], [-8, 2]);
  const birdOp    = useTransform(p, [0.12, 0.16, 0.60, 0.64], [0, 1, 1, 0]);

  // Monkey
  const monkeyY   = useTransform(p, [0.80, 0.92], [-120, 0]);
  const monkeyRot = useTransform(p, [0.80, 0.92], [-10, 0]);

  // Billboard — rises from below as the scene builds
  const boardY    = useTransform(p, [0.58, 0.94], ['72vh', '0vh']);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div
      className="relative"
      style={{ height: isMobile ? '190svh' : '260svh' }}
      ref={sectionRef}
      aria-label="Hero — jungle scene"
    >
      {/* Sticky stage */}
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: '100svh' }}>

        {/* Sky */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, #EAF6FC 0%, #FFF1E6 100%)' }}
          aria-hidden="true"
        />

        {/* ── Illustrated layers (aria-hidden) ─────────────────────── */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">

          {/* Z0 — Far canopy */}
          <m.div className="absolute bottom-0 left-0 right-0 h-2/5" style={{ y: canopyY }}>
            <IllustrationImage name="hero-canopy-back" alt="" className="w-full h-full object-cover object-bottom hidden md:block" sizes="100vw" />
            <IllustrationImage name="hero-canopy-back-mobile" alt="" className="w-full h-full object-cover object-bottom md:hidden" sizes="100vw" />
          </m.div>

          {/* Z1 — Giraffe — body hidden behind foliage/ground */}
          <m.div
            className="absolute top-[31%] left-[22%] w-20 md:w-28 lg:w-36 origin-top"
            style={{ y: giraffeY }}
          >
            <IllustrationImage
              name={blinkActive ? 'hero-giraffe-head-blink' : 'hero-giraffe-head'}
              alt=""
              className="w-full h-auto"
            />
          </m.div>

          {/* Z1b — Giraffe bush (covers neck cutoff) — moves with left foliage */}
          <m.div
            className="absolute top-[70%] left-[22%] w-44"
            style={{ x: foliageLx }}
            aria-hidden="true"
          >
            <IllustrationImage name="hero-giraffe-bush" alt="" className="w-full h-auto" />
          </m.div>

          {/* Z2 — Mid foliage */}
          <m.div className="absolute -top-16 bottom-0 left-0 w-[42%]" style={{ x: foliageLx }}>
            <IllustrationImage name="hero-foliage-mid-left" alt="" className="w-full h-full object-contain object-bottom-left hidden md:block" />
            <IllustrationImage name="hero-foliage-mid-left-mobile" alt="" className="w-full h-full object-contain object-bottom-left md:hidden" />
          </m.div>
          <m.div className="absolute -top-16 bottom-0 right-0 w-[42%]" style={{ x: foliageRx }}>
            <IllustrationImage name="hero-foliage-mid-right" alt="" className="w-full h-full object-contain object-bottom-right hidden md:block" />
            <IllustrationImage name="hero-foliage-mid-right-mobile" alt="" className="w-full h-full object-contain object-bottom-right md:hidden" />
          </m.div>

          {/* Z3 — Ground track */}
          <div className="absolute bottom-0 left-0 right-0 h-[18%]">
            <IllustrationImage name="hero-ground-track" alt="" className="w-full h-full object-cover object-bottom hidden md:block" sizes="100vw" />
            <IllustrationImage name="hero-ground-track-mobile" alt="" className="w-full h-full object-cover object-bottom md:hidden" sizes="100vw" />
          </div>

          {/* Z4 — Train: horizontal flex row, engine + 4 carriages side by side */}
          <m.div
            className="absolute bottom-5 md:bottom-7 right-0 w-[120vw] md:w-[80vw] flex flex-row items-end z-10"
            style={{ x: trainX }}
          >
            {/* Engine — 24% of train width */}
            <div className="relative w-[24%] shrink-0">
              <IllustrationImage name="train-engine" alt="" className="w-full h-auto" />
              <span className="absolute top-[55%] left-1/2 -translate-x-1/2 font-display font-bold text-[6px] md:text-[9px] text-brand-navy text-center leading-tight pointer-events-none">
                Chutti<br />Express
              </span>
              <m.div className="absolute w-[22%]" style={{ rotate: wheelRot, bottom: '-15px', left: '26%' }}>
                <IllustrationImage name="train-wheel" alt="" className="w-full h-auto" />
              </m.div>
              <m.div className="absolute w-[22%]" style={{ rotate: wheelRot, bottom: '-13px', left: '48%' }}>
                <IllustrationImage name="train-wheel" alt="" className="w-full h-auto" />
              </m.div>
              <m.div className="absolute w-[22%]" style={{ rotate: wheelRot, bottom: '-11px', left: '70%' }}>
                <IllustrationImage name="train-wheel" alt="" className="w-full h-auto" />
              </m.div>
              {steamPuffs.map(id => (
                <div key={id} className="absolute top-[-30%] left-[10%] w-[34%] pointer-events-none animate-steam-puff">
                  <IllustrationImage name="train-steam-puff" alt="" className="w-full h-auto" />
                </div>
              ))}
            </div>

            {/* Carriages — each 19% of train width, slight overlap to connect */}
            {[
              { asset: 'train-carriage-a', pax: 'train-passengers-babies',   label: 'Babies'   },
              { asset: 'train-carriage-b', pax: 'train-passengers-toddlers',  label: 'Toddlers' },
              { asset: 'train-carriage-a', pax: 'train-passengers-kids',      label: 'Kids'     },
              { asset: 'train-carriage-b', pax: 'train-passengers-teens',     label: 'Teens'    },
            ].map((car, i) => (
              <div key={i} className="relative w-[19%] shrink-0 -ml-[0.5%]">
                {/* Passengers z-0 — behind everything */}
                <div className="absolute bottom-[42%] left-1/2 -translate-x-1/2 w-[90%] z-0">
                  <IllustrationImage name={car.pax} alt="" className="w-full h-auto" />
                </div>
                {/* Wheels z-[1] — behind carriage, show through transparent arc openings */}
                {(() => {
                  const wb = '-7px';
                  return (<>
                    <m.div className="absolute w-[24%] z-20" style={{ rotate: wheelRot, bottom: wb, left: 'calc(10% + 4px)' }}>
                      <IllustrationImage name="train-wheel" alt="" className="w-full h-auto" />
                    </m.div>
                    <m.div className="absolute left-[38%] w-[24%] z-20" style={{ rotate: wheelRot, bottom: wb }}>
                      <IllustrationImage name="train-wheel" alt="" className="w-full h-auto" />
                    </m.div>
                    <m.div className="absolute w-[24%] z-20" style={{ rotate: wheelRot, bottom: wb, right: 'calc(8% + 8px)' }}>
                      <IllustrationImage name="train-wheel" alt="" className="w-full h-auto" />
                    </m.div>
                  </>);
                })()}
                {/* Carriage z-10 — on top, transparent arc holes reveal wheels behind */}
                <div className="relative z-10">
                  <IllustrationImage name={car.asset} alt="" className="w-full h-auto" />
                  <span className="absolute top-[52%] left-1/2 -translate-x-1/2 font-display font-bold text-[7px] md:text-[10px] text-brand-navy pointer-events-none whitespace-nowrap">
                    {car.label}
                  </span>
                </div>
              </div>
            ))}
          </m.div>

          {/* Z5 — Leaf curtains */}
          <m.div
            className="absolute inset-y-0 left-0 w-1/2 origin-left"
            style={{ x: curtainLx, rotate: curtainLr }}
          >
            <IllustrationImage name="hero-leaf-curtain-left" alt="" className="w-full h-full object-cover" sizes="50vw" />
          </m.div>
          <m.div
            className="absolute inset-y-0 right-0 w-1/2 origin-right"
            style={{ x: curtainRx, rotate: curtainRr }}
          >
            <IllustrationImage name="hero-leaf-curtain-right" alt="" className="w-full h-full object-cover" sizes="50vw" />
          </m.div>

          {/* Z6 — Monkey */}
          <m.div
            className="absolute -top-8 right-[6%] w-32 md:w-44 origin-top"
            style={{ y: monkeyY, rotate: monkeyRot }}
          >
            <IllustrationImage name="hero-monkey-peek" alt="" className="w-full h-auto" />
            {monkeyDown && (
              <IllustrationImage name="hero-monkey-arm" alt="" className="w-full h-auto absolute top-1/2 left-0" />
            )}
          </m.div>

          {/* Z7 — Clouds */}
          <m.div className="absolute top-[10%] left-0 w-2/5" style={{ x: cloudL1x, opacity: cloudOp }}>
            <IllustrationImage name="hero-cloud-1" alt="" priority className="w-full h-auto" />
          </m.div>
          <m.div className="absolute top-[9%] right-0 w-2/5" style={{ x: cloudR1x, opacity: cloudOp }}>
            <IllustrationImage name="hero-cloud-2" alt="" priority className="w-full h-auto" />
          </m.div>
          <m.div className="absolute top-[2%] left-1/4 w-1/4 hidden md:block" style={{ y: cloudMy, opacity: cloudOp }}>
            <IllustrationImage name="hero-cloud-3" alt="" priority className="w-full h-auto" />
          </m.div>
          <m.div className="absolute top-[8%] left-1/3 w-1/5 hidden md:block" style={{ y: cloudMy, opacity: cloudOp }}>
            <IllustrationImage name="hero-cloud-4" alt="" className="w-full h-auto" />
          </m.div>
          <m.div className="absolute top-[0%] right-1/4 w-1/6 hidden md:block" style={{ y: cloudMy, opacity: cloudOp }}>
            <IllustrationImage name="hero-cloud-5" alt="" className="w-full h-auto" />
          </m.div>

          {/* Z8 — Bird in flight */}
          <m.div
            className="absolute top-0 right-0 w-24 md:w-36"
            style={{ x: birdX, y: birdY, rotate: birdRot, opacity: birdOp }}
          >
            <div className="relative">
              <IllustrationImage name="hero-bird-body" alt="" className="w-full h-auto" />
              <div className="absolute inset-0">
                <IllustrationImage name={wingUp ? 'hero-bird-wing-up' : 'hero-bird-wing-down'} alt="" className="w-full h-auto" />
              </div>
            </div>
          </m.div>
        </div>

        {/* ── Tappable characters (pointer-events on) ───────────────── */}
        {/* Only active when scene is settled (p > 0.88) */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Bird perched — appears after flight exits */}
          <m.div
            className="absolute top-[31%] left-[8%] w-24 md:w-36 pointer-events-auto scale-x-[-1]"
            style={{ opacity: useTransform(p, [0.62, 0.66], [0, 1]) }}
          >
            {(() => {
              const c = charByID('hornbill');
              return (
                <TappableCharacter
                  characterId="hornbill"
                  name={c.name || 'Hornbill'}
                  asset="hero-bird-perched"
                  fact={c.fact}
                  fallbackFact={c.fallbackFact}
                  approved={c.approved}
                  reaction="wing-flap"
                  imageClassName="w-full h-auto"
                />
              );
            })()}
          </m.div>
        </div>

        {/* ── Scroll hint ────────────────────────────────────────────── */}
        {showScrollHint && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <div className="flex items-center gap-2 bg-morning-white/80 backdrop-blur-sm text-brand-navy font-body text-[13px] font-medium px-4 py-2 rounded-full shadow-card animate-bounce-gentle">
              <ChevronDown size={14} aria-hidden="true" />
              Scroll into the jungle
            </div>
          </div>
        )}


        {/* ── Sky headline — fades in as scene settles ─────────── */}
        <m.h1
          className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[80%] md:w-[55%] text-center font-display font-extrabold text-[22px] md:text-[32px] lg:text-[40px] text-brand-navy leading-[1.1] z-20 pointer-events-none"
          style={{ opacity: useTransform(p, [0.80, 1.0], [0, 1]) }}
        >
          A dental home for your child —<br />
          from the first tooth<br />
          to the teen years.
        </m.h1>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────
export default function JungleHero() {
  const prefersReducedMotion = useReducedMotion();
  const { openBooking }      = useBooking();

  // Reduced motion: render settled scene directly, no pin
  if (prefersReducedMotion) {
    return (
      <section className="relative w-full" style={{ height: '100svh' }} aria-label="Hero">
        <SettledScene>
          <HeroContentCard openBooking={openBooking} />
        </SettledScene>
      </section>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <section aria-label="Hero">
        <AnimatedHero prefersReducedMotion={false} />
      </section>
    </LazyMotion>
  );
}
