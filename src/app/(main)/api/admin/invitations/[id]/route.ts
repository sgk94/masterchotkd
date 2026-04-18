import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/clerk-admin";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 10;

const ID_REGEX = /^[A-Za-z0-9_]{1,64}$/;

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const adminError = await requireAdmin();
  if (adminError) return adminError;

  const { id } = await context.params;
  if (!id || !ID_REGEX.test(id)) {
    return NextResponse.json(
      { error: "Invalid invitation id" },
      { status: 400 },
    );
  }

  try {
    const client = await clerkClient();
    await client.invitations.revokeInvitation(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Clerk revokeInvitation failed", {
      name: err instanceof Error ? err.name : "Unknown",
      message: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      { error: "Could not revoke invitation." },
      { status: 502 },
    );
  }
}
