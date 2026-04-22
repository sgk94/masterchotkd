import { createMetadata } from "@/lib/metadata";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { ScheduleGrid } from "@/components/schedule/schedule-grid";

export const metadata = createMetadata({
  title: "Schedule",
  description: "Weekly taekwondo class schedule at Master Cho's in Lynnwood, WA. Classes Monday\u2013Saturday for all belt levels.",
  path: "/schedule",
});

export default function SchedulePage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
      <div className="max-w-xl">
        <EyebrowBadge variant="pill">Weekly Classes</EyebrowBadge>
        <h1 className="mt-5 font-heading text-3xl tracking-tight text-brand-black sm:text-4xl lg:text-5xl">
          Class Schedule
        </h1>
        <p className="mt-3 leading-relaxed text-brand-black/50">
          View our weekly class times — find the right program and time for you
        </p>
      </div>
      <div className="mt-12">
        <ScheduleGrid />
      </div>
    </div>
  );
}
