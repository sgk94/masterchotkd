import { Resend } from "resend";
import { getServerEnv } from "@/lib/server-env";

type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

const RESEND_TIMEOUT_MS = 5_000;

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: SendEmailParams): Promise<void> {
  const env = getServerEnv();
  const resend = new Resend(env.RESEND_API_KEY);

  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Resend timeout")), RESEND_TIMEOUT_MS),
  );
  const send = resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to,
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  });

  const { error } = await Promise.race([send, timeout]);
  if (error) {
    throw new Error(`Resend error: ${error.name} - ${error.message}`);
  }
}
