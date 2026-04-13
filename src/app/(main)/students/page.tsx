import Link from "next/link";
import { getMembersHomeContent } from "@/lib/members-home-content";
import { createMetadata } from "@/lib/metadata";

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
            <span className="inline-flex rounded-full border border-brand-gold/20 bg-brand-gold/5 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-gold">
              {hero.eyebrow}
            </span>
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
        <span className="inline-flex rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
          {announcementsEyebrow}
        </span>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {announcements.map((announcement) => (
            <article
              key={announcement.id}
              className={`group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 ${
                announcement.featured
                  ? "bg-brand-red/[0.04] ring-1 ring-brand-red/10"
                  : "bg-brand-sand/40 ring-1 ring-brand-taupe/15"
              }`}
            >
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
            </article>
          ))}
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
                  <path d="M18.7 11.1c0-3-2.5-4.5-2.6-4.5 1.4-2 3.6-2.3 3.6-2.3-1.5.1-2.6.9-3.3 1.5-.7-.6-1.9-1.2-3.4-1.2-2.6 0-4.7 2.1-4.7 4.7 0 2.8 1.8 5.7 4 7.6.6.5 1.4 1.1 2.3 1.1.9 0 1.3-.6 2.4-.6 1.1 0 1.4.6 2.4.6.9 0 1.6-.5 2.2-1.1.7-.7 1.3-1.8 1.3-1.8-3-.1-4.2-2.6-4.2-4z" />
                  <path d="M14.4 5.3c.6-.7 1-1.7 1-2.7 0-.1 0-.3 0-.4-1 0-2.1.7-2.8 1.5-.6.7-1.1 1.6-1.1 2.6 0 .2 0 .3 0 .4 1.1 0 2.2-.6 2.9-1.4z" />
                </svg>
                {memberApp.iosLabel}
              </a>
              <a
                href={memberApp.androidUrl}
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-red transition-colors hover:text-brand-red/70"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3.6 7.2c-.5 0-.8.3-.8.8v6c0 .5.3.8.8.8s.8-.3.8-.8V8c0-.5-.4-.8-.8-.8zm16.8 0c-.5 0-.8.3-.8.8v6c0 .5.3.8.8.8s.8-.3.8-.8V8c0-.5-.4-.8-.8-.8zM6 16.4c0 .7.5 1.2 1.2 1.2h.8v3.2c0 .5.3.8.8.8s.8-.3.8-.8v-3.2h1.2v3.2c0 .5.3.8.8.8s.8-.3.8-.8v-3.2h.8c.7 0 1.2-.5 1.2-1.2V7.6H6v8.8zm8.4-12.8L15.6 1c.1-.1.1-.2 0-.3-.1-.1-.2-.1-.3 0L14 3.4C13.4 3.1 12.7 3 12 3s-1.4.2-2 .4L8.7.7c-.1-.1-.2-.1-.3 0-.1.1-.1.2 0 .3l1.2 2.6C7.7 4.6 6.4 6.4 6.4 7.2h11.2c0-.8-1.3-2.6-3.2-3.6zM9.6 5.8c-.3 0-.4-.2-.4-.4s.2-.4.4-.4.4.2.4.4-.2.4-.4.4zm4.8 0c-.3 0-.4-.2-.4-.4s.2-.4.4-.4.4.2.4.4-.2.4-.4.4z" />
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
        <span className="inline-flex rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50">
          {quickLinksEyebrow}
        </span>
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
