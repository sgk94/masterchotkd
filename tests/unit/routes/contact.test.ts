import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const sendEmailMock = vi.fn();
const checkRateLimitMock = vi.fn();
const getClientIpMock = vi.fn();

vi.mock("@/lib/email", () => ({
  sendEmail: sendEmailMock,
}));

vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: checkRateLimitMock,
  isRateLimitConfigured: () => true,
}));

vi.mock("@/lib/api-security", () => ({
  getClientIp: getClientIpMock,
  validateOrigin: vi.fn().mockResolvedValue(null),
}));

function makeRequest(
  body: unknown,
  { contentLength, raw }: { contentLength?: number; raw?: string } = {},
): Request {
  const payload = raw ?? JSON.stringify(body);
  const headers = new Headers({ "content-type": "application/json" });
  headers.set(
    "content-length",
    String(contentLength ?? new TextEncoder().encode(payload).byteLength),
  );
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers,
    body: payload,
  });
}

const validBody = {
  name: "John Doe",
  email: "john@example.com",
  phone: "425-555-1234",
  message: "I'm interested in trial classes for my child.",
};

describe("POST /api/contact", () => {
  beforeEach(() => {
    process.env.CLERK_SECRET_KEY = "test-clerk";
    process.env.RESEND_API_KEY = "test-resend";
    process.env.RESEND_FROM_EMAIL = "noreply@example.com";
    process.env.NOTIFY_EMAIL = "notify@example.com";

    sendEmailMock.mockReset();
    checkRateLimitMock.mockReset();
    getClientIpMock.mockReset();

    sendEmailMock.mockResolvedValue(undefined);
    checkRateLimitMock.mockResolvedValue({ success: true });
    getClientIpMock.mockResolvedValue("127.0.0.1");
  });

  afterEach(() => {
    vi.resetModules();
  });

  it("returns 201 and sends one notification email on success", async () => {
    const { POST } = await import("@/app/(main)/api/contact/route");

    const response = await POST(makeRequest(validBody));

    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toEqual({ success: true });
    expect(sendEmailMock).toHaveBeenCalledTimes(1);
    const call = sendEmailMock.mock.calls[0][0];
    expect(call.to).toBe("notify@example.com");
    expect(call.replyTo).toBe("john@example.com");
    expect(call.subject).toContain("John Doe");
  });

  it("returns 413 when actual body exceeds limit", async () => {
    const { POST } = await import("@/app/(main)/api/contact/route");

    const oversized = JSON.stringify({ ...validBody, message: "x".repeat(11_000) });
    const response = await POST(makeRequest(null, { raw: oversized }));

    expect(response.status).toBe(413);
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it("returns 429 when rate limit exceeded", async () => {
    checkRateLimitMock.mockResolvedValueOnce({ success: false });
    const { POST } = await import("@/app/(main)/api/contact/route");

    const response = await POST(makeRequest(validBody));

    expect(response.status).toBe(429);
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it("returns 400 on malformed JSON", async () => {
    const { POST } = await import("@/app/(main)/api/contact/route");

    const response = await POST(makeRequest(null, { raw: "{not json" }));

    expect(response.status).toBe(400);
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it("returns 400 with fieldErrors on schema failure", async () => {
    const { POST } = await import("@/app/(main)/api/contact/route");

    const response = await POST(
      makeRequest({ name: "J", email: "not-an-email", message: "hi" }),
    );

    expect(response.status).toBe(400);
    const payload = await response.json();
    expect(payload.error).toBe("Invalid form data");
    expect(payload.fieldErrors).toBeDefined();
    expect(payload).not.toHaveProperty("formErrors");
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it("rejects body larger than 10 KB regardless of Content-Length header", async () => {
    const { POST } = await import("@/app/(main)/api/contact/route");

    const oversizedBody = JSON.stringify({
      name: "Test User",
      email: "test@example.com",
      phone: "425-555-1234",
      message: "x".repeat(11_000),
    });

    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": "100",
        },
        body: oversizedBody,
      }),
    );

    expect(response.status).toBe(413);
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it("returns 500 when Resend fails", async () => {
    sendEmailMock.mockRejectedValueOnce(new Error("Resend error: 500 - boom"));
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { POST } = await import("@/app/(main)/api/contact/route");

    const response = await POST(makeRequest(validBody));

    expect(response.status).toBe(500);
    const payload = await response.json();
    expect(payload.error).toMatch(/unable to send/i);
    consoleSpy.mockRestore();
  });
});
