type BezelCardProps = {
  children: React.ReactNode;
  className?: string;
  radius?: "lg" | "xl";
};

export function BezelCard({
  children,
  className = "",
  radius = "xl",
}: BezelCardProps): React.ReactElement {
  const outerRadius = radius === "xl" ? "rounded-[2rem]" : "rounded-[1.5rem]";
  const innerRadius =
    radius === "xl"
      ? "rounded-[calc(2rem-6px)]"
      : "rounded-[calc(1.5rem-6px)]";

  return (
    <div
      className={`${outerRadius} bg-brand-sand/40 p-1.5 ring-1 ring-brand-taupe/15 ${className}`}
    >
      <div
        className={`${innerRadius} overflow-hidden bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]`}
      >
        {children}
      </div>
    </div>
  );
}
