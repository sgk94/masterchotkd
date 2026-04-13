import Link from "next/link";
import { FloatingSectionNav } from "@/components/members/floating-section-nav";
import { cycleSchedule2026, cycleScheduleRevalidateSeconds, formatCycleDate, getCurrentCycleWindow } from "@/lib/current-cycle";
import {
  colorBeltWeaponShortcuts,
  cycleNameToNumber,
  getColorBeltEntriesForCycle,
  getSwatchStyle,
  type BeltSwatch,
  type ColorBeltCycleEntry,
} from "@/lib/current-cycle-materials";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Our Current Cycle Materials" });
export const revalidate = cycleScheduleRevalidateSeconds;

const sectionLinks = [
  { href: "#overview", label: "Overview" },
  { href: "#color-belt", label: "Color Belt" },
  { href: "#schedule", label: "Schedule" },
];

function SectionPill({ label }: { label: string }): React.ReactElement {
  return (
    <span className="inline-block rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
      {label}
    </span>
  );
}

function SwatchCircle({
  swatch,
  size = "h-7 w-7",
}: {
  swatch: BeltSwatch;
  size?: string;
}): React.ReactElement {
  return <div className={`${size} rounded-full shadow-sm`} style={getSwatchStyle(swatch)} />;
}

function VideoShortcutCard({
  eyebrow,
  title,
  subtitle,
  swatch,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  swatch?: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="overflow-hidden rounded-[1.5rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
      <div className="rounded-[calc(1.5rem-6px)] bg-white">
        <div className="flex aspect-video items-center justify-center bg-brand-sand px-4 text-center text-sm text-brand-black/40">
          Video: {title}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3">
            {swatch}
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-brand-black/35">
                {eyebrow}
              </p>
              <p className="mt-1 font-heading text-base text-brand-black">{title}</p>
              <p className="text-sm font-medium text-brand-black/60">{subtitle}</p>
            </div>
          </div>
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
    <div className="rounded-[1.5rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
      <div className="rounded-[calc(1.5rem-6px)] bg-white p-4">
        <div className="flex items-center gap-3">
          {swatch}
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-brand-black/35">
              {eyebrow}
            </p>
            <p className="mt-1 font-heading text-base text-brand-black">{title}</p>
            <p className="text-sm font-medium text-brand-black/60">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ColorBeltOverviewCard({ entry }: { entry: ColorBeltCycleEntry }): React.ReactElement {
  return (
    <div className="overflow-hidden rounded-[1.5rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
      <div className="rounded-[calc(1.5rem-6px)] bg-white">
        <div className="border-b border-brand-taupe/15 bg-brand-cream/35 px-4 py-4">
          <div className="flex items-center gap-3">
            <SwatchCircle swatch={entry.swatch} />
            <div className="min-w-0">
              <p className={`text-[10px] font-medium uppercase tracking-[0.18em] ${entry.levelAccent}`}>
                {entry.level}
              </p>
              <h3 className="mt-1 font-heading text-xl text-brand-black">{entry.beltName}</h3>
              <p className="text-sm text-brand-black/45">{entry.levelSubtitle}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-4 px-4 py-4 text-sm text-brand-black/75">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-brand-black/35">Poomsae</p>
            <p className="mt-1 leading-snug">{entry.poomsae}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-brand-black/35">Weapon</p>
            <p className="mt-1 leading-snug">{entry.weapon}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-brand-black/35">One-Step</p>
            <p className="mt-1 leading-snug">{entry.oneStep}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-brand-black/35">Hand Tech</p>
            <p className="mt-1 leading-snug">{entry.handTech}</p>
          </div>
          <div className="col-span-2">
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-brand-black/35">Board Breaking</p>
            <p className="mt-1 leading-snug">{entry.board}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CurrentCyclePage(): React.ReactElement {
  const currentCycle = getCurrentCycleWindow();
  const currentCycleNumber = cycleNameToNumber(currentCycle.cycle);
  const colorBeltEntries = getColorBeltEntriesForCycle(currentCycleNumber);
  const colorBeltWeapon = colorBeltWeaponShortcuts[currentCycleNumber];
  const cycleStatusLabel = currentCycle.status === "active" ? "Active Cycle" : "Upcoming Cycle";
  const cycleSummary =
    currentCycle.status === "active"
      ? currentCycle.nextChangeDate
        ? `${currentCycle.cycle} is active now. The next cycle change is ${formatCycleDate(currentCycle.nextChangeDate)}.`
        : `${currentCycle.cycle} is active now. Add the next schedule date here whenever you are ready.`
      : `${currentCycle.cycle} starts on ${formatCycleDate(currentCycle.startDate)}. The page will switch automatically once that date arrives.`;

  return (
    <div>
      <div className="mt-6 flex gap-2 overflow-x-auto pb-1 lg:hidden">
        {sectionLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="inline-flex shrink-0 items-center rounded-full border border-brand-taupe/30 bg-brand-cream px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-brand-black/60 transition-colors hover:text-brand-black"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="mt-8 lg:grid lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-6 xl:grid-cols-[12rem_minmax(0,1fr)] xl:gap-8">
        <FloatingSectionNav ariaLabel="Current cycle section navigation" links={sectionLinks} />

        <div className="min-w-0 space-y-12">
          <section id="overview" className="scroll-mt-28">
            <SectionPill label={cycleStatusLabel} />
            <h1 className="mt-5 font-heading text-3xl tracking-tight text-brand-black sm:text-4xl">
              {currentCycle.cycle} Materials
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-black/60">
              This shortcut page pulls the active color belt cycle&apos;s practice items into one place so students can
              quickly review what they should be training right now.
            </p>

            <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
              <div className="rounded-[1.75rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
                <div className="rounded-[calc(1.75rem-6px)] bg-white p-6 sm:p-8">
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-red">{cycleStatusLabel}</p>
                  <h2 className="mt-3 font-heading text-2xl text-brand-black">{currentCycle.cycle}</h2>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-brand-black/65">{cycleSummary}</p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.25rem] bg-brand-cream p-4">
                      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-black/35">
                        Weapon Focus
                      </p>
                      <p className="mt-2 font-heading text-2xl text-brand-black">{currentCycle.weapon}</p>
                      <p className="mt-2 text-sm text-brand-black/50">{currentCycle.shortWeapon}</p>
                    </div>
                    <div className="rounded-[1.25rem] bg-brand-cream p-4">
                      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-black/35">
                        Schedule Window
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-brand-black/65">
                        Starts {formatCycleDate(currentCycle.startDate)}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-brand-black/65">
                        {currentCycle.nextChangeDate
                          ? `Next change ${formatCycleDate(currentCycle.nextChangeDate)}`
                          : "No later 2026 change has been added yet"}
                      </p>
                    </div>
                  </div>

                  <p className="mt-6 text-sm leading-relaxed text-brand-black/55">
                    The requirement cards below are ready for real curriculum video links. Right now they use the
                    same placeholder card style already used elsewhere in the members pages.
                  </p>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-brand-red/10 bg-[linear-gradient(135deg,rgba(196,64,42,0.08),rgba(196,64,42,0.02))] p-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-red">Current Shortcut</p>
                <h2 className="mt-3 font-heading text-2xl text-brand-black">What Students Need</h2>
                <div className="mt-5 space-y-3 text-sm leading-relaxed text-brand-black/65">
                  <p>Poomsae videos for the active cycle</p>
                  <p>Current weapon video</p>
                  <p>One-step requirements by level</p>
                  <p>Hand-technique ranges for this cycle</p>
                  <p>Board-breaking requirements</p>
                  <p>Tiny Tigers stay on their own program, so they are not included here.</p>
                </div>

                <div className="mt-6 rounded-[1.25rem] bg-white/80 px-4 py-4">
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-black/35">
                    Quick Links
                  </p>
                  <div className="mt-3 flex flex-col gap-2 text-sm font-medium text-brand-red">
                    <Link href="/members/curriculum/color-belt" className="hover:underline">
                      Open full color belt curriculum
                    </Link>
                    <Link href="/members/forms" className="hover:underline">
                      Open poomsae forms library
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="color-belt" className="scroll-mt-28">
            <SectionPill label="Color Belt" />
            <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
              Color Belt {currentCycle.cycle} Shortcut
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-brand-black/55">
              Each card below shows the active cycle requirement for Beginner, Intermediate, and Advanced color belts.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 xl:grid-cols-3">
              {colorBeltEntries.map((entry) => (
                <ColorBeltOverviewCard key={`${entry.level}-${entry.cycle}`} entry={entry} />
              ))}
            </div>

            <div className="mt-10">
              <h3 className="font-heading text-xl text-brand-black">Poomsae Videos</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {colorBeltEntries.map((entry) => (
                  <VideoShortcutCard
                    key={`color-poomsae-${entry.level}`}
                    eyebrow={`${entry.level} • ${entry.beltName}`}
                    title={entry.poomsaeVideoTitle}
                    subtitle={`Cycle ${entry.cycle} poomsae`}
                    swatch={<SwatchCircle swatch={entry.swatch} />}
                  />
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-heading text-xl text-brand-black">Weapon Video</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 md:max-w-xl">
                <VideoShortcutCard
                  eyebrow={`All Color Belts • ${currentCycle.cycle}`}
                  title={colorBeltWeapon.title}
                  subtitle={colorBeltWeapon.description}
                />
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-heading text-xl text-brand-black">One-Step Videos</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {colorBeltEntries.map((entry) => (
                  <VideoShortcutCard
                    key={`color-one-step-${entry.level}`}
                    eyebrow={`${entry.level} • ${entry.beltName}`}
                    title={`${entry.beltName} One-Step`}
                    subtitle={entry.oneStep}
                    swatch={<SwatchCircle swatch={entry.swatch} />}
                  />
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-heading text-xl text-brand-black">Hand Techniques</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {colorBeltEntries.map((entry) => (
                  <RequirementCard
                    key={`color-hand-tech-${entry.level}`}
                    eyebrow={`${entry.level} • ${entry.beltName}`}
                    title="Hand Techniques"
                    value={entry.handTech}
                    swatch={<SwatchCircle swatch={entry.swatch} />}
                  />
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-heading text-xl text-brand-black">Board Breaking</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {colorBeltEntries.map((entry) => (
                  <RequirementCard
                    key={`color-board-${entry.level}`}
                    eyebrow={`${entry.level} • ${entry.beltName}`}
                    title="Board Breaking"
                    value={entry.board}
                    swatch={<SwatchCircle swatch={entry.swatch} />}
                  />
                ))}
              </div>
            </div>
          </section>

          <section id="schedule" className="scroll-mt-28">
            <SectionPill label="2026 Schedule" />
            <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
              Saved Cycle Dates
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-black/55">
              Update these dates whenever your next cycle schedule changes. The shortcut page and announcement
              card will follow the same schedule automatically.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {cycleSchedule2026.map((entry) => (
                <div key={`${entry.cycle}-${entry.startDate}`} className="rounded-[1.5rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
                  <div className="rounded-[calc(1.5rem-6px)] bg-white px-4 py-4">
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-black/35">
                      {formatCycleDate(entry.startDate)}
                    </p>
                    <h3 className="mt-2 font-heading text-xl text-brand-black">{entry.cycle}</h3>
                    <p className="mt-1 text-sm text-brand-black/55">{entry.weapon}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
