import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import WeeklyTrainingPage from "@/app/(main)/students/curriculum/weekly-training/page";

describe("WeeklyTrainingPage", () => {
  it("renders the page heading", () => {
    render(<WeeklyTrainingPage />);
    expect(
      screen.getByRole("heading", { level: 1 }),
    ).toBeInTheDocument();
  });
});
