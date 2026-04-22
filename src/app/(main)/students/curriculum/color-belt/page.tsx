import { FloatingSectionNav } from "@/components/members/floating-section-nav";
import { SectionChips } from "@/components/members/section-chips";
import { SectionHeader, VideoCard } from "@/components/members/shared";
import { PoomsaeCard } from "@/components/members/poomsae-card";
import { ExpandableCard, ExpandableCardGroup } from "@/components/members/expandable-card";
import { skillLevelPalette } from "@/lib/static-data";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { ResourceCard } from "@/components/members/resource-card";

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
  poomsaeFullName: string;
  poomsaeKorean: string;
  poomsaeIndex: number | null;
  poomsaeVideoId?: string;
  weapon: "BME" | "JB" | "SJB";
  oneStep: string;
  handTech: string;
  board: string;
};

const POOMSAE_TOTAL = 8;
const TOTAL_CYCLES = 3;

type WeaponCard = {
  weapon: "BME" | "JB" | "SJB";
  title: string;
  description: string;
};

const curriculumEntries: CurriculumEntry[] = [
  { level: "Beginner", levelSubtitle: "White -> Orange -> Yellow", levelAccent: skillLevelPalette.beginner.accent, levelAccentBg: skillLevelPalette.beginner.accentBg, cycle: "1", beltName: "White", beltDotClass: "bg-white", beltDotBorder: "ring-1 ring-brand-taupe/60", poomsae: "Basic", poomsaeFullName: "Gibon Il-jang", poomsaeKorean: "기본 일장", poomsaeIndex: null, weapon: "BME", oneStep: "White", handTech: "1-6", board: "Hammer Fist" },
  { level: "Beginner", levelSubtitle: "White -> Orange -> Yellow", levelAccent: skillLevelPalette.beginner.accent, levelAccentBg: skillLevelPalette.beginner.accentBg, cycle: "2", beltName: "Orange", beltDotClass: "bg-orange-400", poomsae: "Taegeuk 1", poomsaeFullName: "Taegeuk Il-jang", poomsaeKorean: "태극 일장", poomsaeIndex: 1, poomsaeVideoId: "n5Q-g0uUj3c", weapon: "JB", oneStep: "Orange", handTech: "7-12", board: "Front Kick" },
  { level: "Beginner", levelSubtitle: "White -> Orange -> Yellow", levelAccent: skillLevelPalette.beginner.accent, levelAccentBg: skillLevelPalette.beginner.accentBg, cycle: "3", beltName: "Yellow", beltDotClass: "bg-yellow-400", poomsae: "Taegeuk 2", poomsaeFullName: "Taegeuk I-jang", poomsaeKorean: "태극 이장", poomsaeIndex: 2, poomsaeVideoId: "EkLZUEBOz0A", weapon: "SJB", oneStep: "Yellow", handTech: "13-18", board: "Knife Hand" },
  { level: "Intermediate", levelSubtitle: "Camo -> Green -> Purple", levelAccent: skillLevelPalette.intermediate.accent, levelAccentBg: skillLevelPalette.intermediate.accentBg, cycle: "1", beltName: "Camo", beltDotClass: "bg-cover bg-center", beltDotStyle: { backgroundImage: camoPattern }, poomsae: "Taegeuk 3", poomsaeFullName: "Taegeuk Sam-jang", poomsaeKorean: "태극 삼장", poomsaeIndex: 3, weapon: "BME", oneStep: "Camo", handTech: "19-24", board: "Round Kick" },
  { level: "Intermediate", levelSubtitle: "Camo -> Green -> Purple", levelAccent: skillLevelPalette.intermediate.accent, levelAccentBg: skillLevelPalette.intermediate.accentBg, cycle: "2", beltName: "Green", beltDotClass: "bg-green-500", poomsae: "Taegeuk 4", poomsaeFullName: "Taegeuk Sa-jang", poomsaeKorean: "태극 사장", poomsaeIndex: 4, weapon: "JB", oneStep: "Green", handTech: "25-30", board: "Palm Strike" },
  { level: "Intermediate", levelSubtitle: "Camo -> Green -> Purple", levelAccent: skillLevelPalette.intermediate.accent, levelAccentBg: skillLevelPalette.intermediate.accentBg, cycle: "3", beltName: "Purple", beltDotClass: "bg-purple-600", poomsae: "Taegeuk 5", poomsaeFullName: "Taegeuk O-jang", poomsaeKorean: "태극 오장", poomsaeIndex: 5, weapon: "SJB", oneStep: "Purple", handTech: "31-36", board: "Side Kick" },
  { level: "Advanced", levelSubtitle: "Blue -> Brown -> Red", levelAccent: skillLevelPalette.advanced.accent, levelAccentBg: skillLevelPalette.advanced.accentBg, cycle: "1", beltName: "Blue", beltDotClass: "bg-blue-600", poomsae: "Taegeuk 6", poomsaeFullName: "Taegeuk Yuk-jang", poomsaeKorean: "태극 육장", poomsaeIndex: 6, weapon: "BME", oneStep: "Blue", handTech: "37-42", board: "Jump Front Kick" },
  { level: "Advanced", levelSubtitle: "Blue -> Brown -> Red", levelAccent: skillLevelPalette.advanced.accent, levelAccentBg: skillLevelPalette.advanced.accentBg, cycle: "2", beltName: "Brown", beltDotClass: "bg-yellow-700", poomsae: "Taegeuk 7", poomsaeFullName: "Taegeuk Chil-jang", poomsaeKorean: "태극 칠장", poomsaeIndex: 7, weapon: "JB", oneStep: "Brown", handTech: "43-48", board: "Jump Round Kick" },
  { level: "Advanced", levelSubtitle: "Blue -> Brown -> Red", levelAccent: skillLevelPalette.advanced.accent, levelAccentBg: skillLevelPalette.advanced.accentBg, cycle: "3", beltName: "Red", beltDotClass: "bg-red-600", poomsae: "Taegeuk 8", poomsaeFullName: "Taegeuk Pal-jang", poomsaeKorean: "태극 팔장", poomsaeIndex: 8, weapon: "SJB", oneStep: "Red", handTech: "49-52", board: "Jump Reverse Side Kick" },
];

