# Master Cho's Taekwondo — Project CLAUDE.md

## Project Overview
Full business management platform for Master Cho's Taekwondo (Lynnwood, WA), replacing their Foxspin-hosted website ($300/mo) and reducing dependency on Foxspin management ($300/mo). Target: ~$25/mo hosting.

## Current Status
- **Phase 1 MVP: Built** — 23 pages, 11 API routes (`/api/contact` + 8 PDF downloads + 2 admin invitation routes), CI/CD, deployed to Vercel
- **Pre-launch hardening done** — CSRF + IP-extraction + outbound-HTML-escape + Resend timeout on `/api/contact`; PDF path-traversal guard + RFC 5987 filename; proxy matcher tightened; error boundaries log; contact route validates actual body bytes (not Content-Length header)
- **Code review sweep (Apr 2026)** — Clerk CVE patched (7.0.8 → 7.2.3); canonical URLs on all 11 public pages; JSON-LD enriched (SportsActivityLocation, geo, sameAs); meta descriptions localized; heading hierarchy + semantic HTML fixed; hero poster preloaded; `<Reveal>` uses shared IntersectionObserver; `offer-glow` compositor-friendly; `<ProgramDetailPage>` template DRYs 4 program pages; `<EyebrowBadge>` consolidated; `getSiteUrl()` centralized; `formatError()` extracted; Resend singleton cached
- **Client bundle reduced** — programs-grid, schedule-grid, weekly-training, students/layout, curriculum index, color-belt page now Server Components; CSS `@keyframes` entrance animations replace IntersectionObserver hooks; `FloatingSectionNav` uses CSS `position: sticky` (no scroll handler); `ExpandableCard` extracted to thin client boundary
- **DRY consolidation** — `src/lib/nav.ts` is single nav source; `<ResourceCard>` extracted; `<EyebrowBadge>` replaces all inline pills; `<ProgramDetailPage>` template replaces 4 copy-pasted program pages; `getSiteUrl()` replaces 5 inline env fallbacks; `formatError()` replaces 5 catch-block patterns
- **Images optimized** — real dojang + instructor photos at 1600px JPEG @ q82 (resized from 2560px, ~8 MB disk savings); hero poster (79 KB, first-frame LCP, preloaded via `<link>`); OG image (1200×630) wired
- **Auth: Clerk enabled** (Development mode, see To Get Fully Running) — Facebook social login, route protection via `proxy.ts`
- **Contact form live** — Resend wired, Upstash rate-limit when configured, validateOrigin/CSRF check, 10KB actual body-size cap, control-char + HTML escape, 5s Resend timeout
- **DB + trial/booking flows** — deleted until Phase 2 (schemas, forms, routes removed); Prisma schema trimmed to Program + ClassSchedule + Testimonial
- **PromoModal removed** (was site-wide on every route for a single-fire BOGO modal)
- **Deployed:** Vercel (auto-deploys from `main` branch on `sgk94/masterchotkd`)
- **GitHub:** github.com/sgk94/masterchotkd

## Business Context
- **Business:** Master Cho's Black Belt Academy, Lynnwood, WA
- **Location:** 5031 168th ST SW STE 100, Lynnwood, WA 98037
- **Students:** 50-150 active members
- **Current stack:** Foxspin website + SparkMembership/Pitbull payments
- **Pain points:** $600/mo total, can't make quick changes

## Programs
1. Tiny Tigers (ages 4-6)
2. Black Belt Club (all ages)
3. Leadership Club / Demo Team (advanced)
4. Competition Team (tournament athletes)

Additional class types on schedule: White-Yellow (Beginner), Camo-Purple (Intermediate), Blue-Black (Advanced), Family/All Belts, Adult & Teens

## Phasing

### Phase 1 (MVP) — COMPLETE
See **Current Status** (above) and **Gotchas** / **API Routes** (below) for specifics. Trial offer: $49 / 2 weeks (no uniform). Schedule effective 01/01/2026. Security headers include CSP (`object-src 'none'`, `upgrade-insecure-requests`), HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.

### Phase 2 — Student Portal (not started)
### Phase 3 — Admin Dashboard (not started)
### Phase 4 — Mobile App (not started)

