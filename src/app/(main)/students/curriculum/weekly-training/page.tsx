import { BezelCard } from "@/components/ui/bezel-card";

const weeks = [
  {
    week: 1,
    title: "Poomsae & Hand Techniques",
    stripe: "Black stripe",
    stripeColor: "bg-brand-black",
    description:
      "All students will learn about their Poomsae (Form) for their current belt level. The Master/Instructor will issue the \u201CHalf Form\u201D and later the \u201CFull Form\u201D black stripe(s) upon the students mastering their skill(s) of that week. Students will also focus on the hand techniques required to further improve their skills.",
  },
  {
    week: 2,
    title: "Weapons",
    stripe: "Blue stripe",
    stripeColor: "bg-blue-500",
    description:
      "All students will learn their weapon poomsae for the current cycle (Sahng Jeol Bong, Jahng Bong, or Bahng Mang Ee). Master/Instructors will focus on weapon skills and techniques to help improve their weapons training. A blue stripe will be given to those who show they can correctly do their weapon poomsae.",
  },
  {
    week: 3,
    title: "Sparring & One-Steps",
    stripe: "Green stripe",
    stripeColor: "bg-green-500",
    description:
      "All students will learn about \u201CSparring\u201D for their current belt level. The Master/Instructor will issue the \u201CSparring\u201D Green color stripe upon the student mastering their skill of that week. Camo belt students & Higher must require their own Sparring Gear provided from Master Cho\u2019s Taekwondo.",
  },
  {
    week: 4,
    title: "Kicking & Breaking",
    stripe: "Yellow stripe",
    stripeColor: "bg-yellow-400",
    description:
      "All students will learn about their Kicking skills for the current level and cycle. The Master/Instructor will issue a Yellow stripe upon the student mastering their skill of that week. All students need to buy their own Breaking Boards.",
  },
  {
    week: 5,
    title: "Review",
    stripe: null,
    stripeColor: null,
    description:
      "A comprehensive review of all skills covered during the cycle. Instructors assess readiness and address any areas that need additional practice.",
  },
];

export default function WeeklyTrainingPage(): React.ReactElement {
  return (
    <div>
      {/* Header */}
      <div>
        <span className="inline-block rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
          Training Structure
        </span>
        <h1 className="mt-5 font-heading text-3xl tracking-tight text-brand-black sm:text-4xl lg:text-5xl">
          Weekly Training
        </h1>
        <p className="mt-3 max-w-lg leading-relaxed text-brand-black/50">
          Our training is based on a 4-week curriculum program, with a 5th week for review.
        </p>
      </div>

      {/* Timeline cards */}
      <div className="mt-14 flex flex-col gap-6">
        {weeks.map((w, i) => (
          <div
            key={w.week}
            className="animate-fade-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <BezelCard>
              <div className="p-6 sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:gap-8">
                  {/* Week number */}
                  <div className="flex shrink-0 items-start gap-4 sm:w-40 sm:flex-col sm:gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-cream text-sm font-semibold text-brand-black/60">
                      W{w.week}
                    </div>
                    <div className="sm:mt-1">
                      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-brand-black/30">
                        Week {w.week}
                      </p>
                      {w.stripe && w.stripeColor && (
                        <div className="mt-2 flex items-center gap-2">
                          <div className={`h-2.5 w-8 rounded-full ${w.stripeColor}`} />
                          <span className="text-[11px] text-brand-black/40">{w.stripe}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="font-heading text-xl tracking-tight text-brand-black sm:text-2xl">
                      {w.title}
                    </h2>
                    <p className="mt-3 leading-relaxed text-brand-black/55">
                      {w.description}
                    </p>
                  </div>
                </div>
              </div>
            </BezelCard>
          </div>
        ))}
      </div>

      {/* Notes section */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <BezelCard>
          <div className="p-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/35">
              Note
            </p>
            <p className="mt-3 text-sm leading-relaxed text-brand-black/55">
              The instructors review the students&apos; progress on an ongoing basis in order to determine their eligibility for stripes.
            </p>
          </div>
        </BezelCard>
        <BezelCard>
          <div className="p-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/35">
              Time to Advance
            </p>
            <p className="mt-3 text-sm leading-relaxed text-brand-black/55">
              Average 10–20 weeks based on student&apos;s attendance, proficiency, and technical understanding.
            </p>
          </div>
        </BezelCard>
      </div>
    </div>
  );
}
