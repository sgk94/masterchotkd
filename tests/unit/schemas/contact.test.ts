import { describe, it, expect } from "vitest";
import { contactSchema } from "@/schemas/contact";

describe("contactSchema", () => {
  it("validates a complete valid submission", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      phone: "425-555-1234",
      message: "I'm interested in classes for my child.",
    });
    expect(result.success).toBe(true);
  });

  it("allows phone to be empty", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      phone: "",
      message: "I'm interested in classes.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects name shorter than 2 chars", () => {
    const result = contactSchema.safeParse({
      name: "J",
      email: "john@example.com",
      phone: "",
      message: "I'm interested in classes.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "not-an-email",
      phone: "",
      message: "I'm interested in classes.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects message shorter than 10 chars", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      phone: "",
      message: "Hi",
    });
    expect(result.success).toBe(false);
  });

  it("rejects name exceeding max length", () => {
    const result = contactSchema.safeParse({
      name: "A".repeat(101),
      email: "john@example.com",
      phone: "",
      message: "I'm interested in classes.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects message exceeding max length", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      phone: "",
      message: "A".repeat(2001),
    });
    expect(result.success).toBe(false);
  });

  it("rejects phone with invalid characters", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      phone: "abc-not-a-phone",
      message: "I'm interested in classes.",
    });
    expect(result.success).toBe(false);
  });
});
