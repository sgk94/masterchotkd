"use client";

import { useState } from "react";
import type { ZodSchema } from "zod";

type UseFormSubmitOptions<T> = {
  schema: ZodSchema<T>;
  endpoint: string;
  extractData: (formData: FormData) => Record<string, unknown>;
};

type UseFormSubmitReturn = {
  errors: Record<string, string>;
  submitting: boolean;
  success: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export function useFormSubmit<T>({
  schema,
  endpoint,
  extractData,
}: UseFormSubmitOptions<T>): UseFormSubmitReturn {
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
    const data = extractData(formData);

    const result = schema.safeParse(data);
    if (!result.success) {
      const fe: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fe[err.path[0] as string] = err.message;
      });
      setErrors(fe);
      setSubmitting(false);
      return;
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.data),
    });

    if (response.ok) {
      setSuccess(true);
    } else {
      const body = (await response.json().catch(() => ({}))) as {
        error?: string;
      };
      setErrors({ form: body.error ?? "Something went wrong." });
    }
    setSubmitting(false);
  }

  return { errors, submitting, success, handleSubmit };
}
