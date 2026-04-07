import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScheduleGrid } from "@/components/schedule/schedule-grid";

describe("ScheduleGrid", () => {
  it("renders day headers (Monday through Saturday)", () => {
    render(<ScheduleGrid />);
    expect(screen.getByText("Monday")).toBeInTheDocument();
    expect(screen.getByText("Tuesday")).toBeInTheDocument();
    expect(screen.getByText("Wednesday")).toBeInTheDocument();
    expect(screen.getByText("Thursday")).toBeInTheDocument();
    expect(screen.getByText("Friday")).toBeInTheDocument();
    expect(screen.getByText("Saturday")).toBeInTheDocument();
  });

  it("renders class rows", () => {
    render(<ScheduleGrid />);
    expect(screen.getByText("Tiny Tigers 3-6")).toBeInTheDocument();
    expect(screen.getByText("White-Yellow (Beginner)")).toBeInTheDocument();
    expect(screen.getByText("Camo-Purple (Intermediate)")).toBeInTheDocument();
    expect(screen.getByText("Blue-Black (Advanced)")).toBeInTheDocument();
    expect(screen.getByText("Competition Team*")).toBeInTheDocument();
    expect(screen.getByText("Leadership / Demo Team*")).toBeInTheDocument();
  });

  it("renders correct times in cells", () => {
    render(<ScheduleGrid />);
    // Tiny Tigers Monday = 3:30-4:10 (appears in multiple cells)
    expect(screen.getAllByText("3:30-4:10").length).toBeGreaterThanOrEqual(1);
    // Competition Team Saturday = 10:30~
    expect(screen.getByText("10:30~")).toBeInTheDocument();
    // Leadership Saturday = 9:00 AM~
    expect(screen.getByText("9:00 AM~")).toBeInTheDocument();
  });

  it("has empty cells where no class is scheduled", () => {
    const { container } = render(<ScheduleGrid />);
    // Adult & Teens has no Tuesday (day 2), Thursday (day 4), or Saturday (day 6) slot
    const rows = container.querySelectorAll("tbody tr");
    // Adult & Teens is the 7th row (index 6)
    const adultRow = rows[6];
    const cells = adultRow.querySelectorAll("td");
    // cells[0] = class name, cells[2] = Tuesday (should be empty)
    expect(cells[2].textContent).toBe("—");
  });
});
