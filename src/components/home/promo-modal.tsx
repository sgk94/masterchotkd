"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "masterchos-promo-dismissed";

export function PromoModal(): React.ReactElement {
  const [show, setShow] = useState(false);

  const handleClose = useCallback((): void => {
    setShow(false);
    sessionStorage.setItem(STORAGE_KEY, "true");
  }, []);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      const timer = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!show) return;
    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [show, handleClose]);

  if (!show) return <></>;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Special offer"
      style={{
        animation: "fade-up 0.4s ease-out",
      }}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-card bg-brand-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-brand-red via-brand-gold to-brand-red" />

        <button
          onClick={handleClose}
          className="absolute right-4 top-5 flex h-8 w-8 items-center justify-center rounded-full text-brand-black/40 transition-colors hover:bg-brand-cream hover:text-brand-black"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="1" y1="1" x2="13" y2="13" /><line x1="13" y1="1" x2="1" y2="13" />
          </svg>
        </button>

        <div className="px-8 pb-8 pt-7 text-center">
          <p className="text-xs font-semibold uppercase tracking-[4px] text-brand-gold">
            Limited time offer
          </p>
          <h2 className="mt-3 font-heading text-3xl tracking-tight text-brand-black sm:text-4xl">
            Buy one, get one free
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-brand-black/60">
            Enroll one student and bring a friend or family member for free.
            Start your martial arts journey together.
          </p>

          <div className="mx-auto mt-6 flex max-w-xs flex-col gap-3">
            <Button variant="primary" href="/special-offer" className="w-full" onClick={handleClose}>
              Claim this offer
            </Button>
            <button
              onClick={handleClose}
              className="text-sm text-brand-black/40 transition-colors hover:text-brand-black/60"
            >
              No thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
