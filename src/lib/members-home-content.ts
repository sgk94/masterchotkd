import { formatCycleDate, getCurrentCycleWindow } from "@/lib/current-cycle";

export type MembersHomeAnnouncement = {
  id: string;
  label: string;
  title: string;
  body: string;
  featured?: boolean;
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

export function getMembersHomeContent(): MembersHomeContent {
  const currentCycle = getCurrentCycleWindow();
  const cycleAnnouncement =
    currentCycle.status === "upcoming"
      ? {
          id: "upcoming-cycle-weapon-focus",
          label: `Upcoming ${currentCycle.cycle}`,
          title: "Upcoming Weapon Focus",
          featured: true,
          body: `${currentCycle.cycle} begins on ${formatCycleDate(currentCycle.startDate)}. The weapon focus will be ${currentCycle.weapon} (${currentCycle.shortWeapon}).`,
        }
      : {
          id: "current-cycle-weapon-focus",
          label: currentCycle.cycle,
          title: "Current Weapon Focus",
          featured: true,
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
    socials: {
      eyebrow: "Socials",
      title: "Stay Connected",
      description:
        "Looking for a place to connect with other parents, find updates, and keep up with news? Follow our social pages. Announcements can be posted there as well as here on the Members page.",
      facebookUrl: "https://www.facebook.com/masterchostaekwondo/",
      instagramUrl: "https://www.instagram.com/masterchostaekwondo/",
    },
    announcementsEyebrow: "Latest Updates",
    announcements: [
      cycleAnnouncement,
      {
        id: "member-app-update",
        label: "Member App",
        title: "Stay Updated With Announcements And Events",
        body:
          "Download the Spark Member app to keep up with announcements, events, attendance, class schedule, and payment history.",
      },
    ],
    memberApp: {
      eyebrow: "Member App",
      setupEyebrow: "Setup",
      title: "Spark Member App",
      description: "Download the member app to stay updated with announcements and events.",
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
        "Our member app allows you to stay caught up on announcements and events, see your class schedule, view your attendance record, and view your payment history.",
    },
    quickLinksEyebrow: "Quick Links",
    quickLinks: [
      {
        title: "Curriculum",
        description: "Belt requirements and testing criteria for each rank.",
        href: "/members/curriculum",
      },
      {
        title: "Poomsae Forms",
        description: "Video library of all forms organized by belt level.",
        href: "/members/forms",
      },
      {
        title: "Resources",
        description: "Additional training materials and documents.",
        href: "/members/resources",
      },
    ],
  };
}
