import type { NextConfig } from "next";

const clerkCspOrigins = [
  "https://*.clerk.accounts.dev",
  "https://*.clerk.dev",
  "https://*.clerk.services",
];

const captchaCspOrigins = [
  "https://challenges.cloudflare.com",
];

const facebookCspOrigins = [
  "https://www.facebook.com",
  "https://connect.facebook.net",
];

const youtubeImgOrigins = [
  "https://i.ytimg.com",
];

const youtubeFrameOrigins = [
  "https://www.youtube-nocookie.com",
];

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${[...clerkCspOrigins, ...captchaCspOrigins, ...facebookCspOrigins].join(" ")}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${[...clerkCspOrigins, ...captchaCspOrigins, ...facebookCspOrigins, ...youtubeImgOrigins].join(" ")}`,
  `font-src 'self' ${clerkCspOrigins.join(" ")}`,
  `connect-src 'self' ${[...clerkCspOrigins, ...captchaCspOrigins, ...facebookCspOrigins].join(" ")}`,
  `frame-src 'self' ${[...clerkCspOrigins, ...captchaCspOrigins, ...facebookCspOrigins, ...youtubeFrameOrigins].join(" ")}`,
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@clerk/nextjs"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31_536_000,
  },
  redirects: async () => [
    {
      source: "/students",
      destination: "/members",
      permanent: true,
    },
    {
      source: "/students/:path*",
      destination: "/members/:path*",
      permanent: true,
    },
    // Old Foxspin URLs → new site (preserve SEO on cutover)
    { source: "/home", destination: "/", permanent: true },
    { source: "/about-us", destination: "/about", permanent: true },
    { source: "/instructors", destination: "/about", permanent: true },
    { source: "/belt-ranks", destination: "/members/curriculum/color-belt", permanent: true },
    { source: "/tiny-tigers", destination: "/programs/tiny-tigers", permanent: true },
    { source: "/black-belt-club", destination: "/programs/black-belt-club", permanent: true },
    { source: "/leadership-club", destination: "/programs/leadership-club", permanent: true },
    { source: "/demonstration-team", destination: "/programs/leadership-club", permanent: true },
    { source: "/competition-team", destination: "/programs/competition-team", permanent: true },
    { source: "/student-page", destination: "/members", permanent: true },
    { source: "/contact-us", destination: "/contact", permanent: true },
    { source: "/event", destination: "/", permanent: true },
    { source: "/videos", destination: "/members/curriculum/color-belt", permanent: true },
    { source: "/privacy-policy", destination: "/", permanent: true },
    { source: "/cart", destination: "/special-offer", permanent: true },
  ],
  rewrites: async () => [
    {
      source: "/members",
      destination: "/students",
    },
    {
      source: "/members/:path*",
      destination: "/students/:path*",
    },
  ],
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        {
          key: "Content-Security-Policy",
          value: contentSecurityPolicy,
        },
      ],
    },
  ],
};

export default nextConfig;
