import { createMetadata } from "@/lib/metadata";
import { staticTestimonials } from "@/lib/static-data";
import { PageContainer } from "@/components/ui/page-container";

export const metadata = createMetadata({ title: "Reviews", description: "See what students say about Master Cho's Taekwondo in Lynnwood, WA.", path: "/reviews" });

export default async function ReviewsPage(): Promise<React.ReactElement> {
  return (
    <PageContainer>
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">Wall of Love</p>
        <h1 className="mt-2 font-heading text-4xl text-brand-black sm:text-5xl">Real People, Real Results</h1>
        <p className="mt-3 text-lg text-brand-black/60">See what our students and families have to say</p>
        <p className="mt-4 text-sm text-brand-black/50">
          These quotes come from Google reviews and use abbreviated reviewer names for privacy.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {staticTestimonials.map((t) => (
          <div key={t.id} className="rounded-card bg-brand-cream p-6">
            <div className="text-brand-gold">
              {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-brand-black/80">&ldquo;{t.text}&rdquo;</p>
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-brand-gold">— {t.name}</p>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
