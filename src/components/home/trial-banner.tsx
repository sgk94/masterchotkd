import { Button } from "@/components/ui/button";

export function TrialBanner(): React.ReactElement {
  return (
    <section className="mx-auto max-w-7xl px-6">
      <div className="relative overflow-hidden rounded-2xl bg-brand-black p-10 sm:p-14">
        {/* Decorative background elements */}
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-red/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="absolute right-12 top-12 h-32 w-32 rounded-full border border-white/[0.04]" />
        <div className="absolute right-20 top-20 h-20 w-20 rounded-full border border-white/[0.06]" />

        <div className="relative z-10 max-w-lg">
          <p className="text-xs font-semibold uppercase tracking-[4px] text-brand-gold">
            Limited time
          </p>
          <h2 className="mt-3 font-heading text-3xl tracking-tight text-white sm:text-4xl">
            4 weeks for just $70
          </h2>
          <p className="mt-4 max-w-md text-white/60 leading-relaxed">
            Try our taekwondo classes at no risk. All ages welcome, uniform included. No commitment required.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="primary" href="/special-offer">
              Claim this offer
            </Button>
            <Button variant="outline" href="/schedule">
              View schedule
            </Button>
          </div>
        </div>

        {/* Price tag */}
        <div className="absolute bottom-8 right-8 hidden items-center justify-center lg:flex">
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-brand-gold/20 bg-brand-gold/5">
            <div className="text-center">
              <span className="block font-heading text-3xl text-brand-gold">$70</span>
              <span className="block text-[10px] uppercase tracking-wider text-white/40">4 weeks</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
