# SEO Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix heading hierarchy, add canonical URLs, enrich JSON-LD structured data, improve meta descriptions with local keywords, and fix semantic HTML issues — all to maximize local SEO for a Lynnwood, WA martial arts business.

**Architecture:** Targeted edits to metadata, layout, and page files. No new abstractions. Most tasks touch 1-2 files.

**Tech Stack:** Next.js 16 App Router, `createMetadata()` helper in `src/lib/metadata.ts`

---

### Task 1: Add canonical URLs via `createMetadata()`

**Why:** The `/members` to `/students` URL rewrite creates duplicate-content risk. Every public page needs an explicit canonical URL. Without it, Google may index both URL variants and split ranking signals.

**Files:**
- Modify: `src/lib/metadata.ts` (add `alternates.canonical` to return value)

- [ ] **Step 1: Update `createMetadata` to include canonical**

In `src/lib/metadata.ts`, add the `alternates` field to the return object. The canonical should be derived from the path passed via overrides:

```typescript
export function createMetadata(overrides: Partial<Metadata> & { path?: string } = {}): Metadata {
  const rawTitle = overrides.title ? `${overrides.title} | ${SITE_NAME}` : `${SITE_NAME} — Martial Arts Academy in Lynnwood`;
  const description = (overrides.description as string) ?? SITE_DESCRIPTION;
  const siteUrl = getSiteUrl();
  const { path, ...rest } = overrides;
  return {
    title: rawTitle,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: path ?? "/",
    },
    openGraph: {
      title: rawTitle,
      description,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: SITE_NAME }],
      ...(rest.openGraph as Record<string, unknown>),
    },
    twitter: { card: "summary_large_image", title: rawTitle, description },
    ...rest,
  };
}
```

- [ ] **Step 2: Add `path` to every page's `createMetadata` call**

Update each page file's metadata export to include the path. Here's the list:

| File | Path value |
|------|------------|
| `src/app/(main)/page.tsx` | `"/"` |
| `src/app/(main)/about/page.tsx` | `"/about"` |
| `src/app/(main)/programs/page.tsx` | `"/programs"` |
| `src/app/(main)/programs/tiny-tigers/page.tsx` | `"/programs/tiny-tigers"` |
| `src/app/(main)/programs/black-belt-club/page.tsx` | `"/programs/black-belt-club"` |
| `src/app/(main)/programs/leadership-club/page.tsx` | `"/programs/leadership-club"` |
| `src/app/(main)/programs/competition-team/page.tsx` | `"/programs/competition-team"` |
| `src/app/(main)/schedule/page.tsx` | `"/schedule"` |
| `src/app/(main)/reviews/page.tsx` | `"/reviews"` |
| `src/app/(main)/contact/page.tsx` | `"/contact"` |
| `src/app/(main)/special-offer/page.tsx` | `"/special-offer"` |

Example change for contact page:

```typescript
// Before:
export const metadata = createMetadata({
  title: "Contact",
  description: "Get in touch with Master Cho's Taekwondo.",
});

// After:
export const metadata = createMetadata({
  title: "Contact",
  description: "Contact Master Cho's Taekwondo in Lynnwood, WA. Call (425) 742-4282 or visit 5031 168th ST SW STE 100.",
  path: "/contact",
});
```

- [ ] **Step 3: Run type check**

```bash
pnpm tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/lib/metadata.ts src/app
git commit -m "feat(seo): add canonical URLs to all public pages"
```

---

### Task 2: Enrich JSON-LD structured data

**Why:** The current JSON-LD uses generic `LocalBusiness` type and is missing `geo`, `priceRange`, `hasMap`, and `sameAs` — all of which influence local pack ranking in Google Search.

**Files:**
- Modify: `src/app/layout.tsx` (lines 15-48 — the JSON-LD script block)

- [ ] **Step 1: Update the JSON-LD object**

