# Test Coverage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Lift overall Vitest coverage from ~40% statements / 29% functions to ≥90% statements / ≥85% branches / ≥90% functions / ≥90% lines (matching the global CLAUDE.md floor). Enforce thresholds in `vitest.config.ts` so regressions fail locally and in CI.

**Architecture:** Unit tests for pure libs (api-security, email, rate-limit, data files). Component tests with React Testing Library for server-rendered and client components. Route tests with mocked Clerk `auth()`. Shared patterns via `tests/setup.ts`.

**Tech Stack:** Vitest 4 (projects mode), happy-dom, @testing-library/react, `vi.mock()`.

---

## File Structure

- Modify: `vitest.config.ts` — add coverage thresholds.
- Create: `tests/unit/lib/api-security.test.ts`, `tests/unit/lib/email.test.ts`, `tests/unit/lib/rate-limit.test.ts`, `tests/unit/lib/members-home-content.test.ts`, `tests/unit/lib/current-cycle-materials.test.ts`, `tests/unit/lib/db.test.ts`, `tests/unit/lib/fonts.test.ts`, `tests/unit/lib/client-env.test.ts`, `tests/unit/lib/serve-protected-pdf.test.ts`, `tests/unit/routes/pdf-routes.test.ts`.
- Create component tests: `tests/components/bezel-card.test.tsx`, `tests/components/page-container.test.tsx`, `tests/components/marquee.test.tsx`, `tests/components/testimonials.test.tsx`, `tests/components/footer.test.tsx`, `tests/components/members-tab-bar.test.tsx`, `tests/components/resource-card.test.tsx`, `tests/components/schedule-client.test.tsx`, `tests/components/members-shared.test.tsx`, `tests/components/color-belt-page.test.tsx`, `tests/components/tiny-tigers-member-page.test.tsx`, `tests/components/weekly-training-page.test.tsx`, `tests/components/forms-page.test.tsx`, `tests/components/members-resources-page.test.tsx`, `tests/components/members-home-page.test.tsx`.

---

### Task 1: Test `api-security.ts`

**Files:**
- Create: `tests/unit/lib/api-security.test.ts`

- [ ] **Step 1: Write failing test**

Create `tests/unit/lib/api-security.test.ts`:

```ts
import { beforeEach, describe, expect, it, vi } from "vitest";

const headersMock = vi.fn();

vi.mock("next/headers", () => ({
  headers: () => headersMock(),
}));

function makeHeaders(entries: Record<string, string>): { get: (k: string) => string | null } {
  return {
    get: (key: string) => entries[key.toLowerCase()] ?? null,
  };
}

describe("validateOrigin", () => {
  beforeEach(() => {
    headersMock.mockReset();
    delete process.env.NEXT_PUBLIC_SITE_URL;
  });

  it("returns null when origin matches NEXT_PUBLIC_SITE_URL", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://masterchostaekwondo.com";
    headersMock.mockResolvedValue(makeHeaders({ origin: "https://masterchostaekwondo.com" }));
    const { validateOrigin } = await import("@/lib/api-security");
    await expect(validateOrigin()).resolves.toBeNull();
  });

  it("returns 403 when origin missing", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://masterchostaekwondo.com";
    headersMock.mockResolvedValue(makeHeaders({}));
    const { validateOrigin } = await import("@/lib/api-security");
    const res = await validateOrigin();
    expect(res).not.toBeNull();
    expect(res!.status).toBe(403);
  });

  it("returns 403 when origin differs from expected", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://masterchostaekwondo.com";
    headersMock.mockResolvedValue(makeHeaders({ origin: "https://evil.example" }));
    const { validateOrigin } = await import("@/lib/api-security");
    const res = await validateOrigin();
    expect(res!.status).toBe(403);
  });

  it("defaults to localhost when NEXT_PUBLIC_SITE_URL is unset", async () => {
    headersMock.mockResolvedValue(makeHeaders({ origin: "http://localhost:3000" }));
    const { validateOrigin } = await import("@/lib/api-security");
    await expect(validateOrigin()).resolves.toBeNull();
  });
});

describe("getClientIp", () => {
  beforeEach(() => headersMock.mockReset());

  it("prefers x-real-ip", async () => {
    headersMock.mockResolvedValue(makeHeaders({ "x-real-ip": "203.0.113.10" }));
    const { getClientIp } = await import("@/lib/api-security");
    await expect(getClientIp()).resolves.toBe("203.0.113.10");
  });

  it("falls back to x-vercel-forwarded-for", async () => {
    headersMock.mockResolvedValue(makeHeaders({ "x-vercel-forwarded-for": "203.0.113.11" }));
    const { getClientIp } = await import("@/lib/api-security");
    await expect(getClientIp()).resolves.toBe("203.0.113.11");
  });

  it("returns 'anonymous' when no IP header present", async () => {
    headersMock.mockResolvedValue(makeHeaders({}));
    const { getClientIp } = await import("@/lib/api-security");
    await expect(getClientIp()).resolves.toBe("anonymous");
  });

  it("trims whitespace from header values", async () => {
    headersMock.mockResolvedValue(makeHeaders({ "x-real-ip": "  203.0.113.12  " }));
    const { getClientIp } = await import("@/lib/api-security");
    await expect(getClientIp()).resolves.toBe("203.0.113.12");
  });
});
```

