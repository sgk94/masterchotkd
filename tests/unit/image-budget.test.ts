import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
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
