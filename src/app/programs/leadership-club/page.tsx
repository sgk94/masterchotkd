"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ease = "cubic-bezier(0.32, 0.72, 0, 1)";

const schedule = [
  { day: "Tuesday", time: "6:40 – 7:30" },
  { day: "Thursday", time: "6:40 – 7:30" },
  { day: "Saturday", time: "9:00 AM~" },
];

const whatToExpect = [
  { title: "Teaching & Mentorship", description: "Learn by leading. Leadership students assist in teaching younger classes, building communication and responsibility." },
  { title: "Demo Team Training", description: "Perform at events and demonstrations, showcasing advanced techniques and teamwork." },
  { title: "Advanced Techniques", description: "Go beyond standard curriculum with specialized forms, weapons, and breaking techniques." },
  { title: "Character Leadership", description: "Develop the qualities of a true martial arts leader \u2014 integrity, humility, and service to others." },
];

const requirements = [
  "Must be an active Black Belt Club member",
  "Must be at Camo belt level or higher",
  "Must demonstrate consistent attendance and positive attitude",
  "Invitation-based \u2014 speak with an instructor",
];

const faq = [
  { q: "Who can join Leadership Club?", a: "Students at Camo belt or higher who show dedication and a positive attitude. Speak with an instructor about joining." },
  { q: "Is this in addition to regular classes?", a: "Yes. Leadership Club meets on its own schedule and is supplemental to your regular Black Belt Club training." },
  { q: "What is the Demo Team?", a: "The Demo Team performs at community events, school assemblies, and special occasions. It\u2019s a great way to represent the dojang." },
  { q: "Is there an additional cost?", a: "There is a separate membership fee for Leadership Club. Ask at the front desk for current pricing." },
];

export default function LeadershipClubPage(): React.ReactElement {
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
          src="/images/Leadership_Demo-Team.jpg"
          alt="Leadership Club and Demo Team"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />
        <div className="relative z-10 px-8 pb-10 pt-32 sm:px-12 sm:pb-14 sm:pt-40">
          <span className="inline-block rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-gold">
            Advanced Students
          </span>
          <h1 className="mt-5 font-heading text-4xl tracking-tight text-white sm:text-5xl lg:text-6xl">
            Leadership Club
          </h1>
          <p className="mt-4 max-w-lg leading-relaxed text-white/60">
            For those looking to gain a deeper understanding and immersion in Taekwondo. Grand Master Cho believes one of the most effective ways to learn is by experiencing and teaching — firsthand.
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
            Train to lead, on and off the mat
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
            Leadership Club Schedule
          </h2>
          <p className="mt-2 text-sm text-brand-black/40">50-minute sessions, Tuesday, Thursday & Saturday</p>
        </div>
        <div
          className="mt-8"
          data-reveal="100"
          style={{ opacity: 0, transform: "translateY(1.5rem)", transitionTimingFunction: ease, transitionDuration: "900ms", transitionProperty: "opacity, transform" }}
        >
          <div className="rounded-[2rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
            <div className="overflow-hidden rounded-[calc(2rem-6px)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
              <div className="grid grid-cols-3 gap-px bg-brand-taupe/10">
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
            Requirements to Join
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {requirements.map((req, i) => (
            <div
              key={req}
              data-reveal={(i + 1) * 100}
              className="transition-[opacity,transform] duration-[900ms] will-change-[transform,opacity]"
              style={{ opacity: 0, transform: "translateY(1.5rem)", transitionTimingFunction: ease }}
            >
              <div className="h-full rounded-[2rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
                <div className="flex h-full items-center gap-4 rounded-[calc(2rem-6px)] bg-white p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold/10 text-sm font-bold text-brand-gold">
                    {i + 1}
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-brand-black/70">{req}</p>
                </div>
              </div>
            </div>
          ))}
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
          Try 2 weeks of classes for just $50. No commitment required.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button variant="primary" href="/special-offer">Start Your Trial</Button>
          <Button variant="outline" href="/contact" className="!border-brand-black !text-brand-black hover:!bg-brand-black/5">Contact Us</Button>
        </div>
      </div>
    </div>
  );
}
