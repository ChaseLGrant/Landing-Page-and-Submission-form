# Deploying The Athlete Market landing page to Netlify

The landing page is a self-contained static site in [`landing/`](./landing).
`netlify.toml` publishes that folder with **no build step**, so the finely
tuned funnel (multi-step application, qualification off-ramp, ad attribution)
ships exactly as written.

## One-time setup

1. Push this branch (already done).
2. In Netlify: **Add new site → Import an existing project** and pick this repo.
3. Netlify reads `netlify.toml` automatically:
   - Publish directory: `landing`
   - Build command: _(none)_
4. Deploy. Your page is live at the Netlify URL (add a custom domain under
   **Domain settings** to serve it from theathletemarket.com or a subdomain).

## Leads (no backend needed)

Lead capture uses **Netlify Forms**. On deploy, Netlify detects the hidden
`athlete-market` form in `landing/index.html` and stores every submission.

- **Clean call list:** leads also auto-append to a Google Sheet with a
  **Called?** column — see [`LEADS_SETUP.md`](./LEADS_SETUP.md). This is the
  easiest way to see who came in and call them back.
- View/back up leads anytime: **Site → Forms → athlete-market**.
- Every funnel outcome is tagged in the `outcome` field:
  `qualified_application`, `disqualified_free_only`, `free_resource_signup`,
  `spam_suspected`. UTM / fbclid / gclid params are captured for ad reporting.

### Get emailed every lead (do this once after the first deploy)

The `athlete-market` form only appears in Netlify **after the site has
deployed once** (that's when Netlify parses the HTML and registers it). Then:

1. In Netlify: **Site configuration → Forms → Form notifications**
   (or **Forms → Settings and usage → Form notifications**).
2. Click **Add notification → Email notification**.
3. **Email to notify:** enter the address(es) that should get leads — separate
   multiple with a comma (e.g. you + a teammate). Recruiting leads are
   time-sensitive, so use an inbox someone actually watches on their phone.
4. **Form:** choose `athlete-market`. Leave the rest default. **Save.**

That's it — every submission now emails you the athlete's info, the parent's
name/email/phone, and the `outcome` tag, while a copy stays stored in the
Forms dashboard as backup. Test it with a real run through the page after
deploy; if the email doesn't arrive, check spam and confirm the recipient
address, then re-submit.

> Tip: you can add a **Slack notification** the same way if you want the team
> pinged in a channel too. And to stop paying attention to the low-value
> "free resources only" opt-outs, you can filter them in your inbox by the
> `outcome: disqualified_free_only` line.

## Before you go live (recommended, not required)

- Add the founder photo: replace the placeholder `src` in the founder
  `.frame img` (search `ADD PHOTOGRAPH` in `landing/index.html`).
- The Meta Pixel is already live (`CONFIG.metaPixelId`) and fires `PageView`,
  `ApplicationStarted`, `Lead` (qualified application), `ApplicationDisqualified`,
  and `FreeResourceSignup`. Verify with the Meta Pixel Helper extension after
  deploy.
- Optionally set `CONFIG.fallbackEmail` / `fallbackPhone` in the script so a
  failed submission shows a manual contact path.
