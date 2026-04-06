import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BottomCta } from "@/components/home/bottom-cta";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("BottomCta", () => {
  it("renders trial offer text ($50 / 2 weeks)", () => {
    render(<BottomCta />);
    expect(
      screen.getByText(
        "2 weeks of taekwondo classes for just $50. No commitment required.",
      ),
    ).toBeInTheDocument();
  });

  it("links to /special-offer", () => {
    const { container } = render(<BottomCta />);
    const link = container.querySelector('a[href="/special-offer"]');
    expect(link).not.toBeNull();
    expect(link!.textContent).toBe("Request more information");
  });

  it("renders the section heading", () => {
    render(<BottomCta />);
    expect(screen.getByText("Special introductory trial")).toBeInTheDocument();
  });
});
