import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

const SITE_NAME = "Master Cho's Taekwondo";
const SITE_DESCRIPTION = "Lynnwood's premier Taekwondo academy. Classes for all ages — Tiny Tigers through adult Black Belt. Start a 2-week trial for $49.";

export function createMetadata(overrides: Partial<Metadata> = {}): Metadata {
  const rawTitle = overrides.title ? `${overrides.title} | ${SITE_NAME}` : `${SITE_NAME} — Martial Arts Academy in Lynnwood`;
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
