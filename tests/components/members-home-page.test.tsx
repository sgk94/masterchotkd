import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MembersHomePage from "@/app/(main)/students/page";

describe("MembersHomePage", () => {
  it("renders members landing heading", () => {
    render(<MembersHomePage />);
    expect(
      screen.getByRole("heading", { level: 1 }),
    ).toBeInTheDocument();
  });
});
