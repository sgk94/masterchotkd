"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const studentNavLinks = [
  { label: "Announcements", href: "/members" },
  { label: "Current Cycle", href: "/members/current-cycle" },
  { label: "Tiny Tigers", href: "/members/curriculum/tiny-tigers" },
  { label: "Color Belt", href: "/members/curriculum/color-belt" },
  { label: "Resources", href: "/members/resources" },
];

export default function StudentsLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <nav className="mb-10 flex flex-wrap gap-2">
        {studentNavLinks.map((link) => {
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
      {children}
    </div>
  );
}
