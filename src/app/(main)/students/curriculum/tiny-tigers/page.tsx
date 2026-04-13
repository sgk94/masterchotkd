import Link from "next/link";

const camoPattern = "url(/images/camo-pattern.jpg)";

const cycles = [
  { cycle: "White", cycleColor: "#ffffff", textColor: "#1a1a2e", bgColor: "#f5f5f5", border: true, poomsae: "Half Basic", oneStep: "White 1", handTech: "1-6", board: "Hammer Fist" },
  { cycle: "White / Orange", cycleColor: "#FF8C00", textColor: "#FF8C00", secondaryColor: "#ffffff", bgColor: "#FFF3E0", border: true, poomsae: "Full Basic", oneStep: "White 1-2", handTech: "1-6", board: "Front Kick" },
  { cycle: "Orange", cycleColor: "#FF8C00", textColor: "#FF8C00", bgColor: "#FFE0B2", border: false, poomsae: "Half Taegeuk 1", oneStep: "Orange 1", handTech: "7-12", board: "Knife Hand" },
  { cycle: "Orange / Yellow", cycleColor: "#FACC15", textColor: "#CA8A04", secondaryColor: "#FF8C00", bgColor: "#FFF9C4", border: false, poomsae: "Full Taegeuk 1", oneStep: "Orange 1-2", handTech: "7-12", board: "Axe Kick" },
  { cycle: "Yellow", cycleColor: "#FACC15", textColor: "#CA8A04", bgColor: "#FFF7BF", border: false, poomsae: "Half Taegeuk 2", oneStep: "Yellow 1", handTech: "13-18", board: "Palm Strike" },
  { cycle: "Yellow / Camo", cycleColor: "#6B8E23", textColor: "#6B8E23", secondaryColor: "#FACC15", bgColor: "#E8F5E9", border: false, poomsae: "Full Taegeuk 2", oneStep: "Yellow 1-2", handTech: "13-18", board: "Push Kick" },
  { cycle: "Camo", cycleColor: "#6B8E23", textColor: "#6B8E23", bgColor: "#C8E6C9", border: false, poomsae: "Half Taegeuk 3", oneStep: "Camo 1", handTech: "19-24", board: "Side Kick" },
];

const poomsaeVideos = [
  { belt: "White", title: "Half Gibon 1 (Basic)", cycle: "Cycle 1", color: "#ffffff", border: true },
  { belt: "White / Orange", title: "Full Gibon 1 (Basic)", cycle: "Cycle 2", color: "#FF8C00", secondaryColor: "#ffffff", border: true },
  { belt: "Orange", title: "Half Taegeuk 1", cycle: "Cycle 3", color: "#FF8C00", border: false },
  { belt: "Orange / Yellow", title: "Full Taegeuk 1", cycle: "Cycle 1", color: "#FACC15", secondaryColor: "#FF8C00", border: false },
  { belt: "Yellow", title: "Half Taegeuk 2", cycle: "Cycle 2", color: "#FACC15", border: false },
  { belt: "Yellow / Camo", title: "Full Taegeuk 2", cycle: "Cycle 3", color: "#6B8E23", secondaryColor: "#FACC15", border: false },
  { belt: "Camo", title: "Half Taegeuk 3", cycle: "Cycle 1", color: "#6B8E23", border: false },
];

const weaponVideos = [
  { title: "Tiny Tigers Bahng Mang Ee", weapon: "Bahng Mang Ee" },
  { title: "Tiny Tigers Jahng Bong", weapon: "Jahng Bong" },
  { title: "Tiny Tigers Sahng Jeol Bong", weapon: "Sahng Jeol Bong" },
];

const tinyTigerHandTechniques = [
  "White / White-Orange: 1-6",
  "Orange / Orange-Yellow: 7-12",
  "Yellow / Yellow-Camo: 13-18",
  "Camo: 19-24",
];

const tinyTigerBoardBreaks = cycles.map((cycle) => ({
  cycle: cycle.cycle,
  board: cycle.board,
  cycleColor: cycle.cycleColor,
  secondaryColor: cycle.secondaryColor,
  border: cycle.border,
}));

function getBeltCircleStyle(options: {
  color: string;
  secondaryColor?: string;
  border?: boolean;
  usesCamo?: boolean;
}): React.CSSProperties {
  const { color, secondaryColor, border, usesCamo } = options;

  if (usesCamo && secondaryColor) {
    return {
      backgroundImage: `linear-gradient(135deg, ${secondaryColor} 0%, ${secondaryColor} 48%, transparent 52%, transparent 100%), ${camoPattern}`,
      backgroundSize: "cover, cover",
      backgroundPosition: "center, center",
      border: border ? "2px solid #d4c5b0" : "none",
    };
  }

  if (usesCamo) {
    return {
      backgroundImage: camoPattern,
      backgroundSize: "cover",
      backgroundPosition: "center",
      border: border ? "2px solid #d4c5b0" : "none",
    };
  }

  return {
    background: secondaryColor
      ? `linear-gradient(135deg, ${secondaryColor} 0%, ${secondaryColor} 48%, ${color} 52%, ${color} 100%)`
      : color,
    border: border ? "2px solid #d4c5b0" : "none",
  };
}

