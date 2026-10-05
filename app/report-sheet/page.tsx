"use client";

import React, { use, useRef, useState } from "react";
import { Download, ChevronLeft, FileEdit, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useMyResult, useStudentResult } from "@/hooks/result.hooks";
import { gradeMap } from "@/constants/teacher/results.constants";
import { previewOwingResult, previewResult } from "@/constants/result-preview.constants";
import ResultOnHold from "@/components/student/results/ResultOnHold";
import { downloadElementAsPdf } from "@/lib/pdf";
import FitToWidth from "@/components/shared/FitToWidth";
import { toast } from "@/store/toast.store";

const formatDate = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }) : "";

// Fee amounts on the sheet: blank when unknown, "₦0" when nothing is owed.
const feeText = (n?: number) => (n === undefined ? "" : `₦${n.toLocaleString()}`);

interface ReportSheetPageProps {
  searchParams: Promise<{ termId?: string; studentId?: string; preview?: string }>;
}

export default function ReportSheetPage({ searchParams }: ReportSheetPageProps) {
  const { termId, studentId, preview } = use(searchParams);

  // Local-only: render sample data without logging in or hitting the API.
  // ?preview=1 shows a normal result; ?preview=owing shows the fees-on-hold screen.
  const isPreview =
    (preview === "1" || preview === "owing") && process.env.NODE_ENV === "development";
  const isTeacherView = !!studentId;
  const myResult = useMyResult(isTeacherView ? undefined : termId, !isTeacherView && !isPreview);
  const studentResult = useStudentResult(studentId ?? "", termId ?? "");

  const { data, isLoading, isError } = isPreview
    ? { data: preview === "owing" ? previewOwingResult : previewResult, isLoading: false, isError: false }
    : isTeacherView
      ? studentResult
      : myResult;
  const backHref = isTeacherView
    ? `/portal/teacher/results/${studentId}`
    : "/portal/student/results";

  const sheetRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!sheetRef.current || !data?.result) return;
    setIsDownloading(true);
    try {
      const name = data.student?.name ?? "Student";
      const term = [data.result.term?.name, data.result.term?.academicYear?.name]
        .filter(Boolean)
        .join(" ")
        .replace(/\//g, "-");
      await downloadElementAsPdf(sheetRef.current, `Result - ${name}${term ? ` - ${term}` : ""}`);
    } catch (err) {
      console.error("PDF download failed:", err);
      toast.error("Download failed", "Couldn't create the PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-[210mm] mx-auto flex items-center justify-between mb-6">
          <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
          <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <div className="max-w-[210mm] mx-auto bg-white shadow-xl min-h-[297mm] p-8 md:p-12">
          {/* Header skeleton */}
          <div className="flex gap-4 items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse shrink-0" />
            <div className="flex flex-col gap-3">
              <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-5 w-36 bg-gray-100 rounded-lg animate-pulse" />
            </div>
          </div>
          {/* Student info skeleton */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-end gap-2">
                <div className="h-4 w-28 bg-gray-100 rounded animate-pulse shrink-0" />
                <div className="flex-1 h-4 bg-gray-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
          {/* Table skeleton */}
          <div className="border-2 border-gray-200 rounded-sm overflow-hidden">
            <div className="h-10 bg-gray-200 animate-pulse" />
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex border-t border-gray-100">
                <div className="flex-1 h-8 bg-gray-50 animate-pulse border-r border-gray-100" />
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="w-16 h-8 bg-gray-50 animate-pulse border-r border-gray-100 last:border-r-0" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Owing fees: the server withholds the result and sends only the amount owed.
  const feesHold = data && "feesHold" in data ? data.feesHold : null;
  if (!isTeacherView && feesHold) {
    const myData = data as { periods?: { name: string; terms: { id: string; name: string }[] }[]; selectedTermId?: string | null };
    const session = myData.periods?.find((p) => p.terms.some((t) => t.id === myData.selectedTermId));
    const term = session?.terms.find((t) => t.id === myData.selectedTermId);
    return (
      <ResultOnHold
        outstanding={feesHold.outstanding}
        termLabel={[term?.name, session?.name].filter(Boolean).join(", ")}
        studentName={data?.student?.name}
        backHref={backHref}
      />
    );
  }

  if (isError || !data?.result) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-sm">
          {isError
            ? "Failed to load result."
            : isTeacherView
              ? "No result has been entered for this term."
              : "No published result found for this term."}
        </p>
        <Link
          href={backHref}
          className="text-[#006442] text-sm font-bold hover:underline"
        >
          Go back
        </Link>
      </div>
    );
  }

  const { result, student } = data;
  const scores = result.scores ?? [];
  const fees = result.fees;

  const totalObtainable = scores.length * 100;
  const totalObtained = scores.reduce((sum, s) => sum + s.test1 + s.test2 + s.exam, 0);
  const overallScore = totalObtainable > 0
    ? ((totalObtained / totalObtainable) * 100).toFixed(1)
    : "0";

  const termName = result.term?.name ?? "";
  const yearName = result.term?.academicYear?.name ?? "";
  const daysAbsent = result.totalDays - result.daysAttended;
  const reportDetails = result.term?.reportDetails;

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-8 px-3 sm:px-4 font-sans text-black print:bg-white print:py-0 print:px-0">

      {/* Top Action Bar */}
      <div className="max-w-[210mm] mx-auto flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6 print:hidden">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Link
            href={backHref}
            className="flex items-center gap-2 px-2 py-2 bg-white text-gray-700 font-bold rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ChevronLeft size={18} />
          </Link>
          {isTeacherView && result.status !== "PUBLISHED" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 rounded-lg border border-amber-100">
              <FileEdit size={12} />
              Draft — not yet visible to parents
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center gap-2 px-4 sm:px-5 py-2 text-sm sm:text-base bg-[#006442] hover:bg-[#005236] text-white font-bold rounded-lg shadow-sm transition-colors disabled:opacity-70 disabled:cursor-wait"
        >
          {isDownloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
          {isDownloading ? "Preparing…" : "Download PDF"}
        </button>
        </div>
      </div>

      {/* A4 Document — always laid out at full A4 width; shrunk on small screens.
          The inner element is what the PDF captures. */}
      <FitToWidth>
      <div ref={sheetRef} className="w-[210mm] bg-white shadow-xl min-h-[297mm] p-12 print:shadow-none print:w-full print:p-0 print:m-0 border border-transparent print:border-none">

        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-4 items-center">
            <div className="w-28 h-28 shrink-0">
              <Image
                src="/logo.png"
                alt="El-Shaddai Baptist College Logo"
                width={112}
                height={112}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-5xl font-black tracking-tight text-black" style={{ fontFamily: "serif" }}>
                EL-SHADDAI
              </h1>
              <h1 className="text-3xl font-bold tracking-widest text-[#006442]" style={{ fontFamily: "serif" }}>
                BAPTIST COLLEGE
              </h1>
            </div>
          </div>
        </div>

        {/* Student Info */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-6 font-bold text-sm">
          <div className="flex items-end gap-2">
            <span className="shrink-0">Name of Student:</span>
            <div className="uppercase border-b-2 border-black flex-1 border-dotted text-center pb-0.5 min-h-[1.5rem]">
              {student?.name}
            </div>
          </div>
          <div className="flex" />
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
            <div className="uppercase border-b-2 border-black flex-1 border-dotted text-center pb-0.5 min-h-[1.5rem]">
              {student?.teacherName ?? ""}
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="shrink-0">Term:</span>
            <div className="uppercase border-b-2 border-black flex-1 border-dotted text-center pb-0.5 min-h-[1.5rem]">
              {termName}
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-6 items-start">
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
          <div className="w-56 flex flex-col gap-6 shrink-0">
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
                  <td className="border border-black py-1.5 px-1">{formatDate(reportDetails?.vacationDate)}</td>
                </tr>
                <tr>
                  <td className="border border-black py-1.5 px-2 text-left bg-[#f8cbab]/50 text-[#e08f51]">Sch. Resumes:</td>
                  <td className="border border-black py-1.5 px-1">{formatDate(reportDetails?.resumptionDate)}</td>
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

          {/* V.P's remark, date & signature */}
          <div className="grid grid-cols-[auto_minmax(0,1fr)_14rem] items-end gap-x-4 mt-4">
            <span className="text-sm font-semibold whitespace-nowrap pb-1">V.P&apos;s Remark:</span>
            <div className="border-b border-black pb-1 text-sm font-medium min-h-7 flex items-end justify-center text-center">
              {result.vpRemark}
            </div>
            <div>
              <div className="border-b border-black pb-1 h-12 flex items-end justify-between gap-2">
                <span className="text-sm font-medium tabular-nums">{formatDate(reportDetails?.signedDate)}</span>
                {reportDetails?.signatureUrl && (
                  // eslint-disable-next-line @next/next/no-img-element -- may be a data URL
                  <img src={reportDetails.signatureUrl} alt="V.P's signature" className="h-11 max-w-28 object-contain" />
                )}
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-right mt-1">Date &amp; Signature</p>
            </div>
          </div>

          {/* Fees */}
          <table className="w-full mt-4 border-collapse border border-black text-center">
            <thead>
              <tr className="text-[10px] font-semibold uppercase tracking-wider">
                <th className="border border-black px-2 py-1.5 font-semibold">Outstanding</th>
                <th className="border border-black px-2 py-1.5 font-semibold">Next Term Tuition</th>
                <th className="border border-black px-2 py-1.5 font-semibold">I.C.T</th>
                <th className="border border-black px-2 py-1.5 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-sm font-medium tabular-nums">
                <td className="border border-black px-2 py-2 h-9">{feeText(fees?.outstanding)}</td>
                <td className="border border-black px-2 py-2">{feeText(fees?.nextTermTuition)}</td>
                <td className="border border-black px-2 py-2">{feeText(fees?.ict)}</td>
                <td className="border border-black px-2 py-2 font-bold">
                  {fees ? feeText(fees.outstanding + fees.nextTermTuition + fees.ict) : ""}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </FitToWidth>
    </div>
  );
}
