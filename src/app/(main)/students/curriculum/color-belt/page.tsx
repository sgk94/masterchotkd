"use client";

import Link from "next/link";
import { skillLevelPalette } from "@/lib/static-data";

const camoPattern = "url(/images/camo-pattern.jpg)";

type CurriculumEntry = {
  level: "Beginner" | "Intermediate" | "Advanced";
  levelSubtitle: string;
  levelAccent: string;
  levelAccentBg: string;
  cycle: string;
  beltName: string;
  beltDotClass: string;
  beltDotBorder?: string;
  beltDotStyle?: React.CSSProperties;
  poomsae: string;
  weapon: "BME" | "JB" | "SJB";
  oneStep: string;
  handTech: string;
  board: string;
};

type WeaponCard = {
  weapon: "BME" | "JB" | "SJB";
  title: string;
  description: string;
};

const curriculumEntries: CurriculumEntry[] = [
  {
    level: "Beginner",
    levelSubtitle: "White -> Orange -> Yellow",
    levelAccent: skillLevelPalette.beginner.accent,
    levelAccentBg: skillLevelPalette.beginner.accentBg,
    cycle: "1",
    beltName: "White",
    beltDotClass: "bg-white",
    beltDotBorder: "ring-1 ring-brand-taupe/60",
    poomsae: "Basic",
    weapon: "BME",
    oneStep: "White",
    handTech: "1-6",
    board: "Hammer Fist",
  },
  {
    level: "Beginner",
    levelSubtitle: "White -> Orange -> Yellow",
    levelAccent: skillLevelPalette.beginner.accent,
    levelAccentBg: skillLevelPalette.beginner.accentBg,
    cycle: "2",
    beltName: "Orange",
    beltDotClass: "bg-orange-400",
    poomsae: "Taegeuk 1",
    weapon: "JB",
    oneStep: "Orange",
    handTech: "7-12",
    board: "Front Kick",
  },
  {
    level: "Beginner",
    levelSubtitle: "White -> Orange -> Yellow",
    levelAccent: skillLevelPalette.beginner.accent,
    levelAccentBg: skillLevelPalette.beginner.accentBg,
    cycle: "3",
    beltName: "Yellow",
    beltDotClass: "bg-yellow-400",
    poomsae: "Taegeuk 2",
    weapon: "SJB",
    oneStep: "Yellow",
    handTech: "13-18",
    board: "Knife Hand",
  },
  {
    level: "Intermediate",
    levelSubtitle: "Camo -> Green -> Purple",
    levelAccent: skillLevelPalette.intermediate.accent,
    levelAccentBg: skillLevelPalette.intermediate.accentBg,
    cycle: "1",
    beltName: "Camo",
    beltDotClass: "bg-cover bg-center",
    beltDotStyle: { backgroundImage: camoPattern },
    poomsae: "Taegeuk 3",
    weapon: "BME",
    oneStep: "Camo",
    handTech: "19-24",
    board: "Round Kick",
  },
  {
    level: "Intermediate",
    levelSubtitle: "Camo -> Green -> Purple",
    levelAccent: skillLevelPalette.intermediate.accent,
    levelAccentBg: skillLevelPalette.intermediate.accentBg,
    cycle: "2",
    beltName: "Green",
    beltDotClass: "bg-green-500",
    poomsae: "Taegeuk 4",
    weapon: "JB",
    oneStep: "Green",
    handTech: "25-30",
    board: "Palm Strike",
  },
  {
    level: "Intermediate",
    levelSubtitle: "Camo -> Green -> Purple",
    levelAccent: skillLevelPalette.intermediate.accent,
    levelAccentBg: skillLevelPalette.intermediate.accentBg,
    cycle: "3",
    beltName: "Purple",
    beltDotClass: "bg-purple-600",
    poomsae: "Taegeuk 5",
    weapon: "SJB",
    oneStep: "Purple",
    handTech: "31-36",
    board: "Side Kick",
  },
  {
    level: "Advanced",
    levelSubtitle: "Blue -> Brown -> Red",
    levelAccent: skillLevelPalette.advanced.accent,
    levelAccentBg: skillLevelPalette.advanced.accentBg,
    cycle: "1",
    beltName: "Blue",
    beltDotClass: "bg-blue-600",
    poomsae: "Taegeuk 6",
    weapon: "BME",
    oneStep: "Blue",
    handTech: "37-42",
    board: "Jump Front Kick",
  },
  {
    level: "Advanced",
    levelSubtitle: "Blue -> Brown -> Red",
    levelAccent: skillLevelPalette.advanced.accent,
    levelAccentBg: skillLevelPalette.advanced.accentBg,
    cycle: "2",
    beltName: "Brown",
    beltDotClass: "bg-yellow-700",
    poomsae: "Taegeuk 7",
    weapon: "JB",
    oneStep: "Brown",
    handTech: "43-48",
    board: "Jump Round Kick",
  },
  {
    level: "Advanced",
    levelSubtitle: "Blue -> Brown -> Red",
    levelAccent: skillLevelPalette.advanced.accent,
    levelAccentBg: skillLevelPalette.advanced.accentBg,
    cycle: "3",
    beltName: "Red",
    beltDotClass: "bg-red-600",
    poomsae: "Taegeuk 8",
    weapon: "SJB",
    oneStep: "Red",
    handTech: "49-52",
    board: "Jump Reverse Side Kick",
  },
];

