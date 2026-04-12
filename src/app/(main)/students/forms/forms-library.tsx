"use client";

type FormCard = {
  belt: string;
  beltDot: string;
  beltDotBorder?: string;
  form: string;
  id: string;
};

type LevelRow = {
  level: string;
  subtitle: string;
  accent: string;
  accentBg: string;
  cards: FormCard[];
};

const cycleHeaders = [
  { title: "Cycle 1" },
  { title: "Cycle 2" },
  { title: "Cycle 3" },
];

const levels: LevelRow[] = [
  {
    level: "Beginner",
    subtitle: "White -> Orange -> Yellow",
    accent: "text-amber-700",
    accentBg: "bg-amber-500/10 ring-amber-500/20",
    cards: [
      {
        belt: "White",
        beltDot: "bg-white",
        beltDotBorder: "ring-1 ring-brand-taupe/50",
        form: "Gibon 1 (Basic)",
        id: "gibon-1-basic",
      },
      {
        belt: "Orange",
        beltDot: "bg-orange-400",
        form: "Taegeuk 1 Jang",
        id: "taegeuk-1-jang",
      },
      {
        belt: "Yellow",
        beltDot: "bg-yellow-400",
        form: "Taegeuk 2 Jang",
        id: "taegeuk-2-jang",
      },
    ],
  },
  {
    level: "Intermediate",
    subtitle: "Camo -> Green -> Purple",
    accent: "text-emerald-700",
    accentBg: "bg-emerald-500/10 ring-emerald-500/20",
    cards: [
      {
        belt: "Camo",
        beltDot: "bg-cover bg-center",
        form: "Taegeuk 3 Jang",
        id: "taegeuk-3-jang",
      },
      {
        belt: "Green",
        beltDot: "bg-green-500",
        form: "Taegeuk 4 Jang",
        id: "taegeuk-4-jang",
      },
      {
        belt: "Purple",
        beltDot: "bg-purple-600",
        form: "Taegeuk 5 Jang",
        id: "taegeuk-5-jang",
      },
    ],
  },
  {
    level: "Advanced",
    subtitle: "Blue -> Brown -> Red",
    accent: "text-blue-700",
    accentBg: "bg-blue-500/10 ring-blue-500/20",
    cards: [
      {
        belt: "Blue",
        beltDot: "bg-blue-600",
        form: "Taegeuk 6 Jang",
        id: "taegeuk-6-jang",
      },
      {
        belt: "Brown",
        beltDot: "bg-yellow-700",
        form: "Taegeuk 7 Jang",
        id: "taegeuk-7-jang",
      },
      {
        belt: "Red",
        beltDot: "bg-red-600",
        form: "Taegeuk 8 Jang",
        id: "taegeuk-8-jang",
      },
    ],
  },
];

export function FormsLibrary(): React.ReactElement {
  return (
    <div>
      <h1 className="font-heading text-3xl text-brand-black">Poomsae Forms</h1>
      <p className="mt-3 max-w-2xl text-brand-black/60">
        Videos are organized the same way as the color belt curriculum. Read each row by skill level and
        each column by cycle.
      </p>

      <div className="mt-8 rounded-[2rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
        <div className="rounded-[calc(2rem-6px)] bg-white p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] sm:p-8">
          <div className="grid gap-3 lg:grid-cols-[220px_repeat(3,minmax(0,1fr))]">
            <div aria-hidden="true" className="hidden lg:block" />

            {cycleHeaders.map((cycle) => (
              <div
                key={cycle.title}
                className="rounded-2xl border border-brand-taupe/20 bg-brand-cream/35 px-5 py-3"
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/30">
                  Column
                </p>
                <h2 className="mt-1 font-heading text-xl tracking-tight text-brand-black">
                  {cycle.title}
                </h2>
              </div>
            ))}

            {levels.map((level) => (
              <div key={level.level} className="contents">
                <div className="rounded-[1.5rem] bg-brand-cream p-5 lg:self-stretch">
                  <div className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] ring-1 ${level.accentBg} ${level.accent}`}>
                    Skill Level
                  </div>
                  <h3 className={`mt-4 font-heading text-2xl tracking-tight ${level.accent}`}>
                    {level.level}
                  </h3>
                  <p className="mt-2 text-sm text-brand-black/45">{level.subtitle}</p>
                </div>

                {level.cards.map((card, index) => (
                  <div
                    key={card.id}
                    id={card.id}
                    className="overflow-hidden rounded-[1.5rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15 scroll-mt-28"
                  >
                    <div className="rounded-[calc(1.5rem-6px)] bg-white">
                      <div className="flex aspect-video items-center justify-center bg-brand-sand text-sm text-brand-black/40">
                        Video: {card.form}
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-7 w-7 rounded-full shadow-sm ${card.beltDot} ${card.beltDotBorder ?? ""}`}
                            style={
                              card.belt === "Camo"
                                ? { backgroundImage: "url(/images/camo-pattern.jpg)" }
                                : undefined
                            }
                          />
                          <div className="min-w-0">
                            <div className="flex items-baseline gap-2">
                              <p className="font-heading text-base text-brand-black">{card.belt}</p>
                              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-brand-black/35">
                                {cycleHeaders[index]?.title}
                              </p>
                            </div>
                            <p className="truncate text-sm font-medium text-brand-black/65">{card.form}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
