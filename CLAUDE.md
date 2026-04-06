# Master Cho's Taekwondo — Project CLAUDE.md

## Project Overview
Full business management platform for Master Cho's Taekwondo (Lynnwood, WA), replacing their Foxspin-hosted website ($300/mo) and reducing dependency on Foxspin management ($300/mo). Target: ~$25/mo hosting.

## Current Status
- **Phase 1 MVP: Built** — all 16 pages, API routes, tests, CI/CD complete
- **Design polish pass done** — scroll animations, premium typography, redesigned components
- **Currently using static data** — DB (Neon), Clerk auth, Resend email, Upstash Redis not yet connected
- **Static export works** — uncomment `output: "export"` in `next.config.ts` and move API routes/middleware/sitemap/robots for static deploy
- **33 tests passing** (22 unit + 11 component)

## Business Context
- **Business:** Master Cho's Black Belt Academy, Lynnwood, WA
- **Location:** 3221 184th St SW STE 100, Lynnwood, WA 98037
- **Students:** 50-150 active members
- **Current stack:** Foxspin-hosted website + SparkMembership/Pitbull for payments
- **Pain points:** Too expensive ($600/mo total), can't make quick changes
- **Social:** Facebook, Instagram

## Programs
1. Tiny Tigers (ages 3-6)
2. Black Belt Club (all ages)
3. Leadership Club / Demo Team (advanced)
4. Competition Team (tournament athletes)

Additional class types: White-Yellow (Beginner), Camo-Purple (Intermediate), Blue-Black (Advanced), Family/All Belts, Adult & Teens

## Phasing

### Phase 1 (MVP) — COMPLETE
- Public website with all pages
- Static schedule display (read-only, matches real schedule effective 01/01/2026)
- Student resources behind password auth (password: "blackbelt")
- Curriculum pages (Tiny Tigers + Black Belt Club)
- Contact form, trial request form, booking API (with rate limiting, CSRF, sanitization)
- SEO (sitemap, robots, JSON-LD)
- CI/CD (GitHub Actions + Lighthouse)
- Promo modal (BOGO deal)

### Phase 2 — Student Portal (not started)
- Individual student accounts via Clerk
- Personal belt rank, attendance history
- Class booking tied to account

### Phase 3 — Admin Dashboard (not started)
- Student management (CRUD, belt promotions, notes)
- Class/schedule management
- Attendance tracking
- SparkMembership integration
- Basic analytics

### Phase 4 — Mobile App (not started)
- Expo/React Native (notifications & events already handled by SparkMembership)

## Tech Stack
- **Framework:** Next.js 16 (App Router, Server Components)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (CSS-only config via `@theme` in globals.css — NO tailwind.config.ts)
- **Animation:** Framer Motion (mobile menu), CSS animations (scroll reveals, marquee)
- **Auth:** Clerk (configured but disabled — using password gate for now)
- **Database:** PostgreSQL (Neon — schema defined, not connected)
- **ORM:** Prisma 7
- **Validation:** Zod v4
- **Email:** Resend (configured, not connected)
- **Rate Limiting:** Upstash Redis + @upstash/ratelimit (configured, not connected)
- **Sanitization:** sanitize-html (for email templates)
- **Hosting:** TBD (Vercel or Netlify)
- **Package manager:** pnpm
- **Testing:** Vitest, React Testing Library, Playwright
- **CI/CD:** GitHub Actions (Lighthouse CI — blocks deploys below 90)

## Design System

### Typography (UPDATED)
- **Headings:** Oswald (condensed, bold, uppercase) — athletic/martial arts feel
- **Body:** Barlow (clean, modern, readable)
- Both loaded via `next/font` in `src/lib/fonts.ts`
- All headings auto-uppercase via `globals.css`

### Brand Colors
| Color       | Hex       | Usage                      |
|-------------|-----------|----------------------------|
| Red         | #c41e2a   | Primary CTAs, accents      |
| Blue        | #1a1a6e   | Headings, nav, depth       |
| Black       | #1a1a2e   | Body text, nav background  |
| Gold        | #c4a44a   | Accents, highlights        |
| Warm White  | #faf8f5   | Backgrounds                |
| Cream       | #f0ebe4   | Section alternates, cards  |
| Sand        | #e8e0d4   | Cards, surfaces            |
| Taupe       | #d4c5b0   | Borders, dividers          |

