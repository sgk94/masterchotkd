import Link from "next/link";
import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline" | "gold" | "white";

type ButtonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
} & (
  | ({ href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className">)
  | ({ href?: never } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">)
);

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-brand-red text-white hover:bg-red-700 active:scale-[0.97] shadow-[0_4px_12px_rgba(196,30,42,0.25)] hover:shadow-[0_6px_20px_rgba(196,30,42,0.3)]",
  outline: "border border-white/30 text-white hover:bg-white/[0.06] active:scale-[0.97]",
  gold: "bg-brand-gold text-white hover:bg-yellow-600 active:scale-[0.97] shadow-[0_4px_12px_rgba(196,164,74,0.2)]",
  white: "bg-white text-brand-red hover:bg-gray-50 active:scale-[0.97] font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
};

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps): React.ReactElement {
  const baseStyles = "inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-medium min-h-[44px] min-w-[44px] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]";
  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;
  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return <Link href={href} className={styles} {...rest}>{children}</Link>;
  }
  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return <button className={styles} {...buttonProps}>{children}</button>;
}
