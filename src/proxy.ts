import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { IS_LOCAL_AUTH_BYPASS } from "@/lib/auth-mode";

const isProtectedRoute = createRouteMatcher([
  "/members(.*)",
  "/students(.*)",
  "/student-resources(.*)",
  "/admin(.*)",
  "/api/admin(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (IS_LOCAL_AUTH_BYPASS) {
    return;
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|videos|fonts).*)",
    "/(api|trpc)(.*)",
  ],
};
