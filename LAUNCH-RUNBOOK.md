# Launch Runbook — Master Cho's Taekwondo

Step-by-step hand-holding for every technical task between **"site lives on Vercel preview"** and **"site is live on `masterchostaekwondo.com` with no Foxspin"**.

**Use this together with `GO-LIVE.md`** — that file tracks the high-level checklist (questions for Foxspin, what to preserve). This file is the *how* — exact buttons to click, exact records to add, exact code to change.

---

## Reading this doc

- **Phases must run in order.** Each phase has prereqs from the previous one.
- Inside a phase, the numbered steps must run in order. Don't skip.
- ⚠️ markers = "this is the point of no return / things that can break the live site"
- Every phase has a **Rollback** section at the end. Read it before you start.

**Total time:** ~4–6 hours of active work, spread over 3–7 days (mostly waiting on DNS / verification).

---

## Phase 0 — Decisions & prep (no impact on live site)

Before touching anything technical, decide:

- [ ] Where will DNS live post-cutover? (Recommend: **Vercel DNS** — simplest if you're hosting on Vercel)
- [ ] Will you transfer registrar away from Foxspin? (Recommend: **yes, after stable** — Cloudflare Registrar is cheapest. Do this in Phase 5, *not* during cutover.)
- [ ] What email address will appear in the "From" line of contact form notifications? (Recommend: `noreply@masterchostaekwondo.com`)
- [ ] What email receives contact form notifications? (Currently defaults to `tkdkscho@gmail.com` — change to a real business address)
- [ ] Cutover day & time — pick a low-traffic window (recommend a weekday morning so you can fix issues during business hours)

### 0A — Audit the current Foxspin site for SEO & GBP (do this NOW, before anything else)

You need a snapshot of the old site so you can verify nothing gets lost. **If you skip this and the Foxspin site goes dark, you can't compare.**

**Google Business Profile (GBP):**

1. Open `https://business.google.com` → find the Master Cho listing
2. Screenshot/record the following:
   - [ ] **Website URL** — is it `https://masterchostaekwondo.com` or something else (e.g., a Foxspin subdomain)? If it's already `masterchostaekwondo.com`, no change needed. If it's a Foxspin URL, you'll need to update it post-cutover.
   - [ ] **Phone number** — must match the new site exactly: `(425) 742-4282`
   - [ ] **Address** — must match exactly: `5031 168th ST SW STE 100, Lynnwood, WA 98037`
   - [ ] **Business name** — must match exactly between GBP and the site
   - [ ] **Categories** — primary + secondary (e.g., "Martial Arts School")
   - [ ] **Business hours** — record so you can verify later
   - [ ] **Reviews count** — just note the number so you can confirm they didn't disappear

**Why this matters:** Google's local algorithm ties GBP to the website. If the URL changes and you don't update GBP within a few days, rankings can drop. If NAP (Name, Address, Phone) is inconsistent between GBP and the new site, it hurts local SEO.

**Google Search Console:**

1. Open `https://search.google.com/search-console` → select `masterchostaekwondo.com`
2. Record:
   - [ ] **Total indexed pages** (Coverage / Pages section)
   - [ ] **Current sitemap URL** (Sitemaps section)
   - [ ] **Top search queries** for last 28 days (Performance section) — screenshot these
   - [ ] **Top pages** by clicks (Performance section) — these are the URLs you must NOT break
3. Check: **Is `masterchostaekwondo.com` verified via DNS TXT?** (Settings → Ownership verification). It should be — we're preserving those TXT records. If it's verified by HTML file on Foxspin, you'll need to re-verify via DNS after cutover.

**Foxspin URL audit:**

1. List every page on the current Foxspin site and its URL (e.g., `/about`, `/contact`, `/classes`)
2. Compare to the new site's URLs
3. For any old Foxspin URL that doesn't exist on the new site, you'll need a 301 redirect in `next.config.ts` — otherwise Google serves 404s for those pages and drops them from the index. **Every indexed URL that returns 404 hurts SEO.**

Example: if Foxspin had `/classes` but your new site uses `/programs`:
```ts
// next.config.ts → redirects()
{ source: "/classes", destination: "/programs", permanent: true },
```

Save this URL mapping — you'll need it in Phase 2B.

### 0B — Check for third-party citations

**Why:** Local SEO depends on consistent NAP across directories. If third-party sites link to the old Foxspin URL, those are still fine (same domain). But if any link to a Foxspin subdomain or a different URL, that hurts.

- [ ] Search Google for `"Master Cho" taekwondo lynnwood` — check Yelp, Yellow Pages, Bing Places for consistent NAP
- [ ] Check if any directory lists a URL other than `masterchostaekwondo.com` — if so, update it post-cutover
- [ ] Check `https://www.yelp.com/biz/master-chos-black-belt-academy-lynnwood` (or similar) — verify website link

**You should not start Phase 1 until** you've gotten the DNS export from Foxspin per `GO-LIVE.md` Phase 2.

---

## Phase 1 — Provision external services (no impact on live site)

All steps here are additive — they create new accounts/keys but don't change anything anyone can see. Safe to do over multiple days.

### 1A — Resend (transactional email)

**Why:** The contact form sends notifications via Resend. Right now `RESEND_FROM_EMAIL` defaults to `onboarding@resend.dev` (Resend's test sender). For production you need to send from your own domain so emails don't get marked spam.

1. Go to `https://resend.com` → sign up / log in
2. **Domains** in the left sidebar → **Add Domain**
3. Enter: `masterchostaekwondo.com`
4. Resend gives you DNS records — **save these for Phase 3**:
   - `MX` record (priority 10) → `feedback-smtp.us-east-1.amazonses.com`
   - `TXT` record (SPF) → `v=spf1 include:amazonses.com ~all`
   - 3× `CNAME` records (DKIM) → `resend._domainkey.<domain>`, `resend2._domainkey...`, etc.
5. **API Keys** → **Create API Key** → name it `production` → **save the key** (`re_...`) — you only see it once
6. Don't click "Verify" yet — DNS doesn't have these records.

### 1B — Upstash Redis (rate limiting)

**Why:** The contact form has rate limiting that activates only when Upstash credentials are present. Without it, anyone can spam the form and burn your Resend quota.

1. Go to `https://console.upstash.com` → sign up / log in
2. **Create Database** → name: `masterchotkd-prod` → region: `us-west-1` (closest to Vercel SF region)
3. Click on the new database → scroll to **REST API** section
4. Copy two values:
   - `UPSTASH_REDIS_REST_URL` (looks like `https://....upstash.io`)
   - `UPSTASH_REDIS_REST_TOKEN` (long string)

### 1C — Clerk Production instance

**Why:** Current Clerk is in Development mode (uses `*.clerk.accounts.dev` subdomains, free tier with limits). Production mode runs on your own domain.

1. `https://dashboard.clerk.com` → top-left dropdown → **Create application**
2. Name: `Master Cho's Taekwondo (Production)`
3. Sign-in options: enable **Email** + **Facebook** (match Dev)
4. After creation, top-right corner → switch to **Production**
5. **Domains** in sidebar → **Add domain** → `masterchostaekwondo.com`
6. Clerk gives you DNS records — **save these for Phase 3**:
   - `CNAME`: `clerk` → `frontend-api.clerk.services`
   - `CNAME`: `accounts` → `accounts.clerk.services`
   - `CNAME`: `clkmail` → `mail.<unique-id>.clerk.services`
   - 2× `CNAME`: `clk._domainkey` and `clk2._domainkey` → `<dkim-host>.clerk.services`
7. Don't verify yet.
8. Configure to match Dev:
   - **User & Authentication → Email, Phone, Username** → match Dev (probably Email required only)
   - **Social Connections → Facebook** → toggle on, paste same Facebook App ID + Secret
   - **Paths**: sign-in `/sign-in`, sign-up `/sign-up`, after sign-in/up `/members`
9. **Facebook Developer Console** (separate site: `developers.facebook.com`):
   - Your App → **Facebook Login → Settings → Valid OAuth Redirect URIs**
   - Add the new Production callback URL Clerk shows (something like `https://clerk.masterchostaekwondo.com/v1/oauth_callback`)
   - Switch app to **Live mode** (top-right toggle) if not already
10. **API Keys** in Clerk sidebar → copy:
    - `pk_live_...` (Publishable Key)
    - `sk_live_...` (Secret Key) — treat like a password

### 1D — Vercel domain (without DNS pointing to it yet)

**Why:** Vercel needs to know about your domain before it can issue SSL certs. Adding the domain *before* DNS cutover means SSL is ready when you flip DNS.

1. Vercel dashboard → your project → **Settings → Domains**
2. **Add Domain** → `masterchostaekwondo.com` → click **Add**
3. Vercel will show "Invalid configuration" — that's expected, DNS still points to Foxspin
4. **Add Domain** again → `www.masterchostaekwondo.com` → choose "Redirect to `masterchostaekwondo.com`"
5. Vercel will show DNS records you'd need to add. **Save these for Phase 3:**
   - `A` record: `@` → `76.76.21.21` (Vercel's anycast IP — current value, double-check what Vercel shows you)
   - `CNAME`: `www` → `cname.vercel-dns.com`

### Phase 1 Rollback

Nothing to roll back — none of this is wired in yet. If you change your mind, just delete the Resend / Upstash / Clerk Production accounts; nothing on the live site is affected.

---

## Phase 2 — Wire production keys into Vercel (no user-visible impact)

⚠️ **From here on, deploys will use these new values** — but since DNS still points to Foxspin, Vercel deploys are only visible at `*.vercel.app` URLs. Real visitors see Foxspin until Phase 4.

### 2A — Add all production env vars to Vercel

For each variable below: Vercel dashboard → **Settings → Environment Variables → Add New** → set scope to **Production** (uncheck Preview/Development).

| Variable | Value | Source |
|---|---|---|
| `RESEND_API_KEY` | `re_...` | Phase 1A step 5 |
| `RESEND_FROM_EMAIL` | `noreply@masterchostaekwondo.com` | Phase 0 decision |
| `NOTIFY_EMAIL` | (real business email) | Phase 0 decision |
| `UPSTASH_REDIS_REST_URL` | `https://...upstash.io` | Phase 1B step 4 |
| `UPSTASH_REDIS_REST_TOKEN` | (long token) | Phase 1B step 4 |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_live_...` | Phase 1C step 10 |
| `CLERK_SECRET_KEY` | `sk_live_...` | Phase 1C step 10 |
| `NEXT_PUBLIC_SITE_URL` | `https://masterchostaekwondo.com` | n/a |

For `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`: also **edit the existing Dev values** to limit scope to **Preview + Development** only (uncheck Production).

End state:

| Variable | Development | Preview | Production |
|---|---|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_...` | `pk_test_...` | `pk_live_...` |
| `CLERK_SECRET_KEY` | `sk_test_...` | `sk_test_...` | `sk_live_...` |

⚠️ **Don't trigger a deploy yet** — Phase 2B ships with the same deploy.

### 2B — Code change: pin CSP origins + remove `NOTIFY_EMAIL` default

Two small code changes on a feature branch (e.g., `prelaunch-csp-tighten`):

**File: `next.config.ts:3-7`** — replace:

```ts
const clerkCspOrigins = [
  "https://*.clerk.accounts.dev",
  "https://*.clerk.dev",
  "https://*.clerk.services",
];
```

With:

```ts
const clerkCspOrigins = [
  "https://clerk.masterchostaekwondo.com",
  "https://accounts.masterchostaekwondo.com",
  "https://clerk-telemetry.com",
];
```

**File: `src/lib/server-env.ts:7`** — find:

```ts
NOTIFY_EMAIL: z.string().email().default("tkdkscho@gmail.com"),
```

Replace with:

```ts
NOTIFY_EMAIL: z.string().email(),
```

This makes the variable required — boot fails fast in Production if you forgot to set it (better than silently emailing the personal Gmail).

**File: `next.config.ts` → `redirects()`** — add 301 redirects for any Foxspin URLs that don't match the new site (from your Phase 0A audit):

```ts
// Example — add one entry per old Foxspin URL that changed:
{ source: "/classes", destination: "/programs", permanent: true },
{ source: "/class-schedule", destination: "/schedule", permanent: true },
// Only add redirects for URLs that actually existed on Foxspin.
// Don't guess — use the URL list you saved in Phase 0A.
```

**Why this is critical:** Google has already indexed the old Foxspin URLs. When DNS flips to you, Google will crawl those old paths on *your* server. If they 404, Google drops those pages from the index within days — you lose whatever ranking those pages had. A 301 redirect tells Google "this page moved here permanently, transfer all ranking signals."

### 2C — Test on Vercel Preview before merging

1. Push the feature branch to GitHub
2. Vercel auto-deploys a Preview at `https://<branch>-sgk94.vercel.app`
3. Open the Preview URL — public pages should load fine
4. **DevTools → Console** → confirm zero CSP violations on public pages
5. Try `/sign-in` — Clerk will fail to load (Preview uses Dev keys but Production CSP) — *expected*. Page itself shouldn't crash.
6. Try contact form — should send (uses Production Resend keys via Production scope)
   - ⚠️ Actually: Preview uses Preview/Development env scope by default → won't have `RESEND_API_KEY`. Skip this test until production deploy.

If public pages render with no CSP errors → safe to merge.

### 2D — Merge to main

1. Merge PR to `main`
2. Vercel auto-deploys to Production (still visible only at `*.vercel.app` URL of the production deployment, since DNS isn't pointing here yet)
3. Wait for deploy ✅

### Phase 2 Rollback

If anything breaks: Vercel dashboard → **Deployments** → find previous good deploy → **Promote to Production**. Env vars revert is automatic. Code revert: `git revert <merge-commit>` and push.

---

## Phase 3 — Stage all DNS records at the new provider (no impact on live site)

⚠️ **Important:** Don't change nameservers or A records yet. This phase only *prepares* the new DNS so the cutover in Phase 4 is instant.

**Where you do this depends on your Phase 0 decision:**
- If **Vercel DNS**: Vercel dashboard → **Settings → Domains → masterchostaekwondo.com → DNS Records** section
- If **Cloudflare**: Cloudflare dashboard → your domain → **DNS → Records**
- If something else: same idea, find the DNS records UI

### 3A — Stage all the records

Add **every record below** to the new DNS provider. Don't switch nameservers yet.

**Vercel A/CNAME (from Phase 1D):**
| Type | Name | Value | TTL |
|---|---|---|---|
| A | `@` | `76.76.21.21` | 300 |
| CNAME | `www` | `cname.vercel-dns.com` | 300 |

**Google Workspace MX (preserve from current Foxspin DNS — see `GO-LIVE.md`):**
| Type | Name | Priority | Value |
|---|---|---|---|
| MX | `@` | 1 | `aspmx.l.google.com` |
| MX | `@` | 5 | `alt1.aspmx.l.google.com` |
| MX | `@` | 5 | `alt2.aspmx.l.google.com` |
| MX | `@` | 10 | `alt3.aspmx.l.google.com` |
| MX | `@` | 10 | `alt4.aspmx.l.google.com` |

**Google verification TXT (preserve):**
```
google-site-verification=88zBDQ9BPN_83ITavC8-Yvu9QI-PVokGg3Vkcu_GxJ8
google-site-verification=rvIpjicemCbIMNiNm8rXYxghLwzSTQrvjAiW_YqHaOY
```

**Resend (from Phase 1A step 4):**
| Type | Name | Value |
|---|---|---|
| MX | `send` (or what Resend says) | `feedback-smtp.us-east-1.amazonses.com` (priority 10) |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` |
| CNAME | `resend._domainkey` | (Resend's value) |
| CNAME | `resend2._domainkey` | (Resend's value) |
| CNAME | `resend3._domainkey` | (Resend's value) |

**Clerk (from Phase 1C step 6):**
| Type | Name | Value |
|---|---|---|
| CNAME | `clerk` | `frontend-api.clerk.services` |
| CNAME | `accounts` | `accounts.clerk.services` |
| CNAME | `clkmail` | `mail.<id>.clerk.services` |
| CNAME | `clk._domainkey` | (Clerk's value) |
| CNAME | `clk2._domainkey` | (Clerk's value) |

**Lower TTL on apex A record** to 300 seconds (5 min) so future changes propagate fast.

### Phase 3 Rollback

Records exist at the new provider but aren't authoritative — current visitors still hit Foxspin. To roll back, just delete what you added. Zero user impact.

---

## Phase 4 — DNS cutover (⚠️ user-visible — site is now in transition)

This is the moment of truth. You're switching authority for `masterchostaekwondo.com` from Foxspin's DNS to your new DNS.

⚠️ **Pick a low-traffic time.** Plan for 1–4 hours of being on standby.
⚠️ **DNS propagation is gradual** — some users will see new site, some old, for up to 48 hours. (Most see the new one within an hour due to the lowered TTL.)

### 4A — Switch nameservers (the actual cutover)

You have to do this at the **registrar**, which is Wild West Domains via Foxspin.

1. Get the new DNS provider's nameservers:
   - **Vercel DNS** shows them in **Settings → Domains → masterchostaekwondo.com** (typically `ns1.vercel-dns.com` + `ns2.vercel-dns.com`)
   - **Cloudflare** shows them in your domain's overview page
2. Either:
   - Ask Foxspin to update the nameservers on the registrar (if they control the registrar account), OR
   - Log into the registrar account directly if you have access (faster, no Foxspin needed)
3. Replace the four current Register.com nameservers with your new ones.
4. Save.

### 4B — Verify Resend, Clerk, and Vercel can all see the records

Within ~10 minutes, the new nameservers should be live. Check:

```bash
dig masterchostaekwondo.com NS +short      # should show your new nameservers
dig masterchostaekwondo.com A +short       # should show 76.76.21.21
dig clerk.masterchostaekwondo.com CNAME +short
dig resend._domainkey.masterchostaekwondo.com CNAME +short
dig masterchostaekwondo.com MX +short      # should show all 5 Google entries
```

When CNAMEs resolve:

- **Vercel:** dashboard → Domains → both domains should show ✅ "Configuration valid" + SSL provisioned
- **Clerk:** dashboard → Domains → click **Verify** for each record → all 5 should turn green
- **Resend:** dashboard → Domains → click **Verify** → all records should turn green

### 4C — Smoke test the live site

Open `https://masterchostaekwondo.com` in an incognito window:

- [ ] Homepage loads
- [ ] HTTPS works (no cert errors)
- [ ] `https://www.masterchostaekwondo.com` redirects to apex
- [ ] All program pages load (`/programs/tiny-tigers`, etc.)
- [ ] `/schedule` loads
- [ ] `/contact` loads — submit a real test message → confirm it arrives at `NOTIFY_EMAIL`
- [ ] Reply to that test email → confirm it goes back to the test prospect (Reply-To header)
- [ ] `/sign-in` — sign up with a test account → confirm sign-in works → lands on `/members`
- [ ] `/members` content loads (auth working)
- [ ] Facebook social login works
- [ ] PDF downloads work (`/student-resources/tiny-tiger-handbook` etc. — must be signed in)
- [ ] `/students/*` redirects to `/members/*`
- [ ] Sitemap loads: `https://masterchostaekwondo.com/sitemap.xml`
- [ ] **Send/receive a test email** to `<your-name>@masterchostaekwondo.com` (or whatever your Google Workspace address is) — confirms MX records didn't break

### 4D — Browser console check

DevTools → Console on each page above:
- [ ] No red CSP violations
- [ ] No 404s for assets
- [ ] No "blocked by CORS" errors

### 4E — SEO & structured data verification

**JSON-LD (structured data):**

1. Open `https://search.google.com/test/rich-results`
2. Enter `https://masterchostaekwondo.com`
3. Confirm it detects your `LocalBusiness` structured data with no errors
4. Check that the `image`, `telephone`, `address` fields all look correct

**Sitemap:**

1. Open `https://masterchostaekwondo.com/sitemap.xml` — should list all public pages
2. Confirm every URL uses `https://masterchostaekwondo.com/...` (not `localhost`, not `*.vercel.app`)
3. Open `https://masterchostaekwondo.com/robots.txt` — confirm it references the correct sitemap URL and blocks the right paths (`/students/`, `/api/`, `/student-resources/`, `/preview/`)

**301 redirects:**

Test every redirect you added in Phase 2B:
```bash
curl -sI https://masterchostaekwondo.com/classes | head -5    # should show 301 → /programs (or whatever)
```

If any old Foxspin URL returns 404 instead of 301, add the redirect immediately and push.

### 4F — Update Google Business Profile

⚠️ **Do this within 24 hours of DNS cutover** — don't let GBP point to a dead Foxspin site.

1. `https://business.google.com` → edit the listing
2. **Website URL** → set to `https://masterchostaekwondo.com` (if not already — check Phase 0A notes)
3. Verify NAP is consistent:
   - **Business name:** must match the `<title>`, JSON-LD `name`, and what's on the new site header/footer exactly
   - **Phone:** `(425) 742-4282` — must match the `tel:` link on the new site
   - **Address:** `5031 168th ST SW STE 100, Lynnwood, WA 98037` — must match the contact page and JSON-LD exactly
4. **Business hours** — confirm they match what's on the new site (if you display hours)
5. Add new photos from the new site if the old photos were Foxspin-hosted (GBP images hosted elsewhere don't break, but fresh photos help)
6. Save and allow 1–3 days for Google to re-crawl

### 4G — Resubmit to Google Search Console

1. `https://search.google.com/search-console` → select property `masterchostaekwondo.com`
2. **Sitemaps** → if old sitemap URL is listed, remove it → add `https://masterchostaekwondo.com/sitemap.xml`
3. **URL Inspection** → paste `https://masterchostaekwondo.com/` → click **Request Indexing**
4. Do the same for 3–5 of your most important pages (homepage, `/programs`, `/schedule`, `/contact`, `/special-offer`)
5. Over the next 2–4 weeks, check **Coverage/Pages** section for any increase in "Not found (404)" errors — those are old Foxspin URLs you missed. Add 301 redirects for each.

### Phase 4 Rollback

If catastrophic problems:

1. **Fastest rollback:** at the registrar, switch nameservers back to the four Register.com nameservers. Site returns to Foxspin within ~10 min for most visitors (some will be cached for longer).
2. **Partial rollback:** if only one feature (e.g., contact form) is broken — leave DNS alone, fix the issue in code, push a hotfix. Vercel deploys auto-take-effect.

---

## Phase 5 — Stabilize, monitor, and decommission

The risky parts are over. Now you wait, monitor, and clean up.

### 5A — First 48 hours

- [ ] Refresh `/contact` page hourly first day → submit a test message → confirm rate-limit kicks in if you submit 5+ in a row (4-per-hour limit by default)
- [ ] Monitor Vercel **Logs** for any errors (Vercel dashboard → Logs)
- [ ] Monitor Clerk dashboard for failed sign-ins
- [ ] Confirm Google Workspace email still flows (send + receive)
- [ ] Check Google Search Console — site should still be verified (TXT records preserved)
- [ ] Search Google for `site:masterchostaekwondo.com` — confirm pages are being indexed with new content
- [ ] Search Google for `"Master Cho" taekwondo lynnwood` — confirm GBP card shows, website link works, and the listing hasn't dropped
- [ ] Check GBP Insights (in Google Business dashboard) — if impressions drop >50% week-over-week, investigate NAP consistency or website URL mismatch
- [ ] Monitor Search Console **Coverage/Pages** for any spike in 404 errors — each one is an old Foxspin URL that needs a 301 redirect added

### 5B — After 48–72 hours of stability

- [ ] Get written confirmation from Foxspin re: cancellation date / what happens to old hosting
- [ ] Cancel Foxspin hosting subscription
- [ ] **Don't cancel domain registration** — that's separate. The domain itself is still at Wild West Domains until you transfer it (Phase 5C).
- [ ] Document the win: $600/mo → ~$25/mo

### 5C — Domain registrar transfer (optional, after 1+ week stable)

This moves billing/control of the domain from Wild West (via Foxspin) to a registrar of your choice (recommend Cloudflare Registrar — at-cost pricing, no markup).

1. Pick new registrar (Cloudflare, Namecheap, Porkbun)
2. At Wild West / Foxspin: request **domain unlock** + **EPP/auth code**
3. At new registrar: initiate transfer, paste auth code
4. Pay the transfer fee (usually 1 year of registration)
5. Wait 5–7 days for transfer to complete
6. After transfer: confirm DNS still points where you set it (transfer doesn't change DNS, but verify)

### 5D — Tighten / clean up

- [ ] Delete `CLERK-CUTOVER.md` (now redundant with this runbook)
- [ ] Delete this file (`LAUNCH-RUNBOOK.md`) once everything is stable — it's a one-time guide
- [ ] Update CLAUDE.md:
  - Clerk: "Development mode" → "Production mode"
  - "To Get Fully Running": remove items 1, 2, 9, 10 (now done)
- [ ] Optional: delete the Clerk Development instance from Clerk dashboard (after 2+ weeks stable)
- [ ] Optional: tighten CSP further — replace `'unsafe-inline'` with nonces (currently allowed because Next.js needs it; nonces require code work)

---

## Worst-case scenarios & mitigations

| Scenario | Mitigation |
|---|---|
| DNS propagation breaks email mid-cutover | Google MX records were staged in Phase 3 — should never break. If it does, double-check MX entries copied verbatim from `GO-LIVE.md` |
| Resend domain doesn't verify | Email sends still work via Resend's `onboarding@resend.dev` if you don't change `RESEND_FROM_EMAIL` yet — verify Resend domain *first*, then flip the env var |
| Clerk Production sign-ins fail | Vercel Promote previous deployment back → Clerk Dev keys take over → users can sign in via Dev clerk while you debug |
| Google Search Console loses verification | TXT records are preserved in Phase 3. If still lost: re-add via Search Console UI |
| Vercel SSL cert doesn't provision | Usually auto-provisions within 5 min after DNS resolves. If it stays "Pending" for 30+ min: Vercel dashboard → Domains → Refresh button. If still stuck: Vercel support ticket |
| Contact form spam after launch | Upstash rate limiting is active (4/hr per IP). For more abuse: add Cloudflare Turnstile — see review history in repo |
| **GBP ranking drops after cutover** | Most common cause: NAP inconsistency between GBP listing and new site, or GBP website URL still pointing to old Foxspin. Fix: update GBP listing (Phase 4F), wait 3–7 days for recovery. Google local rankings are resilient if the domain stays the same. |
| **Old Foxspin URLs return 404** | Google drops those pages from search results within 1–2 weeks. Fix: add 301 redirects in `next.config.ts` for every old URL that doesn't exist on the new site. Use Search Console's "Pages not found" report to find them. |
| **Search traffic drops after cutover** | Normal during first 1–2 weeks — Google re-crawls and re-evaluates. If it persists past 3 weeks: check for missing 301 redirects (404 report in Search Console), verify structured data (JSON-LD), verify sitemap is submitted, check that robots.txt isn't blocking important pages. |
| **Google indexes both old and new site** | Can happen during DNS propagation when some Google bots still hit Foxspin cache. Resolves naturally within 48–72 hrs. Don't do anything — just wait. |
| **Reviews disappear from GBP** | Reviews are tied to the GBP listing, not the website. They won't disappear from a website change. If they do: the listing may have been duplicated — merge via Google Business support. |

---

## Quick reference: what each service needs from DNS

| Service | DNS records required |
|---|---|
| Vercel hosting | A `@` → `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com` |
| Google Workspace email | MX × 5 (priorities 1, 5, 5, 10, 10) |
| Google Search Console | TXT × 2 (existing verifications) |
| Resend (email sending) | MX `send`, TXT `send` SPF, CNAME × 3 DKIM |
| Clerk (auth) | CNAME × 5 (`clerk`, `accounts`, `clkmail`, `clk._domainkey`, `clk2._domainkey`) |

---

## Phase summary

| Phase | What | User impact | Reversible? |
|---|---|---|---|
| 0 | Decisions | None | ✅ |
| 1 | Provision external services | None | ✅ |
| 2 | Vercel env + CSP/code change | None (Vercel deploys not authoritative yet) | ✅ via Promote previous |
| 3 | Stage DNS at new provider | None | ✅ |
| 4 | Switch nameservers | ⚠️ Live cutover | ⚠️ ~10 min (revert nameservers) |
| 5 | Stabilize + decommission | None | n/a |
