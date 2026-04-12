// import { db } from "@/lib/db"; // TODO: re-enable when DB is connected
import { staticTestimonials } from "@/lib/static-data";
import { createMetadata } from "@/lib/metadata";
import { PageContainer } from "@/components/ui/page-container";

export const metadata = createMetadata({ title: "Reviews", description: "See what students say about Master Cho's Taekwondo." });

export default async function ReviewsPage(): Promise<React.ReactElement> {
  const testimonials = staticTestimonials;
  return (
    <PageContainer>
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">Wall of Love</p>
        <h1 className="mt-2 font-heading text-4xl text-brand-black sm:text-5xl">Real People, Real Results</h1>
        <p className="mt-3 text-lg text-brand-black/60">See what our students and families have to say</p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-card bg-brand-cream p-6">
            <div className="text-brand-gold">{"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</div>
            <p className="mt-3 text-sm leading-relaxed text-brand-black/80">&ldquo;{t.text}&rdquo;</p>
            <p className="mt-4 text-sm font-medium text-brand-gold">— {t.name}</p>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
