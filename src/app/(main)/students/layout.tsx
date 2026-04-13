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
      <div className="mb-8 flex flex-wrap gap-6 border-b border-brand-taupe">
        {studentNavLinks.map((link) => {
          const isActive =
            link.href === "/members"
              ? pathname === "/members"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative pb-4 text-sm font-medium transition-colors duration-300 ${
                isActive
                  ? "text-brand-red"
                  : "text-brand-black/50 hover:text-brand-black"
              }`}
            >
              {link.label}
              {isActive && (
                <span className="absolute inset-x-0 bottom-[-1px] h-[2px] bg-brand-red" />
              )}
            </Link>
          );
        })}
      </div>
      {children}
    </div>
  );
}
