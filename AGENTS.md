# Master Cho's Taekwondo — Project CLAUDE.md

## Agent Rules
- Never modify `CLAUDE.md`. Treat it as read-only project context.
- Put any new agent-specific notes, workflow updates, or working context in `AGENTS.md` instead.

## Project Overview
Full business management platform for Master Cho's Taekwondo (Lynnwood, WA), replacing their Foxspin-hosted website ($300/mo) and reducing dependency on Foxspin management ($300/mo). Target: ~$25/mo hosting.

## Current Status
- **Phase 1 MVP: Built** — deployed to Vercel, Clerk auth live, `/api/contact` wired to Resend (rate-limited via Upstash when configured)
- **Trial + booking flows removed** — schemas, forms, and routes deleted until Phase 2. `/special-offer` now links straight to SparkPages
- **DB not connected** — Neon/Prisma unused; restore via git history in Phase 2
- **See CLAUDE.md for authoritative status and file counts** — this file trails slightly
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
- Student resources behind password auth (password: "blackbelt", uses `useSyncExternalStore`)
- Curriculum pages (Tiny Tigers, Black Belt Club, Color Belt, Weekly Training)
- Contact/trial/booking API routes (stubbed — return 503 until DB connected)
- SEO (sitemap, robots, JSON-LD)
- CI/CD (GitHub Actions + Lighthouse at warn 0.85)
- Promo modal (BOGO deal, session-scoped)
- Trial offer: $50 / 2 weeks (no uniform included)
- Real program + instructor images (JPEG, 2560px wide)
- Security headers: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- Shared form hook (`useFormSubmit`) and Zod field builders
- Mega-menu navbar with dropdowns for Programs (image cards) and Students (list)
- Animated gold neon border on trial banner

### Phase 2 — Student Portal (not started)
### Phase 3 — Admin Dashboard (not started)
### Phase 4 — Mobile App (not started)

## Tech Stack
- **Framework:** Next.js 16.2.2 (App Router, Server Components)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (CSS-only config via `@theme` in globals.css — NO tailwind.config.ts)
- **Animation:** Framer Motion (mobile menu), CSS animations (scroll reveals, marquee, border-spin)
- **Auth:** Clerk (configured but disabled — password gate for now)
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
- Loaded via `next/font` in `src/lib/fonts.ts`
- Auto-uppercase on all headings via `globals.css`

### Brand Colors
| Color | Hex | Usage |
|---|---|---|
| Red | #c41e2a | Primary CTAs |
| Blue | #1a1a6e | Depth, links |
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
- Mega-menu navbar: `rounded-[1.5rem]` container, expands with `grid-template-rows` animation for Programs (image cards layout) and Students (list layout)
- Active nav link: gold underline via `usePathname()`
- Animated gold border: `border-spin` keyframe with conic-gradient + blur glow layer (trial banner)

### Key Design Decisions
- Navbar: Nestig-style mega-menu — Programs dropdown shows link list + 4 image cards, Students shows list + descriptions
- Schedule: premium double-bezel table with dark header, muted color-coded pills, left accent borders
- Student auth via password ("blackbelt"), not Clerk
- Promo modal: BOGO deal, shows once per session
- Hero: full viewport (100dvh), Competition Team image, staggered entrance animation
- Gallery: 4 real dojang photos (uses `(2)` variants to avoid duplicating program grid images)
- Testimonials on cream bg, gold accent "See all reviews" button
- Trial banner: animated gold neon border (spinning conic-gradient, 8s loop, blur glow layer)
- Trial offer: $50 / 2 weeks, no uniform included
- Programs grid: asymmetric bento layout — Tiny Tigers (col-span-7 row-span-2), Competition+Leadership stacked right (col-span-5), Black Belt Club full width (col-span-12)
- About page: alternating left/right instructor photo sections (Grand Master Cho, Master Cho, Instructor Lasala)
- Color Belt Curriculum: card-based layout (3 cards per level) instead of tables
- Weekly Training: timeline cards with stripe color indicators

## Site Structure

### Pages (21 routes)
- `/` — Home (hero, marquee, programs, problem/solution CTA, trial banner, values, testimonials, gallery)
- `/about` — Story + philosophy + instructors (3 alternating photo sections)
- `/programs` — Overview (4 cards with real images)
- `/programs/tiny-tigers` — Full detail: hero, schedule, 7-belt curriculum cards, parent FAQ, CTA
- `/programs/black-belt-club` — Full detail: hero, 3-level schedule grid, 9-belt curriculum cards, FAQ, CTA
- `/programs/leadership-club` — Full detail: hero, schedule, requirements, FAQ, CTA
- `/programs/competition-team` — Full detail: hero, schedule, requirements, FAQ, CTA
- `/programs/[slug]` — Generic fallback (used if no static route matches)
- `/schedule` — Weekly class table (premium redesign with double-bezel)
- `/reviews` — Wall of Love
- `/contact` — Form + location
- `/special-offer` — Trial ($50 / 2 weeks)
- `/students` — Hub (password-gated)
- `/students/curriculum` — Choose program (3 cards: Weekly Training, Tiny Tigers, Color Belt)
- `/students/curriculum/tiny-tigers` — Belt cards (White → Camo)
- `/students/curriculum/black-belt-club` — Belt cards (White → Black) ⚠️ page exists but hidden from hub — review if needed
- `/students/curriculum/color-belt` — Beginner/Intermediate/Advanced cycle breakdown (card-based)
- `/students/curriculum/weekly-training` — 5-week training structure timeline
- `/students/forms` — Poomsae videos (placeholders)
- `/students/resources` — Training materials (placeholders)
- `/preview` — Design exploration (dev-only, should be gated or removed before production)

