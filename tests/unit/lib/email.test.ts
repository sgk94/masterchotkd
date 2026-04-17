import { beforeEach, describe, expect, it, vi } from "vitest";

const sendMock = vi.fn();

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

vi.mock("@/lib/server-env", () => ({
  getServerEnv: () => ({
    RESEND_API_KEY: "test_key",
    RESEND_FROM_EMAIL: "noreply@example.com",
    NOTIFY_EMAIL: "owner@example.com",
  }),
}));

describe("sendEmail", () => {
  beforeEach(() => {
    sendMock.mockReset();
  });

  it("forwards the payload to Resend", async () => {
    sendMock.mockResolvedValue({ error: null, data: { id: "abc" } });
    const { sendEmail } = await import("@/lib/email");
    await sendEmail({
      to: "owner@example.com",
      subject: "hi",
      html: "<p>x</p>",
    });
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "noreply@example.com",
        to: "owner@example.com",
        subject: "hi",
        html: "<p>x</p>",
      }),
    );
  });

  it("includes replyTo when supplied", async () => {
    sendMock.mockResolvedValue({ error: null });
    const { sendEmail } = await import("@/lib/email");
    await sendEmail({ to: "a@b.com", subject: "s", html: "h", replyTo: "c@d.com" });
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({ replyTo: "c@d.com" }),
    );
  });

  it("throws when Resend returns error", async () => {
    sendMock.mockResolvedValue({
      error: { name: "RateLimit", message: "nope" },
    });
    const { sendEmail } = await import("@/lib/email");
    await expect(
      sendEmail({ to: "x", subject: "y", html: "z" }),
    ).rejects.toThrow(/RateLimit - nope/);
  });

  it("times out if Resend hangs past 5s", async () => {
    vi.useFakeTimers();
    sendMock.mockImplementation(() => new Promise(() => {}));
    const { sendEmail } = await import("@/lib/email");
    const promise = sendEmail({ to: "x", subject: "y", html: "z" });
    const assertion = expect(promise).rejects.toThrow(/timeout/i);
    await vi.advanceTimersByTimeAsync(5_001);
    await assertion;
    vi.useRealTimers();
  });
});
