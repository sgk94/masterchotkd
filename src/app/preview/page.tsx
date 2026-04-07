"use client";

import Image from "next/image";
import { useState } from "react";

const IMG = "/images/Tiny Tigers.png";

/* ─── Option A: Split Layout ─── */
function OptionA(): React.ReactElement {
  return (
    <div className="group relative flex h-[22rem] overflow-hidden rounded-[calc(2rem-6px)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]">
      {/* Left — text on solid gradient */}
      <div className="relative z-10 flex w-1/2 flex-col justify-end bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 p-8">
        <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] rounded-l-[calc(2rem-6px)]" />
        <div className="relative transition-transform duration-600 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-[-6px]">
          <span className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white/60 ring-1 ring-white/10">
            Most popular
          </span>
          <h3 className="font-heading text-3xl text-white leading-[0.95] sm:text-4xl lg:text-5xl">
            Tiny Tigers
          </h3>
          <p className="mt-1.5 text-base text-white/60">Ages 3-6</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/45">
            Building confidence and coordination through playful martial arts fundamentals
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-white/40 transition-colors duration-500 group-hover:text-brand-gold">
            Explore
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:scale-110 group-hover:bg-brand-gold/20">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 6h8M7 3l3 3-3 3" /></svg>
            </span>
          </span>
        </div>
      </div>
      {/* Right — full photo, no overlay */}
      <div className="relative w-1/2 overflow-hidden">
        <Image
          src={IMG}
          alt="Tiny Tigers students"
          fill
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
        />
      </div>
    </div>
  );
}

/* ─── Option B: Photo Top, Text Bottom ─── */
function OptionB(): React.ReactElement {
  return (
    <div className="group relative flex h-[22rem] flex-col overflow-hidden rounded-[calc(2rem-6px)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]">
      {/* Top — photo */}
      <div className="relative h-[55%] overflow-hidden">
        <Image
          src={IMG}
          alt="Tiny Tigers students"
          fill
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
        />
        {/* Subtle bottom fade into the text area */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-amber-900 to-transparent" />
      </div>
      {/* Bottom — text on solid bg */}
      <div className="relative flex flex-1 flex-col justify-end bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 p-8">
        <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]" />
        <div className="relative transition-transform duration-600 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-[-4px]">
          <span className="mb-2 inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white/60 ring-1 ring-white/10">
            Most popular
          </span>
          <h3 className="font-heading text-3xl text-white leading-[0.95] sm:text-4xl lg:text-5xl">
            Tiny Tigers
          </h3>
          <p className="mt-1 text-base text-white/60">Ages 3-6</p>
          <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-white/40 transition-colors duration-500 group-hover:text-brand-gold">
            Explore
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:scale-110 group-hover:bg-brand-gold/20">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 6h8M7 3l3 3-3 3" /></svg>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Option C: Full-bleed Photo, Directional Gradient ─── */
function OptionC(): React.ReactElement {
  return (
    <div className="group relative flex h-[22rem] items-end overflow-hidden rounded-[calc(2rem-6px)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]">
      {/* Full photo */}
      <Image
        src={IMG}
        alt="Tiny Tigers students"
        fill
        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
      />
      {/* Directional gradient — heavy bottom-left, clear top-right */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top_right,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.5)_40%,rgba(0,0,0,0.05)_70%,transparent_100%)]" />
      {/* Inner highlight */}
      <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] rounded-[calc(2rem-6px)]" />

      <div className="relative z-10 p-8 transition-transform duration-600 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-[-6px]">
        <span className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white/70 backdrop-blur-sm ring-1 ring-white/10">
          Most popular
        </span>
        <h3 className="font-heading text-3xl text-white leading-[0.95] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] sm:text-4xl lg:text-5xl">
          Tiny Tigers
        </h3>
        <p className="mt-1.5 text-base text-white/70 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">Ages 3-6</p>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/50">
          Building confidence and coordination through playful martial arts fundamentals
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-white/50 transition-colors duration-500 group-hover:text-brand-gold">
          Explore
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:scale-110 group-hover:bg-brand-gold/20">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 6h8M7 3l3 3-3 3" /></svg>
          </span>
        </span>
      </div>
    </div>
  );
}

/* ─── Option D: Frosted Glass Panel ─── */
function OptionD(): React.ReactElement {
  return (
    <div className="group relative flex h-[22rem] items-end overflow-hidden rounded-[calc(2rem-6px)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]">
      {/* Full photo — minimal overlay */}
      <Image
        src={IMG}
        alt="Tiny Tigers students"
        fill
        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
      />
      {/* Very light scrim just for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      {/* Inner highlight */}
      <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] rounded-[calc(2rem-6px)]" />

      {/* Frosted glass panel */}
      <div className="relative z-10 m-4 rounded-2xl border border-white/15 bg-black/40 p-6 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-transform duration-600 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-[-4px] sm:m-6">
        <span className="mb-2 inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white/70 ring-1 ring-white/10">
          Most popular
        </span>
        <h3 className="font-heading text-3xl text-white leading-[0.95] sm:text-4xl lg:text-5xl">
          Tiny Tigers
        </h3>
        <p className="mt-1.5 text-base text-white/70">Ages 3-6</p>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/50">
          Building confidence and coordination through playful martial arts fundamentals
        </p>
        <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-white/50 transition-colors duration-500 group-hover:text-brand-gold">
          Explore
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:scale-110 group-hover:bg-brand-gold/20">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 6h8M7 3l3 3-3 3" /></svg>
          </span>
        </span>
      </div>
    </div>
  );
}

const options = [
  { key: "A", label: "Split Layout", desc: "Text left, photo right — clean separation", Component: OptionA },
  { key: "B", label: "Photo Top, Text Bottom", desc: "Image upper 55%, text strip below", Component: OptionB },
  { key: "C", label: "Directional Gradient", desc: "Full-bleed photo, heavy bottom-left gradient + text shadow", Component: OptionC },
  { key: "D", label: "Frosted Glass Panel", desc: "Full photo, text in frosted backdrop-blur panel", Component: OptionD },
];

export default function PreviewPage(): React.ReactElement {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="font-heading text-3xl text-brand-black">Tiny Tigers Card — Options</h1>
      <p className="mt-2 text-brand-black/50">Click a card to see it larger. All use the real photo with legible text.</p>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {options.map(({ key, label, desc, Component }) => (
          <div key={key}>
            <div className="mb-3">
              <span className="text-sm font-semibold text-brand-black">Option {key}:</span>{" "}
              <span className="text-sm text-brand-black/60">{label}</span>
              <p className="text-xs text-brand-black/40">{desc}</p>
            </div>
            <button
              type="button"
              onClick={() => setActive(active === key ? null : key)}
              className="w-full rounded-[2rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15 text-left transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-brand-taupe/30"
            >
              <Component />
            </button>
          </div>
        ))}
      </div>

      {/* Enlarged overlay */}
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setActive(null)}>
          <div className="w-full max-w-3xl px-6" onClick={(e) => e.stopPropagation()}>
            <div className="rounded-[2rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
              {(() => { const match = options.find((o) => o.key === active); return match ? <match.Component /> : null; })()}
            </div>
            <p className="mt-4 text-center text-sm text-white/60">Click outside to close</p>
          </div>
        </div>
      )}
    </div>
  );
}