## Tech Stack
- **Framework:** Next.js 16.2.3 (App Router, Server Components)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (CSS-only config via `@theme` in globals.css — NO tailwind.config.ts)
- **Animation:** CSS only (scroll reveals via `<Reveal>`, marquee, border-spin, hero entrance animations)
- **Auth:** Clerk (enabled — Facebook social login, route protection via `proxy.ts`)
- **Database:** PostgreSQL (Neon — schema defined, not connected)
- **ORM:** Prisma 7.6 (`db.ts` uses `require()` to avoid CI type errors)
- **Validation:** Zod v4 (uses `.issues` not `.errors` on ZodError); shared field builders in `schemas/fields.ts`
- **Email:** Resend (configured, not connected — uses lazy `getServerEnv()`)
- **Rate Limiting:** Upstash Redis + @upstash/ratelimit (configured, not connected)
- **Sanitization:** sanitize-html
- **Hosting:** Vercel (connected to GitHub, auto-deploys)
- **Package manager:** pnpm 10.18
- **Testing:** Vitest + happy-dom, React Testing Library, Playwright
- **CI/CD:** GitHub Actions (lint → test → build → Lighthouse with shared build artifact)
- **Next.js tuning:** `experimental.optimizePackageImports: ["@clerk/nextjs"]`; `images.minimumCacheTTL = 31_536_000` (1yr); `formats: ["image/avif", "image/webp"]`

## Design System

### Typography
- **Headings:** Oswald (condensed, bold, uppercase) — athletic feel
- **Body:** Barlow (clean, modern)
- Loaded via `next/font` in `src/lib/fonts.ts` (exported as `heading` and `body`)
- Auto-uppercase on all headings via `globals.css`

### Brand Colors
| Color | Hex | Usage |
|---|---|---|
| Red | #c41e2a | Primary CTAs |
| Blue | #1a1a6e | Depth, links |
| Navy | #0a0a2e | Hero background |
| Black | #1a1a2e | Text, nav bg |
| Gold | #c4a44a | Accents |
| Warm White | #faf8f5 | Backgrounds |
| Cream | #f0ebe4 | Cards, sections |
| Sand | #e8e0d4 | Surfaces |
| Taupe | #d4c5b0 | Borders |

### Design Patterns
- Double-bezel cards via `<BezelCard>` (`src/components/ui/bezel-card.tsx`) — also used in schedule grid
- Pill buttons (`rounded-full`) with tinted shadows
- Page container via `<PageContainer>` (`src/components/ui/page-container.tsx`)
- Scroll-reveal via `<Reveal>` (`src/components/ui/reveal.tsx`) — single shared IntersectionObserver with auto `will-change` cleanup
- Kinetic marquee (`src/components/home/marquee.tsx`) — Server Component
- Grain texture overlay (CSS `::after`, gated to `@media (min-width: 768px)` — skip on mobile to save fixed-layer paint)
- Premium easing: `cubic-bezier(0.32, 0.72, 0, 1)`
- Mega-menu navbar: `rounded-[1.5rem]` container, expands with `grid-template-rows` animation
- Active nav link: gold underline via `usePathname()`
- Animated gold border: `border-spin` keyframe with conic-gradient + blur glow layer (trial banner)
- `prefers-reduced-motion` media query for scroll-behavior

### Key Design Decisions
- Navbar: Nestig-style mega-menu — Programs dropdown shows link list + 4 image cards, Members dropdown shows gated list
- Schedule: premium double-bezel table with dark header, muted color-coded pills, left accent borders
- Hero: Server Component with CSS `@keyframes` entrance animations, split layout — text left on navy bg, video (75% width, `preload="none"`, `poster="/images/hero-poster.jpg"`, wrapper `hidden lg:block` prevents mobile fetch) on right
- Gallery: 4 dojang photos with lightbox (keyboard: Escape, arrows), ARIA roles
- Trial banner: animated gold neon border (Server Component)
- Programs grid: asymmetric bento layout — Tiny Tigers (col-span-7 row-span-2), Competition+Leadership stacked right (col-span-5), Black Belt Club full width (col-span-12)
- About page: story-driven hero (3 short paragraphs), top hero photo `storefront.webp` with `ring-2 ring-brand-gold`, alternating left/right instructor sections (real bios — GMC, Master Joshua Cho, Instructor Daniel Lasala), philosophy ends with "More Than The Mat" cards
- Members tab bar (`<MembersTabBar>`): underlined-tab pattern; active = brand-red 2px underline + semibold text; CSS `transform: scaleX` grow-from-center transition (500ms with brand easing); horizontal-scroll on mobile
- Color Belt Curriculum: card-based layout (3 cards per level) instead of tables
- Weekly Training: timeline cards with stripe color indicators
- Mobile menu uses CSS transitions (no framer-motion), Escape key to close, `role="dialog"` + `inert`

