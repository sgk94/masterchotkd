import { describe, it, expect } from "vitest";
import { trialSchema } from "@/schemas/trial";

describe("trialSchema", () => {
  it("validates a complete valid submission", () => {
    const result = trialSchema.safeParse({
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "425-555-5678",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = trialSchema.safeParse({
      name: "",
      email: "jane@example.com",
      phone: "425-555-5678",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = trialSchema.safeParse({
      name: "Jane Smith",
      email: "bad",
      phone: "425-555-5678",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty phone", () => {
    const result = trialSchema.safeParse({
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects name exceeding max length", () => {
    const result = trialSchema.safeParse({
      name: "A".repeat(101),
      email: "jane@example.com",
      phone: "425-555-5678",
    });
    expect(result.success).toBe(false);
  });

  it("rejects phone with invalid characters", () => {
    const result = trialSchema.safeParse({
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "abc-not-a-phone",
    });
    expect(result.success).toBe(false);
  });

  it("rejects phone exceeding max length", () => {
    const result = trialSchema.safeParse({
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "1".repeat(21),
    });
    expect(result.success).toBe(false);
  });
});
