import { createMetadata } from "@/lib/metadata";
import { ScheduleGrid } from "@/components/schedule/schedule-grid";

export const metadata = createMetadata({
  title: "Schedule",
  description: "View our weekly class schedule and book your spot.",
});

export default function SchedulePage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <h1 className="font-heading text-4xl text-brand-black sm:text-5xl">
        Class Schedule
      </h1>
      <p className="mt-3 text-lg text-brand-black/60">
        View our weekly class times below
      </p>
      <div className="mt-10">
        <ScheduleGrid />
      </div>
    </div>
  );
}
