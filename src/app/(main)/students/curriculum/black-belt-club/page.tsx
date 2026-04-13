import Link from "next/link";

const beltLevels = [
  { belt: "White Belt", color: "#ffffff", border: true, requirements: ["Basic stances", "Front kick", "Low block", "Kibon Il Jang"] },
  { belt: "Yellow Belt", color: "#FFD700", border: false, requirements: ["Middle block", "Roundhouse kick", "Taegeuk Il Jang", "One-step sparring"] },
  { belt: "Camo Belt", color: "#6B8E23", border: false, requirements: ["Knife hand block", "Back kick basics", "Taegeuk Ee Jang", "Self-defense combinations"] },
  { belt: "Green Belt", color: "#228B22", border: false, requirements: ["Side kick", "High block", "Taegeuk Sam Jang", "Self-defense techniques"] },
  { belt: "Purple Belt", color: "#7B1FA2", border: false, requirements: ["Spinning back kick", "Double roundhouse", "Taegeuk Sa Jang", "Advanced one-step sparring"] },
  { belt: "Blue Belt", color: "#1a1a6e", border: false, requirements: ["Back kick", "Knife hand strike", "Taegeuk Oh Jang", "Board breaking"] },
  { belt: "Brown Belt", color: "#8B4513", border: false, requirements: ["Jump front kick", "Spinning hook kick", "Taegeuk Yuk Jang", "Sparring techniques"] },
  { belt: "Red Belt", color: "#c41e2a", border: false, requirements: ["Spinning kicks", "Advanced forms", "Taegeuk Chil Jang", "Sparring combinations"] },
  { belt: "Black Tip", color: "#1a1a2e", border: false, requirements: ["All previous requirements review", "Taegeuk Pal Jang", "Advanced sparring", "Pre-test preparation"] },
  { belt: "Black Belt", color: "#1a1a2e", border: false, requirements: ["All Taegeuk forms (Il through Pal Jang)", "Advanced sparring and self-defense", "Board breaking (hand and foot techniques)", "Teaching assistance", "Written and physical examination"] },
];

function getBeltDotStyle(level: { belt: string; color: string; border: boolean }): React.CSSProperties {
  if (level.belt === "Camo Belt") {
    return {
      backgroundImage: "url(/images/camo-pattern.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      border: level.border ? "2px solid #d4c5b0" : "none",
    };
  }

  return {
    backgroundColor: level.color,
    border: level.border ? "2px solid #d4c5b0" : "none",
  };
}

export default function BlackBeltClubCurriculumPage(): React.ReactElement {
  return (
    <div>
      <Link href="/members/curriculum" className="text-sm text-brand-red hover:underline">← Back to Curriculum</Link>
      <h1 className="mt-4 font-heading text-3xl text-brand-black">Black Belt Club Curriculum</h1>
      <p className="mt-2 text-sm font-medium text-brand-gold">All ages</p>
      <p className="mt-3 text-brand-black/60">Full belt progression from White Belt through Black Belt.</p>
      <div className="mt-8 space-y-6">
        {beltLevels.map((level) => (
          <div key={level.belt} className="rounded-card bg-brand-cream p-6">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full" style={getBeltDotStyle(level)} />
              <h2 className="font-heading text-xl text-brand-black">{level.belt}</h2>
            </div>
            <ul className="mt-3 ml-9 list-disc space-y-1 text-sm text-brand-black/70">
              {level.requirements.map((req) => (<li key={req}>{req}</li>))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
