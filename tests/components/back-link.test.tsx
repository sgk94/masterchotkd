import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BackLink } from "@/components/members/back-link";

describe("BackLink", () => {
  it("renders the given label with an accessible link", () => {
    render(<BackLink href="/members/curriculum" label="Back to Curriculum" />);
    const link = screen.getByRole("link", { name: /back to curriculum/i });
    expect(link).toHaveAttribute("href", "/members/curriculum");
  });

  it("renders a back-arrow svg", () => {
    const { container } = render(<BackLink href="/x" label="Back" />);
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("merges a custom className", () => {
    const { container } = render(
      <BackLink href="/x" label="Back" className="extra-class" />,
    );
    expect(container.querySelector("a")).toHaveClass("extra-class");
  });
});
