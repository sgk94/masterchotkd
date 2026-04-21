import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProgramDetailPage } from "@/components/programs/program-detail-page";

const testConfig = {
  heroImage: "/images/test.jpg",
  heroImageAlt: "Test program",
  eyebrowLabel: "Ages 4-6",
  title: "Test Program",
  description: "A test program description.",
  whatToExpectHeading: "What you'll learn",
  whatToExpect: [
    { title: "Skill 1", description: "Description 1" },
    { title: "Skill 2", description: "Description 2" },
  ],
  scheduleHeading: "Test Schedule",
  scheduleSubtitle: "40 min sessions",
  schedule: <div data-testid="schedule-content">Mon 3:30</div>,
  faqLabel: "FAQ",
  faqHeading: "Common Questions",
  faq: [{ q: "How old?", a: "Ages 4-6." }],
  ctaHeading: "Ready to get started?",
  ctaDescription: "Try 2 weeks for just $49.",
};

describe("ProgramDetailPage", () => {
  it("renders the hero section with title and eyebrow", () => {
    render(<ProgramDetailPage {...testConfig} />);
    expect(screen.getByRole("heading", { level: 1, name: "Test Program" })).toBeDefined();
    expect(screen.getByText("Ages 4-6")).toBeDefined();
  });

  it("renders What to Expect cards", () => {
    render(<ProgramDetailPage {...testConfig} />);
    expect(screen.getByText("Skill 1")).toBeDefined();
    expect(screen.getByText("Skill 2")).toBeDefined();
  });

  it("renders schedule content", () => {
    render(<ProgramDetailPage {...testConfig} />);
    expect(screen.getByTestId("schedule-content")).toBeDefined();
  });

  it("renders FAQ items", () => {
    render(<ProgramDetailPage {...testConfig} />);
    expect(screen.getByText("How old?")).toBeDefined();
    expect(screen.getByText("Ages 4-6.")).toBeDefined();
  });

  it("renders bottom CTA", () => {
    render(<ProgramDetailPage {...testConfig} />);
    expect(screen.getByText("Ready to get started?")).toBeDefined();
  });

  it("renders requirements section when provided", () => {
    render(
      <ProgramDetailPage
        {...testConfig}
        requirements={{
          heading: "Requirements",
          items: <p>Must be Camo belt or higher</p>,
        }}
      />,
    );
    expect(screen.getByText("Requirements")).toBeDefined();
    expect(screen.getByText("Must be Camo belt or higher")).toBeDefined();
  });

  it("does not render requirements section when not provided", () => {
    const { container } = render(<ProgramDetailPage {...testConfig} />);
    expect(container.textContent).not.toContain("Eligibility");
  });
});
