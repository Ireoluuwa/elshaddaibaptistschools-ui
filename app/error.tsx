'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-canvas">
      <div className="w-full max-w-sm text-center">
        <Image src="/logo.png" alt="El-Shaddai Baptist Schools" width={56} height={56} className="mx-auto" />

        <h1 className="mt-6 text-xl font-bold text-ink">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted leading-relaxed">
          This page couldn&apos;t load. Please try again. If it keeps happening, go back to the homepage.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
          <button
            onClick={() => reset()}
            className="h-10 px-5 text-sm font-semibold text-white bg-brand hover:bg-brand-dark rounded-lg transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="h-10 px-5 inline-flex items-center justify-center text-sm font-semibold text-ink bg-white border border-line hover:border-ink/30 rounded-lg transition-colors"
          >
            Go to homepage
          </Link>
        </div>

        {process.env.NODE_ENV === 'development' && error.message && (
          <details className="mt-8 text-left">
            <summary className="text-xs text-muted cursor-pointer hover:text-ink">Error details</summary>
            <pre className="mt-2 p-3 rounded-lg bg-white border border-line text-xs text-danger whitespace-pre-wrap break-words max-h-40 overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
