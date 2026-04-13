import type { Metadata } from "next";

const SITE_NAME = "Master Cho's Taekwondo";
const SITE_DESCRIPTION = "Lynnwood's best martial arts program. Making a difference, one belt at a time. Classes for all ages.";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://masterchostaekwondo.com";

export function createMetadata(overrides: Partial<Metadata> = {}): Metadata {
  const title = overrides.title ? `${overrides.title} | ${SITE_NAME}` : SITE_NAME;
  const description = (overrides.description as string) ?? SITE_DESCRIPTION;
  return {
    title, description,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: SITE_NAME }],
      ...(overrides.openGraph as Record<string, unknown>),
    },
    twitter: { card: "summary_large_image", title, description },
    ...overrides,
  };
}
