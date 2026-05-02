# Go-Live Checklist — Master Cho's Taekwondo

Living document for migrating off Foxspin and launching `masterchostaekwondo.com` on Vercel.

---

## Goal

- Own and control the website, domain, DNS, hosting, and connected services ourselves
- Keep the domain, email, and Google verification intact
- Avoid downtime during the switch
- Target: ~$25/mo hosting (down from $600/mo)

---

## Current Setup Snapshot

| Item | Value |
|------|-------|
| Domain | `masterchostaekwondo.com` |
| www | `www.masterchostaekwondo.com` → redirects to apex |
| Registrar | Wild West Domains, LLC |
| Reseller | Foxspin LLC |
| Created | March 8, 2023 |
| Expires | March 8, 2027 |
| Current host IP | `34.202.63.170` |

**Nameservers:**
- `dns219.c.register.com`
- `dns176.d.register.com`
- `dns136.a.register.com`
- `dns229.b.register.com`

**MX Records (Google — copy these exactly when setting up new DNS):**
| Priority | Value |
|----------|-------|
| 1 | `aspmx.l.google.com` |
| 5 | `alt1.aspmx.l.google.com` |
| 5 | `alt2.aspmx.l.google.com` |
| 10 | `alt3.aspmx.l.google.com` |
| 10 | `alt4.aspmx.l.google.com` |

**TXT Records (copy these exactly when setting up new DNS):**
```
google-site-verification=88zBDQ9BPN_83ITavC8-Yvu9QI-PVokGg3Vkcu_GxJ8
```
```
google-site-verification=rvIpjicemCbIMNiNm8rXYxghLwzSTQrvjAiW_YqHaOY
```

**A / CNAME Records (current — will be replaced with Vercel records):**
| Type | Name | Value |
|------|------|-------|
| A | `@` | `34.202.63.170` |
| CNAME | `www` | `masterchostaekwondo.com` |

**Domain Locks:**
- `clientTransferProhibited`
- `clientUpdateProhibited`
- `clientRenewProhibited`
- `clientDeleteProhibited`

---

## Phase 1 — Before Contacting Foxspin

- [x] Confirm the goal:
  - [x] Own and control the website — built and deployed on Vercel
  - [x] Own and control the domain — our GoDaddy account, can change nameservers directly
  - [x] Own and control DNS — moving to Vercel DNS (nameserver change available via GoDaddy)
  - [x] Own and control hosting — Vercel, we control it
  - [x] Connected services we control: Resend (email sending), Clerk (auth), Google Search Console (verified), Google Business Profile (access confirmed)
  - [x] SparkMembership/Pitbull payments — staying separate, not part of this migration
  - [x] Domain email (@masterchostaekwondo.com) — preserve existing Google MX records during cutover; this is separate from contact-form notifications
- [x] Decide long-term providers:
  - [x] Registrar — Wild West Domains / GoDaddy (staying for now, optional transfer to Cloudflare later)
  - [x] DNS — Vercel DNS
  - [x] Hosting — Vercel
  - [x] Form handling — Resend
  - [x] Analytics / verification — Google Search Console (verified)
  - [x] Email DNS — preserve existing Google MX records for domain-email receiving; contact-form notifications still go to `tkdkscho@gmail.com`
- [x] Confirm replacement website is ready to launch — code-complete, 272 tests passing
- [x] Save copies of all current content and assets:
  - [x] Page screenshots — saved to `docs/old-site-screenshots/` (15 pages)
  - [x] Logo — new Canva PNG export (`logo.png`)
  - [x] Privacy policy — new page created at `/privacy-policy`
  - [x] Business contact details — verified against GBP
  - [x] Social links — Facebook + Instagram confirmed, matching GBP

---

## Phase 2 — Questions For Foxspin

