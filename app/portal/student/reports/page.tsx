"use client";

import React, { useState } from "react";
import { ChevronDown, Calendar, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { academicYears, academicTerms, totalWeeks, mockWeeklyReports } from "@/constants/student/reports.constants";

export default function WeeklyReportsPage() {
  const [year, setYear] = useState(academicYears[1]);
  const [term, setTerm] = useState(academicTerms[0]);

  // Check if a report exists for a given week
  const hasReport = (weekNum: number) => {
    return mockWeeklyReports.some(r => r.week === weekNum && r.term === term && r.year === year);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-[#0e2e1d] text-2xl font-black tracking-tight uppercase">
          Weekly Reports
        </h1>
        <p className="text-gray-400 text-sm font-medium">
          Select a week to view your detailed performance report and teacher feedback.
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative group">
          <div className="relative">
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="h-10 pl-4 pr-10 appearance-none bg-white border border-gray-200 rounded-xl text-sm font-bold text-[#334155] focus:border-[#006442] focus:ring-1 focus:ring-[#006442] outline-none transition-all cursor-pointer"
            >
              {academicYears.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-[#006442] transition-colors" />
          </div>
        </div>

        <div className="relative group">
          <div className="relative">
            <select
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="h-10 pl-4 pr-10 appearance-none bg-white border border-gray-200 rounded-xl text-sm font-bold text-[#334155] focus:border-[#006442] focus:ring-1 focus:ring-[#006442] outline-none transition-all cursor-pointer"
            >
              {academicTerms.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-[#006442] transition-colors" />
          </div>
        </div>
      </div>

      {/* Weeks Grid */}
      <div className="flex flex-col gap-6 mt-4">
        <div className="flex items-center gap-3">
          <Calendar size={18} className="text-[#006442]" />
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
            Select Week
          </h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {Array.from({ length: totalWeeks }, (_, i) => i + 1).map((weekNum) => {
            const available = hasReport(weekNum);
            return (
              <div key={weekNum} className="flex flex-col items-center gap-3">
                <Link
                  href={available ? `/portal/student/reports/week-${weekNum}` : "#"}
                  className={`
                    w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold transition-all relative
                    ${available 
                      ? "bg-[#006442] text-white shadow-lg shadow-[#006442]/20 hover:scale-110 active:scale-95 cursor-pointer" 
                      : "bg-gray-50 text-gray-300 cursor-not-allowed border border-dashed border-gray-200"
                    }
                  `}
                >
                  {weekNum}
                  {available && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#006442] shadow-sm">
                       <CheckCircle2 size={14} />
                    </div>
                  )}
                </Link>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${available ? "text-[#006442]" : "text-gray-300"}`}>
                  Week {weekNum}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Note */}
      <div className="mt-8 p-6 rounded-2xl bg-[#006442]/5 border border-[#006442]/10">
        <p className="text-xs text-[#006442] font-bold leading-relaxed opacity-80">
          * Reports are typically released every Friday. If a week is greyed out, it means the report has not yet been processed or published by the class teacher.
        </p>
      </div>

      <footer className="text-center text-gray-400 text-[10px] py-12 mt-4 font-bold uppercase tracking-[0.2em]">
        &copy; {new Date().getFullYear()} El-Shaddai Schools. Weekly Tracking Portal.
      </footer>
    </div>
  );
}