## Navigation Structure

### Desktop Navbar
Single source: `src/lib/nav.ts` (`PRIMARY_NAV` + `PROGRAM_NAV` + `MEMBER_NAV`). Layout: left nav → logo → right nav + Clerk auth button.

**Programs Dropdown (image cards layout):**
- Tiny Tigers → `/programs/tiny-tigers`
- Black Belt Club → `/programs/black-belt-club`
- Leadership Club → `/programs/leadership-club`
- Competition Team → `/programs/competition-team`

**Members Dropdown (gated):**
- Signed in: Announcements, Current Cycle, Tiny Tigers, Color Belt, Red/Black Belt, Black Belt Curriculum, Resources
- Signed out: "Member Access Only" + Log In button

### Members Sub-Navigation (tab bar inside members pages, via `<MembersTabBar>`)
Announcements → Current Cycle → Tiny Tigers → Color Belt → Red/Black Belt → Black Belt Curriculum → Resources

### Mobile Menu
About, Programs, Schedule, Reviews, Members, Contact, Special Offer, Sign In

## Site Structure

### Public Pages (14 routes)
- `/` — Home (hero video, marquee, programs grid, BottomCta philosophy + challenges, trial banner, testimonials, gallery)
- `/about` — Story + instructors (alternating photo sections)
- `/programs` — Overview (4 cards)
- `/programs/{tiny-tigers|black-belt-club|leadership-club|competition-team}` — Detail pages (hero, schedule, curriculum/requirements, FAQ, CTA)
- `/schedule` — Weekly class table
- `/reviews` — Wall of Love
- `/contact` — Form + location + phone
- `/special-offer` — Trial ($49 / 2 weeks); `<main>` wrapper (no PageContainer — full-bleed marquee); breathing `offer-glow` CTA shadow
- `/preview` — Design exploration (gated: `notFound()` in prod, blocked by robots.txt)
- `/sign-in`, `/sign-up` — Clerk

### Protected Pages (9 routes, Clerk auth required)
Public-facing URLs use `/members/*`, internally mapped to `/students/*` via rewrites.
- `/members` — Hub with announcements (featured cycle card links to `/members/current-cycle`), socials, Spark Member App, quick links (Tiny Tigers / Color Belt / Resources)
- `/members/current-cycle` — Current training cycle (logic + 2027 fallback in `src/lib/current-cycle.ts`, boundary-tested); side-nav anchors: Overview, Color Belt, Poomsae, Weapons, One-Step, Hand Tech, Breaking, Schedule
- `/members/curriculum/tiny-tigers` — Belt cards + ResourceCard PDFs
- `/members/curriculum/black-belt-club` — FloatingSectionNav, midterm + 2nd-degree requirements, 18 combos
- `/members/curriculum/color-belt` — Beginner/Intermediate/Advanced cycle breakdown (card-based); Poomsae Videos section with `<PoomsaeCard>` + `<YouTubeFacade>` (click-to-load iframe, youtube-nocookie.com); `<ExpandableCard>` sections (one-steps, hand techniques, board breaking) use context-based client boundary with independent state per section; Korean form names (태극 일장, etc.) + cycle-ring indicator + form index; 2 videos wired (Taegeuk 1 + 2), 7 placeholders
- `/members/curriculum/red-black-belt` — Black belt prep (FAQ, requirements, written test, resources, packet PDF)
- `/members/curriculum/weekly-training` — 5-week training structure timeline (Server Component)
- `/members/resources` — Training materials grid (light + dark `<ResourceCard>` variants, preview images)
- `/admin/invitations` — Admin-only invitation manager (lists pending Clerk invitations, send + revoke). Guarded by `requireAdmin()` (`publicMetadata.role === "admin"`).