- [x] Sent Foxspin question packet — awaiting response
- [x] Who controls the domain registration account? — **Our account** (GoDaddy/Wild West Domains, we have direct login)
- [x] Who controls DNS? — Register.com nameservers, but we can change nameservers ourselves via GoDaddy Nameservers tab
- [x] Full DNS record export — captured in Current Setup Snapshot above (A, CNAME, MX, TXT)
- [ ] Will canceling service shut off hosting immediately? — **asked Foxspin, awaiting response**
- [x] SSL certificates — not relevant, Vercel auto-provisions SSL after nameserver switch
- [ ] Request export of any old platform data — **asked Foxspin, awaiting response:**
  - [ ] Lead form submissions / contact history
  - [ ] Any other data tied to our account
- [x] Old platform features — cart goes to SparkPages (separate from Foxspin); SparkMembership staying as-is
- [ ] Cancellation terms — **asked Foxspin, awaiting response:** notice period, contract end date
- [x] Domain transfer — not needed now (domain expires March 2027, optional transfer to Cloudflare later)

---

## Phase 3 — What Must Be Preserved

- [x] Google MX records — preserve in Vercel DNS; this only affects receiving mail for `@masterchostaekwondo.com`, not contact-form delivery to `tkdkscho@gmail.com`
- [x] Google TXT verification records — preserving in Vercel DNS (CUTOVER-CHECKLIST step 7)
- [x] `www` → apex redirect — configured in Vercel (308 permanent redirect)
- [x] Final business information on new site:
  - [x] Phone: 425-742-4282 (verified against GBP)
  - [x] Address: 5031 168th Street Southwest STE 100, Lynnwood, WA 98037 (verified against GBP)
  - [x] Email: `NOTIFY_EMAIL` = `tkdkscho@gmail.com`
  - [x] Social links: Facebook + Instagram (verified against GBP)
  - [x] Pricing / offer copy: $49 / 2 weeks trial

---

## Phase 4 — Technical Transition

### Provider Decisions
- [x] Keep current registrar (Wild West / GoDaddy) — optional transfer to Cloudflare later
- [x] DNS managed by: Vercel DNS

### Vercel Domain Setup
- [x] Add `masterchostaekwondo.com` as custom domain in Vercel project (Production)
- [x] Add `www.masterchostaekwondo.com` as redirect domain (308 → apex)
- [ ] Verify SSL is provisioned for both hostnames (happens automatically after nameserver switch)

### Resend / Contact Form Cutover
- [ ] Add `masterchostaekwondo.com` as sending domain in Resend (get SPF + DKIM DNS records)
- [ ] Add Resend DNS records to Vercel DNS (after nameserver switch)
- [ ] Verify domain in Resend dashboard
- [x] Set `RESEND_API_KEY` in Vercel Production env
- [x] Set `RESEND_FROM_EMAIL` = `noreply@masterchostaekwondo.com` in Vercel Production env
- [x] Set `NOTIFY_EMAIL` = `tkdkscho@gmail.com` in Vercel Production env
- [ ] Send test contact form submission → confirm email arrives + Reply-To works
- [x] Provision Upstash Redis → set `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` in Vercel Production env

### Clerk Production
- [ ] Create Clerk Production instance
- [x] Disable Facebook social login for launch (email-only auth)
- [x] Set sign-up mode = Restricted (invitation-only)
- [x] Set first admin (`publicMetadata.role = "admin"`)
- [x] Copy `pk_live_` + `sk_live_` keys → set in Vercel Production env
- [ ] Add Clerk DNS records to Vercel DNS (5 CNAMEs)
- [ ] Verify domain in Clerk dashboard
- [x] Pin CSP origins in code (Claude does this — needs production domain first)

### DNS Cutover
- [ ] Prepare paste-ready DNS packet (Vercel requires nameserver switch before Vercel DNS record management is enabled)
  - [x] Vercel apex record: `A @ → 216.198.79.1`
  - [x] Google TXT verification records
  - [x] Google MX records
  - [x] Resend DNS records
  - [x] Clerk DNS records
  - [x] Packet file created: `docs/DNS-CUTOVER-PACKET.md`
- [ ] Switch nameservers at GoDaddy: Register.com → `ns1.vercel-dns.com` + `ns2.vercel-dns.com`
- [ ] Enable/manage Vercel DNS after nameserver switch
- [ ] Immediately add paste-ready DNS records in Vercel DNS
- [ ] Wait for DNS propagation (~10-60 min)

