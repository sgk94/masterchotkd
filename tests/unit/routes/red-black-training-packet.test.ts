import { beforeEach, describe, expect, it, vi } from "vitest";

const authMock = vi.fn();

vi.mock("@clerk/nextjs/server", () => ({
  auth: authMock,
}));

describe("red-black training packet route", () => {
  beforeEach(() => {
    authMock.mockReset();
  });

  it("returns 401 for signed-out users", async () => {
    authMock.mockResolvedValue({ userId: null });
    const { GET } = await import("@/app/student-resources/red-black-training-packet/route");

    const response = await GET();

    expect(response.status).toBe(401);
    await expect(response.text()).resolves.toBe("Unauthorized");
  });

  it("returns the packet for signed-in users", async () => {
    authMock.mockResolvedValue({ userId: "user_123" });
    const { GET } = await import("@/app/student-resources/red-black-training-packet/route");

    const response = await GET();

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/pdf");
    expect(response.headers.get("Content-Disposition")).toContain("RedBlack Training Packet.pdf");
  });
});
