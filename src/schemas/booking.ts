import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(254),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .max(20)
    .regex(/^[\d\s\-\+\(\)]+$/, "Invalid phone format"),
  scheduleId: z.string().uuid("Invalid class selection"),
  date: z.string().date("Invalid date"),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
