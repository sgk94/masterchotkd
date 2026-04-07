import { headers } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Validate the request origin matches the site URL to prevent CSRF.
 * Returns a 403 response if validation fails, or null if the origin is valid.
 */
export async function validateOrigin(): Promise<NextResponse | null> {
  const headersList = await headers();
  const origin = headersList.get("origin");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const expectedOrigin = new URL(siteUrl).origin;

  if (!origin || origin !== expectedOrigin) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 },
    );
  }

  return null;
}

/**
 * Get the client IP from Vercel's trusted header (not spoofable by the client).
 * Falls back to x-forwarded-for rightmost entry, then "anonymous".
 */
export async function getClientIp(): Promise<string> {
  const headersList = await headers();

  // x-real-ip is set by Vercel and cannot be spoofed by the client
  const realIp = headersList.get("x-real-ip");
  if (realIp) return realIp;

  // Fallback: use rightmost x-forwarded-for (added by the edge proxy)
  const forwarded = headersList.get("x-forwarded-for");
  if (forwarded) {
    const ips = forwarded.split(",").map((ip) => ip.trim());
    return ips[ips.length - 1];
  }

  return "anonymous";
}
