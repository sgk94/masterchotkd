import Link from "next/link";

const programs = [
  { name: "Tiny Tigers", slug: "tiny-tigers", subtitle: "Ages 3-6", bg: "from-amber-800/80 to-amber-900/90" },
  { name: "Black Belt Club", slug: "black-belt-club", subtitle: "All ages", bg: "from-brand-blue/80 to-brand-black/90" },
  { name: "Leadership Club", slug: "leadership-club", subtitle: "Advanced students", bg: "from-brand-red/70 to-brand-red/90" },
  { name: "Competition Team", slug: "competition-team", subtitle: "Tournament athletes", bg: "from-brand-gold/70 to-amber-900/90" },
];

export function ProgramsGrid(): React.ReactElement {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
      <div className="max-w-xl">
        <span className="inline-block rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[11px] font-medium uppercase tracking-[3px] text-brand-black/50">
          Programs
        </span>
        <h2 className="mt-5 font-heading text-3xl tracking-tight text-brand-black sm:text-4xl lg:text-5xl">
          Find your path
        </h2>
        <p className="mt-3 text-brand-black/50 leading-relaxed">
          From our youngest students to competitive athletes — a program for every stage
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {programs.map((program) => (
          /* Outer shell — double-bezel */
          <div key={program.slug} className="rounded-[1.5rem] bg-brand-sand/50 p-1.5 ring-1 ring-brand-taupe/20">
            {/* Inner core */}
            <Link
              href={`/programs/${program.slug}`}
              className="group relative flex h-72 items-end overflow-hidden rounded-[calc(1.5rem-6px)] p-7 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${program.bg} transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {/* Inner highlight for glass depth */}
              <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]" />
              <div className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-[-4px]">
                <h3 className="font-heading text-2xl text-white">{program.name}</h3>
                <p className="mt-1 text-sm text-white/60">{program.subtitle}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-white/40 transition-colors duration-500 group-hover:text-brand-gold">
                  Explore
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform duration-500 group-hover:translate-x-1">
                    <path d="M2 6h8M7 3l3 3-3 3" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
