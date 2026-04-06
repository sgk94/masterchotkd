import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dmSerifDisplay, inter } from "@/lib/fonts";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = createMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <ClerkProvider>
      <html lang="en" className={`${dmSerifDisplay.variable} ${inter.variable}`}>
        <body className="font-body antialiased">
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
                telephone: "+1-425-361-0688",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "3221 184th St SW STE 100",
                  addressLocality: "Lynnwood",
                  addressRegion: "WA",
                  postalCode: "98037",
                  addressCountry: "US",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 47.8284,
                  longitude: -122.3142,
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
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
