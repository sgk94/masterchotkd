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

describe("DELETE /api/admin/invitations/[id]", () => {
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
