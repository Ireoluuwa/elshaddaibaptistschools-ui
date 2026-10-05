"use client";

import React, { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import ClassNav from "@/components/admin/shared/ClassNav";
import RemarkReviewModal, { overallOf } from "@/components/admin/remarks/RemarkReviewModal";
import { panelClass } from "@/components/admin/shared/AdminModal";
import {
  mockSessions,
  mockStudents,
  mockTermResult,
  promotionClasses,
} from "@/constants/admin/mock.constants";
import { toast } from "@/store/toast.store";

const terms = mockSessions.flatMap((s) =>
  s.terms.map((t) => ({ id: t.id, label: `${s.name} · ${t.name}` })),
);
// Default to the most recent term of the current session.
const defaultTermId =
  mockSessions.find((s) => s.isCurrent)?.terms.at(-1)?.id ?? terms[0]?.id;

// Keyed by term + student so each term keeps its own remarks.
const keyOf = (termId: string, studentId: string) => `${termId}:${studentId}`;

// Only students with a result entered can be given a remark.
const reviewableIn = (className: string) =>
  mockStudents
    .filter((s) => s.className === className && s.status === "active")
    .map((s) => ({ student: s, result: mockTermResult(s) }));

const rowGrid =
  "grid grid-cols-[minmax(0,1fr)_auto_16px] md:grid-cols-[220px_80px_minmax(0,1fr)_16px] items-center gap-x-4 gap-y-1";

export default function RemarksPage() {
  const [termId, setTermId] = useState(defaultTermId);
  const [selectedClass, setSelectedClass] = useState(promotionClasses[0]);
  const [remarks, setRemarks] = useState<Record<string, string>>({});
  const [openId, setOpenId] = useState<string | null>(null);

  const termLabel = terms.find((t) => t.id === termId)?.label ?? "";
  const rows = useMemo(() => reviewableIn(selectedClass), [selectedClass]);
  const withResults = rows.filter((r) => r.result);

  const remarkFor = (id: string) => remarks[keyOf(termId, id)] ?? "";
  const doneCount = (className: string) =>
    reviewableIn(className).filter((r) => r.result && remarks[keyOf(termId, r.student.id)]).length;

  const openIndex = withResults.findIndex((r) => r.student.id === openId);
  const open = openIndex >= 0 ? withResults[openIndex] : null;

  const handleSave = (remark: string, goNext: boolean) => {
    if (!open) return;
    // TODO: PATCH /admin/results/:resultId { vpRemark }
    setRemarks((r) => ({ ...r, [keyOf(termId, open.student.id)]: remark.trim() }));
    if (goNext && openIndex < withResults.length - 1) {
      setOpenId(withResults[openIndex + 1].student.id);
    } else {
      setOpenId(null);
      toast.success("Remark saved", `${open.student.firstName} ${open.student.lastName}`);
    }
  };

  const done = doneCount(selectedClass);

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <PageHeader
        title="V.P's Remarks"
        description="Review each student's result and write the remark printed on their report sheet."
        action={
          <select
            value={termId}
            onChange={(e) => setTermId(e.target.value)}
            aria-label="Term"
            className="h-10 px-3 rounded-lg border border-line focus:border-brand outline-none text-sm text-ink bg-white self-start"
          >
            {terms.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        }
      />

      <div className="grid lg:grid-cols-[220px_minmax(0,1fr)] gap-6 items-start">
        <ClassNav
          selected={selectedClass}
          onSelect={setSelectedClass}
          items={promotionClasses.map((c) => {
            const reviewable = reviewableIn(c).filter((r) => r.result).length;
            const count = doneCount(c);
            return {
              key: c,
              label: c,
              detail: `${count} of ${reviewable} remarked`,
              done: reviewable > 0 && count === reviewable,
            };
          })}
        />

        <section className={`${panelClass} overflow-hidden`}>
          <header className="flex flex-wrap items-end justify-between gap-3 px-5 py-4 border-b border-line">
            <div>
              <h2 className="text-xl font-bold text-ink">{selectedClass}</h2>
              <p className="text-sm text-muted mt-0.5">
                {done} of {withResults.length} students remarked
              </p>
            </div>
            {withResults.length > done && (
              <button
                onClick={() => {
                  const next = withResults.find((r) => !remarkFor(r.student.id));
                  if (next) setOpenId(next.student.id);
                }}
                className="h-9 px-3 text-sm font-semibold text-white bg-brand hover:bg-brand-dark rounded-lg transition-colors"
              >
                {done === 0 ? "Start reviewing" : "Continue reviewing"}
              </button>
            )}
          </header>

          {rows.length === 0 ? (
            <p className="px-5 py-12 text-center text-sm text-muted">
              No active students in {selectedClass}.
            </p>
          ) : (
            <>
              <div className={`${rowGrid} hidden md:grid px-5 py-2 bg-canvas border-b border-line text-xs font-medium text-muted`}>
                <span>Student</span>
                <span>Overall</span>
                <span>V.P&apos;s remark</span>
                <span />
              </div>
              <ul className="divide-y divide-line">
                {rows.map(({ student: s, result }) => {
                  const overall = result ? overallOf(result) : null;
                  const remark = remarkFor(s.id);
                  return (
                    <li key={s.id}>
                      <button
                        onClick={() => setOpenId(s.id)}
                        disabled={!result}
                        className={`${rowGrid} w-full px-5 py-3 text-left hover:bg-canvas transition-colors group disabled:hover:bg-transparent disabled:cursor-default`}
                      >
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-ink truncate">
                            {s.lastName} {s.firstName}
                          </span>
                          <span className="block text-xs text-muted tabular-nums">{s.username}</span>
                        </span>
                        <span
                          className={`text-sm font-semibold tabular-nums text-right md:text-left ${
                            overall === null ? "text-muted font-normal" : overall < 40 ? "text-clay" : "text-ink"
                          }`}
                        >
                          {overall === null ? "—" : `${overall.toFixed(1)}%`}
                        </span>
                        <span className="col-span-3 md:col-span-1 row-start-2 md:row-start-auto text-sm truncate">
                          {!result ? (
                            <span className="text-muted">No result entered yet</span>
                          ) : remark ? (
                            <span className="text-ink">{remark}</span>
                          ) : (
                            <span className="text-clay">No remark yet</span>
                          )}
                        </span>
                        <ChevronRight
                          size={16}
                          className={`row-start-1 col-start-3 md:col-start-auto md:row-start-auto ${
                            result ? "text-muted/40 group-hover:text-brand" : "invisible"
                          } transition-colors`}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </section>
      </div>

      {open && open.result && (
        <RemarkReviewModal
          key={open.student.id}
          student={open.student}
          result={open.result}
          termLabel={termLabel}
          initialRemark={remarkFor(open.student.id)}
          position={openIndex + 1}
          total={withResults.length}
          onClose={() => setOpenId(null)}
          onPrev={openIndex > 0 ? () => setOpenId(withResults[openIndex - 1].student.id) : undefined}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
