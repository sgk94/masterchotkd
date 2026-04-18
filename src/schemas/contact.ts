import { z } from "zod";
import { nameField, emailField, phoneField } from "./fields";

export const programOptions = [
  { value: "tiny-tigers", label: "Tiny Tigers", age: "Ages 4-6" },
  { value: "black-belt-club", label: "Black Belt Club", age: "Ages 7+" },
  { value: "teen-adults", label: "Teens and Adults" },
] as const;

const programValues = programOptions.map((p) => p.value) as [
  (typeof programOptions)[number]["value"],
  ...(typeof programOptions)[number]["value"][],
];

export const contactSchema = z.object({
  name: nameField.pipe(z.string().min(2, "Name must be at least 2 characters")),
  email: emailField,
  phone: phoneField.optional().or(z.literal("")),
  programs: z.array(z.enum(programValues)).optional().default([]),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000),
});

export type ContactFormData = z.infer<typeof contactSchema>;
