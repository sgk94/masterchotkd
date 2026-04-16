"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MEMBER_NAV } from "@/lib/nav";

export function MembersTabBar(): React.ReactElement {
  const pathname = usePathname();

  return (
    <nav className="mb-10 flex flex-wrap gap-2">
      {MEMBER_NAV.map((link) => {
        const isActive =
          link.href === "/members"
            ? pathname === "/members"
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
              isActive
                ? "bg-brand-red text-white shadow-[0_2px_8px_rgba(196,30,42,0.25)]"
                : "bg-brand-cream text-brand-black/50 hover:bg-brand-sand hover:text-brand-black"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
