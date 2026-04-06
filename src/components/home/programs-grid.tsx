import Link from "next/link";

const programs = [
  { name: "Tiny Tigers", slug: "tiny-tigers", subtitle: "Ages 4-6" },
  { name: "Black Belt Club", slug: "black-belt-club", subtitle: "All ages" },
  {
    name: "Leadership Club",
    slug: "leadership-club",
    subtitle: "Advanced students",
  },
  {
    name: "Competition Team",
    slug: "competition-team",
    subtitle: "Tournament athletes",
  },
];

export function ProgramsGrid(): React.ReactElement {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <h2 className="font-heading text-3xl text-brand-black sm:text-4xl">
        Our Programs
      </h2>
      <p className="mt-2 text-brand-black/60">
        Find the right fit for every age and skill level
      </p>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {programs.map((program) => (
          <Link
            key={program.slug}
            href={`/programs/${program.slug}`}
            className="group relative flex h-64 items-end overflow-hidden rounded-card bg-brand-sand p-6 transition-transform hover:scale-[1.02]"
          >
            <div className="absolute inset-0 bg-brand-sand transition-transform group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/50 to-transparent" />
            <div className="relative z-10">
              <h3 className="font-heading text-2xl text-white">
                {program.name}
              </h3>
              <p className="mt-1 text-sm text-white/80">{program.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
