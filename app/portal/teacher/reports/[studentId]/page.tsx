"use client";

import React, { use } from "react";
import ReportForm from "@/components/teacher/reports/ReportForm";
import { mockStudents } from "@/constants/teacher/reports.constants";
import { notFound } from "next/navigation";

interface ReportPageProps {
  params: Promise<{ studentId: string }>;
}

export default function StudentReportPage({ params }: ReportPageProps) {
  // Unwrap the promise in Next.js App Router (assuming Next 14+)
  const unwrappedParams = use(params);
  
  const student = mockStudents.find((s) => s.id === unwrappedParams.studentId);

  if (!student) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <h1 className="text-[#0e2e1d] text-2xl font-black tracking-tight uppercase">
          Evaluate Student
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Complete the weekly performance report for Term 1 • Week 5.
        </p>
      </div>

      {/* Main Form Context */}
      <ReportForm student={student} />

      {/* Footer */}
      <footer className="text-center text-gray-400 text-[11px] py-8 mt-4 font-medium uppercase tracking-[0.15em] border-t border-gray-100">
        &copy; {new Date().getFullYear()} El-Shaddai Schools. Teacher Portal.
      </footer>
    </div>
  );
}
