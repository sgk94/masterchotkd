import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { BezelCard } from "@/components/ui/bezel-card";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Leadership Club",
  description: "Advanced Taekwondo training for dedicated students. Teach, lead, and perform with Master Cho's Leadership Club and Demo Team in Lynnwood, WA.",
  path: "/programs/leadership-club",
});

const schedule = [
  { day: "Tuesday", time: "6:40 – 7:30" },
  { day: "Thursday", time: "6:40 – 7:30" },
  { day: "Saturday", time: "9:00 AM~" },
];

const whatToExpect = [
  { title: "Teaching & Mentorship", description: "Learn by leading. Leadership students assist in teaching younger classes, building communication and responsibility." },
  { title: "Demo Team Training", description: "Perform at events and demonstrations, showcasing advanced techniques and teamwork." },
  { title: "Advanced Techniques", description: "Go beyond standard curriculum with specialized forms, weapons, and breaking techniques." },
  { title: "Character Leadership", description: "Develop the qualities of a true martial arts leader — integrity, humility, and service to others." },
];

const requirements = [
  "Must be an active Black Belt Club member",
  "Must be at Camo belt level or higher",
  "Must demonstrate consistent attendance and positive attitude",
  "Invitation-based — speak with an instructor",
];

const faq = [
  { q: "Who can join Leadership Club?", a: "Students at Camo belt or higher who show dedication and a positive attitude. Speak with an instructor about joining." },
  { q: "Is this in addition to regular classes?", a: "Yes. Leadership Club meets on its own schedule and is supplemental to your regular Black Belt Club training." },
  { q: "What is the Demo Team?", a: "The Demo Team performs at community events, school assemblies, and special occasions. It's a great way to represent the dojang." },
  { q: "Is there an additional cost?", a: "There is a separate membership fee for Leadership Club. Ask at the front desk for current pricing." },
];

export default function LeadershipClubPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
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
        <Reveal delay={0}>
          <span className="inline-block rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
            What to Expect
          </span>
          <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
            Train to lead, on and off the mat
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
            Leadership Club Schedule
          </h2>
          <p className="mt-2 text-sm text-brand-black/40">50-minute sessions, Tuesday, Thursday & Saturday</p>
        </Reveal>
        <Reveal delay={100} className="mt-8">
          <BezelCard>
            <div className="grid grid-cols-3 gap-px bg-brand-taupe/10">
              {schedule.map((s) => (
                <div key={s.day} className="bg-white p-5 text-center">
                  <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-brand-black/35">{s.day}</p>
                  <p className="mt-2 font-heading text-lg text-brand-black">{s.time}</p>
                </div>
              ))}
            </div>
          </BezelCard>
        </Reveal>
      </div>

      {/* Requirements */}
      <div className="mt-20">
        <Reveal delay={0}>
          <span className="inline-block rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
            Eligibility
          </span>
          <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
            Requirements to Join
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {requirements.map((req, i) => (
            <Reveal key={req} delay={(i + 1) * 100}>
              <BezelCard className="h-full">
                <div className="flex h-full items-center gap-4 p-6">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold/10 text-sm font-bold text-brand-gold">
                    {i + 1}
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-brand-black/70">{req}</p>
                </div>
              </BezelCard>
            </Reveal>
          ))}
        </div>
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
