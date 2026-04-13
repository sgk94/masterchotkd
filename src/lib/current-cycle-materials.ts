import type { CSSProperties } from "react";
import type { CycleName } from "@/lib/current-cycle";
import { skillLevelPalette } from "@/lib/static-data";

export type CycleNumber = "1" | "2" | "3";

export type BeltSwatch = {
  color: string;
  secondaryColor?: string;
  border?: boolean;
  usesCamo?: boolean;
};

export type ColorBeltCycleEntry = {
  level: "Beginner" | "Intermediate" | "Advanced";
  levelSubtitle: string;
  levelAccent: string;
  levelAccentBg: string;
  cycle: CycleNumber;
  beltName: string;
  beltDotClass: string;
  beltDotBorder?: string;
  beltDotStyle?: CSSProperties;
  swatch: BeltSwatch;
  poomsae: string;
  poomsaeVideoTitle: string;
  weapon: "BME" | "JB" | "SJB";
  oneStep: string;
  handTech: string;
  board: string;
};

export type TinyTigerCycleEntry = {
  beltName: string;
  cycle: CycleNumber;
  textColor: string;
  swatch: BeltSwatch;
  poomsae: string;
  poomsaeVideoTitle: string;
  oneStep: string;
  handTech: string;
  board: string;
};

export type WeaponShortcut = {
  title: string;
  weapon: string;
  shortWeapon: "BME" | "JB" | "SJB";
  description: string;
};

const camoPattern = "url(/images/camo-pattern.jpg)";

export const colorBeltCycleEntries: ColorBeltCycleEntry[] = [
  {
    level: "Beginner",
    levelSubtitle: "White -> Orange -> Yellow",
    levelAccent: skillLevelPalette.beginner.accent,
    levelAccentBg: skillLevelPalette.beginner.accentBg,
    cycle: "1",
    beltName: "White",
    beltDotClass: "bg-white",
    beltDotBorder: "ring-1 ring-brand-taupe/60",
    swatch: { color: "#ffffff", border: true },
    poomsae: "Basic",
    poomsaeVideoTitle: "Gibon 1 (Basic)",
    weapon: "BME",
    oneStep: "White",
    handTech: "1-6",
    board: "Hammer Fist",
  },
  {
    level: "Beginner",
    levelSubtitle: "White -> Orange -> Yellow",
    levelAccent: skillLevelPalette.beginner.accent,
    levelAccentBg: skillLevelPalette.beginner.accentBg,
    cycle: "2",
    beltName: "Orange",
    beltDotClass: "bg-orange-400",
    swatch: { color: "#FF8C00" },
    poomsae: "Taegeuk 1",
    poomsaeVideoTitle: "Taegeuk 1 Jang",
    weapon: "JB",
    oneStep: "Orange",
    handTech: "7-12",
    board: "Front Kick",
  },
  {
    level: "Beginner",
    levelSubtitle: "White -> Orange -> Yellow",
    levelAccent: skillLevelPalette.beginner.accent,
    levelAccentBg: skillLevelPalette.beginner.accentBg,
    cycle: "3",
    beltName: "Yellow",
    beltDotClass: "bg-yellow-400",
    swatch: { color: "#FACC15" },
    poomsae: "Taegeuk 2",
    poomsaeVideoTitle: "Taegeuk 2 Jang",
    weapon: "SJB",
    oneStep: "Yellow",
    handTech: "13-18",
    board: "Knife Hand",
  },
  {
    level: "Intermediate",
    levelSubtitle: "Camo -> Green -> Purple",
    levelAccent: skillLevelPalette.intermediate.accent,
    levelAccentBg: skillLevelPalette.intermediate.accentBg,
    cycle: "1",
    beltName: "Camo",
    beltDotClass: "bg-cover bg-center",
    beltDotStyle: { backgroundImage: camoPattern },
    swatch: { color: "#6B8E23", usesCamo: true },
    poomsae: "Taegeuk 3",
    poomsaeVideoTitle: "Taegeuk 3 Jang",
    weapon: "BME",
    oneStep: "Camo",
    handTech: "19-24",
    board: "Round Kick",
  },
  {
    level: "Intermediate",
    levelSubtitle: "Camo -> Green -> Purple",
    levelAccent: skillLevelPalette.intermediate.accent,
    levelAccentBg: skillLevelPalette.intermediate.accentBg,
    cycle: "2",
    beltName: "Green",
    beltDotClass: "bg-green-500",
    swatch: { color: "#22C55E" },
    poomsae: "Taegeuk 4",
    poomsaeVideoTitle: "Taegeuk 4 Jang",
    weapon: "JB",
    oneStep: "Green",
    handTech: "25-30",
    board: "Palm Strike",
  },
  {
    level: "Intermediate",
    levelSubtitle: "Camo -> Green -> Purple",
    levelAccent: skillLevelPalette.intermediate.accent,
    levelAccentBg: skillLevelPalette.intermediate.accentBg,
    cycle: "3",
    beltName: "Purple",
    beltDotClass: "bg-purple-600",
    swatch: { color: "#9333EA" },
    poomsae: "Taegeuk 5",
    poomsaeVideoTitle: "Taegeuk 5 Jang",
    weapon: "SJB",
    oneStep: "Purple",
    handTech: "31-36",
    board: "Side Kick",
  },
  {
    level: "Advanced",
    levelSubtitle: "Blue -> Brown -> Red",
    levelAccent: skillLevelPalette.advanced.accent,
    levelAccentBg: skillLevelPalette.advanced.accentBg,
    cycle: "1",
    beltName: "Blue",
    beltDotClass: "bg-blue-600",
    swatch: { color: "#2563EB" },
    poomsae: "Taegeuk 6",
    poomsaeVideoTitle: "Taegeuk 6 Jang",
    weapon: "BME",
    oneStep: "Blue",
    handTech: "37-42",
    board: "Jump Front Kick",
  },
  {
    level: "Advanced",
    levelSubtitle: "Blue -> Brown -> Red",
    levelAccent: skillLevelPalette.advanced.accent,
    levelAccentBg: skillLevelPalette.advanced.accentBg,
    cycle: "2",
    beltName: "Brown",
    beltDotClass: "bg-yellow-700",
    swatch: { color: "#A16207" },
    poomsae: "Taegeuk 7",
    poomsaeVideoTitle: "Taegeuk 7 Jang",
    weapon: "JB",
    oneStep: "Brown",
    handTech: "43-48",
    board: "Jump Round Kick",
  },
  {
    level: "Advanced",
    levelSubtitle: "Blue -> Brown -> Red",
    levelAccent: skillLevelPalette.advanced.accent,
    levelAccentBg: skillLevelPalette.advanced.accentBg,
    cycle: "3",
    beltName: "Red",
    beltDotClass: "bg-red-600",
    swatch: { color: "#DC2626" },
    poomsae: "Taegeuk 8",
    poomsaeVideoTitle: "Taegeuk 8 Jang",
    weapon: "SJB",
    oneStep: "Red",
    handTech: "49-52",
    board: "Jump Reverse Side Kick",
  },
];

