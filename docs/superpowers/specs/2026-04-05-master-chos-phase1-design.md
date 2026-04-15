# Master Cho's Taekwondo — Phase 1 Design Spec

## Overview

Replace Master Cho's Foxspin-hosted website ($300/mo) with a custom Next.js application. Phase 1 delivers the public website with class scheduling/booking, cutting hosting costs from ~$600/mo to ~$25/mo.

**Business:** Master Cho's Black Belt Academy, Lynnwood, WA
**Location:** 5031 168th ST SW STE 100, Lynnwood, WA 98037
**Students:** 50-150 active members
**Programs:** Tiny Tigers, Black Belt Club, Leadership Club, Competition Team

## Goals

1. Replace Foxspin-hosted website — save $300/mo immediately
2. Provide class scheduling with online booking
3. Gate student resources (curriculum, poomsae videos) behind auth
4. Deliver a premium, mobile-first design inspired by nestig.com
5. Achieve 95+ Lighthouse performance score

## Non-Goals (Phase 1)

- Individual student dashboards (Phase 2)
- Admin panel for managing students/classes (Phase 3)
- SparkMembership integration (Phase 3)
- Mobile app (Phase 4)
- Replacing SparkMembership/Pitbull for payments (keeping as-is)
- Notifications/event management (handled by SparkMembership)

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 15 | App Router, Server Components, PPR |
| Language | TypeScript | Strict mode, no `any` |
| Styling | Tailwind CSS v4 | Mobile-first utilities |
| Animation | Framer Motion | Scroll animations, transitions |
| Carousels | Embla Carousel | Swipeable, accessible |
| Auth | Clerk | Free tier (10K MAUs) |
| Database | PostgreSQL (Neon) | Serverless, free tier |
| ORM | Prisma | Schema management, migrations |
| Validation | Zod | API boundaries, forms, env vars |
| Email | Resend | Contact form, booking confirmations |
| Media | Uploadthing | Images, poomsae videos (simpler DX, Next.js native) |
| Hosting | Vercel | Pro plan (~$20/mo) |
| Fonts | DM Serif Display + Inter | via next/font, zero layout shift |
| Package Manager | pnpm | — |
| Testing | Vitest, RTL, Playwright | 90% coverage floor |
| CI/CD | GitHub Actions | Lighthouse CI gate (score < 90 blocks deploy) |

### Estimated Monthly Cost

| Service | Cost |
|---------|------|
| Vercel Pro | $20 |
| Neon (free tier) | $0 |
| Clerk (free tier) | $0 |
| Resend (free tier) | $0 |
| Media storage | ~$5 |
| **Total** | **~$25/mo** |

## Design System

### Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Red | `#c41e2a` | Primary CTAs, action buttons |
| Blue | `#1a1a6e` | Headings, nav, depth |
| Black | `#1a1a2e` | Body text, nav background |
| Gold | `#c4a44a` | Accents, highlights, star ratings |
| Warm White | `#faf8f5` | Page backgrounds |
| Cream | `#f0ebe4` | Section alternates |
| Sand | `#e8e0d4` | Cards, surfaces |
| Taupe | `#d4c5b0` | Borders, dividers |

### Typography

- **Headings:** DM Serif Display — elegant, editorial serif
- **Body:** Inter — clean, highly readable sans-serif
- Both loaded via `next/font` for zero layout shift

### Visual Language

Adapted from nestig.com's editorial design:

- Generous whitespace between sections
- Rounded corners (12-16px border radius)
- Asymmetric grid layouts
- Large imagery with text overlays
- Smooth scroll-triggered animations (Framer Motion)
- Swipeable carousels with dot indicators
- Circular image crops where appropriate
- Subtle hover transitions on interactive elements
- Warm, inviting background tones

