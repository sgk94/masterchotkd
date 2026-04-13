export function VideoPlaceholder({ title }: { title: string }): React.ReactElement {
  return (
    <div className="flex aspect-video items-center justify-center rounded-xl bg-brand-black/[0.03]">
      <div className="flex flex-col items-center gap-2 text-brand-black/25">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        <span className="text-xs">{title}</span>
      </div>
    </div>
  );
}

export function SectionHeader({ label, title, description }: { label: string; title: string; description?: string }): React.ReactElement {
  return (
    <div>
      <span className="inline-flex rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
        {label}
      </span>
      <h2 className="mt-4 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">{title}</h2>
      {description && <p className="mt-2 max-w-3xl text-sm leading-relaxed text-brand-black/55">{description}</p>}
    </div>
  );
}

export function SubSectionHeader({ title }: { title: string }): React.ReactElement {
  return (
    <div className="flex items-center gap-3">
      <h3 className="font-heading text-lg text-brand-black">{title}</h3>
      <div className="h-px flex-1 bg-brand-taupe/20" />
    </div>
  );
}

export function VideoCard({ eyebrow, title, subtitle, swatch }: { eyebrow: string; title: string; subtitle: string; swatch?: React.ReactNode }): React.ReactElement {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white ring-1 ring-brand-taupe/12 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-brand-taupe/10">
      <VideoPlaceholder title={title} />
      <div className="p-4">
        <div className="flex items-center gap-3">
          {swatch}
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-brand-black/35">{eyebrow}</p>
            <p className="mt-0.5 font-heading text-base text-brand-black">{title}</p>
            <p className="truncate text-xs text-brand-black/45">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
