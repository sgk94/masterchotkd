import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { FloatingSectionNav } from "@/components/members/floating-section-nav";
import { SectionHeader } from "@/components/members/shared";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Black Belt Curriculum" });

const sectionLinks = [
  { href: "#overview", label: "Overview" },
  { href: "#requirements", label: "Requirements" },
  { href: "#combos", label: "Combos" },
];

const midtermRequirements = [
  {
    title: "Midterm 1",
    poomsae: "Koryo",
    weapon: "Half Ssang Jeol Bong",
    combo: "1-3",
  },
  {
    title: "Midterm 2",
    poomsae: "Koryo, Palgwe 1",
    weapon: "Full Ssang Jeol Bong",
    combo: "4-6",
  },
  {
    title: "Midterm 3",
    poomsae: "Koryo, Palgwe 1+2",
    weapon: "Half Bahng Mahng Ee",
    combo: "7-9",
  },
  {
    title: "Midterm 4",
    poomsae: "Freestyle Poomsae",
    notes: "Modified World Taekwondo freestyle rules.",
  },
  {
    title: "Midterm 5",
    poomsae: "Koryo, Palgwe 3",
    weapon: "Full Bahng Mahng Ee",
    combo: "10-12",
  },
  {
    title: "Midterm 6",
    poomsae: "Koryo, Palgwe 3+4",
    weapon: "Half Jahng Bong",
    combo: "13-15",
  },
  {
    title: "Midterm 7",
    poomsae: "Koryo, Palgwe 1-4",
    weapon: "Full Jahng Bong",
    combo: "16-18",
  },
] as const;

const testingRequirement = {
  title: "2nd Degree Testing",
  poomsae: "Koryo, Palgwe 1-4",
  weapon: "All",
  combo: "1-18",
} as const;

const combos = [
  { title: "Combo 1", description: "Jab" },
  { title: "Combo 2", description: "Double Jab" },
  { title: "Combo 3", description: "Jab, Cross" },
  { title: "Combo 4", description: "Double Jab, Cross" },
  { title: "Combo 5", description: "Jab, Cross, Hook" },
  { title: "Combo 6", description: "Jab, Cross, Hook, Uppercut" },
  { title: "Combo 7", description: "Right uppercut, Left hook" },
  { title: "Combo 8", description: "Right uppercut, Left hook, right cross" },
  { title: "Combo 9", description: "Jab, Cross to the body, Left hook to the head" },
  { title: "Combo 10", description: "Double jab, Right Front Kick" },
  { title: "Combo 11", description: "Jab, Inside leg kick (left round)" },
  { title: "Combo 12", description: "Inside leg kick, left round to the body" },
  { title: "Combo 13", description: "Jab, Cross, Left hook, right round" },
  { title: "Combo 14", description: "Right round, Overhand left" },
  { title: "Combo 15", description: "Cross, hook, right round" },
  { title: "Combo 16", description: "Parry with right hand, throw cross with right hand" },
  { title: "Combo 17", description: "Check, Jab, Cross, Switch round to the body" },
  { title: "Combo 18", description: "Right leg kick, cross, switch butterfly" },
] as const;

type Requirement = {
  title: string;
  poomsae: string;
  weapon?: string;
  combo?: string;
  notes?: string;
};

function RequirementCard({
  requirement,
  tone = "light",
}: {
  requirement: Requirement;
  tone?: "light" | "dark";
}): React.ReactElement {
  const isDark = tone === "dark";
  const fieldLabel = isDark
    ? "text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45"
    : "text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-black/35";
  const fieldValue = isDark ? "mt-1 font-medium text-white" : "mt-1 font-medium text-brand-black";

  return (
    <article
      className={
        isDark
          ? "rounded-2xl bg-brand-navy p-6 text-white shadow-sm ring-1 ring-brand-navy/20"
          : "rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-taupe/10"
      }
    >
      <p
        className={
          isDark
            ? "text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold/80"
            : "text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-red/70"
        }
      >
        {requirement.title}
      </p>
      <div className={isDark ? "mt-4 space-y-3 text-sm text-white/80" : "mt-4 space-y-3 text-sm text-brand-black/70"}>
        <div>
          <p className={fieldLabel}>Poomsae</p>
          <p className={fieldValue}>{requirement.poomsae}</p>
        </div>
        {requirement.weapon ? (
          <div>
            <p className={fieldLabel}>Weapon</p>
            <p className={fieldValue}>{requirement.weapon}</p>
          </div>
        ) : null}
        {requirement.combo ? (
          <div>
            <p className={fieldLabel}>Combo</p>
            <p className={fieldValue}>{requirement.combo}</p>
          </div>
        ) : null}
        {requirement.notes ? (
          <div>
            <p className={fieldLabel}>Notes</p>
            <p className={fieldValue}>{requirement.notes}</p>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function BlackBeltClubCurriculumPage(): React.ReactElement {
  return (
    <div>
      {/* Mobile section jump links */}
      <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
        {sectionLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="inline-flex shrink-0 items-center rounded-full bg-brand-cream px-4 py-2 text-xs font-medium text-brand-black/50 transition-colors hover:bg-brand-sand hover:text-brand-black"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="mt-6 lg:mt-0 lg:grid lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-6 xl:grid-cols-[12rem_minmax(0,1fr)] xl:gap-8">
        <FloatingSectionNav ariaLabel="Black belt curriculum sections" links={sectionLinks} />

        <div className="min-w-0 space-y-14">
          {/* OVERVIEW */}
          <section id="overview" className="scroll-mt-28">
            <div className="relative overflow-hidden rounded-2xl bg-brand-navy px-8 py-10 sm:px-10 sm:py-12">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-red/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-brand-gold/8 blur-3xl" />

              <div className="relative z-10">
                <EyebrowBadge variant="gold">Members Only</EyebrowBadge>
                <h1 className="mt-4 font-heading text-3xl tracking-tight text-white sm:text-4xl">
                  Black Belt Curriculum
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
                  This section is reserved for black belt students and now includes the current testing requirements
                  from the black belt curriculum handout.
                </p>
              </div>
            </div>
          </section>

          {/* REQUIREMENTS */}
          <section id="requirements" className="scroll-mt-28 space-y-8">
            <SectionHeader
              label="Requirements"
              title="1st Degree Black Belt Requirements"
              description="Each midterm builds on the material before it. Use this section as the current reference for poomsae, weapon work, and combo requirements, with 2nd degree testing included below in the same format."
            />

            <div className="rounded-2xl bg-brand-cream p-8 ring-1 ring-brand-taupe/10">
              <div className="grid gap-4 lg:grid-cols-2">
                {midtermRequirements.map((requirement) => (
                  <RequirementCard key={requirement.title} requirement={requirement} tone="light" />
                ))}
                <RequirementCard requirement={testingRequirement} tone="dark" />
              </div>
            </div>
          </section>

          {/* COMBOS */}
          <section id="combos" className="scroll-mt-28 space-y-8">
            <SectionHeader
              label="Combos"
              title="Black Belt Combo Reference"
              description="These combos were added from the combos handout and are listed separately for quick reference during practice."
            />

            <div className="rounded-2xl border border-brand-taupe/20 bg-white p-8 ring-1 ring-brand-taupe/10">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {combos.map((combo) => (
                  <article
                    key={combo.title}
                    className="rounded-2xl bg-brand-cream p-5 ring-1 ring-brand-taupe/10"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-red/70">
                      {combo.title}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-brand-black/70">{combo.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
