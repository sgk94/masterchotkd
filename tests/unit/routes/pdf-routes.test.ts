import { beforeEach, describe, expect, it, vi } from "vitest";

const { authMock } = vi.hoisted(() => ({ authMock: vi.fn() }));
vi.mock("@clerk/nextjs/server", () => ({ auth: authMock }));

import * as colorBeltHandbook from "@/app/student-resources/color-belt-handbook/route";
import * as monthlyChoreSheet from "@/app/student-resources/monthly-chore-sheet/route";
import * as readingList from "@/app/student-resources/reading-list/route";
import * as respectSheet from "@/app/student-resources/respect-sheet/route";
import * as starChart from "@/app/student-resources/star-chart/route";
import * as testingEssayTopics from "@/app/student-resources/testing-essay-topics/route";
import * as tinyTigerHandbook from "@/app/student-resources/tiny-tiger-handbook/route";

const routes: ReadonlyArray<
  [string, { GET: (req: Request) => Promise<Response> }]
> = [
  ["color-belt-handbook", colorBeltHandbook],
  ["monthly-chore-sheet", monthlyChoreSheet],
  ["reading-list", readingList],
  ["respect-sheet", respectSheet],
  ["star-chart", starChart],
  ["testing-essay-topics", testingEssayTopics],
  ["tiny-tiger-handbook", tinyTigerHandbook],
];

describe("protected PDF routes", () => {
  beforeEach(() => authMock.mockReset());

  it.each(routes)("%s returns 401 for signed-out users", async (_label, mod) => {
    authMock.mockResolvedValue({ userId: null });
    const res = await mod.GET(new Request("http://localhost/x"));
    expect(res.status).toBe(401);
  });

  it.each(routes)("%s returns 200 for signed-in users", async (_label, mod) => {
    authMock.mockResolvedValue({ userId: "u1" });
    const res = await mod.GET(new Request("http://localhost/x"));
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("application/pdf");
  });
});
