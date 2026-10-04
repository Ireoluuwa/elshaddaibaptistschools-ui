"use client";

import React, { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, RotateCcw, Wand2 } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import ConfirmModal from "@/components/shared/ConfirmModal";
import PromotionRow, { RowDecision } from "@/components/admin/promotion/PromotionRow";
import { primaryButton } from "@/components/admin/shared/AdminModal";
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

  const students = useMemo(
    () => mockStudents.filter((s) => s.className === selectedClass && s.status === "active"),
    [selectedClass],
  );

  const valueFor = (id: string, avg: number | null) =>
    decisions[id] ?? suggest(avg, passMark, isFinalClass);

  const applyRule = () => {
    setDecisions((prev) => {
      const next = { ...prev };
      students.forEach((s) => {
        next[s.id] = { ...prev[s.id], ...suggest(s.annualAverage, passMark, isFinalClass) };
      });
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

  const missingDepartments = needsDepartment
    ? students.filter((s) => {
        const v = valueFor(s.id, s.annualAverage);
        return v.decision === "promote" && !v.department;
      }).length
    : 0;

  const handleConfirm = () => {
    // TODO: POST /admin/promotions { classId, decisions }
    setCompleted((c) => [...c, selectedClass]);
    setConfirmOpen(false);
    toast.success(
      `${selectedClass} done`,
      isFinalClass
        ? `${counts.graduate} graduated, ${counts.repeat} repeating.`
        : `${counts.promote} moved to ${target}, ${counts.repeat} repeating.`,
    );
    const nextPending = classOrder.find((c) => c !== selectedClass && !completed.includes(c));
    if (nextPending) setSelectedClass(nextPending);
  };

  const handleUndo = () => {
    setCompleted((c) => c.filter((x) => x !== selectedClass));
    toast.info("Promotion undone", `${selectedClass} is editable again.`);
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8">
      <PageHeader
        title="Promotion"
        description={`Move students into their next class at the end of ${session?.name ?? "the session"}.`}
        action={
          <div className="inline-flex flex-col px-4 py-2 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100/50 self-start">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
              Progress
            </span>
            <span className="text-sm font-semibold">
              {completed.length} of {classOrder.length} classes done
            </span>
          </div>
        }
      />

      {/* Class picker */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {classOrder.map((c) => {
            const done = completed.includes(c);
            const active = c === selectedClass;
            return (
              <button
                key={c}
                onClick={() => setSelectedClass(c)}
                className={`h-9 px-4 inline-flex items-center gap-1.5 rounded-full text-sm font-semibold border transition-all ${
                  active
                    ? "bg-secondary text-white border-secondary"
                    : done
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                      : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                }`}
              >
                {done && <CheckCircle2 size={14} />}
                {c}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-gray-400">
          Start from SS3 and work down, so every class moves into one that&apos;s already been promoted.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Card header */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3 text-secondary">
            <span className="text-lg font-black">{selectedClass}</span>
            <ArrowRight size={18} className="text-gray-300" />
            <span className="text-lg font-black">{target ?? "Graduated"}</span>
          </div>
          {!isDone && (
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-gray-500">Pass mark</label>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={passMark}
                  onChange={(e) => setPassMark(Number(e.target.value))}
                  className="w-20 h-9 pl-3 pr-6 rounded-lg border border-gray-200 focus:border-[#006442] outline-none bg-white"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">%</span>
              </div>
              <button
                onClick={applyRule}
                className="h-9 px-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-all"
              >
                <Wand2 size={14} /> Apply
              </button>
            </div>
          )}
        </div>

        {isDone && (
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 bg-emerald-50 border-b border-emerald-100 text-sm text-emerald-800">
            <span className="inline-flex items-center gap-2 font-medium">
              <CheckCircle2 size={16} /> This class has been promoted.
            </span>
            <button
              onClick={handleUndo}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-900"
            >
              <RotateCcw size={14} /> Undo
            </button>
          </div>
        )}

        {/* Students */}
        {students.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-gray-400">
            No active students in {selectedClass}.
          </p>
        ) : (
          <ul className="divide-y divide-gray-100">
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
        )}

        {/* Summary footer */}
        {!isDone && students.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <span className="text-emerald-700 font-semibold">
                {isFinalClass ? `${counts.graduate} graduate` : `${counts.promote} promote`}
              </span>
              <span className="text-amber-600 font-semibold">{counts.repeat} repeat</span>
              <span className="text-gray-500 font-semibold">{counts.withdraw} withdraw</span>
              {missingDepartments > 0 && (
                <span className="text-amber-600">
                  • {missingDepartments} need a department
                </span>
              )}
            </div>
            <button
              onClick={() => setConfirmOpen(true)}
              disabled={missingDepartments > 0}
              className={primaryButton}
            >
              Confirm {selectedClass}
            </button>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
        variant="warning"
        title={`Confirm ${selectedClass} promotion?`}
        message={
          isFinalClass
            ? `${counts.graduate} students will graduate, ${counts.repeat} will repeat ${selectedClass} and ${counts.withdraw} will be withdrawn.`
            : `${counts.promote} students will move to ${target}, ${counts.repeat} will repeat ${selectedClass} and ${counts.withdraw} will be withdrawn.`
        }
        confirmText="Confirm"
      />
    </div>
  );
}