### API Routes
- `POST /api/contact` — live. Resend email to `NOTIFY_EMAIL` with `Reply-To: <submitter>`. Status codes: 201 success; 400 on JSON/Zod failure (only `fieldErrors` leaked); 403 when Origin doesn't match `NEXT_PUBLIC_SITE_URL` (CSRF); 413 when actual body bytes > 10,000 (reads body, not Content-Length header); 429 when Upstash rate-limit exceeded; 500 on Resend failure or 5s timeout. Runtime: Node, `maxDuration = 10`.
- `GET /student-resources/{color-belt-handbook | monthly-chore-sheet | reading-list | red-black-training-packet | respect-sheet | star-chart | testing-essay-topics | tiny-tiger-handbook}` — 8 PDF download routes via shared `serveProtectedPdf()` helper (Clerk auth, allowlist regex on filename, RFC 5987 Content-Disposition).
- `POST /api/admin/invitations` — admin-only, creates a Clerk invitation and emails the recipient. Status codes: 201 success; 400 invalid email or JSON; 401 signed out; 403 not admin or bad origin; 413 body > 2KB; 429 rate-limited; 502 Clerk error. Body: `{ email: string }`.
- `GET /api/admin/invitations` — admin-only, lists pending invitations. 200 with `{ invitations: [...] }`; 401/403 as above.
- `DELETE /api/admin/invitations/[id]` — admin-only, revokes the invitation. 200 ok; 400 malformed id; 401/403 as above; 502 Clerk error.

### Other Routes
- `/not-found` — Custom 404
- `/sitemap.xml` — dynamic
- `/robots.txt` — blocks /students/, /api/, /student-resources/, /preview/, /sign-in/, /sign-up/

### Route Groups
- `(auth)` — Clerk sign-in/sign-up pages (minimal layout, no navbar/footer)
- `(main)` — All public + protected pages (navbar + footer layout, error boundary + loading state)

### URL Rewriting (`next.config.ts`)
- `/students` → redirects to `/members` (permanent)
- `/students/*` → redirects to `/members/*` (permanent)
- `/members` → rewrites to `/students` (internal)
- `/members/*` → rewrites to `/students/*` (internal)

### Code layout
- `src/components/` — grouped by `home/`, `layout/`, `ui/`, `forms/`, `schedule/`, `members/`, `programs/`, `admin/`. Key shared: `<BezelCard>`, `<PageContainer>`, `<Reveal>`, `<EyebrowBadge>` (`pill`|`gold`), `<ResourceCard>` (light/dark + preview). Members: `<YouTubeFacade>` (click-to-load iframe facade for YouTube, uses `youtube-nocookie.com`), `<PoomsaeCard>` (specialized video card with Korean form names, cycle-ring indicator, belt stripe, form index), `<ExpandableCard>` + `<ExpandableCardGroup>` (context-based client boundary with independent state per group), `<VideoCard>` (generic video placeholder). Programs: `<ProgramDetailPage>` (shared template for all 4 program detail pages). Admin: `<InviteForm>` + `<RevokeButton>` (Clerk invitation management).
- `src/hooks/use-form-submit.ts` — shared form submission (schema validation, fetch, network-error handling).
- `src/schemas/` — `fields.ts` (shared Zod builders: name/email/phone) + `contact.ts` (contact form multi-select) + `invitation.ts` (admin invitation email schema).
- `src/lib/` — `db`, `server-env` (lazy `getServerEnv()`), `client-env`, `fonts`, `metadata`, `email` (5s Resend timeout, singleton Resend client), `rate-limit` (fail-open on backend errors), `sanitize` (+ `escapeHtml`), `static-data`, `api-security` (`validateOrigin` + `getClientIp`), `clerk-admin` (`requireAdmin` + `isAdminUser` + `clerkErrorToResponse`), `members-home-content`, `current-cycle`, `current-cycle-materials`, `location`, `nav` (single nav source), `site-url` (centralized `getSiteUrl()`), `errors` (`formatError()`).
- `src/types/index.ts` — Program, ScheduleSlot, Testimonial, DAYS_OF_WEEK.