- [ ] **Step 2: Run tests**

Run: `pnpm vitest run tests/unit/lib/api-security.test.ts`
Expected: PASS (module already exists; tests cover it end-to-end).

- [ ] **Step 3: Commit**

```bash
git add tests/unit/lib/api-security.test.ts
git commit -m "test: cover validateOrigin + getClientIp"
```

---

### Task 2: Test `email.ts`

**Files:**
- Create: `tests/unit/lib/email.test.ts`

- [ ] **Step 1: Write test**

Create `tests/unit/lib/email.test.ts`:

```ts
import { beforeEach, describe, expect, it, vi } from "vitest";

const sendMock = vi.fn();

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: sendMock },
  })),
}));

vi.mock("@/lib/server-env", () => ({
  getServerEnv: () => ({
    RESEND_API_KEY: "test_key",
    RESEND_FROM_EMAIL: "noreply@example.com",
    NOTIFY_EMAIL: "owner@example.com",
  }),
}));

describe("sendEmail", () => {
  beforeEach(() => {
    sendMock.mockReset();
  });

  it("forwards the payload to Resend", async () => {
    sendMock.mockResolvedValue({ error: null, data: { id: "abc" } });
    const { sendEmail } = await import("@/lib/email");
    await sendEmail({ to: "owner@example.com", subject: "hi", html: "<p>x</p>" });
    expect(sendMock).toHaveBeenCalledWith(expect.objectContaining({
      from: "noreply@example.com",
      to: "owner@example.com",
      subject: "hi",
      html: "<p>x</p>",
    }));
  });

  it("includes replyTo when supplied", async () => {
    sendMock.mockResolvedValue({ error: null });
    const { sendEmail } = await import("@/lib/email");
    await sendEmail({ to: "a@b.com", subject: "s", html: "h", replyTo: "c@d.com" });
    expect(sendMock).toHaveBeenCalledWith(expect.objectContaining({ replyTo: "c@d.com" }));
  });

  it("throws when Resend returns error", async () => {
    sendMock.mockResolvedValue({ error: { name: "RateLimit", message: "nope" } });
    const { sendEmail } = await import("@/lib/email");
    await expect(sendEmail({ to: "x", subject: "y", html: "z" })).rejects.toThrow(/RateLimit - nope/);
  });

  it("times out if Resend hangs past 5s", async () => {
    vi.useFakeTimers();
    sendMock.mockImplementation(() => new Promise(() => {})); // never resolves
    const { sendEmail } = await import("@/lib/email");
    const promise = sendEmail({ to: "x", subject: "y", html: "z" });
    vi.advanceTimersByTime(5_001);
    await expect(promise).rejects.toThrow(/timeout/i);
    vi.useRealTimers();
  });
});
```

- [ ] **Step 2: Run test**

Run: `pnpm vitest run tests/unit/lib/email.test.ts`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add tests/unit/lib/email.test.ts
git commit -m "test: cover sendEmail (happy/err/timeout + replyTo)"
```

---

### Task 3: Test `rate-limit.ts`

**Files:**
- Create: `tests/unit/lib/rate-limit.test.ts`

- [ ] **Step 1: Write test**

Create `tests/unit/lib/rate-limit.test.ts`:

```ts
import { beforeEach, describe, expect, it, vi } from "vitest";

