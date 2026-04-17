import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ScheduleClient } from "@/components/schedule/schedule-client";

describe("ScheduleClient", () => {
  it("renders the schedule grid with at least one class row", () => {
    render(<ScheduleClient />);
    expect(screen.getAllByText(/tiny tigers/i).length).toBeGreaterThan(0);
  });
});
