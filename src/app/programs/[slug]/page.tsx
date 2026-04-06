import { notFound } from "next/navigation";
// import { db } from "@/lib/db"; // TODO: re-enable when DB is connected
import { staticPrograms, staticSchedules } from "@/lib/static-data";
import { createMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

type ProgramPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ProgramPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = staticPrograms.find((p) => p.slug === slug);
  if (!program) return {};
  return createMetadata({ title: program.name, description: program.description });
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return staticPrograms.map((p) => ({ slug: p.slug }));
}

export default async function ProgramPage({ params }: ProgramPageProps): Promise<React.ReactElement> {
  const { slug } = await params;
  const program = staticPrograms.find((p) => p.slug === slug);
  if (!program) notFound();

  const schedules = staticSchedules.filter((s) => s.programId === program.id);
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="h-72 flex-1 rounded-card bg-brand-sand lg:h-96" />
        <div className="flex-1">
          <p className="text-sm font-medium text-brand-gold">{program.ageRange}</p>
          <h1 className="mt-2 font-heading text-4xl text-brand-black sm:text-5xl">{program.name}</h1>
          <p className="mt-4 text-lg leading-relaxed text-brand-black/70">{program.description}</p>
          <div className="mt-8 flex gap-4">
            <Button variant="primary" href="/special-offer">Get Started</Button>
            <Button variant="outline" href="/schedule" className="border-brand-black text-brand-black hover:bg-brand-black/5">View Schedule</Button>
          </div>
        </div>
      </div>
      {schedules.length > 0 && (
        <div className="mt-16">
          <h2 className="font-heading text-2xl text-brand-black">Class Schedule</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {schedules.map((schedule) => (
              <div key={schedule.id} className="rounded-xl bg-brand-cream p-5">
                <p className="font-medium text-brand-black">{dayNames[schedule.dayOfWeek]}</p>
                <p className="mt-1 text-sm text-brand-black/60">{schedule.startTime} – {schedule.endTime}</p>
                <p className="mt-1 text-sm text-brand-gold">{schedule.instructor}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
