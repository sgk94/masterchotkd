import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("checkRateLimit", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    vi.restoreAllMocks();
  });

  it("returns success:true (no-op) when Upstash env vars are missing", async () => {
    const { checkRateLimit } = await import("@/lib/rate-limit");
    const result = await checkRateLimit("test:ip");
    expect(result).toEqual({ success: true });
  });

  it("fails open when the Upstash backend throws", async () => {
    process.env.UPSTASH_REDIS_REST_URL = "https://placeholder.example.com";
    process.env.UPSTASH_REDIS_REST_TOKEN = "placeholder-token";

    vi.doMock("@upstash/ratelimit", () => ({
      Ratelimit: class {
        static slidingWindow(): unknown {
          return null;
        }
        async limit(): Promise<never> {
          throw new Error("upstream down");
        }
      },
    }));
    vi.doMock("@upstash/redis", () => ({
      Redis: { fromEnv: () => ({}) },
    }));

    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { checkRateLimit } = await import("@/lib/rate-limit");
    const result = await checkRateLimit("test:ip");
    expect(result).toEqual({ success: true });
    expect(errSpy).toHaveBeenCalledWith(
      "Rate limit check failed — failing open",
      expect.objectContaining({ message: "upstream down" }),
    );
  });
});
