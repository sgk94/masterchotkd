import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let _ratelimit: Ratelimit | null = null;

export function isRateLimitConfigured(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
  );
}

function getRatelimit(): Ratelimit {
  if (!_ratelimit) {
    _ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "1 m"),
      analytics: true,
      prefix: "mctkd:ratelimit",
    });
  }
  return _ratelimit;
}

export async function checkRateLimit(
  identifier: string,
): Promise<{ success: boolean }> {
  if (!isRateLimitConfigured()) return { success: true };
  try {
    const result = await getRatelimit().limit(identifier);
    return { success: result.success };
  } catch (err) {
    console.error("Rate limit check failed — failing open", {
      identifier,
      name: err instanceof Error ? err.name : "Unknown",
      message: err instanceof Error ? err.message : String(err),
    });
    return { success: true };
  }
}
