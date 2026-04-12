"use client";

import { Button } from "@/components/ui/button";

export function TrialBanner(): React.ReactElement {
  return (
    <section className="mx-auto max-w-7xl px-6">
      {/* Outer wrapper — acts as the border frame */}
      <div className="relative overflow-hidden rounded-2xl p-[4px]">
        {/* Spinning conic gradient — the visible gold border line */}
        <div
          className="pointer-events-none absolute inset-[-50%] animate-[border-spin_8s_linear_infinite]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, transparent 50%, #d4b84a 65%, #d4b84a 75%, transparent 90%, transparent 100%)",
          }}
        />
        {/* Glow layer — same rotation, heavily blurred for neon halo */}
        <div
          className="pointer-events-none absolute inset-[-50%] animate-[border-spin_8s_linear_infinite] blur-xl opacity-80"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, transparent 50%, #d4b84a 65%, #d4b84a 75%, transparent 90%, transparent 100%)",
          }}
        />

        {/* Inner card — sits on top, the 2px gap reveals the spinning gradient as a border */}
        <div className="relative overflow-hidden rounded-[calc(1rem-4px)] bg-brand-black p-10 sm:p-14">
          {/* Decorative background elements */}
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-red/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-brand-gold/10 blur-3xl" />
          <div className="absolute right-12 top-12 h-32 w-32 rounded-full border border-white/[0.04]" />
          <div className="absolute right-20 top-20 h-20 w-20 rounded-full border border-white/[0.06]" />

          <div className="relative z-10 max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-[4px] text-brand-gold">
              Limited time
            </p>
            <h2 className="mt-3 font-heading text-3xl tracking-tight text-white sm:text-4xl">
              2 weeks for just $49
            </h2>
            <p className="mt-4 max-w-md text-white/60 leading-relaxed">
              Try our taekwondo classes at no risk. All ages welcome. No commitment required.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="primary" href="/special-offer">
                Claim this offer
              </Button>
              <Button variant="outline" href="/schedule">
                View schedule
              </Button>
            </div>
          </div>

          {/* Price tag */}
          <div className="absolute bottom-6 right-6 hidden items-center justify-center lg:flex">
            <div className="flex h-40 w-40 items-center justify-center rounded-full border border-brand-gold/20 bg-brand-gold/5">
              <div className="text-center">
                <span className="block font-heading text-5xl text-brand-gold">$49</span>
                <span className="block text-xs uppercase tracking-wider text-white/40">2 weeks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
