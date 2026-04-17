import { beforeEach, describe, expect, it, vi } from "vitest";

const authMock = vi.fn();

vi.mock("@clerk/nextjs/server", () => ({ auth: authMock }));

describe("serveProtectedPdf", () => {
  beforeEach(() => authMock.mockReset());

  it("returns 401 when signed out", async () => {
    authMock.mockResolvedValue({ userId: null });
    const { serveProtectedPdf } = await import(
      "@/app/student-resources/_lib/serve-protected-pdf"
    );
    const res = await serveProtectedPdf(
      undefined,
      "RedBlack Training Packet.pdf",
    );
    expect(res.status).toBe(401);
  });

  it("returns 404 for traversal-style filenames", async () => {
    authMock.mockResolvedValue({ userId: "u1" });
    const { serveProtectedPdf } = await import(
      "@/app/student-resources/_lib/serve-protected-pdf"
    );
    const res = await serveProtectedPdf(undefined, "../etc/passwd");
    expect(res.status).toBe(404);
  });

  it("returns 404 for disallowed extensions", async () => {
    authMock.mockResolvedValue({ userId: "u1" });
    const { serveProtectedPdf } = await import(
      "@/app/student-resources/_lib/serve-protected-pdf"
    );
    const res = await serveProtectedPdf(undefined, "handbook.exe");
    expect(res.status).toBe(404);
  });

  it("returns 404 when file does not exist on disk", async () => {
    authMock.mockResolvedValue({ userId: "u1" });
    const { serveProtectedPdf } = await import(
      "@/app/student-resources/_lib/serve-protected-pdf"
    );
    const res = await serveProtectedPdf(undefined, "does-not-exist.pdf");
    expect(res.status).toBe(404);
  });

  it("serves inline when download param absent", async () => {
    authMock.mockResolvedValue({ userId: "u1" });
    const { serveProtectedPdf } = await import(
      "@/app/student-resources/_lib/serve-protected-pdf"
    );
    const req = new Request("http://localhost/x");
    const res = await serveProtectedPdf(req, "RedBlack Training Packet.pdf");
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Disposition")).toMatch(/^inline;/);
  });

  it("serves as attachment when ?download=1", async () => {
    authMock.mockResolvedValue({ userId: "u1" });
    const { serveProtectedPdf } = await import(
      "@/app/student-resources/_lib/serve-protected-pdf"
    );
    const req = new Request("http://localhost/x?download=1");
    const res = await serveProtectedPdf(req, "RedBlack Training Packet.pdf");
    expect(res.headers.get("Content-Disposition")).toMatch(/^attachment;/);
  });

  it("RFC 5987 encodes the filename", async () => {
    authMock.mockResolvedValue({ userId: "u1" });
    const { serveProtectedPdf } = await import(
      "@/app/student-resources/_lib/serve-protected-pdf"
    );
    const res = await serveProtectedPdf(
      undefined,
      "RedBlack Training Packet.pdf",
    );
    expect(res.headers.get("Content-Disposition")).toContain(
      "filename*=UTF-8''RedBlack%20Training%20Packet.pdf",
    );
  });
});
