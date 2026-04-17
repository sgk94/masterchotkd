import { describe, it, expect, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Oswald: () => ({ variable: "--font-heading", className: "oswald" }),
  Barlow: () => ({ variable: "--font-body", className: "barlow" }),
}));

describe("fonts", () => {
  it("exports heading + body font objects", async () => {
    const { heading, body } = await import("@/lib/fonts");
    expect(heading.variable).toBe("--font-heading");
    expect(body.variable).toBe("--font-body");
  });
});
