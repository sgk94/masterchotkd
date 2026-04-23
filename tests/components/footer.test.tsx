import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "@/components/layout/footer";

describe("Footer", () => {
  it("renders the current year in the copyright", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("links to Facebook + Instagram", () => {
    render(<Footer />);
    expect(
      screen.getByRole("link", { name: /facebook/i }),
    ).toHaveAttribute("href", "https://www.facebook.com/masterchostaekwondo");
    expect(
      screen.getByRole("link", { name: /instagram/i }),
    ).toHaveAttribute(
      "href",
      "https://www.instagram.com/masterchostaekwondo/",
    );
  });
});
