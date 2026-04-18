import { NextResponse } from "next/server";
import { z } from "zod";
import { contactSchema, programOptions } from "@/schemas/contact";
import { sendEmail } from "@/lib/email";
import { escapeHtml, sanitize } from "@/lib/sanitize";
import { getServerEnv } from "@/lib/server-env";
import { checkRateLimit } from "@/lib/rate-limit";
import { getClientIp, validateOrigin } from "@/lib/api-security";
import { BUSINESS_PHONE_DISPLAY } from "@/lib/location";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 10;

const MAX_BODY_BYTES = 10_000;

function stripControl(input: string): string {
  return input.replace(/[\r\n\t\x00-\x1F\x7F]/g, " ");
}

export async function POST(request: Request): Promise<NextResponse> {
  const originError = await validateOrigin();
  if (originError) return originError;

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  const ip = await getClientIp();
  const { success: withinLimit } = await checkRateLimit(`contact:${ip}`);
  if (!withinLimit) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    const { fieldErrors } = z.flattenError(result.error);
    return NextResponse.json(
      { error: "Invalid form data", fieldErrors },
      { status: 400 },
    );
  }

  const { name, email, phone, programs, message } = result.data;
  const env = getServerEnv();

  const safeName = escapeHtml(stripControl(name));
  const safeEmail = escapeHtml(stripControl(email));
  const safePhone = phone ? escapeHtml(stripControl(phone)) : "";
  const safeMessage = escapeHtml(sanitize(message)).replace(/\n/g, "<br>");
  const programLabels = programs
    .map((value) => programOptions.find((opt) => opt.value === value)?.label)
    .filter((label) => Boolean(label))
    .map((label) => escapeHtml(label as string));

  try {
    await sendEmail({
      to: env.NOTIFY_EMAIL,
      replyTo: email,
      subject: `New contact form submission from ${stripControl(name).slice(0, 200)}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        ${safePhone ? `<p><strong>Phone:</strong> ${safePhone}</p>` : ""}
        ${programLabels.length > 0 ? `<p><strong>Programs of interest:</strong> ${programLabels.join(", ")}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Contact form error", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { error: `Unable to send message. Please try again or call ${BUSINESS_PHONE_DISPLAY}.` },
      { status: 500 },
    );
  }
}
