"use client";

import React, { use, useState, useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import { ArrowLeft, Clock, FileEdit } from "lucide-react";
import ReportForm from "@/components/teacher/reports/report-form";
import { useInitTeacherDashboard, useStudentHistory } from "@/hooks/report.hooks";

interface ReportPageProps {
  params: Promise<{ studentId: string }>;
}

export default function StudentReportPage({ params }: ReportPageProps) {
  const router = useRouter();
  const unwrappedParams = use(params);

  const { data: dashboardData } = useInitTeacherDashboard();
  const termId = dashboardData?.activePeriod?.termId || "";
  const currentWeek = dashboardData?.activePeriod?.week || 1;

  const { data: historyData, isLoading, isError } = useStudentHistory(unwrappedParams.studentId, termId);

  const [selectedWeek, setSelectedWeek] = useState(currentWeek);

  useEffect(() => {
    if (currentWeek) {
      setSelectedWeek(currentWeek);
    }
  }, [currentWeek]);

  if (isLoading || !dashboardData || !historyData) {
    return (
      <div className="max-w-6xl mx-auto flex flex-col gap-8 p-10 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="flex gap-6">
          <div className="w-64 h-96 bg-gray-200 rounded-2xl"></div>
          <div className="flex-1 h-96 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <div className="p-10 text-center text-red-500">Failed to load student data.</div>;
  }

  const { student, timeline, activeReport } = historyData;

  // Use classId and departmentId returned from the student history data
  const classId = student.classId;
  const departmentId = student.departmentId;

  const selectedTimelineItem = timeline.find((t) => t.week === selectedWeek);
  const hasPastData = !!selectedTimelineItem?.reportId;

  let initialData = undefined;
  if (selectedWeek === currentWeek && activeReport) {
    initialData = {
      rating: activeReport.behavioralScore || 0,
      description: activeReport.teacherRemark || "",
      attendance: activeReport.attendance || 5,
      testScores: activeReport.scores?.map((s, i) => ({
        id: i,
        subject: s.subjectName,
        score: String(s.score),
        maxScore: String(s.total)
      })) || []
    };
  }

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
              {student.studentId}
            </span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Reviewing past performance or evaluating current week.</p>
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Form Area */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-full md:w-64 shrink-0 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex flex-col gap-2">
          <div className="px-3 pb-2 text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 mb-2">
            History
          </div>

          <div className="flex flex-col gap-1 max-h-[300px] md:max-h-none overflow-y-auto pr-2 scrollbar-hide">
            {timeline.map((item) => {
              const week = item.week;
              const isSelected = selectedWeek === week;
              const isCurrent = week === currentWeek;
              const isSubmitted = item.status === 'submitted' || item.status === 'PUBLISHED';

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
                  {!isCurrent && isSubmitted && (
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
                  {activeReport?.status === 'submitted' ? 'SUBMITTED' : 'DRAFT'}
                </span>
              </div>
              <ReportForm 
                student={{...student, class: student.class}} 
                classId={classId} 
                departmentId={departmentId} 
                termId={termId}
                weekNumber={currentWeek}
                isHistoryView={false} 
                initialData={initialData} 
              />
            </div>
          ) : (
            // History View
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden opacity-95">
              <div className="px-6 border-b border-gray-100 bg-gray-50 flex items-center justify-between py-4">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                  History: Week {selectedWeek}
                </span>
                <span className="text-xs font-semibold text-gray-500 bg-white px-2 py-1 rounded-md border border-gray-200">
                  {selectedTimelineItem?.status === 'NEW' ? 'NO REPORT' : 'SUBMITTED'}
                </span>
              </div>

              {hasPastData ? (
                <div className="p-12 text-center text-gray-500 flex flex-col items-center gap-3">
                  <FileEdit size={32} className="text-gray-300" />
                  <p>A report was submitted for Week {selectedWeek}.</p>
                  <p className="text-xs text-gray-400 mt-2">Past report viewing details requires fetching by ID.</p>
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
