import { YouTubeFacade } from "./youtube-facade";

export function VideoPlaceholder({ title }: { title: string }): React.ReactElement {
  return (
    <div className="flex aspect-video items-center justify-center rounded-[1.25rem] bg-brand-black/[0.03]">
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

export function VideoCard({ eyebrow, title, subtitle, swatch, videoId }: { eyebrow: string; title: string; subtitle: string; swatch?: React.ReactNode; videoId?: string }): React.ReactElement {
  return (
    <div className="group overflow-hidden rounded-[1.5rem] bg-white p-1.5 shadow-[0_10px_30px_-12px_rgba(26,26,46,0.12)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-[0_22px_44px_-14px_rgba(26,26,46,0.22)]">
      {videoId ? (
        <YouTubeFacade videoId={videoId} title={title} />
      ) : (
        <VideoPlaceholder title={title} />
      )}
      <div className="flex items-center gap-4 px-4 pb-4 pt-5">
        {swatch}
        <div className="min-w-0 flex-1">
          <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-red/80">{eyebrow}</p>
          <p className="mt-1.5 font-heading text-lg tracking-tight text-brand-black">{title}</p>
          <p className="mt-0.5 truncate text-xs text-brand-black/50">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
