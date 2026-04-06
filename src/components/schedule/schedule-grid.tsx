import type { ScheduleSlot } from "@/types";
import { DAYS_OF_WEEK } from "@/types";

type ScheduleGridProps = {
  slots: ScheduleSlot[];
  onBook: (slot: ScheduleSlot) => void;
};

export function ScheduleGrid({
  slots,
  onBook,
}: ScheduleGridProps): React.ReactElement {
  const days = [1, 2, 3, 4, 5, 6, 0];
  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[700px] grid-cols-7 gap-2">
        {days.map((day) => (
          <div
            key={day}
            className="p-3 text-center text-sm font-semibold text-brand-black"
          >
            {DAYS_OF_WEEK[day]}
          </div>
        ))}
        {days.map((day) => {
          const daySlots = slots.filter((s) => s.dayOfWeek === day);
          return (
            <div key={day} className="flex flex-col gap-2">
              {daySlots.length === 0 ? (
                <div className="rounded-xl bg-brand-cream/50 p-3 text-center text-xs text-brand-black/30">
                  —
                </div>
              ) : (
                daySlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => onBook(slot)}
                    className="rounded-xl bg-brand-cream p-3 text-left transition-colors hover:bg-brand-sand"
                  >
                    <p className="text-xs font-semibold text-brand-blue">
                      {slot.programName}
                    </p>
                    <p className="mt-1 text-xs text-brand-black/60">
                      {slot.startTime} – {slot.endTime}
                    </p>
                    <p className="mt-1 text-xs text-brand-gold">
                      {slot.instructor}
                    </p>
                    <p className="mt-1 text-xs text-brand-black/40">
                      {slot.currentBookings}/{slot.capacity} spots
                    </p>
                  </button>
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
