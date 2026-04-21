import Link from "next/link";
import { getMembersHomeContent } from "@/lib/members-home-content";
import { createMetadata } from "@/lib/metadata";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";

export const metadata = createMetadata({ title: "Members Announcements" });
export const revalidate = 3600;

export default function StudentsPage(): React.ReactElement {
  const membersHomeContent = getMembersHomeContent();
  const { hero, socials, announcements, announcementsEyebrow, memberApp, quickLinks, quickLinksEyebrow } =
    membersHomeContent;

  return (
    <div className="space-y-14">
      {/* Hero — welcome banner with dark bg */}
      <section className="relative overflow-hidden rounded-[2rem] bg-brand-navy px-8 py-12 sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand-red/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-brand-gold/8 blur-3xl" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <EyebrowBadge variant="gold">{hero.eyebrow}</EyebrowBadge>
            <h1 className="mt-5 font-heading text-4xl tracking-tight text-white sm:text-5xl">
              {hero.title}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/50">
              {hero.description}
            </p>
            {/* Socials inline */}
            <div className="mt-8 flex items-center gap-3">
              <a
                href={socials.facebookUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-brand-red hover:scale-105"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13.5 21v-8.1h2.7l.4-3.2h-3.1V7.7c0-.9.2-1.6 1.5-1.6h1.7V3.2c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.4H8v3.2h2.3V21h3.2Z" />
                </svg>
              </a>
              <a
                href={socials.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-brand-red hover:scale-105"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <span className="ml-1 text-xs text-white/30">Follow us for updates</span>
            </div>
          </div>

          {/* Monthly note card */}
          <div className="rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand-gold/70">{hero.noteEyebrow}</p>
            <h2 className="mt-3 font-heading text-xl text-white/90">{hero.noteTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/45">
              {hero.noteBody}
            </p>
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section>
        <EyebrowBadge variant="pill">{announcementsEyebrow}</EyebrowBadge>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {announcements.map((announcement) => {
            const cardClass = `group relative block rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 ${
              announcement.featured
                ? "bg-brand-red/[0.04] ring-1 ring-brand-red/10 hover:ring-brand-red/25"
                : "bg-brand-sand/40 ring-1 ring-brand-taupe/15"
            }`;
            const cardInner = (
              <>
                <div className="flex items-start justify-between">
                  <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] ${
                    announcement.featured
                      ? "bg-brand-red/10 text-brand-red"
                      : "bg-brand-black/5 text-brand-black/40"
                  }`}>
                    {announcement.label}
                  </span>
                  {announcement.featured && (
                    <span className="flex h-2 w-2 rounded-full bg-brand-red shadow-[0_0_6px_rgba(196,30,42,0.4)]" />
                  )}
                </div>
                <h2 className="mt-4 font-heading text-2xl text-brand-black">{announcement.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-brand-black/55">{announcement.body}</p>
                {announcement.href && (
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.14em] text-brand-red transition-all duration-300 group-hover:gap-2">
                    View current cycle
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                )}
              </>
            );
            return announcement.href ? (
              <Link key={announcement.id} href={announcement.href} className={cardClass}>
                {cardInner}
              </Link>
            ) : (
              <article key={announcement.id} className={cardClass}>
                {cardInner}
              </article>
            );
          })}
        </div>
      </section>

      {/* Spark Member App */}
      <section className="rounded-2xl bg-brand-cream/60 p-8 ring-1 ring-brand-taupe/10 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="inline-flex rounded-full bg-brand-black/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-brand-black/40">
              {memberApp.eyebrow}
            </span>
            <h2 className="mt-4 font-heading text-3xl text-brand-black">{memberApp.title}</h2>
            <p className="mt-3 text-base leading-relaxed text-brand-black/55">
              {memberApp.description}
            </p>

            <div className="mt-6 flex flex-col gap-2">
              <a
                href={memberApp.iosUrl}
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-red transition-colors hover:text-brand-red/70"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                {memberApp.iosLabel}
              </a>
              <a
                href={memberApp.androidUrl}
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-red transition-colors hover:text-brand-red/70"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.6 4.5a.5.5 0 0 1 .87-.5l1.42 2.46A6.7 6.7 0 0 1 12 6c1.1 0 2.13.16 3.11.46l1.42-2.46a.5.5 0 0 1 .87.5L16 6.92c1.84 1.13 3 2.95 3 5.08H5c0-2.13 1.16-3.95 3-5.08L6.6 4.5zM9.5 10.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm5.75-.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zM5 13h14v6.5a1.5 1.5 0 0 1-1.5 1.5H17v2a1 1 0 1 1-2 0v-2h-2v2a1 1 0 1 1-2 0v-2H9v2a1 1 0 1 1-2 0v-2h-.5A1.5 1.5 0 0 1 5 19.5V13z"
                  />
                </svg>
                {memberApp.androidLabel}
              </a>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-brand-taupe/10">
            <h3 className="font-heading text-xl text-brand-black">{memberApp.stepsTitle}</h3>
            <ol className="mt-5 space-y-4">
              {memberApp.steps.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-red/10 font-heading text-xs text-brand-red">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-brand-black/65 pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 rounded-lg bg-brand-cream/50 p-4 text-xs leading-relaxed text-brand-black/45">
              {memberApp.footer}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section>
        <EyebrowBadge variant="pill">{quickLinksEyebrow}</EyebrowBadge>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {quickLinks.map((resource) => (
            <Link
              key={resource.href}
              href={resource.href}
              className="group relative overflow-hidden rounded-2xl bg-brand-navy p-6 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-red/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
              <div className="relative z-10">
                <h2 className="font-heading text-xl text-white transition-colors group-hover:text-brand-gold">
                  {resource.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/40">{resource.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-gold/70 transition-all duration-300 group-hover:gap-2 group-hover:text-brand-gold">
                  View
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