export const colorBeltWeaponShortcuts: Record<CycleNumber, WeaponShortcut> = {
  "1": {
    title: "Color Belt Bahng Mahng Ee",
    weapon: "Bahng Mang Ee",
    shortWeapon: "BME",
    description: "Single-stick training for the current color belt cycle.",
  },
  "2": {
    title: "Color Belt Jahng Bong",
    weapon: "Jahng Bong",
    shortWeapon: "JB",
    description: "Long-staff training for the current color belt cycle.",
  },
  "3": {
    title: "Color Belt Ssahng Jeol Bong",
    weapon: "Sahng Jeol Bong",
    shortWeapon: "SJB",
    description: "Nunchuck training for the current color belt cycle.",
  },
};

export const tinyTigerCycleEntries: TinyTigerCycleEntry[] = [
  {
    beltName: "White",
    cycle: "1",
    textColor: "#1a1a2e",
    swatch: { color: "#ffffff", border: true },
    poomsae: "Half Basic",
    poomsaeVideoTitle: "Half Gibon 1 (Basic)",
    oneStep: "White 1",
    handTech: "1-6",
    board: "Hammer Fist",
  },
  {
    beltName: "White / Orange",
    cycle: "2",
    textColor: "#FF8C00",
    swatch: { color: "#FF8C00", secondaryColor: "#ffffff", border: true },
    poomsae: "Full Basic",
    poomsaeVideoTitle: "Full Gibon 1 (Basic)",
    oneStep: "White 1-2",
    handTech: "1-6",
    board: "Front Kick",
  },
  {
    beltName: "Orange",
    cycle: "3",
    textColor: "#FF8C00",
    swatch: { color: "#FF8C00" },
    poomsae: "Half Taegeuk 1",
    poomsaeVideoTitle: "Half Taegeuk 1",
    oneStep: "Orange 1",
    handTech: "7-12",
    board: "Knife Hand",
  },
  {
    beltName: "Orange / Yellow",
    cycle: "1",
    textColor: "#CA8A04",
    swatch: { color: "#FACC15", secondaryColor: "#FF8C00" },
    poomsae: "Full Taegeuk 1",
    poomsaeVideoTitle: "Full Taegeuk 1",
    oneStep: "Orange 1-2",
    handTech: "7-12",
    board: "Axe Kick",
  },
  {
    beltName: "Yellow",
    cycle: "2",
    textColor: "#CA8A04",
    swatch: { color: "#FACC15" },
    poomsae: "Half Taegeuk 2",
    poomsaeVideoTitle: "Half Taegeuk 2",
    oneStep: "Yellow 1",
    handTech: "13-18",
    board: "Palm Strike",
  },
  {
    beltName: "Yellow / Camo",
    cycle: "3",
    textColor: "#6B8E23",
    swatch: { color: "#6B8E23", secondaryColor: "#FACC15", usesCamo: true },
    poomsae: "Full Taegeuk 2",
    poomsaeVideoTitle: "Full Taegeuk 2",
    oneStep: "Yellow 1-2",
    handTech: "13-18",
    board: "Push Kick",
  },
  {
    beltName: "Camo",
    cycle: "1",
    textColor: "#6B8E23",
    swatch: { color: "#6B8E23", usesCamo: true },
    poomsae: "Half Taegeuk 3",
    poomsaeVideoTitle: "Half Taegeuk 3",
    oneStep: "Camo 1",
    handTech: "19-24",
    board: "Side Kick",
  },
];

