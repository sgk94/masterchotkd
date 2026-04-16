"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}): React.ReactElement {
  useEffect(() => {
    console.error("Global error boundary", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <h1 className="text-4xl font-bold">Something went wrong</h1>
          <p className="mt-4 text-lg text-gray-600">An unexpected error occurred.</p>
          <button
            onClick={reset}
            className="mt-8 rounded-full bg-[#c41e2a] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#a01822]"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
