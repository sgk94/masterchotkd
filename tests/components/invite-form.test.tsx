import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InviteForm } from "@/components/admin/invite-form";

const refreshMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: refreshMock }),
}));

const fetchMock = vi.fn();

beforeEach(() => {
  refreshMock.mockReset();
  fetchMock.mockReset();
  globalThis.fetch = fetchMock as unknown as typeof fetch;
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("InviteForm", () => {
  it("submits the email and shows success", async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ invitation: { id: "inv_1" } }), {
        status: 201,
        headers: { "content-type": "application/json" },
      }),
    );
    const user = userEvent.setup();
    render(<InviteForm />);
    await user.type(screen.getByLabelText(/email/i), "parent@example.com");
    await user.click(
      screen.getByRole("button", { name: /send invitation/i }),
    );

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/admin/invitations",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ email: "parent@example.com" }),
        }),
      );
    });
    expect(refreshMock).toHaveBeenCalled();
    expect(await screen.findByText(/invitation sent/i)).toBeInTheDocument();
  });

  it("shows server error message on 4xx", async () => {
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          error: "Invalid input",
          fieldErrors: { email: ["Bad email"] },
        }),
        { status: 400, headers: { "content-type": "application/json" } },
      ),
    );
    const user = userEvent.setup();
    render(<InviteForm />);
    await user.type(screen.getByLabelText(/email/i), "x@y.com");
    await user.click(
      screen.getByRole("button", { name: /send invitation/i }),
    );
    expect(await screen.findByText(/bad email/i)).toBeInTheDocument();
  });

  it("surfaces network error when fetch rejects and unsticks the button", async () => {
    fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));
    const user = userEvent.setup();
    render(<InviteForm />);
    await user.type(screen.getByLabelText(/email/i), "x@y.com");
    await user.click(
      screen.getByRole("button", { name: /send invitation/i }),
    );
    expect(await screen.findByText(/network error/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send invitation/i }),
    ).not.toBeDisabled();
  });

  it("disables the button while submitting", async () => {
    let resolve!: (r: Response) => void;
    fetchMock.mockReturnValue(
      new Promise<Response>((r) => {
        resolve = r;
      }),
    );
    const user = userEvent.setup();
    render(<InviteForm />);
    await user.type(screen.getByLabelText(/email/i), "x@y.com");
    await user.click(
      screen.getByRole("button", { name: /send invitation/i }),
    );
    expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled();
    resolve(new Response("{}", { status: 201 }));
  });
});
