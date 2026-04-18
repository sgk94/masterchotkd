import { createMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";

export const metadata = createMetadata({
  title: "Special Offer",
  description: "Try 2 weeks of taekwondo classes for just $49.",
});

export default function SpecialOfferPage(): React.ReactElement {
  return (
    <PageContainer>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
          Limited Time Offer
        </p>
        <h1 className="mt-2 font-heading text-4xl text-brand-black sm:text-5xl">
          Special Introductory Trial
        </h1>
        <p className="mt-4 text-xl text-brand-black/70">
          2 classes per week for 2 weeks — just{" "}
          <span className="font-bold text-brand-red">$49</span>
        </p>
        <p className="mt-4 leading-relaxed text-brand-black/60">
          Try our Taekwondo classes at no risk. Check out the schedule and
          kickstart your martial arts journey today.
        </p>
        <ul className="mt-6 inline-flex flex-col items-start space-y-2 text-brand-black/70">
          <li className="flex items-center gap-2">
            <span className="text-brand-gold">&#10003;</span> 2 classes per week for 2 weeks
          </li>
          <li className="flex items-center gap-2">
            <span className="text-brand-gold">&#10003;</span> No commitment required
          </li>
          <li className="flex items-center gap-2">
            <span className="text-brand-gold">&#10003;</span> All ages welcome
          </li>
          <li className="flex items-center gap-2">
            <span className="text-brand-gold">&#10003;</span> Equipment provided
          </li>
        </ul>
        <div className="mt-8">
          <Button
            variant="primary"
            href="https://sparkpages.io/cart/2/?i=_hUwb&c=&ocu="
            target="_blank"
            className="group gap-3 px-10 py-4 font-heading text-lg font-semibold uppercase tracking-[0.08em]"
          >
            <span>Buy Now — $49</span>
            <span
              aria-hidden="true"
              className="inline-block translate-x-0 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1"
            >
              →
            </span>
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
