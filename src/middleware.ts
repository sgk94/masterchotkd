// TODO: re-enable Clerk middleware when keys are configured
// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
//
// const isProtectedRoute = createRouteMatcher(["/students(.*)"]);
//
// export default clerkMiddleware(async (auth, req) => {
//   if (isProtectedRoute(req)) { await auth.protect(); }
// });

import { NextResponse } from "next/server";

export default function middleware(): NextResponse {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"],
};
