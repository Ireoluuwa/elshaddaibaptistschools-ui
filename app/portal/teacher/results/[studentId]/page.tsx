"use client";

import React, { use, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { ArrowLeft, Filter, Clock, FileEdit, UploadCloud } from "lucide-react";
import { mockStudents } from "@/constants/teacher/reports.constants";
import {
  academicYears,
  terms,
  currentSession,
  mockResults,
} from "@/constants/teacher/results.constants";
import ResultForm from "@/components/teacher/results/result-form";
import BulkUploadModal from "@/components/teacher/results/BulkUploadModal";

interface ResultPageProps {
  params: Promise<{ studentId: string }>;
}

export default function StudentResultPage({ params }: ResultPageProps) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const student = mockStudents.find((s) => s.id === unwrappedParams.studentId);

  const [selectedYear, setSelectedYear] = useState(currentSession.year);
  const [selectedTerm, setSelectedTerm] = useState(currentSession.term);
  const [isBulkOpen, setIsBulkOpen] = useState(false);

  if (!student) return notFound();

  const isCurrentSession =
    selectedYear === currentSession.year &&
    selectedTerm === currentSession.term;

  // Find past result for this student + year + term combo
  const studentResults = mockResults[student.id] || [];
  const pastResult = studentResults.find(
    (r) => r.year === selectedYear && r.term === selectedTerm
  );

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/portal/teacher/results")}
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
            <p className="text-gray-400 text-sm mt-1">
              {student.class} — Upload or view academic results.
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
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="flex-1 sm:w-auto h-10 px-3 rounded-lg border border-gray-200 bg-white text-xs sm:text-sm outline-none focus:border-[#006442] transition-all cursor-pointer font-medium text-gray-600"
          >
            {academicYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            className="flex-1 sm:w-auto h-10 px-3 rounded-lg border border-gray-200 bg-white text-xs sm:text-sm outline-none focus:border-[#006442] transition-all cursor-pointer font-medium text-gray-600"
          >
          {terms.map((term) => (
            <option key={term} value={term}>
              {term}
            </option>
          ))}
        </select>
        </div>

        {/* Status Badge */}
        {isCurrentSession ? (
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

      {/* Result Form or History View */}
      {isCurrentSession ? (
        <ResultForm isReadOnly={false} />
      ) : pastResult ? (
        <div className="pointer-events-none opacity-90">
          <ResultForm
            isReadOnly={true}
            initialScores={pastResult.scores}
            initialDaysAttended={pastResult.daysAttended}
            initialTotalDays={pastResult.totalDays}
          />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <Clock size={32} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">
            No results found for {selectedYear} — {selectedTerm}.
          </p>
        </div>
      )}

      {/* Modals */}
      <BulkUploadModal isOpen={isBulkOpen} onClose={() => setIsBulkOpen(false)} />
    </div>
  );
}
