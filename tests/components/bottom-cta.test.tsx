import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BottomCta } from "@/components/home/bottom-cta";

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => <img {...props} />,
}));

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
  it("renders the philosophy section heading", () => {
    render(<BottomCta />);
    expect(
      screen.getByText("More Than Just Kicks & Punches"),
    ).toBeInTheDocument();
  });

  it("renders all three benefit cards", () => {
    render(<BottomCta />);
    expect(screen.getByText("Loyalty & Respect")).toBeInTheDocument();
    expect(screen.getByText("Home, School & Family")).toBeInTheDocument();
    expect(screen.getByText("Discipline & Growth")).toBeInTheDocument();
  });

  it("renders the challenges section", () => {
    render(<BottomCta />);
    expect(
      screen.getByText("Is your child facing these challenges?"),
    ).toBeInTheDocument();
  });

  it("renders all three challenge cards", () => {
    render(<BottomCta />);
    expect(screen.getByText("Struggling with Focus?")).toBeInTheDocument();
    expect(screen.getByText("Low Confidence?")).toBeInTheDocument();
    expect(screen.getByText("Too Much Screen Time?")).toBeInTheDocument();
  });

  it("renders trial CTA with $49 price", () => {
    render(<BottomCta />);
    expect(
      screen.getByText(/Start your 2-week trial/),
    ).toBeInTheDocument();
  });

  it("links to /special-offer", () => {
    const { container } = render(<BottomCta />);
    const link = container.querySelector('a[href="/special-offer"]');
    expect(link).not.toBeNull();
  });
});
