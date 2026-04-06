"use client";

import { useState } from "react";
import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { bookingSchema } from "@/schemas/booking";
import type { ScheduleSlot } from "@/types";

type BookingFormProps = { slot: ScheduleSlot; onClose: () => void };

export function BookingForm({
  slot,
  onClose,
}: BookingFormProps): React.ReactElement {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      date: formData.get("date") as string,
      scheduleId: slot.id,
    };
    const result = bookingSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      setSubmitting(false);
      return;
    }
    const response = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.data),
    });
    if (response.ok) {
      setSuccess(true);
    } else {
      const body = (await response.json()) as { error?: string };
      setErrors({ form: body.error ?? "Something went wrong." });
    }
    setSubmitting(false);
  }

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
