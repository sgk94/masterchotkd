import Image from "next/image";
import { createMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";
import { BezelCard } from "@/components/ui/bezel-card";

export const metadata = createMetadata({ title: "About", description: "Learn about Master Cho's Taekwondo — 25+ years in Lynnwood, WA." });

const instructors = [
  {
    name: "Grand Master Cho",
    title: "Founder & Head Instructor",
    description: "With over 25 years of teaching experience, Grand Master Cho has dedicated his life to sharing the art of Taekwondo and developing confident leaders in the Lynnwood community.",
    image: "/images/GMC.jpg",
    align: "left" as const,
  },
  {
    name: "Master Cho",
    title: "Lead Instructor",
    description: "Continuing the family tradition, Master Cho brings a modern approach to traditional Taekwondo, inspiring the next generation of martial artists.",
    image: "/images/MC.jpg",
    align: "right" as const,
  },
  {
    name: "Instructor Lasala",
    title: "Assistant Instructor",
    description: "A dedicated practitioner and mentor, Instructor Lasala helps students of all levels refine their technique and build confidence on and off the mat.",
    image: "/images/Instructor-Lasala.jpg",
    align: "left" as const,
  },
];

export default function AboutPage(): React.ReactElement {
  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <h1 className="font-heading text-4xl text-brand-black sm:text-5xl">About Master Cho&apos;s Taekwondo</h1>
          <p className="mt-4 text-lg leading-relaxed text-brand-black/70">Master Cho&apos;s Taekwondo has been teaching students for over twenty five years, building confident leaders through the traditional art of Taekwondo.</p>
          <p className="mt-4 text-lg leading-relaxed text-brand-black/70">Taekwondo is an ancient sport, originating in Korea thousands of years ago. It emphasizes balance in all things, and particularly encourages personal growth.</p>
          <div className="mt-8"><Button variant="primary" href="/special-offer">Start Your Journey</Button></div>
        </div>
        <div className="relative overflow-hidden rounded-card lg:h-auto">
          <Image
            src="/images/GMC.jpg"
            alt="Grand Master Cho at the dojang"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* Instructors — alternating left/right layout */}
      <div className="mt-24 lg:mt-32">
        <div className="text-center">
          <span className="inline-block rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
            Our Team
          </span>
          <h2 className="mt-5 font-heading text-3xl tracking-tight text-brand-black sm:text-4xl">
            Meet the Instructors
          </h2>
          <p className="mt-3 text-brand-black/50 leading-relaxed">
            Experienced leaders dedicated to your growth
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-20 lg:gap-28">
          {instructors.map((instructor) => (
            <div
              key={instructor.name}
              className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                instructor.align === "right" ? "lg:[direction:rtl]" : ""
              }`}
            >
              {/* Photo */}
              <BezelCard className="lg:[direction:ltr]">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top"
                  />
                </div>
              </BezelCard>

              {/* Bio */}
              <div className="lg:[direction:ltr]">
                <p className="text-xs font-semibold uppercase tracking-[4px] text-brand-gold">
                  {instructor.title}
                </p>
                <h3 className="mt-3 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
                  {instructor.name}
                </h3>
                <p className="mt-4 leading-relaxed text-brand-black/60">
                  {instructor.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Philosophy */}
      <div className="mt-24 text-center lg:mt-32">
        <h2 className="font-heading text-3xl text-brand-black">Our Philosophy</h2>
        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="rounded-card bg-brand-cream p-8"><div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold text-white">★</div><h3 className="font-heading text-lg">Loyalty & Respect</h3><p className="mt-2 text-sm leading-relaxed text-brand-black/60">Teaching students of all ages self-defense and self confidence through the traditional art of Taekwondo.</p></div>
          <div className="rounded-card bg-brand-cream p-8"><div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold text-white">♥</div><h3 className="font-heading text-lg">Home, School & Family</h3><p className="mt-2 text-sm leading-relaxed text-brand-black/60">Our curriculum teaches life skills that help students become confident leaders and responsible members of the community.</p></div>
        </div>
      </div>
    </PageContainer>
  );
}
