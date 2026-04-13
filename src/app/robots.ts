import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://masterchostaekwondo.com";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/members/", "/students/", "/api/", "/student-resources/", "/preview/"] }, sitemap: `${BASE_URL}/sitemap.xml` };
}
