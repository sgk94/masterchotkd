# Clerk Invitation-Only Sign-Up Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Lock down `/sign-up` so only people who received an emailed invitation from an admin can create an account, and the email on the invitation is the only address that can complete that sign-up.

**Architecture:** Two-part system. (1) Clerk Dashboard sets sign-up mode to **Restricted** so the public `/sign-up` page rejects every email Clerk does not have an active invitation for. (2) An admin-only API + page (`/admin/invitations`) calls Clerk's Backend SDK (`clerkClient.invitations.*`) to create, list, and revoke invitations. Clerk handles the invitation email and the `__clerk_ticket`-bound sign-up flow — we never roll our own. Admin authorization uses `auth().userId` + `clerkClient.users.getUser(...).publicMetadata.role === "admin"` (no Clerk Organizations needed for a single dojang).

**Tech Stack:** Next.js 16 App Router (Server Components + Route Handlers), Clerk (`@clerk/nextjs` 7.x — `clerkClient` from `/server`), Zod v4 for input validation, existing `validateOrigin` + `checkRateLimit` helpers, Vitest + Testing Library for tests.

---

## File Structure

- Create: `src/lib/clerk-admin.ts` — `requireAdmin()` helper that returns a `NextResponse` (401/403) on failure or `null` on success; one responsibility, easy to mock in tests.
- Create: `src/schemas/invitation.ts` — `invitationCreateSchema` (Zod) for the POST body.
- Create: `src/app/(main)/api/admin/invitations/route.ts` — `POST` (create + email) and `GET` (list pending).
- Create: `src/app/(main)/api/admin/invitations/[id]/route.ts` — `DELETE` (revoke).
- Create: `src/app/(main)/admin/layout.tsx` — Server Component that calls `requireAdminUI()` and `redirect()`s non-admins.
- Create: `src/app/(main)/admin/invitations/page.tsx` — Server Component listing pending invitations + rendering `<InviteForm>`.
- Create: `src/components/admin/invite-form.tsx` — `"use client"` form (email input → POST `/api/admin/invitations`).
- Create: `src/components/admin/revoke-button.tsx` — `"use client"` button (DELETE `/api/admin/invitations/[id]` then `router.refresh()`).
- Create: `tests/unit/lib/clerk-admin.test.ts` — covers signed-out (401), non-admin (403), admin (null).
- Create: `tests/unit/schemas/invitation.test.ts` — Zod parse cases.
- Create: `tests/unit/routes/admin-invitations.test.ts` — POST/GET/DELETE branch coverage with `clerkClient` mocked.
- Create: `tests/components/invite-form.test.tsx` — submits, shows success, surfaces errors.
- Modify: `CLAUDE.md` — add admin route, invitation flow notes, and the Clerk Restricted-mode gotcha.
- Modify: `LAUNCH-RUNBOOK.md` (only if it already exists in the repo) — add the dashboard toggle step. Skip this task entirely if the file is missing.

---

### Task 1: `requireAdmin()` helper

**Files:**
- Create: `src/lib/clerk-admin.ts`
- Test: `tests/unit/lib/clerk-admin.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/unit/lib/clerk-admin.test.ts`:

```ts
import { beforeEach, describe, expect, it, vi } from "vitest";

const { authMock, getUserMock } = vi.hoisted(() => ({
  authMock: vi.fn(),
  getUserMock: vi.fn(),
}));

vi.mock("@clerk/nextjs/server", () => ({
  auth: authMock,
  clerkClient: () => ({ users: { getUser: getUserMock } }),
}));

describe("requireAdmin", () => {
  beforeEach(() => {
    authMock.mockReset();
    getUserMock.mockReset();
  });

  it("returns 401 when signed out", async () => {
    authMock.mockResolvedValue({ userId: null });
    const { requireAdmin } = await import("@/lib/clerk-admin");
    const result = await requireAdmin();
    expect(result?.status).toBe(401);
  });

  it("returns 403 when user is not admin", async () => {
    authMock.mockResolvedValue({ userId: "user_1" });
    getUserMock.mockResolvedValue({ publicMetadata: { role: "member" } });
    const { requireAdmin } = await import("@/lib/clerk-admin");
    const result = await requireAdmin();
    expect(result?.status).toBe(403);
  });

  it("returns null when user is admin", async () => {
    authMock.mockResolvedValue({ userId: "user_1" });
    getUserMock.mockResolvedValue({ publicMetadata: { role: "admin" } });
    const { requireAdmin } = await import("@/lib/clerk-admin");
    const result = await requireAdmin();
    expect(result).toBeNull();
  });

  it("returns 403 when publicMetadata is empty", async () => {
    authMock.mockResolvedValue({ userId: "user_1" });
    getUserMock.mockResolvedValue({ publicMetadata: {} });
    const { requireAdmin } = await import("@/lib/clerk-admin");
    const result = await requireAdmin();
    expect(result?.status).toBe(403);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/unit/lib/clerk-admin.test.ts`
