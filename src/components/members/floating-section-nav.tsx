"use client";

import { useEffect, useRef, useState } from "react";

type SectionLink = {
  href: string;
  label: string;
};

type FloatingSectionNavProps = {
  ariaLabel: string;
  links: SectionLink[];
  topOffset?: number;
};

type FloatingStyle = {
  left?: number;
  position: "absolute" | "fixed";
  top: number;
  width: number | string;
};

export function FloatingSectionNav({
  ariaLabel,
  links,
  topOffset = 176,
}: FloatingSectionNavProps): React.ReactElement {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [floatingStyle, setFloatingStyle] = useState<FloatingStyle>({
    position: "absolute",
    top: 0,
    width: "100%",
  });

  useEffect(() => {
    function updatePosition(): void {
      const wrapper = wrapperRef.current;
      const nav = navRef.current;

      if (!wrapper || !nav) return;

      const wrapperRect = wrapper.getBoundingClientRect();
      const wrapperTop = window.scrollY + wrapperRect.top;
      const wrapperHeight = wrapper.offsetHeight;
      const navHeight = nav.offsetHeight;
      const fixedLeft = wrapperRect.left;
      const fixedWidth = wrapperRect.width;
      const scrollTop = window.scrollY;

      if (scrollTop + topOffset <= wrapperTop) {
        setFloatingStyle({
          position: "absolute",
          top: 0,
          width: "100%",
        });
        return;
      }

      if (scrollTop + topOffset + navHeight >= wrapperTop + wrapperHeight) {
        setFloatingStyle({
          position: "absolute",
          top: Math.max(0, wrapperHeight - navHeight),
          width: "100%",
        });
        return;
      }

      setFloatingStyle({
        position: "fixed",
        top: topOffset,
        left: fixedLeft,
        width: fixedWidth,
      });
    }

    updatePosition();
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [topOffset]);

  return (
    <div ref={wrapperRef} className="relative hidden h-full lg:block">
      <div ref={navRef} style={floatingStyle}>
        <div className="rounded-[1.5rem] bg-brand-sand/35 p-1.5 ring-1 ring-brand-taupe/15">
          <div className="rounded-[calc(1.5rem-6px)] bg-white p-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-black/35">
              On This Page
            </p>
            <nav aria-label={ariaLabel} className="mt-4 flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-brand-taupe/20 bg-brand-cream/45 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-brand-black/60 transition-colors hover:border-brand-taupe/35 hover:bg-brand-cream hover:text-brand-black"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
