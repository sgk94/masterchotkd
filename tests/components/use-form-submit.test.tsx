import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { z } from "zod";
import { useFormSubmit } from "@/hooks/use-form-submit";

const schema = z.object({ name: z.string().min(1) });

function Harness(): React.ReactElement {
  const { errors, submitting, success, handleSubmit } = useFormSubmit({
    schema,
    endpoint: "/api/test",
    extractData: (fd) => ({ name: fd.get("name") }),
  });
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" defaultValue="" data-testid="name" />
      <button type="submit" disabled={submitting}>
        Submit
      </button>
      {errors.name ? <span data-testid="err-name">{errors.name}</span> : null}
      {errors.form ? <span data-testid="err-form">{errors.form}</span> : null}
      {success ? <span data-testid="ok">ok</span> : null}
    </form>
  );
}

describe("useFormSubmit", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("surfaces Zod field errors without calling fetch", async () => {
    render(<Harness />);
    const form = screen.getByRole("button").closest("form")!;
    await act(async () => {
      fireEvent.submit(form);
    });
    expect(screen.getByTestId("err-name")).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("sets success when fetch returns ok", async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });
    render(<Harness />);
    (screen.getByTestId("name") as HTMLInputElement).value = "Shawn";
    const form = screen.getByRole("button").closest("form")!;
    await act(async () => {
      fireEvent.submit(form);
    });
    expect(screen.getByTestId("ok")).toBeInTheDocument();
  });

  it("surfaces server error body on non-ok response", async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Server said no" }),
    });
    render(<Harness />);
    (screen.getByTestId("name") as HTMLInputElement).value = "Shawn";
    const form = screen.getByRole("button").closest("form")!;
    await act(async () => {
      fireEvent.submit(form);
    });
    expect(screen.getByTestId("err-form")).toHaveTextContent(/Server said no/);
  });

  it("falls back to 'Something went wrong' when body has no error", async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      json: async () => ({}),
    });
    render(<Harness />);
    (screen.getByTestId("name") as HTMLInputElement).value = "Shawn";
    const form = screen.getByRole("button").closest("form")!;
    await act(async () => {
      fireEvent.submit(form);
    });
    expect(screen.getByTestId("err-form")).toHaveTextContent(
      /Something went wrong/,
    );
  });

  it("handles fetch rejection with phone number fallback", async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("offline"),
    );
    render(<Harness />);
    (screen.getByTestId("name") as HTMLInputElement).value = "Shawn";
    const form = screen.getByRole("button").closest("form")!;
    await act(async () => {
      fireEvent.submit(form);
    });
    expect(screen.getByTestId("err-form")).toHaveTextContent(/Unable to connect/);
  });
});
