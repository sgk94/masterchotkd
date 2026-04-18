import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const { getInvitationListMock } = vi.hoisted(() => ({
  getInvitationListMock: vi.fn(),
}));

vi.mock("@clerk/nextjs/server", () => ({
  clerkClient: () =>
    Promise.resolve({
      invitations: { getInvitationList: getInvitationListMock },
    }),
}));

vi.mock("next/navigation", () => ({ useRouter: () => ({ refresh: vi.fn() }) }));

import AdminInvitationsPage from "@/app/(main)/admin/invitations/page";

describe("AdminInvitationsPage", () => {
  it("renders empty state when no invitations", async () => {
    getInvitationListMock.mockResolvedValue({ data: [] });
    const ui = await AdminInvitationsPage();
    render(ui);
    expect(screen.getByText(/no pending invitations/i)).toBeInTheDocument();
  });

  it("renders one row per pending invitation", async () => {
    getInvitationListMock.mockResolvedValue({
      data: [
        {
          id: "inv_1",
          emailAddress: "a@b.com",
          status: "pending",
          createdAt: Date.now(),
        },
        {
          id: "inv_2",
          emailAddress: "c@d.com",
          status: "pending",
          createdAt: Date.now(),
        },
      ],
    });
    const ui = await AdminInvitationsPage();
    render(ui);
    expect(screen.getByText("a@b.com")).toBeInTheDocument();
    expect(screen.getByText("c@d.com")).toBeInTheDocument();
    expect(screen.getByText(/pending \(2\)/i)).toBeInTheDocument();
  });

  it("renders degraded state when Clerk list throws (InviteForm still usable)", async () => {
    getInvitationListMock.mockRejectedValue(new Error("clerk down"));
    const ui = await AdminInvitationsPage();
    render(ui);
    expect(screen.getByText(/couldn.t load pending invitations/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send invitation/i })).toBeInTheDocument();
  });
});
