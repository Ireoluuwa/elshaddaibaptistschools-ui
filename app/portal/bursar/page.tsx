"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/admin/shared/PageHeader";
import { panelClass } from "@/components/admin/shared/AdminModal";
import { useBursaryOverview, useBursaryTerms } from "@/hooks/bursary.hooks";
import { naira } from "@/lib/money";

// JSS classes before SS, then by name.
const classOrder = (a: { className: string }, b: { className: string }) =>
  Number(a.className.startsWith("SS")) - Number(b.className.startsWith("SS")) || a.className.localeCompare(b.className);

export default function BursarOverviewPage() {
  const { data: terms = [] } = useBursaryTerms();
  const [termId, setTermId] = useState<string | undefined>(undefined);
  const { data, isLoading, isError, refetch } = useBursaryOverview(termId);
  const rows = useMemo(() => [...(data?.classes ?? [])].filter((c) => c.students > 0).sort(classOrder), [data]);

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      <PageHeader
        title="Overview"
        description={data ? `School fees for ${data.term.label}.` : "School fees."}
        action={
          <select
            value={termId ?? data?.term.id ?? ""}
            onChange={(e) => setTermId(e.target.value)}
            aria-label="Term"
            className="h-10 px-3 rounded-lg border border-line focus:border-brand outline-none text-sm text-ink bg-white self-start"
          >
            {terms.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        }
      />

      {isError ? (
        <div className={`${panelClass} px-5 py-12 text-center text-sm text-muted`}>
          Couldn&apos;t load fees.{" "}
          <button onClick={() => refetch()} className="font-semibold text-brand hover:underline">
            Try again
          </button>
        </div>
      ) : (
        <>
          <section className={panelClass}>
            <dl className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-line">
              <div className="px-6 py-5">
                <dt className="text-sm text-muted">Outstanding</dt>
                <dd className="text-2xl font-bold tabular-nums mt-1 text-clay">
                  {isLoading ? "—" : naira(data?.outstanding ?? 0)}
                </dd>
              </div>
              <div className="px-6 py-5">
                <dt className="text-sm text-muted">Students owing</dt>
                <dd className="text-2xl font-bold tabular-nums mt-1 text-ink">{isLoading ? "—" : data?.owing ?? 0}</dd>
              </div>
            </dl>
            <p className="px-6 py-3 border-t border-line text-sm text-muted">
              Students who owe can&apos;t see their result until it&apos;s cleared.{" "}
              <Link href="/portal/bursar/fees" className="font-medium text-brand hover:underline underline-offset-2">
                Update student fees
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
                {isLoading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td colSpan={3} className="px-6 py-3">
                        <div className="h-5 rounded bg-canvas animate-pulse" />
                      </td>
                    </tr>
                  ))
                ) : rows.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-10 text-center text-muted">
                      No students this term.
                    </td>
                  </tr>
                ) : (
                  rows.map((r) => (
                    <tr key={r.classId}>
                      <td className="px-6 py-3 font-semibold text-ink">{r.className}</td>
                      <td className="px-4 py-3 text-muted tabular-nums">
                        {r.owing ? `${r.owing} of ${r.students}` : "None"}
                      </td>
                      <td className={`px-6 py-3 text-right tabular-nums ${r.outstanding ? "text-ink font-medium" : "text-muted"}`}>
                        {naira(r.outstanding)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>
        </>
      )}
    </div>
  );
}
