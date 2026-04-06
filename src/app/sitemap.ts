import type { MetadataRoute } from "next";
// import { db } from "@/lib/db"; // TODO: re-enable when DB is connected
import { staticPrograms } from "@/lib/static-data";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://masterchostaekwondo.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/programs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/schedule`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/reviews`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/special-offer`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
  const programPages: MetadataRoute.Sitemap = staticPrograms.map((p) => ({
    url: `${BASE_URL}/programs/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [...staticPages, ...programPages];
}
