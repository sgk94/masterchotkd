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
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
