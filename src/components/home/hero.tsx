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

      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-4 py-20 sm:px-6 lg:py-40">
        {/* Left — text content */}
        <div className="max-w-xl flex-1">
          {/* Eyebrow */}
          <div
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.8s ${ease} 200ms, transform 0.8s ${ease} 200ms`,
            }}
          >
            <span className="inline-block rounded-full border border-brand-gold/30 bg-brand-gold/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[3px] text-brand-gold">
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

        {/* Right — circular cropped image (Nestig style) */}
        <div
          className="hidden flex-1 items-center justify-end lg:flex"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateX(0) scale(1)" : "translateX(40px) scale(0.95)",
            transition: `opacity 1s ${ease} 600ms, transform 1s ${ease} 600ms`,
          }}
        >
          <div className="relative">
            {/* Decorative ring */}
            <div className="absolute -inset-4 rounded-full border border-brand-gold/15" />
            <div className="absolute -inset-8 rounded-full border border-white/[0.04]" />
            {/* Circular image */}
            <div className="h-[420px] w-[420px] overflow-hidden rounded-full border-4 border-white/10 shadow-2xl shadow-black/30">
              <Image
                src="https://picsum.photos/seed/tkd-hero/840/840"
                alt="Taekwondo students training at Master Cho's"
                width={840}
                height={840}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
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
