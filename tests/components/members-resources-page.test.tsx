import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ResourcesPage from "@/app/(main)/students/resources/page";

describe("Members ResourcesPage", () => {
  it("renders resource cards", () => {
    render(<ResourcesPage />);
    expect(screen.getAllByText(/download pdf/i).length).toBeGreaterThan(0);
  });
});
