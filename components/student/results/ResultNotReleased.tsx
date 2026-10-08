import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Clock } from "lucide-react";

interface ResultNotReleasedProps {
  termLabel: string;
  backHref: string;
}

// Shown to students until the admin releases the term's results.
export default function ResultNotReleased({ termLabel, backHref }: ResultNotReleasedProps) {
  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-xl border border-line overflow-hidden">
        <div className="px-6 pt-8 pb-6 text-center">
          <Image src="/logo.png" alt="El-Shaddai Baptist Schools" width={56} height={56} className="mx-auto" />
          <h1 className="text-xl font-bold text-ink mt-5 inline-flex items-center gap-2">
            <Clock size={18} className="text-brand" /> Not released yet
          </h1>
          <p className="text-sm text-muted mt-2 leading-relaxed">
            Results for {termLabel || "this term"} haven&apos;t been released. The school will let you know when
            they&apos;re ready, then you can view and download your report sheet here.
          </p>
        </div>
        <div className="px-6 pb-6">
          <Link
            href={backHref}
            className="w-full h-10 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-ink border border-line hover:border-ink/30 rounded-lg transition-colors"
          >
            <ChevronLeft size={16} /> Back to results
          </Link>
        </div>
      </div>
    </div>
  );
}
