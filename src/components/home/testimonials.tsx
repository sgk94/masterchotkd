import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";

export async function Testimonials(): Promise<React.ReactElement> {
  const testimonials = await db.testimonial.findMany({
    where: { featured: true },
    orderBy: { order: "asc" },
    take: 3,
  });

  return (
    <section className="bg-brand-black px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-brand-gold">
            Success Stories
          </p>
          <h2 className="mt-2 font-heading text-3xl text-white sm:text-4xl">
            Real People, Real Results
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.id} className="rounded-xl bg-white/[0.08] p-6">
              <div className="text-brand-gold">
                {"\u2605".repeat(t.rating)}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/90">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="mt-4 text-sm text-brand-gold">&mdash; {t.name}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="outline" href="/reviews">
            See Wall of Love
          </Button>
        </div>
      </div>
    </section>
  );
}
