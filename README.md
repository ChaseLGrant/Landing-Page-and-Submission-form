# The Athlete Market — Landing Page & Lead Form

A self-contained, high-converting recruiting-advisory landing page with a
multi-step application funnel. Deployed as a static site on Netlify.

## What's here

- `landing/index.html` — the entire page (HTML/CSS/JS in one file).
- `netlify.toml` — serves `landing/` statically, no build step.
- `scripts/leads-to-sheet.gs` — Google Apps Script that appends each lead to a
  Google Sheet call list.
- `NETLIFY_DEPLOY.md` — how to deploy on Netlify.
- `LEADS_SETUP.md` — how leads are captured and where they go.

## Lead capture

Every submission is delivered three ways:

1. **Google Sheet** call list (via the Apps Script web app in `CONFIG.sheetEndpoint`).
2. **Netlify Forms** — stored server-side as a backup (form name `athlete-market`).
3. Optional **email notifications** — enable in the Netlify dashboard.

## Analytics

Meta Pixel is wired (`CONFIG.metaPixelId`) and fires `PageView`,
`ApplicationStarted`, `Lead`, `ApplicationDisqualified`, and
`FreeResourceSignup`.

## Deploy

See `NETLIFY_DEPLOY.md`. In short: connect this repo in Netlify, deploy the
`main` branch — `netlify.toml` handles the rest (publish `landing`, no build).
