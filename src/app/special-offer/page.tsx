import { createMetadata } from "@/lib/metadata";
import { TrialForm } from "@/components/forms/trial-form";

export const metadata = createMetadata({
  title: "Special Offer",
  description: "Try 4 weeks of taekwondo classes for just $70.",
});

export default function SpecialOfferPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            Limited Time Offer
          </p>
          <h1 className="mt-2 font-heading text-4xl text-brand-black sm:text-5xl">
            Special Introductory Trial
          </h1>
          <p className="mt-4 text-xl text-brand-black/70">
            4 weeks of taekwondo classes for just{" "}
            <span className="font-bold text-brand-red">$70</span>
          </p>
          <p className="mt-4 leading-relaxed text-brand-black/60">
            Try our Taekwondo classes at no risk. Check out the schedule and
            kickstart your martial arts journey today.
          </p>
          <ul className="mt-6 space-y-2 text-brand-black/70">
            <li className="flex items-center gap-2">
              <span className="text-brand-gold">&#10003;</span> No commitment
              required
            </li>
            <li className="flex items-center gap-2">
              <span className="text-brand-gold">&#10003;</span> All ages welcome
            </li>
            <li className="flex items-center gap-2">
              <span className="text-brand-gold">&#10003;</span> Uniform included
            </li>
          </ul>
        </div>
        <div className="rounded-card bg-brand-cream p-8">
          <h2 className="mb-6 font-heading text-2xl text-brand-black">
            Request More Information
          </h2>
          <TrialForm />
        </div>
      </div>
    </div>
  );
}
