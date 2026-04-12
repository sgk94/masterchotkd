"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Show, UserButton, SignInButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";

type SubItem = { label: string; href: string; description?: string; image?: string };
type NavItem = { label: string; href: string; children?: SubItem[]; layout?: "cards" | "list" };

const leftLinks: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Programs",
    href: "/programs",
    layout: "cards",
    children: [
      { label: "Tiny Tigers", href: "/programs/tiny-tigers", description: "Ages 4-6", image: "/images/Tiny-Tigers.jpg" },
      { label: "Black Belt Club", href: "/programs/black-belt-club", description: "All ages", image: "/images/Black-Belt-Club.jpg" },
      { label: "Leadership Club", href: "/programs/leadership-club", description: "Advanced students", image: "/images/Leadership_Demo-Team.jpg" },
      { label: "Competition Team", href: "/programs/competition-team", description: "Tournament athletes", image: "/images/Competition-Team.jpg" },
    ],
  },
  { label: "Schedule", href: "/schedule" },
  { label: "Reviews", href: "/reviews" },
];

const rightLinks: NavItem[] = [
  {
    label: "Members",
    href: "/students",
    children: [
      { label: "Tiny Tigers", href: "/students/curriculum/tiny-tigers", description: "Ages 4-6 resources" },
      { label: "Curriculum", href: "/students/curriculum", description: "Belt requirements" },
      { label: "Poomsae Forms", href: "/students/forms", description: "Video library" },
      { label: "Resources", href: "/students/resources", description: "Training materials" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

const ease = "cubic-bezier(0.32, 0.72, 0, 1)";

export function Navbar(): React.ReactElement {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setActiveDropdown(null);
  }

  function handleEnter(label: string, hasChildren: boolean): void {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(hasChildren ? label : null);
  }

  function handleLeave(): void {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 200);
  }

  function handleContainerEnter(): void {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const activeItem = [...leftLinks, ...rightLinks].find((l) => l.label === activeDropdown);
  const isOpen = !!activeDropdown;

  function navLink(link: NavItem): React.ReactElement {
    const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
    return (
      <div
        key={link.href}
        className="relative"
        onMouseEnter={() => handleEnter(link.label, !!link.children)}
      >
        <Link
          href={link.href}
          className={`relative text-sm transition-colors duration-300 ${isActive ? "text-white" : "text-white/60 hover:text-white"}`}
        >
          {link.label}
          {isActive && (
            <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-brand-gold" />
          )}
          {activeDropdown === link.label && !isActive && (
            <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-white/40" />
          )}
        </Link>
      </div>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div
        className="mx-auto max-w-6xl shadow-lg shadow-black/20 ring-1 ring-white/[0.06] transition-[border-radius] duration-500"
        style={{
          backgroundColor: "#1a1a2e",
          borderRadius: isOpen ? "1.5rem" : "1.5rem",
          transitionTimingFunction: ease,
        }}
        onMouseLeave={handleLeave}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-2.5">
          {/* Left */}
          <div className="hidden items-center gap-6 md:flex">
            {leftLinks.map(navLink)}
          </div>

          {/* Center — logo */}
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
            <Image src="/images/logo.svg" alt="Master Cho's Black Belt Academy" width={44} height={44} className="h-11 w-11" />
            <span className="hidden font-heading text-lg font-bold tracking-wide text-brand-gold sm:inline">
              MASTER CHO&apos;S TAEKWONDO
            </span>
          </Link>

          {/* Right */}
          <div className="hidden items-center gap-6 md:flex">
            {rightLinks.map(navLink)}
            <Button variant="primary" href="/special-offer" className="px-5 py-2.5 text-xs">
              Special Offer
            </Button>
            <ClerkLoading>
              <span className="text-sm text-white/60">Sign In</span>
            </ClerkLoading>
            <ClerkLoaded>
              <Show when="signed-out">
                <SignInButton>
                  <button className="text-sm text-white/60 transition-colors duration-300 hover:text-white">
                    Sign In
                  </button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </ClerkLoaded>
          </div>

          {/* Mobile hamburger */}
          <button className="flex h-11 w-11 items-center justify-center text-white md:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>

        {/* Dropdown panel — connected, expands within the same container */}
        <div
          className="hidden md:grid overflow-hidden transition-all duration-500"
          style={{
            gridTemplateRows: isOpen ? "1fr" : "0fr",
            opacity: isOpen ? 1 : 0,
            transitionTimingFunction: ease,
          }}
          onMouseEnter={handleContainerEnter}
        >
          <div className="min-h-0 overflow-hidden">
            {activeItem?.children && (
              <div className="border-t border-white/[0.06] px-8 pb-8 pt-6">
                {activeItem.layout === "cards" ? (
                  /* Nestig-style: links left, image cards right */
                  <div className="flex gap-10">
                    {/* Links list */}
                    <div className="w-48 shrink-0">
                      <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
                        {activeItem.label}
                      </p>
                      <div className="flex flex-col gap-0.5">
                        {activeItem.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="rounded-md px-2 py-1.5 text-sm text-white/70 transition-colors duration-300 hover:bg-white/[0.04] hover:text-white"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                      <div className="mt-5">
                        <Link
                          href={activeItem.href}
                          className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 px-5 py-2.5 text-xs font-medium text-brand-gold transition-all duration-500 hover:border-brand-gold/60 hover:bg-brand-gold/10 hover:text-brand-gold active:scale-[0.97]"
                          style={{ transitionTimingFunction: ease }}
                        >
                          All programs
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M2 6h8M7 3l3 3-3 3" />
                          </svg>
                        </Link>
                      </div>
                    </div>

                    {/* Image cards row */}
                    <div className="flex flex-1 gap-4">
                      {activeItem.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="group flex-1"
                        >
                          <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                            <Image
                              src={child.image!}
                              alt={child.label}
                              fill
                              sizes="200px"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              style={{ transitionTimingFunction: ease }}
                            />
                          </div>
                          <p className="mt-2 text-xs font-medium text-white/60 transition-colors duration-300 group-hover:text-white/90">
                            {child.label}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Members list layout — gated for signed-out users */
                  <>
                  <Show when="signed-in">
                    <div>
                      <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
                        {activeItem.label}
                      </p>
                      <div className="flex flex-col gap-1">
                        {activeItem.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-300 hover:bg-white/[0.04]"
                            style={{ transitionTimingFunction: ease }}
                          >
                            <div>
                              <p className="text-sm font-medium text-white/80 transition-colors duration-300 group-hover:text-white">
                                {child.label}
                              </p>
                              {child.description && (
                                <p className="mt-0.5 text-xs text-white/30 transition-colors duration-300 group-hover:text-white/50">
                                  {child.description}
                                </p>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-5">
                        <Link
                          href={activeItem.href}
                          className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 px-5 py-2.5 text-xs font-medium text-brand-gold transition-all duration-500 hover:border-brand-gold/60 hover:bg-brand-gold/10 hover:text-brand-gold active:scale-[0.97]"
                          style={{ transitionTimingFunction: ease }}
                        >
                          View all {activeItem.label.toLowerCase()}
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M2 6h8M7 3l3 3-3 3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </Show>
                  <Show when="signed-out">
                    <div className="flex flex-col items-center justify-center py-8">
                      <p className="font-heading text-lg font-bold tracking-wide text-white/80">
                        Member Access Only
                      </p>
                      <SignInButton>
                        <button className="mt-4 inline-flex items-center justify-center rounded-full bg-brand-red px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700">
                          Log In
                        </button>
                      </SignInButton>
                    </div>
                  </Show>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </nav>
  );
}
