import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@clerk/nextjs", () => ({
  Show: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  UserButton: () => <button>User</button>,
  SignInButton: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  ClerkLoaded: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  ClerkLoading: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

import { MobileMenu } from "@/components/layout/mobile-menu";

describe("MobileMenu", () => {
  beforeEach(() => {
    document.body.style.overflow = "";
  });

  it("locks body scroll when open", () => {
    render(<MobileMenu open={true} onClose={() => {}} />);
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("clears body scroll when closed", () => {
    const { rerender } = render(<MobileMenu open={true} onClose={() => {}} />);
    rerender(<MobileMenu open={false} onClose={() => {}} />);
    expect(document.body.style.overflow).toBe("");
  });

  it("calls onClose when close button clicked", () => {
    const onClose = vi.fn();
    render(<MobileMenu open={true} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText(/close menu/i));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose when Escape is pressed", () => {
    const onClose = vi.fn();
    render(<MobileMenu open={true} onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  it("does not bind escape handler when closed", () => {
    const onClose = vi.fn();
    render(<MobileMenu open={false} onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });
});
