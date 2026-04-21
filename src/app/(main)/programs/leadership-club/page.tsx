import { Reveal } from "@/components/ui/reveal";
import { BezelCard } from "@/components/ui/bezel-card";
import { ProgramDetailPage } from "@/components/programs/program-detail-page";
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

function ScheduleGrid(): React.ReactElement {
  return (
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
  );
}

function RequirementsList(): React.ReactElement {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
  );
}

export default function LeadershipClubPage(): React.ReactElement {
  return (
    <ProgramDetailPage
      heroImage="/images/Leadership_Demo-Team.jpg"
      heroImageAlt="Leadership Club and Demo Team"
      eyebrowLabel="Advanced Students"
      title="Leadership Club"
      description="For those looking to gain a deeper understanding and immersion in Taekwondo. Grand Master Cho believes one of the most effective ways to learn is by experiencing and teaching — firsthand."
      whatToExpectHeading="Train to lead, on and off the mat"
      whatToExpect={whatToExpect}
      scheduleHeading="Leadership Club Schedule"
      scheduleSubtitle="50-minute sessions, Tuesday, Thursday & Saturday"
      schedule={<ScheduleGrid />}
      requirements={{
        heading: "Requirements to Join",
        items: <RequirementsList />,
      }}
      faq={faq}
    />
  );
}
