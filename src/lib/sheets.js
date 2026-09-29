/**
 * sheets.js — Google Sheet backup sender.
 *
 * POSTs booking data to a Google Apps Script web-app URL that appends a row.
 * The Apps Script must be deployed as a web app with "Anyone" access.
 *
 * Sample Apps Script code (deploy as web app):
 *
 *   function doPost(e) {
 *     const data = JSON.parse(e.postData.contents);
 *     const sheet = SpreadsheetApp.getActiveSheet();
 *     sheet.appendRow([
 *       data.timestamp, data.parentName, data.phone, data.childName,
 *       data.ageGroup, data.reason, data.preferredDate, data.preferredSlot,
 *       data.firstVisit, data.notes, data.pageUrl
 *     ]);
 *     return ContentService.createTextOutput(JSON.stringify({ success: true }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 *
 * Set GOOGLE_SHEET_WEBHOOK_URL in Vercel env vars once deployed.
 *
 * If the env var is not set, returns { success: false, skipped: true }.
 */

export async function sendToSheet(data, { pageUrl = '' } = {}) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

  if (!webhookUrl) {
    return { success: false, skipped: true };
  }

  const payload = {
    timestamp:     new Date().toISOString(),
    parentName:    data.parentName,
    phone:         data.phone,
    childName:     data.childName || '',
    ageGroup:      data.ageGroup,
    reason:        data.reason || '',
    preferredDate: data.preferredDate || '',
    preferredSlot: data.preferredSlot || '',
    firstVisit:    data.firstVisit || '',
    notes:         data.notes || '',
    pageUrl,
  };

  try {
    const res = await fetch(webhookUrl, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Sheet webhook: ${res.status}`);
    return { success: true };
  } catch (err) {
    console.error('[sheets] Send failed:', err.message);
    return { success: false, error: err.message };
  }
}
