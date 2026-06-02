import Link from "next/link";
import { FloatingSectionNav } from "@/components/members/floating-section-nav";
import { SectionHeader, SubSectionHeader, VideoCard, VideoPlaceholder } from "@/components/members/shared";
import { cycleSchedule2026, formatCycleDate, getCurrentCycleWindow } from "@/lib/current-cycle";
import {
  cycleNameToNumber,
  getColorBeltEntriesForCycle,
  getSwatchStyle,
  type BeltSwatch,
  type ColorBeltCycleEntry,
} from "@/lib/current-cycle-materials";
import { createMetadata } from "@/lib/metadata";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";

export const metadata = createMetadata({ title: "Our Current Cycle Materials" });
export const revalidate = 3600;

const sectionLinks = [
  { href: "#overview", label: "Overview" },
  { href: "#color-belt", label: "Color Belt" },
  { href: "#poomsae", label: "Poomsae" },
  { href: "#weapon", label: "Weapons" },
  { href: "#one-step", label: "One-Step" },
  { href: "#hand-tech", label: "Hand Tech" },
  { href: "#board-breaking", label: "Breaking" },
  { href: "#schedule", label: "Schedule" },
];

function SwatchCircle({
  swatch,
  size = "h-7 w-7",
}: {
  swatch: BeltSwatch;
  size?: string;
}): React.ReactElement {
  return <div className={`${size} shrink-0 rounded-full shadow-sm`} style={getSwatchStyle(swatch)} />;
}

