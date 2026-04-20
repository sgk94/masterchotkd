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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = getSharedObserver();
    observers.set(el, { setVisible });
    observer.observe(el);

    return () => {
      observer.unobserve(el);
      observers.delete(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${stagger ? "stagger-children" : ""} ${className}`}
      style={{
        opacity: stagger ? undefined : visible ? 1 : 0,
        transform: stagger ? undefined : visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s cubic-bezier(0.32,0.72,0,1) ${delay}ms, transform 0.8s cubic-bezier(0.32,0.72,0,1) ${delay}ms`,
        willChange: visible ? "auto" : "transform, opacity",
      }}
    >
      {stagger ? (visible ? children : <div style={{ opacity: 0 }}>{children}</div>) : children}
    </div>
  );
}
