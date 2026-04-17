import { describe, it, expect } from "vitest";
import nextConfig from "../../next.config";

describe("next.config", () => {
  it("optimizes Clerk package imports", () => {
    expect(nextConfig.experimental?.optimizePackageImports).toContain("@clerk/nextjs");
  });

  it("sets a 1-year image cache TTL", () => {
    expect(nextConfig.images?.minimumCacheTTL).toBe(31_536_000);
  });
});
