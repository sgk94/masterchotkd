import { BezelCard } from "@/components/ui/bezel-card";
import { ProgramDetailPage } from "@/components/programs/program-detail-page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Black Belt Club",
  description: "Master Cho's standard Taekwondo program for all ages. Up to three classes per week covering poomsae, sparring, weapons, breaking, and character development.",
  path: "/programs/black-belt-club",
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

function ScheduleTable(): React.ReactElement {
  return (
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
              <p className="font-heading text-sm text-brand-black">{row.times[day] ?? "\u2014"}</p>
            </div>
          ))}
        </div>
      ))}
    </BezelCard>
  );
}

export default function BlackBeltClubPage(): React.ReactElement {
  return (
    <ProgramDetailPage
      heroImage="/images/Black-Belt-Club.jpg"
      heroImageAlt="Black Belt Club class"
      eyebrowLabel="All Ages"
      title="Black Belt Club"
      description="Designed for students committed to mastering Taekwondo, our standard program offers up to three classes per week, allowing students to fully immerse themselves in the art and progress at an accelerated pace."
      whatToExpectHeading="A complete martial arts education"
      whatToExpect={whatToExpect}
      scheduleHeading="Black Belt Club Schedule"
      scheduleSubtitle="Classes open to new students, based on our current public schedule"
      schedule={<ScheduleTable />}
      faq={faq}
    />
  );
}
