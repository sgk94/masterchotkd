import { Button } from "@/components/ui/button";
import { ScheduleGrid } from "@/components/schedule/schedule-grid";
import { BezelCard } from "@/components/ui/bezel-card";
import { createMetadata } from "@/lib/metadata";
import { BUSINESS_ADDRESS_LINES, BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL } from "@/lib/location";
import { scheduleRows } from "@/lib/static-data";

const nextSteps = [
  {
    label: "Watch for your receipt",
    detail: "Spark will send the purchase confirmation to the email used at checkout.",
  },
  {
    label: "Pick the first class",
    detail: "Use the schedule below and choose the time that matches your age or belt level.",
  },
  {
    label: "Arrive ten minutes early",
    detail: "We will help you get settled, answer questions, and introduce you to the instructor.",
  },
] as const;

const trialScheduleRows = scheduleRows.filter((row) =>
  [
    "Tiny Tigers 3-6",
    "White-Yellow (Beginner)",
    "Family / All Belts",
  ].includes(row.className),
);

export const metadata = createMetadata({
  title: "Trial Claimed",
  description: "Next steps after claiming a 2-week trial at Master Cho's Taekwondo.",
  path: "/trial-confirmed",
  robots: {
    index: false,
    follow: false,
  },
});

export default function TrialConfirmedPage(): React.ReactElement {
  return (
    <div className="-mt-16 bg-brand-page-bg">
      <section className="relative overflow-hidden bg-brand-black text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-32 sm:pb-20 sm:pt-36 lg:grid-cols-12 lg:items-end lg:pb-24 lg:pt-40">
          <div className="lg:col-span-7">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
              Trial Claimed
            </p>
            <h1 className="mt-6 max-w-3xl font-heading text-4xl leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
              Your first two weeks are ready.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/68 sm:text-lg">
              Choose a class time below, then come to the academy a few minutes
              early. We will help you get oriented before class starts.
            </p>
          </div>

          <div className="lg:col-span-5 lg:justify-self-end">
            <div className="max-w-md border-l border-brand-gold/50 pl-6">
              <p className="font-heading text-sm uppercase tracking-[0.22em] text-white/45">
                Master Cho&apos;s Taekwondo
              </p>
              <address className="mt-4 space-y-1 text-sm not-italic leading-relaxed text-white/72">
                {BUSINESS_ADDRESS_LINES.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <a
                href={`tel:${BUSINESS_PHONE_TEL}`}
                className="mt-4 inline-flex font-heading text-lg font-semibold tracking-wide text-brand-gold transition-colors duration-300 hover:text-white"
              >
                {BUSINESS_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {nextSteps.map((step, index) => (
            <BezelCard key={step.label} radius="lg">
              <div className="min-h-[176px] p-6">
                <span className="font-heading text-xs font-semibold tracking-[0.22em] text-brand-red/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-5 font-heading text-2xl tracking-tight text-brand-black">
                  {step.label}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-brand-black/58">
                  {step.detail}
                </p>
              </div>
            </BezelCard>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:pb-28">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-brand-red">
              Pick Your First Class
            </p>
            <h2 className="mt-4 font-heading text-3xl tracking-tight text-brand-black sm:text-4xl">
              Class Schedule
            </h2>
            <p className="mt-3 leading-relaxed text-brand-black/55">
              Trial students usually start with Tiny Tigers, Beginner, or
              Family / All Belts. Call us if you are unsure which class fits.
            </p>
          </div>
          <Button variant="primary" href={`tel:${BUSINESS_PHONE_TEL}`}>
            Call Before Class
          </Button>
        </div>

        <ScheduleGrid rows={trialScheduleRows} />
      </section>
    </div>
  );
}
