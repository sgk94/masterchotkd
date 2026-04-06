"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/types";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";

export function Navbar(): React.ReactElement {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-brand-black/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
          <Image src="/images/logo.svg" alt="Master Cho's Black Belt Academy" width={48} height={48} className="h-12 w-12" />
          <span className="hidden font-heading text-xl font-bold text-brand-gold sm:inline">MASTER CHO&apos;S</span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm transition-colors ${isActive ? "text-white" : "text-white/60 hover:text-white"}`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-brand-gold" />
                )}
              </Link>
            );
          })}
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
