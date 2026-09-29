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
import { MessageCircle, Star, ChevronDown, Hand } from 'lucide-react';
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
        <div className="absolute bottom-0 left-0 w-1/3 h-3/5">
          <IllustrationImage name="hero-foliage-mid-left" alt="" className="w-full h-full object-contain object-bottom-left" />
        </div>
        <div className="absolute bottom-0 right-0 w-1/3 h-3/5">
          <IllustrationImage name="hero-foliage-mid-right" alt="" className="w-full h-full object-contain object-bottom-right" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/4">
          <IllustrationImage name="hero-ground-track" alt="" className="w-full h-full object-cover object-bottom hidden md:block" />
          <IllustrationImage name="hero-ground-track-mobile" alt="" className="w-full h-full object-cover object-bottom md:hidden" />
        </div>
        {/* Train in place */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/4 w-[60%] md:w-[55%]">
          <IllustrationImage name="train-engine" alt="" className="w-full h-auto" />
        </div>
        {/* Giraffe up */}
        <div className="absolute bottom-1/4 left-1/4 w-20 md:w-28">
          <IllustrationImage name="hero-giraffe-head" alt="" className="w-full h-auto" />
        </div>
        {/* Bird perched */}
        <div className="absolute top-1/3 right-1/4 w-24 md:w-36">
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
        // Card style
        'bg-morning-white/88 backdrop-blur-sm rounded-card shadow-modal p-6 md:p-8',
        'mx-5 md:mx-0 mt-4 md:mt-0',
      ].join(' ')}
    >
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
  const [showTapHint,    setShowTapHint]    = useState(false);
  const [blinkActive,    setBlinkActive]    = useState(false);
  const [steamPuffs,     setSteamPuffs]     = useState([]);
  const [wingUp,         setWingUp]         = useState(true);

  // One-shot arm triggers — re-arm when p drops below threshold - 0.05
  const blinkArmed    = useRef(true);
  const monkeyArmed   = useRef(true);
  const [monkeyDown,  setMonkeyDown]  = useState(false);
  const steamArmed    = useRef([true, true, true]);

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

    // Re-arm triggers when scrolling back up
    if (latest < 0.59) blinkArmed.current   = true;
    if (latest < 0.75) monkeyArmed.current  = true;
    if (latest < 0.57) steamArmed.current[0] = true;
    if (latest < 0.65) steamArmed.current[1] = true;
    if (latest < 0.73) steamArmed.current[2] = true;

    // Giraffe blink at p ≈ 0.64
    if (latest >= 0.64 && blinkArmed.current) {
      blinkArmed.current = false;
      setBlinkActive(true);
      setTimeout(() => setBlinkActive(false), 160);
    }

    // Steam puffs at p 0.62, 0.70, 0.78
    const steamThresholds = [0.62, 0.70, 0.78];
    steamThresholds.forEach((t, i) => {
      if (latest >= t && steamArmed.current[i]) {
        steamArmed.current[i] = false;
        const id = Date.now() + i;
        setSteamPuffs(prev => [...prev, id]);
        setTimeout(() => setSteamPuffs(prev => prev.filter(s => s !== id)), 900);
      }
    });

    // Monkey descends at p 0.80–0.92
    if (latest >= 0.80 && monkeyArmed.current) {
      monkeyArmed.current = false;
      setMonkeyDown(true);
    }

    // Tap hint at p ≈ 0.88
    if (latest >= 0.88) setShowTapHint(true);
    else                setShowTapHint(false);
  });

  // ── Scroll hint: appears after 1.5s idle ──────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setShowScrollHint(true), 1500);
    return () => clearTimeout(t);
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
  const wheelRot  = useTransform(trainDist, d => (d / WHEEL_CIRC) * 360);

  // Bird arc
  const birdX     = useTransform(p, [0.12, 0.60], ['105vw', '-15vw']);
  const birdY     = useTransform(p, [0.12, 0.30, 0.50, 0.60], ['8vh', '22vh', '30vh', '32vh']);
  const birdRot   = useTransform(p, [0.12, 0.60], [-8, 4]);
  const birdOp    = useTransform(p, [0.12, 0.16, 0.54, 0.60], [0, 1, 1, 0]);

  // Monkey
  const monkeyY   = useTransform(p, [0.80, 0.92], [-120, 0]);
  const monkeyRot = useTransform(p, [0.80, 0.92], [-10, 0]);

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

          {/* Z1 — Giraffe */}
          <m.div
            className="absolute bottom-1/4 left-[22%] w-20 md:w-28 lg:w-36 origin-bottom"
            style={{ y: giraffeY }}
          >
            <IllustrationImage
              name={blinkActive ? 'hero-giraffe-head-blink' : 'hero-giraffe-head'}
              alt=""
              className="w-full h-auto"
            />
          </m.div>

          {/* Z2 — Mid foliage */}
          <m.div className="absolute bottom-0 left-0 w-1/3 h-3/5" style={{ x: foliageLx }}>
            <IllustrationImage name="hero-foliage-mid-left" alt="" className="w-full h-full object-contain object-bottom-left" />
          </m.div>
          <m.div className="absolute bottom-0 right-0 w-1/3 h-3/5" style={{ x: foliageRx }}>
            <IllustrationImage name="hero-foliage-mid-right" alt="" className="w-full h-full object-contain object-bottom-right" />
          </m.div>

          {/* Z3 — Ground track */}
          <div className="absolute bottom-0 left-0 right-0 h-[18%]">
            <IllustrationImage name="hero-ground-track" alt="" className="w-full h-full object-cover object-bottom hidden md:block" sizes="100vw" />
            <IllustrationImage name="hero-ground-track-mobile" alt="" className="w-full h-full object-cover object-bottom md:hidden" sizes="100vw" />
          </div>

          {/* Z4 — Train: horizontal flex row, engine + 4 carriages side by side */}
          <m.div
            className="absolute bottom-6 md:bottom-10 right-0 w-[92vw] md:w-[60vw] flex flex-row items-end"
            style={{ x: trainX }}
          >
            {/* Engine — 24% of train width */}
            <div className="relative w-[24%] shrink-0">
              <IllustrationImage name="train-engine" alt="" className="w-full h-auto" />
              <span className="absolute top-[20%] left-[14%] font-display font-bold text-[6px] md:text-[9px] text-brand-navy/80 whitespace-nowrap pointer-events-none">
                Chutti Express
              </span>
              <m.div className="absolute bottom-[-10%] left-[8%] w-[18%]" style={{ rotate: wheelRot }}>
                <IllustrationImage name="train-wheel" alt="" className="w-full h-auto" />
              </m.div>
              <m.div className="absolute bottom-[-10%] left-[30%] w-[18%]" style={{ rotate: wheelRot }}>
                <IllustrationImage name="train-wheel" alt="" className="w-full h-auto" />
              </m.div>
              {steamPuffs.map(id => (
                <div key={id} className="absolute top-[-20%] left-[16%] w-[22%] pointer-events-none animate-steam-puff">
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
                {/* Passengers behind carriage — only heads/shoulders peek above the walls */}
                <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 w-[90%] z-0">
                  <IllustrationImage name={car.pax} alt="" className="w-full h-auto" />
                </div>
                {/* Carriage on top — masks lower body of passengers */}
                <div className="relative z-10">
                  <IllustrationImage name={car.asset} alt="" className="w-full h-auto" />
                  <span className="absolute top-[18%] left-[8%] font-display font-bold text-[7px] md:text-[10px] text-brand-navy/70 pointer-events-none">
                    {car.label}
                  </span>
                  <m.div className="absolute bottom-[-10%] left-[12%] w-[20%]" style={{ rotate: wheelRot }}>
                    <IllustrationImage name="train-wheel" alt="" className="w-full h-auto" />
                  </m.div>
                  <m.div className="absolute bottom-[-10%] right-[12%] w-[20%]" style={{ rotate: wheelRot }}>
                    <IllustrationImage name="train-wheel" alt="" className="w-full h-auto" />
                  </m.div>
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
            className="absolute top-0 right-[6%] w-32 md:w-44 origin-top"
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
          <m.div className="absolute top-[5%] right-0 w-2/5" style={{ x: cloudR1x, opacity: cloudOp }}>
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
            className="absolute top-1/3 right-1/4 w-24 md:w-36 pointer-events-auto"
            style={{ opacity: useTransform(p, [0.58, 0.64], [0, 1]) }}
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

        {/* ── Tap hint ───────────────────────────────────────────────── */}
        {showTapHint && (
          <div className="absolute bottom-24 left-1/2 md:left-2/3 -translate-x-1/2 z-20 pointer-events-none">
            <div className="flex items-center gap-2 bg-sun-yellow text-brand-navy font-body text-[12px] font-medium px-3 py-1.5 rounded-full shadow-sm animate-bubble-in">
              <Hand size={12} aria-hidden="true" />
              Psst… tap the animals
            </div>
          </div>
        )}

        {/* ── Content card (always in DOM, always usable) ──────────── */}
        <HeroContentCard openBooking={openBooking} />
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
