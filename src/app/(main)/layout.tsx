import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function MainLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <div className="h-16" /> {/* Spacer for fixed nav */}
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
