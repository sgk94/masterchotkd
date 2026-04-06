import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Curriculum" });

const beltLevels = [
  { belt: "White Belt", color: "#ffffff", border: true, requirements: ["Basic stances", "Front kick", "Low block", "Kibon Il Jang"] },
  { belt: "Yellow Belt", color: "#FFD700", border: false, requirements: ["Middle block", "Roundhouse kick", "Taegeuk Il Jang", "One-step sparring"] },
  { belt: "Green Belt", color: "#228B22", border: false, requirements: ["Side kick", "High block", "Taegeuk Ee Jang", "Self-defense techniques"] },
  { belt: "Blue Belt", color: "#1a1a6e", border: false, requirements: ["Back kick", "Knife hand strike", "Taegeuk Sam Jang", "Board breaking"] },
  { belt: "Red Belt", color: "#c41e2a", border: false, requirements: ["Spinning kicks", "Advanced forms", "Taegeuk Sa Jang", "Sparring combinations"] },
  { belt: "Black Belt", color: "#1a1a2e", border: false, requirements: ["All previous requirements", "Taegeuk Oh Jang through Pal Jang", "Advanced sparring", "Teaching assistance"] },
];

export default function CurriculumPage(): React.ReactElement {
  return (
    <div>
      <h1 className="font-heading text-3xl text-brand-black">Curriculum & Belt Requirements</h1>
      <p className="mt-3 text-brand-black/60">Review the requirements for each belt level.</p>
      <div className="mt-8 space-y-6">
        {beltLevels.map((level) => (
          <div key={level.belt} className="rounded-card bg-brand-cream p-6">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full" style={{ backgroundColor: level.color, border: level.border ? "2px solid #d4c5b0" : "none" }} />
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
