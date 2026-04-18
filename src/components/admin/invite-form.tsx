"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function InviteForm(): React.ReactElement {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();
    setState("submitting");
    setErrorMsg(null);

    const res = await fetch("/api/admin/invitations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim() }),
    });

    if (res.ok) {
      setState("success");
      setEmail("");
      router.refresh();
      return;
    }

    const body = (await res.json().catch(() => ({}))) as {
      error?: string;
      fieldErrors?: Record<string, string[] | undefined>;
    };
    const fieldMsg = body.fieldErrors?.email?.[0];
    setErrorMsg(fieldMsg ?? body.error ?? "Could not send invitation.");
    setState("error");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 sm:flex-row sm:items-end"
    >
      <div className="flex-1">
        <label
          htmlFor="invite-email"
          className="mb-1 block text-sm font-medium text-brand-black"
        >
          Email
        </label>
        <input
          id="invite-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="parent@example.com"
          className="w-full rounded-button border border-brand-taupe bg-white px-4 py-3 text-sm text-brand-black placeholder:text-brand-black/40 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
        />
      </div>
      <button
        type="submit"
        disabled={state === "submitting"}
        className="inline-flex items-center justify-center rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red/85 disabled:cursor-not-allowed disabled:bg-brand-red/50"
      >
        {state === "submitting" ? "Sending…" : "Send invitation"}
      </button>
      {state === "success" && (
        <p className="text-sm text-emerald-700 sm:basis-full">
          Invitation sent.
        </p>
      )}
      {state === "error" && errorMsg && (
        <p className="text-sm text-brand-red sm:basis-full">{errorMsg}</p>
      )}
    </form>
  );
}
