"use client";

import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { useFormSubmit } from "@/hooks/use-form-submit";
import { trialSchema } from "@/schemas/trial";

export function TrialForm(): React.ReactElement {
  const { errors, submitting, success, handleSubmit } = useFormSubmit({
    schema: trialSchema,
    endpoint: "/api/trial",
    extractData: (fd) => ({
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
    }),
  });

  if (success)
    return (
      <div className="rounded-card bg-brand-cream p-8 text-center">
        <h3 className="font-heading text-2xl text-brand-black">
          Request Received!
        </h3>
        <p className="mt-2 text-brand-black/60">
          We&apos;ll contact you shortly to set up your trial classes.
        </p>
      </div>
    );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
      {errors.form && <p className="text-sm text-brand-red">{errors.form}</p>}
      <Button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Request Trial"}
      </Button>
    </form>
  );
}
