# DRY Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Collapse duplicated markup across the four `/programs/*` pages and the member curriculum pages. Adopt the existing `<BezelCard>` and `<EyebrowBadge>` components everywhere they apply. Centralize icons, schedule data, program metadata, and the `--ease-premium` easing constant.

**Architecture:**
- **Data layer:** `src/lib/programs.ts` becomes the single source of truth for program metadata (name, ageRange, heroImage, whatToExpect, schedule keys, requirements, FAQ). `staticPrograms`, `PROGRAM_NAV`, and `layoutBySlug` derive from it.
- **Schedule derivation:** a helper in `src/lib/static-data.ts` extracts per-program schedules from `scheduleRows` so class times live in one place.
- **Template:** `src/components/programs/program-page.tsx` renders the full page from a `Program` record. Each `/programs/<slug>/page.tsx` becomes ~10 lines.
- **Shared UI:** `SectionChips`, `BackLink`, centralized icons, `--ease-premium` CSS var.

**Tech Stack:** Next.js App Router Server Components, Tailwind v4, Vitest + RTL.

---

## File Structure

- Modify: `src/app/globals.css` — declare `--ease-premium`.
- Create: `src/components/ui/icons.tsx` — named icon exports.
- Create: `src/components/members/section-chips.tsx`.
- Create: `src/components/members/back-link.tsx`.
- Create: `src/lib/programs.ts` — `PROGRAMS` record.
- Create: `src/components/programs/program-page.tsx` — template.
- Modify: `src/lib/nav.ts` — derive `PROGRAM_NAV` from `PROGRAMS`.
- Modify: `src/lib/static-data.ts` — derive `staticPrograms` from `PROGRAMS`; add `getProgramSchedule(slug)` helper.
- Modify: `src/components/home/programs-grid.tsx` — consume `PROGRAMS`.
- Modify: `src/app/(main)/programs/tiny-tigers/page.tsx`, `.../black-belt-club/page.tsx`, `.../leadership-club/page.tsx`, `.../competition-team/page.tsx` — collapse to `<ProgramPage slug="..." />`.
- Modify: `src/app/(main)/students/curriculum/color-belt/page.tsx`, `.../red-black-belt/page.tsx`, `.../black-belt-club/page.tsx` — use `<SectionChips>`, `<BackLink>`, centralized icons.
- Modify: `src/components/members/resource-card.tsx` — use centralized icons.
- Create/modify tests: `tests/components/section-chips.test.tsx`, `tests/components/back-link.test.tsx`, `tests/components/icons.test.tsx`, `tests/components/program-page.test.tsx`, `tests/unit/lib/programs.test.ts`, `tests/unit/lib/schedule-helpers.test.ts`.

---

### Task 1: Promote `--ease-premium` CSS variable

**Files:**
- Modify: `src/app/globals.css`
- Create: `tests/unit/globals-css-ease.test.ts`

- [ ] **Step 1: Write failing test**

Create `tests/unit/globals-css-ease.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

describe("globals.css ease variable", () => {
  const css = readFileSync(
    path.resolve(__dirname, "../../src/app/globals.css"),
    "utf8",
  );

  it("declares --ease-premium", () => {
    expect(css).toMatch(/--ease-premium:\s*cubic-bezier\(0\.32,\s*0\.72,\s*0,\s*1\)/);
  });
});
```

- [ ] **Step 2: Run to see failure**

Run: `pnpm vitest run tests/unit/globals-css-ease.test.ts`
Expected: FAIL.

- [ ] **Step 3: Add variable to `@theme` block**

In `src/app/globals.css`, inside the existing `@theme { ... }` block, add:

```css
--ease-premium: cubic-bezier(0.32, 0.72, 0, 1);
```

- [ ] **Step 4: Run test + build**

```bash
pnpm vitest run tests/unit/globals-css-ease.test.ts
pnpm build
```
Expected: PASS + successful build.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css tests/unit/globals-css-ease.test.ts
git commit -m "refactor: promote --ease-premium CSS variable"
```

Note: Usage-site replacement happens opportunistically in later tasks — do not do a big sweep here. Grep `cubic-bezier\(0\.32` to see remaining usages; those stay until their component is touched.

---

### Task 2: Centralize SVG icons

**Files:**
- Create: `src/components/ui/icons.tsx`
- Create: `tests/components/icons.test.tsx`

- [ ] **Step 1: Write failing test**

Create `tests/components/icons.test.tsx`:

```tsx
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DocIcon, DownloadArrow, BackArrow, ChevronDown, CloseIcon, ExternalArrow } from "@/components/ui/icons";

describe("icons", () => {
  it.each([
    ["DocIcon", <DocIcon key="a" />],
    ["DownloadArrow", <DownloadArrow key="b" />],
    ["BackArrow", <BackArrow key="c" />],
    ["ChevronDown", <ChevronDown key="d" />],
    ["CloseIcon", <CloseIcon key="e" />],
    ["ExternalArrow", <ExternalArrow key="f" />],
  ])("renders %s as an SVG", (_name, element) => {
    const { container } = render(element);
    expect(container.querySelector("svg")).not.toBeNull();
  });
});
```

- [ ] **Step 2: Run to see failure**

Run: `pnpm vitest run tests/components/icons.test.tsx`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Create icons module**

Create `src/components/ui/icons.tsx`:

```tsx
type IconProps = { className?: string; size?: number };

export function DocIcon({ className, size = 20 }: IconProps): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 2v5h5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 13h6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 17h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DownloadArrow({ className, size = 16 }: IconProps): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M12 4v11" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m7 11 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BackArrow({ className, size = 14 }: IconProps): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronDown({ className, size = 14 }: IconProps): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon({ className, size = 18 }: IconProps): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <line x1="1" y1="1" x2="17" y2="17" strokeLinecap="round" />
      <line x1="17" y1="1" x2="1" y2="17" strokeLinecap="round" />
    </svg>
  );
}

