# Security & Critical Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the critical Clerk CVE (middleware bypass), patch the contact route body-size check, centralize site URL resolution, and tighten robots.txt — all before launch.

**Architecture:** Targeted surgical fixes to existing files. No new abstractions. Each task is independent and can be worked in any order (except Task 1 should go first).

**Tech Stack:** Next.js 16, @clerk/nextjs, Zod v4, Vitest

---

### Task 1: Update @clerk/nextjs to patch CVE (GHSA-vqx2-fgx2-5wq9)

**Why:** `@clerk/nextjs@7.0.8` has a middleware bypass vulnerability (fixed in 7.2.1+). Attackers can access all protected routes (`/members/*`, `/admin/*`, `/student-resources/*`) without authentication.

**Files:**
- Modify: `package.json` (line 12)
- Modify: `pnpm-lock.yaml` (auto-updated)

- [ ] **Step 1: Run the update**

```bash
pnpm update @clerk/nextjs
```

- [ ] **Step 2: Verify the installed version is >= 7.2.1**

```bash
pnpm list @clerk/nextjs
```

Expected: Version 7.2.1 or higher listed.

- [ ] **Step 3: Run the full test suite to check for regressions**

```bash
pnpm vitest run
```

Expected: All 257+ tests pass. If any Clerk-related tests fail, check the Clerk changelog for breaking changes.

- [ ] **Step 4: Run type check**

```bash
pnpm tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "fix(security): update @clerk/nextjs to patch middleware bypass CVE"
```

---

### Task 2: Fix contact route body-size check

**Why:** The contact route reads the `Content-Length` header to enforce a 10 KB body limit, but `Content-Length` is client-controlled — an attacker can spoof it. The invitations route already does this correctly by reading the actual body bytes.

**Files:**
- Modify: `src/app/(main)/api/contact/route.ts` (lines 25-28, ~74)
- Test: `tests/unit/api-contact.test.ts` (or wherever existing contact tests live)

- [ ] **Step 1: Find the existing contact route test file**

```bash
find tests -name '*contact*' -type f
```

- [ ] **Step 2: Write a failing test for oversized body**

Add to the existing contact route test file:

```typescript
it("rejects body larger than 10 KB regardless of Content-Length header", async () => {
  const oversizedBody = JSON.stringify({
    name: "Test",
    email: "test@example.com",
    phone: "425-555-1234",
    interests: ["general"],
    message: "x".repeat(11_000),
  });

  const response = await POST(
    new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
        "Content-Length": "100", // spoofed — should not be trusted
      },
      body: oversizedBody,
    }),
  );

  expect(response.status).toBe(413);
});
```

- [ ] **Step 3: Run the test to verify it fails**

```bash
pnpm vitest run tests/unit/api-contact.test.ts -t "rejects body larger than 10 KB"
```

Expected: FAIL — current code trusts the spoofed `Content-Length: 100` and lets the body through.

- [ ] **Step 4: Fix the route to read actual body bytes**

In `src/app/(main)/api/contact/route.ts`, replace lines 25-32 (the Content-Length check and JSON parse block) with:

```typescript
  const raw = await request.text();
  if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  const parseResult = contactSchema.safeParse(JSON.parse(raw));
```

Also remove the separate `await request.json()` call further down (around line 30-32) since we already have the raw text — parse it from `raw` instead. The full replacement block should look like:

```typescript
  const raw = await request.text();
  if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parseResult = contactSchema.safeParse(body);
```

- [ ] **Step 5: Run the test to verify it passes**

```bash
pnpm vitest run tests/unit/api-contact.test.ts
```

Expected: All contact tests pass, including the new oversized-body test.

- [ ] **Step 6: Commit**

```bash
git add src/app/(main)/api/contact/route.ts tests/unit/api-contact.test.ts
git commit -m "fix(security): validate actual body size, not Content-Length header"
```

---

### Task 3: Centralize `NEXT_PUBLIC_SITE_URL` resolution

**Why:** 5 files resolve `NEXT_PUBLIC_SITE_URL` with 4 different fallback strategies. This inconsistency means dev/preview/production environments can produce different URLs for the same intent.

**Files:**
- Create: `src/lib/site-url.ts`
- Modify: `src/lib/metadata.ts` (lines 7-12 — remove `getSiteUrl` function, import from new file)
- Modify: `src/lib/api-security.ts` (line 7 — replace inline fallback)
- Modify: `src/app/sitemap.ts` (line 5 — replace `BASE_URL`)
- Modify: `src/app/robots.ts` (line 3 — replace `BASE_URL`)
- Modify: `src/app/(main)/api/admin/invitations/route.ts` (line 16 — remove `siteUrl()` function)
- Test: `tests/unit/site-url.test.ts`

- [ ] **Step 1: Write the test**

