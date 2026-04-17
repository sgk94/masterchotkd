import { scheduleClassPalette, scheduleRows } from "@/lib/static-data";
import { BezelCard } from "@/components/ui/bezel-card";

const DAYS = [
  { key: 1, label: "Mon", full: "Monday" },
  { key: 2, label: "Tue", full: "Tuesday" },
  { key: 3, label: "Wed", full: "Wednesday" },
  { key: 4, label: "Thu", full: "Thursday" },
  { key: 5, label: "Fri", full: "Friday" },
  { key: 6, label: "Sat", full: "Saturday" },
];

const colorMap: Record<string, { bg: string; accent: string; text: string; dot?: string }> = {
  [scheduleClassPalette.morningClass.color]: scheduleClassPalette.morningClass,
  [scheduleClassPalette.tinyTigers.color]: scheduleClassPalette.tinyTigers,
  [scheduleClassPalette.beginner.color]: scheduleClassPalette.beginner,
  [scheduleClassPalette.intermediate.color]: scheduleClassPalette.intermediate,
  [scheduleClassPalette.advanced.color]: scheduleClassPalette.advanced,
  [scheduleClassPalette.familyAllBelts.color]: scheduleClassPalette.familyAllBelts,
  [scheduleClassPalette.adultTeens.color]: scheduleClassPalette.adultTeens,
  [scheduleClassPalette.leadershipDemo.color]: scheduleClassPalette.leadershipDemo,
  [scheduleClassPalette.competitionTeam.color]: scheduleClassPalette.competitionTeam,
};

const ease = "cubic-bezier(0.32, 0.72, 0, 1)";

export function ScheduleGrid(): React.ReactElement {
  return (
    <div className="animate-fade-up">
      <BezelCard>
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
                            style={{ backgroundColor: palette.dot ?? row.color }}
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
      </BezelCard>

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
