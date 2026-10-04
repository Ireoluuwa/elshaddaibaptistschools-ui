"use client";

import React, { useMemo, useState } from "react";
import PageHeader from "@/components/admin/shared/PageHeader";
import ClassNav from "@/components/admin/shared/ClassNav";
import { panelClass, primaryButton } from "@/components/admin/shared/AdminModal";
import {
  mockSessions,
  mockStudents,
  promotionClasses,
  remarkBands,
} from "@/constants/admin/mock.constants";
import { toast } from "@/store/toast.store";

const terms = mockSessions.flatMap((s) =>
  s.terms.map((t) => ({ id: t.id, label: `${s.name} · ${t.name}` })),
);
// Default to the most recent term of the current session.
const defaultTermId =
  mockSessions.find((s) => s.isCurrent)?.terms.at(-1)?.id ?? terms[0]?.id;

const suggestRemark = (score: number) =>
  remarkBands.find((b) => score >= b.min)?.remark ?? "";

// Keyed by term + student so switching terms keeps each term's remarks separate.
const keyOf = (termId: string, studentId: string) => `${termId}:${studentId}`;

const studentsIn = (className: string) =>
  mockStudents.filter((s) => s.className === className && s.status === "active");

export default function RemarksPage() {
  const [termId, setTermId] = useState(defaultTermId);
  const [selectedClass, setSelectedClass] = useState(promotionClasses[0]);
  const [remarks, setRemarks] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<Record<string, string>>({});

  const students = useMemo(() => studentsIn(selectedClass), [selectedClass]);

  const remarkFor = (id: string) => remarks[keyOf(termId, id)] ?? "";
  const setRemark = (id: string, value: string) =>
    setRemarks((r) => ({ ...r, [keyOf(termId, id)]: value }));

  const savedCount = (className: string) =>
    studentsIn(className).filter((s) => saved[keyOf(termId, s.id)]?.trim()).length;

  const unsaved = students.some(
    (s) => (remarks[keyOf(termId, s.id)] ?? "") !== (saved[keyOf(termId, s.id)] ?? ""),
  );
  const filled = students.filter((s) => remarkFor(s.id).trim()).length;

  const fillEmpty = () => {
    setRemarks((r) => {
      const next = { ...r };
      students.forEach((s) => {
        const k = keyOf(termId, s.id);
        if (!next[k]?.trim() && s.annualAverage !== null) {
          next[k] = suggestRemark(s.annualAverage);
        }
      });
      return next;
    });
  };

  const handleSave = () => {
    // TODO: PATCH /admin/results/remarks { termId, remarks: [{ studentId, vpRemark }] }
    setSaved((s) => {
      const next = { ...s };
      students.forEach((st) => {
        const k = keyOf(termId, st.id);
        next[k] = remarks[k] ?? "";
      });
      return next;
    });
    toast.success("Remarks saved", `${selectedClass}: ${filled} of ${students.length} students.`);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <PageHeader
        title="V.P's Remarks"
        description="The remark printed on each student's report sheet."
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
            const total = studentsIn(c).length;
            const done = savedCount(c);
            return {
              key: c,
              label: c,
              detail: `${done} of ${total} remarked`,
              done: total > 0 && done === total,
            };
          })}
        />

        <section className={`${panelClass} overflow-hidden`}>
          <header className="flex flex-wrap items-end justify-between gap-3 px-5 py-4 border-b border-line">
            <div>
              <h2 className="text-xl font-bold text-ink">{selectedClass}</h2>
              <p className="text-sm text-muted mt-0.5">
                {filled} of {students.length} students have a remark
              </p>
            </div>
            <button
              onClick={fillEmpty}
              className="h-9 px-3 text-sm font-medium text-brand hover:bg-tint rounded-lg transition-colors"
            >
              Fill blanks from scores
            </button>
          </header>

          {/* Shared suggestions for every remark input */}
          <datalist id="vp-remark-options">
            {remarkBands.map((b) => (
              <option key={b.remark} value={b.remark} />
            ))}
          </datalist>

          {students.length === 0 ? (
            <p className="px-5 py-12 text-center text-sm text-muted">
              No active students in {selectedClass}.
            </p>
          ) : (
            <>
              <div className="hidden md:grid grid-cols-[220px_70px_minmax(0,1fr)] gap-4 px-5 py-2 bg-canvas border-b border-line text-xs font-medium text-muted">
                <span>Student</span>
                <span>Score</span>
                <span>Remark</span>
              </div>
              <ul className="divide-y divide-line">
                {students.map((s) => {
                  const score = s.annualAverage;
                  return (
                    <li
                      key={s.id}
                      className="grid grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[220px_70px_minmax(0,1fr)] items-center gap-x-4 gap-y-2 px-5 py-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-ink truncate">
                          {s.lastName} {s.firstName}
                        </p>
                        <p className="text-xs text-muted tabular-nums">{s.username}</p>
                      </div>
                      <span
                        className={`text-sm font-semibold tabular-nums text-right md:text-left ${
                          score === null ? "text-muted font-normal" : score < 40 ? "text-clay" : "text-ink"
                        }`}
                      >
                        {score === null ? "—" : score.toFixed(1)}
                      </span>
                      <input
                        list="vp-remark-options"
                        value={remarkFor(s.id)}
                        onChange={(e) => setRemark(s.id, e.target.value)}
                        disabled={score === null}
                        aria-label={`Remark for ${s.firstName} ${s.lastName}`}
                        placeholder={score === null ? "No result yet" : "Type or pick a remark"}
                        className="col-span-2 md:col-span-1 w-full h-9 px-3 rounded-lg border border-line focus:border-brand focus:ring-2 focus:ring-brand/15 outline-none text-sm text-ink bg-white placeholder:text-muted/60 disabled:bg-canvas disabled:cursor-not-allowed"
                      />
                    </li>
                  );
                })}
              </ul>
              <footer className="sticky bottom-0 flex items-center justify-between gap-4 px-5 py-4 border-t border-line bg-white">
                <span className="text-sm text-muted">
                  {unsaved ? "Unsaved changes" : "All changes saved"}
                </span>
                <button onClick={handleSave} disabled={!unsaved} className={primaryButton}>
                  Save {selectedClass}
                </button>
              </footer>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
