"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const ease = "cubic-bezier(0.32, 0.72, 0, 1)";

const benefits = [
  {
    num: "01",
    title: "Loyalty & Respect",
    description: "Over 25 years teaching self-defense and confidence through the traditional art of Taekwondo.",
  },
  {
    num: "02",
    title: "Home, School & Family",
    description: "Our curriculum builds confident leaders, successful students, and responsible community members.",
  },
  {
    num: "03",
    title: "Discipline & Growth",
    description: "Emphasizing balance in all things — encouraging personal growth at every stage of the journey.",
  },
];

const challenges = [
  {
    title: "Struggling with Focus?",
    description: "Difficulty paying attention at school or following directions at home.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    title: "Low Confidence?",
    description: "Shying away from challenges or hesitant to speak up in groups.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" /><path d="M18 21v-1a5 5 0 0 0-5-5h-2a5 5 0 0 0-5 5v1" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Too Much Screen Time?",
    description: "Spending hours on tablets instead of moving and interacting.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12" y2="18.01" />
      </svg>
    ),
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
      {/* Section 1: More Than Just Kicks & Punches */}
      <section className="relative overflow-hidden bg-brand-black px-4 py-28 sm:px-6 lg:py-36">
        {/* Background image — deep fade */}
        <Image
          src="/images/Black-Belt-Club.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-black/80 to-brand-black" />

        {/* Decorative radial glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/[0.04] blur-3xl" />

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* Header */}
          <div
            data-reveal="0"
            className="text-center transition-[opacity,transform] duration-[900ms] will-change-[transform,opacity]"
            style={{ opacity: 0, transform: "translateY(1.5rem)", transitionTimingFunction: ease }}
          >
            <span className="inline-block rounded-full border border-brand-gold/20 bg-brand-gold/5 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-gold/70">
              Our Philosophy
            </span>
            <h2 className="mt-6 font-heading text-3xl tracking-tight text-white sm:text-4xl lg:text-5xl">
              More Than Just Kicks & Punches
            </h2>
            <div className="mx-auto mt-5 h-0.5 w-10 rounded-full bg-brand-gold/60" />
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/45">
              We don&apos;t just teach self-defense. We teach character development that lasts a lifetime.
            </p>
          </div>

          {/* Benefit cards — asymmetric bento */}
          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {benefits.map((b, i) => (
                <div
                  key={b.title}
                  data-reveal={(i + 1) * 120}
                  className="transition-[opacity,transform] duration-[900ms] will-change-[transform,opacity]"
                  style={{ opacity: 0, transform: "translateY(1.5rem)", transitionTimingFunction: ease }}
                >
                  {/* Double-bezel glass card */}
                  <div className="group h-full rounded-[2rem] bg-white/[0.03] p-[1px] ring-1 ring-white/[0.08] transition-all duration-700 hover:bg-white/[0.05] hover:ring-white/[0.12]" style={{ transitionTimingFunction: ease }}>
                    <div className="flex h-full flex-col rounded-[calc(2rem-1px)] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-8">
                      {/* Number + gold accent line */}
                      <div className="flex items-center gap-4">
                        <span className="font-heading text-4xl text-brand-gold/25 transition-colors duration-700 group-hover:text-brand-gold/45" style={{ transitionTimingFunction: ease }}>
                          {b.num}
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-brand-gold/20 to-transparent transition-all duration-700 group-hover:from-brand-gold/40" style={{ transitionTimingFunction: ease }} />
                      </div>
                      <h3 className="mt-5 font-heading text-lg text-white/90 transition-colors duration-500 group-hover:text-white">
                        {b.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/40 transition-colors duration-500 group-hover:text-white/55">
                        {b.description}
                      </p>
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
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-brand-gold" />
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
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
                      {c.icon}
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
              Start your 2-week trial — $49
            </Button>
            <p className="mt-3 text-xs text-brand-black/35">No commitment required. All ages welcome.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
