import { describe, it, expect } from "vitest";
import * as mod from "@/lib/current-cycle-materials";

describe("current-cycle-materials", () => {
  it("exports at least one data value", () => {
    expect(Object.keys(mod).length).toBeGreaterThan(0);
  });

  it("every exported array has stable shape (contains objects)", () => {
    for (const [name, value] of Object.entries(mod)) {
      if (Array.isArray(value) && value.length > 0) {
        expect(typeof value[0], `${name}[0] should be an object`).toBe(
          "object",
        );
      }
    }
  });
});
