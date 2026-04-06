const values = [
  {
    number: "01",
    title: "Loyalty & Respect",
    description:
      "Over 25 years teaching self-defense and confidence through the traditional art of Taekwondo.",
  },
  {
    number: "02",
    title: "Home, School & Family",
    description:
      "Our curriculum builds confident leaders, successful students, and responsible community members.",
  },
  {
    number: "03",
    title: "Discipline & Growth",
    description:
      "Emphasizing balance in all things — encouraging personal growth at every stage of the journey.",
  },
];

export function ValuesSection(): React.ReactElement {
  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-xl">
          <h2 className="font-heading text-3xl tracking-tight text-brand-black sm:text-4xl">
            Dedicated to an exceptional experience
          </h2>
          <p className="mt-3 text-brand-black/60">
            The best in the Lynnwood area
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-card bg-brand-taupe/30 sm:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="bg-brand-cream p-8 sm:p-10">
              <span className="font-heading text-3xl text-brand-gold/40">{value.number}</span>
              <h3 className="mt-3 font-heading text-lg text-brand-black">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-black/60">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
