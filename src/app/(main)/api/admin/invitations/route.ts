import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { clerkErrorToResponse, requireAdmin } from "@/lib/clerk-admin";
import { validateOrigin } from "@/lib/api-security";
import { formatError } from "@/lib/errors";
import { MAX_BULK_INVITES } from "@/lib/invitations";
import { invitationCreateSchema } from "@/schemas/invitation";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 10;

const MAX_BODY_BYTES = 8_000;

type InviteResult =
  | {
      email: string;
      ok: true;
      invitation: {
        id: string;
        emailAddress: string;
        status: string;
      };
    }
  | {
      email: string;
      ok: false;
      error: string;
      status: number;
    };

function clerkErrorToInviteResult(email: string, err: unknown): InviteResult {
  const response = clerkErrorToResponse(err, {
    status: 502,
    message: "Could not send invitation. Try again.",
  });
  return {
    email,
    ok: false,
    error: response.status === 409
      ? "An invitation for that email already exists."
      : response.status === 404
        ? "Invitation not found."
        : "Could not send invitation. Try again.",
    status: response.status,
  };
}

export async function POST(request: Request): Promise<NextResponse> {
  const originError = await validateOrigin();
  if (originError) return originError;

  const adminError = await requireAdmin();
  if (adminError) return adminError;

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
    const redirectUrl = `${getSiteUrl()}/sign-up`;
    const results: InviteResult[] = [];

    // Send sequentially to avoid bursting Clerk's API from one bulk paste.
    for (const email of parsed.data.emails.slice(0, MAX_BULK_INVITES)) {
      try {
        const invitation = await client.invitations.createInvitation({
          emailAddress: email,
          redirectUrl,
        });
        results.push({
          email,
          ok: true,
          invitation: {
            id: invitation.id,
            emailAddress: invitation.emailAddress,
            status: String(invitation.status),
          },
        });
      } catch (err) {
        console.error("Clerk createInvitation failed", {
          email,
          ...formatError(err),
        });
        results.push(clerkErrorToInviteResult(email, err));
      }
    }

    const sent = results.filter((result) => result.ok);
    const failed = results.filter((result) => !result.ok);
    const status = failed.length === 0
      ? 201
      : sent.length > 0
        ? 207
        : failed.length === 1
          ? failed[0].status
          : 207;
    return NextResponse.json(
      {
        invitation: sent[0]?.invitation,
        results,
        summary: {
          requested: parsed.data.emails.length,
          sent: sent.length,
          failed: failed.length,
        },
      },
      { status },
    );
  } catch (err) {
    console.error("Clerk createInvitation failed", formatError(err));
    return clerkErrorToResponse(err, {
      status: 502,
      message: "Could not send invitation. Try again.",
    });
  }
}
