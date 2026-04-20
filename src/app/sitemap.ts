import type { MetadataRoute } from "next";
// import { db } from "@/lib/db"; // TODO: re-enable when DB is connected
import { staticPrograms } from "@/lib/static-data";
import { getSiteUrl } from "@/lib/site-url";

const BASE_URL = getSiteUrl();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/programs`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/schedule`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/reviews`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/special-offer`, changeFrequency: "monthly", priority: 0.8 },
  ];
  const programPages: MetadataRoute.Sitemap = staticPrograms.map((p) => ({
    url: `${BASE_URL}/programs/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [...staticPages, ...programPages];
}
