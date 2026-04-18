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
      className="text-xs font-medium text-brand-red transition-colors hover:text-brand-red/70 disabled:opacity-50"
    >
      {busy ? "Revoking…" : "Revoke"}
    </button>
  );
}
