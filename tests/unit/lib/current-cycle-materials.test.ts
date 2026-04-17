import { describe, it, expect } from "vitest";
import * as mod from "@/lib/current-cycle-materials";
import {
  cycleNameToNumber,
  getColorBeltEntriesForCycle,
  getTinyTigerEntriesForCycle,
  getSwatchStyle,
} from "@/lib/current-cycle-materials";

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

describe("cycleNameToNumber", () => {
  it.each([
    ["Cycle 1", "1"],
    ["Cycle 2", "2"],
    ["Cycle 3", "3"],
  ] as const)("%s maps to %s", (input, output) => {
    expect(cycleNameToNumber(input)).toBe(output);
  });
});

describe("getColorBeltEntriesForCycle", () => {
  it.each(["1", "2", "3"] as const)("returns entries for cycle %s", (c) => {
    const entries = getColorBeltEntriesForCycle(c);
    expect(entries.every((e) => e.cycle === c)).toBe(true);
  });
});

describe("getTinyTigerEntriesForCycle", () => {
  it.each(["1", "2", "3"] as const)("returns entries for cycle %s", (c) => {
    const entries = getTinyTigerEntriesForCycle(c);
    expect(entries.every((e) => e.cycle === c)).toBe(true);
  });
});

describe("getSwatchStyle", () => {
  it("renders camo + secondary color gradient with border", () => {
    const s = getSwatchStyle({
      color: "#fff",
      secondaryColor: "#000",
      usesCamo: true,
      border: true,
    });
    expect(String(s.backgroundImage)).toContain("linear-gradient");
    expect(s.border).toMatch(/2px solid/);
  });

  it("renders camo alone without border", () => {
    const s = getSwatchStyle({ color: "#fff", usesCamo: true });
    expect(s.backgroundImage).toBeDefined();
    expect(s.border).toBe("none");
  });

  it("renders two-tone gradient when secondaryColor is present", () => {
    const s = getSwatchStyle({
      color: "#fff",
      secondaryColor: "#000",
      border: true,
    });
    expect(String(s.background)).toContain("linear-gradient");
    expect(s.border).toMatch(/2px solid/);
  });

  it("falls back to solid color with no border", () => {
    const s = getSwatchStyle({ color: "#abc" });
    expect(s.background).toBe("#abc");
    expect(s.border).toBe("none");
  });
});
