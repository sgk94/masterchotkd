// TODO: Remove this file once database is connected. Used for UI preview only.

export const staticPrograms = [
  { id: "1", name: "Tiny Tigers", slug: "tiny-tigers", description: "Designed for our youngest students in mind, this program focuses on teaching foundational life skills accompanied by listening, following directions, and self-confidence.", ageRange: "Ages 4-6", imageUrl: "/images/Tiny-Tigers.jpg", order: 1 },
  { id: "2", name: "Black Belt Club", slug: "black-belt-club", description: "Designed for students committed to mastering Taekwondo, our standard program offers up to three classes per week, allowing students to fully immerse themselves in the art and progress at an accelerated pace.", ageRange: "All ages", imageUrl: "/images/Black-Belt-Club.jpg", order: 2 },
  { id: "3", name: "Leadership Club", slug: "leadership-club", description: "For those looking to gain a deeper understanding and immersion in Taekwondo. Grand Master Cho believes one of the most effective ways to learn is by experiencing and teaching — firsthand.", ageRange: "Advanced students", imageUrl: "/images/Leadership_Demo-Team.jpg", order: 3 },
  { id: "4", name: "Competition Team", slug: "competition-team", description: "For dedicated athletes who want to compete at local, regional, and national tournaments. Focused training on sparring, forms, and breaking techniques.", ageRange: "Tournament athletes", imageUrl: "/images/Competition-Team.jpg", order: 4 },
];

export const scheduleClassPalette = {
  morningClass: {
    color: "#E9E1D6",
    bg: "bg-stone-100",
    accent: "border-l-stone-300",
    text: "text-stone-800",
    dot: "#C9B8A4",
  },
  tinyTigers: {
    color: "#E9BFE9",
    bg: "bg-fuchsia-100",
    accent: "border-l-fuchsia-300",
    text: "text-fuchsia-900",
  },
  beginner: {
    color: "#F4EA72",
    bg: "bg-yellow-100",
    accent: "border-l-yellow-400",
    text: "text-yellow-900",
  },
  intermediate: {
    color: "#8DDB8B",
    bg: "bg-emerald-100",
    accent: "border-l-emerald-400",
    text: "text-emerald-900",
  },
  advanced: {
    color: "#E77976",
    bg: "bg-rose-100",
    accent: "border-l-rose-400",
    text: "text-rose-900",
  },
  familyAllBelts: {
    color: "#B886EE",
    bg: "bg-violet-100",
    accent: "border-l-violet-400",
    text: "text-violet-900",
  },
  adultTeens: {
    color: "#D9D9D9",
    bg: "bg-zinc-100",
    accent: "border-l-zinc-300",
    text: "text-zinc-800",
  },
  leadershipDemo: {
    color: "#6F3CB8",
    bg: "bg-purple-100",
    accent: "border-l-purple-600",
    text: "text-purple-900",
  },
  competitionTeam: {
    color: "#57A5EB",
    bg: "bg-sky-100",
    accent: "border-l-sky-500",
    text: "text-sky-900",
  },
} as const;

export const skillLevelPalette = {
  beginner: {
    accent: "text-yellow-800",
    accentBg: "bg-yellow-400/15 ring-yellow-500/25",
  },
  intermediate: {
    accent: "text-emerald-700",
    accentBg: "bg-emerald-500/12 ring-emerald-500/25",
  },
  advanced: {
    accent: "text-rose-700",
    accentBg: "bg-rose-500/12 ring-rose-500/25",
  },
} as const;

// Schedule effective 01/01/2026
// Days: 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
export type ScheduleRow = {
  className: string;
  color: string;
  slots: Record<number, string>; // dayOfWeek -> time string (empty = no class)
  note?: string;
};

export const scheduleRows: ScheduleRow[] = [
  {
    className: "Morning Class",
    color: scheduleClassPalette.morningClass.color,
    slots: { 1: "Private Lessons", 2: "Private Lessons", 3: "Private Lessons", 4: "Private Lessons", 5: "Private Lessons" },
  },
  {
    className: "Tiny Tigers 3-6",
    color: scheduleClassPalette.tinyTigers.color,
    slots: { 1: "3:30-4:10", 2: "4:40-5:20", 3: "3:30-4:10", 4: "4:40-5:20", 5: "4:50-5:30" },
  },
  {
    className: "White-Yellow (Beginner)",
    color: scheduleClassPalette.beginner.color,
    slots: { 1: "4:10-4:50", 2: "6:00-6:40", 3: "4:10-4:50", 4: "6:00-6:40", 5: "4:10-4:50" },
  },
  {
    className: "Camo-Purple (Intermediate)",
    color: scheduleClassPalette.intermediate.color,
    slots: { 1: "5:30-6:10", 2: "4:00-4:40", 3: "5:30-6:10", 4: "4:00-4:40", 5: "3:30-4:10" },
  },
  {
    className: "Blue-Black (Advanced)",
    color: scheduleClassPalette.advanced.color,
    slots: { 1: "4:50-5:30", 2: "5:20-6:00", 3: "4:50-5:30", 4: "5:20-6:00", 5: "3:30-4:10" },
  },
  {
    className: "Family / All Belts",
    color: scheduleClassPalette.familyAllBelts.color,
    slots: { 1: "6:10-6:50", 2: "7:30-8:15", 3: "6:10-6:50", 4: "7:30-8:15", 5: "5:30-6:15" },
  },
  {
    className: "Adult & Teens",
    color: scheduleClassPalette.adultTeens.color,
    slots: { 1: "6:50-7:30", 3: "6:50-7:30", 5: "5:30-6:15" },
  },
  {
    className: "Leadership / Demo Team*",
    color: scheduleClassPalette.leadershipDemo.color,
    slots: { 2: "6:40-7:30", 4: "6:40-7:30", 6: "9:00 AM~" },
    note: "*Must be a part of said team to participate",
  },
  {
    className: "Competition Team*",
    color: scheduleClassPalette.competitionTeam.color,
    slots: { 1: "7:30-8:30", 3: "7:30-8:30", 5: "6:30-8:00", 6: "10:30~" },
    note: "*Must be a part of said team to participate",
  },
];

// Keep old format for compatibility with other pages
export const staticSchedules = scheduleRows.flatMap((row) =>
  Object.entries(row.slots).map(([day, time], i) => ({
    id: `${row.className}-${day}-${i}`,
    programId: "0",
    programName: row.className,
    dayOfWeek: Number(day),
    startTime: time,
    endTime: "",
    instructor: "Master Cho",
    capacity: 20,
    currentBookings: 0,
  }))
);

export const staticTestimonials = [
  { id: "t1", name: "Christina Michelle", rating: 5, text: "Great for kids and great discipline! Great instructors as well.", featured: true, order: 1 },
  { id: "t2", name: "Louis Good", rating: 5, text: "Chief Master Cho is a excellent and patient instructor that runs a fantastic school!", featured: true, order: 2 },
  { id: "t3", name: "Julana Phan", rating: 5, text: "Great instructor. If you want your kid to learn confident, self-defense & discipline. Good place to go.", featured: true, order: 3 },
];
