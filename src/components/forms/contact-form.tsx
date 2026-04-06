"use client";

import { useState } from "react";
import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { contactSchema } from "@/schemas/contact";

export function ContactForm(): React.ReactElement {
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
      name: (formData.get("name") as string) ?? "",
      email: (formData.get("email") as string) ?? "",
      phone: (formData.get("phone") as string) ?? "",
      message: (formData.get("message") as string) ?? "",
    };
    const result = contactSchema.safeParse(data);
    if (!result.success) {
      const fe: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fe[err.path[0] as string] = err.message;
      });
      setErrors(fe);
      setSubmitting(false);
      return;
    }
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.data),
    });
    if (response.ok) {
      setSuccess(true);
    } else {
      setErrors({ form: "Something went wrong." });
    }
    setSubmitting(false);
  }

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
