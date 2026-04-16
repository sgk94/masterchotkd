import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function validateOrigin(): Promise<NextResponse | null> {
  const headersList = await headers();
  const origin = headersList.get("origin");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const expectedOrigin = new URL(siteUrl).origin;

  if (!origin || origin !== expectedOrigin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return null;
}

export async function getClientIp(): Promise<string> {
  const headersList = await headers();
  const realIp =
    headersList.get("x-real-ip") ?? headersList.get("x-vercel-forwarded-for");
  if (realIp) return realIp.trim();
  return "anonymous";
}
