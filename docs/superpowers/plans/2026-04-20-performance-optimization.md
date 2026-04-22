# Performance Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve Core Web Vitals — LCP (hero poster preload), INP (compositor-friendly animations), and reduce client JS (Server Component conversions, shared IntersectionObserver).

**Architecture:** Targeted edits. The biggest refactor is the color-belt page client boundary split and the `<Reveal>` shared observer. Everything else is surgical.

**Tech Stack:** Next.js 16, CSS animations, IntersectionObserver API, Vitest

---

### Task 1: Preload hero poster for LCP

**Why:** The homepage LCP candidate is `<video poster="/images/hero-poster.jpg">`. Because it's a `<video>` element (not `<Image>`), Next.js can't inject a preload link. The poster only fetches after the browser parses the `<video>` tag, delaying LCP by one round-trip.

**Files:**
- Modify: `src/app/(main)/page.tsx` (add metadata link)

- [ ] **Step 1: Check if the homepage has a `generateMetadata` or `metadata` export**

Read `src/app/(main)/page.tsx` to see how metadata is currently handled. If there's already a metadata export, we'll add to it. If not, we'll add one.

- [ ] **Step 2: Add the preload via metadata other links**

In the homepage's metadata export, use Next.js metadata API to inject a preload link. If the page uses `createMetadata()`:

```typescript
export const metadata = createMetadata({
  path: "/",
  other: {
    "link:preload:hero-poster": "/images/hero-poster.jpg",
  },
});
```

However, Next.js metadata API doesn't directly support `<link rel="preload">` for arbitrary assets via the `other` field. The correct approach is to use `generateMetadata` or add it via the root layout. The simplest approach that works with Next.js 16:

Add a `<link>` tag directly in the homepage component, before the hero:

```typescript
import Link from "next/link";

// At the top of the page component's return:
<>
  <link rel="preload" as="image" href="/images/hero-poster.jpg" />
  {/* rest of page */}
</>
```

**Alternative (preferred):** Use Next.js `generateMetadata` to inject via `icons` or use a `<Head>` approach. Actually, the cleanest way in App Router is:

In `src/app/(main)/page.tsx`, add this export alongside the existing metadata:

```typescript
export const metadata = createMetadata({
  path: "/",
});

// Preload the hero poster (LCP) — <video poster> doesn't get Next.js image optimization
export function generateMetadata(): Metadata {
  return {
    ...metadata,
    other: {
      ...((metadata as Record<string, unknown>).other as Record<string, unknown>),
    },
  };
}
```

Actually, the simplest correct approach: Next.js 16 supports `<link>` tags in Server Components that get hoisted to `<head>`. Just add it directly:

```typescript
// Inside the page component's return JSX, at the top:
<link rel="preload" as="image" href="/images/hero-poster.jpg" fetchPriority="high" />
```

This is the approach to use. Next.js hoists `<link>` tags from Server Components to `<head>`.

- [ ] **Step 3: Verify with dev server**

```bash
pnpm dev
```

Open `http://localhost:3000`, view page source, confirm `<link rel="preload" as="image" href="/images/hero-poster.jpg">` appears in `<head>`.

- [ ] **Step 4: Run tests**

```bash
pnpm vitest run
```

- [ ] **Step 5: Commit**

```bash
git add src/app/(main)/page.tsx
git commit -m "perf: preload hero poster image for faster LCP"
```

---

### Task 2: Split color-belt page into Server + Client Components

**Why:** The entire color-belt page (~415 lines) is `"use client"`, sending all static curriculum data, overview grids, video cards, and resource sections to the client. Only `ExpandableCard` needs client-side state (expandedId toggle + click-outside handler).

**Files:**
- Create: `src/components/members/expandable-card.tsx` (extracted client component)
- Modify: `src/app/(main)/students/curriculum/color-belt/page.tsx` (remove `"use client"`, remove ExpandableCard definition, import it)

- [ ] **Step 1: Extract `ExpandableCard` to its own client component file**

Create `src/components/members/expandable-card.tsx`:

