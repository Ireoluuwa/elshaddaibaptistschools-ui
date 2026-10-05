import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-canvas">
      <div className="w-full max-w-sm text-center">
        <Image src="/logo.png" alt="El-Shaddai Baptist Schools" width={56} height={56} className="mx-auto" />

        <p className="mt-6 text-sm font-semibold text-brand">404</p>
        <h1 className="mt-1 text-xl font-bold text-ink">Page not found</h1>
        <p className="mt-2 text-sm text-muted leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>

        <div className="mt-6 flex justify-center">
          <Link
            href="/"
            className="h-10 px-5 inline-flex items-center justify-center text-sm font-semibold text-white bg-brand hover:bg-brand-dark rounded-lg transition-colors"
          >
            Go to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
