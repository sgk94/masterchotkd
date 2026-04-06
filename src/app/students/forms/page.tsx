import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Poomsae Forms" });

const forms = [
  { name: "Kibon Il Jang", level: "White Belt" },
  { name: "Taegeuk Il Jang", level: "Yellow Belt" },
  { name: "Taegeuk Ee Jang", level: "Green Belt" },
  { name: "Taegeuk Sam Jang", level: "Blue Belt" },
  { name: "Taegeuk Sa Jang", level: "Red Belt" },
  { name: "Taegeuk Oh Jang", level: "Red Belt" },
  { name: "Taegeuk Yuk Jang", level: "Red Belt" },
  { name: "Taegeuk Chil Jang", level: "Black Belt" },
  { name: "Taegeuk Pal Jang", level: "Black Belt" },
];

export default function FormsPage(): React.ReactElement {
  return (
    <div>
      <h1 className="font-heading text-3xl text-brand-black">Poomsae Forms</h1>
      <p className="mt-3 text-brand-black/60">Practice videos for each form. Videos load as you scroll.</p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {forms.map((form) => (
          <div key={form.name} className="overflow-hidden rounded-card bg-brand-cream">
            <div className="flex h-48 items-center justify-center bg-brand-sand text-sm text-brand-black/40">Video: {form.name}</div>
            <div className="p-4">
              <h3 className="font-heading text-lg text-brand-black">{form.name}</h3>
              <p className="mt-1 text-xs font-medium text-brand-gold">{form.level}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
