import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Lock } from "lucide-react";

interface ResultOnHoldProps {
  outstanding: number;
  termLabel: string;
  studentName?: string;
  backHref: string;
}

// Shown to students in place of their report sheet while they owe school fees.
export default function ResultOnHold({ outstanding, termLabel, studentName, backHref }: ResultOnHoldProps) {
  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-xl border border-line overflow-hidden">
        <div className="px-6 pt-8 pb-6 text-center border-b border-line">
          <Image src="/logo.png" alt="El-Shaddai Baptist Schools" width={56} height={56} className="mx-auto" />
          <h1 className="text-xl font-bold text-ink mt-5 inline-flex items-center gap-2">
            <Lock size={18} className="text-clay" /> Result on hold
          </h1>
          <p className="text-sm text-muted mt-2 leading-relaxed">
            {studentName ? `${studentName}'s` : "Your"} {termLabel} result will be available once the
            outstanding school fees are paid.
          </p>
        </div>

        <div className="px-6 py-5 bg-clay-soft/60 border-b border-line">
          <p className="text-sm text-muted">Outstanding balance</p>
          <p className="text-3xl font-bold text-ink tabular-nums tracking-tight mt-0.5">
            ₦{outstanding.toLocaleString()}
          </p>
        </div>

        <ol className="px-6 py-5 flex flex-col gap-4 text-sm">
          <li className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-tint text-brand text-xs font-semibold flex items-center justify-center shrink-0">1</span>
            <span className="text-ink pt-0.5">Pay the balance at the school bursary or by bank transfer.</span>
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-tint text-brand text-xs font-semibold flex items-center justify-center shrink-0">2</span>
            <span className="text-ink pt-0.5">
              Once the bursar records your payment, come back here to view and print your result.
            </span>
          </li>
        </ol>

        <div className="px-6 pb-6">
          <Link
            href={backHref}
            className="w-full h-10 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-ink border border-line hover:border-ink/30 rounded-lg transition-colors"
          >
            <ChevronLeft size={16} /> Back to results
          </Link>
        </div>
      </div>
      <p className="text-xs text-muted mt-6">Questions about your fees? Please contact the school bursary.</p>
    </div>
  );
}
