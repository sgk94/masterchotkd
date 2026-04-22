# Cutover Checklist — Master Cho's Taekwondo

Everything that must happen before, during, and after switching `masterchostaekwondo.com` from Foxspin to Vercel.

**Do these in order. Don't skip ahead.**

---

## Step 1 — Audit the current Foxspin site

- [x] Visit every page on the current `masterchostaekwondo.com`
- [x] List every URL that exists
- [x] Screenshot each page → saved to `docs/old-site-screenshots/` (15 pages)
- [x] Map old URLs to new site URLs — 14 redirects added to `next.config.ts`:
  - `/home` → `/`
  - `/about-us` → `/about`
  - `/instructors` → `/about`
  - `/belt-ranks` → `/members/curriculum/color-belt`
  - `/tiny-tigers` → `/programs/tiny-tigers`
  - `/black-belt-club` → `/programs/black-belt-club`
  - `/leadership-club` → `/programs/leadership-club`
  - `/demonstration-team` → `/programs/leadership-club`
  - `/competition-team` → `/programs/competition-team`
  - `/student-page` → `/members`
  - `/contact-us` → `/contact`
  - `/event` → `/`
  - `/videos` → `/members/curriculum/color-belt`
  - `/privacy-policy` → `/`
  - `/cart` → `/special-offer`

## Step 2 — Google Search Console

- [ ] Check if you have access at https://search.google.com/search-console
- [ ] If yes: screenshot top pages, indexed page count, top search queries (last 28 days)
- [ ] If no: skip — we'll verify via DNS TXT after cutover

## Step 3 — Google Business Profile

- [x] Confirm business name matches site → "Master Cho's Taekwondo"
- [x] Confirm address matches → 5031 168th Street Southwest STE 100, Lynnwood, WA 98037
- [x] Confirm phone matches → (425) 742-4282
- [x] Confirm hours match → Mon-Fri 3-8 PM, Sat 9-11 AM, Sun Closed
- [x] Confirm social links match → Facebook + Instagram (trailing slash fixed)
- [ ] Note current website URL for post-cutover update (currently `https://www.masterchostaekwondo.com/`)

## Step 4 — Provision external services

### 4A — Resend (sending domain)
- [ ] Log into https://resend.com
- [ ] Domains → Add Domain → `masterchostaekwondo.com`
- [ ] Save the DNS records Resend gives you:
  - [ ] MX record (subdomain + value)
  - [ ] TXT record (SPF)
  - [ ] 3 CNAME records (DKIM)
- [ ] Don't click Verify yet

### 4B — Upstash Redis (rate limiting)
- [ ] Sign up at https://console.upstash.com
- [ ] Create Database → name: `masterchotkd-prod` → region: `us-west-1`
- [ ] Copy `UPSTASH_REDIS_REST_URL`
- [ ] Copy `UPSTASH_REDIS_REST_TOKEN`

### 4C — Clerk Production instance
- [ ] Clerk Dashboard → Create new application → "Master Cho's Taekwondo (Production)"
- [ ] Enable Email + Facebook sign-in
- [ ] Switch to Production mode
- [ ] Domains → Add `masterchostaekwondo.com` → save the 5 CNAME records Clerk gives you
- [ ] Match settings to Dev instance (email required, sign-in/up paths, after-sign-in → `/members`)
- [ ] Facebook Developer Console → add new Production callback URL from Clerk
- [ ] Restrictions → Sign-up mode = Restricted (invitation-only)
- [ ] Users → your account → Metadata → Public → `{ "role": "admin" }`
- [ ] API Keys → copy `pk_live_...` and `sk_live_...`

## Step 5 — Set Vercel production env vars

Vercel dashboard → Settings → Environment Variables → scope each to **Production only**:

