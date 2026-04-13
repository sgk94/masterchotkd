import type { Metadata } from "next";

const SITE_NAME = "Master Cho's Taekwondo";
const SITE_DESCRIPTION = "Lynnwood's premier Taekwondo academy. Classes for all ages — Tiny Tigers through adult Black Belt. Making a difference, one belt at a time. Start with a 2-week trial for $49.";

// Prefer production domain if set, otherwise use Vercel's auto-provided URL, then fall back
function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://masterchostaekwondo.com";
}

export function createMetadata(overrides: Partial<Metadata> = {}): Metadata {
  const rawTitle = overrides.title ? `${overrides.title} | ${SITE_NAME}` : `${SITE_NAME} — Martial Arts Academy in Lynnwood, WA`;
  const description = (overrides.description as string) ?? SITE_DESCRIPTION;
  const siteUrl = getSiteUrl();
  return {
    title: rawTitle,
    description,
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: rawTitle,
      description,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: SITE_NAME }],
      ...(overrides.openGraph as Record<string, unknown>),
    },
    twitter: { card: "summary_large_image", title: rawTitle, description },
    ...overrides,
  };
}
