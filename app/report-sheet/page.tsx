"use client";

import React, { use } from "react";
import { Download, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useMyResult } from "@/hooks/result.hooks";
import { gradeMap } from "@/constants/teacher/results.constants";

interface ReportSheetPageProps {
  searchParams: Promise<{ termId?: string }>;
}

export default function ReportSheetPage({ searchParams }: ReportSheetPageProps) {
  const { termId } = use(searchParams);
  const { data, isLoading, isError } = useMyResult(termId);

  const handlePrint = () => window.print();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading result...</p>
      </div>
    );
  }

  if (isError || !data?.result) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-sm">
          {isError ? "Failed to load result." : "No published result found for this term."}
        </p>
        <Link
          href="/portal/student/results"
          className="text-[#006442] text-sm font-bold hover:underline"
        >
          Go back
        </Link>
      </div>
    );
  }

  const { result, student } = data;
  const scores = result.scores ?? [];

  const totalObtainable = scores.length * 100;
  const totalObtained = scores.reduce((sum, s) => sum + s.test1 + s.test2 + s.exam, 0);
  const overallScore = totalObtainable > 0
    ? ((totalObtained / totalObtainable) * 100).toFixed(1)
    : "0";

  const termName = result.term?.name ?? "";
  const yearName = result.term?.academicYear?.name ?? "";
  const daysAbsent = result.totalDays - result.daysAttended;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 font-sans text-black overflow-auto print:bg-white print:py-0 print:px-0">

      {/* Top Action Bar */}
      <div className="max-w-[210mm] mx-auto flex items-center justify-between mb-6 print:hidden">
        <Link
          href="/portal/student/results"
          className="flex items-center gap-2 px-2 py-2 bg-white text-gray-700 font-bold rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <ChevronLeft size={18} />
        </Link>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2 bg-[#006442] hover:bg-[#005236] text-white font-bold rounded-lg shadow-sm transition-colors"
        >
          <Download size={18} />
          Download
        </button>
      </div>

      {/* A4 Document */}
      <div className="max-w-[210mm] mx-auto bg-white shadow-xl min-h-[297mm] p-8 md:p-12 print:shadow-none print:w-full print:max-w-none print:p-0 print:m-0 border border-transparent print:border-none">

        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-4 items-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0">
              <Image
                src="/logo.png"
                alt="El-Shaddai Baptist College Logo"
                width={112}
                height={112}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-black" style={{ fontFamily: "serif" }}>
                EL-SHADDAI
              </h1>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-widest text-[#006442]" style={{ fontFamily: "serif" }}>
                BAPTIST COLLEGE
              </h1>
            </div>
          </div>
        </div>

        {/* Student Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-6 font-bold text-sm">
          <div className="flex items-end gap-2">
            <span className="shrink-0">Name of Student:</span>
            <div className="uppercase border-b-2 border-black flex-1 border-dotted text-center pb-0.5 min-h-[1.5rem]">
              {student?.name}
            </div>
          </div>
          <div className="hidden md:flex" />
          <div className="flex items-end gap-2">
            <span className="shrink-0">Year and Session:</span>
            <div className="uppercase border-b-2 border-black flex-1 border-dotted text-center pb-0.5 min-h-[1.5rem]">
              {yearName}
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="shrink-0">Class:</span>
            <div className="uppercase border-b-2 border-black flex-1 border-dotted text-center pb-0.5 min-h-[1.5rem]">
              {student?.class}
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="shrink-0">Class Teacher:</span>
            <div className="border-b-2 border-black flex-1 border-dotted text-center pb-0.5 min-h-[1.5rem]" />
          </div>
          <div className="flex items-end gap-2">
            <span className="shrink-0">Term:</span>
            <div className="uppercase border-b-2 border-black flex-1 border-dotted text-center pb-0.5 min-h-[1.5rem]">
              {termName}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Main Table */}
          <div className="flex-1 w-full border-2 border-black">
            <table className="w-full text-center text-xs font-bold border-collapse">
              <thead>
                <tr>
                  <th className="border-2 border-black py-2 px-1 text-left text-white bg-[#e08f51]">Subject</th>
                  <th className="border-2 border-black py-2 px-1 text-white bg-[#e08f51] leading-tight text-[10px]">Test 1 (15)</th>
                  <th className="border-2 border-black py-2 px-1 text-white bg-[#e08f51] leading-tight text-[10px]">Test 2 (15)</th>
                  <th className="border-2 border-black py-2 px-1 text-white bg-[#e08f51] leading-tight text-[10px]">Exam (70)</th>
                  <th className="border-2 border-black py-2 px-1 text-white bg-[#e08f51] leading-tight text-[10px]">Total (100)</th>
                  <th className="border-2 border-black py-2 px-1 text-white bg-[#e08f51] leading-tight text-[10px]">Grade</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((s, i) => {
                  const total = s.test1 + s.test2 + s.exam;
                  const { grade } = gradeMap(total);
                  return (
                    <tr key={i}>
                      <td className="border border-black py-1 px-2 text-left">{s.subjectName}</td>
                      <td className="border border-black py-1 px-1">{s.test1}</td>
                      <td className="border border-black py-1 px-1">{s.test2}</td>
                      <td className="border border-black py-1 px-1">{s.exam}</td>
                      <td className="border border-black py-1 px-1 font-black">{total}</td>
                      <td className="border border-black py-1 px-1 font-black">{grade}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Term Summary */}
            <div className="flex justify-between px-4 py-2 font-bold text-xs border-t border-black bg-gray-50/50">
              <span>1st Term: —</span>
              <span>2nd Term: —</span>
              <span>3rd Term: —</span>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-56 flex flex-col gap-6 shrink-0">
            {/* Grading System */}
            <table className="w-full text-center text-xs font-bold border-collapse border-2 border-black">
              <thead>
                <tr>
                  <th colSpan={2} className="border-b-2 border-black py-1 italic font-serif">Grading System</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { gr: "A", rng: "70 - 100" },
                  { gr: "B", rng: "60 - 69" },
                  { gr: "C", rng: "50 - 59" },
                  { gr: "D", rng: "45 - 49" },
                  { gr: "E", rng: "40 - 44" },
                  { gr: "F", rng: "0 - 39" },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="border border-black py-0.5 px-2 text-left">{row.gr}</td>
                    <td className="border border-black py-0.5 px-2">{row.rng}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Attendance */}
            <table className="w-full text-center text-xs font-bold border-collapse border-2 border-black">
              <thead>
                <tr>
                  <th colSpan={2} className="border-b-2 border-black py-1.5 text-white bg-[#e08f51]">Attendance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black py-1.5 px-2 text-left bg-[#f8cbab]/50 text-[#e08f51]">Total Days of School:</td>
                  <td className="border border-black py-1.5 px-2">{result.totalDays}</td>
                </tr>
                <tr>
                  <td className="border border-black py-1.5 px-2 text-left bg-[#f8cbab]/50 text-[#e08f51]">Days Attended:</td>
                  <td className="border border-black py-1.5 px-2">{result.daysAttended}</td>
                </tr>
                <tr>
                  <td className="border border-black py-1.5 px-2 text-left bg-[#f8cbab]/50 text-[#e08f51]">Days Absent:</td>
                  <td className="border border-black py-1.5 px-2">{daysAbsent}</td>
                </tr>
                <tr>
                  <td className="border border-black py-1.5 px-2 text-left bg-[#f8cbab]/50 text-[#e08f51]">Vacation Date:</td>
                  <td className="border border-black py-1.5 px-1" />
                </tr>
                <tr>
                  <td className="border border-black py-1.5 px-2 text-left bg-[#f8cbab]/50 text-[#e08f51]">Sch. Resumes:</td>
                  <td className="border border-black py-1.5 px-1" />
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-col gap-6 text-sm font-bold">
          <div className="flex justify-between items-center px-4">
            <span>Total Marks Obtainable: {totalObtainable}</span>
            <span>Total Marks Obtained: {totalObtained}</span>
            <span>Overall Score: {overallScore}%</span>
          </div>

          <div className="text-center italic text-gray-400 text-sm">
            {result.teacherRemark || ""}
          </div>

          <div className="flex justify-between items-end mt-4">
            <span>V.P&apos;s Remark:</span>
            <div className="w-64 border-b-2 border-black flex flex-col items-center">
              <span className="text-[10px] uppercase invisible">Signature</span>
            </div>
            <div className="w-48 border-b-2 border-black mt-10 text-right pr-2 text-[10px] block relative">
              <span className="absolute -bottom-4 right-0">Date &amp; Signature</span>
            </div>
          </div>

          <div className="text-xs flex flex-col sm:flex-row items-center justify-center gap-2 mt-6">
            <div className="flex items-center gap-2">
              <span>Outstanding: ₦</span>
              <span className="w-24 border-b border-black inline-block h-4" />
            </div>
            <div className="flex items-center gap-2">
              <span>, Next Term Tuition: ₦</span>
              <span className="w-24 border-b border-black inline-block h-4" />
            </div>
            <div className="flex items-center gap-2">
              <span>, I.C.T: </span>
              <span className="w-24 border-b border-black inline-block h-4" />
            </div>
            <div className="flex items-center gap-2">
              <span>Total: </span>
              <span className="w-24 border-b border-black inline-block h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
