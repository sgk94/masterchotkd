"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const ease = "cubic-bezier(0.32, 0.72, 0, 1)";

const weeks = [
  {
    week: 1,
    title: "Poomsae & Hand Techniques",
    stripe: "Black stripe",
    stripeColor: "bg-brand-black",
    description:
      "All students will learn about their Poomsae (Form) for their current belt level. The Master/Instructor will issue the \u201CHalf Form\u201D and later the \u201CFull Form\u201D black stripe(s) upon the students mastering their skill(s) of that week. Students will also focus on the hand techniques required to further improve their skills.",
  },
  {
    week: 2,
    title: "Weapons",
    stripe: "Blue stripe",
    stripeColor: "bg-blue-500",
    description:
      "All students will learn their weapon poomsae for the current cycle (Sahng Jeol Bong, Jahng Bong, or Bahng Mang Ee). Master/Instructors will focus on weapon skills and techniques to help improve their weapons training. A blue stripe will be given to those who show they can correctly do their weapon poomsae.",
  },
  {
    week: 3,
    title: "Sparring & One-Steps",
    stripe: "Green stripe",
    stripeColor: "bg-green-500",
    description:
      "All students will learn about \u201CSparring\u201D for their current belt level. The Master/Instructor will issue the \u201CSparring\u201D Green color stripe upon the student mastering their skill of that week. Camo belt students & Higher must require their own Sparring Gear provided from Master Cho\u2019s Taekwondo.",
  },
  {
    week: 4,
    title: "Kicking & Breaking",
    stripe: "Yellow stripe",
    stripeColor: "bg-yellow-400",
    description:
      "All students will learn about their Kicking skills for the current level and cycle. The Master/Instructor will issue a Yellow stripe upon the student mastering their skill of that week. All students need to buy their own Breaking Boards.",
  },
  {
    week: 5,
    title: "Review",
    stripe: null,
    stripeColor: null,
    description:
      "A comprehensive review of all skills covered during the cycle. Instructors assess readiness and address any areas that need additional practice.",
  },
];

export default function WeeklyTrainingPage(): React.ReactElement {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardsRef.current;
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
    <div>
      {/* Back link */}
      <Link
        href="/members/curriculum"
        className="group inline-flex items-center gap-2 text-sm text-brand-black/40 transition-colors duration-500 hover:text-brand-black/70"
        style={{ transitionTimingFunction: ease }}
      >
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-sand/60 transition-all duration-500 group-hover:-translate-x-0.5 group-hover:bg-brand-sand"
          style={{ transitionTimingFunction: ease }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 2L4 6l4 4" />
          </svg>
        </span>
        Back to Curriculum
      </Link>

      {/* Header */}
      <div className="mt-8">
        <span className="inline-block rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
          Training Structure
        </span>
        <h1 className="mt-5 font-heading text-3xl tracking-tight text-brand-black sm:text-4xl lg:text-5xl">
          Weekly Training
        </h1>
        <p className="mt-3 max-w-lg leading-relaxed text-brand-black/50">
          Our training is based on a 4-week curriculum program, with a 5th week for review.
        </p>
      </div>

      {/* Timeline cards */}
      <div ref={cardsRef} className="mt-14 flex flex-col gap-6">
        {weeks.map((w, i) => (
          <div
            key={w.week}
            data-reveal={i * 100}
            className="transition-[opacity,transform] duration-[900ms] will-change-[transform,opacity]"
            style={{ opacity: 0, transform: "translateY(1.5rem)", transitionTimingFunction: ease }}
          >
            <div className="rounded-[2rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
              <div className="rounded-[calc(2rem-6px)] bg-white p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:gap-8">
                  {/* Week number */}
                  <div className="flex shrink-0 items-start gap-4 sm:w-40 sm:flex-col sm:gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-cream text-sm font-semibold text-brand-black/60">
                      W{w.week}
                    </div>
                    <div className="sm:mt-1">
                      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-brand-black/30">
                        Week {w.week}
                      </p>
                      {w.stripe && w.stripeColor && (
                        <div className="mt-2 flex items-center gap-2">
                          <div className={`h-2.5 w-8 rounded-full ${w.stripeColor}`} />
                          <span className="text-[11px] text-brand-black/40">{w.stripe}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="font-heading text-xl tracking-tight text-brand-black sm:text-2xl">
                      {w.title}
                    </h2>
                    <p className="mt-3 leading-relaxed text-brand-black/55">
                      {w.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Notes section */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-[2rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
          <div className="rounded-[calc(2rem-6px)] bg-white p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/35">
              Note
            </p>
            <p className="mt-3 text-sm leading-relaxed text-brand-black/55">
              The instructors review the students&apos; progress on an ongoing basis in order to determine their eligibility for stripes.
            </p>
          </div>
        </div>
        <div className="rounded-[2rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
          <div className="rounded-[calc(2rem-6px)] bg-white p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/35">
              Time to Advance
            </p>
            <p className="mt-3 text-sm leading-relaxed text-brand-black/55">
              Average 10–20 weeks based on student&apos;s attendance, proficiency, and technical understanding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
