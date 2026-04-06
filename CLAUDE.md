# Master Cho's Taekwondo — Project CLAUDE.md

## Project Overview
A full business management platform for Master Cho's Taekwondo (Lynnwood, WA), replacing their current Foxspin-hosted website ($300/mo) and reducing dependency on Foxspin management ($300/mo). Target: ~$25/mo hosting.

## Business Context
- **Business:** Master Cho's Black Belt Academy, Lynnwood, WA
- **Location:** Single location — 3221 184th St SW STE 100, Lynnwood, WA 98037
- **Students:** 50-150 active members
- **Current stack:** Foxspin-hosted website + SparkMembership/Pitbull for payments
- **Pain points:** Too expensive ($600/mo total), can't make quick changes
- **Social:** Facebook, Instagram

## Programs
1. Tiny Tigers (ages 4-6)
2. Black Belt Club (all ages)
3. Leadership Club (advanced)
4. Competition Team

## Phasing

### Phase 1 (MVP) — Public Website + Class Scheduling
- Replace Foxspin-hosted site
- All public pages: Home, About, Programs (4), Schedule, Reviews, Contact, Special Offer
- Class schedule display with online booking
- Student resources behind Clerk auth (curriculum, poomsae videos, belt requirements)
- Mobile-first, responsive design
- Nestig-style design language with Master Cho's brand colors

### Phase 2 — Student Portal
- Individual student accounts
- Personal belt rank, attendance history
- Class booking tied to account

### Phase 3 — Admin Dashboard
- Student management (CRUD, belt promotions, notes)
- Class/schedule management
- Attendance tracking
- SparkMembership integration
- Basic analytics

### Phase 4 — Mobile App
- Expo/React Native (notifications & events already handled by SparkMembership)

## Tech Stack
- **Framework:** Next.js 15 (App Router, Server Components, PPR)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Carousels:** Embla Carousel
- **Auth:** Clerk
- **Database:** PostgreSQL (Neon — serverless)
- **ORM:** Prisma
- **Validation:** Zod
- **Email:** Resend
- **Media storage:** Uploadthing or Cloudflare R2
- **Hosting:** Vercel (~$20/mo)
- **Package manager:** pnpm
- **Rate Limiting:** Upstash Redis + @upstash/ratelimit
- **Sanitization:** sanitize-html (email templates)
- **Testing:** Vitest, React Testing Library, Playwright
- **CI/CD:** GitHub Actions (Lighthouse CI — blocks deploys below 90)
- **Fonts:** DM Serif Display (headings), Inter (body) — via next/font

## Design System

### Brand Colors
| Color       | Hex       | Usage                      |
|-------------|-----------|----------------------------|
| Red         | #c41e2a   | Primary CTAs, accents      |
| Blue        | #1a1a6e   | Headings, nav, depth       |
| Black       | #1a1a2e   | Body text, nav background  |
| Gold        | #c4a44a   | Accents, highlights        |
| Warm White  | #faf8f5   | Backgrounds                |
| Cream       | #f0ebe4   | Section alternates         |
| Sand        | #e8e0d4   | Cards, surfaces            |
| Taupe       | #d4c5b0   | Borders, dividers          |

### Design Language (from Nestig reference)
- Generous whitespace between sections
- Rounded corners (12-16px radius)
- Asymmetric grid layouts
- Large hero images with text overlay
- Smooth scroll animations (Framer Motion)
- Swipeable carousels with dots
- Circular image crops
- Subtle hover transitions
- Warm, inviting backgrounds
- Serif + sans-serif font pairing (editorial feel)

### Master Cho's Adaptations
- Red CTAs (not Nestig navy)
- Gold accents for belt/rank highlights
- Dark navy sections for contrast
- Belt color indicators on programs
- Testimonial cards with star ratings
- Photo gallery with lightbox

### Security Requirements
- Rate limiting on all public API endpoints (Upstash Redis)
- Origin header verification on all POST routes
- HTML sanitization in email templates (sanitize-html)
- Security headers (CSP, HSTS, X-Frame-Options) in next.config.ts
- Atomic booking transactions (Prisma $transaction)
- Unique constraint on bookings (scheduleId + email + date)
- Zod schemas with max lengths, .trim(), phone regex
- Split env validation (server-env.ts / client-env.ts)

### Performance Requirements
- Lighthouse score: 95+ target, 90 minimum (CI blocks below 90)
- Mobile-first Tailwind (design for mobile, scale up)
- Server Components by default, `"use client"` only where needed
- ISR for schedule page (revalidate = 60)
- PPR enabled in next.config.ts
- Suspense boundaries around async Server Components
- Lazy-loaded videos (poomsae forms)
- next/font for zero layout shift
- Touch-friendly (min 44px tap targets)

### Tailwind CSS v4
- NO `tailwind.config.ts` — v4 uses CSS-based config only
- All brand tokens defined in `@theme` block in `globals.css`
- Automatic content detection (no `content` array needed)

## Site Structure (Phase 1)

### Public Pages
- `/` — Home (hero, programs 2x2 grid, trial CTA, values, testimonials, gallery)
- `/about` — Master Cho's story, philosophy, instructors
- `/programs` — All programs overview
- `/programs/tiny-tigers` — Program detail
- `/programs/black-belt-club` — Program detail
- `/programs/leadership-club` — Program detail
- `/programs/competition-team` — Program detail
- `/schedule` — Weekly class schedule + booking
- `/reviews` — Testimonials / Wall of Love
- `/contact` — Contact form, location, hours
- `/special-offer` — Introductory trial ($70 / 4 weeks)

### Authenticated Pages (Clerk)
- `/students` — Student resources hub
- `/students/curriculum` — Belt requirements by rank
- `/students/forms` — Poomsae videos library
- `/students/resources` — Additional materials

### Homepage Sections (top to bottom)
1. Nav — dark navy, gold logo, red "Special Offer" CTA
2. Hero — autoplay muted loop video background, dark overlay gradient, headline, dual CTAs, poster image fallback (~20% taller than standard, generous vertical space)
3. Programs — 2x2 grid (Tiny Tigers | Black Belt Club, Leadership Club | Competition Team)
4. Trial Banner — red gradient, $70 intro offer CTA
5. Values — 3 pillars with gold icons (Loyalty & Respect, Home/School/Family, Discipline & Growth)
6. Testimonials — dark section, gold stars, real reviews
7. Gallery — 4-column photo grid
8. Bottom CTA — final trial offer
9. Footer — 4-column (nav, logo, socials, location)

## Integrations
- **SparkMembership / Pitbull Processing** — keep for payments (integrate, don't replace)
- **Clerk** — auth for student resources + future student portal

## Design Reference
- **Primary reference:** nestig.com (layout, spacing, editorial feel, typography pairing)
- **Reference image saved:** `masterchotkd/www.nestig.com__ref=godly.png`
- **Current site screenshot:** `masterchotkd/masterchostaekwondo.com_.png`

## Build Process
- Visual feedback loop: screenshot each build, compare against Nestig reference, self-rate accuracy, iterate toward 100%
