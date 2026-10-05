"use client";

import React from "react";
import Link from "next/link";
import PageHeader from "@/components/admin/shared/PageHeader";
import { panelClass } from "@/components/admin/shared/AdminModal";
import { mockStudents, promotionClasses } from "@/constants/admin/mock.constants";
import {
  billTotal,
  currentBills,
  currentTermLabel,
  mockStudentFees,
  naira,
} from "@/constants/bursar/mock.constants";

const outstandingOf = Object.fromEntries(mockStudentFees.map((f) => [f.studentId, f.outstanding]));

const classRows = promotionClasses.map((className) => {
  const students = mockStudents.filter((s) => s.className === className && s.status === "active");
  const bill = currentBills.find((b) => b.className === className)!;
  return {
    className,
    students: students.length,
    owing: students.filter((s) => (outstandingOf[s.id] ?? 0) > 0).length,
    expected: students.length * billTotal(bill),
    outstanding: students.reduce((sum, s) => sum + (outstandingOf[s.id] ?? 0), 0),
  };
});

const expected = classRows.reduce((sum, r) => sum + r.expected, 0);
const outstanding = classRows.reduce((sum, r) => sum + r.outstanding, 0);
const collected = Math.max(expected - outstanding, 0);
const owing = classRows.reduce((sum, r) => sum + r.owing, 0);

export default function BursarOverviewPage() {
  const summary = [
    { label: "Expected", value: naira(expected), tone: "text-ink" },
    { label: "Collected", value: naira(collected), tone: "text-brand" },
    { label: "Outstanding", value: naira(outstanding), tone: "text-clay" },
  ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      <PageHeader title="Overview" description={`School fees for ${currentTermLabel}.`} />

      <section className={panelClass}>
        <dl className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line">
          {summary.map((item) => (
            <div key={item.label} className="px-6 py-5">
              <dt className="text-sm text-muted">{item.label}</dt>
              <dd className={`text-2xl font-bold tabular-nums mt-1 ${item.tone}`}>{item.value}</dd>
            </div>
          ))}
        </dl>
        <p className="px-6 py-3 border-t border-line text-sm text-muted">
          <span className="font-semibold text-ink">{owing} students</span> still owe, so their results are on
          hold.{" "}
          <Link href="/portal/bursar/fees" className="font-medium text-brand hover:underline underline-offset-2">
            View student fees
          </Link>
        </p>
      </section>

      <section className={`${panelClass} overflow-hidden`}>
        <table className="w-full text-sm">
          <thead className="bg-canvas text-xs text-muted">
            <tr>
              <th className="text-left font-medium px-6 py-2.5">Class</th>
              <th className="text-left font-medium px-4 py-2.5">Owing</th>
              <th className="text-right font-medium px-6 py-2.5">Outstanding</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {classRows.map((r) => (
              <tr key={r.className}>
                <td className="px-6 py-3 font-semibold text-ink">{r.className}</td>
                <td className="px-4 py-3 text-muted tabular-nums">
                  {r.owing ? `${r.owing} of ${r.students}` : "None"}
                </td>
                <td className={`px-6 py-3 text-right tabular-nums ${r.outstanding ? "text-ink font-medium" : "text-muted"}`}>
                  {naira(r.outstanding)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
