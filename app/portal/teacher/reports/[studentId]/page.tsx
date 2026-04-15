"use client";

import React, { use, useState } from "react";
import { mockStudents, mockPastReports } from "@/constants/teacher/reports.constants";
import { notFound, useRouter } from "next/navigation";
import { ArrowLeft, Clock, FileEdit } from "lucide-react";
import ReportForm from "@/components/teacher/reports/ReportForm";

interface ReportPageProps {
  params: Promise<{ studentId: string }>;
}

export default function StudentReportPage({ params }: ReportPageProps) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const student = mockStudents.find((s) => s.id === unwrappedParams.studentId);

  const currentWeek = 5;
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);

  if (!student) return notFound();

  // Get past reports array, default empty
  const pastReports = mockPastReports[student.id] || [];

  // Generate tabs based on current week
  const weeks = Array.from({ length: currentWeek }, (_, i) => i + 1);

  // Grab data for the selected previously graded week if it exists
  const selectedPastData = pastReports.find((r) => r.week === selectedWeek);

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/portal/teacher/reports")}
          className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#0e2e1d] hover:border-gray-300 transition-all shadow-sm shrink-0"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-[#0e2e1d] text-2xl font-black tracking-tight flex items-center gap-3">
            {student.name}
            <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-bold font-mono">
              {student.id}
            </span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Reviewing past performance or evaluating current week.</p>
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Form Area */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-full md:w-64 shrink-0 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex flex-col gap-2">
          <div className="px-3 pb-2 text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 mb-2">
            History (Term 1)
          </div>

          <div className="flex flex-col gap-1 max-h-[300px] md:max-h-none overflow-y-auto pr-2 scrollbar-hide">
            {weeks.map((week) => {
              const isSelected = selectedWeek === week;
              const isCurrent = week === currentWeek;
              const hasPastData = pastReports.some((r) => r.week === week);

              return (
                <button
                  key={week}
                  onClick={() => setSelectedWeek(week)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all text-sm font-semibold text-left ${
                    isSelected
                      ? "bg-[#006442] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-50 hover:text-[#0e2e1d]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {isCurrent ? <FileEdit size={16} /> : <Clock size={16} className={isSelected ? "text-white/70" : "text-gray-400"} />}
                    {isCurrent ? `Week ${week} (New)` : `Week ${week}`}
                  </span>

                  {/* Tiny dot indicator if report was submitted */}
                  {!isCurrent && hasPastData && (
                    <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-white" : "bg-emerald-400"}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Report Form / Read Only View */}
        <div className="w-full flex-1">
          {selectedWeek === currentWeek ? (
            // Edit Mode (Current Week)
            <div className="bg-white rounded-2xl border border-emerald-100/50 shadow-sm overflow-hidden ring-1 ring-emerald-500/10">
              <div className="px-6 border-b border-gray-100 bg-emerald-50/50 flex items-center justify-between py-4">
                <span className="text-sm font-bold text-emerald-800 uppercase tracking-widest">
                  Evaluating Week {currentWeek}
                </span>
                <span className="text-xs font-semibold text-emerald-600 bg-white px-2 py-1 rounded-md border border-emerald-100">
                  DRAFT
                </span>
              </div>
              <ReportForm student={student} isHistoryView={false} />
            </div>
          ) : (
            // History View
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden opacity-95">
              <div className="px-6 border-b border-gray-100 bg-gray-50 flex items-center justify-between py-4">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                  History: Week {selectedWeek}
                </span>
                <span className="text-xs font-semibold text-gray-500 bg-white px-2 py-1 rounded-md border border-gray-200">
                  SUBMITTED
                </span>
              </div>

              {selectedPastData ? (
                <div className="pointer-events-none grayscale-[20%]">
                  <ReportForm student={student} isHistoryView={true} initialData={selectedPastData} />
                </div>
              ) : (
                <div className="p-12 text-center text-gray-400 flex flex-col items-center gap-3">
                  <Clock size={32} className="text-gray-300" />
                  <p>No report was submitted for Week {selectedWeek}.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
