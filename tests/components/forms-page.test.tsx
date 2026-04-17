import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FormsPage from "@/app/(main)/students/forms/page";

describe("FormsPage", () => {
  it("renders the forms heading", () => {
    render(<FormsPage />);
    expect(
      screen.getByRole("heading", { level: 1 }),
    ).toBeInTheDocument();
  });
});