## Auth (Clerk)
- **Provider:** Clerk (ClerkProvider wraps root layout)
- **Route protection:** `src/proxy.ts` — protects `/members(.*)`, `/students(.*)`, `/student-resources(.*)`, `/admin(.*)`, and `/api/admin(.*)`
- **Sign-up restriction:** Clerk Dashboard → User & Authentication → Restrictions → **Sign-up mode = Restricted**. Only emails with an active invitation (or on the dashboard allowlist) can complete sign-up. Admin role is set via `publicMetadata.role = "admin"` in the Clerk Dashboard or via `clerkClient.users.updateUserMetadata`.
- **Admin guard:** `src/lib/clerk-admin.ts` — `requireAdmin()` returns 401/403 `NextResponse` for API routes; `isAdminUser()` returns boolean for Server Component layout guards.
- **Frontend API:** default third-party FAPI at `*.accounts.dev`. First-party proxy (`frontendApiProxy: { enabled: true }`) was temporarily disabled in #23 because dev-instance Clerk rejects `*.vercel.app` hosts with `host_invalid` on the handshake (mobile Safari blank-page). Re-enable after Clerk flips to Production mode with the custom domain (see `LAUNCH-RUNBOOK.md`).
- **Social login:** Facebook (enabled), more can be added via Clerk dashboard
- **Sign-in page:** `/sign-in` → `src/app/(auth)/sign-in/[[...sign-in]]/page.tsx`
- **Sign-up page:** `/sign-up` → `src/app/(auth)/sign-up/[[...sign-up]]/page.tsx`
- **Navbar integration:** `ClerkLoading`/`ClerkLoaded`/`Show`/`UserButton`/`SignInButton` — Members dropdown is gated
- **Env vars:** `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `NEXT_PUBLIC_CLERK_SIGN_IN_URL`, `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
- **Status:** Development mode (switch to Production in Clerk dashboard for launch)

## Gotchas
- `db.ts` uses `require("@prisma/client")` — Prisma 7 import breaks CI type check otherwise
- `prisma/seed.ts` and `prisma.config.ts` excluded from tsconfig (seed still references trimmed `endTime`/`instructor`/`capacity` fields kept on `ClassSchedule` for Phase 2)
- Zod v4 uses `.issues` not `.errors` on ZodError; `flattenError(err).fieldErrors` only — never leak `formErrors`
- Lighthouse gate is `error` at 0.9 with mobile preset on home, tiny-tigers, schedule (CI fails if regressed)
- pnpm 10 declared in `packageManager` — CI must not specify `version: 9`
- Hero uses CSS entrance animations (`@keyframes fade-up`, `hero-video-in`) — no JS needed
- `logo.png` is 153 KB (833×798 Canva export) — `next/image` optimizes at runtime to avif/webp at rendered sizes (44px navbar, 96px footer)
- Programs grid order is hardcoded in `gridOrder` array — must match bento layout positions
- CSP allows `unsafe-inline` + `unsafe-eval` for scripts (required by Next.js) — tighten with nonces later
- CSP includes Clerk wildcard domains — pin to `clerk.<domain>` + `accounts.<domain>` at Clerk Production cutover (see `LAUNCH-RUNBOOK.md`)
- Navbar mega-menu uses 200ms leave timeout to prevent flicker — `onMouseLeave` only on outer container
- Trial banner `border-spin` animation defined in `globals.css` — uses `transform: rotate()` not `rotate` shorthand
- Button `outline` variant has `border-white/30 text-white` baked in — override with `!` prefix
- `proxy.ts` replaces `middleware.ts` for Next.js 16; matcher excludes `_next/static`, `_next/image`, `favicon.ico`, `images`, `videos`, `fonts`
- `server-env.ts` `getServerEnv()` is lazy; `src/instrumentation.ts` calls it once at prod boot to fail-fast on missing vars
- CI `lighthouse` job uses placeholder `RESEND_API_KEY`/`RESEND_FROM_EMAIL`/`NOTIFY_EMAIL` so `pnpm start` boot validation passes; swap for real GitHub secrets at go-live (see `LAUNCH-RUNBOOK.md` Phase 2A)
- `lighthouse` CI job consumes the `next-build.tgz` artifact from the `build` job (tar excluding `.next/cache`) instead of rebuilding
- `email.ts` enforces 5s Resend timeout via `Promise.race` (Resend SDK v6 has no `signal` param)
- `serveProtectedPdf` enforces `/^[A-Za-z0-9 ._-]+\.pdf$/` allowlist + `path.resolve` containment check
- Footer copyright year is dynamic (`new Date().getFullYear()`)
- `next/font` weights: Oswald 400/500/600/700; Barlow 400/500/600 (no font-light usage)
- `<EyebrowBadge variant="gold">` for navy-bg eyebrows; `pill` for cream-bg eyebrows
- `globals.css` uses `overflow-x: clip` (NOT `hidden`) on `html` + `body` — `overflow-x: hidden` silently turns those elements into scroll containers and breaks `position: sticky` on all descendants (e.g., `<FloatingSectionNav>`)
- Clerk v7: `clerkClient` is an **async** factory — use `const client = await clerkClient();` before `client.users.getUser(...)` or `client.invitations.*`. Calling `clerkClient().users...` chains on a Promise and fails at runtime.
- Restricted sign-up mode is a Clerk Dashboard setting, not in code. Forgetting to flip it in production leaves `/sign-up` open. Verify before launch.
- First admin must be granted manually: Clerk Dashboard → Users → select account → Metadata → Public → `{ "role": "admin" }`.
- `rate-limit.ts` **fails open** — if the Upstash backend throws (DNS failure, misconfigured placeholder env vars, network issues), `checkRateLimit` catches, logs, and returns `{ success: true }`. Rate limiting is defense-in-depth; it should never 500 the route.
- `requireAdmin()` wraps `clerkClient().users.getUser()` in try/catch — returns 502 JSON if Clerk is unreachable, preventing an uncaught 500 with no response body.
- CSP includes `i.ytimg.com` (img-src, YouTube thumbnails) and `www.youtube-nocookie.com` (frame-src, privacy-enhanced embeds) for the poomsae video facade.
- `<YouTubeFacade>` validates the video ID against `/^[A-Za-z0-9_-]{11}$/` before rendering — rejects anything that doesn't match the pattern.
- Special-offer page uses `<main>` wrapper (not `<PageContainer>`) — custom layout lets the kinetic marquee strip sit full-bleed below the hero section.
- `<Reveal>` uses a module-level shared `IntersectionObserver` — all instances on a page share one observer instead of creating individual ones.
- `offer-glow` animation uses `opacity` on a `::after` pseudo-element (compositor-friendly) — the shadow is pre-rendered once, only opacity changes per frame.
- `<ProgramDetailPage>` template handles hero, whatToExpect, schedule (as ReactNode), optional requirements, FAQ, and bottom CTA — program pages pass data + schedule JSX as props.