function ExpandableVideoCard({
  eyebrow,
  title,
  subtitle,
  details,
  expandedLayout = "split",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  details: React.ReactNode;
  expandedLayout?: "stack" | "split";
}): React.ReactElement {
  return (
    <div className="group overflow-hidden rounded-[1.5rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
      <div className="rounded-[calc(1.5rem-6px)] bg-white">
        <div className="p-4">
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-brand-black/35">
            {eyebrow}
          </p>
          <p className="mt-1 font-heading text-base text-brand-black">{title}</p>
          <p className="text-sm font-medium text-brand-black/60">{subtitle}</p>
        </div>

        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <div className="border-t border-brand-taupe/15 px-4 pb-4 pt-3">
              <div className={expandedLayout === "split" ? "grid gap-3 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-start" : ""}>
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

export default function TinyTigersCurriculumPage(): React.ReactElement {
  return (
    <div>
      <Link href="/members/curriculum" className="text-sm text-brand-red hover:underline">← Back to Curriculum</Link>
      <h1 className="mt-4 font-heading text-3xl text-brand-black">Tiny Tiger Curriculum</h1>
      <p className="mt-2 text-sm font-medium text-brand-gold">Ages 3-6</p>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        <a
          href="#curriculum-overview"
          className="inline-flex shrink-0 items-center rounded-full border border-brand-taupe/30 bg-brand-cream px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-brand-black/60 transition-colors hover:text-brand-black"
        >
          Curriculum
        </a>
        <a
          href="#poomsae-videos"
          className="inline-flex shrink-0 items-center rounded-full border border-brand-taupe/30 bg-brand-cream px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-brand-black/60 transition-colors hover:text-brand-black"
        >
          Poomsae Videos
        </a>
        <a
          href="#weapon-videos"
          className="inline-flex shrink-0 items-center rounded-full border border-brand-taupe/30 bg-brand-cream px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-brand-black/60 transition-colors hover:text-brand-black"
        >
          Weapon Videos
        </a>
        <a
          href="#hand-techniques"
          className="inline-flex shrink-0 items-center rounded-full border border-brand-taupe/30 bg-brand-cream px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-brand-black/60 transition-colors hover:text-brand-black"
        >
          Hand Techniques
        </a>
        <a
          href="#board-breaking"
          className="inline-flex shrink-0 items-center rounded-full border border-brand-taupe/30 bg-brand-cream px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-brand-black/60 transition-colors hover:text-brand-black"
        >
          Board Breaking
        </a>
        <a
          href="#resources"
          className="inline-flex shrink-0 items-center rounded-full border border-brand-taupe/30 bg-brand-cream px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-brand-black/60 transition-colors hover:text-brand-black"
        >
          Resources
        </a>
      </div>

      <section id="curriculum-overview" className="scroll-mt-28">
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:auto-rows-fr xl:grid-cols-4">
        {cycles.map((row) => (
          <div
            key={row.cycle}
            className="overflow-hidden rounded-card border border-brand-taupe/30 xl:h-full"
            style={{ backgroundColor: row.bgColor }}
          >
            <div className="flex items-center gap-3 border-b border-brand-taupe/30 px-4 py-3">
              <div
                className="h-4 w-4 rounded-full"
                style={getBeltCircleStyle({
                  color: row.cycleColor,
                  secondaryColor: row.secondaryColor,
                  border: row.border,
                  usesCamo: row.cycle.includes("Camo"),
                })}
              />
              <h3
                className="font-heading text-base"
                style={{ color: row.textColor }}
              >
                {row.cycle}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 px-4 py-4 text-sm text-brand-black/70">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-brand-black/40">Poomsae</p>
                <p className="mt-1 leading-snug">{row.poomsae}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-brand-black/40">One-Step</p>
                <p className="mt-1 leading-snug">{row.oneStep}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-brand-black/40">Hand Tech</p>
                <p className="mt-1 leading-snug">{row.handTech}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-brand-black/40">Board</p>
                <p className="mt-1 leading-snug">{row.board}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="rounded-card bg-brand-cream p-5 xl:h-full">
          <div className="flex items-center gap-3">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold/30" />
            <h3 className="font-heading text-base text-brand-black">Weapons</h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-brand-black/70">
            Weapons are based on the current cycle: Bahng Mang Ee, Jahng Bong, or Sahng Jeol Bong.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-brand-black/55">
            Need to purchase a weapon? Ask one of our instructors and they will assist you.
          </p>
        </div>
        </div>
      </section>

      <section id="poomsae-videos" className="mt-12 scroll-mt-28">
        <span className="inline-block rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
          Video Library
        </span>
        <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
          Tiny Tigers Poomsae Videos
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-black/55">
          Practice each Tiny Tigers form with the matching video for your current cycle.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {poomsaeVideos.map((video) => (
            <div
              key={`${video.belt}-${video.title}`}
              className="overflow-hidden rounded-[1.5rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15"
            >
              <div className="rounded-[calc(1.5rem-6px)] bg-white">
                <div className="flex aspect-video items-center justify-center bg-brand-sand text-sm text-brand-black/40">
                  Video: {video.title}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-7 w-7 rounded-full shadow-sm"
                      style={getBeltCircleStyle({
                        color: video.color,
                        secondaryColor: video.secondaryColor,
                        border: video.border,
                        usesCamo: video.belt.includes("Camo"),
                      })}
                    />
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2">
                        <p className="font-heading text-base text-brand-black">{video.belt}</p>
                        <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-brand-black/35">
                          {video.cycle}
                        </p>
                      </div>
                      <p className="truncate text-sm font-medium text-brand-black/65">{video.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="weapon-videos" className="mt-12 scroll-mt-28">
        <span className="inline-block rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
          Video Library
        </span>
        <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
          Tiny Tigers Weapon Videos
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-black/55">
          Practice Tiny Tigers weapon videos separately from the poomsae lessons.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {weaponVideos.map((video) => (
            <div
              key={video.title}
              className="overflow-hidden rounded-[1.5rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15"
            >
              <div className="rounded-[calc(1.5rem-6px)] bg-white">
                <div className="flex aspect-video items-center justify-center bg-brand-sand text-sm text-brand-black/40">
                  Video: {video.title}
                </div>
                <div className="p-4">
                  <div className="min-w-0">
                    <p className="font-heading text-base text-brand-black">{video.weapon}</p>
                    <p className="truncate text-sm font-medium text-brand-black/65">{video.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="hand-techniques" className="mt-12 scroll-mt-28">
        <span className="inline-block rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
          Video Library
        </span>
        <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
          Tiny Tigers Hand Techniques
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-black/55">
          Keep this section compact by default, then open it to review the Tiny Tigers hand-technique ranges.
        </p>

        <div className="mt-8 max-w-5xl">
          <ExpandableVideoCard
            eyebrow="All Cycles"
            title="Tiny Tigers Hand Techniques"
            subtitle="White through Camo hand-technique ranges"
            details={
              <div className="grid gap-3 sm:grid-cols-2">
                {tinyTigerHandTechniques.map((item) => (
                  <div key={item} className="rounded-2xl border border-brand-taupe/15 bg-brand-cream/35 p-4">
                    <p className="text-base leading-relaxed text-brand-black/75">{item}</p>
                  </div>
                ))}
              </div>
            }
          />
        </div>
      </section>

      <section id="board-breaking" className="mt-12 scroll-mt-28">
        <span className="inline-block rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
          Video Library
        </span>
        <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
          Tiny Tigers Board Breaking
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-black/55">
          Open this card to review the Tiny Tigers board-breaking requirement for each cycle.
        </p>

        <div className="mt-8 max-w-5xl">
          <ExpandableVideoCard
            eyebrow="All Cycles"
            title="Tiny Tigers Board Breaks"
            subtitle="Board-breaking goals for each Tiny Tigers cycle"
            details={
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {tinyTigerBoardBreaks.map((item) => (
                  <div key={item.cycle} className="rounded-2xl border border-brand-taupe/15 bg-brand-cream/35 p-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="h-4 w-4 rounded-full shadow-sm"
                        style={getBeltCircleStyle({
                          color: item.cycleColor,
                          secondaryColor: item.secondaryColor,
                          border: item.border,
                          usesCamo: item.cycle.includes("Camo"),
                        })}
                      />
                      <p className="text-sm font-medium text-brand-black">{item.cycle}</p>
                    </div>
                    <p className="mt-2 text-sm leading-snug text-brand-black/65">{item.board}</p>
                  </div>
                ))}
              </div>
            }
          />
        </div>
      </section>

      <section id="resources" className="mt-12 scroll-mt-28">
        <span className="inline-block rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
          Resources
        </span>
        <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
          Tiny Tigers Resources
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-black/55">
          Open printable materials and member references in a new tab.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <a
            href="/student-resources/tiny-tiger-handbook"
            target="_blank"
            rel="noreferrer"
            className="overflow-hidden rounded-[1.5rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15 transition-transform duration-300 hover:-translate-y-0.5"
          >
            <div className="flex h-full flex-col rounded-[calc(1.5rem-6px)] bg-white p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-cream text-brand-black/55">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" />
                  <path d="M14 2v5h5" />
                  <path d="M9 13h6" />
                  <path d="M9 17h6" />
                </svg>
              </div>

              <div className="mt-5">
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-brand-black/35">
                  PDF Resource
                </p>
                <h3 className="mt-2 font-heading text-xl text-brand-black">Handbook</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-black/55">
                  Open the Tiny Tigers handbook in a new browser tab.
                </p>
              </div>

              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-red">
                View handbook
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M7 17L17 7" />
                  <path d="M9 7h8v8" />
                </svg>
              </div>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
