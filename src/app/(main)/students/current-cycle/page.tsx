import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Our Current Cycle Materials" });

export default function CurrentCyclePage(): React.ReactElement {
  return (
    <div>
      <span className="inline-flex rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
        Current Cycle
      </span>
      <h1 className="mt-5 font-heading text-3xl tracking-tight text-brand-black sm:text-4xl">
        Our Current Cycle Materials
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-black/60">
        This page will hold the materials for the school&apos;s current testing cycle, including the active
        weapon focus, announcements, and any cycle-specific notes for students and families.
      </p>

      <div className="mt-8 rounded-[1.75rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
        <div className="rounded-[calc(1.75rem-6px)] bg-white p-6 sm:p-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-red">Coming Soon</p>
          <h2 className="mt-3 font-heading text-2xl text-brand-black">Cycle-Specific Updates</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-brand-black/65">
            Once this page is filled out, students will be able to quickly review the current cycle&apos;s focus
            materials in one place.
          </p>
        </div>
      </div>
    </div>
  );
}
