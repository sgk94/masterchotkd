import Link from "next/link";

type BackLinkProps = { href: string; label: string; className?: string };

export function BackLink({
  href,
  label,
  className,
}: BackLinkProps): React.ReactElement {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 text-xs text-white/40 transition-colors hover:text-white/70 ${className ?? ""}`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      {label}
    </Link>
  );
}
