# Master Cho's Taekwondo — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium public website for Master Cho's Taekwondo with class scheduling, online booking, and authenticated student resources — replacing their Foxspin-hosted site.

**Architecture:** Next.js 15 App Router with Server Components, PostgreSQL via Prisma, Clerk auth for student resources, Tailwind CSS v4 for styling. Nestig-inspired editorial design with Master Cho's brand colors (red/blue/black/gold). Mobile-first, 95+ Lighthouse target.

**Tech Stack:** Next.js 15, TypeScript (strict), Tailwind CSS v4, Prisma, Neon Postgres, Clerk, Framer Motion, Embla Carousel, Zod, Resend, Vitest, Playwright

**Design Reference:** nestig.com — editorial layout, serif+sans-serif typography, generous whitespace, rounded corners. Screenshot at `www.nestig.com__ref=godly.png`.

---

## File Structure

```
masterchotkd/
├── .env.local                          # Environment variables (Clerk, Neon, Resend keys)
├── .env.example                        # Template for env vars
├── .gitignore
├── next.config.ts                      # Next.js config (PPR, images)
├── tsconfig.json
├── package.json
├── prisma/
│   ├── schema.prisma                   # Database schema
│   └── seed.ts                         # Seed data (programs, schedules, testimonials)
├── public/
│   ├── fonts/                          # Self-hosted fonts (fallback)
│   ├── images/                         # Static images, placeholders
│   └── videos/                         # Hero video
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout (fonts, nav, footer, metadata)
│   │   ├── page.tsx                    # Homepage
│   │   ├── about/page.tsx
│   │   ├── programs/
│   │   │   ├── page.tsx                # Programs overview
│   │   │   └── [slug]/page.tsx         # Dynamic program detail
│   │   ├── schedule/page.tsx           # Class schedule + booking
│   │   ├── reviews/page.tsx            # Testimonials / Wall of Love
│   │   ├── contact/page.tsx            # Contact form
│   │   ├── special-offer/page.tsx      # Trial landing page
│   │   ├── students/
│   │   │   ├── layout.tsx              # Clerk-protected layout
│   │   │   ├── page.tsx                # Student hub
│   │   │   ├── curriculum/page.tsx
│   │   │   ├── forms/page.tsx
│   │   │   └── resources/page.tsx
│   │   └── api/
│   │       ├── contact/route.ts        # Contact form submission
│   │       ├── trial/route.ts          # Trial request submission
│   │       └── booking/route.ts        # Class booking submission
│   ├── components/
│   │   ├── layout/
│   │   │   ├── navbar.tsx              # Desktop + mobile nav
│   │   │   ├── footer.tsx              # Site footer
│   │   │   └── mobile-menu.tsx         # Hamburger slide-in menu
│   │   ├── home/
│   │   │   ├── hero.tsx                # Video hero section
│   │   │   ├── programs-grid.tsx       # 2x2 program cards
│   │   │   ├── trial-banner.tsx        # Red gradient CTA
│   │   │   ├── values-section.tsx      # 3-column values
│   │   │   ├── testimonials.tsx        # Dark testimonial section
│   │   │   ├── gallery.tsx             # Photo gallery with lightbox
│   │   │   └── bottom-cta.tsx          # Final CTA
│   │   ├── ui/
│   │   │   ├── button.tsx              # Button variants (primary, outline, gold)
│   │   │   └── lightbox.tsx            # Image lightbox modal
│   │   ├── forms/
│   │   │   ├── contact-form.tsx        # Contact page form
│   │   │   ├── trial-form.tsx          # Trial request form
│   │   │   ├── booking-form.tsx        # Class booking form
│   │   │   └── form-field.tsx          # Reusable form field
│   │   └── schedule/
│   │       ├── schedule-grid.tsx       # Weekly schedule display
│   │       └── schedule-client.tsx     # Client wrapper for booking interaction
│   ├── lib/
│   │   ├── db.ts                       # Prisma client singleton
│   │   ├── server-env.ts               # Zod server env validation
│   │   ├── client-env.ts               # Zod client env validation
│   │   ├── fonts.ts                    # next/font config
│   │   ├── metadata.ts                 # Shared metadata helpers
│   │   ├── email.ts                    # Resend email helpers
│   │   ├── rate-limit.ts               # Rate limiting helper
│   │   └── sanitize.ts                 # HTML sanitization for emails
│   ├── schemas/
│   │   ├── contact.ts                  # Contact form Zod schema
│   │   ├── trial.ts                    # Trial request Zod schema
│   │   └── booking.ts                  # Booking Zod schema
│   └── types/
│       └── index.ts                    # Shared TypeScript types
├── tests/
│   ├── setup.ts                        # Test setup (jest-dom)
│   ├── unit/
│   │   └── schemas/
│   │       ├── contact.test.ts
│   │       ├── trial.test.ts
│   │       └── booking.test.ts
│   ├── components/
│   │   ├── navbar.test.tsx
│   │   ├── hero.test.tsx
│   │   └── contact-form.test.tsx
│   └── e2e/
│       ├── homepage.spec.ts
│       ├── contact.spec.ts
│       └── programs.spec.ts
├── .github/
│   └── workflows/
│       └── ci.yml                      # Lint, test, Lighthouse CI
├── lighthouserc.json                   # Lighthouse CI config
├── playwright.config.ts
└── vitest.config.ts
```

---

## Task 1: Project Scaffolding & Configuration

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `.env.example`, `.env.local`, `.gitignore`, `vitest.config.ts`, `src/lib/server-env.ts`, `src/lib/client-env.ts`, `src/lib/rate-limit.ts`, `src/lib/sanitize.ts`, `src/lib/fonts.ts`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /Users/shawnkim/code/masterchotkd
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm --skip-install
```

Select: Yes to all defaults. This creates the base Next.js 15 project.

- [ ] **Step 2: Install dependencies**

```bash
pnpm add @clerk/nextjs prisma @prisma/client zod framer-motion embla-carousel-react embla-carousel-autoplay resend @upstash/ratelimit @upstash/redis sanitize-html
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @playwright/test eslint-config-prettier prettier @types/sanitize-html
```

- [ ] **Step 3: Create `.env.example`**

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Database
DATABASE_URL=

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=noreply@masterchostaekwondo.com

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Upstash Redis (rate limiting)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

- [ ] **Step 4: Create `.env.local`** with placeholder values (copy from `.env.example`, fill in later)

- [ ] **Step 5: Create Zod server env validation at `src/lib/server-env.ts`**

```typescript
import { z } from "zod";

const serverEnvSchema = z.object({
  CLERK_SECRET_KEY: z.string().min(1),
  DATABASE_URL: z.string().url(),
  RESEND_API_KEY: z.string().min(1),
  RESEND_FROM_EMAIL: z.string().email(),
});

export const serverEnv = serverEnvSchema.parse(process.env);
```

- [ ] **Step 5b: Create Zod client env validation at `src/lib/client-env.ts`**

```typescript
import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
});

export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});
```

- [ ] **Step 6: Create font configuration at `src/lib/fonts.ts`**

```typescript
import { DM_Serif_Display, Inter } from "next/font/google";

export const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
```

- [ ] **Step 7: Create rate-limit helper at `src/lib/rate-limit.ts`**

```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  analytics: true,
});

export async function checkRateLimit(identifier: string): Promise<{ success: boolean }> {
  const result = await ratelimit.limit(identifier);
  return { success: result.success };
}
```

- [ ] **Step 8: Create sanitize helper at `src/lib/sanitize.ts`**

```typescript
import sanitizeHtml from "sanitize-html";

export function sanitize(dirty: string): string {
  return sanitizeHtml(dirty, { allowedTags: [], allowedAttributes: {} });
}
```

- [ ] **Step 9: Update `next.config.ts`**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      ],
    },
  ],
};

export default nextConfig;
```

