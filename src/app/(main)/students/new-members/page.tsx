import Link from "next/link";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { getMembersHomeContent } from "@/lib/members-home-content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "New Members" });

export default function NewMembersPage(): React.ReactElement {
  const { memberApp, quickLinks, quickLinksEyebrow } = getMembersHomeContent();

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] bg-white p-6 shadow-[0_18px_45px_rgba(26,26,46,0.05)] ring-1 ring-brand-taupe/12 sm:p-8">
        <EyebrowBadge variant="pill">New Members</EyebrowBadge>
        <h1 className="mt-4 font-heading text-4xl text-brand-black sm:text-5xl">Start Here</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-black/58 sm:text-base">
          A quick place for app setup and the first member links families usually need.
        </p>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-[2rem] bg-[linear-gradient(145deg,rgba(240,235,228,0.76),rgba(255,255,255,0.96))] p-6 shadow-[0_18px_45px_rgba(26,26,46,0.05)] ring-1 ring-brand-taupe/12 sm:p-8">
          <EyebrowBadge variant="pill" className="bg-white/75">
            {memberApp.eyebrow}
          </EyebrowBadge>
          <h2 className="mt-4 font-heading text-3xl text-brand-black sm:text-4xl">{memberApp.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-black/58 sm:text-base">{memberApp.description}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={memberApp.iosUrl}
              className="inline-flex items-center rounded-full bg-brand-red px-4 py-3 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              {memberApp.iosLabel}
            </a>
            <a
              href={memberApp.androidUrl}
              className="inline-flex items-center rounded-full border border-brand-red/14 bg-white px-4 py-3 text-sm font-medium text-brand-red transition-transform duration-300 hover:-translate-y-0.5"
            >
              {memberApp.androidLabel}
            </a>
          </div>
        </article>

        <article className="rounded-[2rem] bg-white p-6 shadow-[0_18px_45px_rgba(26,26,46,0.05)] ring-1 ring-brand-taupe/12 sm:p-8">
          <p className="text-[10px] uppercase tracking-[0.18em] text-brand-black/38">{memberApp.setupEyebrow}</p>
          <h2 className="mt-3 font-heading text-3xl text-brand-black sm:text-4xl">{memberApp.stepsTitle}</h2>
          <ol className="mt-6 grid gap-3">
            {memberApp.steps.map((step, i) => (
              <li key={step} className="flex gap-4 rounded-2xl bg-brand-page-bg/60 px-4 py-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-red text-sm font-medium text-white">
                  {i + 1}
                </span>
                <span className="pt-1 text-sm leading-relaxed text-brand-black/62">{step}</span>
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section className="space-y-4">
        <div>
          <EyebrowBadge variant="pill">{quickLinksEyebrow}</EyebrowBadge>
          <h2 className="mt-4 font-heading text-3xl text-brand-black sm:text-4xl">First Links</h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {quickLinks.map((resource) => (
            <Link
              key={resource.href}
              href={resource.href}
              className="group rounded-[1.5rem] bg-white p-5 shadow-[0_14px_34px_rgba(26,26,46,0.05)] ring-1 ring-brand-taupe/12 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(26,26,46,0.08)]"
            >
              <p className="text-[10px] uppercase tracking-[0.18em] text-brand-black/36">Quick Link</p>
              <h3 className="mt-3 font-heading text-2xl text-brand-black">{resource.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-black/56">{resource.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand-red">
                Open section
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
