import { describe, expect, it } from "vitest";
import { invitationCreateSchema } from "@/schemas/invitation";

describe("invitationCreateSchema", () => {
  it("normalizes a single email payload", () => {
    const result = invitationCreateSchema.safeParse({
      email: "  Parent@Example.com ",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({ emails: ["parent@example.com"] });
    }
  });

  it("normalizes and deduplicates a bulk email payload", () => {
    const result = invitationCreateSchema.safeParse({
      emails: ["Parent@Example.com", "parent@example.com", "two@example.com"],
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({
        emails: ["parent@example.com", "two@example.com"],
      });
    }
  });

  it("rejects invalid bulk emails", () => {
    const result = invitationCreateSchema.safeParse({
      emails: ["parent@example.com", "bad-email"],
    });

    expect(result.success).toBe(false);
  });

  it("rejects invalid single email format", () => {
    const result = invitationCreateSchema.safeParse({ email: "not-an-email" });

    expect(result.success).toBe(false);
  });

  it("rejects missing email fields", () => {
    const result = invitationCreateSchema.safeParse({});

    expect(result.success).toBe(false);
  });

  it("caps single email length at 254", () => {
    const result = invitationCreateSchema.safeParse({
      email: `${"a".repeat(250)}@x.io`,
    });

    expect(result.success).toBe(false);
  });

  it("rejects more than 25 emails in one batch", () => {
    const result = invitationCreateSchema.safeParse({
      emails: Array.from(
        { length: 26 },
        (_, index) => `parent${index}@example.com`,
      ),
    });

    expect(result.success).toBe(false);
  });
});
