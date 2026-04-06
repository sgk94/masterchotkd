"use client";
import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/types";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";

export function Navbar(): React.ReactElement {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav className="bg-brand-black sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-heading text-xl font-bold text-brand-gold">MASTER CHO&apos;S</Link>
        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-white/80 transition-colors hover:text-white">{link.label}</Link>
          ))}
          <Button variant="primary" href="/special-offer">Special Offer</Button>
        </div>
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
