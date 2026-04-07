"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { staticPrograms } from "@/lib/static-data";

type ProgramLayout = {
  bg: string;
  span: string;
  height: string;
  headingSize: string;
  featured: boolean;
  imagePosition?: string;
};

const layoutBySlug: Record<string, ProgramLayout> = {
  "tiny-tigers": {
    bg: "from-amber-800/80 via-amber-700/70 to-amber-900/90",
    span: "sm:col-span-7 sm:row-span-2",
    height: "h-56 sm:h-[22rem]",
    headingSize: "text-3xl sm:text-4xl lg:text-5xl",
    featured: true,
  },
  "competition-team": {
    bg: "from-brand-gold/70 via-amber-700/60 to-amber-900/90",
    span: "sm:col-span-5",
    height: "h-56 sm:h-[10.5rem]",
    headingSize: "text-2xl sm:text-3xl",
    featured: false,
  },
  "leadership-club": {
    bg: "from-brand-red/70 via-rose-700/60 to-brand-red/90",
    span: "sm:col-span-5",
    height: "h-56 sm:h-[10.5rem]",
    headingSize: "text-2xl sm:text-3xl",
    featured: false,
  },
  "black-belt-club": {
    bg: "from-brand-blue/80 via-indigo-900/70 to-brand-black/90",
    span: "sm:col-span-12",
    height: "h-56 sm:h-72",
    headingSize: "text-2xl sm:text-3xl lg:text-4xl",
    featured: false,
    imagePosition: "object-[center_35%]",
  },
};

/* Grid order matters for bento layout: Tiny Tigers (row-span-2 left),
   Competition + Leadership (stacked right), Black Belt Club (full width) */
const gridOrder = ["tiny-tigers", "competition-team", "leadership-club", "black-belt-club"];

const programs = gridOrder.map((slug) => {
  const p = staticPrograms.find((sp) => sp.slug === slug)!;
  return { ...p, subtitle: p.ageRange, image: p.imageUrl, ...layoutBySlug[slug] };
});

export function ProgramsGrid(): React.ReactElement {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.dataset.reveal || "0", 10);
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0) scale(1)";
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
      {/* Section header */}
      <div className="max-w-xl">
        <span className="inline-block rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
          Programs
        </span>
        <h2 className="mt-5 font-heading text-3xl tracking-tight text-brand-black sm:text-4xl lg:text-5xl">
          Find your path
        </h2>
        <p className="mt-3 text-brand-black/50 leading-relaxed">
          From our youngest students to competitive athletes — a program for every stage
        </p>
      </div>

      {/* Asymmetric bento grid */}
      <div
        ref={gridRef}
        className="mt-12 grid grid-cols-1 gap-3.5 sm:grid-cols-12 sm:gap-4"
      >
        {programs.map((program, i) => (
          /* Outer shell — double-bezel */
          <div
            key={program.slug}
            data-reveal={i * 120}
            className={`${program.span} rounded-[2rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] will-change-[transform,opacity]`}
            style={{
              opacity: 0,
              transform: "translateY(2rem) scale(0.97)",
            }}
          >
            {/* Inner core */}
            <Link
              href={`/programs/${program.slug}`}
              className={`group relative flex ${program.height} items-end overflow-hidden rounded-[calc(2rem-6px)] p-6 sm:p-8 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]`}
            >
              {/* Photo background (if available) */}
              {"image" in program && program.image ? (
                <Image
                  src={program.image}
                  alt=""
                  fill
                  sizes={program.featured ? "(max-width: 640px) 100vw, 58vw" : program.span === "sm:col-span-12" ? "(max-width: 640px) 100vw, 100vw" : "(max-width: 640px) 100vw, 42vw"}
                  className={`absolute inset-0 object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04] ${"imagePosition" in program && program.imagePosition ? program.imagePosition : ""}`}
                />
              ) : null}
              {/* Gradient: directional for photo cards, standard for gradient-only cards */}
              {"image" in program && program.image ? (
                <div className="absolute inset-0 bg-[linear-gradient(to_top_right,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.5)_40%,rgba(0,0,0,0.05)_70%,transparent_100%)]" />
              ) : (
                <>
                  <div className={`absolute inset-0 bg-gradient-to-br ${program.bg} transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </>
              )}
              {/* Top subtle light */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent" />
              {/* Inner inset highlight for glass depth */}
              <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] rounded-[calc(2rem-6px)]" />

              {/* Content */}
              <div className="relative z-10 transition-transform duration-600 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-[-6px]">
                {program.featured && (
                  <span className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white/70 backdrop-blur-sm ring-1 ring-white/10">
                    Most popular
                  </span>
                )}
                <h3
                  className={`font-heading ${program.headingSize} text-white leading-[0.95] ${"image" in program && program.image ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" : ""}`}
                >
                  {program.name}
                </h3>
                <p className={`mt-1.5 text-base ${"image" in program && program.image ? "text-white/70 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]" : "text-white/75"}`}>
                  {program.subtitle}
                </p>
                {program.featured && (
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/70">
                    {program.description}
                  </p>
                )}

                {/* Explore CTA with button-in-button icon */}
                <span className={`mt-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] ${"image" in program && program.image ? "text-white/60" : "text-white/60"} transition-colors duration-500 group-hover:text-brand-gold`}>
                  Explore
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:scale-110 group-hover:bg-brand-gold/20">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="transition-transform duration-500 group-hover:translate-x-0.5"
                    >
                      <path d="M2 6h8M7 3l3 3-3 3" />
                    </svg>
                  </span>
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
