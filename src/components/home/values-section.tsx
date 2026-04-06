const values = [
  {
    icon: "\u2605",
    title: "Loyalty & Respect",
    description:
      "25+ years teaching self-defense and confidence through traditional Taekwondo.",
  },
  {
    icon: "\u2665",
    title: "Home, School & Family",
    description:
      "Teaching life skills that build confident, responsible members of the community.",
  },
  {
    icon: "\u25C6",
    title: "Discipline & Growth",
    description:
      "Emphasizing balance in all things, encouraging personal growth at every level.",
  },
];

export function ValuesSection(): React.ReactElement {
  return (
    <section className="px-6 py-16 text-center lg:py-24">
      <h2 className="font-heading text-3xl text-brand-black sm:text-4xl">
        Dedicated to an Exceptional Experience
      </h2>
      <p className="mt-2 text-brand-black/60">
        The best in the Lynnwood area
      </p>
      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
        {values.map((value) => (
          <div key={value.title} className="rounded-card bg-brand-cream p-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold text-xl text-white">
              {value.icon}
            </div>
            <h3 className="mt-4 font-heading text-lg">{value.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-black/60">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
