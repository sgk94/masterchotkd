import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

describe("globals.css", () => {
  const css = readFileSync(
    path.resolve(__dirname, "../../src/app/globals.css"),
    "utf8",
  );

  it("gates .grain::after behind @media (min-width: 768px)", () => {
    const match = css.match(/@media \(min-width: 768px\)\s*\{[\s\S]*?\.grain::after/);
    expect(match, "expected .grain::after inside @media (min-width: 768px)").not.toBeNull();
  });
});
