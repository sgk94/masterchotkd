import { z } from "zod";
import { MAX_BULK_INVITES } from "@/lib/invitations";
import { emailField } from "@/schemas/fields";

const singleInvitationSchema = z.object({
  email: emailField,
});

const bulkInvitationSchema = z.object({
  emails: z
    .array(emailField)
    .min(1, "Enter at least one email address")
    .max(MAX_BULK_INVITES, `Send at most ${MAX_BULK_INVITES} invitations at a time`),
});

export const invitationCreateSchema = z
  .union([singleInvitationSchema, bulkInvitationSchema])
  .transform((data) => {
    const emails = "emails" in data ? data.emails : [data.email];
    return { emails: [...new Set(emails)] };
  });

export type InvitationCreateInput = z.infer<typeof invitationCreateSchema>;
