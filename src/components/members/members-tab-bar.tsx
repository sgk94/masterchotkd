"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MEMBER_NAV } from "@/lib/nav";

const ease = "cubic-bezier(0.32, 0.72, 0, 1)";

export function MembersTabBar(): React.ReactElement {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Members navigation"
      className="mb-10 -mx-6 overflow-x-auto border-b border-brand-taupe/40 px-6"
    >
      <div className="flex min-w-max gap-1">
        {MEMBER_NAV.map((link) => {
          const isActive =
            link.href === "/members"
              ? pathname === "/members"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`group relative -mb-px whitespace-nowrap px-4 py-3 text-base transition-colors duration-300 ${
                isActive
                  ? "font-semibold text-brand-black"
                  : "font-medium text-brand-black/45 hover:text-brand-black"
              }`}
              style={{ transitionTimingFunction: ease }}
            >
              {link.label}
              <span
                className={`pointer-events-none absolute inset-x-3 bottom-0 h-[2px] origin-center bg-brand-red transition-transform duration-500 ${
                  isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-40"
                }`}
                style={{ transitionTimingFunction: ease }}
                aria-hidden="true"
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
