type SectionLink = {
  href: string;
  label: string;
};

type FloatingSectionNavProps = {
  ariaLabel: string;
  links: SectionLink[];
  topOffset?: number;
};

export function FloatingSectionNav({
  ariaLabel,
  links,
  topOffset = 176,
}: FloatingSectionNavProps): React.ReactElement {
  return (
    <div className="relative hidden h-full lg:block">
      <div className="sticky" style={{ top: topOffset }}>
        <div className="rounded-[1.5rem] bg-brand-sand/35 p-1.5 ring-1 ring-brand-taupe/15">
          <div className="rounded-[calc(1.5rem-6px)] bg-white p-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-black/35">
              On This Page
            </p>
            <nav aria-label={ariaLabel} className="mt-4 flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-brand-taupe/20 bg-brand-cream/45 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-brand-black/60 transition-colors hover:border-brand-taupe/35 hover:bg-brand-cream hover:text-brand-black"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
