import Link from "next/link";

const studentNavLinks = [
  { label: "Overview", href: "/students" },
  { label: "Curriculum", href: "/students/curriculum" },
  { label: "Forms", href: "/students/forms" },
  { label: "Resources", href: "/students/resources" },
];

export default function StudentsLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <div className="mb-8 flex flex-wrap gap-4 border-b border-brand-taupe pb-4">
        {studentNavLinks.map((link) => (
          <Link key={link.href} href={link.href} className="text-sm font-medium text-brand-black/60 transition-colors hover:text-brand-red">{link.label}</Link>
        ))}
      </div>
      {children}
    </div>
  );
}