const limitMock = vi.fn();
const RedisFromEnvMock = vi.fn().mockReturnValue({});

vi.mock("@upstash/ratelimit", () => ({
  Ratelimit: Object.assign(
    vi.fn().mockImplementation(() => ({ limit: limitMock })),
    { slidingWindow: vi.fn().mockReturnValue("sw") },
  ),
}));

vi.mock("@upstash/redis", () => ({
  Redis: { fromEnv: RedisFromEnvMock },
}));

describe("rate-limit", () => {
  beforeEach(() => {
    limitMock.mockReset();
    vi.resetModules();
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
  });

  it("isRateLimitConfigured returns false when env vars missing", async () => {
    const { isRateLimitConfigured } = await import("@/lib/rate-limit");
    expect(isRateLimitConfigured()).toBe(false);
  });

  it("isRateLimitConfigured returns true when both env vars set", async () => {
    process.env.UPSTASH_REDIS_REST_URL = "https://upstash.example";
    process.env.UPSTASH_REDIS_REST_TOKEN = "tok";
    const { isRateLimitConfigured } = await import("@/lib/rate-limit");
    expect(isRateLimitConfigured()).toBe(true);
  });

  it("checkRateLimit short-circuits success when not configured", async () => {
    const { checkRateLimit } = await import("@/lib/rate-limit");
    await expect(checkRateLimit("ip")).resolves.toEqual({ success: true });
    expect(limitMock).not.toHaveBeenCalled();
  });

  it("checkRateLimit consults Upstash when configured", async () => {
    process.env.UPSTASH_REDIS_REST_URL = "https://upstash.example";
    process.env.UPSTASH_REDIS_REST_TOKEN = "tok";
    limitMock.mockResolvedValue({ success: false });
    const { checkRateLimit } = await import("@/lib/rate-limit");
    await expect(checkRateLimit("ip")).resolves.toEqual({ success: false });
    expect(limitMock).toHaveBeenCalledWith("ip");
  });
});
```

- [ ] **Step 2: Run test**

Run: `pnpm vitest run tests/unit/lib/rate-limit.test.ts`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add tests/unit/lib/rate-limit.test.ts
git commit -m "test: cover isRateLimitConfigured + checkRateLimit"
```

---

### Task 4: Test `serve-protected-pdf.ts` helper directly

**Files:**
- Create: `tests/unit/lib/serve-protected-pdf.test.ts`

- [ ] **Step 1: Write test**

Create `tests/unit/lib/serve-protected-pdf.test.ts`:

```ts
import { beforeEach, describe, expect, it, vi } from "vitest";

const authMock = vi.fn();

vi.mock("@clerk/nextjs/server", () => ({ auth: authMock }));

describe("serveProtectedPdf", () => {
  beforeEach(() => authMock.mockReset());

  it("returns 401 when signed out", async () => {
    authMock.mockResolvedValue({ userId: null });
    const { serveProtectedPdf } = await import("@/app/student-resources/_lib/serve-protected-pdf");
    const res = await serveProtectedPdf(undefined, "RedBlack Training Packet.pdf");
    expect(res.status).toBe(401);
  });

  it("returns 404 for traversal-style filenames", async () => {
    authMock.mockResolvedValue({ userId: "u1" });
    const { serveProtectedPdf } = await import("@/app/student-resources/_lib/serve-protected-pdf");
    const res = await serveProtectedPdf(undefined, "../etc/passwd");
    expect(res.status).toBe(404);
  });

  it("returns 404 for disallowed extensions", async () => {
    authMock.mockResolvedValue({ userId: "u1" });
    const { serveProtectedPdf } = await import("@/app/student-resources/_lib/serve-protected-pdf");
    const res = await serveProtectedPdf(undefined, "handbook.exe");
    expect(res.status).toBe(404);
  });

  it("returns 404 when file does not exist on disk", async () => {
    authMock.mockResolvedValue({ userId: "u1" });
    const { serveProtectedPdf } = await import("@/app/student-resources/_lib/serve-protected-pdf");
    const res = await serveProtectedPdf(undefined, "does-not-exist.pdf");
    expect(res.status).toBe(404);
  });

  it("serves inline when download param absent", async () => {
    authMock.mockResolvedValue({ userId: "u1" });
    const { serveProtectedPdf } = await import("@/app/student-resources/_lib/serve-protected-pdf");
    const req = new Request("http://localhost/x");
    const res = await serveProtectedPdf(req, "RedBlack Training Packet.pdf");
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Disposition")).toMatch(/^inline;/);
  });

  it("serves as attachment when ?download=1", async () => {
    authMock.mockResolvedValue({ userId: "u1" });
    const { serveProtectedPdf } = await import("@/app/student-resources/_lib/serve-protected-pdf");
    const req = new Request("http://localhost/x?download=1");
    const res = await serveProtectedPdf(req, "RedBlack Training Packet.pdf");
    expect(res.headers.get("Content-Disposition")).toMatch(/^attachment;/);
  });

  it("RFC 5987 encodes the filename", async () => {
    authMock.mockResolvedValue({ userId: "u1" });
    const { serveProtectedPdf } = await import("@/app/student-resources/_lib/serve-protected-pdf");
    const res = await serveProtectedPdf(undefined, "RedBlack Training Packet.pdf");
    expect(res.headers.get("Content-Disposition")).toContain("filename*=UTF-8''RedBlack%20Training%20Packet.pdf");
  });
});
```

