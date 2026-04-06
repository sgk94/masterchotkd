export type NavLink = {
  label: string;
  href: string;
};

export type Program = {
  id: string;
  name: string;
  slug: string;
  description: string;
  ageRange: string;
  imageUrl: string;
  order: number;
};

export type ScheduleSlot = {
  id: string;
  programId: string;
  programName: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  instructor: string;
  capacity: number;
  currentBookings: number;
};

export type Testimonial = {
  id: string;
  name: string;
  rating: number;
  text: string;
};

export const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Schedule", href: "/schedule" },
  { label: "Reviews", href: "/reviews" },
  { label: "Students", href: "/students" },
  { label: "Contact", href: "/contact" },
];
