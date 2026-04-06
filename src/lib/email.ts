import { Resend } from "resend";
import { serverEnv } from "@/lib/server-env";

const resend = new Resend(serverEnv.RESEND_API_KEY);

type SendEmailParams = { to: string; subject: string; html: string };

export async function sendEmail({
  to,
  subject,
  html,
}: SendEmailParams): Promise<void> {
  await resend.emails.send({
    from: serverEnv.RESEND_FROM_EMAIL,
    to,
    subject,
    html,
  });
}
