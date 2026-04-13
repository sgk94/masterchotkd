import Link from "next/link";
import { FloatingSectionNav } from "@/components/members/floating-section-nav";
import { VideoPlaceholder, SectionHeader, SubSectionHeader } from "@/components/members/shared";

const camoPattern = "url(/images/camo-pattern.jpg)";

const cycles = [
  { cycle: "White", cycleColor: "#ffffff", textColor: "#1a1a2e", secondaryColor: undefined, border: true, poomsae: "Half Basic", oneStep: "White 1", handTech: "1-6", board: "Hammer Fist" },
  { cycle: "White / Orange", cycleColor: "#FF8C00", textColor: "#FF8C00", secondaryColor: "#ffffff", border: true, poomsae: "Full Basic", oneStep: "White 1-2", handTech: "1-6", board: "Front Kick" },
  { cycle: "Orange", cycleColor: "#FF8C00", textColor: "#FF8C00", secondaryColor: undefined, border: false, poomsae: "Half Taegeuk 1", oneStep: "Orange 1", handTech: "7-12", board: "Knife Hand" },
  { cycle: "Orange / Yellow", cycleColor: "#FACC15", textColor: "#CA8A04", secondaryColor: "#FF8C00", border: false, poomsae: "Full Taegeuk 1", oneStep: "Orange 1-2", handTech: "7-12", board: "Axe Kick" },
  { cycle: "Yellow", cycleColor: "#FACC15", textColor: "#CA8A04", secondaryColor: undefined, border: false, poomsae: "Half Taegeuk 2", oneStep: "Yellow 1", handTech: "13-18", board: "Palm Strike" },
  { cycle: "Yellow / Camo", cycleColor: "#6B8E23", textColor: "#6B8E23", secondaryColor: "#FACC15", border: false, poomsae: "Full Taegeuk 2", oneStep: "Yellow 1-2", handTech: "13-18", board: "Push Kick" },
  { cycle: "Camo", cycleColor: "#6B8E23", textColor: "#6B8E23", secondaryColor: undefined, border: false, poomsae: "Half Taegeuk 3", oneStep: "Camo 1", handTech: "19-24", board: "Side Kick" },
];

const poomsaeVideos = [
  { belt: "White", title: "Half Gibon 1 (Basic)", cycle: "Cycle 1", color: "#ffffff", secondaryColor: undefined, border: true },
  { belt: "White / Orange", title: "Full Gibon 1 (Basic)", cycle: "Cycle 2", color: "#FF8C00", secondaryColor: "#ffffff", border: true },
  { belt: "Orange", title: "Half Taegeuk 1", cycle: "Cycle 3", color: "#FF8C00", secondaryColor: undefined, border: false },
  { belt: "Orange / Yellow", title: "Full Taegeuk 1", cycle: "Cycle 1", color: "#FACC15", secondaryColor: "#FF8C00", border: false },
  { belt: "Yellow", title: "Half Taegeuk 2", cycle: "Cycle 2", color: "#FACC15", secondaryColor: undefined, border: false },
  { belt: "Yellow / Camo", title: "Full Taegeuk 2", cycle: "Cycle 3", color: "#6B8E23", secondaryColor: "#FACC15", border: false },
  { belt: "Camo", title: "Half Taegeuk 3", cycle: "Cycle 1", color: "#6B8E23", secondaryColor: undefined, border: false },
];

const weaponVideos = [
  { title: "Tiny Tigers Bahng Mang Ee", weapon: "Bahng Mang Ee" },
  { title: "Tiny Tigers Jahng Bong", weapon: "Jahng Bong" },
  { title: "Tiny Tigers Sahng Jeol Bong", weapon: "Sahng Jeol Bong" },
];

const sectionLinks = [
  { href: "#curriculum-overview", label: "Curriculum" },
  { href: "#poomsae-videos", label: "Poomsae Videos" },
  { href: "#weapon-videos", label: "Weapon Videos" },
  { href: "#hand-techniques", label: "Hand Techniques" },
  { href: "#board-breaking", label: "Board Breaking" },
  { href: "#resources", label: "Resources" },
];

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
    return { backgroundImage: camoPattern, backgroundSize: "cover", backgroundPosition: "center", border: border ? "2px solid #d4c5b0" : "none" };
  }
  return {
    background: secondaryColor
      ? `linear-gradient(135deg, ${secondaryColor} 0%, ${secondaryColor} 48%, ${color} 52%, ${color} 100%)`
      : color,
    border: border ? "2px solid #d4c5b0" : "none",
  };
}

/* VideoPlaceholder, SectionHeader, SubSectionHeader imported from @/components/members/shared */

