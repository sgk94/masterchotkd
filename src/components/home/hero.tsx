import { Button } from "@/components/ui/button";

const ease = "cubic-bezier(0.32, 0.72, 0, 1)";

export function Hero(): React.ReactElement {
  return (
    <section className="relative -mt-16 flex min-h-[100dvh] items-center overflow-hidden bg-brand-navy">
      {/* Video — positioned right, wider so it underlaps the title */}
      <div
        className="absolute inset-y-0 right-0 hidden w-[75%] lg:block"
        style={{
          animation: `hero-video-in 1.2s ${ease} 400ms both`,
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="h-full w-full object-cover"
        >
          {/* media query keeps mobile from fetching the 5.3 MB file */}
          <source media="(min-width: 1024px)" src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Vignette — fades video into the background on all edges */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent" />
      </div>

      {/* Text content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 pt-32 lg:py-40 lg:pt-40">
        <div className="max-w-xl">
          {/* Eyebrow */}
          <div style={{ animation: `fade-up 0.8s ${ease} 200ms both` }}>
            <span className="inline-block rounded-full border border-brand-gold/30 bg-brand-gold/5 px-6 py-2.5 text-sm font-medium uppercase tracking-[3px] text-brand-gold">
              Lynnwood&apos;s premier academy
            </span>
          </div>

          <h1
            className="mt-6 font-heading text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl"
            style={{ animation: `fade-up 0.9s ${ease} 400ms both` }}
          >
            Making a difference, one belt at a time
          </h1>

          <p
            className="mt-6 max-w-lg text-lg leading-relaxed text-white/60 sm:text-xl"
            style={{ animation: `fade-up 0.8s ${ease} 600ms both` }}
          >
            Experience top-notch martial arts and character development for all ages.
          </p>

          <div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            style={{ animation: `fade-up 0.8s ${ease} 800ms both` }}
          >
            <Button variant="primary" href="/special-offer">
              Request info
            </Button>
            <Button variant="outline" href="/schedule">
              View schedule
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ animation: `fade-up 1s ${ease} 1200ms both` }}
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <div className="h-2 w-1 animate-bounce rounded-full bg-white/40" />
        </div>
      </div>
    </section>
  );
}
