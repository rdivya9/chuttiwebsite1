/**
 * whatsapp.js — Provider-agnostic WhatsApp Business API adapter.
 *
 * Sends an approved template message to the clinic's WhatsApp number
 * when a parent submits a booking request.
 *
 * Provider is selected via WHATSAPP_PROVIDER env var:
 *   'meta'      — Meta Cloud API (direct)
 *   'interakt'  — Interakt (Indian BSP)
 *   'aisensy'   — AiSensy
 *   'wati'      — WATI
 *   'gupshup'   — Gupshup
 *
 * If WHATSAPP_PROVIDER or WHATSAPP_API_KEY is not set, the function
 * returns { success: false, skipped: true } so the route can still
 * succeed via the Sheet channel.
 *
 * Template message format (must be approved with your provider):
 *   New booking request — Chutti's website
 *   Parent: {{parent_name}}
 *   Phone: {{phone}}
 *   Child: {{child_name}}, age {{age_group}}
 *   Reason: {{reason}}
 *   Preferred: {{preferred_date}}, {{preferred_slot}}
 *   First visit: {{first_visit}}
 *   About the child: {{notes}}
 */

function buildTemplateParams(data) {
  return [
    data.parentName,
    data.phone,
    data.childName || '—',
    data.ageGroup,
    data.reason || '—',
    data.preferredDate || '—',
    data.preferredSlot || '—',
    data.firstVisit || '—',
    data.notes || '—',
  ];
}

function buildTextMessage(data) {
  return [
    `New booking request — Chutti's website`,
    `Parent: ${data.parentName}`,
    `Phone: ${data.phone}`,
    `Child: ${data.childName || '—'}, age ${data.ageGroup}`,
    `Reason: ${data.reason || '—'}`,
    `Preferred: ${data.preferredDate || '—'}, ${data.preferredSlot || '—'}`,
    `First visit: ${data.firstVisit || '—'}`,
    `About the child: ${data.notes || '—'}`,
  ].join('\n');
}

async function sendMeta(data) {
  const url = `https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
  const body = {
    messaging_product: 'whatsapp',
    to:                process.env.CLINIC_WHATSAPP_RECIPIENT,
    type:              'template',
    template: {
      name:     process.env.WHATSAPP_TEMPLATE_NAME,
      language: { code: 'en' },
      components: [{
        type:       'body',
        parameters: buildTemplateParams(data).map(v => ({ type: 'text', text: String(v) })),
      }],
    },
  };
  const res = await fetch(url, {
    method:  'POST',
    headers: { 'Authorization': `Bearer ${process.env.WHATSAPP_API_KEY}`, 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Meta WA API: ${res.status}`);
  return true;
}

async function sendInterakt(data) {
  const res = await fetch('https://api.interakt.ai/v1/public/message/', {
    method:  'POST',
    headers: { 'Authorization': `Basic ${process.env.WHATSAPP_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      countryCode: '+91',
      phoneNumber: process.env.CLINIC_WHATSAPP_RECIPIENT.replace('91', ''),
      type:        'Template',
      template: {
        name:     process.env.WHATSAPP_TEMPLATE_NAME,
        languageCode: 'en',
        bodyValues: buildTemplateParams(data),
      },
    }),
  });
  if (!res.ok) throw new Error(`Interakt: ${res.status}`);
  return true;
}

async function sendWATI(data) {
  const recipient = process.env.CLINIC_WHATSAPP_RECIPIENT;
  const res = await fetch(
    `${process.env.WHATSAPP_API_KEY}/api/v1/sendTemplateMessage?whatsappNumber=${recipient}`,
    {
      method:  'POST',
      headers: { 'Authorization': `Bearer ${process.env.WATI_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        template_name: process.env.WHATSAPP_TEMPLATE_NAME,
        broadcast_name: 'chutti_booking',
        parameters: buildTemplateParams(data).map((v, i) => ({ name: `v${i+1}`, value: String(v) })),
      }),
    }
  );
  if (!res.ok) throw new Error(`WATI: ${res.status}`);
  return true;
}

// AiSensy and Gupshup: similar pattern — add when onboarding with those providers.
async function sendFallbackText(data) {
  // Generic text message fallback — used when no template is configured.
  // Only works if the recipient has messaged first (24hr window).
  console.warn('[whatsapp] Sending plain text fallback — configure template for production');
  // Not sending anything; just log. Return false so Sheet channel is used.
  return false;
}

/**
 * sendBookingWhatsApp(data) — main export.
 * Returns { success: boolean, skipped?: boolean }
 */
export async function sendBookingWhatsApp(data) {
  const provider = process.env.WHATSAPP_PROVIDER;
  const apiKey   = process.env.WHATSAPP_API_KEY;

  if (!provider || !apiKey) {
    // Credentials not configured yet — skip silently
    return { success: false, skipped: true };
  }

  try {
    switch (provider) {
      case 'meta':     await sendMeta(data);     break;
      case 'interakt': await sendInterakt(data); break;
      case 'wati':     await sendWATI(data);     break;
      case 'aisensy':
      case 'gupshup':
        // TODO: implement when onboarding with these providers
        return { success: false, skipped: true };
      default:
        console.warn(`[whatsapp] Unknown provider: ${provider}`);
        return { success: false, skipped: true };
    }
    return { success: true };
  } catch (err) {
    console.error('[whatsapp] Send failed:', err.message);
    return { success: false, error: err.message };
  }
}
