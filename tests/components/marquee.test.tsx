import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Marquee } from "@/components/home/marquee";

describe("Marquee", () => {
  it("renders the marquee container", () => {
    const { container } = render(<Marquee />);
    expect(container.querySelector(".animate-marquee")).not.toBeNull();
  });

  it("repeats items four times", () => {
    const { getAllByText } = render(<Marquee />);
    expect(getAllByText("Tiny Tigers").length).toBe(4);
  });
});
