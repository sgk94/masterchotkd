type EyebrowBadgeProps = {
  children: React.ReactNode;
  variant?: "pill" | "gold";
  className?: string;
};

const variants = {
  pill: "inline-block rounded-full border border-brand-taupe/40 bg-brand-cream px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-black/50",
  gold: "inline-flex rounded-full border border-brand-gold/20 bg-brand-gold/5 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-gold",
};

export function EyebrowBadge({
  children,
  variant = "pill",
  className,
}: EyebrowBadgeProps): React.ReactElement {
  const classes = className ? `${variants[variant]} ${className}` : variants[variant];
  return <span className={classes}>{children}</span>;
}
