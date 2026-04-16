export type NavLink = { label: string; href: string };
export type MemberNavLink = NavLink & { description?: string };
export type ProgramNavLink = NavLink & { description: string; image: string };

export const PRIMARY_NAV: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Schedule", href: "/schedule" },
  { label: "Reviews", href: "/reviews" },
  { label: "Members", href: "/members" },
  { label: "Contact", href: "/contact" },
];

export const PROGRAM_NAV: ProgramNavLink[] = [
  {
    label: "Tiny Tigers",
    href: "/programs/tiny-tigers",
    description: "Ages 4-6",
    image: "/images/Tiny-Tigers.jpg",
  },
  {
    label: "Black Belt Club",
    href: "/programs/black-belt-club",
    description: "All ages",
    image: "/images/Black-Belt-Club.jpg",
  },
  {
    label: "Leadership Club",
    href: "/programs/leadership-club",
    description: "Advanced students",
    image: "/images/Leadership_Demo-Team.jpg",
  },
  {
    label: "Competition Team",
    href: "/programs/competition-team",
    description: "Tournament athletes",
    image: "/images/Competition-Team.jpg",
  },
];

export const MEMBER_NAV: MemberNavLink[] = [
  { label: "Announcements", href: "/members", description: "Monthly updates" },
  { label: "Current Cycle", href: "/members/current-cycle", description: "Current cycle materials" },
  { label: "Tiny Tigers", href: "/members/curriculum/tiny-tigers", description: "Ages 4-6 resources" },
  { label: "Color Belt", href: "/members/curriculum/color-belt", description: "Color belt curriculum" },
  { label: "Red/Black Belt", href: "/members/curriculum/red-black-belt", description: "Black belt preparation" },
  { label: "Black Belt Curriculum", href: "/members/curriculum/black-belt-club", description: "Members-only black belt training information" },
  { label: "Resources", href: "/members/resources", description: "Training materials" },
];
