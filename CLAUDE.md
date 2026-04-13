# Master Cho's Taekwondo — Project CLAUDE.md

## Project Overview
Full business management platform for Master Cho's Taekwondo (Lynnwood, WA), replacing their Foxspin-hosted website ($300/mo) and reducing dependency on Foxspin management ($300/mo). Target: ~$25/mo hosting.

## Current Status
- **Phase 1 MVP: Built** — 27 pages, 4 API routes (3 stubbed + 1 PDF download), CI/CD, deployed to Vercel
- **Design polish done** — scroll animations, premium typography, double-bezel cards, marquee, mega-menu navbar
- **Images optimized** — real dojang + instructor photos, resized to 2560px JPEG
- **Auth: Clerk enabled** — sign-in/sign-up pages, Facebook social login, route protection via `proxy.ts`
- **Static data mode** — DB, Resend, Upstash not connected yet
- **71 tests passing** (14 test files via Vitest; 12 E2E specs written for Playwright)
- **Deployed:** Vercel (auto-deploys from `main` branch on `sgk94/masterchotkd`)
- **GitHub:** github.com/sgk94/masterchotkd

## Business Context
- **Business:** Master Cho's Black Belt Academy, Lynnwood, WA
- **Location:** 3221 184th St SW STE 100, Lynnwood, WA 98037
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
- Contact/trial/booking API routes (stubbed — return 503 until DB connected)
- SEO (sitemap, robots, JSON-LD)
- CI/CD (GitHub Actions + Lighthouse at warn 0.85)
- Promo modal (BOGO deal, session-scoped)
- Trial offer: $49 / 2 weeks (no uniform included)
- Real program + instructor images (JPEG, 2560px wide)
- Hero video background (`public/videos/hero.mp4`)
- Security headers: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- CSP includes Clerk, Cloudflare CAPTCHA, and Facebook domains
- Shared form hook (`useFormSubmit`) and Zod field builders
- Mega-menu navbar with dropdowns for Programs (image cards) and Members (gated list)
- Animated gold neon border on trial banner
- Route groups: `(auth)` for sign-in/sign-up, `(main)` for public + protected pages
- URL rewriting: `/students/*` → `/members/*` (public-facing URLs use "members")

### Phase 2 — Student Portal (not started)
### Phase 3 — Admin Dashboard (not started)
### Phase 4 — Mobile App (not started)

## Tech Stack
- **Framework:** Next.js 16.2.2 (App Router, Server Components)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (CSS-only config via `@theme` in globals.css — NO tailwind.config.ts)
- **Animation:** Framer Motion (mobile menu), CSS animations (scroll reveals, marquee, border-spin)
- **Auth:** Clerk (enabled — Facebook social login, route protection via `proxy.ts`)
- **Database:** PostgreSQL (Neon — schema defined, not connected)
- **ORM:** Prisma 7.6 (`db.ts` uses `require()` to avoid CI type errors)
- **Validation:** Zod v4 (uses `.issues` not `.errors` on ZodError); shared field builders in `schemas/fields.ts`
- **Email:** Resend (configured, not connected)
- **Rate Limiting:** Upstash Redis + @upstash/ratelimit
- **Sanitization:** sanitize-html
- **Hosting:** Vercel (connected to GitHub, auto-deploys)
- **Package manager:** pnpm 10.18
- **Testing:** Vitest + happy-dom, React Testing Library, Playwright
- **CI/CD:** GitHub Actions (lint → test → build → Lighthouse)

## Design System

### Typography
- **Headings:** Oswald (condensed, bold, uppercase) — athletic feel
- **Body:** Barlow (clean, modern)
- Loaded via `next/font` in `src/lib/fonts.ts` (exported as `dmSerifDisplay` and `inter` — legacy names, actual fonts are Oswald/Barlow)
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
- Pill eyebrow badges via `<EyebrowBadge>` (`src/components/ui/eyebrow-badge.tsx`) — 3 variants: pill, gold-text, gold-pill
- Page container via `<PageContainer>` (`src/components/ui/page-container.tsx`)
- Scroll-reveal via IntersectionObserver (`src/components/ui/reveal.tsx`)
- Kinetic marquee (`src/components/home/marquee.tsx`)
- Grain texture overlay (CSS `::after` pseudo-element)
- Premium easing: `cubic-bezier(0.32, 0.72, 0, 1)`
- Mega-menu navbar: `rounded-[1.5rem]` container, expands with `grid-template-rows` animation for Programs (image cards layout) and Members (gated list layout)
- Active nav link: gold underline via `usePathname()`
- Animated gold border: `border-spin` keyframe with conic-gradient + blur glow layer (trial banner)

