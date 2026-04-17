import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  SectionHeader,
  SubSectionHeader,
  VideoCard,
  VideoPlaceholder,
} from "@/components/members/shared";

describe("members shared", () => {
  it("SectionHeader renders label + title + description", () => {
    render(<SectionHeader label="L" title="T" description="D" />);
    expect(screen.getByText("L")).toBeInTheDocument();
    expect(screen.getByText("T")).toBeInTheDocument();
    expect(screen.getByText("D")).toBeInTheDocument();
  });

  it("SectionHeader hides description when omitted", () => {
    render(<SectionHeader label="L" title="T" />);
    expect(screen.getByText("L")).toBeInTheDocument();
    expect(screen.getByText("T")).toBeInTheDocument();
  });

  it("SubSectionHeader renders a heading", () => {
    render(<SubSectionHeader title="Sub" />);
    expect(screen.getByRole("heading", { name: /sub/i })).toBeInTheDocument();
  });

  it("VideoCard renders eyebrow + title + subtitle", () => {
    render(<VideoCard eyebrow="E" title="T" subtitle="S" />);
    expect(screen.getByText("E")).toBeInTheDocument();
    expect(screen.getAllByText("T").length).toBeGreaterThan(0);
    expect(screen.getByText("S")).toBeInTheDocument();
  });

  it("VideoPlaceholder renders a placeholder title", () => {
    render(<VideoPlaceholder title="Placeholder" />);
    expect(screen.getByText("Placeholder")).toBeInTheDocument();
  });
});
