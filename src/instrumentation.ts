export async function register(): Promise<void> {
  if (process.env.NODE_ENV !== "production") return;
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  // Fail the deploy fast if required server env vars are missing,
  // rather than returning 500s on the first user request.
  const { getServerEnv } = await import("@/lib/server-env");
  try {
    getServerEnv();
  } catch (err) {
    console.error(
      "Server env validation failed at boot — missing one of: CLERK_SECRET_KEY, RESEND_API_KEY, RESEND_FROM_EMAIL, NOTIFY_EMAIL",
      err,
    );
    throw err;
  }
}
