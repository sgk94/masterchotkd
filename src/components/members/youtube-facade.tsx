"use client";

import { useState } from "react";

const ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

type YouTubeFacadeProps = {
  videoId: string;
  title: string;
};

export function YouTubeFacade({
  videoId,
  title,
}: YouTubeFacadeProps): React.ReactElement {
  const safeId = ID_PATTERN.test(videoId) ? videoId : "";
  const [playing, setPlaying] = useState(false);

  if (!safeId) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-[1.25rem] bg-brand-black/[0.03] text-xs text-brand-black/40">
        Invalid video reference
      </div>
    );
  }

  if (playing) {
    return (
      <iframe
        className="aspect-video w-full rounded-[1.25rem]"
        src={`https://www.youtube-nocookie.com/embed/${safeId}?autoplay=1&rel=0&modestbranding=1`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${title}`}
      className="group relative aspect-video w-full overflow-hidden rounded-[1.25rem] bg-brand-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
    >
      {/* Thumbnail — subtle zoom on hover, tightens on active */}
      <img
        src={`https://i.ytimg.com/vi/${safeId}/hqdefault.jpg`}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full scale-[1.04] object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.1] group-active:scale-[1.02]"
      />

      {/* Bottom navy gradient — filmic, improves contrast with label */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-brand-navy/75 via-brand-navy/10 to-transparent"
      />

      {/* Soft top vignette — pulls focus to the play control */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/35 to-transparent"
      />

      {/* Top-right eyebrow chip — branded, glassy */}
      <div className="absolute right-3 top-3 flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 font-heading text-[9px] font-semibold uppercase tracking-[0.26em] text-white backdrop-blur-md">
        <span
          aria-hidden="true"
          className="inline-block h-1.5 w-1.5 rounded-full bg-brand-red shadow-[0_0_8px_rgba(196,30,42,0.6)]"
        />
        Poomsae
      </div>

      {/* Play button — glass by default, fills brand-red on hover */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110 group-hover:border-brand-red group-hover:bg-brand-red group-hover:shadow-[0_10px_28px_-8px_rgba(196,30,42,0.55)] group-active:scale-95">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="ml-0.5"
          >
            <polygon points="6 4 20 12 6 20 6 4" />
          </svg>
        </span>
      </div>

      {/* Bottom-left micro-caption — belt + form, subtle */}
      <p className="absolute bottom-3 left-4 font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-white/85">
        Watch form
      </p>
    </button>
  );
}
