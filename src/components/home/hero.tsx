"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const ease = "cubic-bezier(0.32, 0.72, 0, 1)";

export function Hero(): React.ReactElement {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative -mt-16 flex min-h-[100dvh] items-center overflow-hidden bg-brand-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      {/* Layered gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/80 to-brand-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/50 via-transparent to-brand-black/20" />

      <div className="relative z-10 flex w-full items-center py-20 pl-4 pr-0 sm:pl-6 lg:pl-[max(1.5rem,calc((100%-80rem)/2+1.5rem))] lg:py-40">
        {/* Left — text content */}
        <div className="max-w-xl">
          {/* Eyebrow */}
          <div
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.8s ${ease} 200ms, transform 0.8s ${ease} 200ms`,
            }}
          >
            <span className="inline-block rounded-full border border-brand-gold/30 bg-brand-gold/5 px-6 py-2.5 text-sm font-medium uppercase tracking-[3px] text-brand-gold">
              Lynnwood&apos;s premier academy
            </span>
          </div>

          <h1
            className="mt-6 font-heading text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.9s ${ease} 400ms, transform 0.9s ${ease} 400ms`,
            }}
          >
            Making a difference, one belt at a time
          </h1>

          <p
            className="mt-6 max-w-lg text-lg leading-relaxed text-white/60 sm:text-xl"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.8s ${ease} 600ms, transform 0.8s ${ease} 600ms`,
            }}
          >
            Experience top-notch martial arts and character development for all ages.
          </p>

          <div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.8s ${ease} 800ms, transform 0.8s ${ease} 800ms`,
            }}
          >
            <Button variant="primary" href="/special-offer">
              Request info
            </Button>
            <Button variant="outline" href="/schedule">
              View schedule
            </Button>
          </div>
        </div>

      </div>

      {/* Right — full-height image, semicircular left edge, flush top/right/bottom */}
      <svg className="absolute" width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id="hero-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.35,0 Q 0,0.5 0.35,1 L 1,1 L 1,0 Z" />
          </clipPath>
        </defs>
      </svg>
      <div
        className="absolute inset-y-0 right-0 hidden w-[55%] lg:block"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateX(0)" : "translateX(60px)",
          transition: `opacity 1.1s ${ease} 500ms, transform 1.1s ${ease} 500ms`,
          clipPath: "url(#hero-clip)",
        }}
      >
        <Image
          src="https://picsum.photos/seed/tkd-hero/1200/1600"
          alt="Taekwondo students training at Master Cho's"
          fill
          className="object-cover"
          priority
        />
        {/* Feather the curved edge into the dark bg */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/40 via-transparent to-transparent" />
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{
          opacity: mounted ? 1 : 0,
          transition: `opacity 1s ${ease} 1200ms`,
        }}
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <div className="h-2 w-1 animate-bounce rounded-full bg-white/40" />
        </div>
      </div>
    </section>
  );
}
