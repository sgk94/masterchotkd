import Link from "next/link";
import { FloatingSectionNav } from "@/components/members/floating-section-nav";
import { SectionHeader } from "@/components/members/shared";
import { createMetadata } from "@/lib/metadata";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";

export const metadata = createMetadata({ title: "Preparing for Black Belt" });

const sectionLinks = [
  { href: "#overview", label: "Overview" },
  { href: "#faq", label: "FAQ" },
  { href: "#testing-requirements", label: "Requirements" },
  { href: "#written-test", label: "Written Test" },
  { href: "#resources", label: "Resources" },
];

const faqItems = [
  {
    question: "What is the best way to prepare for black belt testing?",
    answer:
      "Use the members page and video library as your main study tools, then follow the packet as the printable source of truth for black belt prep.",
  },
  {
    question: "What are the midterm tests for?",
    answer:
      "Midterm tests measure readiness, sharpen performance, and help confirm that a student is on track before first-degree black belt testing.",
  },
  {
    question: "Which requirements should I follow?",
    answer:
      "Always follow the current packet and instructor guidance. Do not rely on older testing advice or secondhand information from past cycles.",
  },
  {
    question: "What makes the black belt exam official?",
    answer:
      "For first degree, Kukkiwon certification is required. After passing and receiving your Kukkiwon certificate, you become a registered black belt.",
  },
  {
    question: "Can I be held back or retest later?",
    answer:
      "Yes. If a student is not ready, they can be held back until the next exam cycle, and there is no make-up date for the black belt test.",
  },
  {
    question: "When is black belt promotion testing held?",
    answer:
      "After passing 3 required midterms, students may be invited to black belt promotion testing, which is typically held twice a year in summer and winter.",
  },
  {
    question: "When do I receive my belt and certificate?",
    answer:
      "Students who pass receive their belt at the end of testing. Kukkiwon certificates and ID cards usually take at least 3 months to arrive.",
  },
  {
    question: "What happens with the logbook during testing?",
    answer:
      "The logbook must be turned in at each midterm and again at black belt testing. If it is not turned in, the student cannot test and must wait for the next cycle.",
  },
];

const readinessItems = [
  "Maintain an active membership.",
  "Have no outstanding tuition or testing fees.",
  "Attend approximately 20-25 classes before testing.",
  "Complete the reading log one week before testing.",
  "Turn in the essay one week before testing.",
  "Earn all required stripes from Masters or instructors.",
  "Submit the testing form on time. Late forms are not accepted.",
  "Take the written test during the week of the 1st midterm.",
];

const testingCategories = {
  inClass: [
    "Full poomsae",
    "Half poomsae",
    "Weapons",
    "One-steps / sparring",
    "Hand and kick techniques",
    "Breaking",
  ],
  atHome: ["Reading log", "Essay"],
};

const testingTimeline = [
  {
    stage: "1st Midterm",
    subtitle: "Current Cycle Requirements",
    items: [
      { label: "Written Test", accent: true },
      { label: "3 current cycle poomsaes" },
      { label: "3 current cycle one-steps" },
      { label: "Current cycle weapon" },
      { label: "Hand Techniques 1-18" },
      { label: "Current cycle board break" },
    ],
  },
  {
    stage: "2nd Midterm",
    subtitle: "Current Cycle Requirements",
    items: [
      { label: '"Life of Taekwondo" Essay', accent: true },
      { label: "3 current cycle poomsaes" },
      { label: "3 current cycle one-steps" },
      { label: "Current cycle weapon" },
      { label: "Hand Techniques 19-36" },
      { label: "Current cycle board break" },
    ],
  },
  {
    stage: "3rd Midterm",
    subtitle: "Current Cycle Requirements",
    items: [
      { label: "Letter of Recommendation", accent: true },
      { label: "3 current cycle poomsaes" },
      { label: "3 current cycle one-steps" },
      { label: "Current cycle weapon" },
      { label: "Hand Techniques 37-52" },
      { label: "Current cycle board break" },
    ],
  },
  {
    stage: "1st Degree Test",
    subtitle: "1st Degree Testing Requirements",
    items: [
      { label: "Black Belt Application", accent: true },
      { label: "Logbook completed", accent: true },
      { label: "3 poomsaes chosen by Master Cho and the required one-steps" },
      { label: "Current cycle weapon" },
      { label: "All Hand Techniques 1-52" },
      { label: "Required board break" },
    ],
  },
];

function StatCard({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}): React.ReactElement {
  return (
    <div className="rounded-xl bg-white/[0.06] p-4 ring-1 ring-white/[0.08]">
      <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/30">{label}</p>
      <p className="mt-1.5 font-heading text-lg text-white">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-white/45">{description}</p>
    </div>
  );
}

