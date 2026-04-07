import { z } from "zod";
import { nameField, emailField, phoneField } from "./fields";

export const contactSchema = z.object({
  name: nameField.pipe(z.string().min(2, "Name must be at least 2 characters")),
  email: emailField,
  phone: phoneField.optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000),
});

export type ContactFormData = z.infer<typeof contactSchema>;