Master Cho's adaptations:
- Red CTAs (not Nestig's navy)
- Gold accents for belt/rank highlights
- Dark navy sections for visual contrast
- Belt color indicators on program cards
- Star-rated testimonial cards
- Photo gallery with lightbox

### Design Reference

- **Primary:** nestig.com (layout, spacing, editorial feel, typography pairing)
- **Reference screenshot:** `www.nestig.com__ref=godly.png`
- **Current site screenshot:** `masterchostaekwondo.com_.png`

### Build Feedback Loop

After each implementation build:
1. Take a screenshot of the built page
2. Compare against the Nestig reference screenshot
3. Self-rate accuracy of design replication (target: as close to 100% as possible)
4. Iterate on any gaps before moving to the next section

## Site Structure

### Public Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero video, programs grid, trial CTA, values, testimonials, gallery |
| `/about` | About | Master Cho's story, philosophy, instructor bios |
| `/programs` | Programs | Overview of all 4 programs |
| `/programs/tiny-tigers` | Tiny Tigers | Program detail — ages 4-6 |
| `/programs/black-belt-club` | Black Belt Club | Program detail — all ages |
| `/programs/leadership-club` | Leadership Club | Program detail — advanced |
| `/programs/competition-team` | Competition Team | Program detail — tournament athletes |
| `/schedule` | Schedule | Weekly recurring class schedule + online booking |
| `/reviews` | Reviews | Testimonials, Wall of Love |
| `/contact` | Contact | Contact form, location map, hours |
| `/special-offer` | Special Offer | Introductory trial landing page ($70 / 4 weeks) |

### Authenticated Pages (Clerk-gated)

| Route | Page | Description |
|-------|------|-------------|
| `/students` | Student Hub | Student resources landing page |
| `/students/curriculum` | Curriculum | Belt requirements by rank |
| `/students/forms` | Forms | Poomsae video library |
| `/students/resources` | Resources | Additional training materials |

### Navigation

- **Desktop:** Horizontal nav bar — dark navy (`#1a1a2e`) background, gold logo, white links, red "Special Offer" CTA button
- **Mobile:** Hamburger menu with smooth slide-in animation, same color scheme

## Homepage Design

Sections from top to bottom:

### 1. Navigation Bar
Dark navy background, gold "MASTER CHO'S" logo left, nav links right, red "Special Offer" pill button.

### 2. Hero Section
- **Background:** Autoplay muted loop video (`<video autoPlay muted loop playsInline>`)
- **Overlay:** Left-to-right gradient (dark to transparent) for text readability
- **Height:** ~20% taller than standard — generous vertical breathing room
- **Content:** Serif headline ("Making a Difference, One Belt at a Time"), subtitle, two CTAs (red "Request Info" + outlined "View Schedule")
- **Fallback:** Poster image loads first, video lazy loads
- **Video specs:** MP4 (H.264), compressed to ~2-3MB max

### 3. Programs Grid
- 2x2 card grid with hover effects
- Row 1: Tiny Tigers | Black Belt Club
- Row 2: Leadership Club | Competition Team
- Each card: background image, program name (serif), age/description subtitle
- Rounded corners (16px), Nestig-style image cards

### 4. Trial Banner
- Red gradient background (`#c41e2a` → `#8b1520`)
- Headline: "Special Introductory Trial"
- Body: "4 weeks of taekwondo classes for just $70"
- White CTA button: "Get Started"
- Photo placeholder on right

### 5. Values Section
- Centered heading: "Dedicated to an Exceptional Experience"
- 3-column grid of value cards on cream background:
  - Loyalty & Respect (gold circle icon)
  - Home, School & Family (gold circle icon)
  - Discipline & Growth (gold circle icon)
- Each card: icon, serif title, description

### 6. Testimonials
- Dark navy background section
- Gold "SUCCESS STORIES" label, serif heading "Real People, Real Results"
- 3-column grid of review cards (semi-transparent white background)
- Gold star ratings, quote text, reviewer name in gold
- "See Wall of Love" outlined button

### 7. Gallery
- Section heading: "Visit Master Cho's Taekwondo" in red
- 4-column photo grid with rounded corners
- Lightbox on click for full-size viewing

### 8. Bottom CTA
- Cream background, centered
- Final "Special Introductory Trial" push with red CTA button

### 9. Footer
- Dark navy background
- 4-column grid: Navigation links, Logo, Social links (Facebook, Instagram), Location/contact info
- Gold section headers

## Data Model

### `programs`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| name | string | e.g. "Tiny Tigers" |
| slug | string | URL-safe, unique |
| description | text | Program overview |
| ageRange | string | e.g. "Ages 4-6" |
| imageUrl | string | Program card image |
| order | int | Display order |
| createdAt | timestamp | — |
| updatedAt | timestamp | — |

### `class_schedules`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| programId | uuid | FK → programs |
| dayOfWeek | int | 0=Sunday, 6=Saturday |
| startTime | time | e.g. "17:00" |
| endTime | time | e.g. "18:00" |
| instructor | string | Instructor name |
| capacity | int | Max students per class |
| createdAt | timestamp | — |
| updatedAt | timestamp | — |

### `class_bookings`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| scheduleId | uuid | FK → class_schedules |
| name | string | Student/parent name |
| email | string | Contact email |
| phone | string | Contact phone |
| createdAt | timestamp | — |

### `testimonials`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| name | string | Reviewer name |
| rating | int | 1-5 stars |
| text | text | Review content |
| featured | boolean | Show on homepage |
| order | int | Display order |
| createdAt | timestamp | — |

### `contact_submissions`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| name | string | — |
| email | string | — |
| phone | string | Optional |
| message | text | — |
| createdAt | timestamp | — |

### `trial_requests`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| name | string | — |
| email | string | — |
| phone | string | — |
| status | enum | pending, contacted, enrolled, declined |
| createdAt | timestamp | — |

## Performance Requirements

- **Lighthouse score:** 95+ target, 90 minimum (CI blocks deploys below 90)
- **Mobile-first:** Design for mobile, scale up with Tailwind breakpoints
- **Server Components:** Default for all pages, `"use client"` only where interaction is needed
- **ISR:** Schedule page revalidates on a timer (e.g. every 60 seconds)
- **Lazy loading:** Poomsae videos and gallery images load on scroll
- **Font loading:** next/font for zero CLS
- **Video:** Poster image loads first, video lazy loads after critical content
- **Touch targets:** Minimum 44px for all interactive elements
- **PPR:** Partial Prerendering for static shell with streaming dynamic content

## Responsive Design

- **Mobile-first Tailwind** — base styles are mobile, scale up with `sm:`, `md:`, `lg:`
- **Breakpoints:** mobile (default) → tablet (`md: 768px`) → desktop (`lg: 1024px`)
- **Mobile nav:** Hamburger menu with smooth slide-in animation
- **Touch-friendly:** Large tap targets, swipeable carousels
- **Sticky CTA:** "Special Offer" remains accessible during mobile scroll
- **Program grid:** 2x2 on desktop/tablet, stacks to 1 column on mobile
- **Testimonials:** 3-column on desktop, horizontal scroll on mobile
- **Gallery:** 4-column on desktop, 2-column on mobile

## Forms & Validation

All forms validated with Zod at the API boundary:

### Contact Form (`/contact`)
- Name (required, min 2 chars)
- Email (required, valid email)
- Phone (optional, valid phone format)
- Message (required, min 10 chars)
- Sends confirmation via Resend

### Trial Request (`/special-offer`)
- Name (required)
- Email (required, valid email)
- Phone (required, valid phone format)
- Sends confirmation via Resend

### Class Booking (`/schedule`)
- Name (required)
- Email (required, valid email)
- Phone (required, valid phone format)
- Selected class (required, valid scheduleId)
- Checks capacity before confirming
- Sends confirmation via Resend

## SEO

- Semantic HTML throughout
- Open Graph + Twitter Card meta tags on every page
- Structured data (JSON-LD): LocalBusiness, Course (for programs)
- Sitemap.xml auto-generated by Next.js
- robots.txt
- Canonical URLs
- Alt text on all images

## Testing Strategy

- **Unit tests (Vitest):** Zod schemas, utility functions, data transformations
- **Component tests (RTL):** All interactive components (forms, nav, carousel)
- **Integration tests (Vitest):** API routes, form submissions, booking flow
- **E2E tests (Playwright):** Full user flows — homepage load, navigate to program, book a class, submit contact form, access student resources (authenticated)
- **Visual regression:** Screenshot comparison against Nestig reference during build
- **Performance:** Lighthouse CI in GitHub Actions (blocks below 90)
- **Coverage floor:** 90%

## Future Phases (Out of Scope)

### Phase 2 — Student Portal
- Individual student accounts via Clerk
- Personal dashboard: belt rank, attendance history
- Class booking tied to student account

### Phase 3 — Admin Dashboard
- Student CRUD, belt promotions, notes
- Class/schedule management UI
- Attendance tracking
- SparkMembership integration for payment visibility
- Analytics (enrollment trends, attendance rates)

### Phase 4 — Mobile App
- Expo/React Native
- Notifications and events already handled by SparkMembership
