import { beforeEach, describe, expect, it, vi } from "vitest";

const { authMock, getUserMock } = vi.hoisted(() => ({
  authMock: vi.fn(),
  getUserMock: vi.fn(),
}));

vi.mock("@clerk/nextjs/server", () => ({
  auth: authMock,
  clerkClient: () => Promise.resolve({ users: { getUser: getUserMock } }),
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
