import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SectionChips } from "@/components/members/section-chips";

const LINKS = [
  { href: "#a", label: "Section A" },
  { href: "#b", label: "Section B" },
];

describe("SectionChips", () => {
  it("renders one link per entry", () => {
    render(<SectionChips links={LINKS} />);
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });

  it("links point at the given hashes", () => {
    render(<SectionChips links={LINKS} />);
    expect(
      screen.getByRole("link", { name: /section a/i }),
    ).toHaveAttribute("href", "#a");
    expect(
      screen.getByRole("link", { name: /section b/i }),
    ).toHaveAttribute("href", "#b");
  });

  it("hides on large screens via lg:hidden", () => {
    const { container } = render(<SectionChips links={LINKS} />);
    expect(container.firstChild).toHaveClass("lg:hidden");
  });
});
