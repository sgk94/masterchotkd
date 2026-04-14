import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { heading, body } from "@/lib/fonts";
import { BUSINESS_LOCATION, BUSINESS_PHONE_STRUCTURED } from "@/lib/location";
import { createMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = createMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="grain font-body antialiased">
        <ClerkProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                name: "Master Cho's Taekwondo",
                description:
                  "Premier Taekwondo academy in Lynnwood, WA offering classes for all ages — from Tiny Tigers to adult Black Belt programs.",
                url: "https://masterchostaekwondo.com",
                telephone: BUSINESS_PHONE_STRUCTURED,
                address: {
                  "@type": "PostalAddress",
                  ...BUSINESS_LOCATION,
                },
                openingHoursSpecification: [
                  {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
                    opens: "15:00",
                    closes: "20:00",
                  },
                  {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: "Saturday",
                    opens: "09:00",
                    closes: "13:00",
                  },
                ],
                image: "https://masterchostaekwondo.com/images/og-image.jpg",
                sameAs: [],
              }),
            }}
          />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
