"use client";

import Link from "next/link";

export default function CurriculumPage(): React.ReactElement {
  return (
    <div>
      <h1 className="font-heading text-3xl text-brand-black">Curriculum & Belt Requirements</h1>
      <p className="mt-3 text-brand-black/60">Select a program to view belt requirements.</p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Link href="/students/curriculum/tiny-tigers" className="group rounded-card bg-brand-cream p-8 transition-colors hover:bg-brand-sand">
          <h2 className="font-heading text-2xl text-brand-black group-hover:text-brand-red transition-colors">Tiny Tigers</h2>
          <p className="mt-2 text-sm text-brand-black/60">Ages 3-6 — Foundational skills and belt requirements</p>
          <span className="mt-4 inline-block text-sm font-medium text-brand-red">View Curriculum →</span>
        </Link>
        <Link href="/students/curriculum/black-belt-club" className="group rounded-card bg-brand-cream p-8 transition-colors hover:bg-brand-sand">
          <h2 className="font-heading text-2xl text-brand-black group-hover:text-brand-red transition-colors">Black Belt Club</h2>
          <p className="mt-2 text-sm text-brand-black/60">All ages — Full belt progression from White to Black</p>
          <span className="mt-4 inline-block text-sm font-medium text-brand-red">View Curriculum →</span>
        </Link>
      </div>
    </div>
  );
}
