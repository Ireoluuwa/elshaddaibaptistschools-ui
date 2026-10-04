"use client";

import React, { useMemo, useState } from "react";
import { Check } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import AdminConfirm from "@/components/admin/shared/AdminConfirm";
import ClassNav from "@/components/admin/shared/ClassNav";
import PromotionRow, { RowDecision, rowGrid } from "@/components/admin/promotion/PromotionRow";
import { panelClass, primaryButton } from "@/components/admin/shared/AdminModal";
import {
  mockSessions,
  mockStudents,
  nextClass,
  promotionClasses,
} from "@/constants/admin/mock.constants";
import { toast } from "@/store/toast.store";

// Promote from the top class down so each class moves into an already-emptied one.
const classOrder = [...promotionClasses].reverse();

const suggest = (avg: number | null, passMark: number, isFinal: boolean): RowDecision => ({
  decision: avg !== null && avg < passMark ? "repeat" : isFinal ? "graduate" : "promote",
});

const activeCount = (className: string) =>
  mockStudents.filter((s) => s.className === className && s.status === "active").length;

export default function PromotionPage() {
  const session = mockSessions.find((s) => s.isCurrent);
  const [selectedClass, setSelectedClass] = useState(classOrder[0]);
  const [passMark, setPassMark] = useState(40);
  const [decisions, setDecisions] = useState<Record<string, RowDecision>>({});
  const [completed, setCompleted] = useState<string[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const target = nextClass[selectedClass];
  const isFinalClass = target === null;
  const needsDepartment = selectedClass === "JSS3";
  const isDone = completed.includes(selectedClass);

  // Strongest students first; students with no result go last.
  const students = useMemo(
    () =>
      mockStudents
        .filter((s) => s.className === selectedClass && s.status === "active")
        .sort((a, b) => (b.annualAverage ?? -1) - (a.annualAverage ?? -1)),
    [selectedClass],
  );

  const valueFor = (id: string, avg: number | null) =>
    decisions[id] ?? suggest(avg, passMark, isFinalClass);

  const resetToPassMark = () => {
    setDecisions((prev) => {
      const next = { ...prev };
      students.forEach((s) => delete next[s.id]);
      return next;
    });
  };

  const counts = students.reduce(
    (acc, s) => {
      acc[valueFor(s.id, s.annualAverage).decision]++;
      return acc;
    },
    { promote: 0, graduate: 0, repeat: 0, withdraw: 0 },
  );
  const movingUp = isFinalClass ? counts.graduate : counts.promote;

  const missingDepartments = needsDepartment
    ? students.filter((s) => {
        const v = valueFor(s.id, s.annualAverage);
        return v.decision === "promote" && !v.department;
      }).length
    : 0;

  const handleConfirm = () => {
    // TODO: POST /admin/promotions { classId, decisions }
    const nowCompleted = [...completed, selectedClass];
    setCompleted(nowCompleted);
    setConfirmOpen(false);
    toast.success(
      `${selectedClass} saved`,
      isFinalClass
        ? `${counts.graduate} graduating, ${counts.repeat} repeating.`
        : `${counts.promote} moving to ${target}, ${counts.repeat} repeating.`,
    );
    const nextPending = classOrder.find((c) => !nowCompleted.includes(c));
    if (nextPending) setSelectedClass(nextPending);
  };

  const handleUndo = () => {
    setCompleted((c) => c.filter((x) => x !== selectedClass));
    toast.info("Reopened", `${selectedClass} can be edited again.`);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <PageHeader
        title="Promotion"
        description={`Decide where each student goes after ${session?.name ?? "this session"}. Changes take effect when the new session starts.`}
        action={
          <div className="flex flex-col gap-1.5 sm:items-end">
            <span className="text-sm text-muted">
              <span className="font-semibold text-ink tabular-nums">{completed.length}</span> of{" "}
              {classOrder.length} classes done
            </span>
            <div className="flex gap-1">
              {classOrder.map((c) => (
                <span
                  key={c}
                  className={`h-1.5 w-6 rounded-full ${completed.includes(c) ? "bg-brand" : "bg-line"}`}
                />
              ))}
            </div>
          </div>
        }
      />

      <div className="grid lg:grid-cols-[220px_minmax(0,1fr)] gap-6 items-start">
        <ClassNav
          hint="Work from the top class down"
          selected={selectedClass}
          onSelect={setSelectedClass}
          items={classOrder.map((c) => ({
            key: c,
            label: (
              <>
                {c} <span className="font-normal text-muted">→ {nextClass[c] ?? "Graduate"}</span>
              </>
            ),
            detail: `${activeCount(c)} students`,
            done: completed.includes(c),
          }))}
        />

        {/* Promotion sheet */}
        <section className={`${panelClass} overflow-hidden`}>
          <header className="flex flex-wrap items-end justify-between gap-4 px-5 py-4 border-b border-line">
            <div>
              <h2 className="text-xl font-bold text-ink">
                {selectedClass} <span className="text-muted font-normal">→</span>{" "}
                {target ?? "Graduated"}
              </h2>
              <p className="text-sm text-muted mt-0.5">
                {students.length} students{needsDepartment && " · choose a department for each student promoted to SS1"}
              </p>
            </div>
            {isDone ? (
              <div className="flex items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-1.5 font-semibold text-brand">
                  <Check size={16} /> Saved
                </span>
                <button onClick={handleUndo} className="text-muted hover:text-ink underline underline-offset-2">
                  Edit again
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm">
                <label htmlFor="pass-mark" className="text-muted">
                  Pass mark
                </label>
                <div className="relative">
                  <input
                    id="pass-mark"
                    type="number"
                    min={0}
                    max={100}
                    value={passMark}
                    onChange={(e) => setPassMark(Number(e.target.value))}
                    className="w-16 h-9 pl-3 pr-6 rounded-lg border border-line focus:border-brand outline-none bg-white tabular-nums text-ink"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted">%</span>
                </div>
                <button
                  onClick={resetToPassMark}
                  className="h-9 px-3 text-sm font-medium text-brand hover:bg-tint rounded-lg transition-colors"
                >
                  Reset choices
                </button>
              </div>
            )}
          </header>

          {students.length === 0 ? (
            <p className="px-5 py-12 text-center text-sm text-muted">
              No active students in {selectedClass}.
            </p>
          ) : (
            <>
              <div className={`${rowGrid} hidden sm:grid px-5 py-2 bg-canvas border-b border-line text-xs font-medium text-muted`}>
                <span>Student</span>
                <span>Average</span>
                <span className="text-right">Next session</span>
              </div>
              <ul className="divide-y divide-line">
                {students.map((s) => (
                  <PromotionRow
                    key={s.id}
                    student={s}
                    value={valueFor(s.id, s.annualAverage)}
                    onChange={(v) => setDecisions((d) => ({ ...d, [s.id]: v }))}
                    passMark={passMark}
                    isFinalClass={isFinalClass}
                    needsDepartment={needsDepartment}
                    locked={isDone}
                  />
                ))}
              </ul>
            </>
          )}

          {!isDone && students.length > 0 && (
            <footer className="sticky bottom-0 flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-t border-line bg-white">
              <p className="text-sm text-muted">
                <span className="font-semibold text-brand tabular-nums">{movingUp}</span>{" "}
                {isFinalClass ? "graduating" : `to ${target}`}
                <span className="mx-2 text-line">|</span>
                <span className="font-semibold text-clay tabular-nums">{counts.repeat}</span> repeating
                <span className="mx-2 text-line">|</span>
                <span className="font-semibold text-ink tabular-nums">{counts.withdraw}</span> withdrawn
                {missingDepartments > 0 && (
                  <span className="block sm:inline sm:ml-3 text-clay">
                    {missingDepartments} still need a department
                  </span>
                )}
              </p>
              <button
                onClick={() => setConfirmOpen(true)}
                disabled={missingDepartments > 0}
                className={primaryButton}
              >
                Save {selectedClass}
              </button>
            </footer>
          )}
        </section>
      </div>

      <AdminConfirm
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
        title={`Save ${selectedClass} promotion?`}
        confirmText="Save"
        message={
          <>
            {isFinalClass
              ? `${counts.graduate} students will graduate`
              : `${counts.promote} students will move to ${target}`}
            , {counts.repeat} will repeat {selectedClass} and {counts.withdraw} will be withdrawn.
            <br />
            Nothing changes for teachers or students until the new session starts.
          </>
        }
      />
    </div>
  );
}
