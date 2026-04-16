import Image from "next/image";

type ResourceCardProps = {
  title: string;
  description?: string;
  href: string;
  eyebrow?: string;
  tone?: "light" | "dark";
  previewImageSrc?: string;
};

function DocIcon(): React.ReactElement {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
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

  return (
    <a
      href={href}
      className={
        isDark
          ? "group flex h-full flex-col rounded-xl bg-white/[0.06] p-4 ring-1 ring-white/[0.08] transition-all duration-300 hover:bg-white/[0.10] hover:-translate-y-0.5"
          : "group flex h-full flex-col rounded-2xl bg-brand-cream p-6 ring-1 ring-brand-taupe/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-sand/70 hover:shadow-md hover:shadow-brand-taupe/10"
      }
    >
      {previewImageSrc ? (
        <div
          className={
            isDark
              ? "relative mb-4 overflow-hidden rounded-lg bg-white shadow-inner"
              : "relative mb-5 overflow-hidden rounded-xl bg-white shadow-inner"
          }
        >
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-brand-navy/30 via-transparent to-white/5" />
          <Image
            src={previewImageSrc}
            alt={`${title} preview`}
            width={700}
            height={900}
            className={isDark ? "h-28 w-full object-cover object-top" : "h-48 w-full object-cover object-top"}
          />
        </div>
      ) : null}

      <div
        className={
          isDark
            ? "flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold"
            : "flex h-11 w-11 items-center justify-center rounded-xl bg-white/80 text-brand-red shadow-sm"
        }
      >
        <DocIcon />
      </div>

      <p
        className={
          isDark
            ? "mt-4 text-[10px] font-medium uppercase tracking-[0.18em] text-brand-gold"
            : "mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-black/40"
        }
      >
        {eyebrow}
      </p>
      <h3 className={isDark ? "mt-2 font-heading text-lg text-white" : "mt-2 font-heading text-xl text-brand-black"}>
        {title}
      </h3>
      {description ? (
        <p
          className={
            isDark
              ? "mt-2 text-xs leading-relaxed text-white/65"
              : "mt-2 text-sm leading-relaxed text-brand-black/58"
          }
        >
          {description}
        </p>
      ) : null}

      <span
        className={
          isDark
            ? "mt-5 inline-flex items-center gap-2 text-xs font-medium text-brand-gold transition-transform duration-300 group-hover:translate-x-0.5"
            : "mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-red transition-transform duration-300 group-hover:translate-x-0.5"
        }
      >
        Download PDF
        <DownloadArrow />
      </span>
    </a>
  );
}
