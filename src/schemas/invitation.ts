import { z } from "zod";
import { emailField } from "@/schemas/fields";

export const invitationCreateSchema = z.object({
  email: emailField,
});

export type InvitationCreateInput = z.infer<typeof invitationCreateSchema>;
