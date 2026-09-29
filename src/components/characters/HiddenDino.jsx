'use client';

import { useState, useCallback } from 'react';
import IllustrationImage from '@/components/ui/IllustrationImage';
import FactBubble from '@/components/characters/FactBubble';
import { trackEvent } from '@/lib/analytics';

/**
 * HiddenDino — the hidden dino found on every page.
 *
 * Tap/click → wiggle + fact bubble ("You found me!").
 * Fires dino_found analytics event with page name.
 *
 * Placement per page is specified in characters.js and set by the parent
 * via className (positioning must be done by the parent container).
 *
 * Reduced motion: no wiggle, bubble only.
 *
 * Props:
 *   page    — page name for analytics (e.g. 'home', 'first-visit')
 *   asset   — 'dino-peek' | 'dino-sitting' | 'dino-sleeping' etc.
 *   size    — width class (default 'w-12 md:w-16')
 *   className — positioning class from parent
 */
export default function HiddenDino({
  page = 'unknown',
  asset = 'dino-peek',
  size = 'w-12 md:w-16',
  className = '',
}) {
  const [showBubble, setShowBubble]   = useState(false);
  const [isWiggling, setIsWiggling]   = useState(false);

  const handleTap = useCallback(() => {
    setShowBubble(true);
    setIsWiggling(true);
    trackEvent('dino_found', { page });
    setTimeout(() => setIsWiggling(false), 450);
  }, [page]);

  const closeBubble = useCallback(() => setShowBubble(false), []);

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        onClick={handleTap}
        aria-label="Hidden dino — tap to say hello"
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2 rounded-lg"
      >
        <IllustrationImage
          name={asset}
          alt="The friendly dino from the clinic wall"
          className={`${size} h-auto ${isWiggling ? 'animate-char-wiggle' : ''}`}
        />
      </button>

      {showBubble && (
        <FactBubble
          text="You found me! I'm the dino from the clinic wall."
          onClose={closeBubble}
          characterName="Dino"
          style={{ bottom: '105%', left: 0 }}
        />
      )}
    </div>
  );
}
