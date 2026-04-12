"use client";
import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Show, UserButton, SignInButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { NAV_LINKS } from "@/types";
import { Button } from "@/components/ui/button";

type MobileMenuProps = { open: boolean; onClose: () => void };

export function MobileMenu({ open, onClose }: MobileMenuProps): React.ReactElement {
  useEffect(() => {
    if (open) { document.body.style.overflow = "hidden"; } else { document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[998] bg-black/60" onClick={onClose} />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed right-0 top-0 z-[999] flex h-full w-4/5 max-w-sm flex-col p-8" style={{ backgroundColor: "#1a1a2e", backdropFilter: "none" }}>
            <button onClick={onClose} className="mb-8 self-end text-white" aria-label="Close menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
