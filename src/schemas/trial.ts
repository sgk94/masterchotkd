import { z } from "zod";

export const trialSchema = z.object({
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
});

export type TrialFormData = z.infer<typeof trialSchema>;
