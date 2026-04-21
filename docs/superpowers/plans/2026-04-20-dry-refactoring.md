# DRY Refactoring Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract the shared program detail page template and consolidate inline EyebrowBadge usage — the two biggest DRY violations in the codebase.

**Architecture:** Create a `<ProgramDetailPage>` template component that all 4 program pages compose. Update `<SectionHeader>` and 8+ files to use `<EyebrowBadge>` instead of inline badge CSS.

**Tech Stack:** Next.js 16, React Server Components, Vitest

---

### Task 1: Extract `<ProgramDetailPage>` template component

**Why:** All 4 program detail pages (tiny-tigers, black-belt-club, leadership-club, competition-team) share identical structure: hero (dark card + overlay image + gold eyebrow + h1 + description + 2 buttons), "What to Expect" grid, schedule section, optional requirements section, FAQ accordion, and a bottom CTA block that is byte-for-byte identical across all 4 files.

**Files:**
- Create: `src/components/programs/program-detail-page.tsx`
- Modify: `src/app/(main)/programs/tiny-tigers/page.tsx` (replace with thin data + template)
- Modify: `src/app/(main)/programs/black-belt-club/page.tsx` (replace with thin data + template)
- Modify: `src/app/(main)/programs/leadership-club/page.tsx` (replace with thin data + template)
- Modify: `src/app/(main)/programs/competition-team/page.tsx` (replace with thin data + template)
- Test: `tests/unit/program-detail-page.test.tsx`

- [ ] **Step 1: Define the template's type interface**

Looking at all 4 pages, the template needs these props:

```typescript
type FaqItem = { q: string; a: string };
type WhatToExpectItem = { title: string; description: string };

type ProgramDetailConfig = {
  heroImage: string;
  heroImageAlt: string;
  eyebrowLabel: string;
  title: string;
  description: string;
  whatToExpectHeading: string;
  whatToExpect: WhatToExpectItem[];
  scheduleHeading: string;
  scheduleSubtitle: string;
  schedule: React.ReactNode;
  requirements?: {
    heading: string;
    items: React.ReactNode;
  };
  faqLabel: string;
  faqHeading: string;
  faq: FaqItem[];
  ctaHeading: string;
  ctaDescription: string;
};
```

- [ ] **Step 2: Write the test**

Create `tests/unit/program-detail-page.test.tsx`:

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProgramDetailPage } from "@/components/programs/program-detail-page";

const testConfig = {
  heroImage: "/images/test.jpg",
  heroImageAlt: "Test program",
  eyebrowLabel: "Ages 4-6",
  title: "Test Program",
  description: "A test program description.",
  whatToExpectHeading: "What you'll learn",
  whatToExpect: [
    { title: "Skill 1", description: "Description 1" },
    { title: "Skill 2", description: "Description 2" },
  ],
  scheduleHeading: "Test Schedule",
  scheduleSubtitle: "40 min sessions",
  schedule: <div data-testid="schedule-content">Mon 3:30</div>,
  faqLabel: "FAQ",
  faqHeading: "Common Questions",
  faq: [{ q: "How old?", a: "Ages 4-6." }],
  ctaHeading: "Ready to get started?",
  ctaDescription: "Try 2 weeks for just $49.",
};

