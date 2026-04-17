import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { BezelCard } from "@/components/ui/bezel-card";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Black Belt Club",
  description: "Master Cho's standard Taekwondo program for all ages. Up to three classes per week covering poomsae, sparring, weapons, breaking, and character development.",
});

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
    label: "Family / All Belts",
    times: {
      Monday: "6:10 – 6:50",
      Tuesday: "7:30 – 8:15",
      Wednesday: "6:10 – 6:50",
      Thursday: "7:30 – 8:15",
      Friday: "5:30 – 6:15",
    },
  },
  {
    label: "Adult & Teens",
    times: {
      Monday: "6:50 – 7:30",
      Wednesday: "6:50 – 7:30",
      Friday: "5:30 – 6:15",
    },
  },
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

const whatToExpect = [
  { title: "Comprehensive Training", description: "Poomsae, sparring, weapons, breaking, and hand techniques — a complete martial arts education." },
  { title: "Character Development", description: "Building discipline, respect, and confidence that extends beyond the dojang." },
  { title: "Structured Advancement", description: "Students grow through consistent training, clear goals, and instructor feedback at every stage." },
  { title: "Flexible Schedule", description: "New students can get started with beginner, family/all belts, and adult & teen classes throughout the week." },
];

const faq = [
  { q: "What age can students join?", a: "All ages are welcome. We group classes by belt level so students train with peers at similar skill levels." },
  { q: "How often should I attend?", a: "We recommend 2-3 classes per week for steady progress. Up to 3 sessions per week are available." },
  { q: "What gear do I need?", a: "A dobok (uniform) is required. Camo belt and higher need their own sparring gear, available at the dojang." },
  { q: "How long to reach Black Belt?", a: "Typically 3-5 years with consistent training. Each belt level takes an average of 10-20 weeks." },
  { q: "Can I compete in tournaments?", a: "Yes! Students interested in competition can join our Competition Team for specialized tournament training." },
];

export default function BlackBeltClubPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
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
        <Reveal delay={0}>
          <span className="inline-block rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
            What to Expect
          </span>
          <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
            A complete martial arts education
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {whatToExpect.map((item, i) => (
            <Reveal key={item.title} delay={(i + 1) * 100}>
              <BezelCard className="h-full">
                <div className="flex h-full flex-col p-6">
                  <h3 className="font-heading text-lg text-brand-black">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-black/55">{item.description}</p>
                </div>
              </BezelCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Schedule */}
      <div className="mt-20">
        <Reveal delay={0}>
          <span className="inline-block rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
            Class Times
          </span>
          <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
            Black Belt Club Schedule
          </h2>
          <p className="mt-2 text-sm text-brand-black/40">Classes open to new students, based on our current public schedule</p>
        </Reveal>
        <Reveal delay={100} className="mt-8">
          <BezelCard>
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
                    <p className="font-heading text-sm text-brand-black">{row.times[day] ?? "—"}</p>
                  </div>
                ))}
              </div>
            ))}
          </BezelCard>
        </Reveal>
      </div>

      {/* FAQ */}
      <div className="mt-20">
        <Reveal delay={0}>
          <span className="inline-block rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
            FAQ
          </span>
          <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
            Common Questions
          </h2>
        </Reveal>
        <div className="mt-8 flex flex-col gap-4">
          {faq.map((item, i) => (
            <Reveal key={item.q} delay={(i + 1) * 80}>
              <BezelCard>
                <div className="p-6">
                  <h3 className="font-heading text-base text-brand-black">{item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-black/55">{item.a}</p>
                </div>
              </BezelCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <Reveal delay={0} className="mt-20 text-center">
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
      </Reveal>
    </div>
  );
}
