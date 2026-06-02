import Link from "next/link";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { getMembersHomeContent } from "@/lib/members-home-content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Members Announcements" });
export const revalidate = 3600;

const announcementCardStyles = [
  {
    card: "bg-white/92 ring-brand-taupe/12",
    label: "bg-brand-black/5 text-brand-black/50",
    title: "text-brand-black",
    body: "text-brand-black/60",
  },
  {
    card: "bg-brand-sand/55 ring-brand-taupe/12",
    label: "bg-white/70 text-brand-black/55",
    title: "text-brand-black",
    body: "text-brand-black/62",
  },
  {
    card: "bg-brand-red/[0.05] ring-brand-red/12",
    label: "bg-brand-red/10 text-brand-red",
    title: "text-brand-black",
    body: "text-brand-black/62",
  },
] as const;

export default function StudentsPage(): React.ReactElement {
  const membersHomeContent = getMembersHomeContent();
  const { hero, monthlyTheme, socials, announcements, announcementsEyebrow, memberApp, quickLinks, quickLinksEyebrow } =
    membersHomeContent;
  const featuredAnnouncement = announcements[0];

  return (
    <div className="relative space-y-12 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top_left,_rgba(196,30,42,0.12),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(196,164,74,0.16),_transparent_28%),linear-gradient(180deg,_rgba(255,255,255,0.94),_rgba(242,242,246,0))]" />
      <div className="pointer-events-none absolute -left-16 top-80 -z-10 h-72 w-72 rounded-full bg-brand-red/6 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 top-[42rem] -z-10 h-80 w-80 rounded-full bg-brand-gold/10 blur-3xl" />

      <section className="relative overflow-hidden rounded-[2.25rem] bg-[linear-gradient(135deg,#070723_0%,#10153d_52%,#171d52_100%)] px-7 py-8 text-white shadow-[0_30px_90px_rgba(10,10,46,0.18)] sm:px-10 sm:py-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(196,30,42,0.16),_transparent_26%)]" />
        <div className="pointer-events-none absolute -right-16 top-10 h-56 w-56 rounded-full border border-white/6" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-[linear-gradient(90deg,rgba(196,164,74,0.16),transparent_38%,rgba(255,255,255,0.04)_78%,transparent)]" />

        <div className="relative z-10 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div>
            <EyebrowBadge variant="gold">{hero.eyebrow}</EyebrowBadge>
            <h1 className="mt-5 max-w-[11ch] font-heading text-5xl leading-[0.92] text-white sm:text-6xl">
              {hero.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/66 sm:text-lg">
              {hero.description}
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-brand-gold/80">Live Now</p>
                <p className="mt-2 font-heading text-2xl text-white">{announcements.length}</p>
                <p className="mt-1 text-sm text-white/45">Current events and reminders</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-brand-gold/80">Theme</p>
                <p className="mt-2 font-heading text-2xl text-white">{monthlyTheme.month}</p>
                <p className="mt-1 text-sm text-white/45">{monthlyTheme.theme}</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-brand-gold/80">Member Tools</p>
                <p className="mt-2 font-heading text-2xl text-white">{quickLinks.length}</p>
                <p className="mt-1 text-sm text-white/45">Quick access sections</p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={socials.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.12]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M13.5 21v-8.1h2.7l.4-3.2h-3.1V7.7c0-.9.2-1.6 1.5-1.6h1.7V3.2c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.4H8v3.2h2.3V21h3.2Z" />
                  </svg>
                </span>
                Facebook
              </a>
              <a
                href={socials.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.12]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </span>
                Instagram
              </a>
              <span className="text-sm text-white/42">Follow along for school updates and reminders.</span>
            </div>
          </div>

          <div className="grid gap-4">
            {featuredAnnouncement?.href ? (
              <Link
                href={featuredAnnouncement.href}
                className="group rounded-[1.75rem] border border-brand-gold/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <p className="text-[10px] uppercase tracking-[0.18em] text-brand-gold/80">{featuredAnnouncement.label}</p>
                <h2 className="mt-3 font-heading text-3xl text-white">{featuredAnnouncement.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{featuredAnnouncement.body}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand-gold">
                  Open current cycle
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ) : (
              <article className="rounded-[1.75rem] border border-brand-gold/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <p className="text-[10px] uppercase tracking-[0.18em] text-brand-gold/80">{hero.noteEyebrow}</p>
                <h2 className="mt-3 font-heading text-3xl text-white">{hero.noteTitle}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{hero.noteBody}</p>
              </article>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-[1.5rem] bg-white/[0.08] p-5 ring-1 ring-white/10">
                <p className="text-[10px] uppercase tracking-[0.18em] text-brand-gold/70">{hero.noteEyebrow}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/58">{hero.noteBody}</p>
              </article>
              <article className="rounded-[1.5rem] bg-white/[0.08] p-5 ring-1 ring-white/10">
                <p className="text-[10px] uppercase tracking-[0.18em] text-brand-gold/70">Member App</p>
                <p className="mt-3 text-sm leading-relaxed text-white/58">{memberApp.footer}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.02fr_0.98fr]">
        <article className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#0b1034_0%,#10255d_100%)] p-6 text-white shadow-[0_20px_60px_rgba(15,20,60,0.16)] sm:p-8">
          <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-brand-gold/14 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-56 bg-[linear-gradient(90deg,rgba(255,255,255,0.12),transparent)]" />
          <div className="relative z-10">
            <EyebrowBadge variant="gold" className="bg-white/8 text-brand-gold ring-0">
              {monthlyTheme.eyebrow}
            </EyebrowBadge>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/42">{monthlyTheme.month}</p>
                <h2 className="mt-3 max-w-[10ch] font-heading text-5xl leading-[0.94] text-brand-gold sm:text-6xl">
                  {monthlyTheme.theme}
                </h2>
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/50">
                Character Focus
              </div>
            </div>
          </div>
        </article>

        <div className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-[2rem] bg-white/88 p-6 shadow-[0_18px_45px_rgba(26,26,46,0.07)] ring-1 ring-brand-taupe/10">
            <p className="text-[10px] uppercase tracking-[0.18em] text-brand-black/40">What It Means</p>
            <p className="mt-4 text-lg leading-relaxed text-brand-black/72 sm:text-[1.35rem]">{monthlyTheme.definition}</p>
          </article>
          <article className="rounded-[2rem] bg-brand-red/[0.05] p-6 shadow-[0_18px_45px_rgba(26,26,46,0.06)] ring-1 ring-brand-red/10">
            <p className="text-[10px] uppercase tracking-[0.18em] text-brand-red">At Taekwondo</p>
            <p className="mt-4 text-lg leading-relaxed text-brand-black/72 sm:text-[1.35rem]">{monthlyTheme.example}</p>
          </article>
        </div>
      </section>

      <section className="rounded-[2rem] border border-brand-taupe/12 bg-white/72 p-6 shadow-[0_20px_60px_rgba(26,26,46,0.05)] backdrop-blur-sm sm:p-8">
        <div className="flex flex-col gap-3 border-b border-brand-taupe/12 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <EyebrowBadge variant="pill">{announcementsEyebrow}</EyebrowBadge>
            <h2 className="mt-4 font-heading text-4xl text-brand-black sm:text-5xl">What’s Coming Up</h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-brand-black/52 sm:text-right">
            Tournament dates, registration deadlines, community events, and school reminders all live here.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {announcements.map((announcement, index) => {
            const style = announcement.featured
              ? {
                  card: "bg-[linear-gradient(145deg,rgba(196,30,42,0.12),rgba(255,255,255,0.96))] ring-brand-red/14",
                  label: "bg-brand-red text-white",
                  title: "text-brand-black",
                  body: "text-brand-black/62",
                }
              : announcementCardStyles[index % announcementCardStyles.length];

            const cardInner = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] ${style.label}`}>
                    {announcement.label}
                  </span>
                  {announcement.featured ? (
                    <span className="rounded-full bg-white px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-brand-red shadow-sm">
                      Featured
                    </span>
                  ) : null}
                </div>
                <h3 className={`mt-4 font-heading text-2xl leading-tight ${style.title}`}>{announcement.title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${style.body}`}>{announcement.body}</p>
                {announcement.href ? (
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand-red">
                    Read more
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                ) : null}
              </>
            );

            const className = `group relative overflow-hidden rounded-[1.6rem] p-5 ring-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(26,26,46,0.08)] ${style.card} ${
              announcement.featured ? "md:col-span-2 xl:col-span-2" : ""
            }`;

            return announcement.href ? (
              <Link key={announcement.id} href={announcement.href} className={className}>
                <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-white/35 blur-2xl" />
                <div className="relative z-10">{cardInner}</div>
              </Link>
            ) : (
              <article key={announcement.id} className={className}>
                <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-white/35 blur-2xl" />
                <div className="relative z-10">{cardInner}</div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <article className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,rgba(240,235,228,0.76),rgba(255,255,255,0.96))] p-6 ring-1 ring-brand-taupe/12 shadow-[0_18px_45px_rgba(26,26,46,0.05)] sm:p-8">
          <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-brand-gold/16 blur-3xl" />
          <div className="relative z-10 max-w-lg">
            <EyebrowBadge variant="pill" className="bg-white/75">
              {memberApp.eyebrow}
            </EyebrowBadge>
            <h2 className="mt-4 font-heading text-4xl text-brand-black sm:text-5xl">{memberApp.title}</h2>
            <p className="mt-3 text-base leading-relaxed text-brand-black/58">{memberApp.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {memberApp.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border border-brand-taupe/16 bg-white/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-brand-black/55"
                >
                  {highlight}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={memberApp.iosUrl}
                className="inline-flex items-center gap-2 rounded-full bg-brand-red px-4 py-3 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                {memberApp.iosLabel}
              </a>
              <a
                href={memberApp.androidUrl}
                className="inline-flex items-center gap-2 rounded-full border border-brand-red/14 bg-white px-4 py-3 text-sm font-medium text-brand-red transition-transform duration-300 hover:-translate-y-0.5"
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
        </article>

        <article className="rounded-[2rem] bg-white p-6 ring-1 ring-brand-taupe/12 shadow-[0_18px_45px_rgba(26,26,46,0.05)] sm:p-8">
          <p className="text-[10px] uppercase tracking-[0.18em] text-brand-black/38">{memberApp.setupEyebrow}</p>
          <h3 className="mt-3 font-heading text-3xl text-brand-black sm:text-4xl">{memberApp.stepsTitle}</h3>
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
          <p className="mt-5 rounded-2xl border border-brand-taupe/10 bg-brand-cream/52 px-4 py-3 text-sm leading-relaxed text-brand-black/48">
            {memberApp.footer}
          </p>
        </article>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <EyebrowBadge variant="pill">{quickLinksEyebrow}</EyebrowBadge>
            <h2 className="mt-4 font-heading text-4xl text-brand-black sm:text-5xl">Student Resources</h2>
          </div>
          <p className="max-w-lg text-sm leading-relaxed text-brand-black/50">
            Jump to the curriculum, documents, and members-only tools students use most often.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {quickLinks.map((resource, index) => {
            const tones = [
              "bg-[linear-gradient(145deg,rgba(10,10,46,0.96),rgba(29,35,88,0.96))] text-white ring-brand-navy/10",
              "bg-[linear-gradient(145deg,rgba(255,255,255,0.94),rgba(240,235,228,0.94))] text-brand-black ring-brand-taupe/12",
              "bg-[linear-gradient(145deg,rgba(196,30,42,0.08),rgba(255,255,255,0.96))] text-brand-black ring-brand-red/10",
            ] as const;
            const tone = tones[index % tones.length];
            const bodyClass = index === 0 ? "text-white/58" : "text-brand-black/56";
            const linkClass = index === 0 ? "text-brand-gold" : "text-brand-red";

            return (
              <Link
                key={resource.href}
                href={resource.href}
                className={`group relative overflow-hidden rounded-[1.8rem] p-6 ring-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(26,26,46,0.08)] ${tone}`}
              >
                <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-white/18 blur-3xl transition-transform duration-500 group-hover:scale-110" />
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <p className={`text-[10px] uppercase tracking-[0.18em] ${index === 0 ? "text-brand-gold/80" : "text-brand-black/36"}`}>
                      Quick Link
                    </p>
                    <h3 className="mt-4 font-heading text-3xl">{resource.title}</h3>
                    <p className={`mt-3 text-sm leading-relaxed ${bodyClass}`}>{resource.description}</p>
                  </div>
                  <span className={`mt-6 inline-flex items-center gap-2 text-sm font-medium ${linkClass}`}>
                    Open section
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
