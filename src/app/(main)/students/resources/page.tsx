import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Student Resources" });

export default function ResourcesPage(): React.ReactElement {
  return (
    <div>
      <h1 className="font-heading text-3xl text-brand-black">Additional Resources</h1>
      <p className="mt-3 text-brand-black/60">Training materials, terminology guides, and more.</p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-card bg-brand-cream p-6">
          <h2 className="font-heading text-lg text-brand-black">Korean Terminology</h2>
          <p className="mt-2 text-sm text-brand-black/60">Common Korean terms used in Taekwondo training.</p>
        </div>
        <div className="rounded-card bg-brand-cream p-6">
          <h2 className="font-heading text-lg text-brand-black">Training Tips</h2>
          <p className="mt-2 text-sm text-brand-black/60">Guidance for practice at home between classes.</p>
        </div>
      </div>
    </div>
  );
}
