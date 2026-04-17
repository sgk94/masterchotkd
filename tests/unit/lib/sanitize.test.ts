import { describe, expect, it } from "vitest";
import { sanitize, escapeHtml } from "@/lib/sanitize";

describe("sanitize", () => {
  it("strips HTML tags", () => {
    expect(sanitize('<script>alert(1)</script>hello')).toBe("hello");
  });

  it("preserves plain text", () => {
    expect(sanitize("just text")).toBe("just text");
  });
});

describe("escapeHtml", () => {
  it("escapes &, <, >, quotes, apostrophe", () => {
    expect(escapeHtml('a & b < c > "d" \'e\'')).toBe(
      "a &amp; b &lt; c &gt; &quot;d&quot; &#39;e&#39;",
    );
  });

  it("returns identical string when no special chars", () => {
    expect(escapeHtml("plain")).toBe("plain");
  });
});