function ColorBeltOverviewCard({ entry }: { entry: ColorBeltCycleEntry }): React.ReactElement {
  return (
    <div className="group rounded-2xl bg-white p-6 ring-1 ring-brand-taupe/12 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-brand-taupe/10">
      {/* Header with swatch */}
      <div className="flex items-center gap-3">
        <SwatchCircle swatch={entry.swatch} size="h-8 w-8" />
        <div>
          <span className={`text-[10px] font-medium uppercase tracking-[0.18em] ${entry.levelAccent}`}>
            {entry.level}
          </span>
          <h3 className="font-heading text-xl text-brand-black">{entry.beltName}</h3>
        </div>
      </div>
      <p className="mt-1 text-xs text-brand-black/35">{entry.levelSubtitle}</p>

      {/* Requirements grid */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        {[
          { label: "Poomsae", value: entry.poomsae },
          { label: "Weapon", value: entry.weapon },
          { label: "One-Step", value: entry.oneStep },
          { label: "Hand Tech", value: entry.handTech },
        ].map((req) => (
          <div key={req.label} className="rounded-lg bg-brand-cream/50 px-3 py-2.5">
            <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-brand-black/30">{req.label}</p>
            <p className="mt-0.5 text-sm font-medium text-brand-black/70">{req.value}</p>
          </div>
        ))}
        <div className="col-span-2 rounded-lg bg-brand-cream/50 px-3 py-2.5">
          <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-brand-black/30">Board Breaking</p>
          <p className="mt-0.5 text-sm font-medium text-brand-black/70">{entry.board}</p>
        </div>
      </div>
    </div>
  );
}

function RequirementCard({
  eyebrow,
  title,
  value,
  swatch,
}: {
  eyebrow: string;
  title: string;
  value: string;
  swatch?: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white px-4 py-3.5 ring-1 ring-brand-taupe/12">
      {swatch}
      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-brand-black/35">{eyebrow}</p>
        <p className="font-heading text-base text-brand-black">{title}</p>
        <p className="text-sm text-brand-black/55">{value}</p>
      </div>
    </div>
  );
}

function YellowOneStepInstructions(): React.ReactElement {
  return (
    <div className="space-y-4">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-black/35">Step-by-Step Instructions</p>
      <div className="space-y-3 rounded-2xl bg-brand-cream/45 p-4">
        <div>
          <p className="font-heading text-base text-brand-black">One-Step #1</p>
          <p className="mt-1 text-sm text-brand-black/65">
            <span className="font-semibold text-brand-black">Attacker:</span> Step forward front stance punch
          </p>
          <p className="mt-1 text-sm text-brand-black/65">
            <span className="font-semibold text-brand-black">Defender:</span> Step back w/right leg, outer forearm block, #1 side kick, reverse punch, double step back
          </p>
        </div>
        <div>
          <p className="font-heading text-base text-brand-black">One-Step #2</p>
          <p className="mt-1 text-sm text-brand-black/65">
            <span className="font-semibold text-brand-black">Attacker:</span> Step forward front stance punch
          </p>
          <p className="mt-1 text-sm text-brand-black/65">
            <span className="font-semibold text-brand-black">Defender:</span> Step back w/ right leg, knifehand block, right hand palm strike, step back, right leg round kick, double step back
          </p>
        </div>
      </div>
    </div>
  );
}

function PurpleOneStepInstructions(): React.ReactElement {
  return (
    <div className="space-y-4">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-black/35">Step-by-Step Instructions</p>
      <div className="space-y-3 rounded-2xl bg-brand-cream/45 p-4">
        <div>
          <p className="font-heading text-base text-brand-black">One-Step #1</p>
          <p className="mt-1 text-sm text-brand-black/65">
            <span className="font-semibold text-brand-black">Partner 1:</span> Back leg round kick
          </p>
          <p className="mt-1 text-sm text-brand-black/65">
            <span className="font-semibold text-brand-black">Partner 2:</span> Cut kick, back leg round kick, same leg outer crescent kick
          </p>
        </div>
        <div>
          <p className="font-heading text-base text-brand-black">Open Stance</p>
          <p className="mt-1 text-sm text-brand-black/65">
            <span className="font-semibold text-brand-black">Partner 1:</span> Back leg round kick
          </p>
          <p className="mt-1 text-sm text-brand-black/65">
            <span className="font-semibold text-brand-black">Partner 2:</span> Reverse side kick
          </p>
        </div>
      </div>
    </div>
  );
}

function RedOneStepInstructions(): React.ReactElement {
  return (
    <div className="space-y-4">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-black/35">Step-by-Step Instructions</p>
      <div className="space-y-3 rounded-2xl bg-brand-cream/45 p-4">
        <div>
          <p className="font-heading text-base text-brand-black">One-Step #1</p>
          <p className="mt-1 text-sm text-brand-black/65">
            <span className="font-semibold text-brand-black">Partner 1:</span> Back leg round kick
          </p>
          <p className="mt-1 text-sm text-brand-black/65">
            <span className="font-semibold text-brand-black">Partner 2:</span> Side step, triple speed kick (body, body, face)
          </p>
        </div>
        <div>
          <p className="font-heading text-base text-brand-black">One-Step #2</p>
          <p className="mt-1 text-sm text-brand-black/65">
            <span className="font-semibold text-brand-black">Partner 1:</span> Back leg round kick
          </p>
          <p className="mt-1 text-sm text-brand-black/65">
            <span className="font-semibold text-brand-black">Partner 2:</span> Switch legs butterfly double kick
          </p>
        </div>
      </div>
    </div>
  );
}

function OneStepInstructionCard({
  eyebrow,
  title,
  swatch,
  instructions,
}: {
  eyebrow: string;
  title: string;
  swatch: React.ReactNode;
  instructions: React.ReactNode;
}): React.ReactElement {
  return (
    <details className="group overflow-hidden rounded-[1.5rem] bg-white p-1.5 shadow-[0_10px_30px_-12px_rgba(26,26,46,0.12)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] open:shadow-[0_22px_44px_-14px_rgba(26,26,46,0.22)]">
      <summary className="list-none cursor-pointer [&::-webkit-details-marker]:hidden">
        <VideoPlaceholder title="Video Coming Soon" />
        <div className="flex items-center gap-4 px-4 pb-4 pt-5">
          {swatch}
          <div className="min-w-0 flex-1">
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-red/80">{eyebrow}</p>
            <p className="mt-1.5 font-heading text-lg tracking-tight text-brand-black">{title}</p>
            <p className="mt-0.5 text-xs text-brand-black/50">
              Video coming soon. Open for step-by-step instructions.
            </p>
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-cream text-brand-black/35 transition-transform duration-300 group-open:rotate-180">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </summary>
      <div className="border-t border-brand-taupe/10 px-5 pb-5 pt-4 text-sm leading-relaxed text-brand-black/65">
        {instructions}
      </div>
    </details>
  );
}

export default function CurrentCyclePage(): React.ReactElement {
  const currentCycle = getCurrentCycleWindow();
  const currentCycleNumber = cycleNameToNumber(currentCycle.cycle);
  const colorBeltEntries = getColorBeltEntriesForCycle(currentCycleNumber);
  const cycleStatusLabel = currentCycle.status === "active" ? "Active Cycle" : "Upcoming Cycle";
  const cycleSummary =
    currentCycle.status === "active"
      ? currentCycle.nextChangeDate
        ? `${currentCycle.cycle} is active now. The next cycle change is ${formatCycleDate(currentCycle.nextChangeDate)}.`
        : `${currentCycle.cycle} is active now.`
      : `${currentCycle.cycle} starts on ${formatCycleDate(currentCycle.startDate)}.`;

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
        <FloatingSectionNav ariaLabel="Current cycle section navigation" links={sectionLinks} />

        <div className="min-w-0 space-y-14">
          {/* OVERVIEW — dark hero banner */}
          <section id="overview" className="scroll-mt-28 space-y-6">
            <div className="relative overflow-hidden rounded-2xl bg-brand-navy px-8 py-10 sm:px-10 sm:py-12">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-red/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-brand-gold/8 blur-3xl" />

              <div className="relative z-10">
                <EyebrowBadge variant="gold">{cycleStatusLabel}</EyebrowBadge>
                <h1 className="mt-5 font-heading text-3xl tracking-tight text-white sm:text-4xl">
                  {currentCycle.cycle} Materials
                </h1>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-white/50">
                  This shortcut page pulls the active cycle&apos;s practice items into one place so students can quickly review what they should be training right now.
                </p>

                {/* Cycle stats */}
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl bg-white/[0.06] p-4 ring-1 ring-white/[0.08]">
                    <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/30">Status</p>
                    <p className="mt-1.5 font-heading text-lg text-white">{currentCycle.cycle}</p>
                    <p className="mt-0.5 text-xs text-white/40">{cycleSummary}</p>
                  </div>
                  <div className="rounded-xl bg-white/[0.06] p-4 ring-1 ring-white/[0.08]">
                    <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/30">Weapon Focus</p>
                    <p className="mt-1.5 font-heading text-lg text-brand-gold">{currentCycle.weapon}</p>
                    <p className="mt-0.5 text-xs text-white/40">{currentCycle.shortWeapon}</p>
                  </div>
                  <div className="rounded-xl bg-white/[0.06] p-4 ring-1 ring-white/[0.08]">
                    <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/30">Schedule</p>
                    <p className="mt-1.5 text-sm text-white/70">Starts {formatCycleDate(currentCycle.startDate)}</p>
                    <p className="mt-0.5 text-xs text-white/40">
                      {currentCycle.nextChangeDate
                        ? `Next change ${formatCycleDate(currentCycle.nextChangeDate)}`
                        : "No later change date added"}
                    </p>
                  </div>
                </div>

                {/* Quick links */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/members/curriculum/color-belt"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white transition-all duration-300 hover:bg-white/20"
                  >
                    Full color belt curriculum
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* COLOR BELT SECTION */}
          <section id="color-belt" className="scroll-mt-28 space-y-10">
            <SectionHeader
              label="Color Belt"
              title={`${currentCycle.cycle} Overview`}
              description="Each card shows the active cycle requirement for Beginner, Intermediate, and Advanced color belts."
            />

            {/* Overview cards */}
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
              {colorBeltEntries.map((entry) => (
                <ColorBeltOverviewCard key={`${entry.level}-${entry.cycle}`} entry={entry} />
              ))}
            </div>

            {/* Poomsae videos */}
            <div id="poomsae" className="scroll-mt-28 space-y-4">
              <SubSectionHeader title="Poomsae Videos" />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {colorBeltEntries.map((entry) => (
                  <VideoCard
                    key={`color-poomsae-${entry.level}`}
                    eyebrow={`${entry.level} · ${entry.beltName}`}
                    title={entry.poomsaeVideoTitle}
                    subtitle={`Cycle ${entry.cycle} poomsae`}
                    videoId={entry.poomsaeVideoId}
                    swatch={<SwatchCircle swatch={entry.swatch} />}
                  />
                ))}
              </div>
            </div>

            {/* Weapon videos */}
            <div id="weapon" className="scroll-mt-28 space-y-4">
              <SubSectionHeader title="Weapon Videos" />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {colorBeltEntries.map((entry, index) => (
                  <VideoCard
                    key={`color-weapon-${entry.level}`}
                    eyebrow={`${entry.level} · ${entry.beltName}`}
                    title={`${entry.weapon} - Level ${index + 1}`}
                    subtitle={`Cycle ${entry.cycle} weapon training`}
                    videoId={index === 0 ? "GksjgMXonis" : index === 1 ? "GAsGhfs7jqU" : undefined}
                    swatch={<SwatchCircle swatch={entry.swatch} />}
                  />
                ))}
              </div>
            </div>

            {/* One-step videos */}
            <div id="one-step" className="scroll-mt-28 space-y-4">
              <SubSectionHeader title="One-Step Videos" />
              <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
                {colorBeltEntries.map((entry) => (
                  entry.beltName === "Yellow" ? (
                    <OneStepInstructionCard
                      key={`color-one-step-${entry.level}`}
                      eyebrow="Beginner · Yellow"
                      title="Yellow One-Step"
                      swatch={<SwatchCircle swatch={entry.swatch} />}
                      instructions={<YellowOneStepInstructions />}
                    />
                  ) : entry.beltName === "Purple" ? (
                    <OneStepInstructionCard
                      key={`color-one-step-${entry.level}`}
                      eyebrow="Intermediate · Purple"
                      title="Purple One-Step"
                      swatch={<SwatchCircle swatch={entry.swatch} />}
                      instructions={<PurpleOneStepInstructions />}
                    />
                  ) : entry.beltName === "Red" ? (
                    <OneStepInstructionCard
                      key={`color-one-step-${entry.level}`}
                      eyebrow="Advanced · Red"
                      title="Red One-Step"
                      swatch={<SwatchCircle swatch={entry.swatch} />}
                      instructions={<RedOneStepInstructions />}
                    />
                  ) : (
                    <VideoCard
                      key={`color-one-step-${entry.level}`}
                      eyebrow={`${entry.level} · ${entry.beltName}`}
                      title={`${entry.beltName} One-Step`}
                      subtitle={entry.oneStep}
                      swatch={<SwatchCircle swatch={entry.swatch} />}
                    />
                  )
                ))}
              </div>
            </div>

            {/* Hand techniques */}
            <div id="hand-tech" className="scroll-mt-28 space-y-4">
              <SubSectionHeader title="Hand Techniques" />
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {colorBeltEntries.map((entry) => (
                  <RequirementCard
                    key={`color-hand-tech-${entry.level}`}
                    eyebrow={`${entry.level} · ${entry.beltName}`}
                    title="Hand Techniques"
                    value={entry.handTech}
                    swatch={<SwatchCircle swatch={entry.swatch} />}
                  />
                ))}
              </div>
            </div>

            {/* Board breaking */}
            <div id="board-breaking" className="scroll-mt-28 space-y-4">
              <SubSectionHeader title="Board Breaking" />
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {colorBeltEntries.map((entry) => (
                  <RequirementCard
                    key={`color-board-${entry.level}`}
                    eyebrow={`${entry.level} · ${entry.beltName}`}
                    title="Board Breaking"
                    value={entry.board}
                    swatch={<SwatchCircle swatch={entry.swatch} />}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* SCHEDULE — dark section for contrast */}
          <section id="schedule" className="scroll-mt-28">
            <div className="rounded-2xl bg-brand-navy px-8 py-10 sm:px-10">
              <EyebrowBadge variant="gold">2026 Schedule</EyebrowBadge>
              <h2 className="mt-4 font-heading text-2xl tracking-tight text-white sm:text-3xl">
                Saved Cycle Dates
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/40">
                The shortcut page and announcement card follow this schedule automatically.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                {/* Active cycle card (initialCycle or current from schedule) */}
                <div className="rounded-xl bg-brand-gold/10 p-4 ring-1 ring-brand-gold/20">
                  <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/30">
                    {formatCycleDate(currentCycle.startDate)}
                  </p>
                  <h3 className="mt-2 font-heading text-xl text-brand-gold">{currentCycle.cycle}</h3>
                  <p className="mt-1 text-sm text-white/40">{currentCycle.weapon}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-brand-gold/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-gold shadow-[0_0_4px_rgba(196,164,74,0.5)]" />
                    Active now
                  </span>
                </div>
                {/* Next 3 upcoming cycles */}
                {cycleSchedule2026.filter((e) => e.startDate > currentCycle.startDate).slice(0, 3).map((entry) => {
                  return (
                    <div
                      key={`${entry.cycle}-${entry.startDate}`}
                      className="rounded-xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06]"
                    >
                      <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/30">
                        {formatCycleDate(entry.startDate)}
                      </p>
                      <h3 className="mt-2 font-heading text-xl text-white/80">
                        {entry.cycle}
                      </h3>
                      <p className="mt-1 text-sm text-white/40">{entry.weapon}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
