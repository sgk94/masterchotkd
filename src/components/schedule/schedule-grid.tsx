"use client";

import { useEffect, useRef } from "react";
import { scheduleRows } from "@/lib/static-data";

const DAYS = [
  { key: 1, label: "Mon", full: "Monday" },
  { key: 2, label: "Tue", full: "Tuesday" },
  { key: 3, label: "Wed", full: "Wednesday" },
  { key: 4, label: "Thu", full: "Thursday" },
  { key: 5, label: "Fri", full: "Friday" },
  { key: 6, label: "Sat", full: "Saturday" },
];

/* Refined palette — muted, sophisticated tints */
const colorMap: Record<string, { bg: string; accent: string; text: string }> = {
  "#f5f5f5":  { bg: "bg-brand-sand/30",       accent: "border-l-brand-taupe",     text: "text-brand-black/70" },
  "#F9E547":  { bg: "bg-amber-50",             accent: "border-l-amber-400",       text: "text-amber-900" },
  "#EF9A9A":  { bg: "bg-rose-50",              accent: "border-l-rose-400",        text: "text-rose-900" },
  "#81C784":  { bg: "bg-emerald-50",           accent: "border-l-emerald-400",     text: "text-emerald-900" },
  "#64B5F6":  { bg: "bg-sky-50",               accent: "border-l-sky-400",         text: "text-sky-900" },
  "#CE93D8":  { bg: "bg-violet-50",            accent: "border-l-violet-400",      text: "text-violet-900" },
  "#ffffff":  { bg: "bg-white",                accent: "border-l-brand-black/20",  text: "text-brand-black" },
  "#7B1FA2":  { bg: "bg-purple-50",            accent: "border-l-purple-600",      text: "text-purple-900" },
  "#42A5F5":  { bg: "bg-blue-50",              accent: "border-l-blue-500",        text: "text-blue-900" },
};

const ease = "cubic-bezier(0.32, 0.72, 0, 1)";

export function ScheduleGrid(): React.ReactElement {
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tableRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={tableRef}
      className="transition-[opacity,transform] duration-[900ms] will-change-[transform,opacity]"
      style={{ opacity: 0, transform: "translateY(2rem)", transitionTimingFunction: ease }}
    >
      {/* Double-bezel container */}
      <div className="rounded-[2rem] bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15">
        <div className="overflow-hidden rounded-[calc(2rem-6px)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse">
              {/* Premium header */}
              <thead>
                <tr>
                  <th className="bg-brand-black px-5 py-4 text-left font-heading text-xs uppercase tracking-[0.2em] text-white/60">
                    Class
                  </th>
                  {DAYS.map((day) => (
                    <th
                      key={day.key}
                      className="bg-brand-black px-4 py-4 text-center font-heading text-xs uppercase tracking-[0.2em] text-white/60"
                    >
                      <span className="hidden sm:inline">{day.full}</span>
                      <span className="sm:hidden">{day.label}</span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {scheduleRows.map((row, i) => {
                  const palette = colorMap[row.color] ?? {
                    bg: "bg-white",
                    accent: "border-l-brand-taupe",
                    text: "text-brand-black",
                  };

                  return (
                    <tr
                      key={row.className}
                      className={`group transition-colors duration-500 hover:bg-brand-cream/50 ${i !== scheduleRows.length - 1 ? "border-b border-brand-taupe/10" : ""}`}
                      style={{ transitionTimingFunction: ease }}
                    >
                      {/* Class name with accent border */}
                      <td
                        className={`border-l-[3px] ${palette.accent} px-5 py-3.5`}
                      >
                        <span
                          className={`inline-flex items-center gap-2 text-[13px] font-semibold tracking-wide ${palette.text}`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full`}
                            style={{ backgroundColor: row.color === "#ffffff" ? "#1a1a2e" : row.color === "#f5f5f5" ? "#d4c5b0" : row.color }}
                          />
                          {row.className}
                        </span>
                      </td>

                      {/* Time slots */}
                      {DAYS.map((day) => {
                        const time = row.slots[day.key];
                        return (
                          <td
                            key={day.key}
                            className="px-4 py-3.5 text-center"
                          >
                            {time ? (
                              <span
                                className={`inline-block rounded-full ${palette.bg} px-3 py-1 text-[13px] font-medium ${palette.text} transition-transform duration-500 group-hover:scale-105`}
                                style={{ transitionTimingFunction: ease }}
                              >
                                {time}
                              </span>
                            ) : (
                              <span className="inline-block text-brand-taupe/30">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footnotes */}
      <div className="mt-6 flex flex-col gap-1.5 px-2">
        <p className="text-[11px] leading-relaxed tracking-wide text-brand-black/40">
          * Must be a part of said team in order to participate in these classes.
        </p>
        <p className="text-[11px] leading-relaxed tracking-wide text-brand-black/40">
          *** Private/Intensive Classes can be scheduled in the office.
        </p>
        <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.15em] text-brand-black/25">
          Schedule effective 01/01/2026
        </p>
      </div>
    </div>
  );
}
