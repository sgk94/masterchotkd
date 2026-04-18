"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function RevokeButton({
  id,
  email,
}: {
  id: string;
  email: string;
}): React.ReactElement {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick(): Promise<void> {
    if (!confirm(`Revoke invitation for ${email}?`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/invitations/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Could not revoke. Try again.");
      }
    } catch {
      alert("Network error. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      aria-label={`Revoke invitation for ${email}`}
      className="group relative inline-flex shrink-0 items-center gap-2 rounded-full border border-brand-red/70 bg-transparent px-5 py-2 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-brand-red transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-[1px] hover:border-brand-red hover:bg-brand-red hover:text-white hover:shadow-[0_6px_16px_-6px_rgba(196,30,42,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold active:translate-y-0 active:shadow-none disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:bg-transparent disabled:hover:text-brand-red disabled:hover:shadow-none"
    >
      <span
        aria-hidden="true"
        className="text-sm leading-none transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:rotate-90"
      >
        ×
      </span>
      <span>{busy ? "Revoking…" : "Revoke"}</span>
    </button>
  );
}
