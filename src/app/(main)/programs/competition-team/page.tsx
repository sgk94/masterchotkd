"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ease = "cubic-bezier(0.32, 0.72, 0, 1)";

const schedule = [
  { day: "Monday", time: "7:30 – 8:30" },
  { day: "Wednesday", time: "7:30 – 8:30" },
  { day: "Friday", time: "6:30 – 8:00" },
  { day: "Saturday", time: "10:30~" },
];

const whatToExpect = [
  { title: "Tournament Preparation", description: "Specialized training for sparring, poomsae, and breaking competitions at local, regional, and national levels." },
  { title: "Advanced Sparring", description: "Develop ring strategy, footwork, timing, and scoring techniques for competitive sparring." },
  { title: "Competition Poomsae", description: "Perfect your forms with attention to power, precision, and presentation for judges." },
  { title: "Team Camaraderie", description: "Train alongside dedicated teammates who push each other to excel and support one another at tournaments." },
];

const requirements = [
  "Must be an active Black Belt Club member",
  "Must be at Camo belt level or higher",
  "Must demonstrate strong sparring fundamentals",
  "Must commit to competition schedule and tournaments",
  "Own sparring gear required (available at the dojang)",
];

const faq = [
  { q: "Who can join the Competition Team?", a: "Students at Camo belt or higher with strong sparring fundamentals. Talk to an instructor about tryouts." },
  { q: "What tournaments do you compete in?", a: "We compete in local, regional, and national AAU and USAT sanctioned tournaments throughout the year." },
  { q: "What gear do I need?", a: "Full sparring gear set (headgear, chest protector, forearm/shin guards, gloves, mouthguard). Available for purchase at the dojang." },
  { q: "Is this in addition to regular classes?", a: "Yes. Competition Team training is supplemental. You should continue attending your regular Black Belt Club classes." },
];

export default function CompetitionTeamPage(): React.ReactElement {
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
          src="/images/Competition-Team.jpg"
          alt="Competition Team training"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />
        <div className="relative z-10 px-8 pb-10 pt-32 sm:px-12 sm:pb-14 sm:pt-40">
          <span className="inline-block rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-gold">
            Tournament Athletes
          </span>
          <h1 className="mt-5 font-heading text-4xl tracking-tight text-white sm:text-5xl lg:text-6xl">
            Competition Team
          </h1>
          <p className="mt-4 max-w-lg leading-relaxed text-white/60">
            For dedicated athletes who want to compete at local, regional, and national tournaments. Focused training on sparring, forms, and breaking techniques.
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
            Training built for competitors
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
            Competition Team Schedule
          </h2>
          <p className="mt-2 text-sm text-brand-black/40">4 sessions per week, evenings + Saturday morning</p>
        </div>
        <div
          className="mt-8"
          data-reveal="100"
          style={{ opacity: 0, transform: "translateY(1.5rem)", transitionTimingFunction: ease, transitionDuration: "900ms", transitionProperty: "opacity, transform" }}
        >
          <div className="rounded-[2rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
            <div className="overflow-hidden rounded-[calc(2rem-6px)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
              <div className="grid grid-cols-2 gap-px bg-brand-taupe/10 sm:grid-cols-4">
                {schedule.map((s) => (
                  <div key={s.day} className="bg-white p-5 text-center">
                    <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-brand-black/35">{s.day}</p>
                    <p className="mt-2 font-heading text-lg text-brand-black">{s.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="mt-20">
        <div
          data-reveal="0"
          className="transition-[opacity,transform] duration-[900ms] will-change-[transform,opacity]"
          style={{ opacity: 0, transform: "translateY(1.5rem)", transitionTimingFunction: ease }}
        >
          <span className="inline-block rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
            Eligibility
          </span>
          <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
            Requirements
          </h2>
        </div>
        <div
          className="mt-8"
          data-reveal="100"
          style={{ opacity: 0, transform: "translateY(1.5rem)", transitionTimingFunction: ease, transitionDuration: "900ms", transitionProperty: "opacity, transform" }}
        >
          <div className="rounded-[2rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
            <div className="rounded-[calc(2rem-6px)] bg-white p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
              <ul className="flex flex-col gap-3">
                {requirements.map((req) => (
                  <li key={req} className="flex items-start gap-3">
                    <span className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-red" />
                    <span className="text-sm leading-relaxed text-brand-black/70">{req}</span>
                  </li>
                ))}
              </ul>
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
