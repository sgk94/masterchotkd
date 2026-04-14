# Master Cho's Taekwondo — Project CLAUDE.md

## Project Overview
Full business management platform for Master Cho's Taekwondo (Lynnwood, WA), replacing their Foxspin-hosted website ($300/mo) and reducing dependency on Foxspin management ($300/mo). Target: ~$25/mo hosting.

## Current Status
- **Phase 1 MVP: Built** — 27 pages, 2 API routes (`/api/contact` live via Resend + 1 PDF download), CI/CD, deployed to Vercel
- **Security/performance hardening done** — CSP tightened, framer-motion removed, program pages converted to Server Components, error boundaries added
- **Images optimized** — real dojang + instructor photos, resized to 2560px JPEG
- **Auth: Clerk enabled** — sign-in/sign-up pages, Facebook social login, route protection via `proxy.ts`
- **Contact form live** — Resend wired, rate-limited via Upstash when configured, body size + control-char guards in place
- **DB + trial/booking flows** — deleted until Phase 2 (schemas, forms, routes removed)
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
- Public website with all pages
- Static schedule display (read-only table, effective 01/01/2026)
- Members area protected by Clerk auth (sign-in/sign-up with Facebook social login)
- Curriculum pages (Tiny Tigers, Black Belt Club, Color Belt, Weekly Training)
- `/api/contact` live (Resend notification with `Reply-To: <prospect>`, Upstash rate-limited when configured, 10KB body cap, control-char stripping, Zod `fieldErrors`-only response)
- Trial/booking flows removed — `/special-offer` uses a plain CTA link to SparkPages
- SEO (sitemap, robots, JSON-LD, OG image config)
- CI/CD (GitHub Actions: lint → test → build → Lighthouse, build artifact shared)
- Promo modal (BOGO deal, session-scoped, keyboard accessible)
- Trial offer: $49 / 2 weeks (no uniform included)
- Real program + instructor images (JPEG, 2560px wide)
- Hero video background (`public/videos/hero.mp4`) with `preload="none"`
- Security headers: CSP (with `object-src 'none'`, `upgrade-insecure-requests`), HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- CSP includes Clerk, Cloudflare CAPTCHA, and Facebook domains
- Shared form hook (`useFormSubmit`) with network error handling and Zod field builders
- Mega-menu navbar with dropdowns for Programs (image cards) and Members (gated list)
- Animated gold neon border on trial banner
- Route groups: `(auth)` for sign-in/sign-up, `(main)` for public + protected pages
- URL rewriting: `/students/*` → `/members/*` (public-facing URLs use "members")
- Error boundaries (`global-error.tsx`, `(main)/error.tsx`) and loading states
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
- Promo modal: BOGO deal, shows once per session, Escape key to close
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
- Signed in: Announcements, Current Cycle, Tiny Tigers, Color Belt, Resources
- Signed out: "Member Access Only" + Log In button

### Members Sub-Navigation (tab bar inside members pages)
Announcements → Current Cycle → Tiny Tigers → Color Belt → Resources

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

### Protected Pages (9 routes, Clerk auth required)
Public-facing URLs use `/members/*`, internally mapped to `/students/*` via rewrites.
- `/members` — Hub with announcements, socials, quick links
- `/members/current-cycle` — Current training cycle
- `/members/curriculum` — Choose program (Tiny Tigers, Color Belt, + more)
- `/members/curriculum/tiny-tigers` — Belt cards (White → Camo)
- `/members/curriculum/black-belt-club` — Belt cards (White → Black)
- `/members/curriculum/color-belt` — Beginner/Intermediate/Advanced cycle breakdown (card-based)
- `/members/curriculum/weekly-training` — 5-week training structure timeline
- `/members/forms` — Poomsae videos
- `/members/resources` — Training materials

### API Routes
- `POST /api/contact` — live. Resend email to `NOTIFY_EMAIL` with `Reply-To: <submitter>`. Returns 201 on success; 400 on JSON/Zod failure (only `fieldErrors` leaked); 413 when `content-length > 10_000`; 429 when Upstash rate-limit exceeded; 500 on Resend failure. Runtime: Node, `maxDuration = 10`.
- `GET /student-resources/tiny-tiger-handbook` — PDF download (Clerk auth required)
- `GET /student-resources/red-black-training-packet` — PDF download (Clerk auth required)

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
**Home:** hero, marquee, programs-grid, trial-banner, values-section, testimonials, gallery, bottom-cta, promo-modal
**Layout:** navbar (with mega-menu + Clerk auth), mobile-menu, footer
**UI:** button, reveal, bezel-card, page-container, eyebrow-badge
**Forms:** form-field, contact-form
**Schedule:** schedule-grid, schedule-client
**Members:** floating-section-nav, shared

### Hooks (1)
- `use-form-submit` — shared form submission logic (schema validation, fetch with try/catch, network error handling)

### Schemas
- `fields.ts` — shared Zod field builders (nameField, emailField with strict regex + toLowerCase, phoneField with min-digit enforcement)
- `contact.ts` — contact form schema

