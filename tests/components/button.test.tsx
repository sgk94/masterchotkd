import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

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

describe("Button", () => {
  it("renders as a link when href is provided", () => {
    render(<Button href="/test">Link Button</Button>);
    const link = screen.getByRole("link", { name: "Link Button" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
  });

  it("renders as a button when no href is provided", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button", { name: "Click Me" });
    expect(button).toBeInTheDocument();
  });

  it("applies primary variant styles by default", () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole("button", { name: "Primary" });
    expect(button.className).toContain("bg-brand-red");
  });

  it("applies outline variant styles", () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole("button", { name: "Outline" });
    expect(button.className).toContain("border-white/30");
  });

  it("applies gold variant styles", () => {
    render(<Button variant="gold">Gold</Button>);
    const button = screen.getByRole("button", { name: "Gold" });
    expect(button.className).toContain("bg-brand-gold");
  });

  it("applies white variant styles", () => {
    render(<Button variant="white">White</Button>);
    const button = screen.getByRole("button", { name: "White" });
    expect(button.className).toContain("bg-white");
  });

  it("applies custom className", () => {
    render(<Button className="my-custom-class">Custom</Button>);
    const button = screen.getByRole("button", { name: "Custom" });
    expect(button.className).toContain("my-custom-class");
  });

  it("handles disabled state", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button", { name: "Disabled" });
    expect(button).toBeDisabled();
  });

  it("has min touch target size of 44px", () => {
    render(<Button>Touch</Button>);
    const button = screen.getByRole("button", { name: "Touch" });
    expect(button.className).toContain("min-h-[44px]");
    expect(button.className).toContain("min-w-[44px]");
  });
});
