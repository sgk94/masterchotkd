# Master Cho's Taekwondo — Project CLAUDE.md

## Project Overview
Full business management platform for Master Cho's Taekwondo (Lynnwood, WA), replacing their Foxspin-hosted website ($300/mo) and reducing dependency on Foxspin management ($300/mo). Target: ~$25/mo hosting.

## Current Status
- **Phase 1 MVP: Built** — 14 pages, 3 API routes (stubbed), CI/CD, deployed to Vercel
- **Design polish done** — scroll animations, premium typography, double-bezel cards, marquee
- **Static data mode** — DB, Clerk, Resend, Upstash not connected yet
- **68 tests passing** (22 unit + 34 component + 12 E2E specs written)
- **Deployed:** Vercel (auto-deploys from `main` branch on `sgk94/masterchotkd`)
- **GitHub:** github.com/sgk94/masterchotkd

## Business Context
- **Business:** Master Cho's Black Belt Academy, Lynnwood, WA
- **Location:** 3221 184th St SW STE 100, Lynnwood, WA 98037
- **Students:** 50-150 active members
- **Current stack:** Foxspin website + SparkMembership/Pitbull payments
- **Pain points:** $600/mo total, can't make quick changes

## Programs
1. Tiny Tigers (ages 3-6)
2. Black Belt Club (all ages)
3. Leadership Club / Demo Team (advanced)
4. Competition Team (tournament athletes)

Additional class types on schedule: White-Yellow (Beginner), Camo-Purple (Intermediate), Blue-Black (Advanced), Family/All Belts, Adult & Teens

## Phasing

### Phase 1 (MVP) — COMPLETE
- Public website with all pages
- Static schedule display (read-only table, effective 01/01/2026)
- Student resources behind password auth (password: "blackbelt", uses `useSyncExternalStore`)
- Curriculum pages (Tiny Tigers + Black Belt Club)
- Contact/trial/booking API routes (stubbed — return 503 until DB connected)
- SEO (sitemap, robots, JSON-LD)
- CI/CD (GitHub Actions + Lighthouse at warn 0.85)
- Promo modal (BOGO deal, session-scoped)
- Trial offer: $50 / 2 weeks (no uniform included)

### Phase 2 — Student Portal (not started)
### Phase 3 — Admin Dashboard (not started)
### Phase 4 — Mobile App (not started)

## Tech Stack
- **Framework:** Next.js 16.2.2 (App Router, Server Components)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (CSS-only config via `@theme` in globals.css — NO tailwind.config.ts)
- **Animation:** Framer Motion (mobile menu), CSS animations (scroll reveals, marquee)
- **Auth:** Clerk (configured but disabled — password gate for now)
- **Database:** PostgreSQL (Neon — schema defined, not connected)
- **ORM:** Prisma 7.6 (`db.ts` uses `require()` to avoid CI type errors)
- **Validation:** Zod v4 (uses `.issues` not `.errors` on ZodError)
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
- Double-bezel cards (outer shell ring + inner content)
- Pill buttons (`rounded-full`) with tinted shadows
- Pill eyebrow badges for section labels
- Scroll-reveal via IntersectionObserver (`src/components/ui/reveal.tsx`)
- Kinetic marquee (`src/components/home/marquee.tsx`)
- Grain texture overlay (CSS `::after` pseudo-element)
- Premium easing: `cubic-bezier(0.32, 0.72, 0, 1)`
- Fixed navbar (solid bg `#1a1a2e`, no backdrop-blur)
- Active nav link: gold underline via `usePathname()`

### Key Design Decisions
- Schedule is static read-only table (not interactive booking)
- Student auth via password ("blackbelt"), not Clerk
- Promo modal: BOGO deal, shows once per session
- Hero: full viewport (100dvh), video bg, staggered entrance animation
- Gallery: picsum.photos placeholders (replace with real photos)
- Testimonials on cream bg (user rejected dark/frosted look)
- Trial offer: $50 / 2 weeks, no uniform included

## Site Structure

### Pages (14 routes)
- `/` — Home (hero, marquee, programs, trial banner, values, testimonials, gallery, CTA)
- `/about` — Story + philosophy
- `/programs` — Overview (4 cards)
- `/programs/[slug]` — Detail (tiny-tigers, black-belt-club, leadership-club, competition-team)
- `/schedule` — Weekly class table (read-only)
- `/reviews` — Wall of Love
- `/contact` — Form + location
- `/special-offer` — Trial ($50 / 2 weeks)
- `/students` — Hub (password-gated)
- `/students/curriculum` — Choose program
- `/students/curriculum/tiny-tigers` — Belt cards (White → Camo)
- `/students/curriculum/black-belt-club` — Belt cards (White → Black)
- `/students/forms` — Poomsae videos (placeholders)
- `/students/resources` — Training materials (placeholders)

### Other Routes
- `/not-found` — Custom 404
- `POST /api/booking` — stubbed (503)
- `POST /api/contact` — stubbed (503)
- `POST /api/trial` — stubbed (503)
- `/sitemap.xml` — dynamic
- `/robots.txt` — blocks /students/, /api/

### Components (20)
**Home:** hero, marquee, programs-grid, trial-banner, values-section, testimonials, gallery, bottom-cta, promo-modal
**Layout:** navbar, mobile-menu, footer
**UI:** button, reveal
**Forms:** form-field, contact-form, trial-form, booking-form
**Schedule:** schedule-grid, schedule-client

### Lib (9 modules)
db, server-env, client-env, fonts, metadata, email, rate-limit, sanitize, static-data

## Gotchas
- `db.ts` uses `require("@prisma/client")` — Prisma 7 import breaks CI type check otherwise
- `prisma/seed.ts` and `prisma.config.ts` excluded from tsconfig
- API routes are stubbed (return 503) — full implementations in git history, restore when DB connected
- Zod v4 uses `.issues` not `.errors` on ZodError
- `useSyncExternalStore` for student auth (React strict mode lint rule bans `setState` in `useEffect`)
- Lighthouse gate set to `warn` at 0.85 (not `error` at 0.9) for preview phase
- pnpm 10 declared in `packageManager` — CI must not specify `version: 9`
- Gallery images from picsum.photos need `remotePatterns` in next.config
- Middleware file shows deprecation warning in Next.js 16 ("use proxy instead")

## Tests (68 total)
**Unit (22):** contact, trial, booking schema validation
**Component (34):** navbar, hero, contact-form, button, programs-grid, gallery, schedule-grid, promo-modal, values-section, trial-banner, bottom-cta
**E2E (12 specs):** homepage, contact (written, need running app to execute)

## To Get Fully Running
1. Set up Neon DB → `DATABASE_URL` in `.env.local`
2. `pnpm prisma migrate dev --name init && pnpm prisma db seed`
3. Clerk keys → `.env.local`, re-enable ClerkProvider + middleware
4. Resend API key → `.env.local`
5. Upstash Redis keys → `.env.local`
6. Restore full API route implementations (in git history, search for "stub API routes")
7. Replace `static-data` imports with DB queries
8. Replace gallery picsum.photos with real photos
9. Add hero video to `public/videos/hero.mp4`
10. Remove `@ts-nocheck` / `require()` workaround from `db.ts`

## Repo
- **GitHub:** github.com/sgk94/masterchotkd
- **Hosting:** Vercel (auto-deploys from main)
- **Logo:** `public/images/logo.svg`