### Lib (13 modules)
db, server-env (lazy via `getServerEnv()`), client-env, fonts, metadata, email, rate-limit, sanitize, static-data, api-security, members-home-content, current-cycle, current-cycle-materials

### Types (`src/types/index.ts`)
NavLink, Program, ScheduleSlot, Testimonial, DAYS_OF_WEEK, NAV_LINKS

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
- `prisma/seed.ts` and `prisma.config.ts` excluded from tsconfig
- API routes are stubbed (return 503) — full implementations in git history, restore when DB connected
- Zod v4 uses `.issues` not `.errors` on ZodError
- Lighthouse gate set to `warn` at 0.85 (not `error` at 0.9) for preview phase
- pnpm 10 declared in `packageManager` — CI must not specify `version: 9`
- Hero uses CSS entrance animations (`@keyframes fade-up`, `hero-video-in`) — no JS needed
- `logo.svg` is 259 KB because it contains embedded raster (base64 PNG) — SVGO can't optimize it, needs vector redraw
- Programs grid order is hardcoded in `gridOrder` array — must match bento layout positions
- `api-security.ts` has `validateOrigin()` and `getClientIp()` ready for when API routes are re-enabled
- CSP allows `unsafe-inline` + `unsafe-eval` for scripts (required by Next.js) — tighten with nonces later
- CSP includes Clerk wildcard domains — tighten for production (pin to exact Clerk instance origins)
- Navbar mega-menu uses 200ms leave timeout to prevent flicker — `onMouseLeave` only on outer container
- Trial banner `border-spin` animation defined in `globals.css` — uses `transform: rotate()` not `rotate` shorthand
- Button `outline` variant has `border-white/30 text-white` baked in — override with `!` prefix
- `proxy.ts` replaces `middleware.ts` for Next.js 16
- `server-env.ts` exports `getServerEnv()` (lazy) — won't crash on import if env vars missing
- `email.ts` uses `getServerEnv()` — Resend client created on first call
- Social links in footer/contact/members are TODO placeholders pointing to root domains
- App download links in members-home-content are `#` placeholders
- `og-image.jpg` referenced in metadata but does not exist yet — needs to be created (1200x630)
- Footer copyright year is dynamic (`new Date().getFullYear()`)

## Images
All in `public/images/` — JPEG format, 2560px wide:
**Programs:** `Tiny-Tigers.jpg`, `Black-Belt-Club.jpg`, `Competition-Team.jpg`, `Leadership_Demo-Team.jpg`
**Gallery:** `Tiny-Tigers-2.jpg`, `Black-Belt-Club-2.jpg`, `Competition-Team-2.jpg`, `Leadership.jpg`
**Instructors:** `GMC.jpg`, `MC.jpg`, `Instructor-Lasala.jpg`
**Curriculum:** `Color Belt Curriculum.png`, `Weekly Curriculum.png`, `IDEA.png`
**Other:** `camo-pattern.jpg` (belt swatch), `logo.svg` (259 KB, embedded raster)
**Video:** `public/videos/hero.mp4` (5.9 MB)

## Static Resources
- `student-resources/Tiny Tiger Handbook.pdf` — served via route handler at `/student-resources/tiny-tiger-handbook` (Clerk auth required)

## Tests
**Unit:** contact schema, `/api/contact` route (validation + rate-limit + email failure paths), red-black packet route
**Component:** navbar, hero, contact-form, button, programs-grid, gallery, schedule-grid, promo-modal, values-section, trial-banner, bottom-cta
**E2E:** homepage, contact (Playwright, need running app to execute)
Run `pnpm vitest run` for the current count — trial/booking suites were removed with those flows.

## To Get Fully Running
1. Resend: API key + `RESEND_FROM_EMAIL` + `NOTIFY_EMAIL` in `.env.local` / Vercel env
2. Upstash Redis keys in `.env.local` / Vercel env — contact form auto-enables rate limiting once present
3. (Phase 2) Neon DB → `DATABASE_URL`; `pnpm prisma migrate dev --name init && pnpm prisma db seed`; restore trial/booking API routes + forms from git history; replace `static-data` imports with DB queries; remove `@ts-nocheck` / `require()` workaround from `db.ts`
4. Get logo redrawn as proper vector SVG (current one has embedded raster)
5. Create OG image (1200x630 JPEG) at `public/images/og-image.jpg`
6. Replace social link placeholders with actual Facebook/Instagram page URLs (footer, contact, members)
7. Replace app download `#` placeholders with actual Spark Member app store URLs
8. Tighten CSP (replace `unsafe-inline` with nonces)
9. Pin Clerk CSP origins to exact production domains (replace wildcards)
10. Switch Clerk from Development to Production mode

## Repo
- **GitHub:** github.com/sgk94/masterchotkd
- **Hosting:** Vercel (auto-deploys from main)
- **Logo:** `public/images/logo.svg`
