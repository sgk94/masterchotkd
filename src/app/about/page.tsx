import { createMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/button";

export const metadata = createMetadata({ title: "About", description: "Learn about Master Cho's Taekwondo — 25+ years in Lynnwood, WA." });

export default function AboutPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <h1 className="font-heading text-4xl text-brand-black sm:text-5xl">About Master Cho&apos;s</h1>
          <p className="mt-4 text-lg leading-relaxed text-brand-black/70">Master Cho&apos;s Taekwondo has been teaching students for over twenty five years, building confident leaders through the traditional art of Taekwondo.</p>
          <p className="mt-4 text-lg leading-relaxed text-brand-black/70">Taekwondo is an ancient sport, originating in Korea thousands of years ago. It emphasizes balance in all things, and particularly encourages personal growth.</p>
          <div className="mt-8"><Button variant="primary" href="/special-offer">Start Your Journey</Button></div>
        </div>
        <div className="h-80 rounded-card bg-brand-sand lg:h-auto" />
      </div>
      <div className="mt-20 text-center">
        <h2 className="font-heading text-3xl text-brand-black">Our Philosophy</h2>
        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="rounded-card bg-brand-cream p-8"><div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold text-white">★</div><h3 className="font-heading text-lg">Loyalty & Respect</h3><p className="mt-2 text-sm leading-relaxed text-brand-black/60">Teaching students of all ages self-defense and self confidence through the traditional art of Taekwondo.</p></div>
          <div className="rounded-card bg-brand-cream p-8"><div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold text-white">♥</div><h3 className="font-heading text-lg">Home, School & Family</h3><p className="mt-2 text-sm leading-relaxed text-brand-black/60">Our curriculum teaches life skills that help students become confident leaders and responsible members of the community.</p></div>
        </div>
      </div>
    </div>
  );
}
