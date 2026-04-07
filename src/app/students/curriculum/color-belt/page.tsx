"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const ease = "cubic-bezier(0.32, 0.72, 0, 1)";

type CycleRow = {
  cycle: string;
  beltName: string;
  beltColor: string;
  beltBorder?: string;
  beltStyle?: React.CSSProperties;
  poomsae: string;
  weapon: string;
  oneStep: string;
  handTech: string;
  board: string;
};

type BeltLevel = {
  title: string;
  subtitle: string;
  accent: string;
  accentBg: string;
  rows: CycleRow[];
};

const levels: BeltLevel[] = [
  {
    title: "Beginner",
    subtitle: "White → Orange → Yellow",
    accent: "text-amber-600",
    accentBg: "bg-amber-500/10 ring-amber-500/20",
    rows: [
      { cycle: "1", beltName: "White", beltColor: "bg-white", beltBorder: "ring-1 ring-brand-taupe", poomsae: "Basic", weapon: "BME", oneStep: "White", handTech: "1–6", board: "Hammer Fist" },
      { cycle: "2", beltName: "Orange", beltColor: "bg-orange-400", poomsae: "Taegeuk 1", weapon: "JB", oneStep: "Orange", handTech: "7–12", board: "Front Kick" },
      { cycle: "3", beltName: "Yellow", beltColor: "bg-yellow-400", poomsae: "Taegeuk 2", weapon: "SJB", oneStep: "Yellow", handTech: "13–18", board: "Knife Hand" },
    ],
  },
  {
    title: "Intermediate",
    subtitle: "Camo → Green → Purple",
    accent: "text-emerald-600",
    accentBg: "bg-emerald-500/10 ring-emerald-500/20",
    rows: [
      { cycle: "1", beltName: "Camo", beltColor: "bg-cover bg-center", beltStyle: { backgroundImage: "url(/images/camo-pattern.jpg)" }, poomsae: "Taegeuk 3", weapon: "BME", oneStep: "Camo", handTech: "19–24", board: "Round Kick" },
      { cycle: "2", beltName: "Green", beltColor: "bg-green-500", poomsae: "Taegeuk 4", weapon: "JB", oneStep: "Green", handTech: "25–30", board: "Palm Strike" },
      { cycle: "3", beltName: "Purple", beltColor: "bg-purple-600", poomsae: "Taegeuk 5", weapon: "SJB", oneStep: "Purple", handTech: "31–36", board: "Side Kick" },
    ],
  },
  {
    title: "Advanced",
    subtitle: "Blue → Brown → Red",
    accent: "text-blue-600",
    accentBg: "bg-blue-500/10 ring-blue-500/20",
    rows: [
      { cycle: "1", beltName: "Blue", beltColor: "bg-blue-600", poomsae: "Taegeuk 6", weapon: "BME", oneStep: "Blue", handTech: "37–42", board: "Jump Front Kick" },
      { cycle: "2", beltName: "Brown", beltColor: "bg-yellow-700", poomsae: "Taegeuk 7", weapon: "JB", oneStep: "Brown", handTech: "43–48", board: "Jump Round Kick" },
      { cycle: "3", beltName: "Red", beltColor: "bg-red-600", poomsae: "Taegeuk 8", weapon: "SJB", oneStep: "Red", handTech: "49–52", board: "Jump Reverse Side Kick" },
    ],
  },
];

const fields = [
  { key: "poomsae" as const, label: "Poomsae" },
  { key: "weapon" as const, label: "Weapon" },
  { key: "oneStep" as const, label: "One-Step" },
  { key: "handTech" as const, label: "Hand Tech" },
  { key: "board" as const, label: "Board Break" },
];

