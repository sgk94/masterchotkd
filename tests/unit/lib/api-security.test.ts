import { beforeEach, describe, expect, it, vi } from "vitest";

const headersMock = vi.fn();

vi.mock("next/headers", () => ({
  headers: () => headersMock(),
}));

function makeHeaders(entries: Record<string, string>): {
  get: (k: string) => string | null;
} {
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
    headersMock.mockResolvedValue(
      makeHeaders({ origin: "https://masterchostaekwondo.com" }),
    );
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
    headersMock.mockResolvedValue(
      makeHeaders({ origin: "https://evil.example" }),
    );
    const { validateOrigin } = await import("@/lib/api-security");
    const res = await validateOrigin();
    expect(res!.status).toBe(403);
  });

  it("defaults to localhost when NEXT_PUBLIC_SITE_URL is unset", async () => {
    headersMock.mockResolvedValue(
      makeHeaders({ origin: "http://localhost:3000" }),
    );
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
    headersMock.mockResolvedValue(
      makeHeaders({ "x-vercel-forwarded-for": "203.0.113.11" }),
    );
    const { getClientIp } = await import("@/lib/api-security");
    await expect(getClientIp()).resolves.toBe("203.0.113.11");
  });

  it("returns 'anonymous' when no IP header present", async () => {
    headersMock.mockResolvedValue(makeHeaders({}));
    const { getClientIp } = await import("@/lib/api-security");
    await expect(getClientIp()).resolves.toBe("anonymous");
  });

  it("trims whitespace from header values", async () => {
    headersMock.mockResolvedValue(
      makeHeaders({ "x-real-ip": "  203.0.113.12  " }),
    );
    const { getClientIp } = await import("@/lib/api-security");
    await expect(getClientIp()).resolves.toBe("203.0.113.12");
  });
});
