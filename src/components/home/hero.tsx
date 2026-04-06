import { Button } from "@/components/ui/button";

export function Hero(): React.ReactElement {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-brand-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/60 to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20">
        <div className="max-w-xl">
          <h1 className="font-heading text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            Making a Difference, One Belt at a Time
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-white/80 sm:text-xl">
            Experience top-notch martial arts and character development at
            Lynnwood&apos;s best program.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button variant="primary" href="/special-offer">
              Request Info
            </Button>
            <Button variant="outline" href="/schedule">
              View Schedule
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
