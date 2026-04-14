import { Resend } from "resend";
import { getServerEnv } from "@/lib/server-env";

type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: SendEmailParams): Promise<void> {
  const env = getServerEnv();
  const resend = new Resend(env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to,
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  });
  if (error) {
    throw new Error(`Resend error: ${error.name} - ${error.message}`);
  }
}
