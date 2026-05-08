"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Calendar, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useStudentDashboard } from "@/hooks/report.hooks";
import { ReportsSkeleton, ErrorState } from "@/components/student/reports/StudentReportsStates";

export default function WeeklyReportsPage() {
  const [selectedTermId, setSelectedTermId] = useState<string | undefined>(undefined);
  
  const { data: dashboard, isLoading, isError } = useStudentDashboard(selectedTermId);

  // Sync selectedTermId with activeTermId on first load
  useEffect(() => {
    if (dashboard?.activeTermId && !selectedTermId) {
      setSelectedTermId(dashboard.activeTermId);
    }
  }, [dashboard, selectedTermId]);

  if (isLoading) return <ReportsSkeleton />;
  if (isError || !dashboard) return <ErrorState />;

  const currentYear = dashboard.periods.find(y => 
    y.terms.some(t => t.id === selectedTermId)
  );

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
              value={currentYear?.id}
              onChange={(e) => {
                const year = dashboard.periods.find(y => y.id === e.target.value);
                if (year) setSelectedTermId(year.terms[0].id);
              }}
              className="h-10 pl-4 pr-10 appearance-none bg-white border border-gray-200 rounded-xl text-sm font-bold text-[#334155] focus:border-[#006442] focus:ring-1 focus:ring-[#006442] outline-none transition-all cursor-pointer"
            >
              {dashboard.periods.map(y => <option key={y.id} value={y.id}>{y.name}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-[#006442] transition-colors" />
          </div>
        </div>

        <div className="relative group">
          <div className="relative">
            <select
              value={selectedTermId}
              onChange={(e) => setSelectedTermId(e.target.value)}
              className="h-10 pl-4 pr-10 appearance-none bg-white border border-gray-200 rounded-xl text-sm font-bold text-[#334155] focus:border-[#006442] focus:ring-1 focus:ring-[#006442] outline-none transition-all cursor-pointer"
            >
              {currentYear?.terms.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name} {t.isCurrent ? "(Current)" : ""}
                </option>
              ))}
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
          {dashboard.timeline.map((item) => {
            const available = item.isAvailable;
            return (
              <div key={item.week} className="flex flex-col items-center gap-3">
                <Link
                  href={available ? `/portal/student/reports/${item.reportId}` : "#"}
                  className={`
                    w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold transition-all relative
                    ${available 
                      ? "bg-[#006442] text-white shadow-lg shadow-[#006442]/20 hover:scale-110 active:scale-95 cursor-pointer" 
                      : "bg-gray-50 text-gray-300 cursor-not-allowed border border-dashed border-gray-200"
                    }
                  `}
                >
                  {item.week}
                  {available && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#006442] shadow-sm">
                       <CheckCircle2 size={14} />
                    </div>
                  )}
                </Link>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${available ? "text-[#006442]" : "text-gray-300"}`}>
                  Week {item.week}
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


