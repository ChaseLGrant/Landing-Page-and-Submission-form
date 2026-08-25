/**
 * The Athlete Market — lead capture into Google Sheets.
 *
 * Paste this into the Apps Script editor of the "The Athlete Market — Leads"
 * spreadsheet (Extensions → Apps Script), then deploy it as a Web app.
 * Full steps: see LEADS_SETUP.md in the repo.
 *
 * Each form submission POSTs here and is appended as one row, in the same
 * column order as the header the sheet ships with. The "Called?" column is
 * left blank for you to check off as you work the list.
 */

// Must match the sheet's header row, left to right.
var COLUMNS = [
  'called',        // left blank — you fill this in
  'submitted_at',  // Received
  'parent_name',   // built from parent_first + parent_last
  'phone',
  'email',
  'athlete',       // built from athlete_first + athlete_last
  'sport',
  'grad_year',
  'status',
  'timeline',
  'budget',
  'position',
  'high_school',
  'city_state',
  'gpa',
  'film_url',
  'challenges',
  'importance',
  'best_time',
  'notes',
  'outcome',
  'source',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'fbclid',
  'gclid',
  'landing_url',
  'referrer'
];

function doPost(e) {
  var p = (e && e.parameter) ? e.parameter : {};
  return writeRow(p);
}

function writeRow(p) {
  var lock = LockService.getScriptLock();
  lock.tryLock(20000); // serialize writes so rows never collide
  try {
    // Combine the split name fields into friendly single columns.
    p.parent_name  = [p.parent_first, p.parent_last].filter(String).join(' ').trim();
    p.athlete      = [p.athlete_first, p.athlete_last].filter(String).join(' ').trim();
    if (!p.submitted_at) p.submitted_at = new Date().toISOString();

    var row = COLUMNS.map(function (key) {
      if (key === 'called') return '';        // blank checkbox column
      return p[key] != null ? p[key] : '';
    });

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    sheet.appendRow(row);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// doGet now doubles as the lead-capture endpoint. The landing page sends data
// as query-string parameters (GET) because Apps Script's 302 redirect converts
// a no-cors POST into a GET and drops the body. If no parameters are present
// (bare URL visit) it still returns the health-check JSON.
function doGet(e) {
  var p = (e && e.parameter) ? e.parameter : {};
  // If real form fields are present, write the row.
  if (p.email || p.phone || p.parent_first || p.athlete_first) {
    return writeRow(p);
  }
  return json({ ok: true, service: 'athlete-market-leads' });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