const weaponCards: WeaponCard[] = [
  { weapon: "BME", title: "Color Belt Bahng Mahng Ee", description: "Single-stick training for the Color Belt curriculum." },
  { weapon: "JB", title: "Color Belt Jahng Bong", description: "Long-staff training for the Color Belt curriculum." },
  { weapon: "SJB", title: "Color Belt Ssahng Jeol Bong", description: "Nunchuck training for the Color Belt curriculum." },
];

const sectionLinks = [
  { href: "#curriculum-overview", label: "Curriculum" },
  { href: "#poomsae-videos", label: "Poomsae" },
  { href: "#weapon-videos", label: "Weapons" },
  { href: "#one-steps", label: "One-Steps" },
  { href: "#hand-techniques", label: "Hand Tech" },
  { href: "#board-breaking", label: "Breaking" },
  { href: "#resources", label: "Resources" },
];

const cycleHeaders = ["Cycle 1", "Cycle 2", "Cycle 3"];

const overviewLevels = [
  { level: "Beginner", subtitle: "White -> Orange -> Yellow", accent: skillLevelPalette.beginner.accent, accentBg: skillLevelPalette.beginner.accentBg, entries: curriculumEntries.filter((e) => e.level === "Beginner") },
  { level: "Intermediate", subtitle: "Camo -> Green -> Purple", accent: skillLevelPalette.intermediate.accent, accentBg: skillLevelPalette.intermediate.accentBg, entries: curriculumEntries.filter((e) => e.level === "Intermediate") },
  { level: "Advanced", subtitle: "Blue -> Brown -> Red", accent: skillLevelPalette.advanced.accent, accentBg: skillLevelPalette.advanced.accentBg, entries: curriculumEntries.filter((e) => e.level === "Advanced") },
];

