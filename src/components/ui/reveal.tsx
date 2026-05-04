import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
};

export function Reveal({
  children,
  className = "",
}: RevealProps): React.ReactElement {
  return <div className={className}>{children}</div>;
}
