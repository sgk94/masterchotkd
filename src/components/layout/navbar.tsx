"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";

const leftLinks = [
  { label: "Programs", href: "/programs" },
  { label: "Schedule", href: "/schedule" },
  { label: "About", href: "/about" },
];

const rightLinks = [
  { label: "Students", href: "/students" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

export function Navbar(): React.ReactElement {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  function navLink(link: { label: string; href: string }): React.ReactElement {
    const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
    return (
      <Link
        key={link.href}
        href={link.href}
        className={`relative text-sm transition-colors duration-300 ${isActive ? "text-white" : "text-white/60 hover:text-white"}`}
      >
        {link.label}
        {isActive && (
          <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-brand-gold" />
        )}
      </Link>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full px-6 py-2.5 shadow-lg shadow-black/20 ring-1 ring-white/[0.06]" style={{ backgroundColor: "#1a1a2e" }}>
        {/* Left — dojang links */}
        <div className="hidden items-center gap-6 md:flex">
          {leftLinks.map(navLink)}
        </div>

        {/* Center — logo */}
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <Image src="/images/logo.svg" alt="Master Cho's Black Belt Academy" width={44} height={44} className="h-11 w-11" />
          <span className="hidden font-heading text-lg font-bold tracking-wide text-brand-gold sm:inline">
            MASTER CHO&apos;S TAEKWONDO
          </span>
        </Link>

        {/* Right — student links + CTA */}
        <div className="hidden items-center gap-6 md:flex">
          {rightLinks.map(navLink)}
          <Button variant="primary" href="/special-offer" className="px-5 py-2.5 text-xs">
            Special Offer
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button className="flex h-11 w-11 items-center justify-center text-white md:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </nav>
  );
}
