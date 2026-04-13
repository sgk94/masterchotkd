import Link from "next/link";
import { membersHomeContent } from "@/lib/members-home-content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Members Announcements" });

export default function StudentsPage(): React.ReactElement {
  const { hero, socials, announcements, announcementsEyebrow, memberApp, quickLinks, quickLinksEyebrow } =
    membersHomeContent;

  return (
    <div>
      <div className="rounded-[2rem] bg-brand-sand/35 p-1.5 ring-1 ring-brand-taupe/15">
        <div className="rounded-[calc(2rem-6px)] bg-white px-6 py-8 sm:px-8 sm:py-10">
          <span className="inline-flex rounded-full border border-brand-red/15 bg-brand-red/5 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-brand-red">
            {hero.eyebrow}
          </span>
          <h1 className="mt-5 font-heading text-4xl tracking-tight text-brand-black sm:text-5xl">
            {hero.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-black/60">
            {hero.description}
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(22rem,0.8fr)]">
            <div className="rounded-[1.75rem] bg-brand-cream p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-red">{socials.eyebrow}</p>
              <h2 className="mt-3 font-heading text-2xl text-brand-black">{socials.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-brand-black/65">
                {socials.description}
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href={socials.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-red text-white transition-transform hover:-translate-y-0.5"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M13.5 21v-8.1h2.7l.4-3.2h-3.1V7.7c0-.9.2-1.6 1.5-1.6h1.7V3.2c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.4H8v3.2h2.3V21h3.2Z" />
                  </svg>
                </a>
                <a
                  href={socials.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-red text-white transition-transform hover:-translate-y-0.5"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-brand-red/10 bg-[linear-gradient(135deg,rgba(196,64,42,0.08),rgba(196,64,42,0.02))] p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-red">{hero.noteEyebrow}</p>
              <h2 className="mt-3 font-heading text-2xl text-brand-black">{hero.noteTitle}</h2>
              <p className="mt-3 text-base leading-relaxed text-brand-black/65">
                {hero.noteBody}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-12">
        <span className="inline-flex rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
          {announcementsEyebrow}
        </span>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {announcements.map((announcement) => (
            <article
              key={announcement.id}
              className="rounded-[1.75rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15"
            >
              <div className="h-full rounded-[calc(1.75rem-6px)] bg-white p-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-red">
                  {announcement.label}
                </p>
                <h2 className="mt-3 font-heading text-2xl text-brand-black">{announcement.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-brand-black/65">{announcement.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <span className="inline-flex rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
          {memberApp.eyebrow}
        </span>
        <div className="mt-6 rounded-[1.75rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
          <div className="rounded-[calc(1.75rem-6px)] bg-white px-6 py-7 sm:px-8">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
              <div className="rounded-[1.5rem] bg-brand-cream p-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-black/40">
                  {memberApp.setupEyebrow}
                </p>
                <h2 className="mt-3 font-heading text-2xl text-brand-black">{memberApp.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-brand-black/65">
                  {memberApp.description}
                </p>

                <div className="mt-6 space-y-2 text-brand-red">
                  <a href={memberApp.iosUrl} className="block text-lg font-medium hover:underline">
                    {memberApp.iosLabel}
                  </a>
                  <a href={memberApp.androidUrl} className="block text-lg font-medium hover:underline">
                    {memberApp.androidLabel}
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-2xl text-brand-black">{memberApp.stepsTitle}</h3>
                <ol className="mt-4 space-y-3 text-base leading-relaxed text-brand-black/70">
                  {memberApp.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>

                <p className="mt-6 text-base leading-relaxed text-brand-black/65">
                  {memberApp.footer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <span className="inline-flex rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
          {quickLinksEyebrow}
        </span>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {quickLinks.map((resource) => (
            <Link
              key={resource.href}
              href={resource.href}
              className="group rounded-[1.5rem] bg-brand-cream p-6 transition-colors hover:bg-brand-sand"
            >
              <h2 className="font-heading text-xl text-brand-black transition-colors group-hover:text-brand-red">
                {resource.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-black/60">{resource.description}</p>
              <span className="mt-4 inline-block text-sm font-medium text-brand-red">View →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