### Key Design Decisions
- Navbar: Nestig-style mega-menu — Programs dropdown shows link list + 4 image cards, Members dropdown shows gated list (signed-in: nav links, signed-out: "Member Access Only" + login button)
- Schedule: premium double-bezel table with dark header, muted color-coded pills, left accent borders
- Members auth via Clerk (Facebook social login enabled)
- Promo modal: BOGO deal, shows once per session
- Hero: split layout — text left on solid navy (#0a0a2e) bg, video window (75% width) on right with vignette gradients blending into background
- Gallery: 4 real dojang photos (uses `(2)` variants to avoid duplicating program grid images)
- Testimonials on cream bg, gold accent "See all reviews" button
- Trial banner: animated gold neon border (spinning conic-gradient, 8s loop, blur glow layer)
- Trial offer: $49 / 2 weeks, no uniform included
- Programs grid: asymmetric bento layout — Tiny Tigers (col-span-7 row-span-2), Competition+Leadership stacked right (col-span-5), Black Belt Club full width (col-span-12)
- About page: alternating left/right instructor photo sections (Grand Master Cho, Master Cho, Instructor Lasala)
- Color Belt Curriculum: card-based layout (3 cards per level) instead of tables
- Weekly Training: timeline cards with stripe color indicators

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
- `/about` — Story + philosophy + instructors (3 alternating photo sections)
- `/programs` — Overview (4 cards with real images)
- `/programs/tiny-tigers` — Full detail: hero, schedule, curriculum cards, parent FAQ, CTA
- `/programs/black-belt-club` — Full detail: hero, schedule grid, curriculum cards, FAQ, CTA
- `/programs/leadership-club` — Full detail: hero, schedule, requirements, FAQ, CTA
- `/programs/competition-team` — Full detail: hero, schedule, requirements, FAQ, CTA
- `/schedule` — Weekly class table (premium redesign with double-bezel)
- `/reviews` — Wall of Love
- `/contact` — Form + location
- `/special-offer` — Trial ($49 / 2 weeks)
- `/preview` — Design exploration (dev-only, should be gated or removed before production)
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
- `POST /api/booking` — stubbed (503)
- `POST /api/contact` — stubbed (503)
- `POST /api/trial` — stubbed (503)
- `GET /student-resources/tiny-tiger-handbook` — PDF download (Tiny Tiger Handbook)

### Other Routes
- `/not-found` — Custom 404
- `/sitemap.xml` — dynamic
- `/robots.txt` — blocks /students/, /api/

### Route Groups
- `(auth)` — Clerk sign-in/sign-up pages (minimal layout, no navbar/footer)
- `(main)` — All public + protected pages (navbar + footer layout)

### URL Rewriting (`next.config.ts`)
- `/students` → redirects to `/members` (permanent)
- `/students/*` → redirects to `/members/*` (permanent)
- `/members` → rewrites to `/students` (internal)
- `/members/*` → rewrites to `/students/*` (internal)

### Components (23)
**Home:** hero, marquee, programs-grid, trial-banner, values-section, testimonials, gallery, bottom-cta, promo-modal
**Layout:** navbar (with mega-menu + Clerk auth), mobile-menu, footer
**UI:** button, reveal, bezel-card, page-container, eyebrow-badge
**Forms:** form-field, contact-form, trial-form, booking-form
**Schedule:** schedule-grid, schedule-client

### Hooks (1)
- `use-form-submit` — shared form submission logic (schema validation, fetch, error mapping)

### Schemas (4)
- `fields.ts` — shared Zod field builders (nameField, emailField, phoneField)
- `contact.ts`, `trial.ts`, `booking.ts` — form schemas using shared fields

### Lib (11 modules)
db, server-env, client-env, fonts, metadata, email, rate-limit, sanitize, static-data, api-security, members-home-content

### Types (`src/types/index.ts`)
NavLink, Program, ScheduleSlot, Testimonial, DAYS_OF_WEEK, NAV_LINKS

## Auth (Clerk)
- **Provider:** Clerk (ClerkProvider wraps root layout)
- **Route protection:** `src/proxy.ts` — protects `/members(.*)` and `/students(.*)`
- **Social login:** Facebook (enabled), more can be added via Clerk dashboard
- **Sign-in page:** `/sign-in` → `src/app/(auth)/sign-in/[[...sign-in]]/page.tsx`
- **Sign-up page:** `/sign-up` → `src/app/(auth)/sign-up/[[...sign-up]]/page.tsx`
- **Navbar integration:** `ClerkLoading`/`ClerkLoaded`/`Show`/`UserButton`/`SignInButton` — Members dropdown is gated (signed-in shows nav links, signed-out shows login prompt)
- **Env vars:** `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `NEXT_PUBLIC_CLERK_SIGN_IN_URL`, `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
- **Status:** Development mode (switch to Production in Clerk dashboard for launch)

## Gotchas
- `db.ts` uses `require("@prisma/client")` — Prisma 7 import breaks CI type check otherwise
- `prisma/seed.ts` and `prisma.config.ts` excluded from tsconfig
- API routes are stubbed (return 503) — full implementations in git history, restore when DB connected
- Zod v4 uses `.issues` not `.errors` on ZodError
- Lighthouse gate set to `warn` at 0.85 (not `error` at 0.9) for preview phase
- pnpm 10 declared in `packageManager` — CI must not specify `version: 9`
- Hero uses video background (`/videos/hero.mp4`), split layout with navy bg
- `logo.svg` is 259 KB because it contains embedded raster (base64 PNG) — SVGO can't optimize it, needs vector redraw
- Programs grid order is hardcoded in `gridOrder` array — must match bento layout positions
- `api-security.ts` has `validateOrigin()` and `getClientIp()` ready for when API routes are re-enabled
- CSP allows `unsafe-inline` + `unsafe-eval` for scripts (required by Next.js) — tighten with nonces later
- CSP includes Clerk wildcard domains, Cloudflare CAPTCHA, and Facebook domains — tighten for production
- Navbar mega-menu uses 200ms leave timeout to prevent flicker — `onMouseLeave` only on outer container
- Trial banner `border-spin` animation defined in `globals.css` — uses `transform: rotate()` not `rotate` shorthand
- Button `outline` variant has `border-white/30 text-white` baked in — override with `!` prefix (e.g., testimonials button)
- Font exports in `fonts.ts` have legacy names (`dmSerifDisplay`, `inter`) — actual fonts are Oswald and Barlow
- `proxy.ts` replaces `middleware.ts` for Next.js 16

## Images
All in `public/images/` — JPEG format, 2560px wide:
**Programs:** `Tiny-Tigers.jpg`, `Black-Belt-Club.jpg`, `Competition-Team.jpg`, `Leadership_Demo-Team.jpg`
**Gallery:** `Tiny-Tigers-2.jpg`, `Black-Belt-Club-2.jpg`, `Competition-Team-2.jpg`, `Leadership.jpg`
**Instructors:** `GMC.jpg`, `MC.jpg`, `Instructor-Lasala.jpg`
**Curriculum:** `Color Belt Curriculum.png`, `Weekly Curriculum.png`, `IDEA.png`
**Other:** `camo-pattern.jpg` (belt swatch), `logo.svg` (259 KB, embedded raster)
**Video:** `public/videos/hero.mp4` (5.9 MB)

## Static Resources
- `student-resources/Tiny Tiger Handbook.pdf` — served via route handler at `/student-resources/tiny-tiger-handbook`

## Tests (71 total, 14 test files)
**Unit (6):** contact, trial, booking schema validation (3 files)
**Component (65):** navbar, hero, contact-form, button, programs-grid, gallery, schedule-grid, promo-modal, values-section, trial-banner, bottom-cta (11 files)
**E2E (12 specs):** homepage, contact (Playwright, need running app to execute)

## To Get Fully Running
1. Set up Neon DB → `DATABASE_URL` in `.env.local`
2. `pnpm prisma migrate dev --name init && pnpm prisma db seed`
3. Resend API key → `.env.local`
4. Upstash Redis keys → `.env.local`
5. Restore full API route implementations (in git history, search for "stub API routes")
6. Replace `static-data` imports with DB queries
7. Remove `@ts-nocheck` / `require()` workaround from `db.ts`
8. Get logo redrawn as proper vector SVG (current one has embedded raster)
9. Gate or remove `/preview` page for production
10. Tighten CSP (replace `unsafe-inline` with nonces)
11. Review CSP allowances for production — prefer exact Clerk/Facebook origins over wildcards
12. Switch Clerk from Development to Production mode
13. Rename font exports in `fonts.ts` (`dmSerifDisplay` → `heading`, `inter` → `body`)

## Repo
- **GitHub:** github.com/sgk94/masterchotkd
- **Hosting:** Vercel (auto-deploys from main)
- **Logo:** `public/images/logo.svg`
