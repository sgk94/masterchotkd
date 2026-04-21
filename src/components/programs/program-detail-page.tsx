import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { BezelCard } from "@/components/ui/bezel-card";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";

type FaqItem = { q: string; a: string };
type WhatToExpectItem = { title: string; description: string };

type ProgramDetailConfig = {
  heroImage: string;
  heroImageAlt: string;
  eyebrowLabel: string;
  title: string;
  description: string;
  whatToExpectHeading: string;
  whatToExpect: WhatToExpectItem[];
  scheduleHeading: string;
  scheduleSubtitle: string;
  schedule: React.ReactNode;
  requirements?: {
    heading: string;
    items: React.ReactNode;
  };
  faqLabel?: string;
  faqHeading?: string;
  faq: FaqItem[];
  ctaHeading?: string;
  ctaDescription?: string;
};

export function ProgramDetailPage({
  heroImage,
  heroImageAlt,
  eyebrowLabel,
  title,
  description,
  whatToExpectHeading,
  whatToExpect,
  scheduleHeading,
  scheduleSubtitle,
  schedule,
  requirements,
  faqLabel = "FAQ",
  faqHeading = "Common Questions",
  faq,
  ctaHeading = "Ready to get started?",
  ctaDescription = "Try 2 weeks of classes for just $49. No commitment required.",
}: ProgramDetailConfig): React.ReactElement {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-[2rem] bg-brand-black">
        <Image
          src={heroImage}
          alt={heroImageAlt}
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />
        <div className="relative z-10 px-8 pb-10 pt-32 sm:px-12 sm:pb-14 sm:pt-40">
          <EyebrowBadge variant="gold">{eyebrowLabel}</EyebrowBadge>
          <h1 className="mt-5 font-heading text-4xl tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-lg leading-relaxed text-white/60">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="primary" href="/special-offer">Start a 2-Week Trial</Button>
            <Button variant="outline" href="/schedule">View Schedule</Button>
          </div>
        </div>
      </div>

      {/* What to Expect */}
      <div className="mt-20">
        <Reveal delay={0}>
          <EyebrowBadge variant="pill">What to Expect</EyebrowBadge>
          <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
            {whatToExpectHeading}
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {whatToExpect.map((item, i) => (
            <Reveal key={item.title} delay={(i + 1) * 100}>
              <BezelCard className="h-full">
                <div className="flex h-full flex-col p-6">
                  <h3 className="font-heading text-lg text-brand-black">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-black/55">{item.description}</p>
                </div>
              </BezelCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Schedule */}
      <div className="mt-20">
        <Reveal delay={0}>
          <EyebrowBadge variant="pill">Class Times</EyebrowBadge>
          <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
            {scheduleHeading}
          </h2>
          <p className="mt-2 text-sm text-brand-black/40">{scheduleSubtitle}</p>
        </Reveal>
        <Reveal delay={100} className="mt-8">
          {schedule}
        </Reveal>
      </div>

      {/* Requirements (optional) */}
      {requirements && (
        <div className="mt-20">
          <Reveal delay={0}>
            <EyebrowBadge variant="pill">Eligibility</EyebrowBadge>
            <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
              {requirements.heading}
            </h2>
          </Reveal>
          <div className="mt-10">{requirements.items}</div>
        </div>
      )}

      {/* FAQ */}
      <div className="mt-20">
        <Reveal delay={0}>
          <EyebrowBadge variant="pill">{faqLabel}</EyebrowBadge>
          <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
            {faqHeading}
          </h2>
        </Reveal>
        <div className="mt-8 flex flex-col gap-4">
          {faq.map((item, i) => (
            <Reveal key={item.q} delay={(i + 1) * 80}>
              <BezelCard>
                <div className="p-6">
                  <h3 className="font-heading text-base text-brand-black">{item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-black/55">{item.a}</p>
                </div>
              </BezelCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <Reveal delay={0} className="mt-20 text-center">
        <h2 className="font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
          {ctaHeading}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-brand-black/50">{ctaDescription}</p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button variant="primary" href="/special-offer">Start Your Trial</Button>
          <Button variant="outline" href="/contact" className="!border-brand-black !text-brand-black hover:!bg-brand-black/5">Contact Us</Button>
        </div>
      </Reveal>
    </div>
  );
}