export function ExternalArrow({ className, size = 16 }: IconProps): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M7 17L17 7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
```

- [ ] **Step 4: Run test to verify pass**

Run: `pnpm vitest run tests/components/icons.test.tsx`
Expected: PASS.

- [ ] **Step 5: Adopt in `resource-card.tsx`**

In `src/components/members/resource-card.tsx`, delete the local `DocIcon`/`DownloadArrow` functions. Import from `@/components/ui/icons`:

```tsx
import { DocIcon, DownloadArrow } from "@/components/ui/icons";
```

Remove lines 13-31 (the local `DocIcon` + `DownloadArrow` definitions). The `<DocIcon />` and `<DownloadArrow />` JSX usages are identical, so no other changes.

- [ ] **Step 6: Run relevant tests + full suite**

```bash
pnpm vitest run tests/components/icons.test.tsx
pnpm vitest run
```
Expected: all PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/icons.tsx src/components/members/resource-card.tsx tests/components/icons.test.tsx
git commit -m "refactor: centralize icons, adopt in resource-card"
```

---

### Task 3: Extract `<BackLink>` + `<SectionChips>`

**Files:**
- Create: `src/components/members/back-link.tsx`
- Create: `src/components/members/section-chips.tsx`
- Create: `tests/components/back-link.test.tsx`
- Create: `tests/components/section-chips.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `tests/components/back-link.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BackLink } from "@/components/members/back-link";

describe("BackLink", () => {
  it("renders the given label with an accessible link", () => {
    render(<BackLink href="/members/curriculum" label="Back to Curriculum" />);
    const link = screen.getByRole("link", { name: /back to curriculum/i });
    expect(link).toHaveAttribute("href", "/members/curriculum");
  });

  it("renders a back-arrow svg", () => {
    const { container } = render(<BackLink href="/x" label="Back" />);
    expect(container.querySelector("svg")).not.toBeNull();
  });
});
```

Create `tests/components/section-chips.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SectionChips } from "@/components/members/section-chips";

const LINKS = [
  { href: "#a", label: "Section A" },
  { href: "#b", label: "Section B" },
];

describe("SectionChips", () => {
  it("renders one link per entry", () => {
    render(<SectionChips links={LINKS} />);
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });

  it("links point at the given hashes", () => {
    render(<SectionChips links={LINKS} />);
    expect(screen.getByRole("link", { name: /section a/i })).toHaveAttribute("href", "#a");
    expect(screen.getByRole("link", { name: /section b/i })).toHaveAttribute("href", "#b");
  });
});
```

- [ ] **Step 2: Run to see failures**

Run: `pnpm vitest run tests/components/back-link.test.tsx tests/components/section-chips.test.tsx`
Expected: FAIL — modules do not exist.

- [ ] **Step 3: Create `<BackLink>`**

Create `src/components/members/back-link.tsx`:

```tsx
import Link from "next/link";
import { BackArrow } from "@/components/ui/icons";

type BackLinkProps = { href: string; label: string; className?: string };

