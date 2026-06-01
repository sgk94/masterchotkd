export const IS_LOCAL_AUTH_BYPASS =
  process.env.NODE_ENV !== "production" &&
  process.env.NEXT_PUBLIC_SITE_URL?.includes("localhost") === true;
