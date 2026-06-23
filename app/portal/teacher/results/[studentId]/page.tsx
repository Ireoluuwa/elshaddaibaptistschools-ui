"use client";

import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Filter, Clock, FileEdit, UploadCloud } from "lucide-react";
import ResultForm from "@/components/teacher/results/result-form";
import BulkUploadModal from "@/components/teacher/results/BulkUploadModal";
import { useResultsDashboardInit, useStudentResult, useResultSubjects } from "@/hooks/result.hooks";

interface ResultPageProps {
  params: Promise<{ studentId: string }>;
}

export default function StudentResultPage({ params }: ResultPageProps) {
  const router = useRouter();
  const { studentId } = use(params);

  const { data: init, isLoading: initLoading } = useResultsDashboardInit();
  const [selectedTermId, setSelectedTermId] = useState<string>("");
  const [isBulkOpen, setIsBulkOpen] = useState(false);

  // Set default term to active period once init loads
  useEffect(() => {
    if (init?.activePeriod?.termId && !selectedTermId) {
      setSelectedTermId(init.activePeriod.termId);
    }
  }, [init]);

  const { data: resultData, isLoading: resultLoading } = useStudentResult(studentId, selectedTermId);
  const { data: subjectsData } = useResultSubjects(studentId);

  const student = resultData?.student;
  const result = resultData?.result;
  const subjects = subjectsData?.map((s) => s.name) ?? [];

  // Build flat list of { yearName, termId, termName } for the dropdowns
  const allTerms = init?.periods.flatMap((year) =>
    year.terms.map((term) => ({
      yearName: year.name,
      termId: term.id,
      termName: term.name,
      label: `${year.name} — ${term.name}`,
    }))
  ) ?? [];

  const isCurrentTerm = selectedTermId === init?.activePeriod?.termId;

  if (initLoading) {
    return (
      <div className="max-w-5xl mx-auto flex items-center justify-center h-64">
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    );
  }

  if (!student && !resultLoading) {
    return (
      <div className="max-w-5xl mx-auto flex items-center justify-center h-64">
        <p className="text-gray-400 text-sm">Student not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/portal/teacher/results")}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-secondary hover:border-gray-300 transition-all shadow-sm shrink-0"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-secondary text-2xl font-black tracking-tight flex items-center gap-3">
              {student?.name ?? "Loading..."}
              <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-bold font-mono">
                {student?.studentId ?? "—"}
              </span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {student?.class} — Upload or view academic results.
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsBulkOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-50 hover:text-emerald-700 hover:border-emerald-200 transition-all shadow-sm"
        >
          <UploadCloud size={18} className="text-emerald-600" />
          Bulk Upload Results
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter size={16} className="text-gray-400 shrink-0" />
          <select
            value={selectedTermId}
            onChange={(e) => setSelectedTermId(e.target.value)}
            className="flex-1 sm:w-auto h-10 px-3 rounded-lg border border-gray-200 bg-white text-xs sm:text-sm outline-none focus:border-[#006442] transition-all cursor-pointer font-medium text-gray-600"
          >
            {allTerms.map((t) => (
              <option key={t.termId} value={t.termId}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {isCurrentTerm ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-100">
            <FileEdit size={12} />
            Editable
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-gray-500 bg-gray-100 rounded-lg border border-gray-200">
            <Clock size={12} />
            Read Only
          </span>
        )}
      </div>

      {/* Result Form */}
      {resultLoading ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <p className="text-gray-400 text-sm">Loading result...</p>
        </div>
      ) : !isCurrentTerm && !result ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <Clock size={32} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">No result found for this term.</p>
        </div>
      ) : (
        <div className={!isCurrentTerm ? "pointer-events-none opacity-90" : ""}>
          <ResultForm
            studentId={studentId}
            termId={selectedTermId}
            subjects={subjects}
            isReadOnly={!isCurrentTerm}
            initialScores={result?.scores}
            initialDaysAttended={result?.daysAttended}
            initialTotalDays={result?.totalDays}
          />
        </div>
      )}

      <BulkUploadModal isOpen={isBulkOpen} onClose={() => setIsBulkOpen(false)} />
    </div>
  );
}