export function BackLink({ href, label, className }: BackLinkProps): React.ReactElement {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 text-xs text-white/40 transition-colors hover:text-white/70 ${className ?? ""}`}
    >
      <BackArrow />
      {label}
    </Link>
  );
}
```

- [ ] **Step 4: Create `<SectionChips>`**

Create `src/components/members/section-chips.tsx`:

```tsx
type SectionLink = { href: string; label: string };
type SectionChipsProps = { links: readonly SectionLink[]; className?: string };

export function SectionChips({ links, className }: SectionChipsProps): React.ReactElement {
  return (
    <div className={`flex gap-2 overflow-x-auto pb-1 lg:hidden ${className ?? ""}`}>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="inline-flex shrink-0 items-center rounded-full bg-brand-cream px-4 py-2 text-xs font-medium text-brand-black/50 transition-colors hover:bg-brand-sand hover:text-brand-black"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Run tests to verify pass**

Run: `pnpm vitest run tests/components/back-link.test.tsx tests/components/section-chips.test.tsx`
Expected: both PASS.

- [ ] **Step 6: Adopt in `color-belt/page.tsx`**

In `src/app/(main)/students/curriculum/color-belt/page.tsx`:
- Import `SectionChips` from `@/components/members/section-chips` (no `BackLink` yet — color-belt uses `<Link>` with inline markup inside the hero).
- Replace the `<div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">...{sectionLinks.map(...)}...</div>` block with `<SectionChips links={sectionLinks} />`.
- Replace the `<Link href="/members/curriculum">...</Link>` inside the hero with `<BackLink href="/members/curriculum" label="Back to Curriculum" />` (import it too).

- [ ] **Step 7: Adopt in `red-black-belt/page.tsx`**

Same two replacements in `src/app/(main)/students/curriculum/red-black-belt/page.tsx`.

- [ ] **Step 8: Run full suite**

Run: `pnpm vitest run`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add src/components/members/back-link.tsx src/components/members/section-chips.tsx src/app/(main)/students/curriculum/color-belt/page.tsx src/app/(main)/students/curriculum/red-black-belt/page.tsx tests/components/back-link.test.tsx tests/components/section-chips.test.tsx
git commit -m "refactor: extract <BackLink> and <SectionChips>"
```

---

### Task 4: Expand `<EyebrowBadge>` variants + adopt across pages

**Files:**
- Modify: `src/components/ui/eyebrow-badge.tsx`
- Modify: `src/components/home/hero.tsx`
- Modify: `src/components/home/programs-grid.tsx`
- Modify: `src/app/(main)/programs/tiny-tigers/page.tsx`
- Modify: `src/app/(main)/programs/black-belt-club/page.tsx`
- Modify: `src/app/(main)/programs/leadership-club/page.tsx`
- Modify: `src/app/(main)/programs/competition-team/page.tsx`
- Modify: `src/app/(main)/about/page.tsx`
- Modify: `src/components/home/bottom-cta.tsx`
- Modify: `tests/components/eyebrow-badge.test.tsx` (create if absent)

Goal: kill every inline eyebrow `<span>` and replace with `<EyebrowBadge>`. Three visual variants coexist in the codebase and must all stay pixel-identical, so this task first expands the component to cover all three before sweeping call sites.

**Variants in use today:**
- `pill` (existing) — cream background with taupe border, used on light sections.
- `gold` (existing) — `border-brand-gold/20 bg-brand-gold/5`, matches Color Belt + some member headers.
- `gold-solid` (new) — `border-brand-gold/30 bg-brand-gold/10`, matches the program hero badges (brighter on dark backgrounds).
- `gold-hero` (new) — `border-brand-gold/30 bg-brand-gold/5 px-6 py-2.5 text-sm tracking-[3px]`, only used by the homepage hero.

- [ ] **Step 1: Extend `EyebrowBadge` variants**

Replace the whole contents of `src/components/ui/eyebrow-badge.tsx`:

```tsx
type EyebrowBadgeVariant = "pill" | "gold" | "gold-solid" | "gold-hero";

type EyebrowBadgeProps = {
  children: React.ReactNode;
  variant?: EyebrowBadgeVariant;
  className?: string;
};

const variants: Record<EyebrowBadgeVariant, string> = {
  pill: "inline-block rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50",
  gold: "inline-flex rounded-full border border-brand-gold/20 bg-brand-gold/5 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-gold",
  "gold-solid": "inline-block rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-gold",
  "gold-hero": "inline-block rounded-full border border-brand-gold/30 bg-brand-gold/5 px-6 py-2.5 text-sm font-medium uppercase tracking-[3px] text-brand-gold",
};

export function EyebrowBadge({
  children,
  variant = "pill",
  className,
}: EyebrowBadgeProps): React.ReactElement {
  const classes = className ? `${variants[variant]} ${className}` : variants[variant];
  return <span className={classes}>{children}</span>;
}
```

- [ ] **Step 2: Add tests for the new variants**

Create (or extend if present) `tests/components/eyebrow-badge.test.tsx`:

```tsx
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";

describe("EyebrowBadge", () => {
  it("renders pill variant by default", () => {
    const { container } = render(<EyebrowBadge>x</EyebrowBadge>);
    expect(container.firstChild).toHaveClass("bg-brand-cream");
  });

  it("renders gold variant", () => {
    const { container } = render(<EyebrowBadge variant="gold">x</EyebrowBadge>);
    expect(container.firstChild).toHaveClass("bg-brand-gold/5");
    expect(container.firstChild).toHaveClass("border-brand-gold/20");
  });

  it("renders gold-solid variant for program-hero badges", () => {
    const { container } = render(<EyebrowBadge variant="gold-solid">x</EyebrowBadge>);
    expect(container.firstChild).toHaveClass("bg-brand-gold/10");
    expect(container.firstChild).toHaveClass("border-brand-gold/30");
  });

  it("renders gold-hero variant with larger text", () => {
    const { container } = render(<EyebrowBadge variant="gold-hero">x</EyebrowBadge>);
    expect(container.firstChild).toHaveClass("text-sm");
    expect(container.firstChild).toHaveClass("tracking-[3px]");
  });

  it("merges supplied className", () => {
    const { container } = render(<EyebrowBadge className="extra-foo">x</EyebrowBadge>);
    expect(container.firstChild).toHaveClass("extra-foo");
  });
});
```

- [ ] **Step 3: Run test**

Run: `pnpm vitest run tests/components/eyebrow-badge.test.tsx`
Expected: PASS.

- [ ] **Step 4: Grep for remaining inline eyebrows**

Use Grep tool with pattern `border-brand-taupe/40 bg-brand-cream` across `src/`. For every match outside `src/components/ui/eyebrow-badge.tsx`, swap:

```tsx
<span className="inline-block rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
  {label}
</span>
```

with:

```tsx
<EyebrowBadge>{label}</EyebrowBadge>
```

Add `import { EyebrowBadge } from "@/components/ui/eyebrow-badge";` at the top of each modified file if missing.

- [ ] **Step 5: Replace gold-solid (program-hero) eyebrows**

Grep pattern: `border-brand-gold/30 bg-brand-gold/10`. For each match, swap the inline `<span>` for:

```tsx
<EyebrowBadge variant="gold-solid">{label}</EyebrowBadge>
```

- [ ] **Step 6: Replace the hero eyebrow**

In `src/components/home/hero.tsx`, replace:

```tsx
<div style={{ animation: `fade-up 0.8s ${ease} 200ms both` }}>
  <span className="inline-block rounded-full border border-brand-gold/30 bg-brand-gold/5 px-6 py-2.5 text-sm font-medium uppercase tracking-[3px] text-brand-gold">
    Lynnwood&apos;s premier academy
  </span>
</div>
```

with:

```tsx
<div style={{ animation: `fade-up 0.8s ${ease} 200ms both` }}>
  <EyebrowBadge variant="gold-hero">Lynnwood&apos;s premier academy</EyebrowBadge>
</div>
```

Add the import at the top: `import { EyebrowBadge } from "@/components/ui/eyebrow-badge";`

- [ ] **Step 7: Replace remaining `gold` eyebrows (if any)**

Grep pattern: `border-brand-gold/20 bg-brand-gold/5` — these are already `variant="gold"`. Confirm none are still inline; swap any that are.

- [ ] **Step 8: Run full suite**

```bash
pnpm tsc --noEmit
pnpm vitest run
```
Expected: all PASS.

- [ ] **Step 9: Visual smoke**

Run: `pnpm dev`. Visit /, /about, /programs, /programs/tiny-tigers, /programs/black-belt-club, /programs/leadership-club, /programs/competition-team, /members/curriculum/color-belt, /members/curriculum/red-black-belt. Every eyebrow badge renders identically to before — pay specific attention to the hero eyebrow (larger text, wider padding) vs the program hero badges.

- [ ] **Step 10: Commit**

```bash
git add src/ tests/components/eyebrow-badge.test.tsx
git commit -m "refactor: expand EyebrowBadge variants, adopt across program + home pages"
```

---

### Task 5: Adopt `<BezelCard>` across program pages

**Files:**
- Modify: `src/app/(main)/programs/tiny-tigers/page.tsx`
- Modify: `src/app/(main)/programs/black-belt-club/page.tsx`
- Modify: `src/app/(main)/programs/leadership-club/page.tsx`
- Modify: `src/app/(main)/programs/competition-team/page.tsx`
- Modify: `src/components/home/bottom-cta.tsx`
- Modify: `src/app/(main)/about/page.tsx`
- Modify: `tests/components/bezel-card.test.tsx` (created in the coverage plan — if not present yet, create a minimal version here)

Goal: replace the literal `rounded-[2rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15` + inner `rounded-[calc(2rem-6px)] bg-white p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]` pattern (~20 occurrences) with `<BezelCard>`.

Context: the current `<BezelCard>` in `src/components/ui/bezel-card.tsx` already matches this exact markup. No component changes needed.

- [ ] **Step 1: Grep for the pattern**

Use Grep tool with pattern `rounded-\[2rem\] bg-brand-sand/40 p-1\.5 ring-1` across `src/`.

- [ ] **Step 2: Per match, replace the outer+inner divs**

For each match, swap:

```tsx
<div className="... rounded-[2rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
  <div className="... rounded-[calc(2rem-6px)] bg-white p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
    {children}
  </div>
</div>
```

with:

```tsx
<BezelCard className="...">
  <div className="p-6">{children}</div>
</BezelCard>
```

Where `...` on the outer is any additional classes like `h-full` — keep those on the `<BezelCard>`. The inner padding (`p-6` or `p-8`) stays on the inner `<div>` since `<BezelCard>` doesn't own content padding.

Add `import { BezelCard } from "@/components/ui/bezel-card";` to each file.

- [ ] **Step 3: Run typecheck + tests**

```bash
pnpm tsc --noEmit
pnpm vitest run
```
Expected: PASS.

- [ ] **Step 4: Visual smoke**

Run: `pnpm dev`. All "What to Expect", "Requirements" (where applicable), and FAQ cards across the four program pages render identically.

- [ ] **Step 5: Commit**

```bash
git add src/
git commit -m "refactor: adopt <BezelCard> across program + about pages"
```

---

### Task 6: `PROGRAMS` single source of truth

**Files:**
- Create: `src/lib/programs.ts`
- Modify: `src/lib/nav.ts`
- Modify: `src/lib/static-data.ts`
- Create: `tests/unit/lib/programs.test.ts`

- [ ] **Step 1: Write failing test**

Create `tests/unit/lib/programs.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { PROGRAMS, getProgram } from "@/lib/programs";
import { PROGRAM_NAV } from "@/lib/nav";
import { staticPrograms } from "@/lib/static-data";

describe("PROGRAMS", () => {
  it("has the four canonical slugs", () => {
    expect(Object.keys(PROGRAMS).sort()).toEqual(
      ["black-belt-club", "competition-team", "leadership-club", "tiny-tigers"].sort(),
    );
  });

  it("getProgram returns the record for a valid slug", () => {
    expect(getProgram("tiny-tigers").name).toBe("Tiny Tigers");
  });

  it("PROGRAM_NAV is derived from PROGRAMS (same length, same slugs)", () => {
    expect(PROGRAM_NAV).toHaveLength(Object.keys(PROGRAMS).length);
    for (const link of PROGRAM_NAV) {
      const slug = link.href.replace("/programs/", "");
      expect(PROGRAMS[slug as keyof typeof PROGRAMS]).toBeDefined();
    }
  });

  it("staticPrograms is derived from PROGRAMS", () => {
    expect(staticPrograms).toHaveLength(Object.keys(PROGRAMS).length);
    for (const p of staticPrograms) {
      expect(PROGRAMS[p.slug as keyof typeof PROGRAMS]).toBeDefined();
    }
  });
});
```

- [ ] **Step 2: Run to see failure**

Run: `pnpm vitest run tests/unit/lib/programs.test.ts`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Create `src/lib/programs.ts`**

```ts
export type ProgramSlug = "tiny-tigers" | "black-belt-club" | "leadership-club" | "competition-team";

export type ProgramFaq = { q: string; a: string };
export type ProgramWhatToExpect = { title: string; description: string };

export type Program = {
  slug: ProgramSlug;
  name: string;
  ageRange: string;
  badge: string;
  heroImage: string;
  navImage: string;
  shortDescription: string;
  heroDescription: string;
  whatToExpectHeading: string;
  whatToExpect: ProgramWhatToExpect[];
  scheduleHeading: string;
  scheduleNote: string;
  scheduleClassNames: string[];
  requirements?: string[];
  requirementsStyle?: "numbered" | "bulleted";
  faq: ProgramFaq[];
  order: number;
};

export const PROGRAMS: Record<ProgramSlug, Program> = {
  "tiny-tigers": {
    slug: "tiny-tigers",
    name: "Tiny Tigers",
    ageRange: "Ages 4-6",
    badge: "Ages 4–6",
    heroImage: "/images/Tiny-Tigers.jpg",
    navImage: "/images/Tiny-Tigers.jpg",
    shortDescription: "Designed for our youngest students, focusing on foundational life skills accompanied by listening, following directions, and self-confidence.",
    heroDescription: "Designed for our youngest students, this program focuses on teaching foundational life skills — listening, following directions, and self-confidence — through the art of Taekwondo.",
    whatToExpectHeading: "A class built for young learners",
    whatToExpect: [
      { title: "Fun & Engaging Classes", description: "Age-appropriate drills, games, and activities that keep kids excited while learning real martial arts skills." },
      { title: "Life Skills Development", description: "Listening, following directions, self-confidence, and respect — skills that carry over to school and home." },
      { title: "Positive Milestones", description: "Students stay motivated with clear goals, encouragement, and celebrations that build confidence over time." },
      { title: "Supportive Instruction", description: "Our instructors guide each child with patience and structure so families feel confident from day one." },
    ],
    scheduleHeading: "Tiny Tigers Schedule",
    scheduleNote: "40-minute classes, Monday – Friday",
    scheduleClassNames: ["Tiny Tigers 3-6"],
    faq: [
      { q: "What age is the Tiny Tigers program for?", a: "Ages 4–6. We focus on foundational skills appropriate for young learners." },
      { q: "How many classes per week?", a: "Classes are available Monday through Friday. We recommend attending at least 2–3 times per week for steady progress." },
      { q: "What should my child wear?", a: "A dobok (uniform) is required. Ask at the front desk about purchasing one." },
      { q: "How long does it take to advance belts?", a: "On average 10–20 weeks per belt, depending on attendance, proficiency, and technical understanding." },
      { q: "Does my child need sparring gear?", a: "Not at the Tiny Tigers level. Sparring gear is required starting at Camo belt and higher in the regular program." },
    ],
    order: 1,
  },
  "black-belt-club": {
    slug: "black-belt-club",
    name: "Black Belt Club",
    ageRange: "All ages",
    badge: "All Ages",
    heroImage: "/images/Black-Belt-Club.jpg",
    navImage: "/images/Black-Belt-Club.jpg",
    shortDescription: "Designed for students committed to mastering Taekwondo, our standard program offers up to three classes per week, allowing students to fully immerse themselves in the art and progress at an accelerated pace.",
    heroDescription: "Designed for students committed to mastering Taekwondo, our standard program offers up to three classes per week, allowing students to fully immerse themselves in the art and progress at an accelerated pace.",
    whatToExpectHeading: "A complete martial arts education",
    whatToExpect: [
      { title: "Comprehensive Training", description: "Poomsae, sparring, weapons, breaking, and hand techniques — a complete martial arts education." },
      { title: "Character Development", description: "Building discipline, respect, and confidence that extends beyond the dojang." },
      { title: "Structured Advancement", description: "Students grow through consistent training, clear goals, and instructor feedback at every stage." },
      { title: "Flexible Schedule", description: "New students can get started with beginner, family/all belts, and adult & teen classes throughout the week." },
    ],
    scheduleHeading: "Black Belt Club Schedule",
    scheduleNote: "Classes open to new students, based on our current public schedule",
    scheduleClassNames: ["White-Yellow (Beginner)", "Family / All Belts", "Adult & Teens"],
    faq: [
      { q: "What age can students join?", a: "All ages are welcome. We group classes by belt level so students train with peers at similar skill levels." },
      { q: "How often should I attend?", a: "We recommend 2-3 classes per week for steady progress. Up to 3 sessions per week are available." },
      { q: "What gear do I need?", a: "A dobok (uniform) is required. Camo belt and higher need their own sparring gear, available at the dojang." },
      { q: "How long to reach Black Belt?", a: "Typically 3-5 years with consistent training. Each belt level takes an average of 10-20 weeks." },
      { q: "Can I compete in tournaments?", a: "Yes! Students interested in competition can join our Competition Team for specialized tournament training." },
    ],
    order: 2,
  },
  "leadership-club": {
    slug: "leadership-club",
    name: "Leadership Club",
    ageRange: "Advanced students",
    badge: "Advanced Students",
    heroImage: "/images/Leadership_Demo-Team.jpg",
    navImage: "/images/Leadership_Demo-Team.jpg",
    shortDescription: "For those looking to gain a deeper understanding and immersion in Taekwondo. Grand Master Cho believes one of the most effective ways to learn is by experiencing and teaching — firsthand.",
    heroDescription: "For those looking to gain a deeper understanding and immersion in Taekwondo. Grand Master Cho believes one of the most effective ways to learn is by experiencing and teaching — firsthand.",
    whatToExpectHeading: "Train to lead, on and off the mat",
    whatToExpect: [
      { title: "Teaching & Mentorship", description: "Learn by leading. Leadership students assist in teaching younger classes, building communication and responsibility." },
      { title: "Demo Team Training", description: "Perform at events and demonstrations, showcasing advanced techniques and teamwork." },
      { title: "Advanced Techniques", description: "Go beyond standard curriculum with specialized forms, weapons, and breaking techniques." },
      { title: "Character Leadership", description: "Develop the qualities of a true martial arts leader — integrity, humility, and service to others." },
    ],
    scheduleHeading: "Leadership Club Schedule",
    scheduleNote: "50-minute sessions, Tuesday, Thursday & Saturday",
    scheduleClassNames: ["Leadership / Demo Team*"],
    requirements: [
      "Must be an active Black Belt Club member",
      "Must be at Camo belt level or higher",
      "Must demonstrate consistent attendance and positive attitude",
      "Invitation-based — speak with an instructor",
    ],
    requirementsStyle: "numbered",
    faq: [
      { q: "Who can join Leadership Club?", a: "Students at Camo belt or higher who show dedication and a positive attitude. Speak with an instructor about joining." },
      { q: "Is this in addition to regular classes?", a: "Yes. Leadership Club meets on its own schedule and is supplemental to your regular Black Belt Club training." },
      { q: "What is the Demo Team?", a: "The Demo Team performs at community events, school assemblies, and special occasions. It's a great way to represent the dojang." },
      { q: "Is there an additional cost?", a: "There is a separate membership fee for Leadership Club. Ask at the front desk for current pricing." },
    ],
    order: 3,
  },
  "competition-team": {
    slug: "competition-team",
    name: "Competition Team",
    ageRange: "Tournament athletes",
    badge: "Tournament Athletes",
    heroImage: "/images/Competition-Team.jpg",
    navImage: "/images/Competition-Team.jpg",
    shortDescription: "For dedicated athletes who want to compete at local, regional, and national tournaments. Focused training on sparring, forms, and breaking techniques.",
    heroDescription: "For dedicated athletes who want to compete at local, regional, and national tournaments. Focused training on sparring, forms, and breaking techniques.",
    whatToExpectHeading: "Training built for competitors",
    whatToExpect: [
      { title: "Tournament Preparation", description: "Specialized training for sparring, poomsae, and breaking competitions at local, regional, and national levels." },
      { title: "Advanced Sparring", description: "Develop ring strategy, footwork, timing, and scoring techniques for competitive sparring." },
      { title: "Competition Poomsae", description: "Perfect your forms with attention to power, precision, and presentation for judges." },
      { title: "Team Camaraderie", description: "Train alongside dedicated teammates who push each other to excel and support one another at tournaments." },
    ],
    scheduleHeading: "Competition Team Schedule",
    scheduleNote: "4 sessions per week, evenings + Saturday morning",
    scheduleClassNames: ["Competition Team*"],
    requirements: [
      "Must be an active Black Belt Club member",
      "Must be at Camo belt level or higher",
      "Must demonstrate strong sparring fundamentals",
      "Must commit to competition schedule and tournaments",
      "Own sparring gear required (available at the dojang)",
    ],
    requirementsStyle: "bulleted",
    faq: [
      { q: "Who can join the Competition Team?", a: "Students at Camo belt or higher with strong sparring fundamentals. Talk to an instructor about tryouts." },
      { q: "What tournaments do you compete in?", a: "We compete in local, regional, and national AAU and USAT sanctioned tournaments throughout the year." },
      { q: "What gear do I need?", a: "Full sparring gear set (headgear, chest protector, forearm/shin guards, gloves, mouthguard). Available for purchase at the dojang." },
      { q: "Is this in addition to regular classes?", a: "Yes. Competition Team training is supplemental. You should continue attending your regular Black Belt Club classes." },
    ],
    order: 4,
  },
};

export function getProgram(slug: ProgramSlug): Program {
  return PROGRAMS[slug];
}

export const PROGRAM_ORDER: ProgramSlug[] = ["tiny-tigers", "black-belt-club", "leadership-club", "competition-team"];
```

- [ ] **Step 4: Derive `PROGRAM_NAV` in `src/lib/nav.ts`**

Replace the exported `PROGRAM_NAV` array:

```ts
import { PROGRAMS, PROGRAM_ORDER } from "@/lib/programs";

export const PROGRAM_NAV: ProgramNavLink[] = PROGRAM_ORDER.map((slug) => {
  const p = PROGRAMS[slug];
  return {
    label: p.name,
    href: `/programs/${p.slug}`,
    description: p.ageRange,
    image: p.navImage,
  };
});
```

- [ ] **Step 5: Derive `staticPrograms` in `src/lib/static-data.ts`**

Replace the `staticPrograms` declaration with:

```ts
import { PROGRAMS, PROGRAM_ORDER } from "@/lib/programs";

export const staticPrograms = PROGRAM_ORDER.map((slug, i) => {
  const p = PROGRAMS[slug];
  return {
    id: String(i + 1),
    name: p.name,
    slug: p.slug,
    description: p.shortDescription,
    ageRange: p.ageRange,
    imageUrl: p.heroImage,
    order: p.order,
  };
});
```

- [ ] **Step 6: Run the programs test + full suite**

```bash
pnpm vitest run tests/unit/lib/programs.test.ts
pnpm vitest run
```
Expected: all PASS.

- [ ] **Step 7: Commit**

```bash
git add src/lib/programs.ts src/lib/nav.ts src/lib/static-data.ts tests/unit/lib/programs.test.ts
git commit -m "refactor: PROGRAMS single source of truth for program metadata"
```

---

### Task 7: Schedule derivation helper

**Files:**
- Modify: `src/lib/static-data.ts`
- Create: `tests/unit/lib/schedule-helpers.test.ts`

- [ ] **Step 1: Write failing test**

Create `tests/unit/lib/schedule-helpers.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { getScheduleForClassNames } from "@/lib/static-data";

describe("getScheduleForClassNames", () => {
  it("returns Tiny Tigers times for Monday–Friday", () => {
    const rows = getScheduleForClassNames(["Tiny Tigers 3-6"]);
    expect(rows).toHaveLength(5);
    expect(rows[0]).toEqual({ day: "Monday", time: "3:30-4:10" });
    expect(rows[4]).toEqual({ day: "Friday", time: "4:50-5:30" });
  });

  it("returns Competition Team sessions", () => {
    const rows = getScheduleForClassNames(["Competition Team*"]);
    const days = rows.map((r) => r.day);
    expect(days).toEqual(["Monday", "Wednesday", "Friday", "Saturday"]);
  });

  it("returns empty array for unknown class names", () => {
    expect(getScheduleForClassNames(["Nonexistent"])).toEqual([]);
  });
});
```

- [ ] **Step 2: Run to see failure**

Run: `pnpm vitest run tests/unit/lib/schedule-helpers.test.ts`
Expected: FAIL — export doesn't exist.

- [ ] **Step 3: Add helper to `src/lib/static-data.ts`**

Append to the end of `src/lib/static-data.ts`:

```ts
const DAY_NAMES = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

export type ProgramScheduleRow = { day: string; time: string };

export function getScheduleForClassNames(classNames: string[]): ProgramScheduleRow[] {
  const out: ProgramScheduleRow[] = [];
  for (const row of scheduleRows) {
    if (!classNames.includes(row.className)) continue;
    for (const [dayStr, time] of Object.entries(row.slots)) {
      const day = DAY_NAMES[Number(dayStr)];
      if (day) out.push({ day, time });
    }
  }
  return out;
}
```

- [ ] **Step 4: Run test to verify pass**

Run: `pnpm vitest run tests/unit/lib/schedule-helpers.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/static-data.ts tests/unit/lib/schedule-helpers.test.ts
git commit -m "refactor: add getScheduleForClassNames helper"
```

---

### Task 8: Build `<ProgramPage>` template

**Files:**
- Create: `src/components/programs/program-page.tsx`
- Create: `tests/components/program-page.test.tsx`

- [ ] **Step 1: Write failing test**

Create `tests/components/program-page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProgramPage } from "@/components/programs/program-page";

