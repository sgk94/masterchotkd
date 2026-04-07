import { z } from "zod";

export const nameField = z.string().trim().min(1, "Name is required").max(100);
export const emailField = z.string().trim().email("Please enter a valid email address").max(254);
export const phoneField = z.string().trim().max(20).regex(/^[\d\s\-\+\(\)]+$/, "Invalid phone format");
