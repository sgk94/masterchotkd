import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BezelCard } from "@/components/ui/bezel-card";

describe("BezelCard", () => {
  it("renders children", () => {
    const { getByText } = render(
      <BezelCard>
        <span>hello</span>
      </BezelCard>,
    );
    expect(getByText("hello")).toBeInTheDocument();
  });

  it("applies xl radius by default", () => {
    const { container } = render(<BezelCard>x</BezelCard>);
    expect(container.firstChild).toHaveClass("rounded-[2rem]");
  });

  it("applies lg radius when requested", () => {
    const { container } = render(<BezelCard radius="lg">x</BezelCard>);
    expect(container.firstChild).toHaveClass("rounded-[1.5rem]");
  });

  it("passes className through to outer shell", () => {
    const { container } = render(
      <BezelCard className="custom-foo">x</BezelCard>,
    );
    expect(container.firstChild).toHaveClass("custom-foo");
  });
});
