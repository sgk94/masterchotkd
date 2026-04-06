import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(): Promise<NextResponse> {
  return NextResponse.json(
    { error: "API not configured. Database connection required." },
    { status: 503 }
  );
}
