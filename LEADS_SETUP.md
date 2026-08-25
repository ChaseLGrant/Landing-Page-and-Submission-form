# Your lead call list — setup (about 5 minutes, once)

Every lead lands in one clean Google Sheet you can sort, filter, and work down
the phone — with a **Called?** column to check people off. Netlify Forms keeps
a full backup of every submission automatically, so nothing is ever lost.

**Your sheet:** *The Athlete Market — Leads*
https://docs.google.com/spreadsheets/d/12AgNnOlzaawCenbTozK7sqpcbDUL2U0eay37QgOUk1Y/edit

Columns are ordered for calling: Called? · Received · Parent Name · Phone ·
Email · Athlete · Sport · Grad Year · Status · Timeline · Budget · … then the
rest of the application and ad-tracking details.

> Tip: open the **Google Sheets app** on your phone and pin this sheet — it
> becomes a call list you can work anywhere. Tapping a phone number on mobile
> starts the call.

## Connect the form to the sheet

1. Open the sheet (link above) → **Extensions → Apps Script**.
2. Delete anything in the editor, then paste the entire contents of
   [`scripts/leads-to-sheet.gs`](./scripts/leads-to-sheet.gs). Click **Save**.
3. Click **Deploy → New deployment**.
   - Gear icon → **Web app**.
   - **Description:** anything (e.g. "lead capture").
   - **Execute as:** **Me**.
   - **Who has access:** **Anyone**.  ← required so the public page can post.
   - **Deploy**, then **Authorize access** and allow the permissions (this is
     your own script writing to your own sheet).
4. Copy the **Web app URL** it gives you (looks like
   `https://script.google.com/macros/s/AKfy.../exec`).
5. Send me that URL and I'll drop it into the page and push — or paste it
   yourself into `landing/index.html` at `CONFIG.sheetEndpoint: ""` between the
   quotes.

## Test it

After the site is deployed (or on the Netlify deploy preview), run one full
application through the page. A new row should appear in the sheet within a few
seconds. If it doesn't:

- Open the Web app URL directly in a browser — it should show
  `{"ok":true,"service":"athlete-market-leads"}`. If not, re-deploy.
- Make sure **Who has access** is **Anyone**, and that the URL ends in `/exec`
  (not `/dev`).
- Check `CONFIG.sheetEndpoint` in `landing/index.html` is set and deployed.

## Changing who can see the list

The sheet is owned by your Google account. Use **Share** (top-right of the
sheet) to add teammates so more than one person can call and update statuses.
