import { z } from "zod";

export const nameField = z.string().trim().min(1, "Name is required").max(100);

export const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .max(254)
  .regex(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Please enter a valid email address",
  );

export const phoneField = z
  .string()
  .trim()
  .min(7, "Phone number is too short")
  .max(20)
  .regex(/^\+?\d[\d\s\-()]{5,18}\d$/, "Invalid phone format");
