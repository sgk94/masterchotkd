import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { ProgramsGrid } from "@/components/home/programs-grid";
import { TrialBanner } from "@/components/home/trial-banner";
import { Testimonials } from "@/components/home/testimonials";
import { Gallery } from "@/components/home/gallery";
import { BottomCta } from "@/components/home/bottom-cta";
import { Reveal } from "@/components/ui/reveal";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ path: "/" });

export default function HomePage(): React.ReactElement {
  return (
    <>
      <Hero />
      <Marquee />
      <ProgramsGrid />
      <BottomCta />
      <Reveal>
        <TrialBanner />
      </Reveal>
      <Testimonials />
      <Reveal>
        <Gallery />
      </Reveal>
    </>
  );
}
