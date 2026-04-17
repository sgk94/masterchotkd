import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PageContainer } from "@/components/ui/page-container";

describe("PageContainer", () => {
  it("wraps children in a centered max-width container", () => {
    const { container, getByText } = render(
      <PageContainer>
        <p>inner</p>
      </PageContainer>,
    );
    expect(getByText("inner")).toBeInTheDocument();
    expect(container.querySelector("div")).toHaveClass("mx-auto");
  });

  it("merges custom className", () => {
    const { container } = render(
      <PageContainer className="extra">child</PageContainer>,
    );
    expect(container.querySelector("div")).toHaveClass("extra");
  });
});