- [ ] **Step 2: Run test**

Run: `pnpm vitest run tests/unit/lib/serve-protected-pdf.test.ts`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add tests/unit/lib/serve-protected-pdf.test.ts
git commit -m "test: cover serveProtectedPdf helper"
```

---

### Task 5: Smoke-test the 7 uncovered PDF routes

**Files:**
- Create: `tests/unit/routes/pdf-routes.test.ts`

Context: each route is a 2-line wrapper around `serveProtectedPdf`. A tight smoke — "signed-out returns 401" — is enough to bump each from 0% to 100% coverage without copy-paste bloat.

- [ ] **Step 1: Write test**

Create `tests/unit/routes/pdf-routes.test.ts`:

```ts
import { beforeEach, describe, expect, it, vi } from "vitest";

const authMock = vi.fn();
vi.mock("@clerk/nextjs/server", () => ({ auth: authMock }));

// Static imports only — Vite's import analysis rejects variable paths.
import * as colorBeltHandbook from "@/app/student-resources/color-belt-handbook/route";
import * as monthlyChoreSheet from "@/app/student-resources/monthly-chore-sheet/route";
import * as readingList from "@/app/student-resources/reading-list/route";
import * as respectSheet from "@/app/student-resources/respect-sheet/route";
import * as starChart from "@/app/student-resources/star-chart/route";
import * as testingEssayTopics from "@/app/student-resources/testing-essay-topics/route";
import * as tinyTigerHandbook from "@/app/student-resources/tiny-tiger-handbook/route";

const routes: readonly [string, { GET: (req: Request) => Promise<Response> }][] = [
  ["color-belt-handbook", colorBeltHandbook],
  ["monthly-chore-sheet", monthlyChoreSheet],
  ["reading-list", readingList],
  ["respect-sheet", respectSheet],
  ["star-chart", starChart],
  ["testing-essay-topics", testingEssayTopics],
  ["tiny-tiger-handbook", tinyTigerHandbook],
];

describe("protected PDF routes", () => {
  beforeEach(() => authMock.mockReset());

  it.each(routes)("%s returns 401 for signed-out users", async (_label, mod) => {
    authMock.mockResolvedValue({ userId: null });
    const res = await mod.GET(new Request("http://localhost/x"));
    expect(res.status).toBe(401);
  });

  it.each(routes)("%s returns 200 for signed-in users", async (_label, mod) => {
    authMock.mockResolvedValue({ userId: "u1" });
    const res = await mod.GET(new Request("http://localhost/x"));
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("application/pdf");
  });
});
```

- [ ] **Step 2: Run test**

Run: `pnpm vitest run tests/unit/routes/pdf-routes.test.ts`
Expected: PASS (all 7 routes covered).

- [ ] **Step 3: Commit**

```bash
git add tests/unit/routes/pdf-routes.test.ts
git commit -m "test: smoke-cover remaining protected PDF routes"
```

---

### Task 6: Test structural data modules

**Files:**
- Create: `tests/unit/lib/members-home-content.test.ts`
- Create: `tests/unit/lib/current-cycle-materials.test.ts`

- [ ] **Step 1: Write tests**

Create `tests/unit/lib/members-home-content.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import * as mod from "@/lib/members-home-content";

