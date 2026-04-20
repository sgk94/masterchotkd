import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

const BASE_URL = getSiteUrl();

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/members/", "/students/", "/api/", "/student-resources/", "/preview/", "/sign-in/", "/sign-up/"] }, sitemap: `${BASE_URL}/sitemap.xml` };
}
