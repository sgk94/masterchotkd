import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ResourceCard } from "@/components/members/resource-card";

describe("ResourceCard", () => {
  it("renders title and download CTA linking to href", () => {
    render(
      <ResourceCard title="Handbook" description="desc" href="/x" />,
    );
    expect(screen.getByText("Handbook")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /download pdf/i })).toHaveAttribute(
      "href",
      "/x",
    );
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
    expect(container.firstElementChild).toHaveClass("bg-brand-cream");
    expect(container.querySelector("a")).toHaveAttribute("href", "/a");
  });

  it("supports dark tone by default", () => {
    const { container } = render(<ResourceCard title="A" href="/a" />);
    expect(container.firstElementChild?.className).toMatch(/bg-white\/\[0\.06\]/);
    expect(container.querySelector("a")).toHaveAttribute("href", "/a");
  });

  it("accepts a custom eyebrow label", () => {
    render(<ResourceCard title="A" href="/a" eyebrow="Packet" />);
    expect(screen.getByText("Packet")).toBeInTheDocument();
  });
});