describe("members-home-content", () => {
  it("exports non-empty arrays or objects from every top-level export", () => {
    const entries = Object.entries(mod);
    expect(entries.length).toBeGreaterThan(0);
    for (const [name, value] of entries) {
      if (typeof value === "function") continue;
      if (Array.isArray(value)) {
        expect(value.length, `${name} is empty`).toBeGreaterThan(0);
      } else if (value && typeof value === "object") {
        expect(Object.keys(value).length, `${name} has no keys`).toBeGreaterThan(0);
      }
    }
  });
});
```

Create `tests/unit/lib/current-cycle-materials.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import * as mod from "@/lib/current-cycle-materials";

describe("current-cycle-materials", () => {
  it("exports at least one data value", () => {
    expect(Object.keys(mod).length).toBeGreaterThan(0);
  });

  it("every exported array has stable shape (contains objects)", () => {
    for (const [name, value] of Object.entries(mod)) {
      if (Array.isArray(value) && value.length > 0) {
        expect(typeof value[0], `${name}[0] should be an object`).toBe("object");
      }
    }
  });
});
```

- [ ] **Step 2: Run tests**

Run: `pnpm vitest run tests/unit/lib/members-home-content.test.ts tests/unit/lib/current-cycle-materials.test.ts`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add tests/unit/lib/members-home-content.test.ts tests/unit/lib/current-cycle-materials.test.ts
git commit -m "test: structural coverage for members content + current-cycle-materials"
```

---

### Task 7: Test tiny utility libs (db, fonts, client-env)

**Files:**
- Create: `tests/unit/lib/db.test.ts`
- Create: `tests/unit/lib/fonts.test.ts`
- Create: `tests/unit/lib/client-env.test.ts`

- [ ] **Step 1: Write tests**

Create `tests/unit/lib/db.test.ts`:

```ts
import { describe, it, expect, vi } from "vitest";

vi.mock("@prisma/client", () => ({
  PrismaClient: vi.fn().mockImplementation(() => ({ $connect: vi.fn() })),
}));

describe("db", () => {
  it("exports a Prisma client instance", async () => {
    const { db } = await import("@/lib/db");
    expect(db).toBeDefined();
  });
});
```

Create `tests/unit/lib/fonts.test.ts`:

```ts
import { describe, it, expect, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Oswald: () => ({ variable: "--font-heading", className: "oswald" }),
  Barlow: () => ({ variable: "--font-body", className: "barlow" }),
}));

describe("fonts", () => {
  it("exports heading + body font objects", async () => {
    const { heading, body } = await import("@/lib/fonts");
    expect(heading.variable).toBe("--font-heading");
    expect(body.variable).toBe("--font-body");
  });
});
```

Create `tests/unit/lib/client-env.test.ts`:

```ts
import { describe, it, expect, beforeEach } from "vitest";

describe("client-env", () => {
  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  });

  it("returns an object with public env keys", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    const mod = await import("@/lib/client-env");
    // Touch every exported function/value to register coverage.
    for (const [, v] of Object.entries(mod)) {
      if (typeof v === "function") (v as () => unknown)();
    }
    expect(mod).toBeDefined();
  });
});
```

- [ ] **Step 2: Run tests**

Run: `pnpm vitest run tests/unit/lib/db.test.ts tests/unit/lib/fonts.test.ts tests/unit/lib/client-env.test.ts`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add tests/unit/lib/db.test.ts tests/unit/lib/fonts.test.ts tests/unit/lib/client-env.test.ts
git commit -m "test: basic coverage for db, fonts, client-env"
```

---

### Task 8: Component tests — `BezelCard`, `PageContainer`, `Marquee`, `Footer`, `Testimonials`, `ScheduleClient`, `MembersTabBar`, `ResourceCard`, `MembersShared`

**Files:**
- Create: `tests/components/bezel-card.test.tsx`, `tests/components/page-container.test.tsx`, `tests/components/marquee.test.tsx`, `tests/components/footer.test.tsx`, `tests/components/testimonials.test.tsx`, `tests/components/schedule-client.test.tsx`, `tests/components/members-tab-bar.test.tsx`, `tests/components/resource-card.test.tsx`, `tests/components/members-shared.test.tsx`

- [ ] **Step 1: `BezelCard`**

Create `tests/components/bezel-card.test.tsx`:

```tsx
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BezelCard } from "@/components/ui/bezel-card";

