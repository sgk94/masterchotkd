import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { YouTubeFacade } from "@/components/members/youtube-facade";

describe("YouTubeFacade", () => {
  it("renders the error fallback for invalid video ids", () => {
    render(<YouTubeFacade videoId="not-a-real-id" title="Bogus" />);
    expect(screen.getByText(/invalid video reference/i)).toBeInTheDocument();
  });

  it("renders the play button for valid ids and swaps to iframe on click", () => {
    const { container } = render(
      <YouTubeFacade videoId="EkLZUEBOz0A" title="Taegeuk 2" />,
    );
    const playButton = screen.getByRole("button", { name: /play taegeuk 2/i });
    expect(playButton).toBeInTheDocument();
    expect(container.querySelector("iframe")).toBeNull();

    fireEvent.click(playButton);

    const iframe = container.querySelector("iframe");
    expect(iframe).not.toBeNull();
    expect(iframe?.getAttribute("src")).toContain(
      "youtube-nocookie.com/embed/EkLZUEBOz0A",
    );
  });
});