```typescript
import { describe, it, expect, vi, afterEach } from "vitest";

describe("getSiteUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("returns NEXT_PUBLIC_SITE_URL when set", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://masterchostaekwondo.com");
    const { getSiteUrl } = await import("@/lib/site-url");
    expect(getSiteUrl()).toBe("https://masterchostaekwondo.com");
  });

  it("falls back to VERCEL_PROJECT_PRODUCTION_URL", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "masterchotkd.vercel.app");
    const { getSiteUrl } = await import("@/lib/site-url");
    expect(getSiteUrl()).toBe("https://masterchotkd.vercel.app");
  });

  it("falls back to VERCEL_URL", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "");
    vi.stubEnv("VERCEL_URL", "masterchotkd-abc123.vercel.app");
    const { getSiteUrl } = await import("@/lib/site-url");
    expect(getSiteUrl()).toBe("https://masterchotkd-abc123.vercel.app");
  });

  it("falls back to production domain when no env vars set", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "");
    vi.stubEnv("VERCEL_URL", "");
    const { getSiteUrl } = await import("@/lib/site-url");
    expect(getSiteUrl()).toBe("https://masterchostaekwondo.com");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run tests/unit/site-url.test.ts
```

Expected: FAIL — module does not exist yet.

- [ ] **Step 3: Create `src/lib/site-url.ts`**

```typescript
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://masterchostaekwondo.com";
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm vitest run tests/unit/site-url.test.ts
```

Expected: All 4 tests pass.

- [ ] **Step 5: Update all consumers**

**`src/lib/metadata.ts`** — delete lines 7-12 (the old `getSiteUrl` function) and add import:

```typescript
import { getSiteUrl } from "@/lib/site-url";
```

The rest of `metadata.ts` already calls `getSiteUrl()` at line 19, so no further changes needed.

**`src/lib/api-security.ts`** — replace line 7:

```typescript
// Before:
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// After:
import { getSiteUrl } from "@/lib/site-url";
const siteUrl = getSiteUrl();
```

**`src/app/sitemap.ts`** — replace line 5:

```typescript
// Before:
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://masterchostaekwondo.com";

// After:
import { getSiteUrl } from "@/lib/site-url";
const BASE_URL = getSiteUrl();
```

**`src/app/robots.ts`** — replace line 3:

```typescript
// Before:
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://masterchostaekwondo.com";

// After:
import { getSiteUrl } from "@/lib/site-url";
const BASE_URL = getSiteUrl();
```

**`src/app/(main)/api/admin/invitations/route.ts`** — delete the `siteUrl()` function (around line 16) and replace with:

```typescript
import { getSiteUrl } from "@/lib/site-url";
```

Then change any call from `siteUrl()` to `getSiteUrl()`.

- [ ] **Step 6: Run full test suite + type check**

```bash
pnpm vitest run && pnpm tsc --noEmit
```

Expected: All tests pass, no type errors.

- [ ] **Step 7: Commit**

```bash
git add src/lib/site-url.ts src/lib/metadata.ts src/lib/api-security.ts src/app/sitemap.ts src/app/robots.ts src/app/(main)/api/admin/invitations/route.ts tests/unit/site-url.test.ts
git commit -m "refactor: centralize NEXT_PUBLIC_SITE_URL into getSiteUrl()"
```

---

### Task 4: Block auth pages in robots.txt

**Why:** `/sign-in` and `/sign-up` offer no SEO value and waste crawl budget.

**Files:**
- Modify: `src/app/robots.ts` (line 7 — add to disallow array)
- Modify: existing robots test file (if one exists) or add assertion to existing test

- [ ] **Step 1: Update robots.ts**

In `src/app/robots.ts`, add `/sign-in/` and `/sign-up/` to the disallow array:

```typescript
disallow: ["/members/", "/students/", "/api/", "/student-resources/", "/preview/", "/sign-in/", "/sign-up/"]
```

- [ ] **Step 2: Find and update the robots test**

```bash
find tests -name '*robot*' -type f
```

If a test exists, add assertions for the new disallow entries. If not, add a simple test:

```typescript
import { describe, it, expect } from "vitest";
import robots from "@/app/robots";

describe("robots.ts", () => {
  it("blocks auth pages", () => {
    const result = robots();
    const disallow = Array.isArray(result.rules) ? result.rules[0].disallow : result.rules.disallow;
    expect(disallow).toContain("/sign-in/");
    expect(disallow).toContain("/sign-up/");
  });
});
```

- [ ] **Step 3: Run test**

```bash
pnpm vitest run tests/unit/robots.test.ts
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/app/robots.ts tests/unit/robots.test.ts
git commit -m "fix(seo): block /sign-in and /sign-up in robots.txt"
```

---

### Task 5: Extract `formatError` utility

**Why:** 5 catch blocks duplicate `{ name: err instanceof Error ? err.name : "Unknown", message: err instanceof Error ? err.message : String(err) }`.

**Files:**
- Create: `src/lib/errors.ts`
- Modify: `src/app/(main)/api/contact/route.ts` (lines 85-87)
- Modify: `src/app/(main)/api/admin/invitations/route.ts` (lines 79-81)
- Modify: `src/app/(main)/api/admin/invitations/[id]/route.ts` (find catch block)
- Modify: `src/lib/clerk-admin.ts` (find catch block)
- Modify: `src/lib/rate-limit.ts` (find catch block)
- Test: `tests/unit/errors.test.ts`

