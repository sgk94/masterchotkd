import { createMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/button";

export const metadata = createMetadata({
  title: "Special Offer",
  description: "Try 2 weeks of taekwondo classes for just $49.",
});

const benefits = [
  "2 classes per week for 2 weeks",
  "No commitment required",
  "All ages welcome",
  "Equipment provided",
] as const;

const stripItems = [
  "2 WEEKS",
  "2 CLASSES / WEEK",
  "NO COMMITMENT",
  "ALL AGES",
  "EQUIPMENT PROVIDED",
  "ZERO RISK",
] as const;

function KineticStrip(): React.ReactElement {
  const repeated = Array.from({ length: 4 }, () => stripItems).flat();
  return (
    <div className="relative overflow-hidden border-y border-brand-taupe/30 bg-brand-black py-5">
      <div className="animate-marquee flex w-max gap-10">
        {repeated.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 whitespace-nowrap"
          >
            <span className="font-heading text-sm uppercase tracking-[0.24em] text-white/70">
              {item}
            </span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-gold/80" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SpecialOfferPage(): React.ReactElement {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-12 lg:gap-8 lg:py-28">
          {/* LEFT: content column */}
          <div className="lg:col-span-7">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold">
              Limited Time Offer
            </p>

            <h1 className="mt-6 font-heading text-5xl leading-[0.92] tracking-tight text-brand-black sm:text-6xl lg:text-7xl">
              Step on the mat.
              <br />
              <span className="text-brand-red">Two weeks.</span>
              <br />
              Forty-nine dollars.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-brand-black/65">
              A zero-risk introduction to Master Cho&rsquo;s Taekwondo. Pick
              your classes, grab your gear, show up. We handle the rest.
            </p>

            {/* Benefits as numbered data strip — hairline dividers, not a card */}
            <ol className="mt-12 divide-y divide-brand-taupe/40 border-y border-brand-taupe/40">
              {benefits.map((benefit, i) => {
                const isLast = i === benefits.length - 1;
                return (
                  <li key={benefit} className="flex items-baseline gap-6 py-5">
                    <span className="font-heading text-xs font-semibold tracking-[0.2em] text-brand-black/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-heading text-base uppercase tracking-wide text-brand-black">
                      {benefit}
                      {isLast && (
                        <span
                          aria-hidden="true"
                          className="ml-1 text-brand-red"
                        >
                          *
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ol>
            <p className="mt-3 text-xs text-brand-black/50">
              <span aria-hidden="true" className="text-brand-red">
                *
              </span>{" "}
              Uniform not included.
            </p>
          </div>

          {/* RIGHT: price + CTA column with warm atmospheric glow */}
          <div className="relative flex flex-col items-start justify-center lg:col-span-5 lg:items-end">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(196,164,74,0.18)_0%,transparent_65%)]"
            />

            <div className="flex items-start gap-3 lg:flex-col lg:items-end lg:gap-0">
              <div className="flex items-start leading-none text-brand-red">
                <span className="mt-4 font-heading text-3xl font-semibold sm:text-4xl lg:mt-8 lg:text-5xl">
                  $
                </span>
                <span className="font-heading text-[7rem] font-semibold tracking-[-0.04em] sm:text-[9rem] lg:text-[10.5rem]">
                  49
                </span>
              </div>
            </div>

            <p className="mt-2 font-heading text-xs font-semibold uppercase tracking-[0.32em] text-brand-black/50 lg:self-end">
              / two weeks · all-in
            </p>

            <div className="mt-10 lg:self-end">
              <Button
                variant="primary"
                href="https://sparkpages.io/cart/2/?i=_hUwb&c=&ocu="
                target="_blank"
                className="group animate-offer-glow gap-3 px-10 py-4 font-heading text-lg font-semibold uppercase tracking-[0.08em]"
              >
                <span>Claim trial</span>
                <span
                  aria-hidden="true"
                  className="inline-block translate-x-0 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1"
                >
                  →
                </span>
              </Button>
            </div>

            <p className="mt-5 max-w-xs text-sm leading-snug text-brand-black/50 lg:self-end lg:text-right">
              Cancel anytime inside the two-week window.
              <br />
              No questions, no charges.
            </p>
          </div>
        </div>
      </section>

      <KineticStrip />
    </>
  );
}