const weaponCards: WeaponCard[] = [
  {
    weapon: "BME",
    title: "Color Belt Bahng Mahng Ee",
    description: "Single-stick training for the Color Belt curriculum.",
  },
  {
    weapon: "JB",
    title: "Color Belt Jahng Bong",
    description: "Long-staff training for the Color Belt curriculum.",
  },
  {
    weapon: "SJB",
    title: "Color Belt Ssahng Jeol Bong",
    description: "Nunchuck training for the Color Belt curriculum.",
  },
];

const sectionLinks = [
  { href: "#curriculum-overview", label: "Curriculum" },
  { href: "#poomsae-videos", label: "Poomsae" },
  { href: "#weapon-videos", label: "Weapons" },
  { href: "#one-steps", label: "One-Steps" },
  { href: "#hand-techniques", label: "Hand Techniques" },
  { href: "#board-breaking", label: "Board Breaking" },
  { href: "#resources", label: "Resources" },
];

const cycleHeaders = ["Cycle 1", "Cycle 2", "Cycle 3"];

const overviewLevels = [
  {
    level: "Beginner",
    subtitle: "White -> Orange -> Yellow",
    accent: skillLevelPalette.beginner.accent,
    accentBg: skillLevelPalette.beginner.accentBg,
    entries: curriculumEntries.filter((entry) => entry.level === "Beginner"),
  },
  {
    level: "Intermediate",
    subtitle: "Camo -> Green -> Purple",
    accent: skillLevelPalette.intermediate.accent,
    accentBg: skillLevelPalette.intermediate.accentBg,
    entries: curriculumEntries.filter((entry) => entry.level === "Intermediate"),
  },
  {
    level: "Advanced",
    subtitle: "Blue -> Brown -> Red",
    accent: skillLevelPalette.advanced.accent,
    accentBg: skillLevelPalette.advanced.accentBg,
    entries: curriculumEntries.filter((entry) => entry.level === "Advanced"),
  },
];

const handTechniqueGroups = [
  {
    level: "Beginner",
    accent: skillLevelPalette.beginner.accent,
    accentBg: skillLevelPalette.beginner.accentBg,
    ranges: ["Cycle 1: 1-6", "Cycle 2: 7-12", "Cycle 3: 13-18"],
  },
  {
    level: "Intermediate",
    accent: skillLevelPalette.intermediate.accent,
    accentBg: skillLevelPalette.intermediate.accentBg,
    ranges: ["Cycle 1: 19-24", "Cycle 2: 25-30", "Cycle 3: 31-36"],
  },
  {
    level: "Advanced",
    accent: skillLevelPalette.advanced.accent,
    accentBg: skillLevelPalette.advanced.accentBg,
    ranges: ["Cycle 1: 37-42", "Cycle 2: 43-48", "Cycle 3: 49-52"],
  },
];

