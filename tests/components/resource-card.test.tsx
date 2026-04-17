import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ResourceCard } from "@/components/members/resource-card";

describe("ResourceCard", () => {
  it("renders title, description, download label", () => {
    render(
      <ResourceCard title="Handbook" description="desc" href="/x" />,
    );
    expect(screen.getByRole("link", { name: /handbook/i })).toHaveAttribute(
      "href",
      "/x",
    );
    expect(screen.getByText("desc")).toBeInTheDocument();
    expect(screen.getByText(/download pdf/i)).toBeInTheDocument();
  });

  it("renders preview image when provided", () => {
    render(
      <ResourceCard
        title="A"
        href="/a"
        previewImageSrc="/images/resources/star-chart-preview.png"
      />,
    );
    expect(screen.getByAltText(/a preview/i)).toBeInTheDocument();
  });

  it("supports light tone", () => {
    const { container } = render(
      <ResourceCard title="A" href="/a" tone="light" />,
    );
    expect(container.querySelector("a")).toHaveClass("bg-brand-cream");
  });

  it("supports dark tone by default", () => {
    const { container } = render(<ResourceCard title="A" href="/a" />);
    const anchor = container.querySelector("a");
    expect(anchor?.className).toMatch(/bg-white\/\[0\.06\]/);
  });

  it("accepts a custom eyebrow label", () => {
    render(<ResourceCard title="A" href="/a" eyebrow="Packet" />);
    expect(screen.getByText("Packet")).toBeInTheDocument();
  });
});
