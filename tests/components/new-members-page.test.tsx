import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NewMembersPage from "@/app/(main)/students/new-members/page";

describe("NewMembersPage", () => {
  it("renders the new members start page", () => {
    render(<NewMembersPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /start here/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /spark member app/i }),
    ).toBeInTheDocument();
  });
});
