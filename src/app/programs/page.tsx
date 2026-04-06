import Link from "next/link";
// import { db } from "@/lib/db"; // TODO: re-enable when DB is connected
import { staticPrograms } from "@/lib/static-data";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Programs",
  description: "Explore our martial arts programs for all ages.",
});

export default async function ProgramsPage(): Promise<React.ReactElement> {
  const programs = staticPrograms;

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <h1 className="font-heading text-4xl text-brand-black sm:text-5xl">Our Programs</h1>
      <p className="mt-3 max-w-2xl text-lg text-brand-black/60">
        From our youngest students to competitive athletes, we have a program for every stage of your martial arts journey.
      </p>
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {programs.map((program) => (
          <Link key={program.slug} href={`/programs/${program.slug}`} className="group overflow-hidden rounded-card bg-brand-cream transition-transform hover:scale-[1.01]">
            <div className="h-56 bg-brand-sand" />
            <div className="p-6">
              <h2 className="font-heading text-2xl text-brand-black group-hover:text-brand-red transition-colors">{program.name}</h2>
              <p className="mt-1 text-sm font-medium text-brand-gold">{program.ageRange}</p>
              <p className="mt-3 text-sm leading-relaxed text-brand-black/60">{program.description}</p>
              <span className="mt-4 inline-block text-sm font-medium text-brand-red">Learn More →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