export const tinyTigerWeaponShortcuts: Record<CycleNumber, WeaponShortcut> = {
  "1": {
    title: "Tiny Tigers Bahng Mang Ee",
    weapon: "Bahng Mang Ee",
    shortWeapon: "BME",
    description: "Current Tiny Tigers weapon training for Cycle 1.",
  },
  "2": {
    title: "Tiny Tigers Jahng Bong",
    weapon: "Jahng Bong",
    shortWeapon: "JB",
    description: "Current Tiny Tigers weapon training for Cycle 2.",
  },
  "3": {
    title: "Tiny Tigers Sahng Jeol Bong",
    weapon: "Sahng Jeol Bong",
    shortWeapon: "SJB",
    description: "Current Tiny Tigers weapon training for Cycle 3.",
  },
};

export function cycleNameToNumber(cycle: CycleName): CycleNumber {
  if (cycle === "Cycle 1") return "1";
  if (cycle === "Cycle 2") return "2";
  return "3";
}

export function getColorBeltEntriesForCycle(cycleNumber: CycleNumber): ColorBeltCycleEntry[] {
  return colorBeltCycleEntries.filter((entry) => entry.cycle === cycleNumber);
}

export function getTinyTigerEntriesForCycle(cycleNumber: CycleNumber): TinyTigerCycleEntry[] {
  return tinyTigerCycleEntries.filter((entry) => entry.cycle === cycleNumber);
}

export function getSwatchStyle(swatch: BeltSwatch): CSSProperties {
  if (swatch.usesCamo && swatch.secondaryColor) {
    return {
      backgroundImage: `linear-gradient(135deg, ${swatch.secondaryColor} 0%, ${swatch.secondaryColor} 48%, transparent 52%, transparent 100%), ${camoPattern}`,
      backgroundSize: "cover, cover",
      backgroundPosition: "center, center",
      border: swatch.border ? "2px solid #d4c5b0" : "none",
    };
  }

  if (swatch.usesCamo) {
    return {
      backgroundImage: camoPattern,
      backgroundSize: "cover",
      backgroundPosition: "center",
      border: swatch.border ? "2px solid #d4c5b0" : "none",
    };
  }

  return {
    background: swatch.secondaryColor
      ? `linear-gradient(135deg, ${swatch.secondaryColor} 0%, ${swatch.secondaryColor} 48%, ${swatch.color} 52%, ${swatch.color} 100%)`
      : swatch.color,
    border: swatch.border ? "2px solid #d4c5b0" : "none",
  };
}
