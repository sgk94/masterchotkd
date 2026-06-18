import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TinyTigersCurriculumPage from "@/app/(main)/students/curriculum/tiny-tigers/page";

describe("TinyTigersCurriculumPage", () => {
  it("renders the board-breaking guide video", () => {
    render(<TinyTigersCurriculumPage />);

    expect(
      screen.getByRole("button", {
        name: /play tiny tigers board breaking parent & student guide/i,
      }),
    ).toBeInTheDocument();
  });
});
