/**
 * validateBooking.js — Server-side validation for booking submissions.
 *
 * Called by POST /api/booking.
 * Rules: required fields, Indian 10-digit mobile, age-group allowlist,
 * text length cap, HTML stripped.
 */

const AGE_GROUPS = ['Under 1', '1–3', '4–6', '7–12', '13–18'];
const REASONS    = [
  'First visit / check-up',
  'Tooth pain or cavity',
  'Injury to tooth',
  'Aligners / crooked teeth',
  'Habits (thumb-sucking etc.)',
  'Special healthcare needs',
  'Other',
];

function stripHtml(str) {
  return typeof str === 'string'
    ? str.replace(/<[^>]*>/g, '').trim()
    : '';
}

function cap(str, max) {
  return typeof str === 'string' ? str.slice(0, max) : '';
}

export function validateBooking(body) {
  const errors = [];

  // Required: parent name
  const parentName = stripHtml(cap(body.parentName, 80));
  if (!parentName) errors.push('parentName is required');

  // Required: phone — Indian 10-digit
  const phone = (body.phone || '').replace(/\D/g, '').slice(-10);
  if (!phone || phone.length !== 10) errors.push('phone must be a 10-digit Indian mobile number');

  // Required: age group from allowlist
  const ageGroup = body.ageGroup;
  if (!ageGroup || !AGE_GROUPS.includes(ageGroup)) errors.push('ageGroup must be one of: ' + AGE_GROUPS.join(', '));

  // Reason: optional but if provided must be from allowlist
  const reason = body.reason;
  if (reason && !REASONS.includes(reason)) errors.push('reason is not a valid option');

  // Optional text fields — strip HTML and cap length
  const childName = stripHtml(cap(body.childName, 60));
  const notes     = stripHtml(cap(body.notes, 1000));
  const firstVisit = body.firstVisit === 'Yes' || body.firstVisit === 'No'
    ? body.firstVisit : '';
  const preferredDate = /^\d{4}-\d{2}-\d{2}$/.test(body.preferredDate)
    ? body.preferredDate : '';
  const preferredSlot = cap(stripHtml(body.preferredSlot), 10);

  // Honeypot check
  if (body.honeypot) errors.push('honeypot triggered');

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    sanitised: {
      parentName,
      phone,
      ageGroup,
      reason:       reason || '',
      childName,
      notes,
      firstVisit,
      preferredDate,
      preferredSlot,
    },
  };
}
