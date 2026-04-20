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
      <div className="flex aspect-video items-center justify-center rounded-xl bg-brand-black/[0.03] text-xs text-brand-black/40">
        Invalid video reference
      </div>
    );
  }

  if (playing) {
    return (
      <iframe
        className="aspect-video w-full rounded-xl"
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
      className="group relative aspect-video w-full overflow-hidden rounded-xl bg-brand-black"
    >
      <img
        src={`https://i.ytimg.com/vi/${safeId}/hqdefault.jpg`}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-red/95 text-white shadow-lg shadow-black/30 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110 group-active:scale-95">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <polygon points="6 4 20 12 6 20 6 4" />
          </svg>
        </span>
      </div>
    </button>
  );
}
