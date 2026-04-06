import { db } from "@/lib/db";
import { createMetadata } from "@/lib/metadata";
import { ScheduleClient } from "@/components/schedule/schedule-client";
import type { ScheduleSlot } from "@/types";

export const metadata = createMetadata({
  title: "Schedule",
  description: "View our weekly class schedule and book your spot.",
});
export const revalidate = 60;

export default async function SchedulePage(): Promise<React.ReactElement> {
  const schedules = await db.classSchedule.findMany({
    include: {
      program: { select: { name: true } },
      _count: { select: { bookings: true } },
    },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });

  const slots: ScheduleSlot[] = schedules.map((s) => ({
    id: s.id,
    programId: s.programId,
    programName: s.program.name,
    dayOfWeek: s.dayOfWeek,
    startTime: s.startTime,
    endTime: s.endTime,
    instructor: s.instructor,
    capacity: s.capacity,
    currentBookings: s._count.bookings,
  }));

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <h1 className="font-heading text-4xl text-brand-black sm:text-5xl">
        Class Schedule
      </h1>
      <p className="mt-3 text-lg text-brand-black/60">
        Click any class to book your spot
      </p>
      <div className="mt-10">
        <ScheduleClient slots={slots} />
      </div>
    </div>
  );
}
