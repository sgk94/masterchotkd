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
  it("submits one or more emails and shows success", async () => {
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          summary: { sent: 2, failed: 0 },
          results: [
            { email: "parent@example.com", ok: true },
            { email: "second@example.com", ok: true },
          ],
        }),
        {
          status: 201,
          headers: { "content-type": "application/json" },
        },
      ),
    );
    const user = userEvent.setup();
    render(<InviteForm />);
    await user.type(
      screen.getByLabelText(/emails/i),
      "Parent@Example.com\nsecond@example.com parent@example.com",
    );
    await user.click(
      screen.getByRole("button", { name: /send invitations/i }),
    );

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/admin/invitations",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            emails: ["parent@example.com", "second@example.com"],
          }),
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
    await user.type(screen.getByLabelText(/emails/i), "x@y.com");
    await user.click(
      screen.getByRole("button", { name: /send invitations/i }),
    );
    expect(await screen.findByText(/bad email/i)).toBeInTheDocument();
  });

  it("shows per-email results for a partial failure", async () => {
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          summary: { sent: 1, failed: 1 },
          results: [
            { email: "ok@example.com", ok: true },
            {
              email: "dupe@example.com",
              ok: false,
              error: "An invitation for that email already exists.",
            },
          ],
        }),
        { status: 207, headers: { "content-type": "application/json" } },
      ),
    );
    const user = userEvent.setup();
    render(<InviteForm />);
    await user.type(
      screen.getByLabelText(/emails/i),
      "ok@example.com\ndupe@example.com",
    );
    await user.click(
      screen.getByRole("button", { name: /send invitations/i }),
    );

    expect(await screen.findByText(/sent: ok@example.com/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/failed: dupe@example.com/i),
    ).toBeInTheDocument();
    expect(refreshMock).toHaveBeenCalled();
  });

  it("blocks batches above the local cap before calling the API", async () => {
    const user = userEvent.setup();
    render(<InviteForm />);
    const emails = Array.from(
      { length: 26 },
      (_, index) => `parent${index}@example.com`,
    ).join("\n");
    await user.type(screen.getByLabelText(/emails/i), emails);
    await user.click(
      screen.getByRole("button", { name: /send invitations/i }),
    );
    expect(
      await screen.findByText(/send at most 25 invitations/i),
    ).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("surfaces network error when fetch rejects and unsticks the button", async () => {
    fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));
    const user = userEvent.setup();
    render(<InviteForm />);
    await user.type(screen.getByLabelText(/emails/i), "x@y.com");
    await user.click(
      screen.getByRole("button", { name: /send invitations/i }),
    );
    expect(await screen.findByText(/network error/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send invitations/i }),
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
    await user.type(screen.getByLabelText(/emails/i), "x@y.com");
    await user.click(
      screen.getByRole("button", { name: /send invitations/i }),
    );
    expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled();
    resolve(new Response("{}", { status: 201 }));
  });
});
