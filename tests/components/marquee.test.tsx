import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Marquee } from "@/components/home/marquee";

describe("Marquee", () => {
  it("renders the marquee container", () => {
    const { container } = render(<Marquee />);
    expect(container.querySelector(".animate-marquee")).not.toBeNull();
  });

  it("repeats items twice", () => {
    const { getAllByText } = render(<Marquee />);
    expect(getAllByText("Tiny Tigers").length).toBe(2);
  });
});
