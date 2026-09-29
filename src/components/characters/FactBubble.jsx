'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

/**
 * FactBubble — speech-bubble tooltip for tappable characters.
 *
 * Appears with scale 0.9→1 + opacity fade (180ms).
 * Auto-dismisses after 5s. Closed by Esc, clicking outside, or the × button.
 * Announced via an aria-live region (rendered once, outside the bubble).
 *
 * Uses CSS animation instead of Framer Motion to keep it lightweight.
 */
export default function FactBubble({ text, onClose, characterName, style = {} }) {
  const ref = useRef(null);

  // Auto-dismiss
  useEffect(() => {
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [onClose]);

  // Esc to close
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Click outside
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      role="status"
      style={{
        maxWidth: 240,
        ...style,
      }}
      className={[
        'absolute z-30 pointer-events-auto',
        'bg-sun-yellow text-brand-navy font-body text-[13px] leading-snug',
        'rounded-2xl px-4 py-3 shadow-card',
        // Bubble tail (pointing down toward character) — pure CSS
        'after:content-[\'\'] after:absolute after:top-full after:left-6',
        'after:border-8 after:border-transparent after:border-t-sun-yellow',
        // Entrance animation
        'animate-bubble-in',
      ].join(' ')}
    >
      <p>{text}</p>
      <button
        onClick={onClose}
        aria-label="Close fact bubble"
        className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-navy/20 flex items-center justify-center hover:bg-brand-navy/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy"
      >
        <X size={10} aria-hidden="true" />
      </button>
    </div>
  );
}