describe("BezelCard", () => {
  it("renders children", () => {
    const { getByText } = render(<BezelCard><span>hello</span></BezelCard>);
    expect(getByText("hello")).toBeInTheDocument();
  });

  it("applies xl radius by default", () => {
    const { container } = render(<BezelCard>x</BezelCard>);
    expect(container.firstChild).toHaveClass("rounded-[2rem]");
  });

  it("applies lg radius when requested", () => {
    const { container } = render(<BezelCard radius="lg">x</BezelCard>);
    expect(container.firstChild).toHaveClass("rounded-[1.5rem]");
  });

  it("passes className through to outer shell", () => {
    const { container } = render(<BezelCard className="custom-foo">x</BezelCard>);
    expect(container.firstChild).toHaveClass("custom-foo");
  });
});
```

- [ ] **Step 2: `PageContainer`**

Create `tests/components/page-container.test.tsx`:

```tsx
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PageContainer } from "@/components/ui/page-container";

describe("PageContainer", () => {
  it("wraps children in a centered max-width container", () => {
    const { container, getByText } = render(<PageContainer><p>inner</p></PageContainer>);
    expect(getByText("inner")).toBeInTheDocument();
    expect(container.querySelector("div")).toHaveClass("mx-auto");
  });
});
```

- [ ] **Step 3: `Marquee`**

Create `tests/components/marquee.test.tsx`:

```tsx
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Marquee } from "@/components/home/marquee";

describe("Marquee", () => {
  it("renders the marquee container", () => {
    const { container } = render(<Marquee />);
    expect(container.querySelector(".animate-marquee")).not.toBeNull();
  });
});
```

- [ ] **Step 4: `Footer`**

Create `tests/components/footer.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "@/components/layout/footer";

