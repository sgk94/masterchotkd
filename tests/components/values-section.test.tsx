import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ValuesSection } from "@/components/home/values-section";

describe("ValuesSection", () => {
  it("renders all 3 values", () => {
    render(<ValuesSection />);
    expect(screen.getByText("Loyalty & Respect")).toBeInTheDocument();
    expect(screen.getByText("Home, School & Family")).toBeInTheDocument();
    expect(screen.getByText("Discipline & Growth")).toBeInTheDocument();
  });

  it("renders numbered labels (01, 02, 03)", () => {
    render(<ValuesSection />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
  });
});