### Other Routes
- `/not-found` — Custom 404
- `POST /api/contact` — live: Resend notification to `NOTIFY_EMAIL` with `Reply-To` set to the submitter. Returns 400/413/429/500 on the expected failure modes. See CLAUDE.md for the response contract.
- `/sitemap.xml` — dynamic
- `/robots.txt` — blocks /students/, /api/

### Components (23)
**Home:** hero, marquee, programs-grid, trial-banner, values-section, testimonials, gallery, bottom-cta, promo-modal
**Layout:** navbar (with mega-menu), mobile-menu, footer
**UI:** button, reveal, bezel-card, page-container, eyebrow-badge
**Forms:** form-field, contact-form, trial-form, booking-form
**Schedule:** schedule-grid, schedule-client

### Hooks (1)
- `use-form-submit` — shared form submission logic (schema validation, fetch, error mapping)

### Schemas (4)
- `fields.ts` — shared Zod field builders (nameField, emailField, phoneField)
- `contact.ts`, `trial.ts`, `booking.ts` — form schemas using shared fields

### Lib (10 modules)
db, server-env, client-env, fonts, metadata, email, rate-limit, sanitize, static-data, api-security

## Gotchas
- `db.ts` uses `require("@prisma/client")` — Prisma 7 import breaks CI type check otherwise
- `prisma/seed.ts` and `prisma.config.ts` excluded from tsconfig
- API routes are stubbed (return 503) — full implementations in git history, restore when DB connected
- Zod v4 uses `.issues` not `.errors` on ZodError
- `useSyncExternalStore` for student auth (React strict mode lint rule bans `setState` in `useEffect`)
- Lighthouse gate set to `warn` at 0.85 (not `error` at 0.9) for preview phase
- pnpm 10 declared in `packageManager` — CI must not specify `version: 9`
- Hero uses Competition Team image (`/images/Competition-Team.jpg`), picsum.photos still in `remotePatterns` for potential future use
- Middleware file shows deprecation warning in Next.js 16 ("use proxy instead")
- `logo.svg` is 259 KB because it contains embedded raster (base64 PNG) — SVGO can't optimize it, needs vector redraw
- Programs grid order is hardcoded in `gridOrder` array — must match bento layout positions
- `api-security.ts` has `validateOrigin()` and `getClientIp()` ready for when API routes are re-enabled
- CSP allows `unsafe-inline` + `unsafe-eval` for scripts (required by Next.js) — tighten with nonces later
- CSP currently also allows Clerk wildcard domains plus `https://challenges.cloudflare.com` so Clerk JS and CAPTCHA work in dev; before production, tighten these to the minimum exact origins the live auth flow needs
- Navbar mega-menu uses 200ms leave timeout to prevent flicker — `onMouseLeave` only on outer container
- Trial banner `border-spin` animation defined in `globals.css` — uses `transform: rotate()` not `rotate` shorthand
- Button `outline` variant has `border-white/30 text-white` baked in — override with `!` prefix (e.g., testimonials button)

## Images
All in `public/images/` — JPEG format, 2560px wide:
**Programs:** `Tiny-Tigers.jpg`, `Black-Belt-Club.jpg`, `Competition-Team.jpg`, `Leadership_Demo-Team.jpg`
**Gallery:** `Tiny-Tigers-2.jpg`, `Black-Belt-Club-2.jpg`, `Competition-Team-2.jpg`, `Leadership.jpg`
**Instructors:** `GMC.jpg`, `MC.jpg`, `Instructor-Lasala.jpg`
**Other:** `camo-pattern.jpg` (belt swatch), `logo.svg` (259 KB, embedded raster)

## Tests (68 total, 14 test files)
**Unit (6):** contact, trial, booking schema validation (3 files)
**Component (62):** navbar, hero, contact-form, button, programs-grid, gallery, schedule-grid, promo-modal, values-section, trial-banner, bottom-cta (11 files)
**E2E (12 specs):** homepage, contact (Playwright, need running app to execute)

## To Get Fully Running
1. Set up Neon DB → `DATABASE_URL` in `.env.local`
2. `pnpm prisma migrate dev --name init && pnpm prisma db seed`
3. Clerk keys → `.env.local`, re-enable ClerkProvider + middleware
4. Resend API key → `.env.local`
5. Upstash Redis keys → `.env.local`
6. Restore full API route implementations (in git history, search for "stub API routes")
7. Replace `static-data` imports with DB queries
8. Add hero video to `public/videos/hero.mp4`
9. Remove `@ts-nocheck` / `require()` workaround from `db.ts`
10. Get logo redrawn as proper vector SVG (current one has embedded raster)
11. Gate or remove `/preview` page for production
12. Tighten CSP (replace `unsafe-inline` with nonces)
13. Review Clerk/CAPTCHA CSP allowances for production — prefer exact Clerk origins over wildcards and keep only the minimum external auth hosts required

## Repo
- **GitHub:** github.com/sgk94/masterchotkd
- **Hosting:** Vercel (auto-deploys from main)
- **Logo:** `public/images/logo.svg`