## Assets
- `public/images/` — JPEG, 1600px wide @ q82 (programs, gallery, instructors); `hero-poster.jpg` (79 KB first-frame LCP); `og-image.jpg` (1200×630); `storefront.webp` (62 KB, used on About hero). `logo.png` (153 KB Canva export, optimized at runtime via next/image). Size budget enforced by `tests/unit/image-budget.test.ts` (600 KB cap, recursive, covers jpg/png/webp/avif/gif/svg).
- `public/videos/hero.mp4` — 5.9 MB, `preload="none"`.
- `student-resources/` — 8 PDFs served via `serveProtectedPdf()` (see API Routes).

## Tests
Vitest (`pnpm vitest run`) + Playwright E2E (`tests/e2e/*`, needs running app). 272 tests / 59 files. Coverage gate: 75% branches (CI enforced). Coverage spans contact + invitation schemas, `/api/contact` + `/api/admin/invitations` route branches (incl. spoofed Content-Length rejection), `clerk-admin` guard, rate-limit fail-open, `current-cycle` boundaries, `getSiteUrl` fallback chain, `formatError` utility, component rendering (navbar, hero, programs-grid, schedule-grid, red-black + black-belt-club pages, members-tab-bar, resource-card, admin invitations page, invite-form, YouTubeFacade, ProgramDetailPage template, marquee), protected PDF route, `next.config` flags, `globals.css` grain mobile gate, image size budget.

## To Get Fully Running
See `LAUNCH-RUNBOOK.md` for step-by-step hand-holding on every item below.

1. Resend: verify `masterchostaekwondo.com` as sending domain (SPF + DKIM); API key + `RESEND_FROM_EMAIL` + `NOTIFY_EMAIL` in `.env.local` / Vercel env (instrumentation.ts will fail prod boot if missing)
2. Upstash Redis keys in `.env.local` / Vercel env — contact form auto-enables rate limiting once present
3. Switch Clerk from Development to Production mode (DNS CNAMEs + Production keys); pin CSP origins to exact production domains; re-enable `frontendApiProxy: { enabled: true }` in `src/proxy.ts` (see Auth section)
4. (Optional) Tighten CSP further — replace `unsafe-inline` with nonces
5. (Phase 2) Neon DB → `DATABASE_URL`; `pnpm prisma migrate dev --name init && pnpm prisma db seed`; restore trial/booking models + API routes + forms from git history; replace `static-data` imports with DB queries; remove `require()` workaround from `db.ts`

## Repo
- **GitHub:** github.com/sgk94/masterchotkd
- **Hosting:** Vercel (auto-deploys from main)
- **Logo:** `public/images/logo.png`
