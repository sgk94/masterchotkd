"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
};

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0.15,
  rootMargin: "0px 0px -40px 0px",
};

type ObserverEntry = {
  setVisible: (v: boolean) => void;
  clearFallback: () => void;
};

const observers = new Map<Element, ObserverEntry>();
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const tracked = observers.get(entry.target);
          if (tracked) {
            tracked.clearFallback();
            tracked.setVisible(true);
            sharedObserver!.unobserve(entry.target);
            observers.delete(entry.target);
          }
        }
      }
    }, OBSERVER_OPTIONS);
  }
  return sharedObserver;
}

export function Reveal({ children, className = "", delay = 0, stagger = false }: RevealProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!("IntersectionObserver" in window) || reduceMotion) {
      setShouldAnimate(false);
      setVisible(true);
      return;
    }

    setShouldAnimate(true);

    const rect = el.getBoundingClientRect();
    const alreadyInViewport = rect.top < window.innerHeight && rect.bottom > 0;
    setVisible(alreadyInViewport);

    const observer = getSharedObserver();
    const fallbackId = window.setTimeout(() => {
      setVisible(true);
      observer.unobserve(el);
      observers.delete(el);
    }, 1500);

    observers.set(el, {
      setVisible,
      clearFallback: () => window.clearTimeout(fallbackId),
    });
    observer.observe(el);

    return () => {
      window.clearTimeout(fallbackId);
      observer.unobserve(el);
      observers.delete(el);
    };
  }, []);

  const animateStagger = shouldAnimate && stagger && visible;
  const hideUntilVisible = shouldAnimate && !stagger && !visible;

  return (
    <div
      ref={ref}
      className={`${animateStagger ? "stagger-children" : ""} ${className}`}
      style={{
        opacity: stagger ? undefined : hideUntilVisible ? 0 : 1,
        transform: stagger ? undefined : hideUntilVisible ? "translateY(24px)" : "translateY(0)",
        transition: shouldAnimate
          ? `opacity 0.8s cubic-bezier(0.32,0.72,0,1) ${delay}ms, transform 0.8s cubic-bezier(0.32,0.72,0,1) ${delay}ms`
          : undefined,
        willChange: hideUntilVisible ? "transform, opacity" : "auto",
      }}
    >
      {children}
    </div>
  );
}
