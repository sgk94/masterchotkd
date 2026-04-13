"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const galleryItems = [
  { alt: "Tiny Tigers class in session", src: "/images/Tiny-Tigers-2.jpg", span: "" },
  { alt: "Black Belt Club training", src: "/images/Black-Belt-Club-2.jpg", span: "" },
  { alt: "Competition Team practice", src: "/images/Competition-Team-2.jpg", span: "" },
  { alt: "Leadership program students", src: "/images/Leadership.jpg", span: "" },
];

export function Gallery(): React.ReactElement {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryItems.length : null));
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : null));
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
      <div className="max-w-xl">
        <h2 className="font-heading text-3xl tracking-tight text-brand-black sm:text-4xl">
          Life at the dojang
        </h2>
        <p className="mt-2 text-brand-black/60">Training, competing, and growing together</p>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
        {galleryItems.map((img, index) => (
          <button
            key={img.alt}
            onClick={() => setLightboxIndex(index)}
            className={`group relative overflow-hidden rounded-2xl bg-brand-sand ${img.span}`}
            style={{ aspectRatio: "1/1" }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-brand-black/0 transition-colors duration-300 group-hover:bg-brand-black/10" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-black/90 p-4 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo: ${galleryItems[lightboxIndex].alt}`}
        >
          <button
            className="absolute left-5 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="Previous photo"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4L6 9l5 5" /></svg>
          </button>
          <button
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            aria-label="Close lightbox"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="1" y1="1" x2="17" y2="17" /><line x1="17" y1="1" x2="1" y2="17" />
            </svg>
          </button>
          <button
            className="absolute right-5 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="Next photo"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 4l5 5-5 5" /></svg>
          </button>
          <div className="relative h-[80vh] w-full max-w-4xl overflow-hidden rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={galleryItems[lightboxIndex].src}
              alt={galleryItems[lightboxIndex].alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
