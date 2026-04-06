import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { PromoModal } from "@/components/home/promo-modal";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const mockSessionStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};

describe("PromoModal", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(window, "sessionStorage", {
      value: mockSessionStorage,
      writable: true,
      configurable: true,
    });
    mockSessionStorage.getItem.mockReset();
    mockSessionStorage.setItem.mockReset();
    mockSessionStorage.getItem.mockReturnValue(null);
  });

  it("shows after delay on first visit", () => {
    render(<PromoModal />);
    expect(screen.queryByText("Buy one, get one free")).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(800);
    });

    expect(screen.getByText("Buy one, get one free")).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("does not show if already dismissed", () => {
    mockSessionStorage.getItem.mockReturnValue("true");
    render(<PromoModal />);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.queryByText("Buy one, get one free")).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it("closes on X button click", () => {
    render(<PromoModal />);
    act(() => {
      vi.advanceTimersByTime(800);
    });

    const closeButtons = screen.getAllByLabelText("Close");
    fireEvent.click(closeButtons[0]);

    expect(screen.queryByText("Buy one, get one free")).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it("closes on backdrop click", () => {
    const { container } = render(<PromoModal />);
    act(() => {
      vi.advanceTimersByTime(800);
    });

    const backdrop = container.querySelector(".fixed") as HTMLElement;
    fireEvent.click(backdrop);

    expect(screen.queryByText("Buy one, get one free")).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('closes on "No thanks" click', () => {
    render(<PromoModal />);
    act(() => {
      vi.advanceTimersByTime(800);
    });

    fireEvent.click(screen.getByText("No thanks"));

    expect(screen.queryByText("Buy one, get one free")).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it("stores dismissal in sessionStorage", () => {
    render(<PromoModal />);
    act(() => {
      vi.advanceTimersByTime(800);
    });

    fireEvent.click(screen.getAllByLabelText("Close")[0]);

    expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
      "masterchos-promo-dismissed",
      "true",
    );
    vi.useRealTimers();
  });
});