function ChecklistCard({
  title,
  items,
  tone = "light",
}: {
  title: string;
  items: string[];
  tone?: "light" | "dark";
}): React.ReactElement {
  const classes =
    tone === "dark"
      ? "rounded-2xl bg-brand-navy p-6 ring-1 ring-white/[0.08]"
      : "rounded-2xl bg-white p-6 ring-1 ring-brand-taupe/12";

  return (
    <div className={classes}>
      <h3 className={`font-heading text-xl ${tone === "dark" ? "text-white" : "text-brand-black"}`}>{title}</h3>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <div
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                tone === "dark" ? "bg-brand-gold/12 text-brand-gold" : "bg-brand-cream text-brand-red"
              }`}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <p className={`text-sm leading-relaxed ${tone === "dark" ? "text-white/60" : "text-brand-black/60"}`}>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestingStageCard({
  stage,
  subtitle,
  items,
}: {
  stage: string;
  subtitle: string;
  items: { label: string; accent?: boolean }[];
}): React.ReactElement {
  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-brand-black/12">
      <div className="border-b border-brand-black/12 px-6 py-4">
        <h3 className="font-heading text-2xl text-brand-black">{stage}</h3>
      </div>
      <div className="px-6 py-6">
        <p className="font-heading text-lg text-brand-black">{subtitle}</p>
        <div className="mt-5 space-y-3">
          {items.map((item) => (
            <div
              key={`${stage}-${item.label}`}
              className={`grid grid-cols-[0.75rem_minmax(0,1fr)] items-start gap-4 rounded-xl px-3 py-2 ${
                item.accent ? "bg-brand-blue/5 ring-1 ring-brand-blue/12" : ""
              }`}
            >
              <span
                className={`mt-[0.7rem] h-2.5 w-2.5 rounded-full ${
                  item.accent ? "bg-brand-blue shadow-[0_0_0_3px_rgba(34,82,180,0.12)]" : "bg-brand-black/55"
                }`}
              />
              <p
                className={`text-base leading-8 ${
                  item.accent ? "font-medium text-brand-blue" : "text-brand-black/75"
                }`}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RedBlackBeltPage(): React.ReactElement {
  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
        {sectionLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="inline-flex shrink-0 items-center rounded-full bg-brand-cream px-4 py-2 text-xs font-medium text-brand-black/50 transition-colors hover:bg-brand-sand hover:text-brand-black"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="mt-6 lg:mt-0 lg:grid lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-6 xl:grid-cols-[12rem_minmax(0,1fr)] xl:gap-8">
        <FloatingSectionNav ariaLabel="Red and black belt page sections" links={sectionLinks} />

        <div className="min-w-0 space-y-14">
          <section id="overview" className="scroll-mt-28 space-y-8">
            <div className="relative overflow-hidden rounded-2xl bg-brand-navy px-8 py-10 sm:px-10 sm:py-12">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-red/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-brand-gold/8 blur-3xl" />

              <div className="relative z-10">
                <Link href="/members/curriculum" className="inline-flex items-center gap-1.5 text-xs text-white/40 transition-colors hover:text-white/70">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Back to Curriculum
                </Link>

                <EyebrowBadge variant="gold" className="mt-5">Black Belt Preparation</EyebrowBadge>
                <h1 className="mt-4 font-heading text-3xl tracking-tight text-white sm:text-4xl">Preparing for Black Belt</h1>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/55">
                  This page gives red and black belt students a focused overview of what to prepare, what to turn in, and what to expect before first-degree black belt testing.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <StatCard label="Milestone" title="3 Midterms" description="Students must pass 3 midterm tests before first-degree black belt testing." />
                  <StatCard label="Training Goal" title="20-25 Classes" description="Consistent attendance is part of being ready for testing." />
                  <StatCard label="Printable Guide" title="Full Packet" description="Use the download at the bottom of this page for the complete printable reference." />
                </div>
              </div>
            </div>
          </section>

          <section id="faq" className="scroll-mt-28 space-y-6">
            <SectionHeader
              label="FAQ"
              title="Midterm & Black Belt FAQ"
              description="The packet covers a lot of information. This section pulls forward the answers students usually need most while they are preparing."
            />

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {faqItems.map((item) => (
                <div
                  key={item.question}
                  className="rounded-2xl bg-white p-6 ring-1 ring-brand-taupe/12 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-brand-taupe/10"
                >
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-red/60">Question</p>
                  <h3 className="mt-2 font-heading text-xl text-brand-black">{item.question}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-black/60">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="testing-requirements" className="scroll-mt-28 space-y-6">
            <SectionHeader
              label="Requirements"
              title="Testing Requirements"
              description="Use this as a quick readiness checklist before each midterm and before black belt promotion testing."
            />

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              <ChecklistCard title="Readiness Checklist" items={readinessItems} />
              <div className="space-y-4">
                <ChecklistCard title="In-Class Categories" items={testingCategories.inClass} tone="dark" />
                <ChecklistCard title="At-Home Categories" items={testingCategories.atHome} />
              </div>
            </div>

            <div className="rounded-2xl bg-brand-cream/50 p-6 ring-1 ring-brand-taupe/12 sm:p-8">
              <div className="mx-auto max-w-4xl text-center">
                <h3 className="font-heading text-3xl text-brand-blue sm:text-4xl">First Degree Black Belt Requirements</h3>
                <p className="mt-4 text-base leading-relaxed text-brand-black/70">
                  All red/black belt students must earn required stripes prior to midterm testings. Your stripes are recorded in the database to track your training, and all black belt candidates take the written test during the week of the first midterm.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 xl:grid-cols-2">
                {testingTimeline.map((entry) => (
                  <TestingStageCard
                    key={entry.stage}
                    stage={entry.stage}
                    subtitle={entry.subtitle}
                    items={entry.items}
                  />
                ))}
              </div>
            </div>
          </section>

          <section id="written-test" className="scroll-mt-28 space-y-6">
            <SectionHeader
              label="Written Test"
              title="What To Expect"
              description="The written test should feel familiar by the time the first midterm arrives. Keep your study focused on timing, terminology, and core Taekwondo knowledge."
            />

            <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-brand-taupe/12">
              <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <div className="bg-brand-navy px-8 py-8 sm:px-10">
                  <EyebrowBadge variant="gold">At A Glance</EyebrowBadge>
                  <h3 className="mt-5 font-heading text-3xl text-white sm:text-4xl">20-question written test</h3>
                  <p className="mt-3 text-base leading-relaxed text-white/55">
                    Students take the official written test during the week of the first midterm, so this part of prep should feel steady and familiar by then.
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                    <div className="rounded-xl bg-white/[0.06] px-4 py-4 ring-1 ring-white/[0.08]">
                      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/30">When</p>
                      <p className="mt-2 font-heading text-xl text-white">1st Midterm Week</p>
                    </div>
                    <div className="rounded-xl bg-white/[0.06] px-4 py-4 ring-1 ring-white/[0.08]">
                      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/30">Format</p>
                      <p className="mt-2 font-heading text-xl text-white">Multiple Choice</p>
                    </div>
                  </div>
                </div>

                <div className="px-8 py-8 sm:px-10">
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-black/35">Study Focus</p>
                  <h3 className="mt-2 font-heading text-2xl text-brand-black">Focus on these topics</h3>

                  <div className="mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-1">
                    <div className="rounded-xl bg-brand-page-bg/75 px-5 py-5">
                      <p className="font-heading text-lg text-brand-black">Sparring Score Questions</p>
                      <p className="mt-2 text-sm leading-relaxed text-brand-black/55">
                        Review match scoring and the kinds of scoring questions that appear in the packet.
                      </p>
                    </div>
                    <div className="rounded-xl bg-brand-page-bg/75 px-5 py-5">
                      <p className="font-heading text-lg text-brand-black">General Taekwondo Knowledge</p>
                      <p className="mt-2 text-sm leading-relaxed text-brand-black/55">
                        Be ready for core school knowledge, etiquette, and black-belt-prep basics.
                      </p>
                    </div>
                    <div className="rounded-xl bg-brand-page-bg/75 px-5 py-5">
                      <p className="font-heading text-lg text-brand-black">Korean Terminology</p>
                      <p className="mt-2 text-sm leading-relaxed text-brand-black/55">
                        Spend extra time on common terms, commands, and vocabulary used in class.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl bg-brand-cream/70 px-5 py-4 ring-1 ring-brand-taupe/10">
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-black/35">Printable Version</p>
                    <p className="mt-2 text-sm leading-relaxed text-brand-black/60">
                      The full packet includes the printable written-test material if students want the complete study version.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="resources" className="scroll-mt-28">
            <div className="rounded-2xl bg-brand-navy px-8 py-10 sm:px-10">
              <EyebrowBadge variant="gold">Resources</EyebrowBadge>
              <h2 className="mt-4 font-heading text-2xl tracking-tight text-white sm:text-3xl">Red/Black Belt Resources</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/40">
                Download the full training packet for the printable version of the black belt prep materials, forms, and reference pages.
              </p>

              <div className="mt-8">
                <a
                  href="/student-resources/red-black-training-packet"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-5 rounded-xl bg-white/[0.06] px-6 py-5 ring-1 ring-white/[0.08] transition-all duration-300 hover:bg-white/[0.10] hover:-translate-y-0.5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-gold/10">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand-gold" aria-hidden="true">
                      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M14 2v5h5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9 13h6" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9 17h6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-heading text-lg text-white">Red/Black Training Packet</p>
                    <p className="mt-0.5 text-sm text-white/40">Opens PDF in a new tab</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto text-white/30 transition-all duration-300 group-hover:text-brand-gold group-hover:translate-x-0.5" aria-hidden="true">
                    <path d="M7 17L17 7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