describe("Footer", () => {
  it("renders the current year in the copyright", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
```

- [ ] **Step 5: `Testimonials`**

Create `tests/components/testimonials.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Testimonials } from "@/components/home/testimonials";

describe("Testimonials", () => {
  it("renders three featured reviews", async () => {
    const rendered = await Testimonials();
    render(rendered);
    expect(screen.getByText(/success stories/i)).toBeInTheDocument();
    expect(screen.getAllByText(/MCTKD (Parent|Student)/i).length).toBeGreaterThanOrEqual(3);
  });
});
```

- [ ] **Step 6: `ScheduleClient`**

Create `tests/components/schedule-client.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ScheduleClient } from "@/components/schedule/schedule-client";

describe("ScheduleClient", () => {
  it("renders the schedule grid", () => {
    render(<ScheduleClient />);
    expect(screen.getByText(/tiny tigers/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 7: `MembersTabBar`**

Create `tests/components/members-tab-bar.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/members/curriculum",
}));

import { MembersTabBar } from "@/components/members/members-tab-bar";

describe("MembersTabBar", () => {
  it("renders every tab link", () => {
    render(<MembersTabBar />);
    expect(screen.getByRole("link", { name: /announcements/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /resources/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 8: `ResourceCard`**

Create `tests/components/resource-card.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ResourceCard } from "@/components/members/resource-card";

describe("ResourceCard", () => {
  it("renders title, description, download label", () => {
    render(<ResourceCard title="Handbook" description="desc" href="/x" />);
    expect(screen.getByRole("link", { name: /handbook/i })).toHaveAttribute("href", "/x");
    expect(screen.getByText("desc")).toBeInTheDocument();
    expect(screen.getByText(/download pdf/i)).toBeInTheDocument();
  });

  it("renders preview image when provided", () => {
    render(<ResourceCard title="A" href="/a" previewImageSrc="/images/resources/star-chart-preview.png" />);
    expect(screen.getByAltText(/a preview/i)).toBeInTheDocument();
  });

  it("supports light tone", () => {
    const { container } = render(<ResourceCard title="A" href="/a" tone="light" />);
    expect(container.querySelector("a")).toHaveClass("bg-brand-cream");
  });
});
```

- [ ] **Step 9: `members/shared.tsx`**

Create `tests/components/members-shared.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SectionHeader, VideoCard, VideoPlaceholder } from "@/components/members/shared";

describe("members shared", () => {
  it("SectionHeader renders label + title + description", () => {
    render(<SectionHeader label="L" title="T" description="D" />);
    expect(screen.getByText("L")).toBeInTheDocument();
    expect(screen.getByText("T")).toBeInTheDocument();
    expect(screen.getByText("D")).toBeInTheDocument();
  });

  it("VideoCard renders eyebrow + title + subtitle", () => {
    render(<VideoCard eyebrow="E" title="T" subtitle="S" />);
    expect(screen.getByText("E")).toBeInTheDocument();
    expect(screen.getByText("T")).toBeInTheDocument();
    expect(screen.getByText("S")).toBeInTheDocument();
  });

  it("VideoPlaceholder renders a placeholder element", () => {
    render(<VideoPlaceholder title="T" />);
    expect(screen.getByText(/T/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 10: Run all new tests**

Run: `pnpm vitest run tests/components/bezel-card.test.tsx tests/components/page-container.test.tsx tests/components/marquee.test.tsx tests/components/footer.test.tsx tests/components/testimonials.test.tsx tests/components/schedule-client.test.tsx tests/components/members-tab-bar.test.tsx tests/components/resource-card.test.tsx tests/components/members-shared.test.tsx`
Expected: PASS.

- [ ] **Step 11: Commit**

```bash
git add tests/components
git commit -m "test: cover BezelCard, PageContainer, Marquee, Footer, Testimonials, ScheduleClient, MembersTabBar, ResourceCard, members shared"
```

---

### Task 9: Test member curriculum pages (color-belt, red-black-belt already covered, tiny-tigers, weekly-training, forms, resources, members home)

**Files:**
- Create: `tests/components/color-belt-page.test.tsx`, `tests/components/tiny-tigers-member-page.test.tsx`, `tests/components/weekly-training-page.test.tsx`, `tests/components/forms-page.test.tsx`, `tests/components/members-resources-page.test.tsx`, `tests/components/members-home-page.test.tsx`

Note: server-component pages that read Clerk or fetch data need mocks. Pure-data pages render directly.

- [ ] **Step 1: Color Belt page (client component)**

Create `tests/components/color-belt-page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ColorBeltPage from "@/app/(main)/students/curriculum/color-belt/page";

describe("ColorBeltPage", () => {
  it("renders the overview heading", () => {
    render(<ColorBeltPage />);
    expect(screen.getByRole("heading", { level: 1, name: /color belt curriculum/i })).toBeInTheDocument();
  });

  it("lists the nine belts via overview cards", () => {
    render(<ColorBeltPage />);
    ["White", "Orange", "Yellow", "Camo", "Green", "Purple", "Blue", "Brown", "Red"].forEach((belt) => {
      expect(screen.getAllByText(new RegExp(belt)).length).toBeGreaterThan(0);
    });
  });

  it("shows poomsae videos section", () => {
    render(<ColorBeltPage />);
    expect(screen.getByRole("heading", { level: 2, name: /poomsae videos/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Tiny Tigers member page**

Create `tests/components/tiny-tigers-member-page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TinyTigersMemberPage from "@/app/(main)/students/curriculum/tiny-tigers/page";

describe("TinyTigersMemberPage", () => {
  it("renders the heading", () => {
    render(<TinyTigersMemberPage />);
    expect(screen.getByRole("heading", { level: 1, name: /tiny tigers/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Weekly Training page**

Create `tests/components/weekly-training-page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import WeeklyTrainingPage from "@/app/(main)/students/curriculum/weekly-training/page";

describe("WeeklyTrainingPage", () => {
  it("renders the 5-week heading", () => {
    render(<WeeklyTrainingPage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
```

- [ ] **Step 4: Forms page**

Create `tests/components/forms-page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FormsPage from "@/app/(main)/students/forms/page";

describe("FormsPage", () => {
  it("renders the forms heading", () => {
    render(<FormsPage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
```

- [ ] **Step 5: Members resources page**

Create `tests/components/members-resources-page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ResourcesPage from "@/app/(main)/students/resources/page";

describe("Members ResourcesPage", () => {
  it("renders resource cards", () => {
    render(<ResourcesPage />);
    expect(screen.getAllByText(/download pdf/i).length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 6: Members home page (may need Clerk mock)**

Create `tests/components/members-home-page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("@clerk/nextjs/server", () => ({
  currentUser: vi.fn().mockResolvedValue({ firstName: "Test" }),
}));

import MembersHomePage from "@/app/(main)/students/page";

describe("MembersHomePage", () => {
  it("renders members landing heading", async () => {
    const rendered = await MembersHomePage();
    render(rendered);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
```

- [ ] **Step 7: Run all page tests**

Run: `pnpm vitest run tests/components/color-belt-page.test.tsx tests/components/tiny-tigers-member-page.test.tsx tests/components/weekly-training-page.test.tsx tests/components/forms-page.test.tsx tests/components/members-resources-page.test.tsx tests/components/members-home-page.test.tsx`
Expected: PASS. If a page fails because it awaits Clerk or another async source, add mocks in that specific test file following the `members-home-page.test.tsx` pattern.

- [ ] **Step 8: Commit**

```bash
git add tests/components
git commit -m "test: cover member curriculum + forms + resources + home pages"
```

---

### Task 10: Enforce coverage thresholds

**Files:**
- Modify: `vitest.config.ts`

- [ ] **Step 1: Capture current coverage baseline**

Run: `pnpm vitest run --coverage 2>&1 | tail -20`
Expected: coverage numbers printed. Note the current statements/branches/functions/lines.

- [ ] **Step 2: Add thresholds**

Edit `vitest.config.ts`. Replace the `coverage:` block with:

```ts
coverage: {
  reporter: ["text", "lcov"],
  include: ["src/**/*.{ts,tsx}"],
  exclude: [
    "src/app/**/layout.tsx",
    "src/app/**/loading.tsx",
    "src/app/(auth)/**",
    "src/app/(main)/preview/**",
    "src/instrumentation.ts",
  ],
  thresholds: {
    statements: 90,
    branches: 85,
    functions: 90,
    lines: 90,
  },
},
```

- [ ] **Step 3: Run with thresholds**

Run: `pnpm vitest run --coverage`
Expected: PASS if the previous tasks landed as planned. If not, the output lists files under threshold — add targeted tests to those files before proceeding.

- [ ] **Step 4: Lint + typecheck sweep**

```bash
pnpm tsc --noEmit
pnpm lint
```
Expected: zero errors.

- [ ] **Step 5: Commit**

```bash
git add vitest.config.ts
git commit -m "test: enforce 90/85/90/90 coverage thresholds"
```

---

### Task 11: Run CI-equivalent pipeline + open PR

**Files:** none modified.

- [ ] **Step 1: Full local pipeline**

```bash
pnpm tsc --noEmit
pnpm lint
pnpm vitest run --coverage
pnpm build
```
Expected: all clean, coverage ≥ thresholds.

- [ ] **Step 2: Push + open PR**

```bash
git push -u origin perf-investigation
gh pr create --title "test: raise coverage to 90%+ and enforce thresholds" --body "$(cat <<'EOF'
## Summary
- Unit tests for `api-security`, `email`, `rate-limit`, `serve-protected-pdf`, structural data modules, db/fonts/client-env
- Route smoke tests for all 7 previously uncovered protected PDF routes
- Component tests for `BezelCard`, `PageContainer`, `Marquee`, `Footer`, `Testimonials`, `ScheduleClient`, `MembersTabBar`, `ResourceCard`, `members/shared`
- Page tests for members curriculum (color-belt, tiny-tigers), weekly-training, forms, resources, members home
- Coverage thresholds in `vitest.config.ts`: 90 statements / 85 branches / 90 functions / 90 lines

## Test plan
- [x] `pnpm vitest run --coverage` meets thresholds
- [x] `pnpm tsc --noEmit`
- [x] `pnpm lint`
- [x] `pnpm build`
EOF
)"
```

---
