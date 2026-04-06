"use client";

import { useState } from "react";
import Image from "next/image";

const galleryItems = [
  { alt: "Taekwondo students in training", src: "https://picsum.photos/seed/tkd-class/800/800", span: "" },
  { alt: "Students practicing poomsae forms", src: "https://picsum.photos/seed/tkd-forms/800/1000", span: "row-span-2" },
  { alt: "Belt promotion ceremony", src: "https://picsum.photos/seed/tkd-belt/800/800", span: "" },
  { alt: "Master Cho instructing students", src: "https://picsum.photos/seed/tkd-master/800/800", span: "" },
  { alt: "Sparring practice session", src: "https://picsum.photos/seed/tkd-spar/1200/800", span: "md:col-span-2" },
];

export function Gallery(): React.ReactElement {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
      <div className="max-w-xl">
        <h2 className="font-heading text-3xl tracking-tight text-brand-black sm:text-4xl">
          Life at the dojo
        </h2>
        <p className="mt-2 text-brand-black/60">Training, competing, and growing together</p>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
        {galleryItems.map((img, index) => (
          <button
            key={img.alt}
            onClick={() => setLightboxIndex(index)}
            className={`group relative overflow-hidden rounded-2xl bg-brand-sand ${img.span}`}
            style={{ aspectRatio: img.span.includes("row-span") ? "4/5" : "1/1" }}
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
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close lightbox"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="1" y1="1" x2="17" y2="17" /><line x1="17" y1="1" x2="1" y2="17" />
            </svg>
          </button>
          <div className="relative h-[80vh] w-full max-w-4xl overflow-hidden rounded-2xl">
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
