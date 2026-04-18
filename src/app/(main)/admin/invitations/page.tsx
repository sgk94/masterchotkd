import { clerkClient } from "@clerk/nextjs/server";
import { InviteForm } from "@/components/admin/invite-form";
import { RevokeButton } from "@/components/admin/revoke-button";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Admin · Invitations" });
export const dynamic = "force-dynamic";

function formatDate(ms: number): string {
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

type PendingInvitation = {
  id: string;
  emailAddress: string;
  createdAt: number;
};

type ListResult =
  | { ok: true; data: PendingInvitation[] }
  | { ok: false };

async function loadPendingInvitations(): Promise<ListResult> {
  try {
    const client = await clerkClient();
    const list = await client.invitations.getInvitationList({
      status: "pending",
      limit: 100,
    });
    return {
      ok: true,
      data: list.data.map((i) => ({
        id: i.id,
        emailAddress: i.emailAddress,
        createdAt: i.createdAt,
      })),
    };
  } catch (err) {
    console.error("Clerk getInvitationList failed", {
      name: err instanceof Error ? err.name : "Unknown",
      message: err instanceof Error ? err.message : String(err),
    });
    return { ok: false };
  }
}

export default async function AdminInvitationsPage(): Promise<React.ReactElement> {
  const result = await loadPendingInvitations();

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-heading text-3xl text-brand-black sm:text-4xl">
          Invitations
        </h1>
        <p className="mt-2 text-brand-black/60">
          Sign-up is restricted. Only invited email addresses can create
          accounts.
        </p>
      </header>

      <section className="rounded-card bg-brand-cream p-6 sm:p-8">
        <h2 className="font-heading text-xl text-brand-black">
          Send an invitation
        </h2>
        <p className="mt-1 text-sm text-brand-black/55">
          Clerk will email a one-time link. Only that email can complete
          sign-up.
        </p>
        <div className="mt-5">
          <InviteForm />
        </div>
      </section>

      <section>
        {result.ok ? (
          <>
            <h2 className="font-heading text-xl text-brand-black">
              Pending ({result.data.length})
            </h2>
            {result.data.length === 0 ? (
              <p className="mt-4 text-sm text-brand-black/55">
                No pending invitations.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-brand-taupe/30 rounded-card bg-white ring-1 ring-brand-taupe/15">
                {result.data.map((inv) => (
                  <li
                    key={inv.id}
                    className="flex items-center justify-between gap-4 px-5 py-4"
                  >
                    <div>
                      <p className="font-medium text-brand-black">
                        {inv.emailAddress}
                      </p>
                      <p className="text-xs text-brand-black/45">
                        Sent {formatDate(inv.createdAt)}
                      </p>
                    </div>
                    <RevokeButton id={inv.id} email={inv.emailAddress} />
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <>
            <h2 className="font-heading text-xl text-brand-black">Pending</h2>
            <p className="mt-4 rounded-card bg-white p-5 text-sm text-brand-red ring-1 ring-brand-red/30">
              Couldn&rsquo;t load pending invitations right now. Sending a new
              invitation still works — reload the page in a moment to see the
              list.
            </p>
          </>
        )}
      </section>
    </div>
  );
}