```typescript
"use client";

import { useState, useEffect, type ReactNode } from "react";
import { VideoPlaceholder } from "@/components/members/shared";

type ExpandableCardProps = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  swatch?: ReactNode;
  details: ReactNode;
  expandedLayout?: "stack" | "split";
};

export function ExpandableCardGroup({ children }: { children: ReactNode }): React.ReactElement {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!expandedId) return;
    function handleClickOutside(e: MouseEvent): void {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-expandable-card]")) {
        setExpandedId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expandedId]);

  return <ExpandableCardContext.Provider value={{ expandedId, onToggle: (id) => setExpandedId((prev) => (prev === id ? null : id)) }}>{children}</ExpandableCardContext.Provider>;
}

import { createContext, useContext } from "react";

const ExpandableCardContext = createContext<{
  expandedId: string | null;
  onToggle: (id: string) => void;
}>({ expandedId: null, onToggle: () => {} });

export function ExpandableCard({
  id,
  eyebrow,
  title,
  subtitle,
  swatch,
  details,
  expandedLayout = "stack",
}: ExpandableCardProps): React.ReactElement {
  const { expandedId, onToggle } = useContext(ExpandableCardContext);
  const isOpen = expandedId === id;

  return (
    <div className="relative" data-expandable-card>
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
        aria-controls={`panel-${id}`}
        className={`flex w-full items-center justify-between rounded-2xl bg-white px-6 py-5 text-left transition-all duration-300 ${isOpen ? "ring-2 ring-brand-blue/25 shadow-md shadow-brand-taupe/10" : "ring-1 ring-brand-taupe/12 hover:shadow-sm"}`}
      >
        <div className="flex items-center gap-3">
          {swatch}
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-red/60">{eyebrow}</p>
            <p className="mt-1 font-heading text-lg text-brand-black">{title}</p>
            <p className="text-sm text-brand-black/50">{subtitle}</p>
          </div>
        </div>
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-cream text-brand-black/30 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
        </div>
      </button>
      {isOpen && (
        <div id={`panel-${id}`} role="region" className="absolute left-0 right-0 top-full z-20 mt-2 rounded-2xl bg-white p-6 shadow-xl shadow-brand-black/10 ring-1 ring-brand-taupe/12">
          <div className={expandedLayout === "split" ? "grid gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-start" : ""}>
            <VideoPlaceholder title={title} />
            <div className={`text-sm text-brand-black/60 ${expandedLayout === "split" ? "" : "mt-4"}`}>{details}</div>
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Update color-belt page to be a Server Component**

In `src/app/(main)/students/curriculum/color-belt/page.tsx`:

1. Remove `"use client";` from line 1.
2. Remove `import { useEffect, useRef, useState } from "react";`
3. Remove the inline `ExpandableCard` function definition (lines 143-176).
4. Remove `expandedId` state, `handleToggle` function, `containerRef`, and `useEffect` click-outside handler (lines 179-196).
5. Add import: `import { ExpandableCard, ExpandableCardGroup } from "@/components/members/expandable-card";`
6. Wrap each section that uses `ExpandableCard` in an `<ExpandableCardGroup>`:

For the one-steps section (around line 310):

```typescript
<ExpandableCardGroup>
  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
    {curriculumEntries.map((entry) => (
      <ExpandableCard
        key={`one-step-${entry.level}-${entry.cycle}`}
        id={`one-step-${entry.level}-${entry.cycle}`}
        eyebrow={`${entry.level} · Cycle ${entry.cycle}`}
        title={`${entry.beltName} One-Step`}
        subtitle={entry.oneStep}
        swatch={<BeltDot entry={entry} />}
        details={<p>This card will open the {entry.beltName} one-step video once it is added.</p>}
      />
    ))}
  </div>
</ExpandableCardGroup>
```

Remove the `expandedId={expandedId}` and `onToggle={handleToggle}` props from all `ExpandableCard` usages — those are now handled via context inside `ExpandableCardGroup`.

Do the same wrapping for the hand-techniques and board-breaking sections.

7. Remove `ref={containerRef}` from the outer div.

- [ ] **Step 3: Run type check + tests**

```bash
pnpm tsc --noEmit && pnpm vitest run
```

Expected: All pass.

- [ ] **Step 4: Verify in browser**

```bash
pnpm dev
```

Navigate to `/members/curriculum/color-belt`. Verify:
- Expandable cards still open/close on click
- Click outside closes them
- All static content (curriculum grid, poomsae videos, resources) renders correctly

- [ ] **Step 5: Commit**

```bash
git add src/components/members/expandable-card.tsx src/app/(main)/students/curriculum/color-belt/page.tsx
git commit -m "perf: extract ExpandableCard client boundary, make color-belt page a Server Component"
```

---

### Task 3: Consolidate `<Reveal>` to a shared IntersectionObserver

**Why:** ~39 `<Reveal>` instances each create their own IntersectionObserver. A shared observer reduces overhead from 39 observers to 1 per page, and avoids promoting 39 elements to compositor layers simultaneously.

**Files:**
- Modify: `src/components/ui/reveal.tsx` (rewrite to use shared observer)
- Test: existing Reveal tests (if any) or `tests/unit/reveal.test.ts`

- [ ] **Step 1: Rewrite Reveal with a module-level shared observer**

Replace `src/components/ui/reveal.tsx`:

```typescript
"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
};

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0.15,
  rootMargin: "0px 0px -40px 0px",
};

type ObserverEntry = {
  setVisible: (v: boolean) => void;
};

const observers = new Map<Element, ObserverEntry>();
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const tracked = observers.get(entry.target);
          if (tracked) {
            tracked.setVisible(true);
            sharedObserver!.unobserve(entry.target);
            observers.delete(entry.target);
          }
        }
      }
    }, OBSERVER_OPTIONS);
  }
  return sharedObserver;
}

