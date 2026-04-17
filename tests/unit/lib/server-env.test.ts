import { beforeEach, describe, expect, it, vi } from "vitest";

describe("getServerEnv", () => {
  beforeEach(() => {
    vi.resetModules();
    process.env.CLERK_SECRET_KEY = "sk_test_xxx";
    process.env.RESEND_API_KEY = "re_xxx";
    process.env.RESEND_FROM_EMAIL = "noreply@example.com";
    process.env.NOTIFY_EMAIL = "owner@example.com";
  });

  it("parses env and caches the result", async () => {
    const { getServerEnv } = await import("@/lib/server-env");
    const first = getServerEnv();
    const second = getServerEnv();
    expect(first).toBe(second);
    expect(first.RESEND_FROM_EMAIL).toBe("noreply@example.com");
  });

  it("throws when a required var is missing", async () => {
    delete process.env.NOTIFY_EMAIL;
    vi.resetModules();
    const { getServerEnv } = await import("@/lib/server-env");
    expect(() => getServerEnv()).toThrow();
  });
});
