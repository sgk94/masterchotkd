import { describe, it, expect } from "vitest";
import nextConfig from "../../next.config";

describe("next.config", () => {
  it("optimizes Clerk package imports", () => {
    expect(nextConfig.experimental?.optimizePackageImports).toContain("@clerk/nextjs");
  });

  it("sets a 1-year image cache TTL", () => {
    expect(nextConfig.images?.minimumCacheTTL).toBe(31_536_000);
  });

  it("preserves old Foxspin URLs with permanent redirects", async () => {
    const redirects = await nextConfig.redirects?.();

    expect(redirects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ source: "/home", destination: "/", permanent: true }),
        expect.objectContaining({ source: "/about-us", destination: "/about", permanent: true }),
        expect.objectContaining({ source: "/instructors", destination: "/about", permanent: true }),
        expect.objectContaining({ source: "/belt-ranks", destination: "/members/curriculum/color-belt", permanent: true }),
        expect.objectContaining({ source: "/tiny-tigers", destination: "/programs/tiny-tigers", permanent: true }),
        expect.objectContaining({ source: "/black-belt-club", destination: "/programs/black-belt-club", permanent: true }),
        expect.objectContaining({ source: "/leadership-club", destination: "/programs/leadership-club", permanent: true }),
        expect.objectContaining({ source: "/demonstration-team", destination: "/programs/leadership-club", permanent: true }),
        expect.objectContaining({ source: "/competition-team", destination: "/programs/competition-team", permanent: true }),
        expect.objectContaining({ source: "/student-page", destination: "/members", permanent: true }),
        expect.objectContaining({ source: "/contact-us", destination: "/contact", permanent: true }),
        expect.objectContaining({ source: "/event", destination: "/", permanent: true }),
        expect.objectContaining({ source: "/videos", destination: "/members/curriculum/color-belt", permanent: true }),
        expect.objectContaining({ source: "/cart", destination: "/special-offer", permanent: true }),
        expect.objectContaining({ source: "/grand-master-cho", destination: "/about", permanent: true }),
        expect.objectContaining({ source: "/signin", destination: "/sign-in", permanent: true }),
        expect.objectContaining({ source: "/instructor-daniel-lasala", destination: "/about", permanent: true }),
        expect.objectContaining({ source: "/essay-topics", destination: "/student-resources/testing-essay-topics", permanent: true }),
        expect.objectContaining({ source: "/belt-form-videos", destination: "/members/curriculum/color-belt", permanent: true }),
        expect.objectContaining({ source: "/announcements", destination: "/members", permanent: true }),
        expect.objectContaining({ source: "/blog", destination: "/", permanent: true }),
        expect.objectContaining({ source: "/blog/:path*", destination: "/", permanent: true }),
        expect.objectContaining({ source: "/calendar", destination: "/schedule", permanent: true }),
        expect.objectContaining({ source: "/belt-graduation", destination: "/members", permanent: true }),
        expect.objectContaining({ source: "/new-members", destination: "/special-offer", permanent: true }),
      ]),
    );
  });
});
