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
  primary: "bg-brand-red text-white hover:bg-red-700 transition-colors",
  outline: "border-2 border-white text-white hover:bg-white/10 transition-colors",
  gold: "bg-brand-gold text-white hover:bg-yellow-600 transition-colors",
  white: "bg-white text-brand-red hover:bg-gray-100 transition-colors font-semibold",
};

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps): React.ReactElement {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-button text-sm font-medium min-h-[44px] min-w-[44px]";
  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;
  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return <Link href={href} className={styles} {...rest}>{children}</Link>;
  }
  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return <button className={styles} {...buttonProps}>{children}</button>;
}
