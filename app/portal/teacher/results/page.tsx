"use client";

import React from "react";
import ResultStudentList from "@/components/teacher/results/ResultStudentList";
import { currentSession } from "@/constants/teacher/results.constants";

export default function ResultsPage() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[#0e2e1d] text-2xl font-black tracking-tight uppercase">
            Upload Results
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Select a student to upload or view their academic results.
          </p>
        </div>

        {/* Session Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100/50 self-start">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
              Current Session
            </span>
            <span className="text-sm font-semibold">
              {currentSession.year} • {currentSession.term}
            </span>
          </div>
        </div>
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
