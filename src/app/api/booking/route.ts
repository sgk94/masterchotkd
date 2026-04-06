import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { bookingSchema } from "@/schemas/booking";
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
  const { success } = await checkRateLimit(`booking:${ip}`);
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

  const result = bookingSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid form data", details: result.error.flatten() },
      { status: 400 },
    );
  }

  const { name, email, phone, scheduleId, date } = result.data;
  const bookingDate = new Date(date);

  try {
    const schedule = await db.$transaction(async (tx) => {
      const sched = await tx.classSchedule.findUnique({
        where: { id: scheduleId },
        include: { program: true },
      });
      if (!sched) throw new Error("NOT_FOUND");

      const bookingCount = await tx.classBooking.count({
        where: { scheduleId, date: bookingDate },
      });
      if (bookingCount >= sched.capacity) throw new Error("FULL");

      await tx.classBooking.create({
        data: { scheduleId, name, email, phone, date: bookingDate },
      });

      return sched;
    });

    try {
      await sendEmail({
        to: email,
        subject: `Booking Confirmed — ${schedule.program.name}`,
        html: `<h2>Booking Confirmed!</h2><p>Hi ${sanitize(name)},</p><p>You're booked for <strong>${sanitize(schedule.program.name)}</strong>.</p><p><strong>Time:</strong> ${schedule.startTime} – ${schedule.endTime}</p><p><strong>Instructor:</strong> ${sanitize(schedule.instructor)}</p><p>See you at Master Cho's Taekwondo!</p>`,
      });
    } catch {
      /* Don't fail booking if email fails */
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "NOT_FOUND")
        return NextResponse.json({ error: "Class not found" }, { status: 404 });
      if (error.message === "FULL")
        return NextResponse.json(
          { error: "This class is full" },
          { status: 409 },
        );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
