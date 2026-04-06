import { Button } from "@/components/ui/button";

const staticTestimonials = [
  { id: "1", name: "Christina Michelle", rating: 5, text: "Great for kids and great discipline! Great instructors as well." },
  { id: "2", name: "Louis Good", rating: 5, text: "Chief Master Cho is a excellent and patient instructor that runs a fantastic school!" },
  { id: "3", name: "Julana Phan", rating: 5, text: "Great instructor. If you want your kid to learn confident, self-defense & discipline. Good place to go." },
];

export async function Testimonials(): Promise<React.ReactElement> {
  return (
    <section className="bg-brand-cream px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[4px] text-brand-gold">
              Success stories
            </p>
            <h2 className="mt-3 font-heading text-3xl tracking-tight text-brand-black sm:text-4xl">
              Real people, real results
            </h2>
          </div>
          <Button variant="outline" href="/reviews" className="border-brand-black text-brand-black hover:bg-brand-black/5">
            See all reviews
          </Button>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {staticTestimonials.map((t) => (
            <div key={t.id} className="rounded-xl bg-brand-white p-7 shadow-sm">
              <div className="text-brand-gold tracking-wider">
                {"★".repeat(t.rating)}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-brand-black/70">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-red/10 text-xs font-semibold text-brand-red">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <p className="text-sm font-medium text-brand-black/50">{t.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
