import Image from "next/image";
import { createMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";

export const metadata = createMetadata({ title: "About", description: "Learn about Master Cho's Taekwondo — 25+ years in Lynnwood, WA." });

const instructors = [
  {
    name: "Grand Master Cho",
    title: "Founder & Head Instructor",
    description: "Grand Master Cho holds a 9th-degree black belt from Kukkiwon with over 40 years of Taekwondo experience beginning in Korea. He founded Master Cho's Taekwondo over 30 years ago, emphasizing safe, personalized, and quality instruction. His philosophy centers on personal victory — encouraging students to progress at their own pace rather than compete with others.",
    image: "/images/GMC.jpg",
    align: "left" as const,
  },
  {
    name: "Master Joshua Cho",
    title: "Master Instructor",
    description: "Master Joshua Cho trained under Grand Master Cho for over 20 years and holds a 5th-degree black belt with Kukkiwon Master certification. A three-time medalist at the Korean American Sports Festival, he excels in both sparring and poomsae. He serves as a coach and part-time manager, emphasizing perseverance, focus, and confidence in his teaching.",
    image: "/images/MC.jpg",
    align: "right" as const,
  },
  {
    name: "Instructor Daniel Lasala",
    title: "Instructor",
    description: "Instructor Daniel Lasala is a 3rd-degree black belt with eight years of training under Grand Master Cho. He began martial arts at age eight and became a Leadership and Demonstration Team leader, performing at community events. He guides students through tournament competition and serves as a role model helping them gain confidence and achieve their personal goals.",
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
          <p className="mt-4 text-lg leading-relaxed text-brand-black/70">
            For more than 30 years, Grand Master Cho has taught Taekwondo to families in Lynnwood. What started with a handful of students has grown into three generations of families training here. Parents who earned their belts as kids now bring their own children. The school has grown. The approach hasn&apos;t.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-brand-black/70">
            We teach the traditional Korean art with a simple promise: every student trains toward their own personal victory, at their own pace.
          </p>
          <div className="mt-8"><Button variant="primary" href="/special-offer">Start Your Journey</Button></div>
        </div>
        <div className="relative aspect-[6/5] overflow-hidden rounded-card">
          <Image
            src="/images/storefront.webp"
            alt="Master Cho's Taekwondo storefront in Lynnwood, WA"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
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
              <div className="relative aspect-[4/3] overflow-hidden rounded-card lg:[direction:ltr]">
                <Image
                  src={instructor.image}
                  alt={instructor.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </div>

              {/* Bio */}
              <div className="lg:[direction:ltr]">
                <p className="text-xs font-semibold uppercase tracking-[4px] text-brand-gold">
                  {instructor.title}
                </p>
                <h3 className="mt-3 font-heading text-2xl tracking-tight text-brand-black sm:text-3xl">
                  {instructor.name}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-brand-black/60 sm:text-xl">
                  {instructor.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Philosophy */}
      <div className="mt-24 text-center lg:mt-32">
        <h2 className="font-heading text-3xl text-brand-black">More Than The Mat</h2>
        <p className="mx-auto mt-3 text-brand-black/55 leading-relaxed">
          The habits built on the mat travel everywhere else
        </p>
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="rounded-card bg-brand-cream p-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold text-white">★</div>
            <h3 className="font-heading text-lg">Excellence, Earned</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-black/60">
              Three decades of certified black belts trained in Lynnwood. This is where students are trained in the Way of Taekwondo through poomsae, sparring, and hand techniques. Students are not only taught self defense, but how to be a good person and never give up.
            </p>
          </div>
          <div className="rounded-card bg-brand-cream p-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold text-xl text-white">♥</div>
            <h3 className="font-heading text-lg">Home, School, Family</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-black/60">
              Teachers ask parents what changed. Grades shift. Confidence shows up where it didn&apos;t before. The focus, respect, and follow-through built on the mat travels with students everywhere else.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
