import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ColorBeltPage from "@/app/(main)/students/curriculum/color-belt/page";

describe("ColorBeltPage", () => {
  it("renders the Color Belt heading", () => {
    render(<ColorBeltPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /color belt curriculum/i }),
    ).toBeInTheDocument();
  });

  it("lists poomsae video section", () => {
    render(<ColorBeltPage />);
    expect(
      screen.getByRole("heading", { level: 2, name: /poomsae videos/i }),
    ).toBeInTheDocument();
  });
});
