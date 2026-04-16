import { SectionHeader } from "@/components/members/shared";
import { createMetadata } from "@/lib/metadata";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { ResourceCard } from "@/components/members/resource-card";

export const metadata = createMetadata({ title: "Student Resources" });

const resourceCards = [
  {
    title: "Color Belt Handbook",
    description: "Printable handbook for color belt students and families.",
    href: "/student-resources/color-belt-handbook?download=1",
    eyebrow: "Program Packet",
  },
  {
    title: "Tiny Tiger Packet",
    description: "Download the Tiny Tiger handbook and take-home training packet.",
    href: "/student-resources/tiny-tiger-handbook?download=1",
    eyebrow: "Program Packet",
  },
  {
    title: "Red/Black Belt Packet",
    description: "Full printable packet for red belt and black belt preparation.",
    href: "/student-resources/red-black-training-packet?download=1",
    eyebrow: "Program Packet",
  },
] as const;

const stripeRequirementSections = [
  {
    title: "Tiny Tiger Required Sheets",
    eyebrow: "Tiny Tigers",
    description: "Take-home stripe requirement sheets for Tiny Tiger students.",
    cards: [
      {
        title: "Respect Sheet",
        description: "Printable respect practice sheet for Tiny Tigers.",
        href: "/student-resources/respect-sheet?download=1",
        previewImageSrc: "/images/resources/respect-sheet-preview.png",
        eyebrow: "Required Sheet",
      },
      {
        title: "Star Chart",
        description: "Track progress and home practice with the Tiny Tiger star chart.",
        href: "/student-resources/star-chart?download=1",
        previewImageSrc: "/images/resources/star-chart-preview.png",
        eyebrow: "Required Sheet",
      },
    ],
  },
  {
    title: "Color Belt Required Sheets",
    eyebrow: "Color Belt",
    description: "Printable stripe requirement sheets for color belt students.",
    cards: [
      {
        title: "Testing Essay Topics",
        description: "Essay topic handout for color belt testing requirements.",
        href: "/student-resources/testing-essay-topics?download=1",
        previewImageSrc: "/images/resources/testing-essay-topics-preview.png",
        eyebrow: "Required Sheet",
      },
      {
        title: "Reading List",
        description: "Reading tracker sheet for color belt stripe requirements.",
        href: "/student-resources/reading-list?download=1",
        previewImageSrc: "/images/resources/reading-list-preview.png",
        eyebrow: "Required Sheet",
      },
      {
        title: "Monthly Chore Sheet",
        description: "Home responsibility tracker for color belt stripe work.",
        href: "/student-resources/monthly-chore-sheet?download=1",
        previewImageSrc: "/images/resources/monthly-chore-sheet-preview.png",
        eyebrow: "Required Sheet",
      },
    ],
  },
] as const;


export default function ResourcesPage(): React.ReactElement {
  return (
    <div className="space-y-14">
      <section className="relative overflow-hidden rounded-2xl bg-brand-navy px-8 py-10 sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-brand-red/8 blur-3xl" />

        <div className="relative z-10">
          <EyebrowBadge variant="gold">Member Library</EyebrowBadge>
          <h1 className="mt-4 font-heading text-3xl tracking-tight text-white sm:text-4xl">All Resources</h1>
          <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base lg:whitespace-nowrap">
            Program packets, printable handbooks, and stripe sheets for Tiny Tigers, Color Belt, and Red/Black Belt students.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#quick-downloads"
              className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-white/80 transition-colors hover:bg-white/[0.12] hover:text-white"
            >
              Quick Downloads
            </a>
            <a
              href="#tiny-tiger-required-sheets"
              className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-white/80 transition-colors hover:bg-white/[0.12] hover:text-white"
            >
              Tiny Tigers
            </a>
            <a
              href="#color-belt-required-sheets"
              className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-white/80 transition-colors hover:bg-white/[0.12] hover:text-white"
            >
              Color Belts
            </a>
          </div>
        </div>
      </section>

      <section id="quick-downloads">
        <SectionHeader
          label="Program Packets"
          title="Quick Downloads"
          description="Start with the main packet for your program, then use the stripe requirement section below for additional forms."
        />
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {resourceCards.map((card) => (
            <ResourceCard key={card.title} {...card} tone="light" />
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-brand-navy px-8 py-10 sm:px-10">
        <div>
          <EyebrowBadge variant="gold">Required Sheets</EyebrowBadge>
          <h2 className="mt-4 font-heading text-2xl tracking-tight text-white sm:text-3xl">Stripe Requirements</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
            Stripe requirement downloads are grouped by program so families can quickly find the forms that apply to their student.
          </p>
        </div>

        <div className="mt-8 space-y-8">
          {stripeRequirementSections.map((section) => (
            <div
              key={section.title}
              id={section.title === "Tiny Tiger Required Sheets" ? "tiny-tiger-required-sheets" : "color-belt-required-sheets"}
              className="rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/[0.06]"
            >
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-gold/80">{section.eyebrow}</p>
                <h3 className="mt-2 font-heading text-xl text-white">{section.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{section.description}</p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {section.cards.map((card) => (
                  <ResourceCard key={card.title} {...card} tone="dark" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
