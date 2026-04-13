const PACIFIC_TIME_ZONE = "America/Los_Angeles";
const SCHEDULE_REVALIDATE_SECONDS = 60 * 60;

export type CycleName = "Cycle 1" | "Cycle 2" | "Cycle 3";

export type CycleScheduleEntry = {
  cycle: CycleName;
  startDate: string;
  weapon: string;
  shortWeapon: "BME" | "JB" | "SJB";
};

export type CurrentCycleWindow = {
  status: "upcoming" | "active";
  cycle: CycleName;
  startDate: string;
  weapon: string;
  shortWeapon: "BME" | "JB" | "SJB";
  nextChangeDate: string | null;
  nextCycle: CycleScheduleEntry | null;
};

const initialCycle2026: CycleScheduleEntry = {
  cycle: "Cycle 2",
  startDate: "2026-01-01",
  weapon: "Jahng Bong",
  shortWeapon: "JB",
};

export const cycleSchedule2026: CycleScheduleEntry[] = [
  { cycle: "Cycle 3", startDate: "2026-04-18", weapon: "Sahng Jeol Bong", shortWeapon: "SJB" },
  { cycle: "Cycle 1", startDate: "2026-06-28", weapon: "Bahng Mang Ee", shortWeapon: "BME" },
  { cycle: "Cycle 2", startDate: "2026-09-05", weapon: "Jahng Bong", shortWeapon: "JB" },
  { cycle: "Cycle 3", startDate: "2026-11-15", weapon: "Sahng Jeol Bong", shortWeapon: "SJB" },
];

export const cycleScheduleRevalidateSeconds = SCHEDULE_REVALIDATE_SECONDS;

function dateKeyToUtcDate(dateKey: string): Date {
  return new Date(`${dateKey}T12:00:00Z`);
}

function getPacificDateKey(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: PACIFIC_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function formatCycleDate(dateKey: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: PACIFIC_TIME_ZONE,
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(dateKeyToUtcDate(dateKey));
}

export function getCurrentCycleWindow(now: Date = new Date()): CurrentCycleWindow {
  const today = getPacificDateKey(now);
  const nextIndex = cycleSchedule2026.findIndex((entry) => today < entry.startDate);

  if (nextIndex === 0) {
    const currentCycle = initialCycle2026;
    return {
      status: "active",
      ...currentCycle,
      nextChangeDate: cycleSchedule2026[0]?.startDate ?? null,
      nextCycle: cycleSchedule2026[0] ?? null,
    };
  }

  if (nextIndex === -1) {
    const activeCycle = cycleSchedule2026[cycleSchedule2026.length - 1];
    return {
      status: "active",
      ...activeCycle,
      nextChangeDate: null,
      nextCycle: null,
    };
  }

  const activeCycle = cycleSchedule2026[nextIndex - 1];
  return {
    status: "active",
    ...activeCycle,
    nextChangeDate: cycleSchedule2026[nextIndex]?.startDate ?? null,
    nextCycle: cycleSchedule2026[nextIndex] ?? null,
  };
}
