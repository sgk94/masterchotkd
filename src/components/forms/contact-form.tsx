"use client";

import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { useFormSubmit } from "@/hooks/use-form-submit";
import { contactSchema, programOptions } from "@/schemas/contact";

export function ContactForm(): React.ReactElement {
  const { errors, submitting, success, handleSubmit } = useFormSubmit({
    schema: contactSchema,
    endpoint: "/api/contact",
    extractData: (fd) => ({
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      programs: fd.getAll("programs") as string[],
      message: fd.get("message") as string,
    }),
  });

  if (success)
    return (
      <div className="rounded-card bg-brand-cream p-8 text-center">
        <h3 className="font-heading text-2xl text-brand-black">
          Message Sent!
        </h3>
        <p className="mt-2 text-brand-black/60">
          We&apos;ll get back to you shortly.
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
        error={errors.phone}
        placeholder="425-555-1234 (optional)"
      />
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-1 text-sm font-medium text-brand-black">
          Programs you&apos;re interested in{" "}
          <span className="text-[11px] font-normal uppercase tracking-[0.14em] text-brand-black/35">Optional</span>
        </legend>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {programOptions.map((p) => (
            <label
              key={p.value}
              className="group relative flex cursor-pointer items-center gap-3 rounded-full border border-brand-taupe/60 bg-white/70 px-4 py-3 text-sm text-brand-black/75 transition-all duration-300 hover:border-brand-taupe hover:bg-white has-[:checked]:border-brand-gold/70 has-[:checked]:bg-white has-[:checked]:text-brand-black has-[:checked]:shadow-[0_4px_16px_-8px_rgba(196,164,74,0.45)]"
              style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
            >
              <input
                type="checkbox"
                name="programs"
                value={p.value}
                className="peer sr-only"
              />
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-taupe/70 bg-white transition-all duration-300 group-has-[:checked]:border-brand-gold group-has-[:checked]:bg-brand-gold peer-focus-visible:ring-2 peer-focus-visible:ring-brand-gold/40 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-brand-cream"
                style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
                aria-hidden="true"
              >
                <svg
                  className="h-3 w-3 text-white opacity-0 transition-opacity duration-300 group-has-[:checked]:opacity-100"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8l3.2 3.2L13 4.4" />
                </svg>
              </span>
              <span className="flex items-baseline gap-2 leading-tight">
                {p.label}
                {"age" in p && p.age && (
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-black/65">
                    {p.age}
                  </span>
                )}
              </span>
            </label>
          ))}
        </div>
        {errors.programs && <p className="mt-1 text-xs text-brand-red">{errors.programs}</p>}
      </fieldset>
      <FormField
        label="Message"
        name="message"
        as="textarea"
        required
        error={errors.message}
        placeholder="How can we help you?"
      />
      {errors.form && <p className="text-sm text-brand-red">{errors.form}</p>}
      <Button type="submit" disabled={submitting}>
        {submitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
