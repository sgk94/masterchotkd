import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navbar } from "@/components/layout/navbar";
import { NAV_LINKS } from "@/types";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
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

vi.mock("next/image", () => ({
  // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
  default: ({ fill: _f, ...rest }: Record<string, unknown>) => <img {...rest} />,
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Navbar", () => {
  it("renders the logo text", () => {
    render(<Navbar />);
    expect(screen.getByText("MASTER CHO'S")).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    render(<Navbar />);
    for (const link of NAV_LINKS) {
      expect(screen.getAllByText(link.label).length).toBeGreaterThanOrEqual(1);
    }
  });

  it("renders the special offer CTA", () => {
    render(<Navbar />);
    const specialOfferLinks = screen.getAllByText("Special Offer");
    expect(specialOfferLinks.length).toBeGreaterThanOrEqual(1);
    const linkWithHref = specialOfferLinks.find(
      (el) =>
        el.closest("a")?.getAttribute("href") === "/special-offer",
    );
    expect(linkWithHref).toBeDefined();
  });

  it("renders the mobile menu button", () => {
    render(<Navbar />);
    const buttons = screen.getAllByLabelText("Open menu");
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });
});
