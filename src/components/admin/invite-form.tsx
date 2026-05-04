"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MAX_BULK_INVITES } from "@/lib/invitations";

type FormState = "idle" | "submitting" | "success" | "error";
type InviteResult = {
  email: string;
  ok: boolean;
  error?: string;
};

function parseEmails(value: string): string[] {
  return [
    ...new Set(
      value
        .split(/[\s,;]+/)
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean),
    ),
  ];
}

export function InviteForm(): React.ReactElement {
  const router = useRouter();
  const [emailsText, setEmailsText] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [results, setResults] = useState<InviteResult[]>([]);

  async function onSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();
    setState("submitting");
    setErrorMsg(null);
    setResults([]);

    const emails = parseEmails(emailsText);
    if (emails.length === 0) {
      setErrorMsg("Enter at least one email address.");
      setState("error");
      return;
    }
    if (emails.length > MAX_BULK_INVITES) {
      setErrorMsg(`Send at most ${MAX_BULK_INVITES} invitations at a time.`);
      setState("error");
      return;
    }

    let res: Response;
    try {
      res = await fetch("/api/admin/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emails }),
      });
    } catch {
      setErrorMsg("Network error. Check your connection and try again.");
      setState("error");
      return;
    }

    const body = (await res.json().catch(() => ({}))) as {
      error?: string;
      fieldErrors?: Record<string, string[] | undefined>;
      results?: InviteResult[];
      summary?: { sent: number; failed: number };
    };
    if (Array.isArray(body.results)) {
      setResults(body.results);
    }

    if (res.ok) {
      const failed =
        body.summary?.failed ??
        body.results?.filter((result) => !result.ok).length ??
        0;
      setState(failed > 0 ? "error" : "success");
      if (failed === 0) setEmailsText("");
      router.refresh();
      return;
    }

    const fieldMsg = body.fieldErrors?.emails?.[0] ?? body.fieldErrors?.email?.[0];
    setErrorMsg(fieldMsg ?? body.error ?? "Could not send invitation.");
    setState("error");
  }

  const emailCount = parseEmails(emailsText).length;

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="flex flex-col gap-3">
        <div>
          <label
            htmlFor="invite-emails"
            className="mb-1 block text-sm font-medium text-brand-black"
          >
            Emails
          </label>
          <textarea
            id="invite-emails"
            required
            rows={5}
            value={emailsText}
            onChange={(e) => setEmailsText(e.target.value)}
            placeholder={"parent@example.com\nsecond-parent@example.com"}
            className="w-full rounded-button border border-brand-taupe bg-white px-4 py-3 text-sm text-brand-black placeholder:text-brand-black/40 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
          <p className="mt-2 text-xs text-brand-black/45">
            Paste up to {MAX_BULK_INVITES} emails. Separate with new lines,
            commas, spaces, or semicolons. Duplicates are ignored. Current
            count: {emailCount}
          </p>
        </div>
        <button
          type="submit"
          disabled={state === "submitting"}
          className="inline-flex items-center justify-center self-start rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red/85 disabled:cursor-not-allowed disabled:bg-brand-red/50"
        >
          {state === "submitting" ? "Sending…" : "Send invitations"}
        </button>
      </div>
      {state === "success" && (
        <p className="text-sm text-emerald-700">Invitation sent.</p>
      )}
      {state === "error" && errorMsg && (
        <p className="text-sm text-brand-red">{errorMsg}</p>
      )}
      {results.length > 0 && (
        <div className="rounded-card bg-white p-4 text-sm ring-1 ring-brand-taupe/20">
          <p className="font-medium text-brand-black">Results</p>
          <ul className="mt-3 space-y-2">
            {results.map((result) => (
              <li
                key={result.email}
                className={result.ok ? "text-emerald-700" : "text-brand-red"}
              >
                {result.ok ? "Sent" : "Failed"}: {result.email}
                {!result.ok && result.error ? ` - ${result.error}` : ""}
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}
