'use client';

import { motion } from 'framer-motion';

// ── Inline SVG dental icons (outline style) ───────────────────────────────

function IconTooth({ color }) {
  return (
    <svg viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path
        d="M22 5C15 5 9 9 7 16 5 21 5 27 6.5 31L10 48C10.5 50 12 50 12.5 48L14 42C14.5 40 17.5 40 18 42L19.5 46C20 48 21.5 48 22 46 22.5 48 24 48 24.5 46L26 42C26.5 40 29.5 40 30 42L31.5 48C32 50 33.5 50 34 48L37.5 31C39 27 39 21 37 16 35 9 29 5 22 5Z"
        stroke={color} strokeWidth="1.8" strokeLinejoin="round"
      />
    </svg>
  );
}

function IconToothSparkle({ color }) {
  return (
    <svg viewBox="0 0 64 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path
        d="M32 8C25 8 19 12 17 19 15 24 15 30 16.5 34L20 51C20.5 53 22 53 22.5 51L24 45C24.5 43 27.5 43 28 45L29.5 49C30 51 31.5 51 32 49 32.5 51 34 51 34.5 49L36 45C36.5 43 39.5 43 40 45L41.5 51C42 53 43.5 53 44 51L47.5 34C49 30 49 24 47 19 45 12 39 8 32 8Z"
        stroke={color} strokeWidth="1.7" strokeLinejoin="round"
      />
      <path d="M7 13L8.3 17.5L13 18.8L8.3 20.1L7 24L5.7 20.1L1 18.8L5.7 17.5Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M55 7L56.1 10.5L59.5 11.6L56.1 12.7L55 16L53.9 12.7L50.5 11.6L53.9 10.5Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  );
}

function IconToothbrush({ color }) {
  return (
    <svg viewBox="0 0 20 66" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="5" y="2" width="10" height="20" rx="3.5" stroke={color} strokeWidth="1.5"/>
      <line x1="10" y1="6" x2="10" y2="18" stroke={color} strokeWidth="1.3"/>
      <line x1="5" y1="9" x2="5" y2="15" stroke={color} strokeWidth="1.3"/>
      <line x1="15" y1="9" x2="15" y2="15" stroke={color} strokeWidth="1.3"/>
      <path d="M10 22 L10 62" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function IconToothpaste({ color }) {
  return (
    <svg viewBox="0 0 62 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="2" y="9" width="36" height="14" rx="5" stroke={color} strokeWidth="1.5"/>
      <rect x="38" y="11" width="8" height="10" rx="2" stroke={color} strokeWidth="1.5"/>
      <path d="M46 15C49 13.5 52 14 55 15.5 52.5 17 49.5 17 46 16" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      <path d="M2 12 Q0.5 16 2 20" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function IconMirror({ color }) {
  return (
    <svg viewBox="0 0 26 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="13" cy="10" r="8.5" stroke={color} strokeWidth="1.6"/>
      <circle cx="13" cy="10" r="4.5" stroke={color} strokeWidth="1" opacity="0.55"/>
      <line x1="13" y1="18.5" x2="13" y2="57" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

function IconPick({ color }) {
  return (
    <svg viewBox="0 0 42 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M21 56C21 56 21 38 21 32 21 26 17 17 8 7L5 3.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M21 56C21 56 21 38 21 32 21 26 25 17 34 9" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M5 3.5C4 2 3 1 2 2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function IconFloss({ color }) {
  return (
    <svg viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="3" y="3" width="44" height="34" rx="8" stroke={color} strokeWidth="1.6"/>
      <path d="M11 21C15 14 20 14 25 21 30 28 35 28 39 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function IconSparkle({ color }) {
  return (
    <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M11 2L12.6 8.4L19 10L12.6 11.6L11 18L9.4 11.6L3 10L9.4 8.4Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Icon placements: x/y in %, w in px, r = rotation deg ─────────────────
const ICONS = [
  // Row 1 — top strip
  { id:1,  C:IconToothSparkle, x:2,   y:4,   w:50, r:-15, yf:10, dur:4.5, d:0    },
  { id:2,  C:IconToothbrush,   x:13,  y:1,   w:20, r:28,  yf:8,  dur:5.0, d:0.8  },
  { id:3,  C:IconMirror,       x:21,  y:9,   w:23, r:-22, yf:12, dur:4.0, d:1.5  },
  { id:4,  C:IconPick,         x:27,  y:2,   w:32, r:18,  yf:9,  dur:5.5, d:2.0  },
  { id:5,  C:IconFloss,        x:37,  y:7,   w:42, r:10,  yf:7,  dur:4.8, d:0.5  },
  { id:6,  C:IconToothpaste,   x:47,  y:1,   w:44, r:-10, yf:11, dur:5.2, d:1.2  },
  { id:7,  C:IconToothbrush,   x:57,  y:6,   w:20, r:-28, yf:8,  dur:4.3, d:0.3  },
  { id:8,  C:IconTooth,        x:65,  y:2,   w:36, r:22,  yf:10, dur:5.0, d:1.8  },
  { id:9,  C:IconMirror,       x:74,  y:8,   w:23, r:-18, yf:12, dur:4.7, d:0.7  },
  { id:10, C:IconToothSparkle, x:83,  y:3,   w:50, r:26,  yf:9,  dur:4.5, d:1.0  },

  // Row 2 — middle strip
  { id:11, C:IconSparkle,      x:7,   y:30,  w:20, r:0,   yf:6,  dur:3.8, d:0.4  },
  { id:12, C:IconFloss,        x:17,  y:34,  w:42, r:-6,  yf:10, dur:5.0, d:2.2  },
  { id:13, C:IconPick,         x:29,  y:26,  w:32, r:38,  yf:12, dur:4.6, d:0.9  },
  { id:14, C:IconToothpaste,   x:40,  y:32,  w:44, r:-14, yf:8,  dur:5.3, d:1.4  },
  { id:15, C:IconTooth,        x:51,  y:27,  w:36, r:-32, yf:9,  dur:4.2, d:0.6  },
  { id:16, C:IconSparkle,      x:61,  y:33,  w:18, r:0,   yf:6,  dur:3.5, d:2.0  },
  { id:17, C:IconMirror,       x:70,  y:26,  w:23, r:22,  yf:11, dur:4.9, d:1.1  },
  { id:18, C:IconToothSparkle, x:82,  y:31,  w:50, r:-22, yf:10, dur:5.1, d:0.2  },

  // Row 3 — bottom strip
  { id:19, C:IconToothbrush,   x:4,   y:60,  w:20, r:42,  yf:8,  dur:4.4, d:1.7  },
  { id:20, C:IconFloss,        x:15,  y:66,  w:42, r:-8,  yf:10, dur:5.0, d:0.8  },
  { id:21, C:IconPick,         x:27,  y:58,  w:32, r:-42, yf:12, dur:4.8, d:1.5  },
  { id:22, C:IconSparkle,      x:39,  y:68,  w:18, r:0,   yf:6,  dur:3.7, d:0.3  },
  { id:23, C:IconToothpaste,   x:50,  y:62,  w:44, r:22,  yf:9,  dur:5.2, d:2.1  },
  { id:24, C:IconTooth,        x:62,  y:57,  w:36, r:-18, yf:10, dur:4.6, d:0.9  },
  { id:25, C:IconMirror,       x:73,  y:65,  w:23, r:32,  yf:11, dur:4.3, d:1.3  },
  { id:26, C:IconToothSparkle, x:87,  y:60,  w:50, r:-28, yf:9,  dur:5.0, d:0.5  },
];

// Brand palette — rotated across icons
const COLORS = [
  '#16295C', // brand-navy
  '#6CBF4A', // brand-green
  '#16295C',
  '#E0246F', // brand-pink
  '#6F5B9E', // dusk-violet
  '#F59E0B', // amber warm
];

ICONS.forEach((ic, i) => { ic.color = COLORS[i % COLORS.length]; });

// ── Component ─────────────────────────────────────────────────────────────

export default function FloatingDentalIcons({ opacity = 0.13, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
    >
      {ICONS.map(({ id, C, x, y, w, r, yf, dur, d, color }) => (
        <div
          key={id}
          style={{
            position: 'absolute',
            left: `${x}%`,
            top:  `${y}%`,
            width: w,
            opacity,
            transform: `rotate(${r}deg)`,
          }}
        >
          <motion.div
            animate={{ y: [0, -yf, 0] }}
            transition={{ repeat: Infinity, duration: dur, delay: d, ease: 'easeInOut' }}
          >
            <C color={color} />
          </motion.div>
        </div>
      ))}
    </div>
  );
}
