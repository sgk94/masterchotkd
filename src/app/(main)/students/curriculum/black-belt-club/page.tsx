import Link from "next/link";

const midtermRequirements = [
  {
    title: "Midterm 1",
    poomsae: "Koryo",
    weapon: "Half Ssang Jeol Bong",
    combo: "1-3",
  },
  {
    title: "Midterm 2",
    poomsae: "Koryo, Palgwe 1",
    weapon: "Full Ssang Jeol Bong",
    combo: "4-6",
  },
  {
    title: "Midterm 3",
    poomsae: "Koryo, Palgwe 1+2",
    weapon: "Half Bahng Mahng Ee",
    combo: "7-9",
  },
  {
    title: "Midterm 4",
    poomsae: "Freestyle Poomsae",
    notes: "Modified World Taekwondo freestyle rules.",
  },
  {
    title: "Midterm 5",
    poomsae: "Koryo, Palgwe 3",
    weapon: "Full Bahng Mahng Ee",
    combo: "10-12",
  },
  {
    title: "Midterm 6",
    poomsae: "Koryo, Palgwe 3+4",
    weapon: "Half Jahng Bong",
    combo: "13-15",
  },
  {
    title: "Midterm 7",
    poomsae: "Koryo, Palgwe 1-4",
    weapon: "Full Jahng Bong",
    combo: "16-18",
  },
] as const;

const testingRequirement = {
  title: "2nd Degree Testing",
  poomsae: "Koryo, Palgwe 1-4",
  weapon: "All",
  combo: "1-18",
} as const;

const combos = [
  { title: "Combo 1", description: "Jab" },
  { title: "Combo 2", description: "Double Jab" },
  { title: "Combo 3", description: "Jab, Cross" },
  { title: "Combo 4", description: "Double Jab, Cross" },
  { title: "Combo 5", description: "Jab, Cross, Hook" },
  { title: "Combo 6", description: "Jab, Cross, Hook, Uppercut" },
  { title: "Combo 7", description: "Right uppercut, Left hook" },
  { title: "Combo 8", description: "Right uppercut, Left hook, right cross" },
  { title: "Combo 9", description: "Jab, Cross to the body, Left hook to the head" },
  { title: "Combo 10", description: "Double jab, Right Front Kick" },
  { title: "Combo 11", description: "Jab, Inside leg kick (left round)" },
  { title: "Combo 12", description: "Inside leg kick, left round to the body" },
  { title: "Combo 13", description: "Jab, Cross, Left hook, right round" },
  { title: "Combo 14", description: "Right round, Overhand left" },
  { title: "Combo 15", description: "Cross, hook, right round" },
  { title: "Combo 16", description: "Parry with right hand, throw cross with right hand" },
  { title: "Combo 17", description: "Check, Jab, Cross, Switch round to the body" },
  { title: "Combo 18", description: "Right leg kick, cross, switch butterfly" },
] as const;

export default function BlackBeltClubCurriculumPage(): React.ReactElement {
  return (
    <div className="space-y-8">
      <Link href="/members/curriculum" className="inline-flex text-sm text-brand-red hover:underline">
        ← Back to Curriculum
      </Link>

      <section className="rounded-[2rem] bg-brand-navy px-8 py-10 sm:px-10 sm:py-12">
        <span className="inline-flex rounded-full border border-brand-gold/20 bg-brand-gold/5 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-gold">
          Members Only
        </span>
        <h1 className="mt-4 font-heading text-3xl tracking-tight text-white sm:text-4xl">
          Black Belt Curriculum
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
          This section is reserved for black belt students and now includes the current testing requirements from the
          black belt curriculum handout.
        </p>
      </section>

      <section className="rounded-2xl bg-brand-cream p-8 ring-1 ring-brand-taupe/10">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-brand-red/10 bg-brand-red/[0.04] px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-red">
            Requirements
          </span>
          <h2 className="mt-4 font-heading text-2xl text-brand-black sm:text-3xl">1st Degree Black Belt Requirements</h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-black/60 sm:text-base">
            Each midterm builds on the material before it. Use this section as the current reference for poomsae,
            weapon work, and combo requirements, with 2nd degree testing included below in the same format.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {[...midtermRequirements, testingRequirement].map((requirement) => (
            <article
              key={requirement.title}
              className={
                requirement.title === "2nd Degree Testing"
                  ? "rounded-2xl bg-brand-navy p-6 text-white shadow-sm ring-1 ring-brand-navy/20"
                  : "rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-taupe/10"
              }
            >
              <p
                className={
                  requirement.title === "2nd Degree Testing"
                    ? "text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold/80"
                    : "text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-red/70"
                }
              >
                {requirement.title}
              </p>
              <div
                className={
                  requirement.title === "2nd Degree Testing"
                    ? "mt-4 space-y-3 text-sm text-white/80"
                    : "mt-4 space-y-3 text-sm text-brand-black/70"
                }
              >
                <div>
                  <p
                    className={
                      requirement.title === "2nd Degree Testing"
                        ? "text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45"
                        : "text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-black/35"
                    }
                  >
                    Poomsae
                  </p>
                  <p
                    className={
                      requirement.title === "2nd Degree Testing"
                        ? "mt-1 font-medium text-white"
                        : "mt-1 font-medium text-brand-black"
                    }
                  >
                    {requirement.poomsae}
                  </p>
                </div>

                {"weapon" in requirement ? (
                  <div>
                    <p
                      className={
                        requirement.title === "2nd Degree Testing"
                          ? "text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45"
                          : "text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-black/35"
                      }
                    >
                      Weapon
                    </p>
                    <p
                      className={
                        requirement.title === "2nd Degree Testing"
                          ? "mt-1 font-medium text-white"
                          : "mt-1 font-medium text-brand-black"
                      }
                    >
                      {requirement.weapon}
                    </p>
                  </div>
                ) : null}

                {"combo" in requirement ? (
                  <div>
                    <p
                      className={
                        requirement.title === "2nd Degree Testing"
                          ? "text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45"
                          : "text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-black/35"
                      }
                    >
                      Combo
                    </p>
                    <p
                      className={
                        requirement.title === "2nd Degree Testing"
                          ? "mt-1 font-medium text-white"
                          : "mt-1 font-medium text-brand-black"
                      }
                    >
                      {requirement.combo}
                    </p>
                  </div>
                ) : null}

                {"notes" in requirement ? (
                  <div>
                    <p
                      className={
                        requirement.title === "2nd Degree Testing"
                          ? "text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45"
                          : "text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-black/35"
                      }
                    >
                      Notes
                    </p>
                    <p
                      className={
                        requirement.title === "2nd Degree Testing"
                          ? "mt-1 font-medium text-white"
                          : "mt-1 font-medium text-brand-black"
                      }
                    >
                      {requirement.notes}
                    </p>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-brand-taupe/20 bg-white p-8 ring-1 ring-brand-taupe/10">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-brand-gold/20 bg-brand-gold/5 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-gold">
            Combos
          </span>
          <h2 className="mt-4 font-heading text-2xl text-brand-black sm:text-3xl">Black Belt Combo Reference</h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-black/60 sm:text-base">
            These combos were added from the combos handout and are listed separately for quick reference during practice.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {combos.map((combo) => (
            <article
              key={combo.title}
              className="rounded-2xl bg-brand-cream p-5 ring-1 ring-brand-taupe/10"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-red/70">
                {combo.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-brand-black/70">
                {combo.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
