import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/home/hero";

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

describe("Hero", () => {
  it("renders the headline", () => {
    render(<Hero />);
    expect(
      screen.getByText("Making a difference, one belt at a time"),
    ).toBeInTheDocument();
  });

  it("renders the Request Info CTA button", () => {
    const { container } = render(<Hero />);
    const links = container.querySelectorAll('a[href="/special-offer"]');
    expect(links.length).toBeGreaterThanOrEqual(1);
    expect(links[0].textContent).toBe("Request info");
  });

  it("renders the View Schedule CTA button", () => {
    const { container } = render(<Hero />);
    const links = container.querySelectorAll('a[href="/schedule"]');
    expect(links.length).toBeGreaterThanOrEqual(1);
    expect(links[0].textContent).toBe("View schedule");
  });

  it("renders a video element with autoplay, muted, and loop", () => {
    const { container } = render(<Hero />);
    const video = container.querySelector("video");
    expect(video).not.toBeNull();
    expect(video).toHaveAttribute("autoplay");
    expect(video!.muted).toBe(true);
    expect(video).toHaveAttribute("loop");
  });
});