In `src/app/layout.tsx`, update the existing JSON-LD object inside the `JSON.stringify()` call. The file already uses a `<script type="application/ld+json">` tag with server-rendered static JSON (this is safe — it's not user input).

Add these fields to the existing object:
- Change `"@type": "LocalBusiness"` to `"@type": ["LocalBusiness", "SportsActivityLocation"]`
- Add `geo` with coordinates: `{ "@type": "GeoCoordinates", "latitude": 47.8209, "longitude": -122.3015 }`
- Add `"priceRange": "$$"`
- Add `"hasMap"` with a Google Maps URL (verify the actual CID from Google Business Profile)
- Populate `sameAs` with: `["https://www.facebook.com/masterchostaekwondo/", "https://www.instagram.com/masterchostaekwondo/"]`

**Note:** The `hasMap` URL needs verification — look up the actual Google Maps CID for the business. If unknown, use: `"https://www.google.com/maps/place/Master+Cho's+Black+Belt+Academy/@47.8209,-122.3015"`.

- [ ] **Step 2: Validate with Google's Rich Results Test**

After deploying, test at `https://search.google.com/test/rich-results`. For local dev, visually verify the JSON-LD in page source.

- [ ] **Step 3: Run tests**

```bash
pnpm vitest run
```

Expected: All pass (layout tests should not break).

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(seo): enrich JSON-LD with geo, priceRange, sameAs, SportsActivityLocation"
```

---

### Task 3: Improve meta descriptions with local keywords

**Why:** Several page descriptions lack "Lynnwood, WA" and relevant local keywords. Local search heavily weights keyword presence in meta descriptions for local intent queries like "taekwondo classes near me" or "martial arts Lynnwood WA".

**Files:**
- Modify: Multiple page.tsx files (metadata exports only)

- [ ] **Step 1: Update descriptions**

| Page | Current description | New description |
|------|-------------------|-----------------|
| `programs/page.tsx` | "Explore our martial arts programs for all ages." | "Taekwondo programs for all ages in Lynnwood, WA — Tiny Tigers (4-6), Black Belt Club, Leadership Club, and Competition Team." |
| `contact/page.tsx` | "Get in touch with Master Cho's Taekwondo." | "Contact Master Cho's Taekwondo in Lynnwood, WA. Call (425) 742-4282 or visit 5031 168th ST SW STE 100." |
| `schedule/page.tsx` | "View our weekly class schedule and book your spot." | "Weekly taekwondo class schedule at Master Cho's in Lynnwood, WA. Classes Monday-Saturday for all belt levels." |
| `special-offer/page.tsx` | "Try 2 weeks of taekwondo classes for just $49." | "Try 2 weeks of taekwondo classes for just $49 at Master Cho's in Lynnwood, WA. Uniform included, no commitment." |
| `reviews/page.tsx` | Check current — add Lynnwood, WA if missing | Add "Lynnwood, WA" if not present |
| `about/page.tsx` | Check current — add Lynnwood, WA if missing | Add "Lynnwood, WA" if not present |

- [ ] **Step 2: Run type check**

```bash
pnpm tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/app
git commit -m "feat(seo): add local keywords to page meta descriptions"
```

---

### Task 4: Fix contact page heading hierarchy

**Why:** The contact page jumps from `h1` to `h3` (skipping `h2`), which hurts SEO crawlers' understanding of page structure.

**Files:**
- Modify: `src/app/(main)/contact/page.tsx` (lines 24, 35, 45 — change `h3` to `h2`)

- [ ] **Step 1: Change all `h3` to `h2` on the contact page**

In `src/app/(main)/contact/page.tsx`, replace all three `h3` tags (Phone, Location, Follow Us) with `h2`:

```typescript
// Line 24 — Before:
<h3 className="font-heading text-lg text-brand-black">

// After:
<h2 className="font-heading text-lg text-brand-black">
```

Repeat for lines 35 and 45. Also update the closing tags from `</h3>` to `</h2>`.

- [ ] **Step 2: Run tests**

```bash
pnpm vitest run
```

Expected: All pass.

- [ ] **Step 3: Commit**

```bash
git add src/app/(main)/contact/page.tsx
git commit -m "fix(seo): fix heading hierarchy on contact page (h1 -> h2, not h3)"
```

---

### Task 5: Fix footer heading semantics

**Why:** Footer uses `h4` tags for section headings (Navigation, Contact, Our Location) with no preceding `h2`/`h3` in the footer context. This breaks the document outline.

**Files:**
- Modify: `src/components/layout/footer.tsx` (lines 11, 21, 29)

- [ ] **Step 1: Replace `h4` with styled `p` tags**

Footer headings are visual labels, not document structure. Replace:

```typescript
// Before (3 instances):
<h4 className="mb-4 text-sm font-semibold text-brand-gold">Navigation</h4>

// After:
<p className="mb-4 text-sm font-semibold text-brand-gold">Navigation</p>
```

Repeat for "Contact" and "Our Location" headings.

- [ ] **Step 2: Run tests**

```bash
pnpm vitest run
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/footer.tsx
git commit -m "fix(seo): replace footer h4 headings with p tags for valid outline"
```

---

### Task 6: Add explicit viewport export

**Why:** Next.js 16 separates viewport from metadata. An explicit export ensures consistent mobile rendering.

**Files:**
- Modify: `src/app/layout.tsx` (add viewport export near metadata)

- [ ] **Step 1: Add viewport export**

At the top of `src/app/layout.tsx`, near the existing imports, add:

```typescript
import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};
```

- [ ] **Step 2: Run type check + tests**

```bash
pnpm tsc --noEmit && pnpm vitest run
```

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(seo): add explicit viewport export to root layout"
```

