"use client";
import { useEffect } from "react";
import Link from "next/link";
import { Show, UserButton, SignInButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

type MobileMenuProps = { open: boolean; onClose: () => void };

const mobileNavLinks = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Schedule", href: "/schedule" },
  { label: "Reviews", href: "/reviews" },
  { label: "Members", href: "/members" },
  { label: "Contact", href: "/contact" },
];

export function MobileMenu({ open, onClose }: MobileMenuProps): React.ReactElement {
  useEffect(() => {
    if (open) { document.body.style.overflow = "hidden"; } else { document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[998] bg-black/60 transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <div
        className={`fixed right-0 top-0 z-[999] flex h-full w-4/5 max-w-sm flex-col p-8 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? "translate-x-0" : "translate-x-full"}`}
        style={{ backgroundColor: "#1a1a2e" }}
        role="dialog"
        aria-modal={open}
        aria-label="Navigation menu"
        inert={!open ? true : undefined}
      >
        <button onClick={onClose} className="mb-8 self-end text-white" aria-label="Close menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="flex flex-col gap-6">
          {mobileNavLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={onClose} className="font-heading text-2xl text-white transition-colors hover:text-brand-gold">{link.label}</Link>
          ))}
        </div>
        <div className="mt-auto flex flex-col gap-4">
          <Button variant="primary" href="/special-offer" className="w-full">Special Offer</Button>
          <ClerkLoading>
            <button className="w-full rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white">
              Sign In
            </button>
          </ClerkLoading>
          <ClerkLoaded>
            <Show when="signed-out">
              <SignInButton>
                <button className="w-full rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10">
                  Sign In
                </button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <div className="flex items-center justify-center">
                <UserButton />
              </div>
            </Show>
          </ClerkLoaded>
        </div>
      </div>
    </>
  );
}
