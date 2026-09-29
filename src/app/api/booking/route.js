/**
 * POST /api/booking — Booking submission handler.
 *
 * Flow:
 * 1. Validate input server-side (validateBooking.js)
 * 2. Spam protection: honeypot (caught in validation) + min time-on-form (checked client-side)
 * 3. In parallel: send WhatsApp message + append Google Sheet row
 * 4. Succeed if at least one channel worked OR both are unconfigured (dev/staging mode)
 * 5. Fail only if at least one channel was configured but both failed
 *
 * WhatsApp and Sheet credentials are set via Vercel environment variables.
 * If not set, those channels are skipped and the route returns success (dev mode).
 *
 * Never log personal data to console in production.
 */

import { validateBooking } from '@/lib/validateBooking';
import { sendBookingWhatsApp } from '@/lib/whatsapp';
import { sendToSheet } from '@/lib/sheets';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }

  // 1. Validate
  const validation = validateBooking(body);
  if (!validation.valid) {
    return Response.json({ success: false, errors: validation.errors }, { status: 400 });
  }

  const data    = validation.sanitised;
  const pageUrl = request.headers.get('referer') || '';

  // 2. Send in parallel
  const [waResult, sheetResult] = await Promise.allSettled([
    sendBookingWhatsApp(data),
    sendToSheet(data, { pageUrl }),
  ]);

  const waOk    = waResult.status    === 'fulfilled' && (waResult.value.success    || waResult.value.skipped);
  const sheetOk = sheetResult.status === 'fulfilled' && (sheetResult.value.success || sheetResult.value.skipped);

  // Both channels skipped = neither configured = dev/staging mode → return success
  const bothSkipped =
    waResult.status    === 'fulfilled' && waResult.value.skipped &&
    sheetResult.status === 'fulfilled' && sheetResult.value.skipped;

  // At least one real success
  const atLeastOneSuccess =
    (waResult.status    === 'fulfilled' && waResult.value.success) ||
    (sheetResult.status === 'fulfilled' && sheetResult.value.success);

  if (atLeastOneSuccess || bothSkipped) {
    return Response.json({ success: true });
  }

  // Both failed (and at least one was configured)
  if (process.env.NODE_ENV !== 'production') {
    console.error('[booking] Both channels failed', {
      wa:    waResult.status    === 'fulfilled' ? waResult.value    : waResult.reason?.message,
      sheet: sheetResult.status === 'fulfilled' ? sheetResult.value : sheetResult.reason?.message,
    });
  }

  return Response.json({ success: false, error: 'Delivery failed on all channels' }, { status: 502 });
}