- [ ] **Step 1: Write the test**

```typescript
import { describe, it, expect } from "vitest";
import { formatError } from "@/lib/errors";

describe("formatError", () => {
  it("extracts name and message from Error instances", () => {
    const err = new TypeError("bad input");
    expect(formatError(err)).toEqual({ name: "TypeError", message: "bad input" });
  });

  it("handles non-Error values", () => {
    expect(formatError("oops")).toEqual({ name: "Unknown", message: "oops" });
    expect(formatError(42)).toEqual({ name: "Unknown", message: "42" });
    expect(formatError(null)).toEqual({ name: "Unknown", message: "null" });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run tests/unit/errors.test.ts
```

Expected: FAIL — module does not exist.

- [ ] **Step 3: Create `src/lib/errors.ts`**

```typescript
export function formatError(err: unknown): { name: string; message: string } {
  if (err instanceof Error) {
    return { name: err.name, message: err.message };
  }
  return { name: "Unknown", message: String(err) };
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm vitest run tests/unit/errors.test.ts
```

Expected: PASS.

- [ ] **Step 5: Replace all 5 catch blocks**

In each file, replace:

```typescript
{
  name: err instanceof Error ? err.name : "Unknown",
  message: err instanceof Error ? err.message : String(err),
}
```

With:

```typescript
import { formatError } from "@/lib/errors";
// ...
console.error("...", formatError(err));
```

For example, in `src/app/(main)/api/contact/route.ts` lines 85-87:

```typescript
// Before:
console.error("Contact form error", {
  name: error instanceof Error ? error.name : "Unknown",
  message: error instanceof Error ? error.message : String(error),
});

// After:
console.error("Contact form error", formatError(error));
```

Repeat for all 5 files. The import goes at the top of each file.

- [ ] **Step 6: Run full test suite + type check**

```bash
pnpm vitest run && pnpm tsc --noEmit
```

Expected: All tests pass.

- [ ] **Step 7: Commit**

```bash
git add src/lib/errors.ts tests/unit/errors.test.ts src/app/(main)/api/contact/route.ts src/app/(main)/api/admin/invitations/route.ts src/app/(main)/api/admin/invitations/\[id\]/route.ts src/lib/clerk-admin.ts src/lib/rate-limit.ts
git commit -m "refactor: extract formatError utility, DRY up 5 catch blocks"
```

---

### Task 6: Tighten `serve-protected-pdf` parameter type

**Why:** The `request` param is typed `Request | undefined` but every caller passes a `Request`. The union is unnecessary and misleading.

**Files:**
- Modify: `src/app/student-resources/_lib/serve-protected-pdf.ts` (line 8)

- [ ] **Step 1: Change the parameter type**

In `src/app/student-resources/_lib/serve-protected-pdf.ts` line 8, change:

```typescript
// Before:
  request: Request | undefined,

// After:
  request: Request,
```

Also in line 29, remove the conditional:

```typescript
// Before:
    const download = request
      ? new URL(request.url).searchParams.get("download") === "1"
      : false;

// After:
    const download = new URL(request.url).searchParams.get("download") === "1";
```

- [ ] **Step 2: Run type check to confirm all callers still compile**

```bash
pnpm tsc --noEmit
```

Expected: No errors — all 8 callers pass `Request`.

- [ ] **Step 3: Run tests**

```bash
pnpm vitest run
```

Expected: All tests pass.

- [ ] **Step 4: Commit**

```bash
git add src/app/student-resources/_lib/serve-protected-pdf.ts
git commit -m "refactor: tighten serve-protected-pdf request param to non-optional"
```

---

### Task 7: Cache Resend client as singleton

**Why:** `new Resend(...)` is instantiated on every request. Not a security issue but wasteful. Cache it like the rate limiter.

**Files:**
- Modify: `src/lib/email.ts` (lines 18-19)

- [ ] **Step 1: Add a module-level cache**

Replace the current `sendEmail` function body to cache the client:

```typescript
import { Resend } from "resend";
import { getServerEnv } from "./server-env";

const RESEND_TIMEOUT_MS = 5_000;

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(getServerEnv().RESEND_API_KEY);
  }
  return _resend;
}

type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: SendEmailParams): Promise<void> {
  const env = getServerEnv();
  const resend = getResend();

  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Resend timeout")), RESEND_TIMEOUT_MS),
  );
  const send = resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to,
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  });

  const { error } = await Promise.race([send, timeout]);
  if (error) {
    throw new Error(`Resend error: ${error.name} - ${error.message}`);
  }
}
```

- [ ] **Step 2: Run tests + type check**

```bash
pnpm vitest run && pnpm tsc --noEmit
```

Expected: All tests pass.

- [ ] **Step 3: Commit**

```bash
git add src/lib/email.ts
git commit -m "perf: cache Resend client as singleton"
```
