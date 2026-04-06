import { Hero } from "@/components/home/hero";
import { ProgramsGrid } from "@/components/home/programs-grid";
import { TrialBanner } from "@/components/home/trial-banner";
import { ValuesSection } from "@/components/home/values-section";
import { Testimonials } from "@/components/home/testimonials";
import { Gallery } from "@/components/home/gallery";
import { BottomCta } from "@/components/home/bottom-cta";

export default function HomePage(): React.ReactElement {
  return (
    <>
      <Hero />
      <ProgramsGrid />
      <TrialBanner />
      <ValuesSection />
      <Testimonials />
      <Gallery />
      <BottomCta />
    </>
  );
}
