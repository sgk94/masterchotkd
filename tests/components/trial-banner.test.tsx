import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TrialBanner } from "@/components/home/trial-banner";

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

describe("TrialBanner", () => {
  it("renders $49 / 2 weeks offer", () => {
    render(<TrialBanner />);
    expect(screen.getByText("2 weeks for just $49")).toBeInTheDocument();
  });

  it('renders "Claim this offer" CTA', () => {
    render(<TrialBanner />);
    expect(screen.getByText("Claim this offer")).toBeInTheDocument();
  });

  it("links to /special-offer", () => {
    const { container } = render(<TrialBanner />);
    const link = container.querySelector('a[href="/special-offer"]');
    expect(link).not.toBeNull();
    expect(link!.textContent).toBe("Claim this offer");
  });

  it("renders the price tag with $49 and 2 weeks", () => {
    render(<TrialBanner />);
    expect(screen.getByText("$49")).toBeInTheDocument();
    expect(screen.getByText("2 weeks")).toBeInTheDocument();
  });
});
