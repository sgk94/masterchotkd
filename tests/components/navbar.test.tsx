import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navbar } from "@/components/layout/navbar";
import { PRIMARY_NAV } from "@/lib/nav";

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

vi.mock("@clerk/nextjs", () => ({
  ClerkLoading: ({ children }: React.PropsWithChildren) => <>{children}</>,
  ClerkLoaded: ({ children }: React.PropsWithChildren) => <>{children}</>,
  Show: ({ children }: React.PropsWithChildren) => <>{children}</>,
  SignInButton: ({ children }: React.PropsWithChildren) => <>{children}</>,
  UserButton: () => <div data-testid="user-button" />,
}));

describe("Navbar", () => {
  it("renders the logo text", () => {
    render(<Navbar />);
    expect(screen.getByText("MASTER CHO'S TAEKWONDO")).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    render(<Navbar />);
    for (const link of PRIMARY_NAV) {
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
