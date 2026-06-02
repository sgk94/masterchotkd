import Link from "next/link";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { getMembersHomeContent } from "@/lib/members-home-content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Members Announcements" });
export const revalidate = 3600;

export default function StudentsPage(): React.ReactElement {
  const membersHomeContent = getMembersHomeContent();
  const { hero, monthlyTheme, socials, announcements, announcementsEyebrow } = membersHomeContent;
  const featuredAnnouncement = announcements[0];
  const upcomingAnnouncements = announcements.filter((announcement) => !announcement.featured);

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-[2.25rem] bg-[linear-gradient(135deg,#070723_0%,#10153d_52%,#171d52_100%)] px-7 py-8 text-white shadow-[0_30px_90px_rgba(10,10,46,0.18)] sm:px-10 sm:py-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(196,30,42,0.16),_transparent_26%)]" />
        <div className="pointer-events-none absolute -right-16 top-10 h-56 w-56 rounded-full border border-white/6" />

        <div className="relative z-10 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div>
            <EyebrowBadge variant="gold">{hero.eyebrow}</EyebrowBadge>
            <h1 className="mt-5 max-w-[11ch] font-heading text-5xl leading-[0.92] text-white sm:text-6xl">
              {hero.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/66 sm:text-lg">
              {hero.description}
            </p>

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

      <section className="space-y-6">
        <div className="flex flex-col gap-3 border-b border-brand-taupe/20 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <EyebrowBadge variant="pill">{announcementsEyebrow}</EyebrowBadge>
            <h2 className="mt-4 font-heading text-4xl text-brand-black sm:text-5xl">What’s Coming Up</h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-brand-black/52 sm:text-right">
            Tournament dates, registration deadlines, community events, and school reminders.
          </p>
        </div>

        <div className="grid gap-3 md:hidden">
          {upcomingAnnouncements.map((announcement) => (
            <article
              key={announcement.id}
              className="rounded-[1.25rem] bg-white p-5 shadow-[0_12px_28px_rgba(26,26,46,0.045)] ring-1 ring-brand-taupe/12"
            >
              <span className="inline-flex max-w-full rounded-md bg-brand-navy px-3 py-1.5 text-[11px] font-medium uppercase leading-none tracking-[0.08em] text-white ring-1 ring-white/10">
                {announcement.label}
              </span>
              <h3 className="mt-3 font-heading text-2xl leading-tight text-brand-black">{announcement.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-brand-black/68">{announcement.body}</p>
              {announcement.href ? (
                <Link
                  href={announcement.href}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-red"
                >
                  Open
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : null}
            </article>
          ))}
        </div>

        <div className="hidden overflow-hidden rounded-[1.5rem] bg-white shadow-[0_18px_45px_rgba(26,26,46,0.05)] ring-1 ring-brand-taupe/12 md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-brand-taupe/14 bg-brand-page-bg/70">
                  <th scope="col" className="w-36 px-5 py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-brand-black/42">
                    Date
                  </th>
                  <th scope="col" className="w-72 px-5 py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-brand-black/42">
                    Announcement
                  </th>
                  <th scope="col" className="px-5 py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-brand-black/42">
                    Details
                  </th>
                  <th scope="col" className="w-32 px-5 py-4 text-right text-[10px] font-medium uppercase tracking-[0.18em] text-brand-black/42">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-taupe/14">
                {upcomingAnnouncements.map((announcement) => (
                  <tr key={announcement.id} className="transition-colors duration-200 hover:bg-brand-page-bg/50">
                    <td className="px-5 py-4 align-top">
                      <span className="inline-flex whitespace-nowrap rounded-md bg-brand-navy px-3 py-1.5 text-[11px] font-medium uppercase leading-none tracking-[0.08em] text-white ring-1 ring-white/10">
                        {announcement.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 align-top">
                      <h3 className="font-heading text-xl leading-tight text-brand-black">{announcement.title}</h3>
                    </td>
                    <td className="px-5 py-4 align-top text-base leading-relaxed text-brand-black/68">
                      {announcement.body}
                    </td>
                    <td className="px-5 py-4 text-right align-top">
                      {announcement.href ? (
                        <Link
                          href={announcement.href}
                          className="inline-flex items-center gap-2 text-sm font-medium text-brand-red transition-transform duration-200 hover:translate-x-1"
                        >
                          Open
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </Link>
                      ) : (
                        <span className="text-sm text-brand-black/30">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  );
}
