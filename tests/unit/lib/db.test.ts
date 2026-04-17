import { describe, it, expect, beforeAll } from "vitest";

describe("db", () => {
  beforeAll(() => {
    (globalThis as unknown as { prisma: unknown }).prisma = { stub: true };
  });

  it("exports the cached Prisma client stub from globalThis", async () => {
    const { db } = await import("@/lib/db");
    expect(db).toBeDefined();
    expect((db as { stub?: boolean }).stub).toBe(true);
  });
});
