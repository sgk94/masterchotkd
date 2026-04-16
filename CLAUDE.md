# Master Cho's Taekwondo — Project CLAUDE.md

## Project Overview
Full business management platform for Master Cho's Taekwondo (Lynnwood, WA), replacing their Foxspin-hosted website ($300/mo) and reducing dependency on Foxspin management ($300/mo). Target: ~$25/mo hosting.

## Current Status
- **Phase 1 MVP: Built** — 24 pages, 9 API routes (`/api/contact` live + 8 protected PDF downloads), CI/CD, deployed to Vercel
- **Pre-launch hardening done** — CSRF + IP-extraction + outbound-HTML-escape + Resend timeout on `/api/contact`; PDF path-traversal guard + RFC 5987 filename; proxy matcher tightened; error boundaries log
- **Client bundle reduced** — programs-grid, schedule-grid, weekly-training, students/layout, curriculum index now Server Components; CSS `@keyframes` entrance animations replace IntersectionObserver hooks; `FloatingSectionNav` uses CSS `position: sticky` (no scroll handler)
- **DRY consolidation** — `src/lib/nav.ts` is single nav source; `<ResourceCard>` extracted; `<EyebrowBadge variant="gold">` replaces 13 inline pills
- **Images optimized** — real dojang + instructor photos, 2560px JPEG; OG image (1200×630) wired
- **Auth: Clerk enabled** (Development mode, see To Get Fully Running) — Facebook social login, route protection via `proxy.ts`
- **Contact form live** — Resend wired, Upstash rate-limit when configured, validateOrigin/CSRF check, 10KB body cap, control-char + HTML escape, 5s Resend timeout
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
- Public website + members area (Clerk-gated, Facebook social login)
- Static schedule display (effective 01/01/2026)
- Curriculum pages: Tiny Tigers, Black Belt Club, Color Belt, Red/Black Belt, Weekly Training
- `/api/contact` live — validateOrigin/CSRF, Resend with `Reply-To: <prospect>`, Upstash rate-limit when configured, 10KB body cap, control-char + HTML escape, Zod `fieldErrors`-only response, 5s Resend timeout, fail-fast env check via `src/instrumentation.ts`
- 8 protected PDF route handlers (`/student-resources/*`) with path-traversal guard, RFC 5987 filename, Clerk auth
- Trial/booking flows removed — `/special-offer` uses plain CTA link to SparkPages
- SEO (sitemap, robots, JSON-LD with `</script>` escape, OG image at `public/images/og-image.jpg`)
- CI/CD (GitHub Actions: lint → test → build → Lighthouse mobile preset, error at 0.9)
- Trial offer: $49 / 2 weeks (no uniform included)
- Real program + instructor images (JPEG, 2560px wide)
- Hero video (`public/videos/hero.mp4`) with `preload="none"`
- Security headers: CSP (with `object-src 'none'`, `upgrade-insecure-requests`), HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- CSP includes Clerk wildcards, Cloudflare CAPTCHA, Facebook domains
- Shared form hook (`useFormSubmit`) with network error handling + shared Zod field builders
- Mega-menu navbar (Programs image cards, Members gated list); single nav source in `src/lib/nav.ts`
- Animated gold neon border on trial banner
- Route groups: `(auth)` for sign-in/sign-up, `(main)` for public + protected pages
- URL rewriting: `/students/*` → `/members/*` (public-facing URLs use "members")
- Error boundaries (`global-error.tsx`, `(main)/error.tsx`) — both log via `useEffect`
- `/preview` page gated in production via `notFound()`

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
- Scroll-reveal via `<Reveal>` (`src/components/ui/reveal.tsx`) — IntersectionObserver with auto `will-change` cleanup
- Kinetic marquee (`src/components/home/marquee.tsx`) — Server Component
- Grain texture overlay (CSS `::after` pseudo-element)
- Premium easing: `cubic-bezier(0.32, 0.72, 0, 1)`
- Mega-menu navbar: `rounded-[1.5rem]` container, expands with `grid-template-rows` animation
- Active nav link: gold underline via `usePathname()`
- Animated gold border: `border-spin` keyframe with conic-gradient + blur glow layer (trial banner)
- `prefers-reduced-motion` media query for scroll-behavior

