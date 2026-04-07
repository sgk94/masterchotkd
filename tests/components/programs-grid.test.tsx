import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProgramsGrid } from "@/components/home/programs-grid";

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

describe("ProgramsGrid", () => {
  it("renders all 4 programs", () => {
    render(<ProgramsGrid />);
    expect(screen.getByText("Tiny Tigers")).toBeInTheDocument();
    expect(screen.getByText("Black Belt Club")).toBeInTheDocument();
    expect(screen.getByText("Leadership Club")).toBeInTheDocument();
    expect(screen.getByText("Competition Team")).toBeInTheDocument();
  });

  it("links each card to the correct /programs/[slug] URL", () => {
    const { container } = render(<ProgramsGrid />);
    const links = container.querySelectorAll("a");
    const hrefs = Array.from(links).map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("/programs/tiny-tigers");
    expect(hrefs).toContain("/programs/black-belt-club");
    expect(hrefs).toContain("/programs/leadership-club");
    expect(hrefs).toContain("/programs/competition-team");
  });

  it("renders subtitles for each program", () => {
    render(<ProgramsGrid />);
    expect(screen.getByText("Ages 4-6")).toBeInTheDocument();
    expect(screen.getByText("All ages")).toBeInTheDocument();
    expect(screen.getByText("Advanced students")).toBeInTheDocument();
    expect(screen.getByText("Tournament athletes")).toBeInTheDocument();
  });
});
