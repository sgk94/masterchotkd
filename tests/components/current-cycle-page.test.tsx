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

  it("shows expandable written instructions when the yellow one-step video is not ready", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-17T16:00:00-07:00"));

    render(<CurrentCyclePage />);

    expect(screen.getAllByText(/video coming soon\. open for step-by-step instructions\./i)).toHaveLength(3);
    expect(screen.getByText(/outer forearm block, #1 side kick, reverse punch, double step back/i)).toBeInTheDocument();
    expect(screen.getByText(/knifehand block, right hand palm strike, step back, right leg round kick, double step back/i)).toBeInTheDocument();
  });

  it("shows expandable written instructions when the purple one-step video is not ready", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-17T16:00:00-07:00"));

    render(<CurrentCyclePage />);

    expect(screen.getAllByText(/video coming soon\. open for step-by-step instructions\./i)).toHaveLength(3);
    expect(screen.getByText(/cut kick, back leg round kick, same leg outer crescent kick/i)).toBeInTheDocument();
    expect(screen.getByText(/open stance/i)).toBeInTheDocument();
    expect(screen.queryAllByText(/reverse side kick/i).length).toBeGreaterThan(0);
  });

  it("shows expandable written instructions when the red one-step video is not ready", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-17T16:00:00-07:00"));

    render(<CurrentCyclePage />);

    expect(screen.getAllByText(/video coming soon\. open for step-by-step instructions\./i)).toHaveLength(3);
    expect(screen.getByText(/side step, triple speed kick \(body, body, face\)/i)).toBeInTheDocument();
    expect(screen.getByText(/switch legs butterfly double kick/i)).toBeInTheDocument();
  });
});
