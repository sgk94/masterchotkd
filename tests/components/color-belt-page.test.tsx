import { fireEvent, render, screen } from "@testing-library/react";
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

  it("renders the SJB Level 3 weapon video when expanded", () => {
    render(<ColorBeltPage />);

    fireEvent.click(screen.getByRole("button", { name: /sjb level 3/i }));

    expect(
      screen.getByRole("button", { name: /play sjb level 3/i }),
    ).toBeInTheDocument();
  });

  it("disables placeholder-only video cards", () => {
    render(<ColorBeltPage />);

    const bmeLevel1 = screen.getByRole("button", { name: /bme level 1/i });
    expect(bmeLevel1).toBeDisabled();

    fireEvent.click(bmeLevel1);
    expect(screen.queryByRole("region")).not.toBeInTheDocument();

    expect(screen.getByRole("button", { name: /white one-step/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /yellow one-step/i })).not.toBeDisabled();
  });

  it("shows written one-step instructions for yellow, purple, and red fallback cards", () => {
    render(<ColorBeltPage />);

    expect(screen.getAllByText(/video coming soon\. open for step-by-step instructions\./i)).toHaveLength(3);

    fireEvent.click(screen.getByRole("button", { name: /yellow one-step/i }));
    expect(screen.getByText(/outer forearm block, #1 side kick, reverse punch, double step back/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /purple one-step/i }));
    expect(screen.getByText(/cut kick, back leg round kick, same leg outer crescent kick/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /red one-step/i }));
    expect(screen.getByText(/side step, triple speed kick \(body, body, face\)/i)).toBeInTheDocument();
    expect(screen.getByText(/switch legs butterfly double kick/i)).toBeInTheDocument();
  });
});
