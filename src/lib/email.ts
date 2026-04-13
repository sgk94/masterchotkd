import { Resend } from "resend";
import { getServerEnv } from "@/lib/server-env";

type SendEmailParams = { to: string; subject: string; html: string };

export async function sendEmail({
  to,
  subject,
  html,
}: SendEmailParams): Promise<void> {
  const env = getServerEnv();
  const resend = new Resend(env.RESEND_API_KEY);
  await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to,
    subject,
    html,
  });
}