### Key Design Decisions
- Navbar: Nestig-style mega-menu — Programs dropdown shows link list + 4 image cards, Members dropdown shows gated list
- Schedule: premium double-bezel table with dark header, muted color-coded pills, left accent borders
- Members auth via Clerk (Facebook social login enabled)
- Hero: Server Component with CSS `@keyframes` entrance animations, split layout — text left on navy bg, video (75% width, `preload="none"`) on right
- Gallery: 4 dojang photos with lightbox (keyboard: Escape, arrows), ARIA roles
- Trial banner: animated gold neon border (Server Component)
- Programs grid: asymmetric bento layout — Tiny Tigers (col-span-7 row-span-2), Competition+Leadership stacked right (col-span-5), Black Belt Club full width (col-span-12)
- About page: hero uses GMC.jpg image, alternating left/right instructor photo sections
- Color Belt Curriculum: card-based layout (3 cards per level) instead of tables
- Weekly Training: timeline cards with stripe color indicators
- Shared `coreValues` data exported from `values-section.tsx`, imported by `bottom-cta.tsx` (DRY)
- Mobile menu uses CSS transitions (no framer-motion), Escape key to close, `role="dialog"` + `inert`

## Navigation Structure

### Desktop Navbar (left → logo → right)
**Left:** About, Programs (dropdown), Schedule, Reviews
**Right:** Members (gated dropdown), Contact, Special Offer (CTA button), Sign In / User Button (Clerk)

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
- `/` — Home (hero with video, marquee, programs, problem/solution CTA, trial banner, values, testimonials, gallery)
- `/about` — Story + philosophy + instructors (3 alternating photo sections, GMC hero image)
- `/programs` — Overview (4 cards with real images)
- `/programs/tiny-tigers` — Full detail: hero, schedule, curriculum cards, parent FAQ, CTA (Server Component)
- `/programs/black-belt-club` — Full detail: hero, schedule grid, curriculum cards, FAQ, CTA (Server Component)
- `/programs/leadership-club` — Full detail: hero, schedule, requirements, FAQ, CTA (Server Component)
- `/programs/competition-team` — Full detail: hero, schedule, requirements, FAQ, CTA (Server Component)
- `/schedule` — Weekly class table (premium redesign with double-bezel)
- `/reviews` — Wall of Love
- `/contact` — Form + location + phone (`tel:` link)
- `/special-offer` — Trial ($49 / 2 weeks)
- `/preview` — Design exploration (gated: `notFound()` in production, blocked by robots.txt)
- `/sign-in` — Clerk sign-in (Facebook social login)
- `/sign-up` — Clerk sign-up

### Protected Pages (10 routes, Clerk auth required)
Public-facing URLs use `/members/*`, internally mapped to `/students/*` via rewrites.
- `/members` — Hub with announcements, socials, quick links
- `/members/current-cycle` — Current training cycle (logic + 2027 fallback in `src/lib/current-cycle.ts`, boundary-tested)
- `/members/curriculum` — Choose program (Server Component, link cards)
- `/members/curriculum/tiny-tigers` — Belt cards + ResourceCard PDFs
- `/members/curriculum/black-belt-club` — FloatingSectionNav, midterm + 2nd-degree requirements, 18 combos
- `/members/curriculum/color-belt` — Beginner/Intermediate/Advanced cycle breakdown (card-based)
- `/members/curriculum/red-black-belt` — Black belt prep (FAQ, requirements, written test, resources, packet PDF)
- `/members/curriculum/weekly-training` — 5-week training structure timeline (Server Component)
- `/members/forms` — Poomsae videos
- `/members/resources` — Training materials grid (light + dark `<ResourceCard>` variants, preview images)

