import Image from "next/image";

type ResourceCardProps = {
  title: string;
  description?: string;
  href: string;
  eyebrow?: string;
  tone?: "light" | "dark";
  previewImageSrc?: string;
};

function DocIcon({ size = 20 }: { size?: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 2v5h5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 13h6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 17h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DownloadArrow(): React.ReactElement {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 4v11" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m7 11 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ResourceCard({
  title,
  description,
  href,
  eyebrow = "PDF Download",
  tone = "dark",
  previewImageSrc,
}: ResourceCardProps): React.ReactElement {
  const isDark = tone === "dark";

  if (!isDark) {
    return (
      <div className="group flex h-full flex-col rounded-2xl bg-brand-cream p-7 ring-1 ring-brand-taupe/10 sm:p-8">
        {previewImageSrc ? (
          <div className="relative mb-5 overflow-hidden rounded-xl bg-white shadow-inner">
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-brand-navy/30 via-transparent to-white/5" />
            <Image
              src={previewImageSrc}
              alt={`${title} preview`}
              width={700}
              height={900}
              className="h-48 w-full object-cover object-top"
            />
          </div>
        ) : null}

        {/* Icon + text row — eyebrow top and title bottom align with icon edges */}
        <div className="flex items-stretch gap-[18px]">
          <div className="flex shrink-0 items-center text-brand-red">
            <DocIcon size={44} />
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-black/40">
              {eyebrow}
            </p>
            <h3 className="font-heading text-xl text-brand-black">
              {title}
            </h3>
          </div>
        </div>

        {/* Download PDF CTA — only this button triggers the download */}
        <a
          href={href}
          className="mt-8 inline-flex items-center gap-2 self-start rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-red shadow-sm ring-1 ring-brand-taupe/15 transition-all duration-300 hover:bg-brand-red hover:text-white hover:shadow-md hover:shadow-brand-red/20 hover:ring-brand-red"
        >
          Download PDF
          <DownloadArrow />
        </a>
      </div>
    );
  }

  return (
    <div className="group flex h-full flex-col rounded-xl bg-white/[0.06] p-5 ring-1 ring-white/[0.08]">
      {previewImageSrc ? (
        <div className="relative mb-5 overflow-hidden rounded-lg bg-white shadow-inner">
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-brand-navy/30 via-transparent to-white/5" />
          <Image
            src={previewImageSrc}
            alt={`${title} preview`}
            width={700}
            height={900}
            className="h-28 w-full object-cover object-top"
          />
        </div>
      ) : null}

      {/* Icon + text row — eyebrow top and title bottom align with icon edges */}
      <div className="flex items-stretch gap-[18px]">
        <div className="flex shrink-0 items-center text-brand-gold">
          <DocIcon size={40} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-gold">
            {eyebrow}
          </p>
          <h3 className="font-heading text-lg text-white">{title}</h3>
        </div>
      </div>

      {/* Download PDF CTA — only the button is clickable */}
      <a
        href={href}
        className="mt-7 inline-flex items-center gap-2 self-start rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-red shadow-sm transition-all duration-300 hover:bg-brand-red hover:text-white hover:shadow-md hover:shadow-brand-red/30"
      >
        Download PDF
        <DownloadArrow />
      </a>
    </div>
  );
}
