import { Button } from "@/components/ui/button";

export function TrialBanner(): React.ReactElement {
  return (
    <section className="mx-auto max-w-7xl px-6">
      <div className="flex flex-col items-center gap-6 rounded-card bg-gradient-to-r from-brand-red to-[#8b1520] p-8 sm:flex-row sm:p-12">
        <div className="flex-1 text-center sm:text-left">
          <h2 className="font-heading text-2xl text-white sm:text-3xl">
            Special Introductory Trial
          </h2>
          <p className="mt-2 text-white/90">
            4 weeks of taekwondo classes for just $70. Try at no risk.
          </p>
          <div className="mt-6">
            <Button variant="white" href="/special-offer">
              Get Started
            </Button>
          </div>
        </div>
        <div className="hidden h-40 w-56 items-center justify-center rounded-xl bg-white/15 text-sm text-white/60 sm:flex">
          Trial Photo
        </div>
      </div>
    </section>
  );
}
