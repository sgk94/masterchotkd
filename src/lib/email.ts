import { Resend } from "resend";
import { getServerEnv } from "@/lib/server-env";

type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

const RESEND_TIMEOUT_MS = 5_000;

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(getServerEnv().RESEND_API_KEY);
  }
  return _resend;
}

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: SendEmailParams): Promise<void> {
  const env = getServerEnv();
  const resend = getResend();

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