describe("ProgramDetailPage", () => {
  it("renders the hero section with title and eyebrow", () => {
    render(<ProgramDetailPage {...testConfig} />);
    expect(screen.getByRole("heading", { level: 1, name: "Test Program" })).toBeDefined();
    expect(screen.getByText("Ages 4-6")).toBeDefined();
  });

  it("renders What to Expect cards", () => {
    render(<ProgramDetailPage {...testConfig} />);
    expect(screen.getByText("Skill 1")).toBeDefined();
    expect(screen.getByText("Skill 2")).toBeDefined();
  });

  it("renders schedule content", () => {
    render(<ProgramDetailPage {...testConfig} />);
    expect(screen.getByTestId("schedule-content")).toBeDefined();
  });

  it("renders FAQ items", () => {
    render(<ProgramDetailPage {...testConfig} />);
    expect(screen.getByText("How old?")).toBeDefined();
    expect(screen.getByText("Ages 4-6.")).toBeDefined();
  });

  it("renders bottom CTA", () => {
    render(<ProgramDetailPage {...testConfig} />);
    expect(screen.getByText("Ready to get started?")).toBeDefined();
    expect(screen.getByRole("link", { name: "Start Your Trial" })).toBeDefined();
  });

  it("renders requirements section when provided", () => {
    render(
      <ProgramDetailPage
        {...testConfig}
        requirements={{
          heading: "Requirements",
          items: <p>Must be Camo belt or higher</p>,
        }}
      />,
    );
    expect(screen.getByText("Requirements")).toBeDefined();
    expect(screen.getByText("Must be Camo belt or higher")).toBeDefined();
  });

  it("does not render requirements section when not provided", () => {
    render(<ProgramDetailPage {...testConfig} />);
    expect(screen.queryByText("Eligibility")).toBeNull();
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

```bash
pnpm vitest run tests/unit/program-detail-page.test.tsx
```

Expected: FAIL — module does not exist.

- [ ] **Step 4: Create `src/components/programs/program-detail-page.tsx`**

```typescript
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { BezelCard } from "@/components/ui/bezel-card";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";

type FaqItem = { q: string; a: string };
type WhatToExpectItem = { title: string; description: string };

type ProgramDetailConfig = {
  heroImage: string;
  heroImageAlt: string;
  eyebrowLabel: string;
  title: string;
  description: string;
  whatToExpectHeading: string;
  whatToExpect: WhatToExpectItem[];
  scheduleHeading: string;
  scheduleSubtitle: string;
  schedule: React.ReactNode;
  requirements?: {
    heading: string;
    items: React.ReactNode;
  };
  faqLabel?: string;
  faqHeading?: string;
  faq: FaqItem[];
  ctaHeading?: string;
  ctaDescription?: string;
};

export function ProgramDetailPage({
  heroImage,
  heroImageAlt,
  eyebrowLabel,
  title,
  description,
  whatToExpectHeading,
  whatToExpect,
  scheduleHeading,
  scheduleSubtitle,
  schedule,
  requirements,
  faqLabel = "FAQ",
  faqHeading = "Common Questions",
  faq,
  ctaHeading = "Ready to get started?",
  ctaDescription = "Try 2 weeks of classes for just $49. No commitment required.",
}: ProgramDetailConfig): React.ReactElement {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-[2rem] bg-brand-black">
        <Image
          src={heroImage}
          alt={heroImageAlt}
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />
        <div className="relative z-10 px-8 pb-10 pt-32 sm:px-12 sm:pb-14 sm:pt-40">
          <EyebrowBadge variant="gold">{eyebrowLabel}</EyebrowBadge>
          <h1 className="mt-5 font-heading text-4xl tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-lg leading-relaxed text-white/60">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="primary" href="/special-offer">Start a 2-Week Trial</Button>
            <Button variant="outline" href="/schedule">View Schedule</Button>
          </div>
        </div>
      </div>

      {/* What to Expect */}
      <div className="mt-20">
        <Reveal delay={0}>
          <EyebrowBadge variant="pill">What to Expect</EyebrowBadge>
          <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
            {whatToExpectHeading}
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {whatToExpect.map((item, i) => (
            <Reveal key={item.title} delay={(i + 1) * 100}>
              <BezelCard className="h-full">
                <div className="flex h-full flex-col p-6">
                  <h3 className="font-heading text-lg text-brand-black">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-black/55">{item.description}</p>
                </div>
              </BezelCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Schedule */}
      <div className="mt-20">
        <Reveal delay={0}>
          <EyebrowBadge variant="pill">Class Times</EyebrowBadge>
          <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
            {scheduleHeading}
          </h2>
          <p className="mt-2 text-sm text-brand-black/40">{scheduleSubtitle}</p>
        </Reveal>
        <Reveal delay={100} className="mt-8">
          {schedule}
        </Reveal>
      </div>

      {/* Requirements (optional) */}
      {requirements && (
        <div className="mt-20">
          <Reveal delay={0}>
            <EyebrowBadge variant="pill">Eligibility</EyebrowBadge>
            <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
              {requirements.heading}
            </h2>
          </Reveal>
          <div className="mt-10">{requirements.items}</div>
        </div>
      )}

      {/* FAQ */}
      <div className="mt-20">
        <Reveal delay={0}>
          <EyebrowBadge variant="pill">{faqLabel}</EyebrowBadge>
          <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
            {faqHeading}
          </h2>
        </Reveal>
        <div className="mt-8 flex flex-col gap-4">
          {faq.map((item, i) => (
            <Reveal key={item.q} delay={(i + 1) * 80}>
              <BezelCard>
                <div className="p-6">
                  <h3 className="font-heading text-base text-brand-black">{item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-black/55">{item.a}</p>
                </div>
              </BezelCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <Reveal delay={0} className="mt-20 text-center">
        <h2 className="font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
          {ctaHeading}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-brand-black/50">{ctaDescription}</p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button variant="primary" href="/special-offer">Start Your Trial</Button>
          <Button variant="outline" href="/contact" className="!border-brand-black !text-brand-black hover:!bg-brand-black/5">Contact Us</Button>
        </div>
      </Reveal>
    </div>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
pnpm vitest run tests/unit/program-detail-page.test.tsx
```

Expected: All 7 tests pass.

- [ ] **Step 6: Rewrite tiny-tigers page to use the template**

Replace `src/app/(main)/programs/tiny-tigers/page.tsx`:

```typescript
import { BezelCard } from "@/components/ui/bezel-card";
import { ProgramDetailPage } from "@/components/programs/program-detail-page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Tiny Tigers",
  description: "Taekwondo for ages 4–6. Fun, age-appropriate classes that build foundational life skills — listening, self-confidence, and respect — through martial arts.",
  path: "/programs/tiny-tigers",
});

const schedule = [
  { day: "Monday", time: "3:30 – 4:10" },
  { day: "Tuesday", time: "4:40 – 5:20" },
  { day: "Wednesday", time: "3:30 – 4:10" },
  { day: "Thursday", time: "4:40 – 5:20" },
  { day: "Friday", time: "4:50 – 5:30" },
];

const whatToExpect = [
  { title: "Fun & Engaging Classes", description: "Age-appropriate drills, games, and activities that keep kids excited while learning real martial arts skills." },
  { title: "Life Skills Development", description: "Listening, following directions, self-confidence, and respect — skills that carry over to school and home." },
  { title: "Positive Milestones", description: "Students stay motivated with clear goals, encouragement, and celebrations that build confidence over time." },
  { title: "Supportive Instruction", description: "Our instructors guide each child with patience and structure so families feel confident from day one." },
];

const faq = [
  { q: "What age is the Tiny Tigers program for?", a: "Ages 4–6. We focus on foundational skills appropriate for young learners." },
  { q: "How many classes per week?", a: "Classes are available Monday through Friday. We recommend attending at least 2–3 times per week for steady progress." },
  { q: "What should my child wear?", a: "A dobok (uniform) is required. Ask at the front desk about purchasing one." },
  { q: "How long does it take to advance belts?", a: "On average 10–20 weeks per belt, depending on attendance, proficiency, and technical understanding." },
  { q: "Does my child need sparring gear?", a: "Not at the Tiny Tigers level. Sparring gear is required starting at Camo belt and higher in the regular program." },
];

export default function TinyTigersPage(): React.ReactElement {
  return (
    <ProgramDetailPage
      heroImage="/images/Tiny-Tigers.jpg"
      heroImageAlt="Tiny Tigers class"
      eyebrowLabel="Ages 4–6"
      title="Tiny Tigers"
      description="Designed for our youngest students, this program focuses on teaching foundational life skills — listening, following directions, and self-confidence — through the art of Taekwondo."
      whatToExpectHeading="A class built for young learners"
      whatToExpect={whatToExpect}
      scheduleHeading="Tiny Tigers Schedule"
      scheduleSubtitle="40-minute classes, Monday – Friday"
      schedule={
        <BezelCard>
          <div className="grid grid-cols-2 gap-px bg-brand-taupe/10 sm:grid-cols-5">
            {schedule.map((s) => (
              <div key={s.day} className="bg-white p-5 text-center">
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-brand-black/35">{s.day}</p>
                <p className="mt-2 font-heading text-lg text-brand-black">{s.time}</p>
              </div>
            ))}
          </div>
        </BezelCard>
      }
      faqLabel="Parent FAQ"
      faq={faq}
      ctaDescription="Try 2 weeks of Tiny Tigers classes for just $49. No commitment required."
    />
  );
}
```

- [ ] **Step 7: Rewrite black-belt-club page**

Replace `src/app/(main)/programs/black-belt-club/page.tsx` with the same pattern. Key differences:
- Has a multi-row schedule table (scheduleRows + days grid with header)
- No requirements section
- Pass the schedule table as JSX to the `schedule` prop

```typescript
import { BezelCard } from "@/components/ui/bezel-card";
import { ProgramDetailPage } from "@/components/programs/program-detail-page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Black Belt Club",
  description: "Master Cho's standard Taekwondo program for all ages. Up to three classes per week covering poomsae, sparring, weapons, breaking, and character development.",
  path: "/programs/black-belt-club",
});

const scheduleRows = [
  { label: "White-Yellow (Beginner)", times: { Monday: "4:10 – 4:50", Tuesday: "6:00 – 6:40", Wednesday: "4:10 – 4:50", Thursday: "6:00 – 6:40", Friday: "4:10 – 4:50" } },
  { label: "Family / All Belts", times: { Monday: "6:10 – 6:50", Tuesday: "7:30 – 8:15", Wednesday: "6:10 – 6:50", Thursday: "7:30 – 8:15", Friday: "5:30 – 6:15" } },
  { label: "Adult & Teens", times: { Monday: "6:50 – 7:30", Wednesday: "6:50 – 7:30", Friday: "5:30 – 6:15" } as Record<string, string> },
];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

const whatToExpect = [
  { title: "Comprehensive Training", description: "Poomsae, sparring, weapons, breaking, and hand techniques — a complete martial arts education." },
  { title: "Character Development", description: "Building discipline, respect, and confidence that extends beyond the dojang." },
  { title: "Structured Advancement", description: "Students grow through consistent training, clear goals, and instructor feedback at every stage." },
  { title: "Flexible Schedule", description: "New students can get started with beginner, family/all belts, and adult & teen classes throughout the week." },
];

const faq = [
  { q: "What age can students join?", a: "All ages are welcome. We group classes by belt level so students train with peers at similar skill levels." },
  { q: "How often should I attend?", a: "We recommend 2-3 classes per week for steady progress. Up to 3 sessions per week are available." },
  { q: "What gear do I need?", a: "A dobok (uniform) is required. Camo belt and higher need their own sparring gear, available at the dojang." },
  { q: "How long to reach Black Belt?", a: "Typically 3-5 years with consistent training. Each belt level takes an average of 10-20 weeks." },
  { q: "Can I compete in tournaments?", a: "Yes! Students interested in competition can join our Competition Team for specialized tournament training." },
];

export default function BlackBeltClubPage(): React.ReactElement {
  return (
    <ProgramDetailPage
      heroImage="/images/Black-Belt-Club.jpg"
      heroImageAlt="Black Belt Club class"
      eyebrowLabel="All Ages"
      title="Black Belt Club"
      description="Designed for students committed to mastering Taekwondo, our standard program offers up to three classes per week, allowing students to fully immerse themselves in the art and progress at an accelerated pace."
      whatToExpectHeading="A complete martial arts education"
      whatToExpect={whatToExpect}
      scheduleHeading="Black Belt Club Schedule"
      scheduleSubtitle="Classes open to new students, based on our current public schedule"
      schedule={
        <BezelCard>
          <div className="grid grid-cols-6 gap-px bg-brand-taupe/10">
            <div className="bg-white p-4" />
            {days.map((day) => (
              <div key={day} className="bg-white p-4 text-center">
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-brand-black/35">{day}</p>
              </div>
            ))}
          </div>
          {scheduleRows.map((row) => (
            <div key={row.label} className="grid grid-cols-6 gap-px bg-brand-taupe/10">
              <div className="flex items-center bg-white p-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-brand-black/50">{row.label}</p>
              </div>
              {days.map((day) => (
                <div key={day} className="bg-white p-4 text-center">
                  <p className="font-heading text-sm text-brand-black">{row.times[day] ?? "—"}</p>
                </div>
              ))}
            </div>
          ))}
        </BezelCard>
      }
      faq={faq}
    />
  );
}
```

- [ ] **Step 8: Rewrite leadership-club page**

Replace `src/app/(main)/programs/leadership-club/page.tsx`. Key differences:
- Has a requirements section (numbered items in BezelCards)
- 3-day schedule grid

```typescript
import { BezelCard } from "@/components/ui/bezel-card";
import { Reveal } from "@/components/ui/reveal";
import { ProgramDetailPage } from "@/components/programs/program-detail-page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Leadership Club",
  description: "Advanced Taekwondo training for dedicated students. Teach, lead, and perform with Master Cho's Leadership Club and Demo Team in Lynnwood, WA.",
  path: "/programs/leadership-club",
});

const schedule = [
  { day: "Tuesday", time: "6:40 – 7:30" },
  { day: "Thursday", time: "6:40 – 7:30" },
  { day: "Saturday", time: "9:00 AM~" },
];

const whatToExpect = [
  { title: "Teaching & Mentorship", description: "Learn by leading. Leadership students assist in teaching younger classes, building communication and responsibility." },
  { title: "Demo Team Training", description: "Perform at events and demonstrations, showcasing advanced techniques and teamwork." },
  { title: "Advanced Techniques", description: "Go beyond standard curriculum with specialized forms, weapons, and breaking techniques." },
  { title: "Character Leadership", description: "Develop the qualities of a true martial arts leader — integrity, humility, and service to others." },
];

const requirements = [
  "Must be an active Black Belt Club member",
  "Must be at Camo belt level or higher",
  "Must demonstrate consistent attendance and positive attitude",
  "Invitation-based — speak with an instructor",
];

const faq = [
  { q: "Who can join Leadership Club?", a: "Students at Camo belt or higher who show dedication and a positive attitude. Speak with an instructor about joining." },
  { q: "Is this in addition to regular classes?", a: "Yes. Leadership Club meets on its own schedule and is supplemental to your regular Black Belt Club training." },
  { q: "What is the Demo Team?", a: "The Demo Team performs at community events, school assemblies, and special occasions. It's a great way to represent the dojang." },
  { q: "Is there an additional cost?", a: "There is a separate membership fee for Leadership Club. Ask at the front desk for current pricing." },
];

export default function LeadershipClubPage(): React.ReactElement {
  return (
    <ProgramDetailPage
      heroImage="/images/Leadership_Demo-Team.jpg"
      heroImageAlt="Leadership Club and Demo Team"
      eyebrowLabel="Advanced Students"
      title="Leadership Club"
      description="For those looking to gain a deeper understanding and immersion in Taekwondo. Grand Master Cho believes one of the most effective ways to learn is by experiencing and teaching — firsthand."
      whatToExpectHeading="Train to lead, on and off the mat"
      whatToExpect={whatToExpect}
      scheduleHeading="Leadership Club Schedule"
      scheduleSubtitle="50-minute sessions, Tuesday, Thursday & Saturday"
      schedule={
        <BezelCard>
          <div className="grid grid-cols-3 gap-px bg-brand-taupe/10">
            {schedule.map((s) => (
              <div key={s.day} className="bg-white p-5 text-center">
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-brand-black/35">{s.day}</p>
                <p className="mt-2 font-heading text-lg text-brand-black">{s.time}</p>
              </div>
            ))}
          </div>
        </BezelCard>
      }
      requirements={{
        heading: "Requirements to Join",
        items: (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {requirements.map((req, i) => (
              <Reveal key={req} delay={(i + 1) * 100}>
                <BezelCard className="h-full">
                  <div className="flex h-full items-center gap-4 p-6">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold/10 text-sm font-bold text-brand-gold">
                      {i + 1}
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-brand-black/70">{req}</p>
                  </div>
                </BezelCard>
              </Reveal>
            ))}
          </div>
        ),
      }}
      faq={faq}
    />
  );
}
```

- [ ] **Step 9: Rewrite competition-team page**

Replace `src/app/(main)/programs/competition-team/page.tsx`. Key differences:
- Has a requirements section (bullet list in a single BezelCard)
- 4-day schedule grid

```typescript
import { BezelCard } from "@/components/ui/bezel-card";
import { Reveal } from "@/components/ui/reveal";
import { ProgramDetailPage } from "@/components/programs/program-detail-page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Competition Team",
  description: "Tournament-focused Taekwondo training for dedicated athletes. Compete at local, regional, and national levels with Master Cho's Competition Team in Lynnwood, WA.",
  path: "/programs/competition-team",
});

const schedule = [
  { day: "Monday", time: "7:30 – 8:30" },
  { day: "Wednesday", time: "7:30 – 8:30" },
  { day: "Friday", time: "6:30 – 8:00" },
  { day: "Saturday", time: "10:30~" },
];

const whatToExpect = [
  { title: "Tournament Preparation", description: "Specialized training for sparring, poomsae, and breaking competitions at local, regional, and national levels." },
  { title: "Advanced Sparring", description: "Develop ring strategy, footwork, timing, and scoring techniques for competitive sparring." },
  { title: "Competition Poomsae", description: "Perfect your forms with attention to power, precision, and presentation for judges." },
  { title: "Team Camaraderie", description: "Train alongside dedicated teammates who push each other to excel and support one another at tournaments." },
];

const requirements = [
  "Must be an active Black Belt Club member",
  "Must be at Camo belt level or higher",
  "Must demonstrate strong sparring fundamentals",
  "Must commit to competition schedule and tournaments",
  "Own sparring gear required (available at the dojang)",
];

const faq = [
  { q: "Who can join the Competition Team?", a: "Students at Camo belt or higher with strong sparring fundamentals. Talk to an instructor about tryouts." },
  { q: "What tournaments do you compete in?", a: "We compete in local, regional, and national AAU and USAT sanctioned tournaments throughout the year." },
  { q: "What gear do I need?", a: "Full sparring gear set (headgear, chest protector, forearm/shin guards, gloves, mouthguard). Available for purchase at the dojang." },
  { q: "Is this in addition to regular classes?", a: "Yes. Competition Team training is supplemental. You should continue attending your regular Black Belt Club classes." },
];

export default function CompetitionTeamPage(): React.ReactElement {
  return (
    <ProgramDetailPage
      heroImage="/images/Competition-Team.jpg"
      heroImageAlt="Competition Team training"
      eyebrowLabel="Tournament Athletes"
      title="Competition Team"
      description="For dedicated athletes who want to compete at local, regional, and national tournaments. Focused training on sparring, forms, and breaking techniques."
      whatToExpectHeading="Training built for competitors"
      whatToExpect={whatToExpect}
      scheduleHeading="Competition Team Schedule"
      scheduleSubtitle="4 sessions per week, evenings + Saturday morning"
      schedule={
        <BezelCard>
          <div className="grid grid-cols-2 gap-px bg-brand-taupe/10 sm:grid-cols-4">
            {schedule.map((s) => (
              <div key={s.day} className="bg-white p-5 text-center">
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-brand-black/35">{s.day}</p>
                <p className="mt-2 font-heading text-lg text-brand-black">{s.time}</p>
              </div>
            ))}
          </div>
        </BezelCard>
      }
      requirements={{
        heading: "Requirements",
        items: (
          <Reveal delay={100}>
            <BezelCard>
              <div className="p-6">
                <ul className="flex flex-col gap-3">
                  {requirements.map((req) => (
                    <li key={req} className="flex items-start gap-3">
                      <span className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-red" />
                      <span className="text-sm leading-relaxed text-brand-black/70">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </BezelCard>
          </Reveal>
        ),
      }}
      faq={faq}
    />
  );
}
```

- [ ] **Step 10: Run full test suite + type check**

```bash
pnpm tsc --noEmit && pnpm vitest run
```

Expected: All tests pass.

- [ ] **Step 11: Verify all 4 program pages visually**

```bash
pnpm dev
```

Navigate to each:
- `/programs/tiny-tigers`
- `/programs/black-belt-club`
- `/programs/leadership-club`
- `/programs/competition-team`

Verify: hero, cards, schedule, requirements (where applicable), FAQ, and bottom CTA all render identically to before.

- [ ] **Step 12: Commit**

```bash
git add src/components/programs/program-detail-page.tsx tests/unit/program-detail-page.test.tsx src/app/(main)/programs/tiny-tigers/page.tsx src/app/(main)/programs/black-belt-club/page.tsx src/app/(main)/programs/leadership-club/page.tsx src/app/(main)/programs/competition-team/page.tsx
git commit -m "refactor: extract ProgramDetailPage template, DRY up 4 program pages"
```

---

### Task 2: Consolidate inline EyebrowBadge usage

**Why:** 8+ files inline the exact CSS class strings that `<EyebrowBadge>` already encapsulates. The `SectionHeader` component in `members/shared.tsx` also hand-codes it. Any future badge style change needs to be made in 10+ places.

**Files:**
- Modify: `src/components/members/shared.tsx` (lines 19-21 — `SectionHeader` badge)
- Modify: `src/components/home/programs-grid.tsx` (line 139 — "Most popular" badge)
- Verify: after Task 1, the 4 program pages should already use `<EyebrowBadge>` via the template

The program detail page template (Task 1) already uses `<EyebrowBadge>` for all hero and section eyebrows, so the biggest source of duplication is already fixed. What remains:

- [ ] **Step 1: Update `SectionHeader` in `shared.tsx`**

In `src/components/members/shared.tsx`, replace the inline badge in `SectionHeader`:

```typescript
// Before:
import { ... } from "...";

export function SectionHeader({ label, title, description }: { label: string; title: string; description?: string }): React.ReactElement {
  return (
    <div>
      <span className="inline-flex rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
        {label}
      </span>
      ...

// After:
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";

export function SectionHeader({ label, title, description }: { label: string; title: string; description?: string }): React.ReactElement {
  return (
    <div>
      <EyebrowBadge variant="pill">{label}</EyebrowBadge>
      ...
```

- [ ] **Step 2: Update "Most popular" badge in programs-grid**

In `src/components/home/programs-grid.tsx`, find the inline badge for "Most popular" and replace:

```typescript
// Before:
<span className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white/70 backdrop-blur-sm ring-1 ring-white/10">
  Most popular
</span>

// After (this is a unique style, not the standard pill or gold variant — keep as-is if the EyebrowBadge variants don't match):
```

**Decision point:** The "Most popular" badge uses `bg-white/10 text-white/70 ring-white/10 backdrop-blur-sm` which is a unique translucent-on-dark style, not matching either the `pill` or `gold` variant. This should stay inline OR a new `ghost` variant should be added to `<EyebrowBadge>`. Since YAGNI says don't add features speculatively, leave this one inline — it's the only instance of this style.

- [ ] **Step 3: Search for any remaining inline badges**

```bash
grep -rn "inline-block rounded-full border border-brand-taupe/40 bg-brand-cream" src/components src/app --include="*.tsx"
```

```bash
grep -rn "inline-block rounded-full border border-brand-gold/30 bg-brand-gold/10" src/components src/app --include="*.tsx"
```

If any results appear (after Task 1 program page rewrites), replace them with `<EyebrowBadge variant="pill">` or `<EyebrowBadge variant="gold">` respectively.

- [ ] **Step 4: Run tests + type check**

```bash
pnpm tsc --noEmit && pnpm vitest run
```

Expected: All pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/members/shared.tsx src/components/home/programs-grid.tsx
git commit -m "refactor: consolidate inline eyebrow badges to use EyebrowBadge component"
```
