"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import { panelClass, primaryButton } from "@/components/admin/shared/AdminModal";
import { mockStudents, promotionClasses } from "@/constants/admin/mock.constants";
import {
  billTotal,
  currentBills,
  currentTermLabel,
  mockStudentFees,
  naira,
  nextTermLabel,
} from "@/constants/bursar/mock.constants";

const outstandingOf = Object.fromEntries(mockStudentFees.map((f) => [f.studentId, f.outstanding]));

const classRows = promotionClasses.map((className) => {
  const students = mockStudents.filter((s) => s.className === className && s.status === "active");
  const bill = currentBills.find((b) => b.className === className)!;
  const expected = students.length * billTotal(bill);
  const outstanding = students.reduce((sum, s) => sum + (outstandingOf[s.id] ?? 0), 0);
  return {
    className,
    students: students.length,
    owing: students.filter((s) => (outstandingOf[s.id] ?? 0) > 0).length,
    expected,
    outstanding,
    collected: Math.max(expected - outstanding, 0),
  };
});

const totals = classRows.reduce(
  (acc, r) => ({
    expected: acc.expected + r.expected,
    collected: acc.collected + r.collected,
    outstanding: acc.outstanding + r.outstanding,
    owing: acc.owing + r.owing,
  }),
  { expected: 0, collected: 0, outstanding: 0, owing: 0 },
);

const pct = (part: number, whole: number) => (whole ? Math.round((part / whole) * 100) : 0);

const rowGrid =
  "grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[80px_100px_minmax(0,1fr)_120px] items-center gap-x-4 gap-y-1";

export default function BursarOverviewPage() {
  const collectedPct = pct(totals.collected, totals.expected);

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      <PageHeader title="Overview" description={`School fees for ${currentTermLabel}.`} />

      {/* Collection summary */}
      <section className={`${panelClass} p-6`}>
        <div className="grid sm:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted">Collected</p>
            <p className="text-3xl font-bold text-brand tabular-nums tracking-tight mt-0.5">
              {naira(totals.collected)}
            </p>
            <p className="text-xs text-muted mt-1">{collectedPct}% of {naira(totals.expected)} expected</p>
          </div>
          <div>
            <p className="text-sm text-muted">Outstanding</p>
            <p className="text-3xl font-bold text-ink tabular-nums tracking-tight mt-0.5">
              {naira(totals.outstanding)}
            </p>
            <p className="text-xs text-muted mt-1">Across all classes</p>
          </div>
          <div>
            <p className="text-sm text-muted">Results on hold</p>
            <p className="text-3xl font-bold text-clay tabular-nums tracking-tight mt-0.5 inline-flex items-center gap-2">
              <Lock size={22} /> {totals.owing}
            </p>
            <p className="text-xs text-muted mt-1">Students who still owe</p>
          </div>
        </div>
        <div className="mt-6 h-2.5 rounded-full bg-tint overflow-hidden">
          <div className="h-full bg-brand rounded-full" style={{ width: `${collectedPct}%` }} />
        </div>
      </section>

      {/* Next steps */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/portal/bursar/fees" className={`${panelClass} p-5 flex items-center gap-4 hover:border-brand transition-colors group`}>
          <div className="flex-1">
            <p className="font-semibold text-ink">Update student fees</p>
            <p className="text-sm text-muted mt-0.5">Record what each student still owes.</p>
          </div>
          <ArrowRight size={18} className="text-muted/50 group-hover:text-brand transition-colors" />
        </Link>
        <Link href="/portal/bursar/bills" className={`${panelClass} p-5 flex items-center gap-4 hover:border-brand transition-colors group`}>
          <div className="flex-1">
            <p className="font-semibold text-ink">Set next term&apos;s bill</p>
            <p className="text-sm text-muted mt-0.5">{nextTermLabel}</p>
          </div>
          <ArrowRight size={18} className="text-muted/50 group-hover:text-brand transition-colors" />
        </Link>
      </div>

      {/* By class */}
      <section className={`${panelClass} overflow-hidden`}>
        <header className="flex items-center justify-between gap-3 px-5 py-4 border-b border-line">
          <h2 className="font-semibold text-ink">By class</h2>
          <Link href="/portal/bursar/fees" className={`${primaryButton} h-9`}>
            Student fees
          </Link>
        </header>
        <div className={`${rowGrid} hidden sm:grid px-5 py-2 bg-canvas border-b border-line text-xs font-medium text-muted`}>
          <span>Class</span>
          <span>Owing</span>
          <span>Collected</span>
          <span className="text-right">Outstanding</span>
        </div>
        <ul className="divide-y divide-line">
          {classRows.map((r) => {
            const p = pct(r.collected, r.expected);
            return (
              <li key={r.className} className={`${rowGrid} px-5 py-3.5`}>
                <span className="text-sm font-bold text-ink">{r.className}</span>
                <span className={`text-sm tabular-nums text-right sm:text-left ${r.owing ? "text-clay font-medium" : "text-brand"}`}>
                  {r.owing ? `${r.owing} of ${r.students}` : "All paid"}
                </span>
                <span className="col-span-2 sm:col-span-1 flex items-center gap-3">
                  <span className="flex-1 h-1.5 rounded-full bg-tint overflow-hidden">
                    <span className="block h-full bg-brand rounded-full" style={{ width: `${p}%` }} />
                  </span>
                  <span className="text-xs text-muted tabular-nums w-9 text-right">{p}%</span>
                </span>
                <span className="hidden sm:block text-sm font-semibold text-ink tabular-nums text-right">
                  {naira(r.outstanding)}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
