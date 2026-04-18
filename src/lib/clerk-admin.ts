import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function requireAdmin(): Promise<NextResponse | null> {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const role = (user.publicMetadata as { role?: string })?.role;
  if (role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return null;
}

export async function isAdminUser(): Promise<boolean> {
  return (await requireAdmin()) === null;
}

type ClerkAPIErrorLike = { code?: string; message?: string };
type ClerkAPIResponseErrorLike = {
  status?: number;
  errors?: ClerkAPIErrorLike[];
};

function isClerkAPIResponseErrorLike(
  err: unknown,
): err is ClerkAPIResponseErrorLike {
  return (
    typeof err === "object" &&
    err !== null &&
    ("status" in err || "errors" in err)
  );
}

export function clerkErrorToResponse(
  err: unknown,
  fallback: { status: number; message: string },
): NextResponse {
  if (!isClerkAPIResponseErrorLike(err)) {
    return NextResponse.json(
      { error: fallback.message },
      { status: fallback.status },
    );
  }

  const code = err.errors?.[0]?.code;
  const clerkStatus = err.status;

  if (clerkStatus === 404 || code === "resource_not_found") {
    return NextResponse.json(
      { error: "Invitation not found." },
      { status: 404 },
    );
  }

  if (
    clerkStatus === 422 ||
    code === "duplicate_record" ||
    code === "form_identifier_exists" ||
    code === "identification_exists"
  ) {
    return NextResponse.json(
      { error: "An invitation for that email already exists." },
      { status: 409 },
    );
  }

  return NextResponse.json(
    { error: fallback.message },
    { status: fallback.status },
  );
}
