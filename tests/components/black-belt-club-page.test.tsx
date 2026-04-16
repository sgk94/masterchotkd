import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import BlackBeltClubCurriculumPage from "@/app/(main)/students/curriculum/black-belt-club/page";

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

describe("BlackBeltClubCurriculumPage", () => {
  it("renders the key page sections and all 7 midterm requirements", () => {
    render(<BlackBeltClubCurriculumPage />);

    expect(screen.getByText("Black Belt Curriculum")).toBeInTheDocument();
    expect(screen.getByText("1st Degree Black Belt Requirements")).toBeInTheDocument();
    expect(screen.getByText("Black Belt Combo Reference")).toBeInTheDocument();

    for (let i = 1; i <= 7; i++) {
      expect(screen.getByText(`Midterm ${i}`)).toBeInTheDocument();
    }
    expect(screen.getByText("2nd Degree Testing")).toBeInTheDocument();

    for (let i = 1; i <= 18; i++) {
      expect(screen.getByText(`Combo ${i}`)).toBeInTheDocument();
    }

    const backLink = screen.getByRole("link", { name: /Back to Curriculum/i });
    expect(backLink).toHaveAttribute("href", "/members/curriculum");
  });

  it("renders section jump links (mobile + desktop floating nav)", () => {
    render(<BlackBeltClubCurriculumPage />);

    // Both mobile jump list and the FloatingSectionNav render links with the same name
    expect(screen.getAllByRole("link", { name: "Overview" })[0]).toHaveAttribute("href", "#overview");
    expect(screen.getAllByRole("link", { name: "Requirements" })[0]).toHaveAttribute("href", "#requirements");
    expect(screen.getAllByRole("link", { name: "Combos" })[0]).toHaveAttribute("href", "#combos");
  });
});