describe("ProgramPage (Tiny Tigers)", () => {
  it("renders the program name as an h1", () => {
    render(<ProgramPage slug="tiny-tigers" />);
    expect(screen.getByRole("heading", { level: 1, name: /tiny tigers/i })).toBeInTheDocument();
  });

  it("renders the badge", () => {
    render(<ProgramPage slug="tiny-tigers" />);
    expect(screen.getByText(/ages 4–6/i)).toBeInTheDocument();
  });

  it("renders all what-to-expect items", () => {
    render(<ProgramPage slug="tiny-tigers" />);
    expect(screen.getByText(/fun & engaging classes/i)).toBeInTheDocument();
    expect(screen.getByText(/life skills development/i)).toBeInTheDocument();
    expect(screen.getByText(/positive milestones/i)).toBeInTheDocument();
    expect(screen.getByText(/supportive instruction/i)).toBeInTheDocument();
  });

  it("renders schedule rows derived from PROGRAMS", () => {
    render(<ProgramPage slug="tiny-tigers" />);
    expect(screen.getByText(/3:30-4:10/)).toBeInTheDocument();
    expect(screen.getByText(/4:50-5:30/)).toBeInTheDocument();
  });

  it("renders all FAQ questions", () => {
    render(<ProgramPage slug="tiny-tigers" />);
    expect(screen.getByText(/what age is the tiny tigers program for/i)).toBeInTheDocument();
  });
});

