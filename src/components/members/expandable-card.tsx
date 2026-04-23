"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { VideoPlaceholder } from "@/components/members/shared";

const ExpandableCardContext = createContext<{
  expandedId: string | null;
  onToggle: (id: string) => void;
}>({ expandedId: null, onToggle: () => {} });

export function ExpandableCardGroup({ children }: { children: ReactNode }): React.ReactElement {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!expandedId) return;
    function handleClickOutside(e: MouseEvent): void {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-expandable-card]")) {
        setExpandedId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expandedId]);

  return (
    <ExpandableCardContext.Provider value={{ expandedId, onToggle: (id) => setExpandedId((prev) => (prev === id ? null : id)) }}>
      {children}
    </ExpandableCardContext.Provider>
  );
}

type ExpandableCardProps = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  swatch?: ReactNode;
  details: ReactNode;
  expandedLayout?: "stack" | "split";
};

export function ExpandableCard({
  id,
  eyebrow,
  title,
  subtitle,
  swatch,
  details,
  expandedLayout = "stack",
}: ExpandableCardProps): React.ReactElement {
  const { expandedId, onToggle } = useContext(ExpandableCardContext);
  const isOpen = expandedId === id;

  return (
    <div className="relative" data-expandable-card>
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
        aria-controls={`panel-${id}`}
        className={`flex w-full items-center justify-between rounded-2xl bg-white px-6 py-5 text-left transition-all duration-300 ${isOpen ? "ring-2 ring-brand-blue/25 shadow-md shadow-brand-taupe/10" : "ring-1 ring-brand-taupe/12 hover:shadow-sm"}`}
      >
        <div className="flex items-center gap-3">
          {swatch}
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-red/60">{eyebrow}</p>
            <p className="mt-1 font-heading text-lg text-brand-black">{title}</p>
            <p className="text-sm text-brand-black/50">{subtitle}</p>
          </div>
        </div>
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-cream text-brand-black/30 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
        </div>
      </button>
      {isOpen && (
        <div id={`panel-${id}`} role="region" className="absolute left-0 right-0 top-full z-20 mt-2 rounded-2xl bg-white p-6 shadow-xl shadow-brand-black/10 ring-1 ring-brand-taupe/12">
          <div className={expandedLayout === "split" ? "grid gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-start" : ""}>
            <VideoPlaceholder title={title} />
            <div className={`text-sm text-brand-black/60 ${expandedLayout === "split" ? "" : "mt-4"}`}>{details}</div>
          </div>
        </div>
      )}
    </div>
  );
}
