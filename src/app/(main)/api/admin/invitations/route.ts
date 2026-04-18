import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { clerkErrorToResponse, requireAdmin } from "@/lib/clerk-admin";
import { getClientIp, validateOrigin } from "@/lib/api-security";
import { checkRateLimit } from "@/lib/rate-limit";
import { invitationCreateSchema } from "@/schemas/invitation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 10;

const MAX_BODY_BYTES = 2_000;

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export async function POST(request: Request): Promise<NextResponse> {
  const originError = await validateOrigin();
  if (originError) return originError;

  const adminError = await requireAdmin();
  if (adminError) return adminError;

  const { userId } = await auth();
  const ip = await getClientIp();
  const { success: ok } = await checkRateLimit(
    `invite:${userId ?? "unknown"}:${ip}`,
  );
  if (!ok) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      { status: 429 },
    );
  }

  const raw = await request.text();
  if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const parsed = invitationCreateSchema.safeParse(body);
  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    return NextResponse.json(
      { error: "Invalid input", fieldErrors },
      { status: 400 },
    );
  }

  try {
    const client = await clerkClient();
    const invitation = await client.invitations.createInvitation({
      emailAddress: parsed.data.email,
      redirectUrl: `${siteUrl()}/sign-up`,
    });
    return NextResponse.json(
      {
        invitation: {
          id: invitation.id,
          emailAddress: invitation.emailAddress,
          status: invitation.status,
        },
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("Clerk createInvitation failed", {
      name: err instanceof Error ? err.name : "Unknown",
      message: err instanceof Error ? err.message : String(err),
    });
    return clerkErrorToResponse(err, {
      status: 502,
      message: "Could not send invitation. Try again.",
    });
  }
}
