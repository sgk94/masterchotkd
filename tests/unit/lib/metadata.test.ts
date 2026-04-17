import { beforeEach, describe, expect, it } from "vitest";

describe("createMetadata", () => {
  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
    delete process.env.VERCEL_URL;
  });

  it("uses base title when no override", async () => {
    const { createMetadata } = await import("@/lib/metadata");
    const m = createMetadata();
    expect(m.title).toMatch(/Master Cho's Taekwondo/);
    expect(m.description).toMatch(/Lynnwood/);
  });

  it("prefixes custom title in OpenGraph + Twitter", async () => {
    const { createMetadata } = await import("@/lib/metadata");
    const m = createMetadata({ title: "About" });
    const og = m.openGraph as { title?: string };
    const tw = m.twitter as { title?: string };
    expect(og.title).toMatch(/^About \| Master Cho's Taekwondo$/);
    expect(tw.title).toMatch(/^About \| Master Cho's Taekwondo$/);
  });

  it("uses NEXT_PUBLIC_SITE_URL when set", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://masterchostaekwondo.com";
    const { createMetadata } = await import("@/lib/metadata");
    const m = createMetadata();
    expect(m.metadataBase?.toString()).toContain(
      "masterchostaekwondo.com",
    );
  });

  it("falls back to VERCEL_PROJECT_PRODUCTION_URL when site URL missing", async () => {
    process.env.VERCEL_PROJECT_PRODUCTION_URL = "prod.example.com";
    const { createMetadata } = await import("@/lib/metadata");
    const m = createMetadata();
    expect(m.metadataBase?.toString()).toContain("prod.example.com");
  });

  it("falls back to VERCEL_URL when production URL missing", async () => {
    process.env.VERCEL_URL = "preview.example.com";
    const { createMetadata } = await import("@/lib/metadata");
    const m = createMetadata();
    expect(m.metadataBase?.toString()).toContain("preview.example.com");
  });

  it("accepts description override", async () => {
    const { createMetadata } = await import("@/lib/metadata");
    const m = createMetadata({ description: "Custom" });
    expect(m.description).toBe("Custom");
  });
});
