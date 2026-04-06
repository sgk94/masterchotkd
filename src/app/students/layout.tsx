"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const studentNavLinks = [
  { label: "Overview", href: "/students" },
  { label: "Curriculum", href: "/students/curriculum" },
  { label: "Forms", href: "/students/forms" },
  { label: "Resources", href: "/students/resources" },
];

const STORAGE_KEY = "masterchos-student-auth";
const PASSWORD = "blackbelt";

export default function StudentsLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  const [authenticated, setAuthenticated] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored === "true") setAuthenticated(true);
    setLoaded(true);
  }, []);

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    if (input.toLowerCase() === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  if (!loaded) return <div />;

  if (!authenticated) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center px-6">
        <div className="w-full rounded-card bg-brand-cream p-8 text-center">
          <h1 className="font-heading text-2xl text-brand-black">Student Resources</h1>
          <p className="mt-2 text-sm text-brand-black/60">Enter the password to access student materials.</p>
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <input
              type="password"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              placeholder="Enter password"
              className="w-full rounded-button border border-brand-taupe bg-white px-4 py-3 text-center text-sm text-brand-black placeholder:text-brand-black/40 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
              autoFocus
            />
            {error && <p className="text-xs text-brand-red">Incorrect password. Please try again.</p>}
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-button bg-brand-red px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-700"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <div className="mb-8 flex flex-wrap gap-4 border-b border-brand-taupe pb-4">
        {studentNavLinks.map((link) => (
          <Link key={link.href} href={link.href} className="text-sm font-medium text-brand-black/60 transition-colors hover:text-brand-red">{link.label}</Link>
        ))}
      </div>
      {children}
    </div>
  );
}
