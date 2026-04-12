"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ease = "cubic-bezier(0.32, 0.72, 0, 1)";

const scheduleRows = [
  {
    label: "White-Yellow (Beginner)",
    times: {
      Monday: "4:10 – 4:50",
      Tuesday: "6:00 – 6:40",
      Wednesday: "4:10 – 4:50",
      Thursday: "6:00 – 6:40",
      Friday: "4:10 – 4:50",
    },
  },
  {
    label: "Camo-Purple (Intermediate)",
    times: {
      Monday: "5:30 – 6:10",
      Tuesday: "4:00 – 4:40",
      Wednesday: "5:30 – 6:10",
      Thursday: "4:00 – 4:40",
      Friday: "3:30 – 4:10",
    },
  },
  {
    label: "Blue-Black (Advanced)",
    times: {
      Monday: "4:50 – 5:30",
      Tuesday: "5:20 – 6:00",
      Wednesday: "4:50 – 5:30",
      Thursday: "5:20 – 6:00",
      Friday: "3:30 – 4:10",
    },
  },
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

const beltCycles = [
  { belt: "White", color: "#f5f5f5", border: true, poomsae: "Basic Form", handTech: "1–6", board: "Hammer Fist" },
  { belt: "Orange", color: "#FFE0B2", border: false, poomsae: "Taegeuk 1", handTech: "7–12", board: "Knife Hand" },
  { belt: "Yellow", color: "#FFF176", border: false, poomsae: "Taegeuk 2", handTech: "13–18", board: "Palm Strike" },
  { belt: "Camo", color: "#C8E6C9", border: false, poomsae: "Taegeuk 3", handTech: "19–24", board: "Side Kick" },
  { belt: "Green", color: "#66BB6A", border: false, poomsae: "Taegeuk 4", handTech: "25–30", board: "Back Kick" },
  { belt: "Purple", color: "#CE93D8", border: false, poomsae: "Taegeuk 5", handTech: "31–36", board: "Spinning Back Kick" },
  { belt: "Blue", color: "#64B5F6", border: false, poomsae: "Taegeuk 6", handTech: "37–42", board: "Jump Front Kick" },
  { belt: "Brown", color: "#A1887F", border: false, poomsae: "Taegeuk 7", handTech: "43–48", board: "Spinning Hook Kick" },
  { belt: "Red", color: "#EF5350", border: false, poomsae: "Taegeuk 8", handTech: "49–54", board: "Tornado Kick" },
];

const whatToExpect = [
  { title: "Comprehensive Training", description: "Poomsae, sparring, weapons, breaking, and hand techniques — a complete martial arts education." },
  { title: "Character Development", description: "Building discipline, respect, and confidence that extends beyond the dojang." },
  { title: "Belt Progression", description: "Work through 9 color belt levels from White to Red, then advance toward your Black Belt." },
  { title: "Flexible Schedule", description: "Up to 3 classes per week with Beginner, Intermediate, and Advanced sessions available." },
];

const faq = [
  { q: "What age can students join?", a: "All ages are welcome. We group classes by belt level so students train with peers at similar skill levels." },
  { q: "How often should I attend?", a: "We recommend 2-3 classes per week for steady progress. Up to 3 sessions per week are available." },
  { q: "What gear do I need?", a: "A dobok (uniform) is required. Camo belt and higher need their own sparring gear, available at the dojang." },
  { q: "How long to reach Black Belt?", a: "Typically 3-5 years with consistent training. Each belt level takes an average of 10-20 weeks." },
  { q: "Can I compete in tournaments?", a: "Yes! Students interested in competition can join our Competition Team for specialized tournament training." },
];

export default function BlackBeltClubPage(): React.ReactElement {
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
    <div ref={sectionRef} className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-[2rem] bg-brand-black">
        <Image
          src="/images/Black-Belt-Club.jpg"
          alt="Black Belt Club class"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />
        <div className="relative z-10 px-8 pb-10 pt-32 sm:px-12 sm:pb-14 sm:pt-40">
          <span className="inline-block rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-gold">
            All Ages
          </span>
          <h1 className="mt-5 font-heading text-4xl tracking-tight text-white sm:text-5xl lg:text-6xl">
            Black Belt Club
          </h1>
          <p className="mt-4 max-w-lg leading-relaxed text-white/60">
            Designed for students committed to mastering Taekwondo, our standard program offers up to three classes per week, allowing students to fully immerse themselves in the art and progress at an accelerated pace.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="primary" href="/special-offer">Start a 2-Week Trial</Button>
            <Button variant="outline" href="/schedule">View Schedule</Button>
          </div>
        </div>
      </div>

      {/* What to Expect */}
      <div className="mt-20">
        <div
          data-reveal="0"
          className="transition-[opacity,transform] duration-[900ms] will-change-[transform,opacity]"
          style={{ opacity: 0, transform: "translateY(1.5rem)", transitionTimingFunction: ease }}
        >
          <span className="inline-block rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
            What to Expect
          </span>
          <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
            A complete martial arts education
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {whatToExpect.map((item, i) => (
            <div
              key={item.title}
              data-reveal={(i + 1) * 100}
              className="transition-[opacity,transform] duration-[900ms] will-change-[transform,opacity]"
              style={{ opacity: 0, transform: "translateY(1.5rem)", transitionTimingFunction: ease }}
            >
              <div className="h-full rounded-[2rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
                <div className="flex h-full flex-col rounded-[calc(2rem-6px)] bg-white p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                  <h3 className="font-heading text-lg text-brand-black">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-black/55">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule */}
      <div className="mt-20">
        <div
          data-reveal="0"
          className="transition-[opacity,transform] duration-[900ms] will-change-[transform,opacity]"
          style={{ opacity: 0, transform: "translateY(1.5rem)", transitionTimingFunction: ease }}
        >
          <span className="inline-block rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
            Class Times
          </span>
          <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
            Black Belt Club Schedule
          </h2>
          <p className="mt-2 text-sm text-brand-black/40">40-minute classes, Monday – Friday &middot; Beginner, Intermediate &amp; Advanced</p>
        </div>
        <div
          className="mt-8"
          data-reveal="100"
          style={{ opacity: 0, transform: "translateY(1.5rem)", transitionTimingFunction: ease, transitionDuration: "900ms", transitionProperty: "opacity, transform" }}
        >
          <div className="rounded-[2rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
            <div className="overflow-hidden rounded-[calc(2rem-6px)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
              {/* Header row */}
              <div className="grid grid-cols-6 gap-px bg-brand-taupe/10">
                <div className="bg-white p-4" />
                {days.map((day) => (
                  <div key={day} className="bg-white p-4 text-center">
                    <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-brand-black/35">{day}</p>
                  </div>
                ))}
              </div>
              {/* Schedule rows */}
              {scheduleRows.map((row) => (
                <div key={row.label} className="grid grid-cols-6 gap-px bg-brand-taupe/10">
                  <div className="flex items-center bg-white p-4">
                    <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-brand-black/50">{row.label}</p>
                  </div>
                  {days.map((day) => (
                    <div key={day} className="bg-white p-4 text-center">
                      <p className="font-heading text-sm text-brand-black">{row.times[day]}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Belt Curriculum */}
      <div className="mt-20">
        <div
          data-reveal="0"
          className="transition-[opacity,transform] duration-[900ms] will-change-[transform,opacity]"
          style={{ opacity: 0, transform: "translateY(1.5rem)", transitionTimingFunction: ease }}
        >
          <span className="inline-block rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
            Belt Progression
          </span>
          <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
            Color Belt Curriculum
          </h2>
          <p className="mt-2 text-sm text-brand-black/40">White belt through Red — 9 levels toward Black Belt</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {beltCycles.map((row, i) => (
            <div
              key={row.belt}
              data-reveal={(i + 1) * 80}
              className="transition-[opacity,transform] duration-[900ms] will-change-[transform,opacity]"
              style={{ opacity: 0, transform: "translateY(1.5rem)", transitionTimingFunction: ease }}
            >
              <div className="h-full rounded-[2rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
                <div className="flex h-full flex-col rounded-[calc(2rem-6px)] bg-white p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-8 w-8 rounded-full shadow-sm"
                      style={{
                        backgroundColor: row.color,
                        border: row.border ? "2px solid #d4c5b0" : "none",
                      }}
                    />
                    <h3 className="font-heading text-lg text-brand-black">{row.belt}</h3>
                  </div>
                  <div className="my-4 h-px bg-brand-taupe/15" />
                  <div className="flex flex-col gap-2.5">
                    {[
                      { label: "Poomsae", value: row.poomsae },
                      { label: "Hand Tech", value: row.handTech },
                      { label: "Board Break", value: row.board },
                    ].map((f) => (
                      <div key={f.label} className="flex items-center justify-between">
                        <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-brand-black/35">{f.label}</span>
                        <span className="text-sm font-medium text-brand-black/70">{f.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Weapons note */}
        <div
          className="mt-6"
          data-reveal="800"
          style={{ opacity: 0, transform: "translateY(1.5rem)", transitionTimingFunction: ease, transitionDuration: "900ms", transitionProperty: "opacity, transform" }}
        >
          <div className="rounded-[2rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
            <div className="rounded-[calc(2rem-6px)] bg-white p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
              <h3 className="font-heading text-base text-brand-black">Weapons</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-black/55">
                Weapons are based on the current cycle: Bahng Mang Ee, Jahng Bong, or Sahng Jeol Bong. Need to purchase a weapon? Ask one of our instructors!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-20">
        <div
          data-reveal="0"
          className="transition-[opacity,transform] duration-[900ms] will-change-[transform,opacity]"
          style={{ opacity: 0, transform: "translateY(1.5rem)", transitionTimingFunction: ease }}
        >
          <span className="inline-block rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
            FAQ
          </span>
          <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
            Common Questions
          </h2>
        </div>
        <div className="mt-8 flex flex-col gap-4">
          {faq.map((item, i) => (
            <div
              key={item.q}
              data-reveal={(i + 1) * 80}
              className="transition-[opacity,transform] duration-[900ms] will-change-[transform,opacity]"
              style={{ opacity: 0, transform: "translateY(1.5rem)", transitionTimingFunction: ease }}
            >
              <div className="rounded-[2rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
                <div className="rounded-[calc(2rem-6px)] bg-white p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                  <h3 className="font-heading text-base text-brand-black">{item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-black/55">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div
        className="mt-20 text-center"
        data-reveal="0"
        style={{ opacity: 0, transform: "translateY(1.5rem)", transitionTimingFunction: ease, transitionDuration: "900ms", transitionProperty: "opacity, transform" }}
      >
        <h2 className="font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
          Ready to get started?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-brand-black/50">
          Try 2 weeks of classes for just $49. No commitment required.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button variant="primary" href="/special-offer">Start Your Trial</Button>
          <Button variant="outline" href="/contact" className="!border-brand-black !text-brand-black hover:!bg-brand-black/5">Contact Us</Button>
        </div>
      </div>
    </div>
  );
}
