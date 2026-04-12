import Link from "next/link";

const cycles = [
  { cycle: "White", cycleColor: "#1a1a2e", bgColor: "#f5f5f5", border: true, poomsae: "Half Basic", oneStep: "White 1", handTech: "1-6", board: "Hammer Fist" },
  { cycle: "White / Orange", cycleColor: "#FF8C00", bgColor: "#FFF3E0", border: false, poomsae: "Full Basic", oneStep: "White 1-2", handTech: "1-6", board: "Front Kick" },
  { cycle: "Orange", cycleColor: "#FF8C00", bgColor: "#FFE0B2", border: false, poomsae: "Half Taegeuk 1", oneStep: "Orange 1", handTech: "7-12", board: "Knife Hand" },
  { cycle: "Orange / Yellow", cycleColor: "#F9A825", bgColor: "#FFF9C4", border: false, poomsae: "Full Taegeuk 1", oneStep: "Orange 1-2", handTech: "7-12", board: "Axe Kick" },
  { cycle: "Yellow", cycleColor: "#F9A825", bgColor: "#FFF176", border: false, poomsae: "Half Taegeuk 2", oneStep: "Yellow 1", handTech: "13-18", board: "Palm Strike" },
  { cycle: "Yellow / Camo", cycleColor: "#6B8E23", bgColor: "#E8F5E9", border: false, poomsae: "Full Taegeuk 2", oneStep: "Yellow 1-2", handTech: "13-18", board: "Push Kick" },
  { cycle: "Camo", cycleColor: "#6B8E23", bgColor: "#C8E6C9", border: false, poomsae: "Half Taegeuk 3", oneStep: "Camo 1", handTech: "19-24", board: "Side Kick" },
];

export default function TinyTigersCurriculumPage(): React.ReactElement {
  return (
    <div>
      <Link href="/students/curriculum" className="text-sm text-brand-red hover:underline">← Back to Curriculum</Link>
      <h1 className="mt-4 font-heading text-3xl text-brand-black">Tiny Tiger Curriculum</h1>
      <p className="mt-2 text-sm font-medium text-brand-gold">Ages 3-6</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cycles.map((row) => (
          <div
            key={row.cycle}
            className="overflow-hidden rounded-card border border-brand-taupe/30"
            style={{ backgroundColor: row.bgColor }}
          >
            <div className="flex items-center gap-3 border-b border-brand-taupe/30 px-5 py-3">
              <div
                className="h-5 w-5 rounded-full"
                style={{
                  backgroundColor: row.cycleColor,
                  border: row.border ? "2px solid #d4c5b0" : "none",
                }}
              />
              <h3 className="font-heading text-lg" style={{ color: row.cycleColor }}>
                {row.cycle}
              </h3>
            </div>
            <ul className="space-y-2 px-5 py-4 text-sm text-brand-black/70">
              <li className="flex justify-between">
                <span className="font-medium text-brand-black/50">Poomsae</span>
                <span>{row.poomsae}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium text-brand-black/50">One-Step</span>
                <span>{row.oneStep}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium text-brand-black/50">Hand Tech</span>
                <span>{row.handTech}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium text-brand-black/50">Board</span>
                <span>{row.board}</span>
              </li>
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-card bg-brand-cream p-6">
        <h3 className="font-heading text-lg text-brand-black">Weapons</h3>
        <p className="mt-2 text-sm text-brand-black/70">
          Weapons are based on the current cycle. Bahng Mang Ee, Jahng Bong, or Sahng Jeol Bong.
          You can check what the current cycle is on our members only page.
        </p>
        <p className="mt-2 text-sm italic text-brand-black/50">
          Need to purchase a weapon? Ask one of our instructors, and they will assist you!
        </p>
      </div>
    </div>
  );
}
