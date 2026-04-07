import { z } from "zod";
import { nameField, emailField, phoneField } from "./fields";

export const trialSchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField.min(1, "Phone number is required"),
});

export type TrialFormData = z.infer<typeof trialSchema>;
