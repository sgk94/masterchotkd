import { describe, expect, it } from "vitest";
import { invitationCreateSchema } from "@/schemas/invitation";

describe("invitationCreateSchema", () => {
  it("accepts a valid email", () => {
    const result = invitationCreateSchema.safeParse({
      email: "parent@example.com",
    });
    expect(result.success).toBe(true);
  });

  it("trims and lowercases email", () => {
    const result = invitationCreateSchema.safeParse({
      email: "  PARENT@Example.COM  ",
    });
    expect(result.success).toBe(true);
    expect(result.data?.email).toBe("parent@example.com");
  });

  it("rejects invalid email format", () => {
    const result = invitationCreateSchema.safeParse({ email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects missing email", () => {
    const result = invitationCreateSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("caps email length at 254 (RFC 5321)", () => {
    const long = `${"a".repeat(250)}@x.io`;
    const result = invitationCreateSchema.safeParse({ email: long });
    expect(result.success).toBe(false);
  });
});
