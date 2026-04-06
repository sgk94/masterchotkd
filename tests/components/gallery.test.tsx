import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Gallery } from "@/components/home/gallery";

vi.mock("next/image", () => ({
  // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
  default: ({ fill: _f, sizes: _s, ...rest }: Record<string, unknown>) => <img {...rest} />,
}));

describe("Gallery", () => {
  it("renders all gallery images", () => {
    render(<Gallery />);
    expect(screen.getByAltText("Taekwondo students in training")).toBeInTheDocument();
    expect(screen.getByAltText("Students practicing poomsae forms")).toBeInTheDocument();
    expect(screen.getByAltText("Belt promotion ceremony")).toBeInTheDocument();
    expect(screen.getByAltText("Master Cho instructing students")).toBeInTheDocument();
    expect(screen.getByAltText("Sparring practice session")).toBeInTheDocument();
  });

  it("opens lightbox on image click", () => {
    render(<Gallery />);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    expect(screen.getByLabelText("Close lightbox")).toBeInTheDocument();
  });

  it("closes lightbox on backdrop click", () => {
    render(<Gallery />);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    expect(screen.getByLabelText("Close lightbox")).toBeInTheDocument();

    // Click the backdrop (the outer fixed div)
    const backdrop = screen.getByLabelText("Close lightbox").closest(
      ".fixed",
    ) as HTMLElement;
    fireEvent.click(backdrop);
    expect(screen.queryByLabelText("Close lightbox")).not.toBeInTheDocument();
  });

  it("closes lightbox on X button click", () => {
    render(<Gallery />);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);

    const closeButton = screen.getByLabelText("Close lightbox");
    fireEvent.click(closeButton);
    expect(screen.queryByLabelText("Close lightbox")).not.toBeInTheDocument();
  });
});