export function Reveal({ children, className = "", delay = 0, stagger = false }: RevealProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = getSharedObserver();
    observers.set(el, { setVisible });
    observer.observe(el);

    return () => {
      observer.unobserve(el);
      observers.delete(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${stagger ? "stagger-children" : ""} ${className}`}
      style={{
        opacity: stagger ? undefined : visible ? 1 : 0,
        transform: stagger ? undefined : visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s cubic-bezier(0.32,0.72,0,1) ${delay}ms, transform 0.8s cubic-bezier(0.32,0.72,0,1) ${delay}ms`,
        willChange: visible ? "auto" : "transform, opacity",
      }}
    >
      {stagger ? (visible ? children : <div style={{ opacity: 0 }}>{children}</div>) : children}
    </div>
  );
}
```

- [ ] **Step 2: Run tests**

```bash
pnpm vitest run
```

Expected: All existing tests pass. The public API (`<Reveal>` props and behavior) is unchanged.

- [ ] **Step 3: Verify visually**

```bash
pnpm dev
```

Navigate to the homepage and scroll through — reveal animations should fire identically to before.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/reveal.tsx
git commit -m "perf: consolidate Reveal to a single shared IntersectionObserver"
```

---

### Task 4: Make `offer-glow` animation compositor-friendly

**Why:** The `offer-glow` animation animates `box-shadow` infinitely, which triggers paint every frame. `will-change: box-shadow` promotes the layer but doesn't eliminate repaint.

**Files:**
- Modify: `src/app/globals.css` (lines 160-171 — the `offer-glow` keyframe and class)

- [ ] **Step 1: Replace box-shadow animation with opacity on a pseudo-element**

Replace the `offer-glow` block in `globals.css`:

```css
/* Before: */
@keyframes offer-glow {
  0%, 100% { box-shadow: 0 6px 20px -4px rgba(196, 30, 42, 0.25); }
  50% { box-shadow: 0 12px 36px -4px rgba(196, 30, 42, 0.55); }
}

.animate-offer-glow {
  animation: offer-glow 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  will-change: box-shadow;
}

/* After: */
@keyframes offer-glow {
  0%, 100% { opacity: 0.45; }
  50% { opacity: 1; }
}

.animate-offer-glow {
  position: relative;
}

.animate-offer-glow::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 12px 36px -4px rgba(196, 30, 42, 0.55);
  animation: offer-glow 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  will-change: opacity;
  pointer-events: none;
  z-index: -1;
}
```

This pre-renders the shadow on the pseudo-element once, then only animates `opacity` (compositor-friendly, zero repaint).

- [ ] **Step 2: Verify the special-offer page CTA still has the breathing glow**

```bash
pnpm dev
```

Navigate to `/special-offer`, scroll to the bottom CTA button. The red glow should breathe in and out smoothly.

- [ ] **Step 3: Verify reduced-motion still works**

The existing `@media (prefers-reduced-motion: reduce)` block should still disable the animation. Verify the `::after` pseudo doesn't show a static shadow at full opacity — add:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-offer-glow::after { animation: none; opacity: 0.45; }
}
```

- [ ] **Step 4: Run tests**

```bash
pnpm vitest run
```

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css
git commit -m "perf: make offer-glow animation compositor-friendly (opacity, not box-shadow)"
```

---

### Task 5: Reduce marquee duplication from 4x to 2x

**Why:** The marquee quadruples its item array (8 × 4 = 32 spans + 32 SVGs = 64 DOM nodes). Only 2x duplication is needed for seamless `translateX(-50%)` looping.

**Files:**
- Modify: `src/components/home/marquee.tsx` (line 13)

- [ ] **Step 1: Change from 4x to 2x**

In `src/components/home/marquee.tsx` line 13, change:

```typescript
// Before:
const repeated = [...items, ...items, ...items, ...items];

// After:
const repeated = [...items, ...items];
```

- [ ] **Step 2: Verify the marquee still loops seamlessly**

```bash
pnpm dev
```

Navigate to homepage, scroll to the marquee strip. It should loop seamlessly with no visible gap or jump.

- [ ] **Step 3: Run tests**

```bash
pnpm vitest run
```

- [ ] **Step 4: Commit**

```bash
git add src/components/home/marquee.tsx
git commit -m "perf: reduce marquee DOM from 64 to 32 nodes (2x is sufficient for seamless loop)"
```

---

### Task 6: Fix dead ternary in programs-grid

**Why:** Both branches of a ternary produce the same value (`text-white/60`), making it a no-op conditional. This is a code quality issue, not a bug.

**Files:**
- Modify: `src/components/home/programs-grid.tsx` (find the dead ternary)

- [ ] **Step 1: Find and fix the dead ternary**

Search for the exact location:

```bash
grep -n "text-white/60" src/components/home/programs-grid.tsx
```

Replace the ternary with just the value. For example:

```typescript
// Before:
className={`... ${someCondition ? "text-white/60" : "text-white/60"}`}

// After:
className={`... text-white/60`}
```

- [ ] **Step 2: Run tests**

```bash
pnpm vitest run
```

- [ ] **Step 3: Commit**

```bash
git add src/components/home/programs-grid.tsx
git commit -m "fix: remove dead ternary in programs-grid"
```
