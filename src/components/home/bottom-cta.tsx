import { Button } from "@/components/ui/button";

export function BottomCta(): React.ReactElement {
  return (
    <section className="px-6 py-24 lg:py-32">
      {/* Outer shell — double-bezel */}
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/20">
        {/* Inner core */}
        <div className="rounded-[calc(2rem-6px)] bg-brand-cream p-10 text-center sm:p-16">
          <span className="inline-block rounded-full border border-brand-gold/30 bg-brand-gold/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[3px] text-brand-gold">
            Start your journey
          </span>
          <h2 className="mt-5 font-heading text-3xl tracking-tight text-brand-black sm:text-4xl">
            Special introductory trial
          </h2>
          <p className="mx-auto mt-4 max-w-md text-brand-black/50 leading-relaxed">
            2 weeks of taekwondo classes for just $50. No commitment required.
          </p>
          <div className="mt-8">
            <Button variant="primary" href="/special-offer">
              Request more information
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