- [ ] `RESEND_API_KEY` → your existing `re_...` key
- [ ] `RESEND_FROM_EMAIL` → `noreply@masterchostaekwondo.com`
- [ ] `NOTIFY_EMAIL` → (Master Cho's notification email — confirm which one)
- [ ] `UPSTASH_REDIS_REST_URL` → from Step 4B
- [ ] `UPSTASH_REDIS_REST_TOKEN` → from Step 4B
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` → `pk_live_...` from Step 4C
- [ ] `CLERK_SECRET_KEY` → `sk_live_...` from Step 4C
- [ ] `NEXT_PUBLIC_SITE_URL` → `https://masterchostaekwondo.com`
- [ ] Edit existing Dev Clerk keys → scope to Preview + Development only (uncheck Production)

## Step 6 — Code changes (Claude does this)

- [ ] Pin CSP Clerk origins from wildcards to exact production domains (need Clerk Production domain first)
- [x] Add 301 redirects for old Foxspin URLs — 14 redirects in `next.config.ts`
- [ ] Push to main, wait for Vercel deploy

## Step 7 — Stage DNS records in Vercel

After nameservers are switched, Vercel DNS will be manageable. Add these records:

### Google verification (preserve)
- [ ] TXT `@` → `google-site-verification=88zBDQ9BPN_83ITavC8-Yvu9QI-PVokGg3Vkcu_GxJ8`
- [ ] TXT `@` → `google-site-verification=rvIpjicemCbIMNiNm8rXYxghLwzSTQrvjAiW_YqHaOY`

### Resend (from Step 4A)
- [ ] MX record (subdomain from Resend)
- [ ] TXT record (SPF from Resend)
- [ ] CNAME 1 (DKIM from Resend)
- [ ] CNAME 2 (DKIM from Resend)
- [ ] CNAME 3 (DKIM from Resend)

### Clerk (from Step 4C)
- [ ] CNAME `clerk` → `frontend-api.clerk.services`
- [ ] CNAME `accounts` → `accounts.clerk.services`
- [ ] CNAME `clkmail` → `mail.<id>.clerk.services`
- [ ] CNAME `clk._domainkey` → (Clerk's value)
- [ ] CNAME `clk2._domainkey` → (Clerk's value)

## Step 8 — Switch nameservers (THE FLIP)

⚠️ **This makes the new site live. Do during a low-traffic window.**

- [ ] Go to GoDaddy → Domain Portfolio → `masterchostaekwondo.com` → DNS tab → Nameservers
- [ ] Change from Register.com nameservers to:
  - `ns1.vercel-dns.com`
  - `ns2.vercel-dns.com`
- [ ] Save
- [ ] Wait ~10-60 minutes for propagation

## Step 9 — Post-cutover verification

### Immediate (within 1 hour)
- [ ] `masterchostaekwondo.com` loads (HTTPS, no cert errors)
- [ ] `www.masterchostaekwondo.com` redirects to apex
- [ ] Homepage, all program pages, schedule, contact, special-offer load
- [ ] Contact form → submit test → confirm email arrives at NOTIFY_EMAIL
- [ ] Reply to test email → confirm Reply-To goes to the submitter
- [ ] `/sign-in` → test sign-in works
- [ ] `/members` → content loads (auth working)
- [ ] Facebook social login works
- [ ] PDF downloads work (must be signed in)
- [ ] `/students/*` redirects to `/members/*`
- [ ] Old Foxspin URLs return 301 redirects (not 404)
- [ ] Sitemap loads: `masterchostaekwondo.com/sitemap.xml`
- [ ] DevTools Console → no CSP violations, no 404s

### Within 24 hours
- [ ] Update GBP website URL → `https://masterchostaekwondo.com` (no www)
- [ ] Verify Resend domain (click Verify in Resend dashboard — DNS records should resolve now)
- [ ] Verify Clerk domain (click Verify in Clerk dashboard)
- [ ] Google Search Console → add sitemap if you have access
- [ ] Submit 5 key pages for indexing (homepage, /programs, /schedule, /contact, /special-offer)

### 48-72 hours stable
- [ ] Monitor Vercel Logs for errors
- [ ] Monitor Clerk dashboard for failed sign-ins
- [ ] Search Google for `site:masterchostaekwondo.com` — confirm pages indexing
- [ ] Check Search Console for 404 spikes (old URLs we missed)
- [ ] Test rate limiting — submit contact form 5+ times rapidly

### After stability confirmed
- [ ] Get written confirmation from Foxspin re: cancellation
- [ ] Cancel Foxspin hosting subscription
- [ ] Do NOT cancel domain registration (that's separate)
- [ ] Optional: transfer domain registrar to Cloudflare/Namecheap (1+ week later)

---

## Quick reference

| Nameservers (Vercel) | `ns1.vercel-dns.com`, `ns2.vercel-dns.com` |
|---|---|
| Vercel A record | `@ → 216.198.79.1` |
| Current Foxspin IP | `34.202.63.170` |
| Registrar | Wild West Domains (via GoDaddy DCC) |
| Domain expires | March 8, 2027 |
