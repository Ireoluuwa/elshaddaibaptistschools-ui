"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import AdminModal, {
  primaryButton,
  secondaryButton,
} from "@/components/admin/shared/AdminModal";
import { gradeMap } from "@/constants/teacher/results.constants";
import { remarkBands } from "@/constants/admin/remarks.constants";
import type {
  ClassResultRow,
  StudentTermResult,
} from "@/types/admin-results.types";

interface RemarkReviewModalProps {
  row: ClassResultRow & { result: StudentTermResult };
  className: string;
  termLabel: string;
  position: number;
  total: number;
  isSaving: boolean;
  // Closed term: show the remark but don't allow changes.
  readOnly?: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onSave: (remark: string, goNext: boolean) => void;
}

export const overallOf = (result: Pick<StudentTermResult, "scores">) => {
  const obtained = result.scores.reduce(
    (sum, s) => sum + s.test1 + s.test2 + s.exam,
    0,
  );
  return result.scores.length
    ? (obtained / (result.scores.length * 100)) * 100
    : 0;
};

const RemarkReviewModal: React.FC<RemarkReviewModalProps> = ({
  row,
  className,
  termLabel,
  position,
  total,
  isSaving,
  readOnly = false,
  onClose,
  onPrev,
  onSave,
}) => {
  const { result } = row;
  const [remark, setRemark] = useState(result.vpRemark ?? "");

  const overall = overallOf(result);
  const overallGrade = gradeMap(overall).grade;
  const passed = result.scores.filter(
    (s) => s.test1 + s.test2 + s.exam >= 40,
  ).length;
  const suggested = remarkBands.find((b) => overall >= b.min)?.remark ?? "";
  const isLast = position === total;

  const summary = [
    { label: "Overall", value: `${overall.toFixed(1)}%`, warn: overall < 40 },
    { label: "Grade", value: overallGrade, warn: overallGrade === "F" },
    {
      label: "Subjects passed",
      value: `${passed} / ${result.scores.length}`,
      warn: passed < result.scores.length / 2,
    },
    {
      label: "Attendance",
      value: `${result.daysAttended} / ${result.totalDays} days`,
      warn: false,
    },
  ];

  return (
    <AdminModal
      isOpen
      wide
      onClose={isSaving ? () => {} : onClose}
      title={`${row.lastName} ${row.firstName}`}
      description={`${className}${row.department ? ` ${row.department}` : ""} · ${termLabel}`}
      footer={
        <div className="w-full flex items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            <button
              onClick={onPrev}
              disabled={!onPrev || isSaving}
              aria-label="Previous student"
              className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-line text-ink hover:border-ink/30 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm text-muted tabular-nums px-2">
              {position} of {total}
            </span>
          </div>
          {readOnly ? (
            <button onClick={onClose} className={secondaryButton}>
              Close
            </button>
          ) : (
            <div className="flex items-center gap-2">
              {!isLast && (
                <button
                  onClick={() => onSave(remark, false)}
                  disabled={!remark.trim() || isSaving}
                  className={`${secondaryButton} hidden sm:inline-flex disabled:opacity-40 disabled:pointer-events-none`}
                >
                  Save
                </button>
              )}
              <button
                onClick={() => onSave(remark, !isLast)}
                disabled={!remark.trim() || isSaving}
                className={primaryButton}
              >
                {isSaving && <Loader2 size={16} className="animate-spin" />}
                {isLast ? (
                  "Save"
                ) : (
                  <>
                    Save & next <ChevronRight size={16} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {/* Summary */}
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-line rounded-lg overflow-hidden border border-line">
          {summary.map((item) => (
            <div key={item.label} className="bg-white px-4 py-3">
              <dt className="text-xs text-muted">{item.label}</dt>
              <dd
                className={`text-lg font-bold tabular-nums mt-0.5 ${item.warn ? "text-clay" : "text-ink"}`}
              >
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Scores */}
        <div className="rounded-lg border border-line overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-canvas text-xs text-muted">
              <tr>
                <th className="text-left font-medium px-4 py-2">Subject</th>
                <th className="hidden sm:table-cell text-right font-medium px-3 py-2">
                  1st test <span className="text-muted/60">/15</span>
                </th>
                <th className="hidden sm:table-cell text-right font-medium px-3 py-2">
                  2nd test <span className="text-muted/60">/15</span>
                </th>
                <th className="hidden sm:table-cell text-right font-medium px-3 py-2">
                  Exam <span className="text-muted/60">/70</span>
                </th>
                <th className="text-right font-medium px-3 py-2">Total</th>
                <th className="text-center font-medium px-4 py-2 w-16">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {result.scores.map((s) => {
                const subjectTotal = s.test1 + s.test2 + s.exam;
                const failed = subjectTotal < 40;
                return (
                  <tr key={s.subjectName}>
                    <td className="px-4 py-2 text-ink">{s.subjectName}</td>
                    <td className="hidden sm:table-cell px-3 py-2 text-right text-muted tabular-nums">
                      {s.test1}
                    </td>
                    <td className="hidden sm:table-cell px-3 py-2 text-right text-muted tabular-nums">
                      {s.test2}
                    </td>
                    <td className="hidden sm:table-cell px-3 py-2 text-right text-muted tabular-nums">
                      {s.exam}
                    </td>
                    <td
                      className={`px-3 py-2 text-right font-semibold tabular-nums ${failed ? "text-clay" : "text-ink"}`}
                    >
                      {subjectTotal}
                    </td>
                    <td
                      className={`px-4 py-2 text-center font-semibold ${failed ? "text-clay" : "text-ink"}`}
                    >
                      {gradeMap(subjectTotal).grade}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Class teacher's remark */}
        <div>
          <p className="text-sm font-medium text-ink mb-1.5">
            Class teacher&apos;s remark
          </p>
          <p className="text-sm text-muted italic border-l-2 border-line pl-3">
            {result.teacherRemark || "No remark from the class teacher."}
          </p>
        </div>

        {/* V.P's remark */}
        <div>
          <label
            htmlFor="vp-remark"
            className="text-sm font-medium text-ink mb-1.5 block"
          >
            V.P&apos;s remark
          </label>
          {readOnly ? (
            <p className="text-sm text-ink border-l-2 border-line pl-3">
              {remark || (
                <span className="text-muted">No remark was written.</span>
              )}
              <span className="block text-xs text-muted mt-1">
                This term is closed. Reopen it to change remarks.
              </span>
            </p>
          ) : (
            <>
              <textarea
                id="vp-remark"
                autoFocus
                rows={2}
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="Write a remark for this student"
                className="w-full px-3 py-2 rounded-lg border border-line focus:border-brand focus:ring-2 focus:ring-brand/15 outline-none text-sm text-ink bg-white resize-none placeholder:text-muted/60"
              />
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-xs text-muted">Suggestions:</span>
                {remarkBands.map((b) => (
                  <button
                    key={b.remark}
                    onClick={() => setRemark(b.remark)}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                      b.remark === suggested
                        ? "border-brand text-brand bg-tint"
                        : "border-line text-muted hover:text-ink hover:border-ink/30"
                    }`}
                  >
                    {b.remark}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </AdminModal>
  );
};

export default RemarkReviewModal;
