import { formatCycleDate, getCurrentCycleWindow } from "@/lib/current-cycle";

const PACIFIC_TIME_ZONE = "America/Los_Angeles";

export type MembersHomeAnnouncement = {
  id: string;
  label: string;
  title: string;
  body: string;
  featured?: boolean;
  href?: string;
};

export type MembersHomeQuickLink = {
  title: string;
  description: string;
  href: string;
};

export type MembersHomeContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    noteEyebrow: string;
    noteTitle: string;
    noteBody: string;
  };
  monthlyTheme: {
    eyebrow: string;
    month: string;
    title: string;
    theme: string;
    definition: string;
    example: string;
  };
  socials: {
    eyebrow: string;
    title: string;
    description: string;
    facebookUrl: string;
    instagramUrl: string;
  };
  announcementsEyebrow: string;
  announcements: MembersHomeAnnouncement[];
  memberApp: {
    eyebrow: string;
    setupEyebrow: string;
    title: string;
    description: string;
    highlights: string[];
    iosLabel: string;
    iosUrl: string;
    androidLabel: string;
    androidUrl: string;
    stepsTitle: string;
    steps: string[];
    footer: string;
  };
  quickLinksEyebrow: string;
  quickLinks: MembersHomeQuickLink[];
};

type MonthlyThemeEntry = {
  month: string;
  theme: string;
  definition: string;
  example: string;
};

const monthlyThemes: MonthlyThemeEntry[] = [
  {
    month: "January",
    theme: "Goals",
    definition: "Goals are things you decide to work toward, one step at a time.",
    example: "At Taekwondo, a student might set a goal to practice kicks at home three times this week.",
  },
  {
    month: "February",
    theme: "Courtesy",
    definition: "Courtesy means using kind words and good manners to show care for others.",
    example: "At Taekwondo, courtesy looks like bowing, saying yes sir or yes ma'am, and waiting your turn.",
  },
  {
    month: "March",
    theme: "Loyalty",
    definition: "Loyalty means standing by your team, your family, and your promises.",
    example: "At Taekwondo, loyalty means showing up, supporting classmates, and staying committed to your training.",
  },
  {
    month: "April",
    theme: "Confidence",
    definition: "Confidence means believing you can learn and improve, even when something feels hard.",
    example: "At Taekwondo, confidence is trying a new form with strong posture and giving it your best effort.",
  },
  {
    month: "May",
    theme: "Respect",
    definition: "Respect means treating people, rules, and places with care.",
    example: "At Taekwondo, respect means listening when an instructor speaks and taking care of your gear.",
  },
  {
    month: "June",
    theme: "Positive Attitude",
    definition: "A positive attitude means choosing to stay hopeful, respectful, and ready to try your best.",
    example:
      "In Taekwondo, a positive attitude means seeing challenges as chances to grow, showing respect to instructors and classmates, and doing your best even when training feels hard.",
  },
  {
    month: "July",
    theme: "Self Discipline",
    definition: "Self-discipline means doing the right thing even when no one reminds you.",
    example: "At Taekwondo, self-discipline means practicing at home and staying focused during class.",
  },
  {
    month: "August",
    theme: "Perseverance",
    definition: "Perseverance means not giving up when progress takes time.",
    example: "At Taekwondo, perseverance is keeping at a hard kick or form until it gets better.",
  },
  {
    month: "September",
    theme: "Honor",
    definition: "Honor means doing what is right and carrying yourself in a way you can be proud of.",
    example: "At Taekwondo, honor means showing good sportsmanship and treating partners fairly.",
  },
  {
    month: "October",
    theme: "Self Esteem",
    definition: "Self-esteem means knowing you matter and feeling proud of who you are becoming.",
    example: "At Taekwondo, self-esteem grows when a student stands tall, speaks clearly, and sees their own progress.",
  },
  {
    month: "November",
    theme: "Self Control",
    definition: "Self-control means staying calm and making smart choices with your words and actions.",
    example: "At Taekwondo, self-control means stopping right away when told and staying calm during drills.",
  },
  {
    month: "December",
    theme: "Integrity",
    definition: "Integrity means being honest and doing the right thing even when it is hard.",
    example: "At Taekwondo, integrity means telling the truth about your practice and taking responsibility for mistakes.",
  },
];

function getPacificMonthIndex(date: Date): number {
  return Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: PACIFIC_TIME_ZONE,
      month: "numeric",
    }).format(date),
  ) - 1;
}

function getCurrentMonthlyTheme(now: Date = new Date()): MonthlyThemeEntry {
  return monthlyThemes[getPacificMonthIndex(now)] ?? monthlyThemes[0];
}