const handTechniqueGroups = [
  { level: "Beginner", accent: skillLevelPalette.beginner.accent, accentBg: skillLevelPalette.beginner.accentBg, ranges: ["Cycle 1: 1-6", "Cycle 2: 7-12", "Cycle 3: 13-18"] },
  { level: "Intermediate", accent: skillLevelPalette.intermediate.accent, accentBg: skillLevelPalette.intermediate.accentBg, ranges: ["Cycle 1: 19-24", "Cycle 2: 25-30", "Cycle 3: 31-36"] },
  { level: "Advanced", accent: skillLevelPalette.advanced.accent, accentBg: skillLevelPalette.advanced.accentBg, ranges: ["Cycle 1: 37-42", "Cycle 2: 43-48", "Cycle 3: 49-52"] },
];

const colorBeltResourceGroups = [
  {
    title: "Color Belt Packet",
    description: "Printable handbook for color belt students and families.",
    cards: [
      {
        title: "Color Belt Handbook",
        description: "Core handbook with printable reference material for color belts.",
        href: "/student-resources/color-belt-handbook?download=1",
      },
    ],
  },
  {
    title: "Color Belt Stripe Requirements",
    description: "Required take-home sheets for color belt stripes and testing prep.",
    cards: [
      {
        title: "Testing Essay Topics",
        description: "Essay topic handout for color belt testing requirements.",
        href: "/student-resources/testing-essay-topics?download=1",
      },
      {
        title: "Reading List",
        description: "Reading tracker sheet for color belt stripe requirements.",
        href: "/student-resources/reading-list?download=1",
      },
      {
        title: "Monthly Chore Sheet",
        description: "Home responsibility tracker for color belt stripe work.",
        href: "/student-resources/monthly-chore-sheet?download=1",
      },
    ],
  },
] as const;

function BeltDot({ entry, size = "h-7 w-7" }: { entry: CurriculumEntry; size?: string }): React.ReactElement {
  return <div className={`${size} shrink-0 rounded-full shadow-sm ${entry.beltDotClass} ${entry.beltDotBorder ?? ""}`} style={entry.beltDotStyle} />;
}

function getOverviewCardStyle(entry: CurriculumEntry): { cardBg: string; headerBg: string; borderColor: string } {
  const map: Record<string, { cardBg: string; headerBg: string; borderColor: string }> = {
    White: { cardBg: "#FCFBF8", headerBg: "#F6F2EC", borderColor: "rgba(212,197,176,0.42)" },
    Orange: { cardBg: "#FFF4E8", headerBg: "#FFE8CC", borderColor: "rgba(255,140,0,0.18)" },
    Yellow: { cardBg: "#FFF8DB", headerBg: "#FFF0B5", borderColor: "rgba(250,204,21,0.2)" },
    Camo: { cardBg: "#F3F6EF", headerBg: "#E4ECD7", borderColor: "rgba(107,142,35,0.18)" },
    Green: { cardBg: "#EEF9F1", headerBg: "#D7F1DE", borderColor: "rgba(34,139,34,0.18)" },
    Purple: { cardBg: "#F5EEFF", headerBg: "#EBDDFC", borderColor: "rgba(123,31,162,0.16)" },
    Blue: { cardBg: "#EEF4FF", headerBg: "#DCE8FF", borderColor: "rgba(37,99,235,0.16)" },
    Brown: { cardBg: "#F8F1E8", headerBg: "#ECDDC8", borderColor: "rgba(180,119,0,0.18)" },
    Red: { cardBg: "#FFF0F1", headerBg: "#FFDCDD", borderColor: "rgba(220,38,38,0.16)" },
  };
  return map[entry.beltName] ?? { cardBg: "#FFFFFF", headerBg: "#F8F5F1", borderColor: "rgba(212,197,176,0.32)" };
}