### Post-Cutover Testing
- [ ] Homepage loads on `masterchostaekwondo.com`
- [ ] `www.masterchostaekwondo.com` redirects to apex
- [ ] HTTPS works (no cert errors)
- [ ] Desktop and mobile rendering
- [ ] All internal links work
- [ ] Contact form submits → email arrives at `tkdkscho@gmail.com`
- [ ] Old Foxspin URLs return 301 redirects (not 404)
- [ ] Redirects work (`/students/*` → `/members/*`)
- [ ] Members area auth works (Clerk sign-in)
- [ ] Email sign-in works (Facebook social login intentionally disabled for launch)
- [ ] PDF downloads work (must be signed in)
- [ ] All program detail pages load
- [ ] Schedule, reviews, contact, special-offer pages load
- [ ] Privacy policy page loads
- [ ] DevTools Console → no CSP violations, no 404s

### Services Verification
- [ ] Google Search Console still shows verified (TXT records preserved)
- [ ] Resend domain shows "Verified"
- [ ] Clerk domain shows verified
- [ ] Update GBP website URL → `https://masterchostaekwondo.com` (no www)

---

## Phase 5 — After The Switch

- [ ] Wait until new website is stable (recommend 48-72 hours minimum)
- [ ] Get written confirmation from Foxspin:
  - [ ] Final cancellation date
  - [ ] Whether hosting ends immediately
  - [ ] Whether domain registration stays active
  - [ ] Whether DNS remains active
  - [ ] Whether anything else will be disabled
- [ ] Transfer domain to new registrar (separate from DNS cutover — do after stable)
- [ ] Save permanent record of transition:
  - [ ] Registrar details
  - [ ] DNS export
  - [ ] Nameservers
  - [ ] Domain expiration (March 8, 2027)
  - [ ] Provider communications
  - [ ] Cancellation confirmation
  - [ ] Transfer/EPP code if issued

---

## New Site Pre-Launch Checklist

Items that need to be done on the Vercel-hosted site before go-live:

- [x] Create OG image (1200x630 JPEG) → `public/images/og-image.jpg`
- [x] Replace social link placeholders with actual Facebook/Instagram URLs
- [x] Replace Spark Member app download placeholders with real App Store / Google Play URLs
- [x] Add canonical URLs to all public pages
- [x] Enrich JSON-LD structured data (geo, sameAs, SportsActivityLocation)
- [x] Add local keywords to page meta descriptions
- [x] Fix heading hierarchy and semantic HTML issues
- [x] Patch Clerk CVE (middleware bypass GHSA-vqx2-fgx2-5wq9)
- [x] Fix contact route body-size validation (actual bytes, not Content-Length header)
- [ ] Switch Clerk from Development → Production mode
- [x] Pin Clerk CSP origins to exact production domains (replace wildcards)
- [x] Verify Clerk production keys in Vercel environment variables
- [x] **Logo:** replaced with Canva PNG export (`logo.png`, 153 KB)
- [ ] Wire remaining poomsae videos as YouTube IDs become available (launching with Taegeuk 1 + 2)

> 📘 **For step-by-step hand-holding on every technical task in Phases 4–5 (Clerk, Resend, Upstash, CSP, DNS cutover, post-launch testing), see [`LAUNCH-RUNBOOK.md`](./LAUNCH-RUNBOOK.md).** This file is the *what*; the runbook is the *how*.
- [ ] Run final Lighthouse audit
- [ ] Run full test suite (`pnpm vitest run`)
- [ ] Test on real devices (iOS Safari, Android Chrome)

---

## Priority Order

1. Get control of the domain
2. Get a full DNS export from Foxspin
3. Preserve Google mail and verification records
4. Complete new site pre-launch items
5. Set up domain on Vercel
6. Update DNS to point to new site
7. Confirm site and email both work
8. Cancel Foxspin only after everything is stable
9. Transfer domain registrar (after stable)
