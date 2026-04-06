import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { trialSchema } from "@/schemas/trial";
import { sendEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import { sanitize } from "@/lib/sanitize";

export async function POST(request: Request): Promise<NextResponse> {
  // Origin check
  const headersList = await headers();
  const origin = headersList.get("origin");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  if (origin && !siteUrl.startsWith(origin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Rate limit by IP
  const ip = headersList.get("x-forwarded-for") ?? "anonymous";
  const { success } = await checkRateLimit(`trial:${ip}`);
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const result = trialSchema.safeParse(body);
  if (!result.success)
    return NextResponse.json(
      { error: "Invalid form data", details: result.error.flatten() },
      { status: 400 },
    );

  try {
    await db.trialRequest.create({ data: result.data });
    try {
      await sendEmail({
        to: result.data.email,
        subject: "Your Introductory Trial — Master Cho's Taekwondo",
        html: `<h2>Welcome to Master Cho's!</h2><p>Hi ${sanitize(result.data.name)},</p><p>Thank you for your interest in our introductory trial — 2 weeks of classes for just $50!</p><p>We'll be in touch shortly.</p>`,
      });
    } catch {
      /* ok */
    }
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
