import { z } from "zod";
import { nameField, emailField, phoneField } from "./fields";

export const bookingSchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField.min(1, "Phone number is required"),
  scheduleId: z.string().uuid("Invalid class selection"),
  date: z.string().date("Invalid date"),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
