'use client';

import { useState, useCallback, useId } from 'react';
import IllustrationImage from '@/components/ui/IllustrationImage';
import FactBubble from '@/components/characters/FactBubble';
import { trackEvent } from '@/lib/analytics';

/**
 * TappableCharacter — reusable tappable animal component.
 *
 * Props:
 *   characterId   — id from characters.js (e.g. 'giraffe')
 *   name          — display name for aria-label
 *   asset         — illustration key
 *   fact          — approved tooth fact text
 *   fallbackFact  — shown when approved: false
 *   approved      — boolean; if false shows fallbackFact
 *   reaction      — 'bounce' | 'blink' | 'wiggle' | 'hop' | 'head-turn' (CSS class)
 *   className     — wrapper class
 *   imageClassName — image class
 *   alt           — passed to IllustrationImage
 *
 * Behaviour:
 *   - Tap/click → reaction animation + FactBubble
 *   - One bubble open at a time (parent manages via `activeBubble` context if needed;
 *     here each character manages its own — simplest correct solution)
 *   - Hover: lift 4px (CSS, desktop only)
 *   - Touch devices: no hover effect
 *   - prefers-reduced-motion: no reaction animation, bubble only
 */

const reactionClasses = {
  bounce:     'animate-char-bounce',
  blink:      'animate-char-blink',
  wiggle:     'animate-char-wiggle',
  hop:        'animate-char-hop',
  'head-turn':'animate-char-head-turn',
  'arm-wave': 'animate-char-bounce',
  'trunk-raise':'animate-char-hop',
  steam:      'animate-char-bounce',
  wave:       'animate-char-bounce',
  roar:       'animate-char-wiggle',
  munch:      'animate-char-bounce',
  'head-pop': 'animate-char-hop',
  'head-bob': 'animate-char-bounce',
  'wing-flap':'animate-char-wiggle',
};

export default function TappableCharacter({
  characterId,
  name,
  asset,
  fact,
  fallbackFact = 'Hello! Have you brushed today?',
  approved = false,
  reaction = 'bounce',
  className = '',
  imageClassName = '',
  alt = '',
  bubblePosition = 'above', // 'above' | 'left' | 'right'
}) {
  const [showBubble, setShowBubble]   = useState(false);
  const [isReacting, setIsReacting]   = useState(false);
  const bubbleId                       = useId();

  const displayFact = approved ? fact : fallbackFact;

  const handleTap = useCallback(() => {
    setShowBubble(true);
    setIsReacting(true);
    trackEvent('character_tap', { character: characterId });
    setTimeout(() => setIsReacting(false), 700);
  }, [characterId]);

  const closeBubble = useCallback(() => setShowBubble(false), []);

  const bubbleStyle =
    bubblePosition === 'above'  ? { bottom: '105%', left: 0 }   :
    bubblePosition === 'left'   ? { right: '105%', top: 0 }     :
                                  { left: '105%',  top: 0 };

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        onClick={handleTap}
        aria-label={`${name} — tap for a tooth fact`}
        aria-expanded={showBubble}
        aria-describedby={showBubble ? bubbleId : undefined}
        className={[
          'block relative group cursor-pointer select-none',
          'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-navy focus-visible:ring-offset-2 rounded-xl',
          // Hover lift — desktop only via pointer media query
          'md:hover:-translate-y-1 md:hover:duration-150 transition-transform',
          // Min touch target
          'min-w-[44px] min-h-[44px]',
        ].join(' ')}
      >
        <IllustrationImage
          name={asset}
          alt={alt}
          className={`${imageClassName} ${isReacting ? reactionClasses[reaction] || '' : ''}`}
        />
      </button>

      {/* Fact bubble */}
      {showBubble && (
        <FactBubble
          id={bubbleId}
          text={displayFact}
          onClose={closeBubble}
          characterName={name}
          style={bubbleStyle}
        />
      )}
    </div>
  );
}
