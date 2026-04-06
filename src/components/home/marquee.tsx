"use client";

const items = [
  "Tiny Tigers",
  "Black Belt Club",
  "Leadership Club",
  "Competition Team",
  "Self-Defense",
  "Discipline",
  "Confidence",
  "Respect",
];

export function Marquee(): React.ReactElement {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-brand-taupe/30 bg-brand-cream py-4">
      <div className="animate-marquee flex w-max gap-8">
        {repeated.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-8 whitespace-nowrap">
            <span className="font-heading text-sm tracking-wide text-brand-black/40 uppercase">
              {item}
            </span>
            <span className="text-brand-gold/40">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 0l1.76 3.57L12 4.16 8.82 7.07l.94 4.93L6 10l-3.76 2 .94-4.93L0 4.16l4.24-.59z" />
              </svg>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
