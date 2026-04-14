import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import RedBlackBeltPage from "@/app/(main)/students/curriculum/red-black-belt/page";

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

describe("RedBlackBeltPage", () => {
  it("renders the key page sections and packet resource", () => {
    render(<RedBlackBeltPage />);

    expect(screen.getByText("Preparing for Black Belt")).toBeInTheDocument();
    expect(screen.getByText("Midterm & Black Belt FAQ")).toBeInTheDocument();
    expect(screen.getByText("Testing Requirements")).toBeInTheDocument();
    expect(screen.getByText("First Degree Black Belt Requirements")).toBeInTheDocument();
    expect(screen.getByText("1st Midterm")).toBeInTheDocument();
    expect(screen.getByText("What To Expect")).toBeInTheDocument();

    const packetLink = screen.getByRole("link", { name: /Red\/Black Training Packet/i });
    expect(packetLink).toHaveAttribute("href", "/student-resources/red-black-training-packet");
  });
});
