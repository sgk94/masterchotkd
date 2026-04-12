"use client";

import { useEffect, useRef, useState } from "react";

interface Form {
  name: string;
  level: string;
  id: string;
}

const forms: Form[] = [
  { name: "Kibon Il Jang", level: "White Belt", id: "kibon-il-jang" },
  { name: "Taegeuk Il Jang", level: "Yellow Belt", id: "taegeuk-il-jang" },
  { name: "Taegeuk Ee Jang", level: "Green Belt", id: "taegeuk-ee-jang" },
  { name: "Taegeuk Sam Jang", level: "Blue Belt", id: "taegeuk-sam-jang" },
  { name: "Taegeuk Sa Jang", level: "Red Belt", id: "taegeuk-sa-jang" },
  { name: "Taegeuk Oh Jang", level: "Red Belt", id: "taegeuk-oh-jang" },
  { name: "Taegeuk Yuk Jang", level: "Red Belt", id: "taegeuk-yuk-jang" },
  { name: "Taegeuk Chil Jang", level: "Black Belt", id: "taegeuk-chil-jang" },
  { name: "Taegeuk Pal Jang", level: "Black Belt", id: "taegeuk-pal-jang" },
];

/* Belt color dot mapping */
const beltDot: Record<string, string> = {
  "White Belt": "bg-white border border-brand-taupe/40",
  "Yellow Belt": "bg-yellow-400",
  "Green Belt": "bg-green-600",
  "Blue Belt": "bg-blue-600",
  "Red Belt": "bg-red-600",
  "Black Belt": "bg-brand-black",
};

/* Group forms by belt level, preserving order */
function groupByBelt(items: Form[]): { belt: string; forms: Form[] }[] {
  const groups: { belt: string; forms: Form[] }[] = [];
  for (const form of items) {
    const last = groups[groups.length - 1];
    if (last && last.belt === form.level) {
      last.forms.push(form);
    } else {
      groups.push({ belt: form.level, forms: [form] });
    }
  }
  return groups;
}

const beltGroups = groupByBelt(forms);

export function FormsLibrary(): React.ReactElement {
  const [activeId, setActiveId] = useState(forms[0].id);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  /* Track which card is in view */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { threshold: 0.4, rootMargin: "-80px 0px -40% 0px" }
    );

    cardRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function scrollTo(id: string): void {
    const el = cardRefs.current.get(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  return (
    <div>
      <h1 className="font-heading text-3xl text-brand-black">Poomsae Forms</h1>
      <p className="mt-3 text-brand-black/60">
        Practice videos for each form. Select a belt level or scroll to browse.
      </p>

      <div className="mt-8 flex gap-8 lg:gap-12">
        {/* Sticky sidebar nav — hidden on mobile, shown on md+ */}
        <nav className="hidden md:block">
          <div className="sticky top-28 w-48 shrink-0">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/40">
              Library
            </span>
            <div className="mt-3 flex flex-col gap-1">
              {beltGroups.map((group) => (
                <div key={group.belt}>
                  {/* Belt level header */}
                  <div className="mt-3 mb-1 flex items-center gap-2 first:mt-0">
                    <span
                      className={`inline-block h-2 w-2 shrink-0 rounded-full ${beltDot[group.belt] || "bg-gray-400"}`}
                    />
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-black/60">
                      {group.belt}
                    </span>
                  </div>
                  {/* Form links */}
                  {group.forms.map((form) => (
                    <button
                      key={form.id}
                      type="button"
                      onClick={() => scrollTo(form.id)}
                      className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                        activeId === form.id
                          ? "bg-brand-cream font-medium text-brand-red"
                          : "text-brand-black/50 hover:bg-brand-cream/60 hover:text-brand-black/80"
                      }`}
                    >
                      {form.name}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile belt filter — horizontal scroll on small screens */}
        <div className="mb-4 flex gap-2 overflow-x-auto md:hidden">
          {beltGroups.map((group) => (
            <button
              key={group.belt}
              type="button"
              onClick={() => scrollTo(group.forms[0].id)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand-taupe/30 bg-brand-cream px-3 py-1.5 text-xs font-medium text-brand-black/60 transition-colors hover:text-brand-black"
            >
              <span
                className={`inline-block h-2 w-2 rounded-full ${beltDot[group.belt] || "bg-gray-400"}`}
              />
              {group.belt}
            </button>
          ))}
        </div>

        {/* Video grid */}
        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {forms.map((form) => (
              <div
                key={form.id}
                id={form.id}
                ref={(el) => {
                  if (el) cardRefs.current.set(form.id, el);
                }}
                className="scroll-mt-28 overflow-hidden rounded-[1.5rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15"
              >
                <div className="flex h-48 items-center justify-center rounded-[calc(1.5rem-6px)] bg-brand-sand text-sm text-brand-black/40">
                  Video: {form.name}
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-lg text-brand-black">
                    {form.name}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span
                      className={`inline-block h-2 w-2 rounded-full ${beltDot[form.level] || "bg-gray-400"}`}
                    />
                    <p className="text-xs font-medium text-brand-black/50">
                      {form.level}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