### API Routes
- `POST /api/contact` — live. Resend email to `NOTIFY_EMAIL` with `Reply-To: <submitter>`. Status codes: 201 success; 400 on JSON/Zod failure (only `fieldErrors` leaked); 403 when Origin doesn't match `NEXT_PUBLIC_SITE_URL` (CSRF); 413 when `content-length > 10_000`; 429 when Upstash rate-limit exceeded; 500 on Resend failure or 5s timeout. Runtime: Node, `maxDuration = 10`.
- `GET /student-resources/{color-belt-handbook | monthly-chore-sheet | reading-list | red-black-training-packet | respect-sheet | star-chart | testing-essay-topics | tiny-tiger-handbook}` — 8 PDF download routes via shared `serveProtectedPdf()` helper (Clerk auth, allowlist regex on filename, RFC 5987 Content-Disposition).

### Other Routes
- `/not-found` — Custom 404
- `/sitemap.xml` — dynamic
- `/robots.txt` — blocks /students/, /api/, /student-resources/, /preview/

### Route Groups
- `(auth)` — Clerk sign-in/sign-up pages (minimal layout, no navbar/footer)
- `(main)` — All public + protected pages (navbar + footer layout, error boundary + loading state)

### URL Rewriting (`next.config.ts`)
- `/students` → redirects to `/members` (permanent)
- `/students/*` → redirects to `/members/*` (permanent)
- `/members` → rewrites to `/students` (internal)
- `/members/*` → rewrites to `/students/*` (internal)

### Components
**Home:** hero, marquee, programs-grid, trial-banner, values-section, testimonials, gallery, bottom-cta
**Layout:** navbar (with mega-menu + Clerk auth), mobile-menu, footer
**UI:** button, reveal, bezel-card, page-container, eyebrow-badge (`pill` | `gold` variants)
**Forms:** form-field, contact-form
**Schedule:** schedule-grid (Server Component, CSS entrance), schedule-client
**Members:** floating-section-nav (sticky, Server Component), shared, resource-card (light/dark + preview), members-tab-bar

### Hooks (1)
- `use-form-submit` — shared form submission logic (schema validation, fetch with try/catch, network error handling)

### Schemas
- `fields.ts` — shared Zod field builders (nameField, emailField with strict regex + toLowerCase, phoneField with min-digit enforcement)
- `contact.ts` — contact form schema

### Lib (15 modules)
db, server-env (lazy via `getServerEnv()`), client-env, fonts, metadata, email (5s Resend timeout), rate-limit, sanitize (+ `escapeHtml`), static-data, api-security (`validateOrigin` + `getClientIp` — both wired), members-home-content, current-cycle, current-cycle-materials, location, nav (`PRIMARY_NAV` + `PROGRAM_NAV` + `MEMBER_NAV`)

### Types (`src/types/index.ts`)
Program, ScheduleSlot, Testimonial, DAYS_OF_WEEK (nav lives in `src/lib/nav.ts`)

## Auth (Clerk)
- **Provider:** Clerk (ClerkProvider wraps root layout)
- **Route protection:** `src/proxy.ts` — protects `/members(.*)`, `/students(.*)`, and `/student-resources(.*)`
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
- `logo.svg` is 259 KB (embedded raster) — SVGO can't optimize; **waiting on Canva-exported logo** (do not auto-trace; user rejected that path)
- Programs grid order is hardcoded in `gridOrder` array — must match bento layout positions
- CSP allows `unsafe-inline` + `unsafe-eval` for scripts (required by Next.js) — tighten with nonces later
- CSP includes Clerk wildcard domains — pin to `clerk.<domain>` + `accounts.<domain>` at Clerk Production cutover (see `LAUNCH-RUNBOOK.md`)
- Navbar mega-menu uses 200ms leave timeout to prevent flicker — `onMouseLeave` only on outer container
- Trial banner `border-spin` animation defined in `globals.css` — uses `transform: rotate()` not `rotate` shorthand
- Button `outline` variant has `border-white/30 text-white` baked in — override with `!` prefix
- `proxy.ts` replaces `middleware.ts` for Next.js 16; matcher excludes `_next/static`, `_next/image`, `favicon.ico`, `images`, `videos`, `fonts`
- `server-env.ts` `getServerEnv()` is lazy; `src/instrumentation.ts` calls it once at prod boot to fail-fast on missing vars
- `email.ts` enforces 5s Resend timeout via `Promise.race` (Resend SDK v6 has no `signal` param)
- `serveProtectedPdf` enforces `/^[A-Za-z0-9 ._-]+\.pdf$/` allowlist + `path.resolve` containment check
- Footer copyright year is dynamic (`new Date().getFullYear()`)
- `next/font` weights: Oswald 400/500/600/700; Barlow 400/500/600 (no font-light usage)
- `<EyebrowBadge variant="gold">` for navy-bg eyebrows; `pill` for cream-bg eyebrows

