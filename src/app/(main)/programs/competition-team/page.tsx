import { Reveal } from "@/components/ui/reveal";
import { BezelCard } from "@/components/ui/bezel-card";
import { ProgramDetailPage } from "@/components/programs/program-detail-page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Competition Team",
  description: "Tournament-focused Taekwondo training for dedicated athletes. Compete at local, regional, and national levels with Master Cho's Competition Team in Lynnwood, WA.",
  path: "/programs/competition-team",
});

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

function ScheduleGrid(): React.ReactElement {
  return (
    <BezelCard>
      <div className="grid grid-cols-2 gap-px bg-brand-taupe/10 sm:grid-cols-4">
        {schedule.map((s) => (
          <div key={s.day} className="bg-white p-5 text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-brand-black/35">{s.day}</p>
            <p className="mt-2 font-heading text-lg text-brand-black">{s.time}</p>
          </div>
        ))}
      </div>
    </BezelCard>
  );
}

function RequirementsList(): React.ReactElement {
  return (
    <Reveal delay={100}>
      <BezelCard>
        <div className="p-6">
          <ul className="flex flex-col gap-3">
            {requirements.map((req) => (
              <li key={req} className="flex items-start gap-3">
                <span className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-red" />
                <span className="text-sm leading-relaxed text-brand-black/70">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </BezelCard>
    </Reveal>
  );
}

export default function CompetitionTeamPage(): React.ReactElement {
  return (
    <ProgramDetailPage
      heroImage="/images/Competition-Team.jpg"
      heroImageAlt="Competition Team training"
      eyebrowLabel="Tournament Athletes"
      title="Competition Team"
      description="For dedicated athletes who want to compete at local, regional, and national tournaments. Focused training on sparring, forms, and breaking techniques."
      whatToExpectHeading="Training built for competitors"
      whatToExpect={whatToExpect}
      scheduleHeading="Competition Team Schedule"
      scheduleSubtitle="4 sessions per week, evenings + Saturday morning"
      schedule={<ScheduleGrid />}
      requirements={{
        heading: "Requirements",
        items: <RequirementsList />,
      }}
      faq={faq}
    />
  );
}
