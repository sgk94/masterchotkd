import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/members/curriculum",
}));

import { MembersTabBar } from "@/components/members/members-tab-bar";

describe("MembersTabBar", () => {
  it("renders every tab link", () => {
    render(<MembersTabBar />);
    expect(
      screen.getByRole("link", { name: /announcements/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /resources/i }),
    ).toBeInTheDocument();
  });
});
