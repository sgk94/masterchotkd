"use client";

import { useState } from "react";

const galleryItems = [
  { alt: "Taekwondo class in action" },
  { alt: "Students practicing forms" },
  { alt: "Belt promotion ceremony" },
  { alt: "Master Cho teaching" },
];

export function Gallery(): React.ReactElement {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <h2 className="text-center font-heading text-3xl text-brand-red sm:text-4xl">
        Visit Master Cho&apos;s Taekwondo
      </h2>
      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {galleryItems.map((img, index) => (
          <button
            key={img.alt}
            onClick={() => setLightboxIndex(index)}
            className="relative aspect-square overflow-hidden rounded-xl bg-brand-sand transition-transform hover:scale-[1.02]"
          >
            <div className="flex h-full w-full items-center justify-center text-sm text-brand-black/40">
              Gallery {index + 1}
            </div>
          </button>
        ))}
      </div>
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute right-4 top-4 text-2xl text-white"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close lightbox"
          >
            &#x2715;
          </button>
          <div className="flex h-[80vh] w-full max-w-4xl items-center justify-center rounded-xl bg-brand-sand text-brand-black/40">
            Gallery {lightboxIndex + 1} &mdash; Full Size
          </div>
        </div>
      )}
    </section>
  );
}