export function getMembersHomeContent(): MembersHomeContent {
  const currentCycle = getCurrentCycleWindow();
  const currentTheme = getCurrentMonthlyTheme();
  const cycleAnnouncement =
    currentCycle.status === "upcoming"
      ? {
          id: "upcoming-cycle-weapon-focus",
          label: `Upcoming ${currentCycle.cycle}`,
          title: "Upcoming Weapon Focus",
          featured: true,
          href: "/members/current-cycle",
          body: `${currentCycle.cycle} begins on ${formatCycleDate(currentCycle.startDate)}. The weapon focus will be ${currentCycle.weapon} (${currentCycle.shortWeapon}).`,
        }
      : {
          id: "current-cycle-weapon-focus",
          label: currentCycle.cycle,
          title: "Current Weapon Focus",
          featured: true,
          href: "/members/current-cycle",
          body: currentCycle.nextChangeDate
            ? `The current testing cycle is ${currentCycle.cycle}, and the weapon focus is ${currentCycle.weapon} (${currentCycle.shortWeapon}). The next cycle change is ${formatCycleDate(currentCycle.nextChangeDate)}.`
            : `The current testing cycle is ${currentCycle.cycle}, and the weapon focus is ${currentCycle.weapon} (${currentCycle.shortWeapon}).`,
        };

  return {
    hero: {
      eyebrow: "Members Page",
      title: "Announcements",
      description:
        "This page is your members-only home base for monthly updates, testing reminders, app information, and school announcements.",
      noteEyebrow: "Monthly Note",
      noteTitle: "What To Expect Here",
      noteBody:
        "Think of this like a member newsletter. We can use it for cycle reminders, tournament notes, holiday schedules, app updates, gear reminders, and any important school news students and families should see.",
    },
    monthlyTheme: {
      eyebrow: "Theme of The Month",
      month: currentTheme.month,
      title: "Theme of The Month",
      theme: currentTheme.theme,
      definition: currentTheme.definition,
      example: currentTheme.example,
    },
    socials: {
      eyebrow: "Socials",
      title: "Stay Connected",
      description:
        "Looking for a place to connect with other parents, find updates, and keep up with news? Follow our social pages. Announcements can be posted there as well as here on the Members page.",
      facebookUrl: "https://www.facebook.com/masterchostaekwondo/",
      instagramUrl: "https://www.instagram.com/masterchostaekwondo/",
    },
    announcementsEyebrow: "Upcoming Events & Updates",
    announcements: [
      cycleAnnouncement,
      {
        id: "pnw-championship",
        label: "June 6",
        title: "PNW Championship",
        body:
          "Highline College Pavilion. Doors open at 8:00 AM.",
      },
      {
        id: "yard-sale-fundraiser",
        label: "June 13",
        title: "Yard Sale Fundraiser",
        body:
          "Korea Trip yard sale fundraiser at Master Cho's Taekwondo from 8:30 AM to 4:00 PM.",
      },
      {
        id: "yard-sale-donations",
        label: "Donate Items",
        title: "Support The Yard Sale",
        body:
          "If you'd like to donate items for the sale, please reach out to Master Cho for drop-off information.",
      },
      {
        id: "belt-registration-due",
        label: "June 17",
        title: "Belt Registration Forms Due",
        body:
          "June testing registration forms are due June 17. Testing dates are June 24 through June 26.",
      },
      {
        id: "summer-black-belt-ceremony",
        label: "June 27",
        title: "Summer Black Belt Ceremony & Potluck",
        body:
          "Join us on June 27 at Lynndale Park for the summer black belt ceremony and potluck.",
      },
      {
        id: "edmonds-fourth-of-july",
        label: "July 4",
        title: "Edmonds 4th Of July",
        body:
          "All students ages 7 and up are invited. Hosted by the City of Edmonds from 9:00 AM to 2:00 PM in Downtown Edmonds. Sign up at the front desk and attend at least 3 practices: Tue 6/16, Fri 6/19, Tue 6/23, Tue 6/30, Thu 7/2, or Fri 7/3.",
      },
    ],
    memberApp: {
      eyebrow: "Member App",
      setupEyebrow: "Setup",
      title: "Spark Member App",
      description: "Use the member app to quickly check attendance records, payment history, and your upcoming class schedule.",
      highlights: ["Attendance record", "Payment history", "Class schedule"],
      iosLabel: "iOS Member App Download",
      iosUrl: "https://apps.apple.com/us/app/spark-member/id1453013929",
      androidLabel: "Android Member App Download",
      androidUrl: "https://play.google.com/store/apps/details?id=com.sparkmembership.generalapp",
      stepsTitle: "Steps For The Member App",
      steps: [
        'Download the "Spark Member" app on iOS or Android.',
        "Enter our Taekwondo Location ID: 6287.",
        "Enter the email tied to your Taekwondo account.",
        "Check your email for a password reset link and create a password.",
        "Log in and you are all set.",
      ],
      footer:
        "The app is best for reviewing past payments, checking attendance, and confirming your schedule whenever you need it.",
    },
    quickLinksEyebrow: "Quick Links",
    quickLinks: [
      {
        title: "Tiny Tigers",
        description: "Curriculum and belt requirements for ages 4-6.",
        href: "/members/curriculum/tiny-tigers",
      },
      {
        title: "Color Belt",
        description: "Beginner through advanced color belt curriculum by cycle.",
        href: "/members/curriculum/color-belt",
      },
      {
        title: "Resources",
        description: "Additional training materials and documents.",
        href: "/members/resources",
      },
    ],
  };
}
