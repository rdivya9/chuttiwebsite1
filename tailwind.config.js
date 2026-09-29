/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/pages/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      // ── Brand colours (sampled from logo) ──────────────────────────────
      // Verify with pixel sampler against public/photos/logo.jpeg
      colors: {
        'brand-pink':    '#E0246F', // Magenta-pink — primary buttons, key highlights
        'brand-navy':    '#16295C', // Deep navy — headings, body text, footer base
        'brand-green':   '#6CBF4A', // Smile green — success states, leaf accents
        'sky-mist':      '#EAF6FC', // Hero sky top, light section backgrounds
        'morning-white': '#FBFDFF', // Default page background (cool white, not cream)
        'sun-yellow':    '#FFE28A', // Aligner section, fact bubbles, emergency band tint
        'blush':         '#FDE7EF', // Soft pink tint — First Visit section, Myth card side
        'leaf-mint':     '#E3F3DC', // Soft green tint — Fact card side, Comfort Care
        'dusk-violet':   '#6F5B9E', // Closing dusk gradient mid-tone
        'night-navy':    '#0F1C40', // Footer night sky
      },

      // ── Typography ─────────────────────────────────────────────────────
      fontFamily: {
        display: ['var(--font-baloo2)', 'sans-serif'],  // Headings — Baloo 2
        body:    ['var(--font-figtree)', 'sans-serif'],  // Body / UI — Figtree
      },
      fontSize: {
        'hero-mobile': ['36px', { lineHeight: '1.05' }],
        'hero-desktop': ['60px', { lineHeight: '1.05' }],
        'h2-mobile':   ['28px', { lineHeight: '1.15' }],
        'h2-desktop':  ['42px', { lineHeight: '1.15' }],
        'h3-mobile':   ['21px', { lineHeight: '1.2' }],
        'h3-desktop':  ['26px', { lineHeight: '1.2' }],
        'body-sm':     ['17px', { lineHeight: '1.6' }],
        'body-lg':     ['18px', { lineHeight: '1.6' }],
        'meta':        ['14px', { lineHeight: '1.5' }],
        'meta-lg':     ['15px', { lineHeight: '1.5' }],
        'btn':         ['16px', { lineHeight: '1' }],
        'btn-lg':      ['17px', { lineHeight: '1' }],
      },

      // ── Border radius ──────────────────────────────────────────────────
      borderRadius: {
        'pill':  '9999px', // Buttons
        'card':  '20px',   // Content cards
        'chip':  '999px',  // Small chips / tags
        'modal': '24px',   // Modal / bottom sheet
      },

      // ── Box shadow ─────────────────────────────────────────────────────
      boxShadow: {
        'card':  '0 4px 24px 0 rgba(22,41,92,0.08)',  // Raised cards
        'modal': '0 8px 48px 0 rgba(22,41,92,0.16)',  // Modal
        'header':'0 2px 12px 0 rgba(22,41,92,0.08)',  // Scrolled header
      },

      // ── Section spacing ────────────────────────────────────────────────
      spacing: {
        'section-mobile':  '72px',
        'section-desktop': '120px',
      },

      // ── Max widths ─────────────────────────────────────────────────────
      maxWidth: {
        'prose-dental': '70ch',  // Body text line length cap
        'modal':        '520px',
        'myth-card':    '760px',
      },
    },
  },
  plugins: [],
};
