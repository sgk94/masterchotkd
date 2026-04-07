"use client";

import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { useFormSubmit } from "@/hooks/use-form-submit";
import { contactSchema } from "@/schemas/contact";

export function ContactForm(): React.ReactElement {
  const { errors, submitting, success, handleSubmit } = useFormSubmit({
    schema: contactSchema,
    endpoint: "/api/contact",
    extractData: (fd) => ({
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
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