- [ ] **Step 10: Create `vitest.config.ts`**

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}"],
    coverage: {
      reporter: ["text", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/app/**/layout.tsx", "src/app/**/loading.tsx"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

- [ ] **Step 11: Create test setup at `tests/setup.ts`**

```typescript
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 12: Update `.gitignore`**

Append to existing `.gitignore`:

```
.env.local
.superpowers/
```

- [ ] **Step 13: Verify project runs**

```bash
pnpm dev
```

Expected: Next.js dev server starts on http://localhost:3000 with no errors.

- [ ] **Step 14: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold Next.js 15 project with Tailwind, Clerk, Prisma, Vitest config"
```

---

## Task 2: Database Schema & Seed Data

**Files:**
- Create: `prisma/schema.prisma`, `prisma/seed.ts`, `src/lib/db.ts`

- [ ] **Step 1: Initialize Prisma**

```bash
pnpm prisma init
```

- [ ] **Step 2: Write database schema at `prisma/schema.prisma`**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Program {
  id          String          @id @default(uuid())
  name        String
  slug        String          @unique
  description String
  ageRange    String
  imageUrl    String          @default("")
  order       Int             @default(0)
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt
  schedules   ClassSchedule[]

  @@map("programs")
}

model ClassSchedule {
  id         String         @id @default(uuid())
  programId  String
  program    Program        @relation(fields: [programId], references: [id])
  dayOfWeek  Int
  startTime  String
  endTime    String
  instructor String
  capacity   Int
  createdAt  DateTime       @default(now())
  updatedAt  DateTime       @updatedAt
  bookings   ClassBooking[]

  @@index([programId])
  @@map("class_schedules")
}

model ClassBooking {
  id         String        @id @default(uuid())
  scheduleId String
  schedule   ClassSchedule @relation(fields: [scheduleId], references: [id])
  name       String
  email      String
  phone      String
  date       DateTime
  createdAt  DateTime      @default(now())

  @@unique([scheduleId, email, date])
  @@index([scheduleId])
  @@map("class_bookings")
}

model Testimonial {
  id        String   @id @default(uuid())
  name      String
  rating    Int
  text      String
  featured  Boolean  @default(false)
  order     Int      @default(0)
  createdAt DateTime @default(now())

  @@index([featured, order])
  @@map("testimonials")
}

model ContactSubmission {
  id        String   @id @default(uuid())
  name      String
  email     String
  phone     String   @default("")
  message   String
  createdAt DateTime @default(now())

  @@map("contact_submissions")
}

model TrialRequest {
  id        String            @id @default(uuid())
  name      String
  email     String
  phone     String
  status    TrialRequestStatus @default(PENDING)
  createdAt DateTime          @default(now())

  @@map("trial_requests")
}

enum TrialRequestStatus {
  PENDING
  CONTACTED
  ENROLLED
  DECLINED
}
```

- [ ] **Step 3: Create Prisma client singleton at `src/lib/db.ts`**

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
```

- [ ] **Step 4: Create seed data at `prisma/seed.ts`**

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  // Programs
  const tinyTigers = await prisma.program.upsert({
    where: { slug: "tiny-tigers" },
    update: {},
    create: {
      name: "Tiny Tigers",
      slug: "tiny-tigers",
      description:
        "Designed for our youngest students in mind, this program focuses on teaching foundational life skills accompanied by listening, following directions, and self-confidence.",
      ageRange: "Ages 4-6",
      order: 1,
    },
  });

  const blackBeltClub = await prisma.program.upsert({
    where: { slug: "black-belt-club" },
    update: {},
    create: {
      name: "Black Belt Club",
      slug: "black-belt-club",
      description:
        "Designed for students committed to mastering Taekwondo, our standard program offers up to three classes per week, allowing students to fully immerse themselves in the art and progress at an accelerated pace.",
      ageRange: "All ages",
      order: 2,
    },
  });

  const leadershipClub = await prisma.program.upsert({
    where: { slug: "leadership-club" },
    update: {},
    create: {
      name: "Leadership Club",
      slug: "leadership-club",
      description:
        "For those looking to gain a deeper understanding and immersion in Taekwondo. Grand Master Cho believes one of the most effective ways to learn is by experiencing and teaching — firsthand.",
      ageRange: "Advanced students",
      order: 3,
    },
  });

  const competitionTeam = await prisma.program.upsert({
    where: { slug: "competition-team" },
    update: {},
    create: {
      name: "Competition Team",
      slug: "competition-team",
      description:
        "For dedicated athletes who want to compete at local, regional, and national tournaments. Focused training on sparring, forms, and breaking techniques.",
      ageRange: "Tournament athletes",
      order: 4,
    },
  });

  // Sample class schedules
  await prisma.classSchedule.createMany({
    data: [
      { programId: tinyTigers.id, dayOfWeek: 1, startTime: "16:00", endTime: "16:45", instructor: "Master Cho", capacity: 15 },
      { programId: tinyTigers.id, dayOfWeek: 3, startTime: "16:00", endTime: "16:45", instructor: "Master Cho", capacity: 15 },
      { programId: blackBeltClub.id, dayOfWeek: 1, startTime: "17:00", endTime: "18:00", instructor: "Master Cho", capacity: 25 },
      { programId: blackBeltClub.id, dayOfWeek: 3, startTime: "17:00", endTime: "18:00", instructor: "Master Cho", capacity: 25 },
      { programId: blackBeltClub.id, dayOfWeek: 5, startTime: "17:00", endTime: "18:00", instructor: "Master Cho", capacity: 25 },
      { programId: leadershipClub.id, dayOfWeek: 2, startTime: "18:00", endTime: "19:00", instructor: "Master Cho", capacity: 20 },
      { programId: leadershipClub.id, dayOfWeek: 4, startTime: "18:00", endTime: "19:00", instructor: "Master Cho", capacity: 20 },
      { programId: competitionTeam.id, dayOfWeek: 6, startTime: "10:00", endTime: "12:00", instructor: "Master Cho", capacity: 15 },
    ],
    skipDuplicates: true,
  });

  // Testimonials from current site
  await prisma.testimonial.createMany({
    data: [
      { name: "Christina Michelle", rating: 5, text: "Great for kids and great discipline! Great instructors as well.", featured: true, order: 1 },
      { name: "Louis Good", rating: 5, text: "Chief Master Cho is a excellent and patient instructor that runs a fantastic school!", featured: true, order: 2 },
      { name: "Julana Phan", rating: 5, text: "Great instructor. If you want your kid to learn confident, self-defense & discipline. Good place to go.", featured: true, order: 3 },
    ],
    skipDuplicates: true,
  });

  console.log("Seed data created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

- [ ] **Step 5: Add seed script to `package.json`**

Add to `package.json` scripts:

```json
"prisma": {
  "seed": "tsx prisma/seed.ts"
}
```

And install tsx:

```bash
pnpm add -D tsx
```

- [ ] **Step 6: Generate Prisma client and run migration**

```bash
pnpm prisma migrate dev --name init
```

Expected: Migration created, Prisma client generated.

- [ ] **Step 7: Run seed**

```bash
pnpm prisma db seed
```

Expected: "Seed data created successfully"

- [ ] **Step 8: Commit**

```bash
git add prisma/ src/lib/db.ts package.json pnpm-lock.yaml
git commit -m "feat: add database schema with programs, schedules, bookings, testimonials"
```

---

## Task 3: Shared Types & Validation Schemas

**Files:**
- Create: `src/types/index.ts`, `src/schemas/contact.ts`, `src/schemas/trial.ts`, `src/schemas/booking.ts`
- Test: `tests/unit/schemas/contact.test.ts`, `tests/unit/schemas/trial.test.ts`, `tests/unit/schemas/booking.test.ts`

- [ ] **Step 1: Create shared types at `src/types/index.ts`**

```typescript
export type NavLink = {
  label: string;
  href: string;
};

export type Program = {
  id: string;
  name: string;
  slug: string;
  description: string;
  ageRange: string;
  imageUrl: string;
  order: number;
};

export type ScheduleSlot = {
  id: string;
  programId: string;
  programName: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  instructor: string;
  capacity: number;
  currentBookings: number;
};

export type Testimonial = {
  id: string;
  name: string;
  rating: number;
  text: string;
};

export const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Schedule", href: "/schedule" },
  { label: "Reviews", href: "/reviews" },
  { label: "Students", href: "/students" },
  { label: "Contact", href: "/contact" },
];
```

- [ ] **Step 2: Write failing tests for contact schema**

Create `tests/unit/schemas/contact.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { contactSchema } from "@/schemas/contact";

describe("contactSchema", () => {
  it("validates a complete valid submission", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      phone: "425-555-1234",
      message: "I'm interested in classes for my child.",
    });
    expect(result.success).toBe(true);
  });

  it("allows phone to be empty", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      phone: "",
      message: "I'm interested in classes.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects name shorter than 2 chars", () => {
    const result = contactSchema.safeParse({
      name: "J",
      email: "john@example.com",
      phone: "",
      message: "I'm interested in classes.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "not-an-email",
      phone: "",
      message: "I'm interested in classes.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects message shorter than 10 chars", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      phone: "",
      message: "Hi",
    });
    expect(result.success).toBe(false);
  });

  it("rejects name exceeding max length", () => {
    const result = contactSchema.safeParse({
      name: "A".repeat(101),
      email: "john@example.com",
      phone: "",
      message: "I'm interested in classes.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects message exceeding max length", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      phone: "",
      message: "A".repeat(2001),
    });
    expect(result.success).toBe(false);
  });

  it("rejects phone with invalid characters", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      phone: "abc-not-a-phone",
      message: "I'm interested in classes.",
    });
    expect(result.success).toBe(false);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

```bash
pnpm vitest run tests/unit/schemas/contact.test.ts
```

Expected: FAIL — cannot find module `@/schemas/contact`

- [ ] **Step 4: Implement contact schema at `src/schemas/contact.ts`**

```typescript
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(254),
  phone: z.string().max(20).regex(/^[\d\s\-\+\(\)]*$/, "Invalid phone format").optional().or(z.literal("")),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

- [ ] **Step 5: Run test to verify it passes**

```bash
pnpm vitest run tests/unit/schemas/contact.test.ts
```

Expected: All 5 tests PASS.

- [ ] **Step 6: Write failing tests for trial schema**

Create `tests/unit/schemas/trial.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { trialSchema } from "@/schemas/trial";

describe("trialSchema", () => {
  it("validates a complete valid submission", () => {
    const result = trialSchema.safeParse({
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "425-555-5678",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = trialSchema.safeParse({
      name: "",
      email: "jane@example.com",
      phone: "425-555-5678",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = trialSchema.safeParse({
      name: "Jane Smith",
      email: "bad",
      phone: "425-555-5678",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty phone", () => {
    const result = trialSchema.safeParse({
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects name exceeding max length", () => {
    const result = trialSchema.safeParse({
      name: "A".repeat(101),
      email: "jane@example.com",
      phone: "425-555-5678",
    });
    expect(result.success).toBe(false);
  });

  it("rejects phone with invalid characters", () => {
    const result = trialSchema.safeParse({
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "abc-not-a-phone",
    });
    expect(result.success).toBe(false);
  });

  it("rejects phone exceeding max length", () => {
    const result = trialSchema.safeParse({
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "1".repeat(21),
    });
    expect(result.success).toBe(false);
  });
});
```

- [ ] **Step 7: Run test to verify it fails**

```bash
pnpm vitest run tests/unit/schemas/trial.test.ts
```

Expected: FAIL — cannot find module `@/schemas/trial`

- [ ] **Step 8: Implement trial schema at `src/schemas/trial.ts`**

```typescript
import { z } from "zod";

export const trialSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(254),
  phone: z.string().trim().min(1, "Phone number is required").max(20).regex(/^[\d\s\-\+\(\)]+$/, "Invalid phone format"),
});

export type TrialFormData = z.infer<typeof trialSchema>;
```

- [ ] **Step 9: Run test to verify it passes**

```bash
pnpm vitest run tests/unit/schemas/trial.test.ts
```

Expected: All 4 tests PASS.

- [ ] **Step 10: Write failing tests for booking schema**

Create `tests/unit/schemas/booking.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { bookingSchema } from "@/schemas/booking";

describe("bookingSchema", () => {
  it("validates a complete valid booking", () => {
    const result = bookingSchema.safeParse({
      name: "Parent Name",
      email: "parent@example.com",
      phone: "425-555-9999",
      scheduleId: "550e8400-e29b-41d4-a716-446655440000",
      date: "2026-04-10",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = bookingSchema.safeParse({
      name: "",
      email: "parent@example.com",
      phone: "425-555-9999",
      scheduleId: "550e8400-e29b-41d4-a716-446655440000",
      date: "2026-04-10",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid scheduleId", () => {
    const result = bookingSchema.safeParse({
      name: "Parent Name",
      email: "parent@example.com",
      phone: "425-555-9999",
      scheduleId: "",
      date: "2026-04-10",
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing email", () => {
    const result = bookingSchema.safeParse({
      name: "Parent Name",
      phone: "425-555-9999",
      scheduleId: "550e8400-e29b-41d4-a716-446655440000",
      date: "2026-04-10",
    });
    expect(result.success).toBe(false);
  });

  it("rejects name exceeding max length", () => {
    const result = bookingSchema.safeParse({
      name: "A".repeat(101),
      email: "parent@example.com",
      phone: "425-555-9999",
      scheduleId: "550e8400-e29b-41d4-a716-446655440000",
      date: "2026-04-10",
    });
    expect(result.success).toBe(false);
  });

  it("rejects phone with invalid characters", () => {
    const result = bookingSchema.safeParse({
      name: "Parent Name",
      email: "parent@example.com",
      phone: "abc-not-a-phone",
      scheduleId: "550e8400-e29b-41d4-a716-446655440000",
      date: "2026-04-10",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid date format", () => {
    const result = bookingSchema.safeParse({
      name: "Parent Name",
      email: "parent@example.com",
      phone: "425-555-9999",
      scheduleId: "550e8400-e29b-41d4-a716-446655440000",
      date: "not-a-date",
    });
    expect(result.success).toBe(false);
  });
});
```

- [ ] **Step 11: Run test to verify it fails**

```bash
pnpm vitest run tests/unit/schemas/booking.test.ts
```

Expected: FAIL — cannot find module `@/schemas/booking`

- [ ] **Step 12: Implement booking schema at `src/schemas/booking.ts`**

```typescript
import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(254),
  phone: z.string().trim().min(1, "Phone number is required").max(20).regex(/^[\d\s\-\+\(\)]+$/, "Invalid phone format"),
  scheduleId: z.string().uuid("Invalid class selection"),
  date: z.string().date("Invalid date"),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
```

- [ ] **Step 13: Run all schema tests**

```bash
pnpm vitest run tests/unit/schemas/
```

Expected: All 13 tests PASS.

- [ ] **Step 14: Commit**

```bash
git add src/types/ src/schemas/ tests/unit/schemas/
git commit -m "feat: add shared types and Zod validation schemas with tests"
```

---

## Task 4: Root Layout, Fonts & Metadata

**Files:**
- Create: `src/lib/metadata.ts`, `src/components/layout/navbar.tsx`, `src/components/layout/mobile-menu.tsx`, `src/components/layout/footer.tsx`, `src/components/ui/button.tsx`
- Modify: `src/app/layout.tsx`, `src/app/globals.css`

- [ ] **Step 1: Create metadata helpers at `src/lib/metadata.ts`**

```typescript
import type { Metadata } from "next";

const SITE_NAME = "Master Cho's Taekwondo";
const SITE_DESCRIPTION =
  "Lynnwood's best martial arts program. Making a difference, one belt at a time. Classes for all ages.";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://masterchostaekwondo.com";

export function createMetadata(overrides: Partial<Metadata> = {}): Metadata {
  const title = overrides.title
    ? `${overrides.title} | ${SITE_NAME}`
    : SITE_NAME;
  const description =
    (overrides.description as string) ?? SITE_DESCRIPTION;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      ...(overrides.openGraph as Record<string, unknown>),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...overrides,
  };
}
```

- [ ] **Step 2: Create Button component at `src/components/ui/button.tsx`**

```tsx
import Link from "next/link";
import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline" | "gold" | "white";

type ButtonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
} & (
  | ({ href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className">)
  | ({ href?: never } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">)
);

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-brand-red text-white hover:bg-red-700 transition-colors",
  outline: "border-2 border-white text-white hover:bg-white/10 transition-colors",
  gold: "bg-brand-gold text-white hover:bg-yellow-600 transition-colors",
  white: "bg-white text-brand-red hover:bg-gray-100 transition-colors font-semibold",
};

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps): React.ReactElement {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-button text-sm font-medium min-h-[44px] min-w-[44px]";
  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return <Link href={href} className={styles} {...rest}>{children}</Link>;
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return <button className={styles} {...buttonProps}>{children}</button>;
}
```

- [ ] **Step 3: Create Navbar at `src/components/layout/navbar.tsx`**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/types";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";

export function Navbar(): React.ReactElement {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-brand-black sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-heading text-xl font-bold text-brand-gold">
          MASTER CHO&apos;S
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Button variant="primary" href="/special-offer">
            Special Offer
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex h-11 w-11 items-center justify-center text-white md:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </nav>
  );
}
```

- [ ] **Step 4: Create MobileMenu at `src/components/layout/mobile-menu.tsx`**

```tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/types";
import { Button } from "@/components/ui/button";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps): React.ReactElement {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 flex h-full w-4/5 max-w-sm flex-col bg-brand-black p-8"
          >
            <button
              onClick={onClose}
              className="mb-8 self-end text-white"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="font-heading text-2xl text-white transition-colors hover:text-brand-gold"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-auto">
              <Button variant="primary" href="/special-offer" className="w-full">
                Special Offer
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 5: Create Footer at `src/components/layout/footer.tsx`**

```tsx
import Link from "next/link";
import { NAV_LINKS } from "@/types";

export function Footer(): React.ReactElement {
  return (
    <footer className="bg-brand-black text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h4 className="mb-4 text-sm font-semibold text-brand-gold">Navigation</h4>
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-brand-gold">Master Cho&apos;s Taekwondo</h4>
          <p className="text-sm text-white/70 leading-relaxed">
            Making a difference, one belt at a time. Lynnwood&apos;s best martial arts program since 1999.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-brand-gold">Follow Us</h4>
          <ul className="flex flex-col gap-2">
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">Instagram</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-brand-gold">Our Location</h4>
          <address className="text-sm not-italic text-white/70 leading-relaxed">
            Master Cho&apos;s Taekwondo<br />
            3221 184th St SW STE 100<br />
            Lynnwood, WA 98037
          </address>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-white/40">
        &copy; {new Date().getFullYear()} Master Cho&apos;s Taekwondo. All rights reserved.
      </div>
    </footer>
  );
}
```

- [ ] **Step 6: Update `src/app/globals.css`**

```css
@import "tailwindcss";

@theme {
  --color-brand-red: #c41e2a;
  --color-brand-blue: #1a1a6e;
  --color-brand-black: #1a1a2e;
  --color-brand-gold: #c4a44a;
  --color-brand-white: #faf8f5;
  --color-brand-cream: #f0ebe4;
  --color-brand-sand: #e8e0d4;
  --color-brand-taupe: #d4c5b0;
  --font-family-heading: var(--font-heading), Georgia, serif;
  --font-family-body: var(--font-body), system-ui, sans-serif;
  --radius-card: 16px;
  --radius-button: 8px;
}

body {
  font-family: var(--font-family-body);
  color: var(--color-brand-black);
  background-color: var(--color-brand-white);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-family-heading);
}
```

- [ ] **Step 7: Update root layout at `src/app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dmSerifDisplay, inter } from "@/lib/fonts";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = createMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <ClerkProvider>
      <html lang="en" className={`${dmSerifDisplay.variable} ${inter.variable}`}>
        <body className="font-body antialiased">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
```

- [ ] **Step 8: Verify the app renders with nav and footer**

```bash
pnpm dev
```

Expected: App loads at localhost:3000 with dark navy navbar and footer.

- [ ] **Step 9: Commit**

```bash
git add src/app/ src/components/ src/lib/metadata.ts
git commit -m "feat: add root layout with navbar, mobile menu, footer, fonts, and brand colors"
```

---

## Task 5: Homepage — Hero Section

**Files:**
- Create: `src/components/home/hero.tsx`, `public/images/`, `public/videos/`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Hero component at `src/components/home/hero.tsx`**

```tsx
import { Button } from "@/components/ui/button";

export function Hero(): React.ReactElement {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-brand-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/60 to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20">
        <div className="max-w-xl">
          <h1 className="font-heading text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            Making a Difference, One Belt at a Time
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-white/80 sm:text-xl">
            Experience top-notch martial arts and character development at Lynnwood&apos;s best program.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button variant="primary" href="/special-offer">Request Info</Button>
            <Button variant="outline" href="/schedule">View Schedule</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create placeholder assets**

```bash
mkdir -p /Users/shawnkim/code/masterchotkd/public/images
mkdir -p /Users/shawnkim/code/masterchotkd/public/videos
touch /Users/shawnkim/code/masterchotkd/public/images/.gitkeep
touch /Users/shawnkim/code/masterchotkd/public/videos/.gitkeep
```

- [ ] **Step 3: Update homepage at `src/app/page.tsx`**

```tsx
import { Hero } from "@/components/home/hero";

export default function HomePage(): React.ReactElement {
  return <Hero />;
}
```

- [ ] **Step 4: Verify hero renders**

```bash
pnpm dev
```

Expected: Homepage shows hero with gradient, heading, buttons.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/hero.tsx src/app/page.tsx public/
git commit -m "feat: add homepage hero section with video background"
```

---

## Task 6: Homepage — Programs Grid, Trial Banner, Values

**Files:**
- Create: `src/components/home/programs-grid.tsx`, `src/components/home/trial-banner.tsx`, `src/components/home/values-section.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create ProgramsGrid at `src/components/home/programs-grid.tsx`**

```tsx
import Link from "next/link";

const programs = [
  { name: "Tiny Tigers", slug: "tiny-tigers", subtitle: "Ages 4-6" },
  { name: "Black Belt Club", slug: "black-belt-club", subtitle: "All ages" },
  { name: "Leadership Club", slug: "leadership-club", subtitle: "Advanced students" },
  { name: "Competition Team", slug: "competition-team", subtitle: "Tournament athletes" },
];

export function ProgramsGrid(): React.ReactElement {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <h2 className="font-heading text-3xl text-brand-black sm:text-4xl">Our Programs</h2>
      <p className="mt-2 text-brand-black/60">Find the right fit for every age and skill level</p>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {programs.map((program) => (
          <Link
            key={program.slug}
            href={`/programs/${program.slug}`}
            className="group relative flex h-64 items-end overflow-hidden rounded-card bg-brand-sand p-6 transition-transform hover:scale-[1.02]"
          >
            <div className="absolute inset-0 bg-brand-sand transition-transform group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/50 to-transparent" />
            <div className="relative z-10">
              <h3 className="font-heading text-2xl text-white">{program.name}</h3>
              <p className="mt-1 text-sm text-white/80">{program.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create TrialBanner at `src/components/home/trial-banner.tsx`**

```tsx
import { Button } from "@/components/ui/button";

export function TrialBanner(): React.ReactElement {
  return (
    <section className="mx-auto max-w-7xl px-6">
      <div className="flex flex-col items-center gap-6 rounded-card bg-gradient-to-r from-brand-red to-[#8b1520] p-8 sm:flex-row sm:p-12">
        <div className="flex-1 text-center sm:text-left">
          <h2 className="font-heading text-2xl text-white sm:text-3xl">Special Introductory Trial</h2>
          <p className="mt-2 text-white/90">4 weeks of taekwondo classes for just $70. Try at no risk.</p>
          <div className="mt-6"><Button variant="white" href="/special-offer">Get Started</Button></div>
        </div>
        <div className="hidden h-40 w-56 items-center justify-center rounded-xl bg-white/15 text-sm text-white/60 sm:flex">Trial Photo</div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create ValuesSection at `src/components/home/values-section.tsx`**

```tsx
const values = [
  { icon: "★", title: "Loyalty & Respect", description: "25+ years teaching self-defense and confidence through traditional Taekwondo." },
  { icon: "♥", title: "Home, School & Family", description: "Teaching life skills that build confident, responsible members of the community." },
  { icon: "◆", title: "Discipline & Growth", description: "Emphasizing balance in all things, encouraging personal growth at every level." },
];

export function ValuesSection(): React.ReactElement {
  return (
    <section className="px-6 py-16 text-center lg:py-24">
      <h2 className="font-heading text-3xl text-brand-black sm:text-4xl">Dedicated to an Exceptional Experience</h2>
      <p className="mt-2 text-brand-black/60">The best in the Lynnwood area</p>
      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
        {values.map((value) => (
          <div key={value.title} className="rounded-card bg-brand-cream p-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold text-xl text-white">{value.icon}</div>
            <h3 className="mt-4 font-heading text-lg">{value.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-black/60">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Update homepage**

```tsx
import { Hero } from "@/components/home/hero";
import { ProgramsGrid } from "@/components/home/programs-grid";
import { TrialBanner } from "@/components/home/trial-banner";
import { ValuesSection } from "@/components/home/values-section";

export default function HomePage(): React.ReactElement {
  return (
    <>
      <Hero />
      <ProgramsGrid />
      <TrialBanner />
      <ValuesSection />
    </>
  );
}
```

- [ ] **Step 5: Verify** — `pnpm dev`, check all sections render.

- [ ] **Step 6: Commit**

```bash
git add src/components/home/ src/app/page.tsx
git commit -m "feat: add programs grid, trial banner, and values section to homepage"
```

---

## Task 7: Homepage — Testimonials, Gallery, Bottom CTA

**Files:**
- Create: `src/components/home/testimonials.tsx`, `src/components/home/gallery.tsx`, `src/components/home/bottom-cta.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Testimonials at `src/components/home/testimonials.tsx`**

```tsx
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";

export async function Testimonials(): Promise<React.ReactElement> {
  const testimonials = await db.testimonial.findMany({
    where: { featured: true },
    orderBy: { order: "asc" },
    take: 3,
  });

  return (
    <section className="bg-brand-black px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-brand-gold">Success Stories</p>
          <h2 className="mt-2 font-heading text-3xl text-white sm:text-4xl">Real People, Real Results</h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.id} className="rounded-xl bg-white/[0.08] p-6">
              <div className="text-brand-gold">{"★".repeat(t.rating)}</div>
              <p className="mt-3 text-sm leading-relaxed text-white/90">&ldquo;{t.text}&rdquo;</p>
              <p className="mt-4 text-sm text-brand-gold">— {t.name}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="outline" href="/reviews">See Wall of Love</Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create Gallery at `src/components/home/gallery.tsx`**

```tsx
"use client";

import { useState } from "react";

const galleryItems = [
  { alt: "Taekwondo class in action" },
  { alt: "Students practicing forms" },
  { alt: "Belt promotion ceremony" },
  { alt: "Master Cho teaching" },
];

export function Gallery(): React.ReactElement {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <h2 className="text-center font-heading text-3xl text-brand-red sm:text-4xl">
        Visit Master Cho&apos;s Taekwondo
      </h2>
      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {galleryItems.map((img, index) => (
          <button
            key={img.alt}
            onClick={() => setLightboxIndex(index)}
            className="relative aspect-square overflow-hidden rounded-xl bg-brand-sand transition-transform hover:scale-[1.02]"
          >
            <div className="flex h-full w-full items-center justify-center text-sm text-brand-black/40">
              Gallery {index + 1}
            </div>
          </button>
        ))}
      </div>
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setLightboxIndex(null)}>
          <button className="absolute right-4 top-4 text-2xl text-white" onClick={() => setLightboxIndex(null)} aria-label="Close lightbox">✕</button>
          <div className="flex h-[80vh] w-full max-w-4xl items-center justify-center rounded-xl bg-brand-sand text-brand-black/40">
            Gallery {lightboxIndex + 1} — Full Size
          </div>
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 3: Create BottomCta at `src/components/home/bottom-cta.tsx`**

```tsx
import { Button } from "@/components/ui/button";

export function BottomCta(): React.ReactElement {
  return (
    <section className="bg-brand-cream px-6 py-16 text-center">
      <h2 className="font-heading text-2xl text-brand-black sm:text-3xl">Special Introductory Trial</h2>
      <p className="mt-2 text-brand-black/60">4 weeks of taekwondo classes for just $70</p>
      <div className="mt-6"><Button variant="primary" href="/special-offer">Request More Information</Button></div>
    </section>
  );
}
```

- [ ] **Step 4: Update homepage with all sections**

```tsx
import { Hero } from "@/components/home/hero";
import { ProgramsGrid } from "@/components/home/programs-grid";
import { TrialBanner } from "@/components/home/trial-banner";
import { ValuesSection } from "@/components/home/values-section";
import { Testimonials } from "@/components/home/testimonials";
import { Gallery } from "@/components/home/gallery";
import { BottomCta } from "@/components/home/bottom-cta";

export default function HomePage(): React.ReactElement {
  return (
    <>
      <Hero />
      <ProgramsGrid />
      <TrialBanner />
      <ValuesSection />
      <Testimonials />
      <Gallery />
      <BottomCta />
    </>
  );
}
```

- [ ] **Step 5: Verify** — `pnpm dev`, all 9 homepage sections render.

- [ ] **Step 6: Commit**

```bash
git add src/components/home/ src/app/page.tsx
git commit -m "feat: complete homepage with testimonials, gallery, and bottom CTA"
```

---

## Task 8: Programs Pages

**Files:**
- Create: `src/app/programs/page.tsx`, `src/app/programs/[slug]/page.tsx`

- [ ] **Step 1: Create Programs overview at `src/app/programs/page.tsx`**

```tsx
import Link from "next/link";
import { db } from "@/lib/db";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Programs",
  description: "Explore our martial arts programs for all ages.",
});

export default async function ProgramsPage(): Promise<React.ReactElement> {
  const programs = await db.program.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <h1 className="font-heading text-4xl text-brand-black sm:text-5xl">Our Programs</h1>
      <p className="mt-3 max-w-2xl text-lg text-brand-black/60">
        From our youngest students to competitive athletes, we have a program for every stage of your martial arts journey.
      </p>
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {programs.map((program) => (
          <Link key={program.slug} href={`/programs/${program.slug}`} className="group overflow-hidden rounded-card bg-brand-cream transition-transform hover:scale-[1.01]">
            <div className="h-56 bg-brand-sand" />
            <div className="p-6">
              <h2 className="font-heading text-2xl text-brand-black group-hover:text-brand-red transition-colors">{program.name}</h2>
              <p className="mt-1 text-sm font-medium text-brand-gold">{program.ageRange}</p>
              <p className="mt-3 text-sm leading-relaxed text-brand-black/60">{program.description}</p>
              <span className="mt-4 inline-block text-sm font-medium text-brand-red">Learn More →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create dynamic program detail at `src/app/programs/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { createMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

type ProgramPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ProgramPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = await db.program.findUnique({ where: { slug } });
  if (!program) return {};
  return createMetadata({ title: program.name, description: program.description });
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const programs = await db.program.findMany({ select: { slug: true } });
  return programs.map((p) => ({ slug: p.slug }));
}

export default async function ProgramPage({ params }: ProgramPageProps): Promise<React.ReactElement> {
  const { slug } = await params;
  const program = await db.program.findUnique({
    where: { slug },
    include: { schedules: { orderBy: { dayOfWeek: "asc" } } },
  });
  if (!program) notFound();

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="h-72 flex-1 rounded-card bg-brand-sand lg:h-96" />
        <div className="flex-1">
          <p className="text-sm font-medium text-brand-gold">{program.ageRange}</p>
          <h1 className="mt-2 font-heading text-4xl text-brand-black sm:text-5xl">{program.name}</h1>
          <p className="mt-4 text-lg leading-relaxed text-brand-black/70">{program.description}</p>
          <div className="mt-8 flex gap-4">
            <Button variant="primary" href="/special-offer">Get Started</Button>
            <Button variant="outline" href="/schedule" className="border-brand-black text-brand-black hover:bg-brand-black/5">View Schedule</Button>
          </div>
        </div>
      </div>
      {program.schedules.length > 0 && (
        <div className="mt-16">
          <h2 className="font-heading text-2xl text-brand-black">Class Schedule</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {program.schedules.map((schedule) => (
              <div key={schedule.id} className="rounded-xl bg-brand-cream p-5">
                <p className="font-medium text-brand-black">{dayNames[schedule.dayOfWeek]}</p>
                <p className="mt-1 text-sm text-brand-black/60">{schedule.startTime} – {schedule.endTime}</p>
                <p className="mt-1 text-sm text-brand-gold">{schedule.instructor}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Verify** — visit `/programs` and `/programs/tiny-tigers`.

- [ ] **Step 4: Commit**

```bash
git add src/app/programs/
git commit -m "feat: add programs overview and dynamic detail pages"
```

---

## Task 9: Schedule Page with Booking

**Files:**
- Create: `src/lib/email.ts`, `src/components/forms/form-field.tsx`, `src/components/schedule/schedule-grid.tsx`, `src/components/schedule/schedule-client.tsx`, `src/components/forms/booking-form.tsx`, `src/app/schedule/page.tsx`, `src/app/api/booking/route.ts`

- [ ] **Step 1: Create email helper at `src/lib/email.ts`**

```typescript
import { Resend } from "resend";
import { serverEnv } from "@/lib/server-env";

const resend = new Resend(serverEnv.RESEND_API_KEY);

type SendEmailParams = { to: string; subject: string; html: string };

export async function sendEmail({ to, subject, html }: SendEmailParams): Promise<void> {
  await resend.emails.send({ from: serverEnv.RESEND_FROM_EMAIL, to, subject, html });
}
```

- [ ] **Step 2: Create FormField at `src/components/forms/form-field.tsx`**

```tsx
import { type InputHTMLAttributes } from "react";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
  label: string;
  error?: string;
  as?: "input" | "textarea";
};

export function FormField({ label, error, as = "input", id, ...props }: FormFieldProps): React.ReactElement {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  const baseStyles = "w-full rounded-button border border-brand-taupe bg-white px-4 py-3 text-sm text-brand-black placeholder:text-brand-black/40 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue min-h-[44px]";

  return (
    <div>
      <label htmlFor={fieldId} className="mb-1 block text-sm font-medium text-brand-black">{label}</label>
      {as === "textarea" ? (
        <textarea id={fieldId} className={`${baseStyles} min-h-[120px]`} {...(props as InputHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input id={fieldId} className={baseStyles} {...(props as InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {error && <p className="mt-1 text-xs text-brand-red">{error}</p>}
    </div>
  );
}
```

- [ ] **Step 3: Create ScheduleGrid at `src/components/schedule/schedule-grid.tsx`**

```tsx
import type { ScheduleSlot } from "@/types";
import { DAYS_OF_WEEK } from "@/types";

type ScheduleGridProps = { slots: ScheduleSlot[]; onBook: (slot: ScheduleSlot) => void };

export function ScheduleGrid({ slots, onBook }: ScheduleGridProps): React.ReactElement {
  const days = [1, 2, 3, 4, 5, 6, 0];
  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[700px] grid-cols-7 gap-2">
        {days.map((day) => (
          <div key={day} className="p-3 text-center text-sm font-semibold text-brand-black">{DAYS_OF_WEEK[day]}</div>
        ))}
        {days.map((day) => {
          const daySlots = slots.filter((s) => s.dayOfWeek === day);
          return (
            <div key={day} className="flex flex-col gap-2">
              {daySlots.length === 0 ? (
                <div className="rounded-xl bg-brand-cream/50 p-3 text-center text-xs text-brand-black/30">—</div>
              ) : (
                daySlots.map((slot) => (
                  <button key={slot.id} onClick={() => onBook(slot)} className="rounded-xl bg-brand-cream p-3 text-left transition-colors hover:bg-brand-sand">
                    <p className="text-xs font-semibold text-brand-blue">{slot.programName}</p>
                    <p className="mt-1 text-xs text-brand-black/60">{slot.startTime} – {slot.endTime}</p>
                    <p className="mt-1 text-xs text-brand-gold">{slot.instructor}</p>
                    <p className="mt-1 text-xs text-brand-black/40">{slot.currentBookings}/{slot.capacity} spots</p>
                  </button>
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create BookingForm at `src/components/forms/booking-form.tsx`**

```tsx
"use client";

import { useState } from "react";
import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { bookingSchema } from "@/schemas/booking";
import type { ScheduleSlot } from "@/types";

type BookingFormProps = { slot: ScheduleSlot; onClose: () => void };

export function BookingForm({ slot, onClose }: BookingFormProps): React.ReactElement {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = { name: formData.get("name") as string, email: formData.get("email") as string, phone: formData.get("phone") as string, scheduleId: slot.id };
    const result = bookingSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => { if (err.path[0]) fieldErrors[err.path[0] as string] = err.message; });
      setErrors(fieldErrors);
      setSubmitting(false);
      return;
    }
    const response = await fetch("/api/booking", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(result.data) });
    if (response.ok) { setSuccess(true); } else { const body = await response.json(); setErrors({ form: body.error ?? "Something went wrong." }); }
    setSubmitting(false);
  }

  if (success) {
    return (
      <div className="text-center">
        <h3 className="font-heading text-2xl text-brand-black">Booking Confirmed!</h3>
        <p className="mt-2 text-brand-black/60">You&apos;re booked for {slot.programName}. Check your email for confirmation.</p>
        <div className="mt-6"><Button onClick={onClose}>Close</Button></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="font-heading text-xl text-brand-black">Book: {slot.programName}</h3>
      <p className="text-sm text-brand-black/60">{slot.startTime} – {slot.endTime} · {slot.instructor}</p>
      <FormField label="Name" name="name" required error={errors.name} placeholder="Your name" />
      <FormField label="Email" name="email" type="email" required error={errors.email} placeholder="your@email.com" />
      <FormField label="Phone" name="phone" type="tel" required error={errors.phone} placeholder="425-555-1234" />
      {errors.form && <p className="text-sm text-brand-red">{errors.form}</p>}
      <div className="mt-2 flex gap-3">
        <Button type="submit" disabled={submitting}>{submitting ? "Booking..." : "Book Class"}</Button>
        <Button type="button" variant="outline" onClick={onClose} className="border-brand-black text-brand-black hover:bg-brand-black/5">Cancel</Button>
      </div>
    </form>
  );
}
```

- [ ] **Step 5: Create booking API at `src/app/api/booking/route.ts`**

```typescript
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { bookingSchema } from "@/schemas/booking";
import { sendEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import { sanitize } from "@/lib/sanitize";

export async function POST(request: Request): Promise<NextResponse> {
  // Origin check
  const headersList = await headers();
  const origin = headersList.get("origin");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  if (origin && !siteUrl.startsWith(origin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Rate limit by IP
  const ip = headersList.get("x-forwarded-for") ?? "anonymous";
  const { success } = await checkRateLimit(`booking:${ip}`);
  if (!success) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = bookingSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid form data", details: result.error.flatten() }, { status: 400 });
  }

  const { name, email, phone, scheduleId, date } = result.data;
  const bookingDate = new Date(date);

  try {
    const schedule = await db.$transaction(async (tx) => {
      const sched = await tx.classSchedule.findUnique({
        where: { id: scheduleId },
        include: { program: true },
      });
      if (!sched) throw new Error("NOT_FOUND");

      const bookingCount = await tx.classBooking.count({
        where: { scheduleId, date: bookingDate },
      });
      if (bookingCount >= sched.capacity) throw new Error("FULL");

      await tx.classBooking.create({
        data: { scheduleId, name, email, phone, date: bookingDate },
      });

      return sched;
    });

    try {
      await sendEmail({
        to: email,
        subject: `Booking Confirmed — ${schedule.program.name}`,
        html: `<h2>Booking Confirmed!</h2><p>Hi ${sanitize(name)},</p><p>You're booked for <strong>${sanitize(schedule.program.name)}</strong>.</p><p><strong>Time:</strong> ${schedule.startTime} – ${schedule.endTime}</p><p><strong>Instructor:</strong> ${sanitize(schedule.instructor)}</p><p>See you at Master Cho's Taekwondo!</p>`,
      });
    } catch { /* Don't fail booking if email fails */ }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "NOT_FOUND") return NextResponse.json({ error: "Class not found" }, { status: 404 });
      if (error.message === "FULL") return NextResponse.json({ error: "This class is full" }, { status: 409 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

- [ ] **Step 6: Create Schedule page (Server Component) at `src/app/schedule/page.tsx`**

```tsx
import { Suspense } from "react";
import { db } from "@/lib/db";
import { createMetadata } from "@/lib/metadata";
import { ScheduleClient } from "@/components/schedule/schedule-client";
import type { ScheduleSlot } from "@/types";

export const metadata = createMetadata({ title: "Schedule", description: "View our weekly class schedule and book your spot." });
export const revalidate = 60;

export default async function SchedulePage(): Promise<React.ReactElement> {
  const schedules = await db.classSchedule.findMany({
    include: { program: { select: { name: true } }, _count: { select: { bookings: true } } },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });

  const slots: ScheduleSlot[] = schedules.map((s) => ({
    id: s.id, programId: s.programId, programName: s.program.name,
    dayOfWeek: s.dayOfWeek, startTime: s.startTime, endTime: s.endTime,
    instructor: s.instructor, capacity: s.capacity, currentBookings: s._count.bookings,
  }));

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <h1 className="font-heading text-4xl text-brand-black sm:text-5xl">Class Schedule</h1>
      <p className="mt-3 text-lg text-brand-black/60">Click any class to book your spot</p>
      <div className="mt-10">
        <ScheduleClient slots={slots} />
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Create ScheduleClient at `src/components/schedule/schedule-client.tsx`**

```tsx
"use client";

import { useState } from "react";
import { ScheduleGrid } from "@/components/schedule/schedule-grid";
import { BookingForm } from "@/components/forms/booking-form";
import type { ScheduleSlot } from "@/types";

export function ScheduleClient({ slots }: { slots: ScheduleSlot[] }): React.ReactElement {
  const [selectedSlot, setSelectedSlot] = useState<ScheduleSlot | null>(null);

  return (
    <>
      <ScheduleGrid slots={slots} onBook={setSelectedSlot} />
      {selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-card bg-white p-8">
            <BookingForm slot={selectedSlot} onClose={() => setSelectedSlot(null)} />
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 8: Verify** — visit `/schedule`, click a class, submit booking.

- [ ] **Step 9: Commit**

```bash
git add src/app/schedule/ src/app/api/ src/components/schedule/ src/components/forms/ src/lib/email.ts
git commit -m "feat: add schedule page with booking modal and API routes"
```

---

## Task 10: Contact & Special Offer Pages

**Files:**
- Create: `src/components/forms/contact-form.tsx`, `src/components/forms/trial-form.tsx`, `src/app/contact/page.tsx`, `src/app/special-offer/page.tsx`, `src/app/api/contact/route.ts`, `src/app/api/trial/route.ts`

- [ ] **Step 1: Create contact API at `src/app/api/contact/route.ts`**

```typescript
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { contactSchema } from "@/schemas/contact";
import { sendEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import { sanitize } from "@/lib/sanitize";

export async function POST(request: Request): Promise<NextResponse> {
  // Origin check
  const headersList = await headers();
  const origin = headersList.get("origin");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  if (origin && !siteUrl.startsWith(origin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Rate limit by IP
  const ip = headersList.get("x-forwarded-for") ?? "anonymous";
  const { success } = await checkRateLimit(`contact:${ip}`);
  if (!success) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) return NextResponse.json({ error: "Invalid form data", details: result.error.flatten() }, { status: 400 });

  try {
    await db.contactSubmission.create({ data: result.data });
    try { await sendEmail({ to: result.data.email, subject: "Thanks for contacting Master Cho's Taekwondo", html: `<h2>We received your message!</h2><p>Hi ${sanitize(result.data.name)},</p><p>Thank you for reaching out. We'll get back to you shortly.</p>` }); } catch { /* ok */ }
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

- [ ] **Step 2: Create trial API at `src/app/api/trial/route.ts`**

```typescript
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { trialSchema } from "@/schemas/trial";
import { sendEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import { sanitize } from "@/lib/sanitize";

export async function POST(request: Request): Promise<NextResponse> {
  // Origin check
  const headersList = await headers();
  const origin = headersList.get("origin");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  if (origin && !siteUrl.startsWith(origin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Rate limit by IP
  const ip = headersList.get("x-forwarded-for") ?? "anonymous";
  const { success } = await checkRateLimit(`trial:${ip}`);
  if (!success) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = trialSchema.safeParse(body);
  if (!result.success) return NextResponse.json({ error: "Invalid form data", details: result.error.flatten() }, { status: 400 });

  try {
    await db.trialRequest.create({ data: result.data });
    try { await sendEmail({ to: result.data.email, subject: "Your Introductory Trial — Master Cho's Taekwondo", html: `<h2>Welcome to Master Cho's!</h2><p>Hi ${sanitize(result.data.name)},</p><p>Thank you for your interest in our introductory trial — 4 weeks of classes for just $70!</p><p>We'll be in touch shortly.</p>` }); } catch { /* ok */ }
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

- [ ] **Step 3: Create ContactForm at `src/components/forms/contact-form.tsx`**

```tsx
"use client";

import { useState } from "react";
import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { contactSchema } from "@/schemas/contact";

export function ContactForm(): React.ReactElement {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = { name: formData.get("name") as string, email: formData.get("email") as string, phone: (formData.get("phone") as string) ?? "", message: formData.get("message") as string };
    const result = contactSchema.safeParse(data);
    if (!result.success) { const fe: Record<string, string> = {}; result.error.errors.forEach((err) => { if (err.path[0]) fe[err.path[0] as string] = err.message; }); setErrors(fe); setSubmitting(false); return; }
    const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(result.data) });
    if (response.ok) { setSuccess(true); } else { setErrors({ form: "Something went wrong." }); }
    setSubmitting(false);
  }

  if (success) return <div className="rounded-card bg-brand-cream p-8 text-center"><h3 className="font-heading text-2xl text-brand-black">Message Sent!</h3><p className="mt-2 text-brand-black/60">We&apos;ll get back to you shortly.</p></div>;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField label="Name" name="name" required error={errors.name} placeholder="Your name" />
      <FormField label="Email" name="email" type="email" required error={errors.email} placeholder="your@email.com" />
      <FormField label="Phone" name="phone" type="tel" error={errors.phone} placeholder="425-555-1234 (optional)" />
      <FormField label="Message" name="message" as="textarea" required error={errors.message} placeholder="How can we help you?" />
      {errors.form && <p className="text-sm text-brand-red">{errors.form}</p>}
      <Button type="submit" disabled={submitting}>{submitting ? "Sending..." : "Send Message"}</Button>
    </form>
  );
}
```

- [ ] **Step 4: Create TrialForm at `src/components/forms/trial-form.tsx`**

```tsx
"use client";

import { useState } from "react";
import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { trialSchema } from "@/schemas/trial";

export function TrialForm(): React.ReactElement {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = { name: formData.get("name") as string, email: formData.get("email") as string, phone: formData.get("phone") as string };
    const result = trialSchema.safeParse(data);
    if (!result.success) { const fe: Record<string, string> = {}; result.error.errors.forEach((err) => { if (err.path[0]) fe[err.path[0] as string] = err.message; }); setErrors(fe); setSubmitting(false); return; }
    const response = await fetch("/api/trial", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(result.data) });
    if (response.ok) { setSuccess(true); } else { setErrors({ form: "Something went wrong." }); }
    setSubmitting(false);
  }

  if (success) return <div className="rounded-card bg-brand-cream p-8 text-center"><h3 className="font-heading text-2xl text-brand-black">Request Received!</h3><p className="mt-2 text-brand-black/60">We&apos;ll contact you shortly to set up your trial classes.</p></div>;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField label="Name" name="name" required error={errors.name} placeholder="Your name" />
      <FormField label="Email" name="email" type="email" required error={errors.email} placeholder="your@email.com" />
      <FormField label="Phone" name="phone" type="tel" required error={errors.phone} placeholder="425-555-1234" />
      {errors.form && <p className="text-sm text-brand-red">{errors.form}</p>}
      <Button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Request Trial"}</Button>
    </form>
  );
}
```

- [ ] **Step 5: Create Contact page at `src/app/contact/page.tsx`**

```tsx
import { createMetadata } from "@/lib/metadata";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata = createMetadata({ title: "Contact", description: "Get in touch with Master Cho's Taekwondo." });

export default function ContactPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <h1 className="font-heading text-4xl text-brand-black sm:text-5xl">Contact Us</h1>
          <p className="mt-3 text-lg text-brand-black/60">Have questions? We&apos;d love to hear from you.</p>
          <div className="mt-10 space-y-6">
            <div><h3 className="font-heading text-lg text-brand-black">Location</h3><p className="mt-1 text-brand-black/60">3221 184th St SW STE 100<br />Lynnwood, WA 98037</p></div>
            <div><h3 className="font-heading text-lg text-brand-black">Follow Us</h3><div className="mt-1 flex gap-4"><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:text-brand-red transition-colors">Facebook</a><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:text-brand-red transition-colors">Instagram</a></div></div>
          </div>
        </div>
        <div className="rounded-card bg-brand-cream p-8"><ContactForm /></div>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Create Special Offer page at `src/app/special-offer/page.tsx`**

```tsx
import { createMetadata } from "@/lib/metadata";
import { TrialForm } from "@/components/forms/trial-form";

export const metadata = createMetadata({ title: "Special Offer", description: "Try 4 weeks of taekwondo classes for just $70." });

export default function SpecialOfferPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">Limited Time Offer</p>
          <h1 className="mt-2 font-heading text-4xl text-brand-black sm:text-5xl">Special Introductory Trial</h1>
          <p className="mt-4 text-xl text-brand-black/70">4 weeks of taekwondo classes for just <span className="font-bold text-brand-red">$70</span></p>
          <p className="mt-4 text-brand-black/60 leading-relaxed">Try our Taekwondo classes at no risk. Check out the schedule and kickstart your martial arts journey today.</p>
          <ul className="mt-6 space-y-2 text-brand-black/70">
            <li className="flex items-center gap-2"><span className="text-brand-gold">✓</span> No commitment required</li>
            <li className="flex items-center gap-2"><span className="text-brand-gold">✓</span> All ages welcome</li>
            <li className="flex items-center gap-2"><span className="text-brand-gold">✓</span> Uniform included</li>
          </ul>
        </div>
        <div className="rounded-card bg-brand-cream p-8">
          <h2 className="mb-6 font-heading text-2xl text-brand-black">Request More Information</h2>
          <TrialForm />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Verify** — visit `/contact` and `/special-offer`.

- [ ] **Step 8: Commit**

```bash
git add src/app/contact/ src/app/special-offer/ src/app/api/contact/ src/app/api/trial/ src/components/forms/
git commit -m "feat: add contact and special offer pages with forms and API routes"
```

---

## Task 11: About & Reviews Pages

**Files:**
- Create: `src/app/about/page.tsx`, `src/app/reviews/page.tsx`

- [ ] **Step 1: Create About page at `src/app/about/page.tsx`**

```tsx
import { createMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/button";

export const metadata = createMetadata({ title: "About", description: "Learn about Master Cho's Taekwondo — 25+ years in Lynnwood, WA." });

export default function AboutPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <h1 className="font-heading text-4xl text-brand-black sm:text-5xl">About Master Cho&apos;s</h1>
          <p className="mt-4 text-lg leading-relaxed text-brand-black/70">Master Cho&apos;s Taekwondo has been teaching students for over twenty five years, building confident leaders through the traditional art of Taekwondo.</p>
          <p className="mt-4 text-lg leading-relaxed text-brand-black/70">Taekwondo is an ancient sport, originating in Korea thousands of years ago. It emphasizes balance in all things, and particularly encourages personal growth.</p>
          <div className="mt-8"><Button variant="primary" href="/special-offer">Start Your Journey</Button></div>
        </div>
        <div className="h-80 rounded-card bg-brand-sand lg:h-auto" />
      </div>
      <div className="mt-20 text-center">
        <h2 className="font-heading text-3xl text-brand-black">Our Philosophy</h2>
        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="rounded-card bg-brand-cream p-8"><div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold text-white">★</div><h3 className="font-heading text-lg">Loyalty & Respect</h3><p className="mt-2 text-sm leading-relaxed text-brand-black/60">Teaching students of all ages self-defense and self confidence through the traditional art of Taekwondo.</p></div>
          <div className="rounded-card bg-brand-cream p-8"><div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold text-white">♥</div><h3 className="font-heading text-lg">Home, School & Family</h3><p className="mt-2 text-sm leading-relaxed text-brand-black/60">Our curriculum teaches life skills that help students become confident leaders and responsible members of the community.</p></div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create Reviews page at `src/app/reviews/page.tsx`**

```tsx
import { db } from "@/lib/db";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Reviews", description: "See what students say about Master Cho's Taekwondo." });

export default async function ReviewsPage(): Promise<React.ReactElement> {
  const testimonials = await db.testimonial.findMany({ orderBy: { order: "asc" } });
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">Wall of Love</p>
        <h1 className="mt-2 font-heading text-4xl text-brand-black sm:text-5xl">Real People, Real Results</h1>
        <p className="mt-3 text-lg text-brand-black/60">See what our students and families have to say</p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-card bg-brand-cream p-6">
            <div className="text-brand-gold">{"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</div>
            <p className="mt-3 text-sm leading-relaxed text-brand-black/80">&ldquo;{t.text}&rdquo;</p>
            <p className="mt-4 text-sm font-medium text-brand-gold">— {t.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify** — visit `/about` and `/reviews`.

- [ ] **Step 4: Commit**

```bash
git add src/app/about/ src/app/reviews/
git commit -m "feat: add about and reviews pages"
```

---

## Task 12: Student Resources (Clerk Auth)

**Files:**
- Create: `src/middleware.ts`, `src/app/students/layout.tsx`, `src/app/students/page.tsx`, `src/app/students/curriculum/page.tsx`, `src/app/students/forms/page.tsx`, `src/app/students/resources/page.tsx`

- [ ] **Step 1: Create Clerk middleware at `src/middleware.ts`**

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/students(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) { await auth.protect(); }
});

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"],
};
```

- [ ] **Step 2: Create Students layout at `src/app/students/layout.tsx`**

```tsx
import Link from "next/link";

const studentNavLinks = [
  { label: "Overview", href: "/students" },
  { label: "Curriculum", href: "/students/curriculum" },
  { label: "Forms", href: "/students/forms" },
  { label: "Resources", href: "/students/resources" },
];

export default function StudentsLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <div className="mb-8 flex flex-wrap gap-4 border-b border-brand-taupe pb-4">
        {studentNavLinks.map((link) => (
          <Link key={link.href} href={link.href} className="text-sm font-medium text-brand-black/60 transition-colors hover:text-brand-red">{link.label}</Link>
        ))}
      </div>
      {children}
    </div>
  );
}
```

- [ ] **Step 3a: Create Students hub at `src/app/students/page.tsx`**

```tsx
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Student Resources" });

const resources = [
  { title: "Curriculum", description: "Belt requirements and testing criteria for each rank.", href: "/students/curriculum" },
  { title: "Poomsae Forms", description: "Video library of all forms organized by belt level.", href: "/students/forms" },
  { title: "Resources", description: "Additional training materials and documents.", href: "/students/resources" },
];

export default function StudentsPage(): React.ReactElement {
  return (
    <div>
      <h1 className="font-heading text-4xl text-brand-black">Student Resources</h1>
      <p className="mt-3 text-brand-black/60">Access curriculum guides, practice videos, and training materials.</p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {resources.map((resource) => (
          <Link key={resource.href} href={resource.href} className="group rounded-card bg-brand-cream p-6 transition-colors hover:bg-brand-sand">
            <h2 className="font-heading text-xl text-brand-black group-hover:text-brand-red transition-colors">{resource.title}</h2>
            <p className="mt-2 text-sm text-brand-black/60">{resource.description}</p>
            <span className="mt-4 inline-block text-sm font-medium text-brand-red">View →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3b: Create Curriculum page at `src/app/students/curriculum/page.tsx`**

```tsx
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Curriculum" });

const beltLevels = [
  { belt: "White Belt", color: "#ffffff", border: true, requirements: ["Basic stances", "Front kick", "Low block", "Kibon Il Jang"] },
  { belt: "Yellow Belt", color: "#FFD700", border: false, requirements: ["Middle block", "Roundhouse kick", "Taegeuk Il Jang", "One-step sparring"] },
  { belt: "Green Belt", color: "#228B22", border: false, requirements: ["Side kick", "High block", "Taegeuk Ee Jang", "Self-defense techniques"] },
  { belt: "Blue Belt", color: "#1a1a6e", border: false, requirements: ["Back kick", "Knife hand strike", "Taegeuk Sam Jang", "Board breaking"] },
  { belt: "Red Belt", color: "#c41e2a", border: false, requirements: ["Spinning kicks", "Advanced forms", "Taegeuk Sa Jang", "Sparring combinations"] },
  { belt: "Black Belt", color: "#1a1a2e", border: false, requirements: ["All previous requirements", "Taegeuk Oh Jang through Pal Jang", "Advanced sparring", "Teaching assistance"] },
];

export default function CurriculumPage(): React.ReactElement {
  return (
    <div>
      <h1 className="font-heading text-3xl text-brand-black">Curriculum & Belt Requirements</h1>
      <p className="mt-3 text-brand-black/60">Review the requirements for each belt level.</p>
      <div className="mt-8 space-y-6">
        {beltLevels.map((level) => (
          <div key={level.belt} className="rounded-card bg-brand-cream p-6">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full" style={{ backgroundColor: level.color, border: level.border ? "2px solid #d4c5b0" : "none" }} />
              <h2 className="font-heading text-xl text-brand-black">{level.belt}</h2>
            </div>
            <ul className="mt-3 ml-9 list-disc space-y-1 text-sm text-brand-black/70">
              {level.requirements.map((req) => (<li key={req}>{req}</li>))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3c: Create Forms page at `src/app/students/forms/page.tsx`**

```tsx
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Poomsae Forms" });

const forms = [
  { name: "Kibon Il Jang", level: "White Belt" },
  { name: "Taegeuk Il Jang", level: "Yellow Belt" },
  { name: "Taegeuk Ee Jang", level: "Green Belt" },
  { name: "Taegeuk Sam Jang", level: "Blue Belt" },
  { name: "Taegeuk Sa Jang", level: "Red Belt" },
  { name: "Taegeuk Oh Jang", level: "Red Belt" },
  { name: "Taegeuk Yuk Jang", level: "Red Belt" },
  { name: "Taegeuk Chil Jang", level: "Black Belt" },
  { name: "Taegeuk Pal Jang", level: "Black Belt" },
];

export default function FormsPage(): React.ReactElement {
  return (
    <div>
      <h1 className="font-heading text-3xl text-brand-black">Poomsae Forms</h1>
      <p className="mt-3 text-brand-black/60">Practice videos for each form. Videos load as you scroll.</p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {forms.map((form) => (
          <div key={form.name} className="overflow-hidden rounded-card bg-brand-cream">
            <div className="flex h-48 items-center justify-center bg-brand-sand text-sm text-brand-black/40">Video: {form.name}</div>
            <div className="p-4">
              <h3 className="font-heading text-lg text-brand-black">{form.name}</h3>
              <p className="mt-1 text-xs font-medium text-brand-gold">{form.level}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3d: Create Resources page at `src/app/students/resources/page.tsx`**

```tsx
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Student Resources" });

export default function ResourcesPage(): React.ReactElement {
  return (
    <div>
      <h1 className="font-heading text-3xl text-brand-black">Additional Resources</h1>
      <p className="mt-3 text-brand-black/60">Training materials, terminology guides, and more.</p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-card bg-brand-cream p-6">
          <h2 className="font-heading text-lg text-brand-black">Korean Terminology</h2>
          <p className="mt-2 text-sm text-brand-black/60">Common Korean terms used in Taekwondo training.</p>
        </div>
        <div className="rounded-card bg-brand-cream p-6">
          <h2 className="font-heading text-lg text-brand-black">Training Tips</h2>
          <p className="mt-2 text-sm text-brand-black/60">Guidance for practice at home between classes.</p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verify** — visit `/students` (should redirect to Clerk sign-in).

- [ ] **Step 5: Commit**

```bash
git add src/middleware.ts src/app/students/
git commit -m "feat: add Clerk-protected student resources pages"
```

---

## Task 13: SEO — Sitemap, Robots, Structured Data

**Files:**
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create sitemap at `src/app/sitemap.ts`**

```typescript
import type { MetadataRoute } from "next";
import { db } from "@/lib/db";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://masterchostaekwondo.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const programs = await db.program.findMany({ select: { slug: true, updatedAt: true } });
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/programs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/schedule`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/reviews`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/special-offer`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
  const programPages: MetadataRoute.Sitemap = programs.map((p) => ({ url: `${BASE_URL}/programs/${p.slug}`, lastModified: p.updatedAt, changeFrequency: "monthly" as const, priority: 0.8 }));
  return [...staticPages, ...programPages];
}
```

- [ ] **Step 2: Create robots at `src/app/robots.ts`**

```typescript
import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://masterchostaekwondo.com";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/students/", "/api/"] }, sitemap: `${BASE_URL}/sitemap.xml` };
}
```

- [ ] **Step 3: Add JSON-LD to root layout**

Add a `<script type="application/ld+json">` tag in the layout with LocalBusiness schema data. The structured data is static, trusted content (business name, address) — not user-supplied, so it is safe to render server-side.

- [ ] **Step 4: Verify** — visit `/sitemap.xml` and `/robots.txt`.

- [ ] **Step 5: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts src/app/layout.tsx
git commit -m "feat: add SEO sitemap, robots.txt, and JSON-LD structured data"
```

---

## Task 14: CI/CD — GitHub Actions with Lighthouse

**Files:**
- Create: `.github/workflows/ci.yml`, `lighthouserc.json`

- [ ] **Step 1: Create CI workflow at `.github/workflows/ci.yml`**

Standard workflow: checkout → pnpm setup → install → lint → test with coverage → build → Lighthouse CI.

Lighthouse config at `lighthouserc.json`: performance >= 0.9 (error), accessibility/best-practices/seo >= 0.9 (warn).

- [ ] **Step 2: Commit**

```bash
git add .github/ lighthouserc.json
git commit -m "feat: add GitHub Actions CI with Lighthouse gates"
```

---

## Task 15: Component & E2E Tests

**Files:**
- Create: `tests/components/navbar.test.tsx`, `tests/components/hero.test.tsx`, `tests/components/contact-form.test.tsx`, `tests/e2e/homepage.spec.ts`, `tests/e2e/contact.spec.ts`, `playwright.config.ts`

- [ ] **Step 1: Write component tests**

Navbar: renders logo, all nav links, special offer CTA, mobile menu button.
Hero: renders headline, both CTA buttons, video element with autoplay/muted/loop.
ContactForm: renders all fields, shows validation errors on empty submit.

- [ ] **Step 2: Write E2E tests**

Homepage: all sections visible, navigation to programs and special offer works.
Contact: form renders, validation errors on empty submit.

- [ ] **Step 3: Run all tests**

```bash
pnpm vitest run
pnpm playwright test
```

Expected: All pass.

- [ ] **Step 4: Commit**

```bash
git add tests/ playwright.config.ts
git commit -m "feat: add component and E2E tests"
```

---

## Task 16: Final Verification

- [ ] **Step 1: Run full test suite** — `pnpm vitest run && pnpm playwright test`
- [ ] **Step 2: Run lint** — `pnpm lint`
- [ ] **Step 3: Run production build** — `pnpm build`
- [ ] **Step 4: Manual verification** — all pages, navigation, forms, auth, mobile layout
- [ ] **Step 5: Visual comparison** — screenshot vs Nestig reference, rate accuracy
- [ ] **Step 6: Final commit**

```bash
git add .
git commit -m "chore: final verification pass"
```
