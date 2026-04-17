import { beforeEach, describe, expect, it, vi } from "vitest";

const limitMock = vi.fn();
const RedisFromEnvMock = vi.fn().mockReturnValue({});

vi.mock("@upstash/ratelimit", () => {
  class Ratelimit {
    limit = limitMock;
    static slidingWindow = vi.fn().mockReturnValue("sw");
  }
  return { Ratelimit };
});

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
