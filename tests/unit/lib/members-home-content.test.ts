import { describe, it, expect } from "vitest";
import * as mod from "@/lib/members-home-content";

describe("members-home-content", () => {
  it("exports non-empty arrays or objects from every top-level export", () => {
    const entries = Object.entries(mod) as Array<[string, unknown]>;
    expect(entries.length).toBeGreaterThan(0);
    for (const [name, value] of entries) {
      if (typeof value === "function") continue;
      if (Array.isArray(value)) {
        expect(value.length, `${name} is empty`).toBeGreaterThan(0);
      } else if (value && typeof value === "object") {
        expect(
          Object.keys(value as Record<string, unknown>).length,
          `${name} has no keys`,
        ).toBeGreaterThan(0);
      }
    }
  });
});