function BeltDot({ entry, size = "h-7 w-7" }: { entry: CurriculumEntry; size?: string }): React.ReactElement {
  return (
    <div
      className={`${size} rounded-full shadow-sm ${entry.beltDotClass} ${entry.beltDotBorder ?? ""}`}
      style={entry.beltDotStyle}
    />
  );
}

function SectionPill({ label }: { label: string }): React.ReactElement {
  return (
    <span className="inline-block rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
      {label}
    </span>
  );
}

function getOverviewCardStyle(entry: CurriculumEntry): {
  cardBg: string;
  headerBg: string;
  borderColor: string;
} {
  switch (entry.beltName) {
    case "White":
      return {
        cardBg: "#FCFBF8",
        headerBg: "#F6F2EC",
        borderColor: "rgba(212, 197, 176, 0.42)",
      };
    case "Orange":
      return {
        cardBg: "#FFF4E8",
        headerBg: "#FFE8CC",
        borderColor: "rgba(255, 140, 0, 0.18)",
      };
    case "Yellow":
      return {
        cardBg: "#FFF8DB",
        headerBg: "#FFF0B5",
        borderColor: "rgba(250, 204, 21, 0.2)",
      };
    case "Camo":
      return {
        cardBg: "#F3F6EF",
        headerBg: "#E4ECD7",
        borderColor: "rgba(107, 142, 35, 0.18)",
      };
    case "Green":
      return {
        cardBg: "#EEF9F1",
        headerBg: "#D7F1DE",
        borderColor: "rgba(34, 139, 34, 0.18)",
      };
    case "Purple":
      return {
        cardBg: "#F5EEFF",
        headerBg: "#EBDDFC",
        borderColor: "rgba(123, 31, 162, 0.16)",
      };
    case "Blue":
      return {
        cardBg: "#EEF4FF",
        headerBg: "#DCE8FF",
        borderColor: "rgba(37, 99, 235, 0.16)",
      };
    case "Brown":
      return {
        cardBg: "#F8F1E8",
        headerBg: "#ECDDC8",
        borderColor: "rgba(180, 119, 0, 0.18)",
      };
    case "Red":
      return {
        cardBg: "#FFF0F1",
        headerBg: "#FFDCDD",
        borderColor: "rgba(220, 38, 38, 0.16)",
      };
    default:
      return {
        cardBg: "#FFFFFF",
        headerBg: "#F8F5F1",
        borderColor: "rgba(212, 197, 176, 0.32)",
      };
  }
}

