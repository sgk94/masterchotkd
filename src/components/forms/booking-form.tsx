"use client";

import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { useFormSubmit } from "@/hooks/use-form-submit";
import { bookingSchema } from "@/schemas/booking";
import type { ScheduleSlot } from "@/types";

type BookingFormProps = { slot: ScheduleSlot; onClose: () => void };

export function BookingForm({
  slot,
  onClose,
}: BookingFormProps): React.ReactElement {
  const { errors, submitting, success, handleSubmit } = useFormSubmit({
    schema: bookingSchema,
    endpoint: "/api/booking",
    extractData: (fd) => ({
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      date: fd.get("date") as string,
      scheduleId: slot.id,
    }),
  });

  if (success) {
    return (
      <div className="text-center">
        <h3 className="font-heading text-2xl text-brand-black">
          Booking Confirmed!
        </h3>
        <p className="mt-2 text-brand-black/60">
          You&apos;re booked for {slot.programName}. Check your email for
          confirmation.
        </p>
        <div className="mt-6">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="font-heading text-xl text-brand-black">
        Book: {slot.programName}
      </h3>
      <p className="text-sm text-brand-black/60">
        {slot.startTime} – {slot.endTime} · {slot.instructor}
      </p>
      <FormField
        label="Name"
        name="name"
        required
        error={errors.name}
        placeholder="Your name"
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        required
        error={errors.email}
        placeholder="your@email.com"
      />
      <FormField
        label="Phone"
        name="phone"
        type="tel"
        required
        error={errors.phone}
        placeholder="425-555-1234"
      />
      <FormField
        label="Date"
        name="date"
        type="date"
        required
        error={errors.date}
        placeholder="Select a date"
      />
      {errors.form && <p className="text-sm text-brand-red">{errors.form}</p>}
      <div className="mt-2 flex gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Booking..." : "Book Class"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="border-brand-black text-brand-black hover:bg-brand-black/5"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
