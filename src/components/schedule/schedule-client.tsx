"use client";

import { useState } from "react";
import { ScheduleGrid } from "@/components/schedule/schedule-grid";
import { BookingForm } from "@/components/forms/booking-form";
import type { ScheduleSlot } from "@/types";

export function ScheduleClient({
  slots,
}: {
  slots: ScheduleSlot[];
}): React.ReactElement {
  const [selectedSlot, setSelectedSlot] = useState<ScheduleSlot | null>(null);

  return (
    <>
      <ScheduleGrid slots={slots} onBook={setSelectedSlot} />
      {selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-card bg-white p-8">
            <BookingForm
              slot={selectedSlot}
              onClose={() => setSelectedSlot(null)}
            />
          </div>
        </div>
      )}
    </>
  );
}
