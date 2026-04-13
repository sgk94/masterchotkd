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
  {
    id: "t1",
    name: "MCTKD Parent",
    rating: 5,
    text: "Master Cho has been an incredible teacher for our whole family. He doesn't just teach Taekwondo. He teaches respect, self-confidence, and discipline in a way that really sticks. The impact on our kids has been especially meaningful; they've grown not only in their martial arts skills but also in their character. Master Cho treats every student with genuine respect and makes you feel like part of the family. We highly recommend his programs to anyone looking for a place that builds both skill and personal growth.",
    featured: true,
    order: 1,
  },
  {
    id: "t2",
    name: "MCTKD Parent",
    rating: 5,
    text: "Master Cho's Taekwondo has been such a positive experience for our family. Since my daughter started Taekwondo, I've seen her confidence and self-esteem grow little by little. The instructors are patient, kind, and make learning fun while teaching the true spirit of Taekwondo. My kid enjoys it so much that she wishes she could go everyday.",
    featured: true,
    order: 2,
  },
  {
    id: "t3",
    name: "MCTKD Parent",
    rating: 5,
    text: "Master Cho is an amazing instructor. He teaches very well and incorporates lessons of respect, self-confidence and discipline into classes. You can tell he truly cares about his students and even the families of his students. My children have been attending this school for years. They love Master Cho and always look forward to attending their classes every week.",
    featured: true,
    order: 3,
  },
  {
    id: "t4",
    name: "MCTKD Parent",
    rating: 5,
    text: "My two children have been taking classes at Master Cho's Taekwondo for about a year and a half. They love Master Cho who is kind and funny while being firm and expects the best from his students. It's evident he cares a lot about his students and the kids have found good camaraderie with the other students across belt levels. It is definitely a commitment but worth the time as you'll see increased discipline, confidence, and strength in your kids.",
    featured: false,
    order: 4,
  },
  {
    id: "t5",
    name: "MCTKD Student",
    rating: 5,
    text: "I have been doing classes for 3 to 4 years and I have become a better person. I love my master and all the teachers there. I have also been to many of their events and I loved each one. I definitely recommend it for people who want to become stronger and I think it also is great for focus and discipline.",
    featured: false,
    order: 5,
  },
  {
    id: "t6",
    name: "MCTKD Parent",
    rating: 5,
    text: "We are so thankful for Master Cho and his amazing instructors. Their dedication and positive guidance have helped my child grow in confidence, respect, and discipline both inside and outside of class.",
    featured: false,
    order: 6,
  },
  {
    id: "t7",
    name: "MCTKD Student",
    rating: 5,
    text: "Master Cho does an excellent job blending traditional Taekwondo with the modern sport aspect of the art.",
    featured: false,
    order: 7,
  },
  {
    id: "t8",
    name: "MCTKD Parent",
    rating: 5,
    text: "Grand Master Cho and his team of masters and instructors create such a supportive and encouraging environment. They go beyond teaching Taekwondo by helping students build strong character and everyday life skills.",
    featured: false,
    order: 8,
  },
];
