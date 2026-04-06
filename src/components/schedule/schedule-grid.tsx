import { scheduleRows } from "@/lib/static-data";

const DAYS = [
  { key: 1, label: "Monday" },
  { key: 2, label: "Tuesday" },
  { key: 3, label: "Wednesday" },
  { key: 4, label: "Thursday" },
  { key: 5, label: "Friday" },
  { key: 6, label: "Saturday" },
];

export function ScheduleGrid(): React.ReactElement {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px] border-collapse text-sm">
        <thead>
          <tr>
            <th className="border border-brand-taupe bg-brand-cream p-3 text-left font-heading text-brand-black">
              Class
            </th>
            {DAYS.map((day) => (
              <th
                key={day.key}
                className="border border-brand-taupe bg-brand-cream p-3 text-center font-heading text-brand-black"
              >
                {day.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scheduleRows.map((row) => {
            const isDark = row.color === "#7B1FA2";
            return (
              <tr key={row.className}>
                <td
                  className="border border-brand-taupe p-3 font-semibold"
                  style={{
                    backgroundColor: row.color,
                    color: isDark ? "white" : undefined,
                  }}
                >
                  {row.className}
                </td>
                {DAYS.map((day) => {
                  const time = row.slots[day.key];
                  return (
                    <td
                      key={day.key}
                      className="border border-brand-taupe p-3 text-center text-[15px] font-medium"
                      style={{
                        backgroundColor: time ? row.color : "#fafafa",
                        color: isDark && time ? "white" : undefined,
                      }}
                    >
                      {time ?? ""}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="mt-4 text-xs text-brand-black/50">
        * Must be a part of said team in order to participate in these classes.
        <br />
        *** Private/Intensive Classes can be scheduled in the office.
      </p>
      <p className="mt-2 text-xs font-medium text-brand-black/40">
        Schedule effective 01/01/2026
      </p>
    </div>
  );
}
