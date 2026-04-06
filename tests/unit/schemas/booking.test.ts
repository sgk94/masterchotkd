import { describe, it, expect } from "vitest";
import { bookingSchema } from "@/schemas/booking";

describe("bookingSchema", () => {
  it("validates a complete valid booking", () => {
    const result = bookingSchema.safeParse({
      name: "Parent Name",
      email: "parent@example.com",
      phone: "425-555-9999",
      scheduleId: "550e8400-e29b-41d4-a716-446655440000",
      date: "2026-04-10",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = bookingSchema.safeParse({
      name: "",
      email: "parent@example.com",
      phone: "425-555-9999",
      scheduleId: "550e8400-e29b-41d4-a716-446655440000",
      date: "2026-04-10",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid scheduleId", () => {
    const result = bookingSchema.safeParse({
      name: "Parent Name",
      email: "parent@example.com",
      phone: "425-555-9999",
      scheduleId: "",
      date: "2026-04-10",
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing email", () => {
    const result = bookingSchema.safeParse({
      name: "Parent Name",
      phone: "425-555-9999",
      scheduleId: "550e8400-e29b-41d4-a716-446655440000",
      date: "2026-04-10",
    });
    expect(result.success).toBe(false);
  });

  it("rejects name exceeding max length", () => {
    const result = bookingSchema.safeParse({
      name: "A".repeat(101),
      email: "parent@example.com",
      phone: "425-555-9999",
      scheduleId: "550e8400-e29b-41d4-a716-446655440000",
      date: "2026-04-10",
    });
    expect(result.success).toBe(false);
  });

  it("rejects phone with invalid characters", () => {
    const result = bookingSchema.safeParse({
      name: "Parent Name",
      email: "parent@example.com",
      phone: "abc-not-a-phone",
      scheduleId: "550e8400-e29b-41d4-a716-446655440000",
      date: "2026-04-10",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid date format", () => {
    const result = bookingSchema.safeParse({
      name: "Parent Name",
      email: "parent@example.com",
      phone: "425-555-9999",
      scheduleId: "550e8400-e29b-41d4-a716-446655440000",
      date: "not-a-date",
    });
    expect(result.success).toBe(false);
  });
});