describe("ProgramPage (Leadership Club)", () => {
  it("renders numbered requirements", () => {
    render(<ProgramPage slug="leadership-club" />);
    expect(screen.getByText(/invitation-based/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run to see failure**

Run: `pnpm vitest run tests/components/program-page.test.tsx`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Create `<ProgramPage>`**

Create `src/components/programs/program-page.tsx`:

```tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { BezelCard } from "@/components/ui/bezel-card";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { getProgram, type ProgramSlug } from "@/lib/programs";
import { getScheduleForClassNames } from "@/lib/static-data";

type ProgramPageProps = { slug: ProgramSlug };

export function ProgramPage({ slug }: ProgramPageProps): React.ReactElement {
  const program = getProgram(slug);
  const schedule = getScheduleForClassNames(program.scheduleClassNames);
  const scheduleCols = Math.min(Math.max(schedule.length, 1), 5);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-[2rem] bg-brand-black">
        <Image
          src={program.heroImage}
          alt={`${program.name} class`}
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />
        <div className="relative z-10 px-8 pb-10 pt-32 sm:px-12 sm:pb-14 sm:pt-40">
          <EyebrowBadge variant="gold">{program.badge}</EyebrowBadge>
          <h1 className="mt-5 font-heading text-4xl tracking-tight text-white sm:text-5xl lg:text-6xl">
            {program.name}
          </h1>
          <p className="mt-4 max-w-lg leading-relaxed text-white/60">{program.heroDescription}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="primary" href="/special-offer">Start a 2-Week Trial</Button>
            <Button variant="outline" href="/schedule">View Schedule</Button>
          </div>
        </div>
      </div>

      {/* What to Expect */}
      <div className="mt-20">
        <Reveal delay={0}>
          <EyebrowBadge>What to Expect</EyebrowBadge>
          <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
            {program.whatToExpectHeading}
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {program.whatToExpect.map((item, i) => (
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
          <EyebrowBadge>Class Times</EyebrowBadge>
          <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
            {program.scheduleHeading}
          </h2>
          <p className="mt-2 text-sm text-brand-black/40">{program.scheduleNote}</p>
        </Reveal>
        <Reveal delay={100} className="mt-8">
          <BezelCard>
            <div className={`grid grid-cols-2 gap-px bg-brand-taupe/10 sm:grid-cols-${scheduleCols}`}>
              {schedule.map((s) => (
                <div key={`${s.day}-${s.time}`} className="bg-white p-5 text-center">
                  <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-brand-black/35">{s.day}</p>
                  <p className="mt-2 font-heading text-lg text-brand-black">{s.time}</p>
                </div>
              ))}
            </div>
          </BezelCard>
        </Reveal>
      </div>

      {/* Requirements (optional) */}
      {program.requirements && (
        <div className="mt-20">
          <Reveal delay={0}>
            <EyebrowBadge>Eligibility</EyebrowBadge>
            <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
              {program.requirementsStyle === "numbered" ? "Requirements to Join" : "Requirements"}
            </h2>
          </Reveal>
          {program.requirementsStyle === "numbered" ? (
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {program.requirements.map((req, i) => (
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
          ) : (
            <Reveal delay={100} className="mt-8">
              <BezelCard>
                <div className="p-6">
                  <ul className="flex flex-col gap-3">
                    {program.requirements.map((req) => (
                      <li key={req} className="flex items-start gap-3">
                        <span className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-red" />
                        <span className="text-sm leading-relaxed text-brand-black/70">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </BezelCard>
            </Reveal>
          )}
        </div>
      )}

      {/* FAQ */}
      <div className="mt-20">
        <Reveal delay={0}>
          <EyebrowBadge>FAQ</EyebrowBadge>
          <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
            Common Questions
          </h2>
        </Reveal>
        <div className="mt-8 flex flex-col gap-4">
          {program.faq.map((item, i) => (
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
          Ready to get started?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-brand-black/50">
          Try 2 weeks of classes for just $49. No commitment required.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button variant="primary" href="/special-offer">Start Your Trial</Button>
          <Button variant="outline" href="/contact" className="!border-brand-black !text-brand-black hover:!bg-brand-black/5">
            Contact Us
          </Button>
        </div>
      </Reveal>
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify pass**

Run: `pnpm vitest run tests/components/program-page.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/programs/program-page.tsx tests/components/program-page.test.tsx
git commit -m "refactor: add <ProgramPage> template driven by PROGRAMS"
```

---

### Task 9: Collapse 4 program pages to the template

**Files:**
- Modify: `src/app/(main)/programs/tiny-tigers/page.tsx`
- Modify: `src/app/(main)/programs/black-belt-club/page.tsx`
- Modify: `src/app/(main)/programs/leadership-club/page.tsx`
- Modify: `src/app/(main)/programs/competition-team/page.tsx`

- [ ] **Step 1: Rewrite tiny-tigers page**

Replace the entire contents of `src/app/(main)/programs/tiny-tigers/page.tsx`:

```tsx
import { ProgramPage } from "@/components/programs/program-page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Tiny Tigers",
  description: "Taekwondo for ages 4–6. Fun, age-appropriate classes that build foundational life skills — listening, self-confidence, and respect — through martial arts.",
});

export default function TinyTigersPage(): React.ReactElement {
  return <ProgramPage slug="tiny-tigers" />;
}
```

- [ ] **Step 2: Rewrite black-belt-club page**

Replace the entire contents of `src/app/(main)/programs/black-belt-club/page.tsx`:

```tsx
import { ProgramPage } from "@/components/programs/program-page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Black Belt Club",
  description: "Master Cho's standard Taekwondo program for all ages. Up to three classes per week covering poomsae, sparring, weapons, breaking, and character development.",
});

export default function BlackBeltClubPage(): React.ReactElement {
  return <ProgramPage slug="black-belt-club" />;
}
```

- [ ] **Step 3: Rewrite leadership-club page**

Replace the entire contents of `src/app/(main)/programs/leadership-club/page.tsx`:

```tsx
import { ProgramPage } from "@/components/programs/program-page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Leadership Club",
  description: "Advanced Taekwondo training for dedicated students. Teach, lead, and perform with Master Cho's Leadership Club and Demo Team in Lynnwood, WA.",
});

