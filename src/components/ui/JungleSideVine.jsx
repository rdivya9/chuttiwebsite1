'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * JungleSideVine — wraps section content with animated vine decorations.
 *
 * Usage:
 *   <Section bg="sky-mist" id="our-motto">
 *     <JungleSideVine>
 *       <div className="...">...content...</div>
 *     </JungleSideVine>
 *   </Section>
 *
 * - Vines peek in from left/right as the section enters the viewport
 * - Vines slide back out as you scroll past
 * - Continuous gentle bob keeps the jungle feeling alive
 * - mix-blend-mode: multiply removes the white background from the PNG
 * - Hidden on mobile
 */
export default function JungleSideVine({ children, className = '' }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Peek in from viewport edge — starts fully hidden, rests just at edge
  const xLeft  = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [-320, 0, 0, -320]);
  const xRight = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [320, 0, 0, 320]);

  return (
    <div ref={ref} className={`relative overflow-visible ${className}`}>

      {/* ── Left vine — pinned to viewport left edge ────────────────────── */}
      <motion.div
        className="hidden md:block absolute pointer-events-none select-none z-0"
        style={{
          x: xLeft,
          top: '-100px',
          left: 'calc(-1 * (50vw - 50%) - 1vw)',
        }}
        aria-hidden="true"
      >
        <div>
          <Image
            src="/illustrations/vine.png"
            alt=""
            width={280}
            height={900}
            className="w-52 lg:w-64 h-auto"
            style={{ mixBlendMode: 'multiply', opacity: 0.75, filter: 'none' }}
          />
        </div>
      </motion.div>

      {/* ── Right vine (mirrored) — pinned to viewport right edge ──────── */}
      <motion.div
        className="hidden md:block absolute pointer-events-none select-none z-0"
        style={{
          x: xRight,
          top: '-100px',
          right: 'calc(-1 * (50vw - 50%) - 40px + 2vw)',
        }}
        aria-hidden="true"
      >
        <div>
          <Image
            src="/illustrations/vine.png"
            alt=""
            width={280}
            height={900}
            className="w-52 lg:w-64 h-auto scale-x-[-1]"
            style={{ mixBlendMode: 'multiply', opacity: 0.75, filter: 'none' }}
          />
        </div>
      </motion.div>

      {/* ── Content above vines ────────────────────────────────────────── */}
      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
}
