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
