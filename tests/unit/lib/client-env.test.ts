import { describe, it, expect, beforeEach } from "vitest";

describe("client-env", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = "pk_test_xxx";
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
  });

  it("parses and exports clientEnv", async () => {
    const { clientEnv } = await import("@/lib/client-env");
    expect(clientEnv.NEXT_PUBLIC_SITE_URL).toBe("https://example.com");
    expect(clientEnv.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY).toBe("pk_test_xxx");
  });
});