---

### Task 7: Add main landmark to special-offer page

**Why:** The special-offer page renders bare `<section>` elements without a `<main>` landmark, unlike all other pages which use `<PageContainer>` (which renders `<main>`).

**Files:**
- Modify: `src/app/(main)/special-offer/page.tsx`

- [ ] **Step 1: Wrap the page content in main**

In `src/app/(main)/special-offer/page.tsx`, wrap the outermost fragment:

```typescript
// Before:
return (
  <>
    <section className="relative overflow-hidden">
    ...

// After:
return (
  <main>
    <section className="relative overflow-hidden">
    ...
    </section>
    ...
  </main>
);
```

Change the closing `</>` to `</main>`.

- [ ] **Step 2: Run tests**

```bash
pnpm vitest run
```

- [ ] **Step 3: Commit**

```bash
git add src/app/(main)/special-offer/page.tsx
git commit -m "fix(a11y): wrap special-offer page in main landmark"
```

---

### Task 8: Add video text fallback and fix sitemap lastModified

**Why:** The hero video tag has no text fallback for crawlers/screen readers. And `sitemap.ts` uses `new Date()` for every page's `lastModified`, making the signal meaningless.

**Files:**
- Modify: `src/components/home/hero.tsx` (inside the video tag)
- Modify: `src/app/sitemap.ts` (remove `lastModified` or use a static date)

- [ ] **Step 1: Add video fallback text**

In `src/components/home/hero.tsx`, inside the video tag after the source element, add descriptive fallback text:

```
Taekwondo training at Master Cho's Black Belt Academy in Lynnwood, WA.
```

This text is only visible to crawlers and screen readers when the video cannot play.

- [ ] **Step 2: Remove lastModified from sitemap entries**

In `src/app/sitemap.ts`, remove `lastModified: new Date()` from all entries. A static page with no database-driven lastModified should omit the field entirely — an always-today value tells Google nothing. The entries become:

```typescript
{ url: BASE_URL, changeFrequency: "weekly", priority: 1 },
{ url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
// ... same pattern for all entries
```

- [ ] **Step 3: Run tests**

```bash
pnpm vitest run
```

- [ ] **Step 4: Commit**

```bash
git add src/components/home/hero.tsx src/app/sitemap.ts
git commit -m "fix(seo): add video fallback text, remove misleading sitemap lastModified"
```
