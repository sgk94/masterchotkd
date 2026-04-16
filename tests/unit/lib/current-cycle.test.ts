import { describe, expect, it } from "vitest";
import { getCurrentCycleWindow } from "@/lib/current-cycle";

// All dates use T20:00:00Z so they fall mid-day Pacific Time regardless of DST.

describe("getCurrentCycleWindow", () => {
  it("returns initial Cycle 2 before the first scheduled transition", () => {
    const w = getCurrentCycleWindow(new Date("2026-01-15T20:00:00Z"));

    expect(w.status).toBe("active");
    expect(w.cycle).toBe("Cycle 2");
    expect(w.weapon).toBe("Jahng Bong");
    expect(w.startDate).toBe("2026-01-01");
    expect(w.nextChangeDate).toBe("2026-04-18");
    expect(w.nextCycle?.cycle).toBe("Cycle 3");
  });

  it("transitions to Cycle 3 on 2026-04-18", () => {
    const w = getCurrentCycleWindow(new Date("2026-04-18T20:00:00Z"));

    expect(w.cycle).toBe("Cycle 3");
    expect(w.weapon).toBe("Sahng Jeol Bong");
    expect(w.nextChangeDate).toBe("2026-06-28");
  });

  it("returns Cycle 3 on the day before the next transition", () => {
    const w = getCurrentCycleWindow(new Date("2026-06-27T20:00:00Z"));
    expect(w.cycle).toBe("Cycle 3");
  });

  it("transitions to Cycle 1 on 2026-06-28", () => {
    const w = getCurrentCycleWindow(new Date("2026-06-28T20:00:00Z"));

    expect(w.cycle).toBe("Cycle 1");
    expect(w.weapon).toBe("Bahng Mang Ee");
    expect(w.nextChangeDate).toBe("2026-09-05");
  });

  it("transitions to Cycle 2 on 2026-09-05", () => {
    const w = getCurrentCycleWindow(new Date("2026-09-05T20:00:00Z"));

    expect(w.cycle).toBe("Cycle 2");
    expect(w.weapon).toBe("Jahng Bong");
    expect(w.nextChangeDate).toBe("2026-11-15");
  });

  it("transitions to final Cycle 3 on 2026-11-15", () => {
    const w = getCurrentCycleWindow(new Date("2026-11-15T20:00:00Z"));

    expect(w.cycle).toBe("Cycle 3");
    expect(w.weapon).toBe("Sahng Jeol Bong");
    expect(w.nextChangeDate).toBeNull();
    expect(w.nextCycle).toBeNull();
  });

  it("falls back to the last scheduled cycle after the schedule ends (2027+)", () => {
    // No 2027 data exists yet — the function returns the last known cycle.
    // This is expected silent-fallback behavior; update cycleSchedule2026 before 2027.
    const w = getCurrentCycleWindow(new Date("2027-01-15T20:00:00Z"));

    expect(w.cycle).toBe("Cycle 3");
    expect(w.nextChangeDate).toBeNull();
  });
});
