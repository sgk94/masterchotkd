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
  clerkClient: () =>
    Promise.resolve({
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
  revokeInvitationMock.mockReset();
  validateOriginMock.mockReset().mockResolvedValue(null);
  checkRateLimitMock.mockReset().mockResolvedValue({ success: true });
  getClientIpMock.mockReset().mockResolvedValue("203.0.113.1");
  process.env.NEXT_PUBLIC_SITE_URL = "https://masterchostaekwondo.com";
});

describe("POST /api/admin/invitations", () => {
  it("returns 403 when origin invalid", async () => {
    asAdmin();
    validateOriginMock.mockResolvedValue(
      new Response("forbidden", { status: 403 }),
    );
    const { POST } = await import(
      "@/app/(main)/api/admin/invitations/route"
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
    });
  });

  it("returns 201 and sends bulk invitations sequentially", async () => {
    asAdmin();
    createInvitationMock
      .mockResolvedValueOnce({
        id: "inv_1",
        emailAddress: "one@example.com",
        status: "pending",
      })
      .mockResolvedValueOnce({
        id: "inv_2",
        emailAddress: "two@example.com",
        status: "pending",
      });
    const { POST } = await import(
      "@/app/(main)/api/admin/invitations/route"
    );
    const res = await POST(
      jsonRequest({ emails: ["One@Example.com", "two@example.com"] }),
    );
    const body = await res.json();
    expect(res.status).toBe(201);
    expect(body.summary).toEqual({ requested: 2, sent: 2, failed: 0 });
    expect(createInvitationMock).toHaveBeenNthCalledWith(1, {
      emailAddress: "one@example.com",
      redirectUrl: "https://masterchostaekwondo.com/sign-up",
    });
    expect(createInvitationMock).toHaveBeenNthCalledWith(2, {
      emailAddress: "two@example.com",
      redirectUrl: "https://masterchostaekwondo.com/sign-up",
    });
  });

  it("deduplicates bulk invitations before sending", async () => {
    asAdmin();
    createInvitationMock.mockResolvedValue({
      id: "inv_1",
      emailAddress: "parent@example.com",
      status: "pending",
    });
    const { POST } = await import(
      "@/app/(main)/api/admin/invitations/route"
    );
    const res = await POST(
      jsonRequest({ emails: ["Parent@Example.com", "parent@example.com"] }),
    );
    const body = await res.json();
    expect(res.status).toBe(201);
    expect(body.summary).toEqual({ requested: 1, sent: 1, failed: 0 });
    expect(createInvitationMock).toHaveBeenCalledTimes(1);
  });

  it("returns 207 when a bulk invitation partially fails", async () => {
    asAdmin();
    createInvitationMock
      .mockResolvedValueOnce({
        id: "inv_1",
        emailAddress: "ok@example.com",
        status: "pending",
      })
      .mockRejectedValueOnce({
        status: 422,
        errors: [{ code: "duplicate_record", message: "already exists" }],
      });
    const { POST } = await import(
      "@/app/(main)/api/admin/invitations/route"
    );
    const res = await POST(
      jsonRequest({ emails: ["ok@example.com", "dupe@example.com"] }),
    );
    const body = await res.json();
    expect(res.status).toBe(207);
    expect(body.summary).toEqual({ requested: 2, sent: 1, failed: 1 });
    expect(body.results).toEqual([
      expect.objectContaining({ email: "ok@example.com", ok: true }),
      expect.objectContaining({
        email: "dupe@example.com",
        ok: false,
        status: 409,
      }),
    ]);
  });

  it("returns 400 when bulk invite exceeds the batch cap", async () => {
    asAdmin();
    const { POST } = await import(
      "@/app/(main)/api/admin/invitations/route"
    );
    const emails = Array.from(
      { length: 26 },
      (_, index) => `parent${index}@example.com`,
    );
    const res = await POST(jsonRequest({ emails }));
    expect(res.status).toBe(400);
    expect(createInvitationMock).not.toHaveBeenCalled();
  });

  it("returns 413 when body exceeds 8KB", async () => {
    asAdmin();
    const { POST } = await import(
      "@/app/(main)/api/admin/invitations/route"
    );
    const big = { email: `${"a".repeat(9000)}@example.com` };
    const res = await POST(jsonRequest(big));
    expect(res.status).toBe(413);
  });

  it("returns 502 when Clerk createInvitation throws a generic error", async () => {
    asAdmin();
    createInvitationMock.mockRejectedValue(new Error("clerk down"));
    const { POST } = await import(
      "@/app/(main)/api/admin/invitations/route"
    );
    const res = await POST(jsonRequest({ email: "x@y.com" }));
    expect(res.status).toBe(502);
  });

  it("returns 409 when Clerk reports duplicate invitation (by status 422)", async () => {
    asAdmin();
    createInvitationMock.mockRejectedValue({
      status: 422,
      errors: [
        {
          code: "duplicate_record",
          message: "already exists",
        },
      ],
    });
    const { POST } = await import(
      "@/app/(main)/api/admin/invitations/route"
    );
    const res = await POST(jsonRequest({ email: "x@y.com" }));
    expect(res.status).toBe(409);
  });

  it("returns 409 when Clerk reports identifier already exists by code", async () => {
    asAdmin();
    createInvitationMock.mockRejectedValue({
      status: 400,
      errors: [{ code: "form_identifier_exists", message: "duplicate" }],
    });
    const { POST } = await import(
      "@/app/(main)/api/admin/invitations/route"
    );
    const res = await POST(jsonRequest({ email: "x@y.com" }));
    expect(res.status).toBe(409);
  });
});

describe("DELETE /api/admin/invitations/[id]", () => {
  it("returns 403 when origin invalid", async () => {
    asAdmin();
    validateOriginMock.mockResolvedValue(
      new Response("forbidden", { status: 403 }),
    );
    const { DELETE } = await import(
      "@/app/(main)/api/admin/invitations/[id]/route"
    );
    const res = await DELETE(new Request("http://localhost/x"), {
      params: Promise.resolve({ id: "inv_1" }),
    });
    expect(res.status).toBe(403);
  });

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

  it("returns 502 when Clerk revoke throws a generic error", async () => {
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

  it("returns 404 when Clerk reports invitation not found (by status)", async () => {
    asAdmin();
    revokeInvitationMock.mockRejectedValue({
      status: 404,
      errors: [{ code: "resource_not_found", message: "not found" }],
    });
    const { DELETE } = await import(
      "@/app/(main)/api/admin/invitations/[id]/route"
    );
    const res = await DELETE(new Request("http://localhost/x"), {
      params: Promise.resolve({ id: "inv_gone" }),
    });
    expect(res.status).toBe(404);
  });

  it("returns 404 when Clerk reports resource_not_found by code", async () => {
    asAdmin();
    revokeInvitationMock.mockRejectedValue({
      status: 422,
      errors: [{ code: "resource_not_found", message: "not found" }],
    });
    const { DELETE } = await import(
      "@/app/(main)/api/admin/invitations/[id]/route"
    );
    const res = await DELETE(new Request("http://localhost/x"), {
      params: Promise.resolve({ id: "inv_gone" }),
    });
    expect(res.status).toBe(404);
  });
});
