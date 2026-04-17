import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AboutPage from "@/app/(main)/about/page";
import ContactPage from "@/app/(main)/contact/page";
import SchedulePage from "@/app/(main)/schedule/page";
import ReviewsPage from "@/app/(main)/reviews/page";
import SpecialOfferPage from "@/app/(main)/special-offer/page";
import ProgramsPage from "@/app/(main)/programs/page";
import TinyTigersProgramPage from "@/app/(main)/programs/tiny-tigers/page";
import BlackBeltClubPage from "@/app/(main)/programs/black-belt-club/page";
import LeadershipClubPage from "@/app/(main)/programs/leadership-club/page";
import CompetitionTeamPage from "@/app/(main)/programs/competition-team/page";
import CurriculumHubPage from "@/app/(main)/students/curriculum/page";
import CurrentCyclePage from "@/app/(main)/students/current-cycle/page";

type PageFn = () =>
  | React.ReactElement
  | Promise<React.ReactElement>;

describe.each<readonly [string, PageFn]>([
  ["AboutPage", AboutPage as PageFn],
  ["ContactPage", ContactPage as PageFn],
  ["SchedulePage", SchedulePage as PageFn],
  ["ReviewsPage", ReviewsPage as PageFn],
  ["SpecialOfferPage", SpecialOfferPage as PageFn],
  ["ProgramsPage", ProgramsPage as PageFn],
  ["TinyTigersProgramPage", TinyTigersProgramPage as PageFn],
  ["BlackBeltClubPage", BlackBeltClubPage as PageFn],
  ["LeadershipClubPage", LeadershipClubPage as PageFn],
  ["CompetitionTeamPage", CompetitionTeamPage as PageFn],
  ["CurriculumHubPage", CurriculumHubPage as PageFn],
  ["CurrentCyclePage", CurrentCyclePage as PageFn],
])("%s", (_label, Page) => {
  it("renders an h1", async () => {
    const element = await Page();
    render(element);
    expect(
      screen.getAllByRole("heading", { level: 1 }).length,
    ).toBeGreaterThan(0);
  });
});