export default function TinyTigersCurriculumPage(): React.ReactElement {
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
        <FloatingSectionNav ariaLabel="Tiny Tigers section navigation" links={sectionLinks} />

        <div className="min-w-0 space-y-14">
          {/* HERO — dark navy banner */}
          <section id="curriculum-overview" className="scroll-mt-28 space-y-8">
            <div className="relative overflow-hidden rounded-2xl bg-brand-navy px-8 py-10 sm:px-10 sm:py-12">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-brand-red/8 blur-3xl" />

              <div className="relative z-10">
                <Link href="/members/curriculum" className="inline-flex items-center gap-1.5 text-xs text-white/40 transition-colors hover:text-white/70">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                  Back to Curriculum
                </Link>
                <h1 className="mt-4 font-heading text-3xl tracking-tight text-white sm:text-4xl">
                  Tiny Tiger Curriculum
                </h1>
                <p className="mt-2 text-sm font-medium text-brand-gold">Ages 4-6</p>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-white/50">
                  Complete belt progression from White through Camo — poomsae, one-steps, hand techniques, board breaking, and weapons for every level.
                </p>
              </div>
            </div>

            {/* Belt overview cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {cycles.map((row) => (
                <div
                  key={row.cycle}
                  className="group rounded-2xl bg-white p-6 ring-1 ring-brand-taupe/12 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-brand-taupe/10"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-8 w-8 shrink-0 rounded-full shadow-sm"
                      style={getBeltCircleStyle({
                        color: row.cycleColor,
                        secondaryColor: row.secondaryColor,
                        border: row.border,
                        usesCamo: row.cycle.includes("Camo"),
                      })}
                    />
                    <h3 className="font-heading text-xl" style={{ color: row.textColor }}>
                      {row.cycle}
                    </h3>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {[
                      { label: "Poomsae", value: row.poomsae },
                      { label: "One-Step", value: row.oneStep },
                      { label: "Hand Tech", value: row.handTech },
                      { label: "Board", value: row.board },
                    ].map((req) => (
                      <div key={req.label} className="rounded-lg bg-brand-page-bg/60 px-3 py-2.5">
                        <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-brand-black/30">{req.label}</p>
                        <p className="mt-0.5 text-sm font-medium text-brand-black/70">{req.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {/* Weapons info card */}
              <div className="rounded-2xl bg-brand-navy p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gold/15">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-brand-gold" aria-hidden="true">
                      {/* Left handle — angled */}
                      <rect x="3" y="8" width="3" height="15" rx="1.5" fill="currentColor" transform="rotate(-12 4.5 15.5)" />
                      {/* Right handle — angled opposite */}
                      <rect x="18" y="8" width="3" height="15" rx="1.5" fill="currentColor" transform="rotate(12 19.5 15.5)" />
                      {/* Chain links */}
                      <circle cx="7" cy="5.5" r="1.2" stroke="currentColor" strokeWidth="1" fill="none" />
                      <circle cx="10" cy="4" r="1.2" stroke="currentColor" strokeWidth="1" fill="none" />
                      <circle cx="14" cy="4" r="1.2" stroke="currentColor" strokeWidth="1" fill="none" />
                      <circle cx="17" cy="5.5" r="1.2" stroke="currentColor" strokeWidth="1" fill="none" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-xl text-white">Weapons</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/50">
                  Weapons are based on the current cycle: Bahng Mang Ee, Jahng Bong, or Sahng Jeol Bong.
                </p>
                <p className="mt-3 text-xs text-white/30">
                  Need to purchase a weapon? Ask one of our instructors.
                </p>
              </div>
            </div>
          </section>

          {/* POOMSAE VIDEOS */}
          <section id="poomsae-videos" className="scroll-mt-28 space-y-6">
            <SectionHeader
              label="Video Library"
              title="Poomsae Videos"
              description="Practice each Tiny Tigers form with the matching video for your current cycle."
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {poomsaeVideos.map((video) => (
                <div
                  key={`${video.belt}-${video.title}`}
                  className="group overflow-hidden rounded-2xl bg-white ring-1 ring-brand-taupe/12 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-brand-taupe/10"
                >
                  <VideoPlaceholder title={video.title} />
                  <div className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-7 w-7 shrink-0 rounded-full shadow-sm"
                        style={getBeltCircleStyle({
                          color: video.color,
                          secondaryColor: video.secondaryColor,
                          border: video.border,
                          usesCamo: video.belt.includes("Camo"),
                        })}
                      />
                      <div className="min-w-0">
                        <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-brand-black/35">{video.cycle}</p>
                        <p className="font-heading text-base text-brand-black">{video.belt}</p>
                        <p className="text-xs text-brand-black/45">{video.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* WEAPON VIDEOS */}
          <section id="weapon-videos" className="scroll-mt-28 space-y-6">
            <SectionHeader
              label="Video Library"
              title="Weapon Videos"
              description="Practice Tiny Tigers weapon videos separately from the poomsae lessons."
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {weaponVideos.map((video) => (
                <div
                  key={video.title}
                  className="group overflow-hidden rounded-2xl bg-white ring-1 ring-brand-taupe/12 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-brand-taupe/10"
                >
                  <VideoPlaceholder title={video.title} />
                  <div className="p-4">
                    <p className="font-heading text-base text-brand-black">{video.weapon}</p>
                    <p className="text-xs text-brand-black/45">{video.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* HAND TECHNIQUES */}
          <section id="hand-techniques" className="scroll-mt-28 space-y-6">
            <SectionHeader
              label="Video Library"
              title="Tiny Tigers Hand Techniques"
              description="Keep this section compact by default, then open it to review the Tiny Tigers hand-technique ranges."
            />
            <div className="mt-8 max-w-4xl 2xl:max-w-5xl">
              <div className="group overflow-hidden rounded-2xl bg-white ring-1 ring-brand-taupe/12 transition-shadow duration-300 hover:shadow-md hover:shadow-brand-taupe/8">
                <div className="flex items-center justify-between px-6 py-5">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-red/60">All Cycles</p>
                    <p className="mt-1 font-heading text-lg text-brand-black">Tiny Tigers Hand Techniques</p>
                    <p className="text-sm text-brand-black/50">White through Camo hand-technique ranges</p>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-cream text-brand-black/30 transition-transform duration-300 group-hover:rotate-180">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                  </div>
                </div>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <div className="border-t border-brand-taupe/10 px-6 pb-6 pt-5">
                      <div className="grid gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-start">
                        <VideoPlaceholder title="Hand Techniques" />
                        <div className="grid gap-2.5 sm:grid-cols-2">
                          {[
                            { belt: "White / White-Orange", range: "1-6" },
                            { belt: "Orange / Orange-Yellow", range: "7-12" },
                            { belt: "Yellow / Yellow-Camo", range: "13-18" },
                            { belt: "Camo", range: "19-24" },
                          ].map((item) => (
                            <div key={item.belt} className="rounded-xl bg-brand-page-bg/80 px-4 py-3">
                              <p className="text-xs font-medium text-brand-black/65">{item.belt}</p>
                              <p className="mt-0.5 font-heading text-sm text-brand-black/40">Techniques {item.range}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* BOARD BREAKING */}
          <section id="board-breaking" className="scroll-mt-28 space-y-6">
            <SectionHeader
              label="Requirements"
              title="Board Breaking"
              description="Board-breaking requirement for each Tiny Tigers belt level."
            />
            <div className="mt-8 max-w-4xl 2xl:max-w-5xl">
              <div className="group overflow-hidden rounded-2xl bg-white ring-1 ring-brand-taupe/12 transition-shadow duration-300 hover:shadow-md hover:shadow-brand-taupe/8">
                <div className="flex items-center justify-between px-6 py-5">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-red/60">All Cycles</p>
                    <p className="mt-1 font-heading text-lg text-brand-black">Tiny Tigers Board Breaks</p>
                    <p className="text-sm text-brand-black/50">Board-breaking goals for each Tiny Tigers cycle</p>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-cream text-brand-black/30 transition-transform duration-300 group-hover:rotate-180">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                  </div>
                </div>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <div className="border-t border-brand-taupe/10 px-6 pb-6 pt-5">
                      <div className="grid gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-start">
                        <VideoPlaceholder title="Board Breaking" />
                        <div className="grid gap-2.5 sm:grid-cols-2">
                          {cycles.map((row) => (
                            <div key={row.cycle} className="flex items-center gap-3 rounded-xl bg-brand-page-bg/80 px-4 py-3">
                              <div
                                className="h-6 w-6 shrink-0 rounded-full shadow-sm"
                                style={getBeltCircleStyle({
                                  color: row.cycleColor,
                                  secondaryColor: row.secondaryColor,
                                  border: row.border,
                                  usesCamo: row.cycle.includes("Camo"),
                                })}
                              />
                              <div>
                                <p className="text-xs font-medium text-brand-black/65">{row.cycle}</p>
                                <p className="text-[11px] text-brand-black/40">{row.board}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* RESOURCES — dark section */}
          <section id="resources" className="scroll-mt-28">
            <div className="rounded-2xl bg-brand-navy px-8 py-10 sm:px-10">
              <span className="inline-flex rounded-full border border-brand-gold/20 bg-brand-gold/5 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-gold">
                Resources
              </span>
              <h2 className="mt-4 font-heading text-2xl tracking-tight text-white sm:text-3xl">
                Tiny Tigers Resources
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/40">
                Printable materials and member references.
              </p>

              <div className="mt-8">
                <a
                  href="/student-resources/tiny-tiger-handbook"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-5 rounded-xl bg-white/[0.06] px-6 py-5 ring-1 ring-white/[0.08] transition-all duration-300 hover:bg-white/[0.10] hover:-translate-y-0.5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-gold/10">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand-gold" aria-hidden="true">
                      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M14 2v5h5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9 13h6" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9 17h6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-heading text-lg text-white">Tiny Tigers Handbook</p>
                    <p className="mt-0.5 text-sm text-white/40">Opens PDF in a new tab</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto text-white/30 transition-all duration-300 group-hover:text-brand-gold group-hover:translate-x-0.5" aria-hidden="true">
                    <path d="M7 17L17 7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
