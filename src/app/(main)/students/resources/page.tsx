import Image from "next/image";
import { SectionHeader } from "@/components/members/shared";
import { createMetadata } from "@/lib/metadata";

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

type ResourceCardProps = {
  title: string;
  description: string;
  href: string;
  eyebrow: string;
  previewImageSrc?: string;
  tone?: "light" | "dark";
};

function ResourceCard({
  title,
  description,
  href,
  eyebrow,
  previewImageSrc,
  tone = "light",
}: ResourceCardProps): React.ReactElement {
  const isDark = tone === "dark";

  return (
    <a
      href={href}
      className={
        isDark
          ? "group flex h-full flex-col rounded-xl bg-white/[0.06] p-4 ring-1 ring-white/[0.08] transition-all duration-300 hover:bg-white/[0.10] hover:-translate-y-0.5"
          : "group flex h-full flex-col rounded-2xl bg-brand-cream p-6 ring-1 ring-brand-taupe/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-sand/70 hover:shadow-md hover:shadow-brand-taupe/10"
      }
    >
      {previewImageSrc ? (
        <div
          className={
            isDark
              ? "relative mb-4 overflow-hidden rounded-lg bg-white shadow-inner"
              : "relative mb-5 overflow-hidden rounded-xl bg-white shadow-inner"
          }
        >
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-brand-navy/30 via-transparent to-white/5" />
          <Image
            src={previewImageSrc}
            alt={`${title} preview`}
            width={700}
            height={900}
            className={isDark ? "h-28 w-full object-cover object-top" : "h-48 w-full object-cover object-top"}
          />
        </div>
      ) : null}

      <div
        className={
          isDark
            ? "flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold"
            : "flex h-11 w-11 items-center justify-center rounded-xl bg-white/80 text-brand-red shadow-sm"
        }
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 2v5h5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 13h6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 17h6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <p
        className={
          isDark
            ? "mt-4 text-[10px] font-medium uppercase tracking-[0.18em] text-brand-gold"
            : "mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-black/40"
        }
      >
        {eyebrow}
      </p>
      <h2 className={isDark ? "mt-2 font-heading text-lg text-white" : "mt-2 font-heading text-xl text-brand-black"}>
        {title}
      </h2>
      <p
        className={
          isDark
            ? "mt-2 text-xs leading-relaxed text-white/65"
            : "mt-2 text-sm leading-relaxed text-brand-black/58"
        }
      >
        {description}
      </p>

      <span
        className={
          isDark
            ? "mt-5 inline-flex items-center gap-2 text-xs font-medium text-brand-gold transition-transform duration-300 group-hover:translate-x-0.5"
            : "mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-red transition-transform duration-300 group-hover:translate-x-0.5"
        }
      >
        Download PDF
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M12 4v11" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m7 11 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}

export default function ResourcesPage(): React.ReactElement {
  return (
    <div className="space-y-14">
      <section className="relative overflow-hidden rounded-2xl bg-brand-navy px-8 py-10 sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-brand-red/8 blur-3xl" />

        <div className="relative z-10">
          <span className="inline-flex rounded-full border border-brand-gold/20 bg-brand-gold/5 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-gold">
            Member Library
          </span>
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
            <ResourceCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-brand-navy px-8 py-10 sm:px-10">
        <div>
          <span className="inline-flex rounded-full border border-brand-gold/20 bg-brand-gold/5 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-gold">
            Required Sheets
          </span>
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
