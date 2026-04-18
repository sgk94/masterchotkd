import { redirect } from "next/navigation";
import { isAdminUser } from "@/lib/clerk-admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.ReactElement> {
  const ok = await isAdminUser();
  if (!ok) redirect("/");
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:py-16">{children}</div>
  );
}