function VideoCard({
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
              <p className="truncate text-sm font-medium text-brand-black/60">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExpandableVideoCard({
  eyebrow,
  title,
  subtitle,
  details,
  swatch,
  expandedLayout = "stack",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  details: React.ReactNode;
  swatch?: React.ReactNode;
  expandedLayout?: "stack" | "split";
}): React.ReactElement {
  return (
    <div className="group overflow-hidden rounded-[1.5rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
      <div className="rounded-[calc(1.5rem-6px)] bg-white">
        <div className="p-4 transition-all duration-300 ease-out group-hover:pb-3 group-focus-within:pb-3">
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

        <div className="grid transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] grid-rows-[0fr]">
          <div className="overflow-hidden">
            <div className="border-t border-brand-taupe/15 px-4 pb-4 pt-3">
              <div className={expandedLayout === "split" ? "grid gap-3 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-start" : ""}>
                <div className="flex aspect-video items-center justify-center rounded-[1rem] bg-brand-sand px-4 text-center text-sm text-brand-black/40">
                  Video area coming soon
                </div>
                <div className={`text-sm text-brand-black/60 ${expandedLayout === "split" ? "" : "mt-3"}`}>
                  {details}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ColorBeltPage(): React.ReactElement {
  return (
    <div>
      <Link href="/students/curriculum" className="text-sm text-brand-red hover:underline">
        ← Back to Curriculum
      </Link>

      <h1 className="mt-4 font-heading text-3xl text-brand-black sm:text-4xl">Color Belt Curriculum</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-black/60">
        Each level has 3 cycles. Use the shortcuts below to jump to the section you want, then find your current
        belt and cycle.
      </p>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
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

      <section id="curriculum-overview" className="mt-8 scroll-mt-28">
        <SectionPill label="Curriculum" />
        <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
          Color Belt Curriculum Overview
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-black/55">
          Review your cycle summary card to quickly see the full set of requirements for that belt level.
        </p>

        <div className="mt-8 rounded-[2rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
          <div className="rounded-[calc(2rem-6px)] bg-white p-5 sm:p-6">
            <div className="grid gap-3 lg:grid-cols-[220px_repeat(3,minmax(0,1fr))]">
              <div aria-hidden="true" className="hidden lg:block" />

              {cycleHeaders.map((cycle) => (
                <div
                  key={cycle}
                  className="rounded-2xl border border-brand-taupe/15 bg-brand-cream/35 px-5 py-3"
                >
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/30">
                    Column
                  </p>
                  <h3 className="mt-1 font-heading text-xl tracking-tight text-brand-black">{cycle}</h3>
                </div>
              ))}

              {overviewLevels.map((group) => (
                <div key={group.level} className="contents">
                  <div className="rounded-[1.5rem] bg-brand-cream p-5 lg:self-stretch">
                    <div className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] ring-1 ${group.accentBg} ${group.accent}`}>
                      Skill Level
                    </div>
                    <h3 className={`mt-4 font-heading text-2xl tracking-tight ${group.accent}`}>
                      {group.level}
                    </h3>
                    <p className="mt-2 text-sm text-brand-black/45">{group.subtitle}</p>
                  </div>

                  {group.entries.map((entry) => (
                    <div
                      key={`${entry.level}-${entry.cycle}-${entry.beltName}`}
                      className="overflow-hidden rounded-[1.5rem] border"
                      style={{
                        backgroundColor: getOverviewCardStyle(entry).cardBg,
                        borderColor: getOverviewCardStyle(entry).borderColor,
                      }}
                    >
                      <div
                        className="border-b px-4 py-3"
                        style={{
                          backgroundColor: getOverviewCardStyle(entry).headerBg,
                          borderColor: getOverviewCardStyle(entry).borderColor,
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <BeltDot entry={entry} size="h-5 w-5" />
                          <div className="min-w-0">
                            <p className="font-heading text-base text-brand-black">{entry.beltName}</p>
                            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-brand-black/35">
                              Cycle {entry.cycle}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-3 px-4 py-4 text-sm text-brand-black/80">
                        <div>
                          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-brand-black/40">Poomsae</p>
                          <p className="mt-1 leading-snug">{entry.poomsae}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-brand-black/40">Weapon</p>
                          <p className="mt-1 leading-snug">{entry.weapon}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-brand-black/40">One-Step</p>
                          <p className="mt-1 leading-snug">{entry.oneStep}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-brand-black/40">Board</p>
                          <p className="mt-1 leading-snug">{entry.board}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="poomsae-videos" className="mt-12 scroll-mt-28">
        <SectionPill label="Video Library" />
        <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">Poomsae Videos</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-black/55">
          Practice the form that matches your current belt and cycle.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {curriculumEntries.map((entry) => (
            <VideoCard
              key={`poomsae-${entry.level}-${entry.cycle}`}
              eyebrow={`${entry.level} • Cycle ${entry.cycle}`}
              title={`${entry.beltName} - ${entry.poomsae}`}
              subtitle="Color Belt Poomsae"
              swatch={<BeltDot entry={entry} />}
            />
          ))}
        </div>
      </section>

      <section id="weapon-videos" className="mt-12 scroll-mt-28">
        <SectionPill label="Video Library" />
        <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">Weapon Videos</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-black/55">
          Weapons are grouped separately so students can find the correct training weapon faster.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {weaponCards.map((card) => (
            <VideoCard
              key={card.weapon}
              eyebrow={card.weapon}
              title={card.title}
              subtitle={card.description}
            />
          ))}
        </div>
      </section>

      <section id="one-steps" className="mt-12 scroll-mt-28">
        <SectionPill label="Video Library" />
        <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">One-Steps</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-black/55">
          These stay compact in the grid and expand when you hover so there is room for each video later.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {curriculumEntries.map((entry) => (
            <ExpandableVideoCard
              key={`one-step-${entry.level}-${entry.cycle}`}
              eyebrow={`${entry.level} • Cycle ${entry.cycle}`}
              title={`${entry.beltName} One-Step`}
              subtitle={entry.oneStep}
              swatch={<BeltDot entry={entry} />}
              details={
                <p>
                  This card will open the {entry.beltName} one-step video once it is added.
                </p>
              }
            />
          ))}
        </div>
      </section>

      <section id="hand-techniques" className="mt-12 scroll-mt-28">
        <SectionPill label="Video Library" />
        <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">Hand Techniques</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-black/55">
          One compact card keeps this section small, then expands to show the full hand-technique breakdown.
        </p>

        <div className="mt-8 max-w-5xl">
          <ExpandableVideoCard
            eyebrow="All Levels"
            title="Color Belt Hand Techniques"
            subtitle="Beginner, Intermediate, and Advanced ranges"
            expandedLayout="split"
            details={
              <div className="grid gap-4 md:grid-cols-3">
                {handTechniqueGroups.map((group) => (
                  <div key={group.level} className="rounded-2xl border border-brand-taupe/15 bg-brand-cream/35 p-4">
                    <span className={`inline-flex rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] ring-1 ${group.accentBg} ${group.accent}`}>
                      {group.level}
                    </span>
                    <div className="mt-4 space-y-3 text-base leading-relaxed text-brand-black/75">
                      {group.ranges.map((range) => (
                        <p key={range}>{range}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            }
          />
        </div>
      </section>

      <section id="board-breaking" className="mt-12 scroll-mt-28">
        <SectionPill label="Video Library" />
        <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">Board Breaking</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-black/55">
          This section stays compact until hover, then expands to show the full board-breaking reference.
        </p>

        <div className="mt-8 max-w-5xl">
          <ExpandableVideoCard
            eyebrow="All Levels"
            title="Color Belt Board Breaking"
            subtitle="All board-breaking requirements"
            expandedLayout="split"
            details={
              <div className="grid gap-3 md:grid-cols-3">
                {curriculumEntries.map((entry) => (
                  <div key={`board-${entry.level}-${entry.cycle}`} className="rounded-2xl border border-brand-taupe/15 bg-brand-cream/35 p-3">
                    <div className="flex items-center gap-2.5">
                      <BeltDot entry={entry} size="h-4 w-4" />
                      <p className="min-w-0 text-sm font-medium text-brand-black">
                        {entry.beltName}
                      </p>
                    </div>
                    <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-brand-black/35">
                      Cycle {entry.cycle}
                    </p>
                    <p className="mt-1 text-sm leading-snug text-brand-black/60">{entry.board}</p>
                  </div>
                ))}
              </div>
            }
          />
        </div>
      </section>

      <section id="resources" className="mt-12 scroll-mt-28">
        <SectionPill label="Resources" />
        <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">Color Belt Resources</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-black/55">
          Extra color belt resources can be added here as they become available.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="overflow-hidden rounded-[1.5rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
            <div className="flex h-full flex-col rounded-[calc(1.5rem-6px)] bg-white p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-cream text-brand-black/45">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
              </div>
              <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.15em] text-brand-black/35">
                Coming Soon
              </p>
              <h3 className="mt-2 font-heading text-xl text-brand-black">More Resources</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-black/55">
                Handouts, downloads, and other member materials can be added here later.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
