import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Reveal } from "@/components/ui/reveal";

describe("Reveal", () => {
  it("renders content visibly by default for no-JS and hydration fallback", () => {
    const html = renderToString(
      <Reveal>
        <section>Launch-safe content</section>
      </Reveal>,
    );

    expect(html).toContain("Launch-safe content");
    expect(html).not.toContain("opacity:0");
  });

  it("keeps content in the document while reveal behavior initializes", () => {
    render(
      <Reveal>
        <section>Safari-visible section</section>
      </Reveal>,
    );

    expect(screen.getByText("Safari-visible section")).toBeInTheDocument();
  });
});