export default function ColorBeltPage(): React.ReactElement {
  return (
    <div>
      {/* Mobile section jump links */}
      <SectionChips links={sectionLinks} />

      <div className="mt-6 lg:mt-0 lg:grid lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-6 xl:grid-cols-[12rem_minmax(0,1fr)] xl:gap-8">
        <FloatingSectionNav ariaLabel="Color Belt section navigation" links={sectionLinks} />

        <div className="min-w-0 space-y-14">
          {/* HERO — dark navy banner */}
          <section id="curriculum-overview" className="scroll-mt-28 space-y-8">
            <div className="relative overflow-hidden rounded-2xl bg-brand-navy px-8 py-10 sm:px-10 sm:py-12">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-brand-red/8 blur-3xl" />
              <div className="relative z-10">
                <h1 className="font-heading text-3xl tracking-tight text-white sm:text-4xl">Color Belt Curriculum</h1>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-white/50">
                  Each level has 3 cycles. Find your current belt and cycle to see your full set of requirements.
                </p>
              </div>
            </div>

            {/* Overview grid — keep original structure with subtle polish */}
            <div className="rounded-2xl bg-white p-5 ring-1 ring-brand-taupe/12 sm:p-6">
              <div className="grid gap-3 lg:grid-cols-[220px_repeat(3,minmax(0,1fr))]">
                <div aria-hidden="true" className="hidden lg:block" />
                {cycleHeaders.map((cycle) => (
                  <div key={cycle} className="rounded-xl bg-brand-page-bg/80 px-5 py-3">
                    <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-brand-black/30">Column</p>
                    <h3 className="mt-1 font-heading text-xl tracking-tight text-brand-black">{cycle}</h3>
                  </div>
                ))}

                {overviewLevels.map((group) => (
                  <div key={group.level} className="contents">
                    <div className="rounded-xl bg-brand-page-bg p-5 lg:self-stretch">
                      <div className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] ring-1 ${group.accentBg} ${group.accent}`}>Skill Level</div>
                      <h3 className={`mt-4 font-heading text-2xl tracking-tight ${group.accent}`}>{group.level}</h3>
                      <p className="mt-2 text-sm text-brand-black/40">{group.subtitle}</p>
                    </div>

                    {group.entries.map((entry) => (
                      <div
                        key={`${entry.level}-${entry.cycle}-${entry.beltName}`}
                        className="overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                        style={{ backgroundColor: getOverviewCardStyle(entry).cardBg, borderColor: getOverviewCardStyle(entry).borderColor }}
                      >
                        <div className="border-b px-4 py-3" style={{ backgroundColor: getOverviewCardStyle(entry).headerBg, borderColor: getOverviewCardStyle(entry).borderColor }}>
                          <div className="flex items-center gap-3">
                            <BeltDot entry={entry} size="h-5 w-5" />
                            <div className="min-w-0">
                              <p className="font-heading text-base text-brand-black">{entry.beltName}</p>
                              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-brand-black/35">Cycle {entry.cycle}</p>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3 px-4 py-4 text-sm text-brand-black/80">
                          {[
                            { label: "Poomsae", value: entry.poomsae },
                            { label: "Weapon", value: entry.weapon },
                            { label: "One-Step", value: entry.oneStep },
                            { label: "Board", value: entry.board },
                          ].map((req) => (
                            <div key={req.label}>
                              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-brand-black/40">{req.label}</p>
                              <p className="mt-1 leading-snug">{req.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* POOMSAE VIDEOS */}
          <section id="poomsae-videos" className="scroll-mt-28 space-y-6">
            <SectionHeader label="Video Library" title="Poomsae Videos" description="Practice the form that matches your current belt and cycle." />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {curriculumEntries.map((entry) => (
                <PoomsaeCard
                  key={`poomsae-${entry.level}-${entry.cycle}`}
                  videoId={entry.poomsaeVideoId}
                  beltName={entry.beltName}
                  beltDotClass={entry.beltDotClass}
                  beltDotStyle={entry.beltDotStyle}
                  beltDotBorder={entry.beltDotBorder}
                  formName={entry.poomsaeFullName}
                  formKorean={entry.poomsaeKorean}
                  formIndex={entry.poomsaeIndex}
                  formTotal={POOMSAE_TOTAL}
                  level={entry.level}
                  cycle={entry.cycle}
                  totalCycles={TOTAL_CYCLES}
                />
              ))}
            </div>
          </section>

          {/* WEAPON VIDEOS */}
          <section id="weapon-videos" className="scroll-mt-28 space-y-6">
            <SectionHeader label="Video Library" title="Weapon Videos" description="Weapons are grouped separately so students can find the correct training weapon faster." />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {weaponCards.map((card) => (
                <VideoCard key={card.weapon} eyebrow={card.weapon} title={card.title} subtitle={card.description} />
              ))}
            </div>
          </section>

          {/* ONE-STEPS */}
          <section id="one-steps" className="scroll-mt-28 space-y-6">
            <SectionHeader label="Video Library" title="One-Steps" description="These stay compact and expand when you hover so there is room for each video later." />
            <ExpandableCardGroup>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {curriculumEntries.map((entry) => (
                  <ExpandableCard
                    key={`one-step-${entry.level}-${entry.cycle}`}
                    id={`one-step-${entry.level}-${entry.cycle}`}
                    eyebrow={`${entry.level} · Cycle ${entry.cycle}`}
                    title={`${entry.beltName} One-Step`}
                    subtitle={entry.oneStep}
                    swatch={<BeltDot entry={entry} />}
                    details={<p>This card will open the {entry.beltName} one-step video once it is added.</p>}
                  />
                ))}
              </div>
            </ExpandableCardGroup>
          </section>

          {/* HAND TECHNIQUES */}
          <section id="hand-techniques" className="scroll-mt-28 space-y-6">
            <SectionHeader label="Video Library" title="Hand Techniques" description="One compact card keeps this section small, then expands to show the full hand-technique breakdown." />
            <ExpandableCardGroup>
              <div className="max-w-5xl">
                <ExpandableCard
                  id="hand-techniques-card"
                  eyebrow="All Levels"
                  title="Color Belt Hand Techniques"
                  subtitle="Beginner, Intermediate, and Advanced ranges"
                  expandedLayout="split"
                  details={
                    <div className="grid gap-3 md:grid-cols-3">
                      {handTechniqueGroups.map((group) => (
                        <div key={group.level} className="flex flex-col items-center rounded-xl bg-brand-page-bg/80 p-4 text-center">
                          <span className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] ring-1 ${group.accentBg} ${group.accent}`}>{group.level}</span>
                          <div className="mt-4 space-y-3 text-sm leading-relaxed text-brand-black/70">
                            {group.ranges.map((range) => <p key={range}>{range}</p>)}
                          </div>
                        </div>
                      ))}
                    </div>
                  }
                />
              </div>
            </ExpandableCardGroup>
          </section>

          {/* BOARD BREAKING */}
          <section id="board-breaking" className="scroll-mt-28 space-y-6">
            <SectionHeader label="Video Library" title="Board Breaking" description="This section stays compact until hover, then expands to show the full board-breaking reference." />
            <ExpandableCardGroup>
              <div className="max-w-5xl">
                <ExpandableCard
                  id="board-breaking-card"
                  eyebrow="All Levels"
                  title="Color Belt Board Breaking"
                  subtitle="All board-breaking requirements"
                  expandedLayout="split"
                  details={
                    <div className="grid gap-2.5 md:grid-cols-3">
                      {curriculumEntries.map((entry) => (
                        <div key={`board-${entry.level}-${entry.cycle}`} className="flex items-center gap-3 rounded-xl bg-brand-page-bg/80 px-4 py-3">
                          <BeltDot entry={entry} size="h-5 w-5" />
                          <div>
                            <p className="text-xs font-medium text-brand-black/65">{entry.beltName}</p>
                            <p className="text-[11px] text-brand-black/40">{entry.board}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  }
                />
              </div>
            </ExpandableCardGroup>
          </section>

          {/* RESOURCES — dark section */}
          <section id="resources" className="scroll-mt-28">
            <div className="rounded-2xl bg-brand-navy px-8 py-10 sm:px-10">
              <EyebrowBadge variant="gold">Resources</EyebrowBadge>
              <h2 className="mt-4 font-heading text-2xl tracking-tight text-white sm:text-3xl">Color Belt Resources</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/40">Printable materials and stripe-requirement downloads for color belt students.</p>

              <div className="mt-8 space-y-8">
                {colorBeltResourceGroups.map((group) => (
                  <div key={group.title}>
                    <div>
                      <h3 className="font-heading text-xl text-white">{group.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/40">{group.description}</p>
                    </div>
                    <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                      {group.cards.map((card) => (
                        <ResourceCard key={card.title} {...card} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
