import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TrialConfirmedPage from "@/app/(main)/trial-confirmed/page";

describe("TrialConfirmedPage", () => {
  it("shows the trial-focused schedule rows only", () => {
    render(<TrialConfirmedPage />);

    expect(screen.getByText("Tiny Tigers 3-6")).toBeInTheDocument();
    expect(screen.getByText("White-Yellow (Beginner)")).toBeInTheDocument();
    expect(screen.getByText("Family / All Belts")).toBeInTheDocument();

    expect(screen.queryByText("Morning Class")).not.toBeInTheDocument();
    expect(screen.queryByText("Camo-Purple (Intermediate)")).not.toBeInTheDocument();
    expect(screen.queryByText("Blue-Black (Advanced)")).not.toBeInTheDocument();
    expect(screen.queryByText("Adult & Teens")).not.toBeInTheDocument();
    expect(screen.queryByText("Leadership / Demo Team*")).not.toBeInTheDocument();
    expect(screen.queryByText("Competition Team*")).not.toBeInTheDocument();
  });
});

