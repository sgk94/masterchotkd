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

  it("uses numeric Taegeuk names on poomsae cards", () => {
    render(<ColorBeltPage />);
    expect(screen.getByText("Taegeuk 1 Jang")).toBeInTheDocument();
    expect(screen.getByText("Taegeuk 2 Jang")).toBeInTheDocument();
    expect(screen.queryByText("Taegeuk Il-jang")).not.toBeInTheDocument();
  });

  it("renders the Gibon 1 Basic video", () => {
    render(<ColorBeltPage />);
    expect(screen.getByText("Gibon 1 Jang")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /play gibon 1 jang/i }),
    ).toBeInTheDocument();
  });
});