Expected: FAIL with `Cannot find module '@/lib/clerk-admin'`.

- [ ] **Step 3: Write the helper**

Create `src/lib/clerk-admin.ts`:

```ts
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function requireAdmin(): Promise<NextResponse | null> {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await clerkClient().users.getUser(userId);
  const role = (user.publicMetadata as { role?: string })?.role;
  if (role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return null;
}

export async function isAdminUser(): Promise<boolean> {
  return (await requireAdmin()) === null;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/unit/lib/clerk-admin.test.ts`
Expected: PASS — 4 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/clerk-admin.ts tests/unit/lib/clerk-admin.test.ts
git commit -m "feat(auth): add requireAdmin Clerk role guard helper"
```

---

### Task 2: Invitation Zod schema

**Files:**
- Create: `src/schemas/invitation.ts`
- Test: `tests/unit/schemas/invitation.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/unit/schemas/invitation.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { invitationCreateSchema } from "@/schemas/invitation";

describe("invitationCreateSchema", () => {
  it("accepts a valid email", () => {
    const result = invitationCreateSchema.safeParse({ email: "parent@example.com" });
    expect(result.success).toBe(true);
  });

  it("trims and lowercases email", () => {
    const result = invitationCreateSchema.safeParse({ email: "  PARENT@Example.COM  " });
    expect(result.success).toBe(true);
    expect(result.data?.email).toBe("parent@example.com");
  });

  it("rejects invalid email format", () => {
    const result = invitationCreateSchema.safeParse({ email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects missing email", () => {
    const result = invitationCreateSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("caps email length at 254 (RFC 5321)", () => {
    const long = `${"a".repeat(250)}@x.io`;
    const result = invitationCreateSchema.safeParse({ email: long });
    expect(result.success).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/unit/schemas/invitation.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Write the schema**

Create `src/schemas/invitation.ts`:

```ts
import { z } from "zod";

export const invitationCreateSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address")
    .max(254, "Email must be 254 characters or fewer"),
});

export type InvitationCreateInput = z.infer<typeof invitationCreateSchema>;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/unit/schemas/invitation.test.ts`
Expected: PASS — 5 tests.

- [ ] **Step 5: Commit**

```bash
git add src/schemas/invitation.ts tests/unit/schemas/invitation.test.ts
git commit -m "feat(schemas): add invitationCreateSchema"
```

---

### Task 3: Admin invitations API route — POST + GET

**Files:**
- Create: `src/app/(main)/api/admin/invitations/route.ts`
- Test: `tests/unit/routes/admin-invitations.test.ts`

- [ ] **Step 1: Write the failing test (POST + GET branches)**

Create `tests/unit/routes/admin-invitations.test.ts`:

```ts
import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  authMock,
  getUserMock,
  createInvitationMock,
  getInvitationListMock,
  revokeInvitationMock,
  validateOriginMock,
  checkRateLimitMock,
  getClientIpMock,
} = vi.hoisted(() => ({
  authMock: vi.fn(),
  getUserMock: vi.fn(),
  createInvitationMock: vi.fn(),
  getInvitationListMock: vi.fn(),
  revokeInvitationMock: vi.fn(),
  validateOriginMock: vi.fn(),
  checkRateLimitMock: vi.fn(),
  getClientIpMock: vi.fn(),
}));

vi.mock("@clerk/nextjs/server", () => ({
  auth: authMock,
  clerkClient: () => ({
    users: { getUser: getUserMock },
    invitations: {
      createInvitation: createInvitationMock,
      getInvitationList: getInvitationListMock,
      revokeInvitation: revokeInvitationMock,
    },
  }),
}));

vi.mock("@/lib/api-security", () => ({
  validateOrigin: validateOriginMock,
  getClientIp: getClientIpMock,
}));

vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: checkRateLimitMock,
}));

function asAdmin(): void {
  authMock.mockResolvedValue({ userId: "user_admin" });
  getUserMock.mockResolvedValue({ publicMetadata: { role: "admin" } });
}

function asMember(): void {
  authMock.mockResolvedValue({ userId: "user_member" });
  getUserMock.mockResolvedValue({ publicMetadata: { role: "member" } });
}

function jsonRequest(body: unknown): Request {
  return new Request("http://localhost/api/admin/invitations", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
  });
}

beforeEach(() => {
  authMock.mockReset();
  getUserMock.mockReset();
  createInvitationMock.mockReset();
  getInvitationListMock.mockReset();
  validateOriginMock.mockReset().mockResolvedValue(null);
  checkRateLimitMock.mockReset().mockResolvedValue({ success: true });
  getClientIpMock.mockReset().mockResolvedValue("203.0.113.1");
  process.env.NEXT_PUBLIC_SITE_URL = "https://masterchostaekwondo.com";
});

describe("POST /api/admin/invitations", () => {
  it("returns 403 when origin invalid", async () => {
    asAdmin();
    const { POST } = await import(
      "@/app/(main)/api/admin/invitations/route"
    );
    validateOriginMock.mockResolvedValue(
      new Response("forbidden", { status: 403 }),
    );
    const res = await POST(jsonRequest({ email: "x@y.com" }));
    expect(res.status).toBe(403);
  });

  it("returns 401 when signed out", async () => {
    authMock.mockResolvedValue({ userId: null });
    const { POST } = await import(
      "@/app/(main)/api/admin/invitations/route"
    );
    const res = await POST(jsonRequest({ email: "x@y.com" }));
    expect(res.status).toBe(401);
  });

  it("returns 403 when user is not admin", async () => {
    asMember();
    const { POST } = await import(
      "@/app/(main)/api/admin/invitations/route"
    );
    const res = await POST(jsonRequest({ email: "x@y.com" }));
    expect(res.status).toBe(403);
  });

  it("returns 429 when rate limited", async () => {
    asAdmin();
    checkRateLimitMock.mockResolvedValue({ success: false });
    const { POST } = await import(
      "@/app/(main)/api/admin/invitations/route"
    );
    const res = await POST(jsonRequest({ email: "x@y.com" }));
    expect(res.status).toBe(429);
  });

  it("returns 400 on invalid email", async () => {
    asAdmin();
    const { POST } = await import(
      "@/app/(main)/api/admin/invitations/route"
    );
    const res = await POST(jsonRequest({ email: "nope" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 on bad JSON body", async () => {
    asAdmin();
    const { POST } = await import(
      "@/app/(main)/api/admin/invitations/route"
    );
    const req = new Request("http://localhost/api/admin/invitations", {
      method: "POST",
      body: "not json",
      headers: { "content-type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 201 and calls createInvitation with normalized email + redirectUrl", async () => {
    asAdmin();
    createInvitationMock.mockResolvedValue({
      id: "inv_1",
      emailAddress: "parent@example.com",
      status: "pending",
    });
    const { POST } = await import(
      "@/app/(main)/api/admin/invitations/route"
    );
    const res = await POST(jsonRequest({ email: "  PARENT@Example.com  " }));
    expect(res.status).toBe(201);
    expect(createInvitationMock).toHaveBeenCalledWith({
      emailAddress: "parent@example.com",
      redirectUrl: "https://masterchostaekwondo.com/sign-up",
      notify: true,
    });
  });

  it("returns 502 when Clerk createInvitation throws", async () => {
    asAdmin();
    createInvitationMock.mockRejectedValue(new Error("clerk down"));
    const { POST } = await import(
      "@/app/(main)/api/admin/invitations/route"
    );
    const res = await POST(jsonRequest({ email: "x@y.com" }));
    expect(res.status).toBe(502);
  });
});

describe("GET /api/admin/invitations", () => {
  it("returns 401 when signed out", async () => {
    authMock.mockResolvedValue({ userId: null });
    const { GET } = await import(
      "@/app/(main)/api/admin/invitations/route"
    );
    const res = await GET();
    expect(res.status).toBe(401);
  });

  it("returns 403 when not admin", async () => {
    asMember();
    const { GET } = await import(
      "@/app/(main)/api/admin/invitations/route"
    );
    const res = await GET();
    expect(res.status).toBe(403);
  });

  it("returns 200 with pending invitations for admin", async () => {
    asAdmin();
    getInvitationListMock.mockResolvedValue({
      data: [
        { id: "inv_1", emailAddress: "a@b.com", status: "pending", createdAt: 1 },
      ],
    });
    const { GET } = await import(
      "@/app/(main)/api/admin/invitations/route"
    );
    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.invitations).toHaveLength(1);
    expect(getInvitationListMock).toHaveBeenCalledWith({ status: "pending", limit: 100 });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/unit/routes/admin-invitations.test.ts`
Expected: FAIL — `Cannot find module '@/app/(main)/api/admin/invitations/route'`.

- [ ] **Step 3: Implement the route**

Create `src/app/(main)/api/admin/invitations/route.ts`:

```ts
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/clerk-admin";
import { getClientIp, validateOrigin } from "@/lib/api-security";
import { checkRateLimit } from "@/lib/rate-limit";
import { invitationCreateSchema } from "@/schemas/invitation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 10;

const MAX_BODY_BYTES = 2_000;

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export async function POST(request: Request): Promise<NextResponse> {
  const originError = await validateOrigin();
  if (originError) return originError;

  const adminError = await requireAdmin();
  if (adminError) return adminError;

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  const ip = await getClientIp();
  const { success: ok } = await checkRateLimit(`invite:${ip}`);
  if (!ok) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = invitationCreateSchema.safeParse(body);
  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    return NextResponse.json(
      { error: "Invalid input", fieldErrors },
      { status: 400 },
    );
  }

  try {
    const invitation = await clerkClient().invitations.createInvitation({
      emailAddress: parsed.data.email,
      redirectUrl: `${siteUrl()}/sign-up`,
      notify: true,
    });
    return NextResponse.json(
      {
        invitation: {
          id: invitation.id,
          emailAddress: invitation.emailAddress,
          status: invitation.status,
        },
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("Clerk createInvitation failed", {
      name: err instanceof Error ? err.name : "Unknown",
      message: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      { error: "Could not send invitation. Try again." },
      { status: 502 },
    );
  }
}

export async function GET(): Promise<NextResponse> {
  const adminError = await requireAdmin();
  if (adminError) return adminError;

  const list = await clerkClient().invitations.getInvitationList({
    status: "pending",
    limit: 100,
  });
  return NextResponse.json({
    invitations: list.data.map((i) => ({
      id: i.id,
      emailAddress: i.emailAddress,
      status: i.status,
      createdAt: i.createdAt,
    })),
  });
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/unit/routes/admin-invitations.test.ts`
Expected: PASS — 11 tests.

- [ ] **Step 5: Commit**

```bash
git add src/app/\(main\)/api/admin/invitations/route.ts tests/unit/routes/admin-invitations.test.ts
git commit -m "feat(api): add admin invitations create + list route"
```

---

### Task 4: Admin invitations API route — DELETE (revoke)

**Files:**
- Create: `src/app/(main)/api/admin/invitations/[id]/route.ts`
- Test: append to `tests/unit/routes/admin-invitations.test.ts`

- [ ] **Step 1: Write the failing test**

Append to `tests/unit/routes/admin-invitations.test.ts` (the `revokeInvitationMock` is already declared in Task 3's hoisted mock — no extra setup needed):

```ts
describe("DELETE /api/admin/invitations/[id]", () => {
  beforeEach(() => revokeInvitationMock.mockReset());

  it("returns 401 when signed out", async () => {
    authMock.mockResolvedValue({ userId: null });
    const { DELETE } = await import(
      "@/app/(main)/api/admin/invitations/[id]/route"
    );
    const res = await DELETE(new Request("http://localhost/x"), {
      params: Promise.resolve({ id: "inv_1" }),
    });
    expect(res.status).toBe(401);
  });

  it("returns 403 when not admin", async () => {
    asMember();
    const { DELETE } = await import(
      "@/app/(main)/api/admin/invitations/[id]/route"
    );
    const res = await DELETE(new Request("http://localhost/x"), {
      params: Promise.resolve({ id: "inv_1" }),
    });
    expect(res.status).toBe(403);
  });

  it("returns 400 when id missing or malformed", async () => {
    asAdmin();
    const { DELETE } = await import(
      "@/app/(main)/api/admin/invitations/[id]/route"
    );
    const res = await DELETE(new Request("http://localhost/x"), {
      params: Promise.resolve({ id: "" }),
    });
    expect(res.status).toBe(400);
  });

  it("returns 200 and calls revokeInvitation", async () => {
    asAdmin();
    revokeInvitationMock.mockResolvedValue({ id: "inv_1", status: "revoked" });
    const { DELETE } = await import(
      "@/app/(main)/api/admin/invitations/[id]/route"
    );
    const res = await DELETE(new Request("http://localhost/x"), {
      params: Promise.resolve({ id: "inv_1" }),
    });
    expect(res.status).toBe(200);
    expect(revokeInvitationMock).toHaveBeenCalledWith("inv_1");
  });

  it("returns 502 when Clerk revoke throws", async () => {
    asAdmin();
    revokeInvitationMock.mockRejectedValue(new Error("clerk down"));
    const { DELETE } = await import(
      "@/app/(main)/api/admin/invitations/[id]/route"
    );
    const res = await DELETE(new Request("http://localhost/x"), {
      params: Promise.resolve({ id: "inv_1" }),
    });
    expect(res.status).toBe(502);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/unit/routes/admin-invitations.test.ts`
Expected: FAIL — `Cannot find module '@/app/(main)/api/admin/invitations/[id]/route'`.

- [ ] **Step 3: Implement the route**

Create `src/app/(main)/api/admin/invitations/[id]/route.ts`:

```ts
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/clerk-admin";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 10;

const ID_REGEX = /^[A-Za-z0-9_]{1,64}$/;

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const adminError = await requireAdmin();
  if (adminError) return adminError;

  const { id } = await context.params;
  if (!id || !ID_REGEX.test(id)) {
    return NextResponse.json({ error: "Invalid invitation id" }, { status: 400 });
  }

  try {
    await clerkClient().invitations.revokeInvitation(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Clerk revokeInvitation failed", {
      name: err instanceof Error ? err.name : "Unknown",
      message: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      { error: "Could not revoke invitation." },
      { status: 502 },
    );
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/unit/routes/admin-invitations.test.ts`
Expected: PASS — all describe blocks green.

- [ ] **Step 5: Commit**

```bash
git add src/app/\(main\)/api/admin/invitations/\[id\]/route.ts tests/unit/routes/admin-invitations.test.ts
git commit -m "feat(api): add admin invitation revoke (DELETE) route"
```

---

### Task 5: Admin route group guard (`/admin/layout.tsx`)

**Files:**
- Create: `src/app/(main)/admin/layout.tsx`

- [ ] **Step 1: Write the layout (no test — pure delegation to `requireAdmin` covered by Task 1)**

Create `src/app/(main)/admin/layout.tsx`:

```tsx
import { redirect } from "next/navigation";
import { isAdminUser } from "@/lib/clerk-admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.ReactElement> {
  const ok = await isAdminUser();
  if (!ok) redirect("/");
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:py-16">
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Add admin paths to the proxy protector**

Edit `src/proxy.ts` so signed-out users hit Clerk's sign-in before reaching the layout:

```ts
const isProtectedRoute = createRouteMatcher([
  "/members(.*)",
  "/students(.*)",
  "/student-resources(.*)",
  "/admin(.*)",
  "/api/admin(.*)",
]);
```

Replace the existing `createRouteMatcher([...])` array with the one above. No other changes to `proxy.ts`.

- [ ] **Step 3: Run typecheck**

Run: `pnpm tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/\(main\)/admin/layout.tsx src/proxy.ts
git commit -m "feat(admin): add /admin route group with admin-only layout guard"
```

---

### Task 6: Invite form client component

**Files:**
- Create: `src/components/admin/invite-form.tsx`
- Test: `tests/components/invite-form.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/components/invite-form.test.tsx`:

```tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InviteForm } from "@/components/admin/invite-form";

const refreshMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: refreshMock }),
}));

const fetchMock = vi.fn();

beforeEach(() => {
  refreshMock.mockReset();
  fetchMock.mockReset();
  globalThis.fetch = fetchMock as unknown as typeof fetch;
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("InviteForm", () => {
  it("submits the email and shows success", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ invitation: { id: "inv_1" } }), {
        status: 201,
        headers: { "content-type": "application/json" },
      }),
    );
    const user = userEvent.setup();
    render(<InviteForm />);
    await user.type(screen.getByLabelText(/email/i), "parent@example.com");
    await user.click(screen.getByRole("button", { name: /send invitation/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/admin/invitations",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ email: "parent@example.com" }),
        }),
      );
    });
    expect(refreshMock).toHaveBeenCalled();
    expect(await screen.findByText(/invitation sent/i)).toBeInTheDocument();
  });

  it("shows server error message on 4xx", async () => {
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({ error: "Invalid input", fieldErrors: { email: ["Bad email"] } }),
        { status: 400, headers: { "content-type": "application/json" } },
      ),
    );
    const user = userEvent.setup();
    render(<InviteForm />);
    await user.type(screen.getByLabelText(/email/i), "x@y.com");
    await user.click(screen.getByRole("button", { name: /send invitation/i }));
    expect(await screen.findByText(/bad email/i)).toBeInTheDocument();
  });

  it("disables the button while submitting", async () => {
    let resolve!: (r: Response) => void;
    fetchMock.mockReturnValue(new Promise<Response>((r) => (resolve = r)));
    const user = userEvent.setup();
    render(<InviteForm />);
    await user.type(screen.getByLabelText(/email/i), "x@y.com");
    await user.click(screen.getByRole("button", { name: /send invitation/i }));
    expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled();
    resolve(new Response("{}", { status: 201 }));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/components/invite-form.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the component**

Create `src/components/admin/invite-form.tsx`:

```tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function InviteForm(): React.ReactElement {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setState("submitting");
    setErrorMsg(null);

    const res = await fetch("/api/admin/invitations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim() }),
    });

    if (res.ok) {
      setState("success");
      setEmail("");
      router.refresh();
      return;
    }

    const body = (await res.json().catch(() => ({}))) as {
      error?: string;
      fieldErrors?: Record<string, string[] | undefined>;
    };
    const fieldMsg = body.fieldErrors?.email?.[0];
    setErrorMsg(fieldMsg ?? body.error ?? "Could not send invitation.");
    setState("error");
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label htmlFor="invite-email" className="mb-1 block text-sm font-medium text-brand-black">
          Email
        </label>
        <input
          id="invite-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="parent@example.com"
          className="w-full rounded-button border border-brand-taupe bg-white px-4 py-3 text-sm text-brand-black placeholder:text-brand-black/40 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
        />
      </div>
      <button
        type="submit"
        disabled={state === "submitting"}
        className="inline-flex items-center justify-center rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red/85 disabled:cursor-not-allowed disabled:bg-brand-red/50"
      >
        {state === "submitting" ? "Sending…" : "Send invitation"}
      </button>
      {state === "success" && (
        <p className="text-sm text-emerald-700 sm:basis-full">Invitation sent.</p>
      )}
      {state === "error" && errorMsg && (
        <p className="text-sm text-brand-red sm:basis-full">{errorMsg}</p>
      )}
    </form>
  );
}
```

- [ ] **Step 4: Install `@testing-library/user-event` if missing**

Check `package.json`. If `@testing-library/user-event` is absent, run:

```bash
pnpm add -D @testing-library/user-event
```

If already present, skip.

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm vitest run tests/components/invite-form.test.tsx`
Expected: PASS — 3 tests.

- [ ] **Step 6: Commit**

```bash
git add src/components/admin/invite-form.tsx tests/components/invite-form.test.tsx package.json pnpm-lock.yaml
git commit -m "feat(admin): add InviteForm client component"
```

---

### Task 7: Revoke button + invitations list page

**Files:**
- Create: `src/components/admin/revoke-button.tsx`
- Create: `src/app/(main)/admin/invitations/page.tsx`

- [ ] **Step 1: Implement RevokeButton (client)**

Create `src/components/admin/revoke-button.tsx`:

```tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function RevokeButton({ id, email }: { id: string; email: string }): React.ReactElement {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick(): Promise<void> {
    if (!confirm(`Revoke invitation for ${email}?`)) return;
    setBusy(true);
    const res = await fetch(`/api/admin/invitations/${id}`, { method: "DELETE" });
    setBusy(false);
    if (res.ok) {
      router.refresh();
    } else {
      alert("Could not revoke. Try again.");
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className="text-xs font-medium text-brand-red transition-colors hover:text-brand-red/70 disabled:opacity-50"
    >
      {busy ? "Revoking…" : "Revoke"}
    </button>
  );
}
```

- [ ] **Step 2: Implement the admin invitations page (server component)**

Create `src/app/(main)/admin/invitations/page.tsx`:

```tsx
import { clerkClient } from "@clerk/nextjs/server";
import { InviteForm } from "@/components/admin/invite-form";
import { RevokeButton } from "@/components/admin/revoke-button";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Admin · Invitations" });
export const dynamic = "force-dynamic";

function formatDate(ms: number): string {
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function AdminInvitationsPage(): Promise<React.ReactElement> {
  const list = await clerkClient().invitations.getInvitationList({
    status: "pending",
    limit: 100,
  });

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-heading text-3xl text-brand-black sm:text-4xl">Invitations</h1>
        <p className="mt-2 text-brand-black/60">
          Sign-up is restricted. Only invited email addresses can create accounts.
        </p>
      </header>

      <section className="rounded-card bg-brand-cream p-6 sm:p-8">
        <h2 className="font-heading text-xl text-brand-black">Send an invitation</h2>
        <p className="mt-1 text-sm text-brand-black/55">
          Clerk will email a one-time link. Only that email can complete sign-up.
        </p>
        <div className="mt-5">
          <InviteForm />
        </div>
      </section>

      <section>
        <h2 className="font-heading text-xl text-brand-black">Pending ({list.data.length})</h2>
        {list.data.length === 0 ? (
          <p className="mt-4 text-sm text-brand-black/55">No pending invitations.</p>
        ) : (
          <ul className="mt-4 divide-y divide-brand-taupe/30 rounded-card bg-white ring-1 ring-brand-taupe/15">
            {list.data.map((inv) => (
              <li key={inv.id} className="flex items-center justify-between gap-4 px-5 py-4">
                <div>
                  <p className="font-medium text-brand-black">{inv.emailAddress}</p>
                  <p className="text-xs text-brand-black/45">Sent {formatDate(inv.createdAt)}</p>
                </div>
                <RevokeButton id={inv.id} email={inv.emailAddress} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
```

- [ ] **Step 3: Verify typecheck**

Run: `pnpm tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Add a smoke test for the page render (admin happy path)**

Create `tests/components/admin-invitations-page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const { getInvitationListMock } = vi.hoisted(() => ({
  getInvitationListMock: vi.fn(),
}));

vi.mock("@clerk/nextjs/server", () => ({
  clerkClient: () => ({
    invitations: { getInvitationList: getInvitationListMock },
  }),
}));

vi.mock("next/navigation", () => ({ useRouter: () => ({ refresh: vi.fn() }) }));

import AdminInvitationsPage from "@/app/(main)/admin/invitations/page";

describe("AdminInvitationsPage", () => {
  it("renders empty state when no invitations", async () => {
    getInvitationListMock.mockResolvedValue({ data: [] });
    const ui = await AdminInvitationsPage();
    render(ui);
    expect(screen.getByText(/no pending invitations/i)).toBeInTheDocument();
  });

  it("renders one row per pending invitation", async () => {
    getInvitationListMock.mockResolvedValue({
      data: [
        { id: "inv_1", emailAddress: "a@b.com", status: "pending", createdAt: Date.now() },
        { id: "inv_2", emailAddress: "c@d.com", status: "pending", createdAt: Date.now() },
      ],
    });
    const ui = await AdminInvitationsPage();
    render(ui);
    expect(screen.getByText("a@b.com")).toBeInTheDocument();
    expect(screen.getByText("c@d.com")).toBeInTheDocument();
    expect(screen.getByText(/pending \(2\)/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 5: Run all new tests**

Run: `pnpm vitest run tests/components/admin-invitations-page.test.tsx tests/components/invite-form.test.tsx tests/unit/routes/admin-invitations.test.ts tests/unit/lib/clerk-admin.test.ts tests/unit/schemas/invitation.test.ts`
Expected: all PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/admin/revoke-button.tsx src/app/\(main\)/admin/invitations/page.tsx tests/components/admin-invitations-page.test.tsx
git commit -m "feat(admin): add invitations list page + revoke button"
```

---

### Task 8: Documentation + launch steps

**Files:**
- Modify: `CLAUDE.md`
- Modify: `LAUNCH-RUNBOOK.md` (only if it already exists — skip otherwise)

- [ ] **Step 1: Document the admin route in CLAUDE.md**

Open `CLAUDE.md`. In the **Site Structure → Protected Pages** section, add at the bottom:

```md
- `/admin/invitations` — Admin-only invitation manager (lists pending Clerk invitations, send + revoke). Guarded by `requireAdmin()` (`publicMetadata.role === "admin"`).
```

In the **API Routes** section, add:

```md
- `POST /api/admin/invitations` — admin-only, creates a Clerk invitation and emails the recipient. Status codes: 201 success; 400 invalid email or JSON; 401 signed out; 403 not admin or bad origin; 413 body > 2KB; 429 rate-limited; 502 Clerk error. Body: `{ email: string }`.
- `GET /api/admin/invitations` — admin-only, lists pending invitations. 200 with `{ invitations: [...] }`; 401/403 as above.
- `DELETE /api/admin/invitations/[id]` — admin-only, revokes the invitation. 200 ok; 400 malformed id; 401/403 as above; 502 Clerk error.
```

In the **Auth (Clerk)** section, add a bullet:

```md
- **Sign-up restriction:** Clerk Dashboard → User & Authentication → Restrictions → **Sign-up mode = Restricted**. Only emails with an active invitation (or on the dashboard allowlist) can complete sign-up. Admin role is set via `publicMetadata.role = "admin"` in the Clerk Dashboard or via `clerkClient.users.updateUserMetadata`.
```

In the **Gotchas** section, add:

```md
- Restricted sign-up mode is a Clerk Dashboard setting, not in code. Forgetting to flip it in production leaves `/sign-up` open. Verify before launch.
- The first admin must be granted manually: in Clerk Dashboard, open the user → Metadata → Public → set `{ "role": "admin" }`.
```

- [ ] **Step 2: Document launch step (only if `LAUNCH-RUNBOOK.md` exists)**

Run: `ls LAUNCH-RUNBOOK.md 2>/dev/null && echo EXISTS || echo MISSING`

If MISSING, skip to Step 3.

If EXISTS, add a new section after the existing Clerk steps:

```md
### Lock down sign-up

1. Clerk Dashboard → User & Authentication → Restrictions → Sign-up mode = **Restricted**.
2. Promote the first admin: Users → select your account → Metadata → Public → `{ "role": "admin" }` → Save.
3. Visit `/admin/invitations` while signed in as that user; verify the page loads (signed-out or non-admin users hit Clerk sign-in or are redirected to `/`).
4. Send a test invitation to a personal address, accept the link, confirm the new account lands in the Clerk dashboard with the invited email.
```

- [ ] **Step 3: Run the full test suite + typecheck**

Run: `pnpm tsc --noEmit`
Run: `pnpm vitest run`
Expected: all green; total test count goes up by ~25.

- [ ] **Step 4: Commit**

```bash
git add CLAUDE.md LAUNCH-RUNBOOK.md
git commit -m "docs: document admin invitation flow + Clerk Restricted-mode launch step"
```

(If `LAUNCH-RUNBOOK.md` was missing, drop it from the `git add`.)

---

## Out of Scope (intentional)

- **Self-serve admin promotion UI.** The first admin is set manually in the Clerk Dashboard. A "promote user" admin page can be a follow-up.
- **Bulk CSV invitations.** The current form sends one email at a time. Bulk import is a follow-up if onboarding 50+ families at once.
- **Custom invitation email template.** Clerk's default email is used. Custom branding is a Clerk Dashboard config later.
- **Webhook listening for `user.created`.** Not needed for invitation-only — the `/sign-up` flow handles the binding. Add later if you want to drop newly-signed-up users into a Neon table when Phase 2 starts.
- **Removing the `/sign-up` page.** The page must stay because Clerk's invitation links land on it (with `__clerk_ticket`). The Restricted dashboard setting blocks anyone arriving without a valid ticket.
