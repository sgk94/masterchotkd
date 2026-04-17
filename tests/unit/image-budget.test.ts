import { describe, it, expect } from "vitest";
import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const IMAGES_DIR = path.resolve(__dirname, "../../public/images");

describe("unused images removed", () => {
  it.each([
    "IDEA.png",
    "Color Belt Curriculum.png",
    "Weekly Curriculum.png",
  ])("does not ship %s", (name) => {
    expect(existsSync(path.join(IMAGES_DIR, name))).toBe(false);
  });
});

describe("image size caps", () => {
  const MAX_BYTES = 600_000;
  const EXEMPT = new Set(["camo-pattern.jpg", "og-image.jpg", "logo.svg", "hero-poster.jpg"]);
  const files = readdirSync(IMAGES_DIR).filter(
    (f) => /\.(jpe?g|png)$/i.test(f) && !EXEMPT.has(f),
  );

  it.each(files)("%s is ≤ 600 KB", (name) => {
    const size = statSync(path.join(IMAGES_DIR, name)).size;
    expect(size, `${name} is ${size} bytes`).toBeLessThanOrEqual(MAX_BYTES);
  });
});
