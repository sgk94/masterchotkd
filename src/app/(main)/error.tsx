"use client";

import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error; reset: () => void }): React.ReactElement {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-heading text-4xl text-brand-black">Something went wrong</h1>
      <p className="mt-4 text-lg text-brand-black/60">We encountered an unexpected error. Please try again.</p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={reset}
          className="rounded-full bg-brand-red px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-red/90"
        >
          Try again
        </button>
        <Button variant="outline" href="/" className="!border-brand-black !text-brand-black">
          Go home
        </Button>
      </div>
    </div>
  );
}
