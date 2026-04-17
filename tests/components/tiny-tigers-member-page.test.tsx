import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TinyTigersMemberPage from "@/app/(main)/students/curriculum/tiny-tigers/page";

describe("TinyTigersMemberPage", () => {
  it("renders the heading", () => {
    render(<TinyTigersMemberPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /tiny tiger curriculum/i }),
    ).toBeInTheDocument();
  });
});