## Images
All in `public/images/` — JPEG format, 2560px wide:
**Programs:** `Tiny-Tigers.jpg`, `Black-Belt-Club.jpg`, `Competition-Team.jpg`, `Leadership_Demo-Team.jpg`
**Gallery:** `Tiny-Tigers-2.jpg`, `Black-Belt-Club-2.jpg`, `Competition-Team-2.jpg`, `Leadership.jpg`
**Instructors:** `GMC.jpg`, `MC.jpg`, `Instructor-Lasala.jpg`
**Curriculum:** `Color Belt Curriculum.png`, `Weekly Curriculum.png`, `IDEA.png`
**Other:** `camo-pattern.jpg` (belt swatch), `logo.svg` (259 KB, embedded raster)
**Video:** `public/videos/hero.mp4` (5.9 MB)

## Static Resources
8 PDFs in `student-resources/`, served via shared `serveProtectedPdf()` (Clerk auth + filename allowlist):
- `Tiny Tiger Handbook.pdf`
- `Color Belt Handbook.pdf`
- `RedBlack Training Packet.pdf`
- `Respect Sheet.pdf`, `Star Chart.pdf` (Tiny Tiger stripe sheets)
- `Reading List.pdf`, `Monthly Chore Sheet.pdf`, `Testing Essay Topics.pdf` (Color Belt stripe sheets)

## Tests (16 files, 69 tests passing)
**Unit:** contact schema, `/api/contact` route (validation + rate-limit + 6 status branches), red-black packet route, `current-cycle` boundary tests (each transition + 2027 fallback documented)
**Component:** navbar, hero, contact-form, button, programs-grid, gallery, schedule-grid, values-section, trial-banner, bottom-cta, red-black-belt-page, black-belt-club-page (all 7 midterms + 18 combos)
**E2E:** homepage, contact (Playwright, need running app to execute)
Run `pnpm vitest run` for the current count.

## To Get Fully Running
See `LAUNCH-RUNBOOK.md` for step-by-step hand-holding on every item below.

1. Resend: API key + `RESEND_FROM_EMAIL` + `NOTIFY_EMAIL` in `.env.local` / Vercel env (instrumentation.ts will fail prod boot if missing)
2. Upstash Redis keys in `.env.local` / Vercel env — contact form auto-enables rate limiting once present
3. (Phase 2) Neon DB → `DATABASE_URL`; `pnpm prisma migrate dev --name init && pnpm prisma db seed`; restore trial/booking models + API routes + forms from git history; replace `static-data` imports with DB queries; remove `require()` workaround from `db.ts`
4. **Logo:** waiting on Canva-exported file from owner (do not trace existing raster)
5. Tighten CSP (replace `unsafe-inline` with nonces)
6. Pin Clerk CSP origins to exact production domains (replace wildcards) — coupled with Clerk Production switch
7. Switch Clerk from Development to Production mode (DNS CNAMEs + Production keys)

## Repo
- **GitHub:** github.com/sgk94/masterchotkd
- **Hosting:** Vercel (auto-deploys from main)
- **Logo:** `public/images/logo.svg`
