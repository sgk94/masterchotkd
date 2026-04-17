import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Testimonials } from "@/components/home/testimonials";

describe("Testimonials", () => {
  it("renders three featured reviews", async () => {
    const rendered = await Testimonials();
    render(rendered);
    expect(screen.getByText(/success stories/i)).toBeInTheDocument();
    expect(screen.getByText(/real people, real results/i)).toBeInTheDocument();
  });

  it("links to the full reviews page", async () => {
    const rendered = await Testimonials();
    render(rendered);
    const cta = screen.getByRole("link", { name: /see all reviews/i });
    expect(cta).toHaveAttribute("href", "/reviews");
  });
});
