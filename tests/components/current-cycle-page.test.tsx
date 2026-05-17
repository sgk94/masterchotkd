import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import CurrentCyclePage from "@/app/(main)/students/current-cycle/page";

describe("CurrentCyclePage", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders available poomsae videos for the active cycle", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-17T16:00:00-07:00"));

    render(<CurrentCyclePage />);

    expect(
      screen.getByRole("button", { name: /play taegeuk 2 jang/i }),
    ).toBeInTheDocument();
  });
});
