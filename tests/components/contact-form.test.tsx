import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { ContactForm } from "@/components/forms/contact-form";

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

describe("ContactForm", () => {
  it("renders all form fields", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<ContactForm />);
    const buttons = screen.getAllByRole("button", { name: "Send Message" });
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("shows validation errors on empty submit", async () => {
    const { container } = render(<ContactForm />);

    const form = container.querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(
        screen.getAllByText("Name must be at least 2 characters").length,
      ).toBeGreaterThanOrEqual(1);
    });

    expect(
      screen.getAllByText("Please enter a valid email address").length,
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText("Message must be at least 10 characters").length,
    ).toBeGreaterThanOrEqual(1);
  });
});
