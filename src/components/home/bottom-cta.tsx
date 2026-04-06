import { Button } from "@/components/ui/button";

export function BottomCta(): React.ReactElement {
  return (
    <section className="bg-brand-cream px-6 py-16 text-center">
      <h2 className="font-heading text-2xl text-brand-black sm:text-3xl">
        Special Introductory Trial
      </h2>
      <p className="mt-2 text-brand-black/60">
        4 weeks of taekwondo classes for just $70
      </p>
      <div className="mt-6">
        <Button variant="primary" href="/special-offer">
          Request More Information
        </Button>
      </div>
    </section>
  );
}