export default function ColorBeltPage(): React.ReactElement {
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionsRef.current;
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
        href="/students/curriculum"
        className="group inline-flex items-center gap-2 text-sm text-brand-black/40 transition-colors duration-500 hover:text-brand-black/70"
        style={{ transitionTimingFunction: ease }}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-sand/60 transition-all duration-500 group-hover:-translate-x-0.5 group-hover:bg-brand-sand"
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
          Belt Requirements
        </span>
        <h1 className="mt-5 font-heading text-3xl tracking-tight text-brand-black sm:text-4xl lg:text-5xl">
          Color Belt Curriculum
        </h1>
        <p className="mt-3 max-w-lg leading-relaxed text-brand-black/50">
          Each level consists of 3 cycles. Complete all cycles to advance to the next level.
        </p>
      </div>

      {/* Levels */}
      <div ref={sectionsRef} className="mt-14 flex flex-col gap-20">
        {levels.map((level, li) => (
          <section key={level.title}>
            {/* Level header */}
            <div
              data-reveal={li * 100}
              className="transition-[opacity,transform] duration-[900ms] will-change-[transform,opacity]"
              style={{ opacity: 0, transform: "translateY(1.5rem)", transitionTimingFunction: ease }}
            >
              <div className="flex items-center gap-4">
                <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] ring-1 ${level.accentBg} ${level.accent}`}>
                  Level {li + 1}
                </span>
                <div className="flex items-center gap-1.5">
                  {level.rows.map((row, ri) => (
                    <div
                      key={ri}
                      className={`h-4 w-8 rounded-full ${row.beltColor} ${row.beltBorder ?? ""}`}
                      style={row.beltStyle}
                    />
                  ))}
                </div>
              </div>
              <h2 className={`mt-4 font-heading text-2xl tracking-tight ${level.accent} sm:text-3xl`}>
                {level.title}
              </h2>
              <p className="mt-1 text-sm text-brand-black/40">{level.subtitle}</p>
            </div>

            {/* Cycle cards */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {level.rows.map((row, ri) => (
                <div
                  key={row.beltName}
                  data-reveal={(li * 100) + ((ri + 1) * 120)}
                  className="transition-[opacity,transform] duration-[900ms] will-change-[transform,opacity]"
                  style={{ opacity: 0, transform: "translateY(1.5rem)", transitionTimingFunction: ease }}
                >
                  {/* Double-bezel card */}
                  <div className="h-full rounded-[2rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
                    <div className="flex h-full flex-col rounded-[calc(2rem-6px)] bg-white p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                      {/* Card header — belt swatch + cycle */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-8 w-8 rounded-full ${row.beltColor} ${row.beltBorder ?? ""} shadow-sm`}
                            style={row.beltStyle}
                          />
                          <div>
                            <p className="font-heading text-lg tracking-tight text-brand-black">
                              {row.beltName}
                            </p>
                            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-brand-black/30">
                              Cycle {row.cycle}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="my-4 h-px bg-brand-taupe/15" />

                      {/* Fields */}
                      <div className="flex flex-1 flex-col gap-3">
                        {fields.map((f) => (
                          <div key={f.key} className="flex items-center justify-between">
                            <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-brand-black/35">
                              {f.label}
                            </span>
                            <span className="text-sm font-medium text-brand-black/75">
                              {row[f.key]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Weapon legend */}
      <div
        className="mt-16 rounded-[2rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15"
      >
        <div className="rounded-[calc(2rem-6px)] bg-white p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] sm:p-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/35">
            Weapon Key
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { abbr: "BME", full: "Bahng Mahng Ee", desc: "Single stick" },
              { abbr: "JB", full: "Jahng Bong", desc: "Long staff" },
              { abbr: "SJB", full: "Ssahng Jeol Bong", desc: "Nunchucks" },
            ].map((w) => (
              <div key={w.abbr} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-cream text-xs font-semibold text-brand-black/60">
                  {w.abbr}
                </span>
                <div>
                  <p className="text-sm font-medium text-brand-black/70">{w.full}</p>
                  <p className="text-xs text-brand-black/40">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
