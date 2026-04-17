type SectionLink = { href: string; label: string };
type SectionChipsProps = {
  links: readonly SectionLink[];
  className?: string;
};

export function SectionChips({
  links,
  className,
}: SectionChipsProps): React.ReactElement {
  return (
    <div
      className={`flex gap-2 overflow-x-auto pb-1 lg:hidden ${className ?? ""}`}
    >
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="inline-flex shrink-0 items-center rounded-full bg-brand-cream px-4 py-2 text-xs font-medium text-brand-black/50 transition-colors hover:bg-brand-sand hover:text-brand-black"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
