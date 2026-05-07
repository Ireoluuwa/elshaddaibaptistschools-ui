"use client";

import React from "react";
import StudentList from "@/components/teacher/reports/StudentList";
import { useInitTeacherDashboard } from "@/hooks/report.hooks";

export default function ReportsPage() {
  const { data: dashboardData } = useInitTeacherDashboard();

  let activeTermName = "Current Term";
  let activeWeek = dashboardData?.activePeriod?.week || 1;

  if (dashboardData?.periods && dashboardData?.activePeriod) {
    const { termId, yearId } = dashboardData.activePeriod;
    const year = dashboardData.periods.find((y: any) => y.id === yearId);
    if (year) {
      const term = year.terms.find((t: any) => t.id === termId);
      if (term) {
        activeTermName = term.name;
      }
    }
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[#0e2e1d] text-2xl font-black tracking-tight uppercase">
            Weekly Reports
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage and submit performance reports for your students.
          </p>
        </div>

        {/* Term/Week Info Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100/50 self-start">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Active Period</span>
            {dashboardData ? (
              <span className="text-sm font-semibold">{`${activeTermName} • Week ${activeWeek}`}</span>
            ) : (
              <div className="h-5 w-32 bg-emerald-200/60 rounded animate-pulse mt-0.5" />
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <StudentList />
      
      {/* Footer */}
      <footer className="text-center text-gray-400 text-[11px] py-8 mt-4 font-medium uppercase tracking-[0.15em]">
        &copy; {new Date().getFullYear()} El-Shaddai Schools. Teacher Portal.
      </footer>
    </div>
  );
}

