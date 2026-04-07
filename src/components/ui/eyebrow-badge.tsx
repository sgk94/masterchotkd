type EyebrowBadgeProps = {
  children: React.ReactNode;
  variant?: "pill" | "gold-text" | "gold-pill";
};

const variants = {
  pill: "inline-block rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50",
  "gold-text":
    "text-xs font-semibold uppercase tracking-[4px] text-brand-gold",
  "gold-pill":
    "inline-block rounded-full border border-brand-gold/30 bg-brand-gold/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[3px] text-brand-gold",
};

export function EyebrowBadge({
  children,
  variant = "pill",
}: EyebrowBadgeProps): React.ReactElement {
  return <span className={variants[variant]}>{children}</span>;
}