### Design Language
- Premium/editorial inspired by nestig.com but with athletic energy
- Generous whitespace (py-24 lg:py-32 between sections)
- Double-bezel card treatment (outer shell ring + inner content)
- Pill-shaped eyebrow badges for section labels
- Rounded-full pill buttons with tinted shadows
- Scroll-reveal animations (IntersectionObserver)
- Kinetic marquee ticker between hero and programs
- Grain texture overlay for premium feel
- Smooth scroll, backdrop-blur navbar
- Custom cubic-bezier easing: `cubic-bezier(0.32, 0.72, 0, 1)`

### Key Design Decisions
- Schedule is static/read-only table matching real schedule (not interactive booking grid)
- Student resources use simple password auth ("blackbelt"), not Clerk (for now)
- Promo modal shows BOGO deal on first visit (session-scoped)
- Hero is full viewport height (100dvh) with video background
- Gallery uses picsum.photos placeholders (replace with real photos)
- No dark sections — testimonials on cream background (user didn't like dark/frosted look)

## Site Structure

### Public Pages
- `/` — Home (hero, marquee, programs, trial banner, values, testimonials, gallery, CTA)
- `/about` — Master Cho's story, philosophy
- `/programs` — All programs overview
- `/programs/[slug]` — Program detail (tiny-tigers, black-belt-club, leadership-club, competition-team)
- `/schedule` — Weekly class schedule (read-only table)
- `/reviews` — Testimonials / Wall of Love
- `/contact` — Contact form + location info
- `/special-offer` — Introductory trial ($70 / 4 weeks)

### Password-Protected Pages
- `/students` — Student resources hub
- `/students/curriculum` — Choose Tiny Tigers or Black Belt Club
- `/students/curriculum/tiny-tigers` — Belt requirement cards (White through Camo)
- `/students/curriculum/black-belt-club` — Belt requirements (White through Black Belt)
- `/students/forms` — Poomsae videos (placeholders)
- `/students/resources` — Training materials (placeholders)

### API Routes (require DB connection)
- `POST /api/booking` — class booking with atomic transaction, rate limiting, CSRF
- `POST /api/contact` — contact form submission
- `POST /api/trial` — trial request submission

## Security (implemented in API routes)
- Rate limiting on all public endpoints (Upstash Redis)
- Origin header verification on all POST routes
- HTML sanitization in email templates (sanitize-html)
- Security headers (HSTS, X-Frame-Options, etc.) in next.config.ts
- Atomic booking transactions (Prisma $transaction)
- Unique constraint on bookings (scheduleId + email + date)
- Zod schemas with max lengths, .trim(), phone regex
- Split env validation (server-env.ts / client-env.ts)

## To Get Fully Running
1. Set up Neon database → update `DATABASE_URL` in `.env.local`
2. Run `pnpm prisma migrate dev --name init && pnpm prisma db seed`
3. Get Clerk keys → update `.env.local`
4. Re-enable ClerkProvider in `src/app/layout.tsx`
5. Re-enable Clerk middleware in `src/middleware.ts`
6. Get Resend API key → update `.env.local`
7. Get Upstash Redis keys → update `.env.local`
8. Replace static data imports with DB queries (search for `static-data` imports)
9. Replace gallery picsum.photos with real photos
10. Add real hero video to `public/videos/hero.mp4`
11. Add real logo if not already at `public/images/logo.svg`

## Static Deploy (for design preview)
1. Uncomment `output: "export"` in `next.config.ts`
2. Move `src/app/api/`, `src/middleware.ts`, `src/app/sitemap.ts`, `src/app/robots.ts` temporarily
3. Run `pnpm build` → outputs to `out/`
4. Deploy `out/` to Netlify: `netlify deploy --dir=out --prod`

## Integrations (Phase 2-3)
- **SparkMembership / Pitbull Processing** — keep for payments (integrate, don't replace)
- **Clerk** — auth for student portal + admin dashboard

## Design Reference
- **Nestig-inspired layout:** nestig.com (editorial feel, generous whitespace)
- **Reference screenshot:** `www.nestig.com__ref=godly.png`
- **Current site screenshot:** `masterchostaekwondo.com_.png`
- **Logo:** `public/images/logo.svg`
