import { BezelCard } from "@/components/ui/bezel-card";
import { ProgramDetailPage } from "@/components/programs/program-detail-page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Tiny Tigers",
  description: "Taekwondo for ages 4–6. Fun, age-appropriate classes that build foundational life skills — listening, self-confidence, and respect — through martial arts.",
  path: "/programs/tiny-tigers",
});

const schedule = [
  { day: "Monday", time: "3:30 – 4:10" },
  { day: "Tuesday", time: "4:40 – 5:20" },
  { day: "Wednesday", time: "3:30 – 4:10" },
  { day: "Thursday", time: "4:40 – 5:20" },
  { day: "Friday", time: "4:50 – 5:30" },
];

const whatToExpect = [
  { title: "Fun & Engaging Classes", description: "Age-appropriate drills, games, and activities that keep kids excited while learning real martial arts skills." },
  { title: "Life Skills Development", description: "Listening, following directions, self-confidence, and respect — skills that carry over to school and home." },
  { title: "Positive Milestones", description: "Students stay motivated with clear goals, encouragement, and celebrations that build confidence over time." },
  { title: "Supportive Instruction", description: "Our instructors guide each child with patience and structure so families feel confident from day one." },
];

const faq = [
  { q: "What age is the Tiny Tigers program for?", a: "Ages 4–6. We focus on foundational skills appropriate for young learners." },
  { q: "How many classes per week?", a: "Classes are available Monday through Friday. We recommend attending at least 2–3 times per week for steady progress." },
  { q: "What should my child wear?", a: "A dobok (uniform) is required. Ask at the front desk about purchasing one." },
  { q: "How long does it take to advance belts?", a: "On average 10–20 weeks per belt, depending on attendance, proficiency, and technical understanding." },
  { q: "Does my child need sparring gear?", a: "Not at the Tiny Tigers level. Sparring gear is required starting at Camo belt and higher in the regular program." },
];

function ScheduleGrid(): React.ReactElement {
  return (
    <BezelCard>
      <div className="grid grid-cols-2 gap-px bg-brand-taupe/10 sm:grid-cols-5">
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

export default function TinyTigersPage(): React.ReactElement {
  return (
    <ProgramDetailPage
      heroImage="/images/Tiny-Tigers.jpg"
      heroImageAlt="Tiny Tigers class"
      eyebrowLabel="Ages 4–6"
      title="Tiny Tigers"
      description="Designed for our youngest students, this program focuses on teaching foundational life skills — listening, following directions, and self-confidence — through the art of Taekwondo."
      whatToExpectHeading="A class built for young learners"
      whatToExpect={whatToExpect}
      scheduleHeading="Tiny Tigers Schedule"
      scheduleSubtitle="40-minute classes, Monday – Friday"
      schedule={<ScheduleGrid />}
      faqLabel="Parent FAQ"
      faq={faq}
      ctaDescription="Try 2 weeks of Tiny Tigers classes for just $49. No commitment required."
    />
  );
}
