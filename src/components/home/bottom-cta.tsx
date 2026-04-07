"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const ease = "cubic-bezier(0.32, 0.72, 0, 1)";

const benefits = [
  {
    title: "Unshakable Confidence",
    description: "Kids learn to believe in themselves, speak up, and stand tall in any situation.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: "Laser Focus",
    description: "Improved concentration that translates directly to better grades and behavior.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    title: "Discipline & Respect",
    description: "Learning to listen, follow directions, and respect authority figures.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4 12 14.01l-3-3" />
      </svg>
    ),
  },
  {
    title: "Positive Community",
    description: "Surrounded by supportive mentors and friends who encourage growth.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const challenges = [
  {
    title: "Struggling with Focus?",
    description: "Difficulty paying attention at school or following directions at home.",
  },
  {
    title: "Low Confidence?",
    description: "Shying away from challenges or hesitant to speak up in groups.",
  },
  {
    title: "Too Much Screen Time?",
    description: "Spending hours on tablets instead of moving and interacting.",
  },
];

export function BottomCta(): React.ReactElement {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const cards = el.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const delay = parseInt(target.dataset.reveal || "0", 10);
            setTimeout(() => {
              target.style.opacity = "1";
              target.style.transform = "translateY(0)";
            }, delay);
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
      {/* Section 1: More Than Just Kicks & Punches — dark bg with benefit cards */}
      <section className="relative overflow-hidden bg-brand-black px-6 py-24 lg:py-32">
        {/* Background image */}
        <Image
          src="/images/Black-Belt-Club.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-brand-black/60" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <div
            className="text-center"
            data-reveal="0"
            style={{ opacity: 0, transform: "translateY(1.5rem)", transitionTimingFunction: ease, transitionDuration: "900ms", transitionProperty: "opacity, transform" }}
          >
            <h2 className="font-heading text-3xl tracking-tight text-white sm:text-4xl">
              More Than Just Kicks & Punches
            </h2>
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-green-500" />
            <p className="mx-auto mt-5 max-w-xl text-white/60 leading-relaxed">
              We don&apos;t just teach self-defense. We teach character development that lasts a lifetime.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                data-reveal={(i + 1) * 100}
                className="transition-[opacity,transform] duration-[900ms] will-change-[transform,opacity]"
                style={{ opacity: 0, transform: "translateY(1.5rem)", transitionTimingFunction: ease }}
              >
                <div className="rounded-xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-none">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-green-400">
                      {b.icon}
                    </div>
                    <div>
                      <h3 className="font-heading text-base text-white">{b.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/50">{b.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Problem → Solution */}
      <section className="px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-5xl">
          <div
            className="text-center"
            data-reveal="0"
            style={{ opacity: 0, transform: "translateY(1.5rem)", transitionTimingFunction: ease, transitionDuration: "900ms", transitionProperty: "opacity, transform" }}
          >
            <h2 className="font-heading text-3xl tracking-tight text-brand-black sm:text-4xl">
              Is your child facing these challenges?
            </h2>
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-green-500" />
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-brand-black/50">
              In just 2 weeks, you&apos;ll see a noticeable change. Your child will start listening better, focusing longer, and showing more confidence. Parents consistently tell us they wish they&apos;d started sooner.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {challenges.map((c, i) => (
              <div
                key={c.title}
                data-reveal={(i + 1) * 120}
                className="transition-[opacity,transform] duration-[900ms] will-change-[transform,opacity]"
                style={{ opacity: 0, transform: "translateY(1.5rem)", transitionTimingFunction: ease }}
              >
                <div className="rounded-[2rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
                  <div className="rounded-[calc(2rem-6px)] bg-white p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-brand-red">
                      <span className="text-sm font-semibold">?</span>
                    </div>
                    <h3 className="mt-4 font-heading text-lg text-brand-black">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-black/50">{c.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-14 text-center"
            data-reveal="500"
            style={{ opacity: 0, transform: "translateY(1.5rem)", transitionTimingFunction: ease, transitionDuration: "900ms", transitionProperty: "opacity, transform" }}
          >
            <Button variant="primary" href="/special-offer">
              Start your 2-week trial — $50
            </Button>
            <p className="mt-3 text-xs text-brand-black/35">No commitment required. All ages welcome.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
