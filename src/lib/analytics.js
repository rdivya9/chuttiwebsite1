/**
 * analytics.js — trackEvent() wrapper for GA4 custom events.
 *
 * Events from build-spec.md A9:
 *   booking_open, booking_step, booking_submit_success, booking_submit_error,
 *   whatsapp_click, call_click, character_tap, dino_found, blog_share
 *
 * Usage (client components only):
 *   import { trackEvent } from '@/lib/analytics';
 *   trackEvent('booking_open', { source: 'hero', reason: '' });
 *
 * No-op if GA4 is not configured (NEXT_PUBLIC_GA_ID not set).
 */

export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return;
  if (!window.gtag) return;
  window.gtag('event', eventName, params);
}
