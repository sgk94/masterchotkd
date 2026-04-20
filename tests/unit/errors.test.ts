import { describe, it, expect } from "vitest";
import { formatError } from "@/lib/errors";

describe("formatError", () => {
  it("extracts name and message from Error instances", () => {
    const err = new TypeError("bad input");
    expect(formatError(err)).toEqual({ name: "TypeError", message: "bad input" });
  });

  it("handles non-Error values", () => {
    expect(formatError("oops")).toEqual({ name: "Unknown", message: "oops" });
    expect(formatError(42)).toEqual({ name: "Unknown", message: "42" });
    expect(formatError(null)).toEqual({ name: "Unknown", message: "null" });
  });
});