export default function LeadershipClubPage(): React.ReactElement {
  return <ProgramPage slug="leadership-club" />;
}
```

- [ ] **Step 4: Rewrite competition-team page**

Replace the entire contents of `src/app/(main)/programs/competition-team/page.tsx`:

```tsx
import { ProgramPage } from "@/components/programs/program-page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Competition Team",
  description: "Tournament-focused Taekwondo training for dedicated athletes. Compete at local, regional, and national levels with Master Cho's Competition Team in Lynnwood, WA.",
});

export default function CompetitionTeamPage(): React.ReactElement {
  return <ProgramPage slug="competition-team" />;
}
```

- [ ] **Step 5: Run full suite + build**

```bash
pnpm tsc --noEmit
pnpm vitest run
pnpm build
```
Expected: all PASS.

- [ ] **Step 6: Update any existing program-page test that referenced the old page**

If `tests/components/black-belt-club-page.test.tsx` exists (it does), open it and confirm it still passes — assertions should target `ProgramPage` output shape. Adjust imports if it imports the page directly and rebuilds assertions. Re-run the suite after any fix.

- [ ] **Step 7: Visual smoke**

Run: `pnpm dev`. Visit each of the four /programs/* URLs; confirm layouts render the same or nearly the same as before.

- [ ] **Step 8: Commit**

```bash
git add src/app/(main)/programs tests/
git commit -m "refactor: collapse 4 program pages to <ProgramPage slug=…/>"
```

---

### Task 10: Verify + open PR

**Files:** none modified.

- [ ] **Step 1: Full verify**

```bash
pnpm tsc --noEmit
pnpm lint
pnpm vitest run
pnpm build
```
Expected: zero errors; test coverage equal-or-better than baseline.

- [ ] **Step 2: Push + open PR**

```bash
git push -u origin perf-investigation
gh pr create --title "refactor: DRY program pages, centralize metadata + icons" --body "$(cat <<'EOF'
## Summary
- New `src/lib/programs.ts` as single source of truth for program metadata
- `PROGRAM_NAV` and `staticPrograms` derive from `PROGRAMS`
- `getScheduleForClassNames()` derives per-program schedules from `scheduleRows`
- New `<ProgramPage slug="...">` template; 4 program pages now ~10 lines each
- Adopted `<BezelCard>` + `<EyebrowBadge>` everywhere the pattern appeared
- Centralized SVG icons (`<DocIcon>`, `<DownloadArrow>`, etc.)
- Extracted `<BackLink>` and `<SectionChips>` for curriculum pages
- Promoted `--ease-premium` CSS custom property

## Test plan
- [x] `pnpm vitest run`
- [x] `pnpm tsc --noEmit`
- [x] `pnpm lint`
- [x] `pnpm build`
- [ ] Visual smoke: all 4 /programs/* pages, /about, / render identically
- [ ] Mobile visual smoke: chip bars and back links on /members/curriculum/color-belt and /members/curriculum/red-black-belt
EOF
)"
```

---
