"use client";

import React from "react";
import ResultStudentList from "@/components/teacher/results/ResultStudentList";
import { useResultsDashboardInit } from "@/hooks/result.hooks";

export default function ResultsPage() {
  const { data: init, isLoading } = useResultsDashboardInit();

  const activeTerm = init?.periods
    .flatMap((y) => y.terms)
    .find((t) => t.id === init?.activePeriod?.termId);

  const activeYear = init?.periods.find((y) =>
    y.terms.some((t) => t.id === init?.activePeriod?.termId)
  );

  const sessionLabel =
    activeYear && activeTerm
      ? `${activeYear.name} • ${activeTerm.name}`
      : isLoading
        ? "Loading..."
        : "No active term";

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-secondary text-2xl font-black tracking-tight uppercase">
            Upload Results
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Select a student to upload or view their academic results.
          </p>
        </div>

        {/* Session Badge */}
        {isLoading ? (
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-100/50 self-start">
            <div className="flex flex-col gap-1.5">
              <div className="h-2.5 w-20 bg-emerald-200 rounded animate-pulse" />
              <div className="h-4 w-32 bg-emerald-100 rounded animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100/50 self-start">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                Current Session
              </span>
              <span className="text-sm font-semibold">{sessionLabel}</span>
            </div>
          </div>
        )}
      </div>

      {/* Student List */}
      <ResultStudentList />

      {/* Footer */}
      <footer className="text-center text-gray-400 text-[11px] py-8 mt-4 font-medium uppercase tracking-[0.15em]">
        &copy; {new Date().getFullYear()} El-Shaddai Schools. Teacher Portal.
      </footer>
    </div>
  );
}
