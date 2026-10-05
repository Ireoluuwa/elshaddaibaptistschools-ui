"use client";

import React, { useMemo, useState } from "react";
import { ArrowRight, Check, GraduationCap, Loader2 } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import AdminConfirm from "@/components/admin/shared/AdminConfirm";
import ClassNav from "@/components/admin/shared/ClassNav";
import PromotionRow, { RowDecision, rowGrid } from "@/components/admin/promotion/PromotionRow";
import { panelClass, primaryButton } from "@/components/admin/shared/AdminModal";
import { useDepartments } from "@/hooks/curriculum.hooks";
import {
  useClassPromotion,
  usePromotionSummary,
  useSavePromotion,
  useUndoPromotion,
} from "@/hooks/promotions.hooks";
import { apiErrorMessage } from "@/lib/api-error";
import { toast } from "@/store/toast.store";
import type { ClassPromotionProgress, PromotionStudent } from "@/types/promotions.types";

// Top class first, so each class moves into one that's already been promoted.
const topDown = (a: ClassPromotionProgress, b: ClassPromotionProgress) =>
  Number(b.className.startsWith("SS")) - Number(a.className.startsWith("SS")) ||
  b.className.localeCompare(a.className);

const suggest = (s: PromotionStudent, passMark: number, isFinal: boolean): RowDecision => ({
  outcome: s.average !== null && s.average < passMark ? "repeated" : isFinal ? "graduated" : "promoted",
});

export default function PromotionPage() {
  const { data: summary, isLoading: summaryLoading } = usePromotionSummary();
  const { data: departments = [] } = useDepartments();
  const classes = useMemo(
    () => [...(summary?.classes ?? [])].filter((c) => c.students > 0).sort(topDown),
    [summary],
  );

  const [pickedClassId, setPickedClassId] = useState<string | null>(null);
  const classId = pickedClassId ?? classes.find((c) => !c.done)?.classId ?? classes[0]?.classId ?? null;
  const progress = classes.find((c) => c.classId === classId);

  const { data: detail, isLoading } = useClassPromotion(classId);
  const savePromotion = useSavePromotion();
  const undoPromotion = useUndoPromotion();

  const [passMark, setPassMark] = useState(40);
  // Edits on top of saved/suggested decisions, per class then student.
  const [edits, setEdits] = useState<Record<string, Record<string, RowDecision>>>({});
  const [editingDone, setEditingDone] = useState<string | null>(null);
  const [confirming, setConfirming] = useState<"save" | "clear" | null>(null);

  const isFinalClass = !detail?.nextClass;
  const needsDepartment = !!detail?.needsDepartment;
  const locked = !!progress?.done && editingDone !== classId;

  // Strongest students first; students with no results go last.
  const students = useMemo(
    () => [...(detail?.students ?? [])].sort((a, b) => (b.average ?? -1) - (a.average ?? -1)),
    [detail],
  );

  const valueFor = (s: PromotionStudent): RowDecision =>
    (classId && edits[classId]?.[s.studentId]) ||
    (s.outcome ? { outcome: s.outcome, departmentId: s.nextDepartmentId ?? undefined } : suggest(s, passMark, isFinalClass));

  const setValue = (studentId: string, value: RowDecision) => {
    if (!classId) return;
    setEdits((e) => ({ ...e, [classId]: { ...e[classId], [studentId]: value } }));
  };

  const dropEdits = (id: string) =>
    setEdits((e) => Object.fromEntries(Object.entries(e).filter(([key]) => key !== id)));

  const resetToPassMark = () => {
    if (!classId) return;
    setEdits((e) => ({
      ...e,
      [classId]: Object.fromEntries(students.map((s) => [s.studentId, suggest(s, passMark, isFinalClass)])),
    }));
  };

  const counts = students.reduce(
    (acc, s) => {
      acc[valueFor(s).outcome]++;
      return acc;
    },
    { promoted: 0, graduated: 0, repeated: 0, withdrawn: 0 },
  );
  const movingUp = isFinalClass ? counts.graduated : counts.promoted;
  const missingDepartments = needsDepartment
    ? students.filter((s) => {
        const v = valueFor(s);
        return v.outcome === "promoted" && !v.departmentId;
      }).length
    : 0;

  const handleSave = async () => {
    if (!classId || !detail) return;
    try {
      await savePromotion.mutateAsync({
        classId,
        decisions: students.map((s) => {
          const v = valueFor(s);
          return {
            studentId: s.studentId,
            outcome: v.outcome,
            departmentId: v.outcome === "promoted" && needsDepartment ? v.departmentId : undefined,
          };
        }),
      });
      toast.success(
        `${detail.className} saved`,
        isFinalClass
          ? `${counts.graduated} graduating, ${counts.repeated} repeating.`
          : `${counts.promoted} moving to ${detail.nextClass?.name}, ${counts.repeated} repeating.`,
      );
      dropEdits(classId);
      setEditingDone(null);
      setConfirming(null);
      const nextPending = classes.find((c) => !c.done && c.classId !== classId);
      if (nextPending) setPickedClassId(nextPending.classId);
    } catch (err) {
      setConfirming(null);
      toast.error("Couldn't save promotion", apiErrorMessage(err));
    }
  };

  const handleClear = async () => {
    if (!classId) return;
    try {
      await undoPromotion.mutateAsync(classId);
      dropEdits(classId);
      setEditingDone(null);
      toast.info("Decisions cleared", `${detail?.className} can be decided again.`);
    } catch (err) {
      toast.error("Couldn't clear decisions", apiErrorMessage(err));
    }
    setConfirming(null);
  };

  const doneCount = classes.filter((c) => c.done).length;

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <PageHeader
        title="Promotion"
        description={`Decide where each student goes after ${summary?.session.name ?? "this session"}. Students move when the next session starts.`}
        action={
          <div className="flex flex-col gap-1.5 sm:items-end">
            <span className="text-sm text-muted">
              <span className="font-semibold text-ink tabular-nums">{doneCount}</span> of {classes.length} classes done
            </span>
            <div className="flex gap-1">
              {classes.map((c) => (
                <span key={c.classId} className={`h-1.5 w-6 rounded-full ${c.done ? "bg-brand" : "bg-line"}`} />
              ))}
            </div>
          </div>
        }
      />

      {summaryLoading ? (
        <div className={`${panelClass} h-40 animate-pulse`} />
      ) : classes.length === 0 ? (
        <div className={`${panelClass} px-5 py-12 text-center text-sm text-muted`}>No students to promote this session.</div>
      ) : (
        <div className="grid lg:grid-cols-[220px_minmax(0,1fr)] gap-6 items-start">
          <ClassNav
            hint="Work from the top class down"
            selected={classId ?? ""}
            onSelect={(id) => {
              setPickedClassId(id);
              setEditingDone(null);
            }}
            items={classes.map((c) => ({
              key: c.classId,
              label: c.className,
              to: c.nextClass?.name ?? null,
              detail: `${c.students} student${c.students === 1 ? "" : "s"}`,
              done: c.done,
            }))}
          />

          <section className={`${panelClass} overflow-hidden`}>
            <header className="flex flex-wrap items-end justify-between gap-4 px-5 py-4 border-b border-line">
              <div>
                <h2 className="flex items-center gap-2.5 text-xl font-bold text-ink">
                  {progress?.className}
                  <ArrowRight size={20} className="text-muted/70" />
                  {detail?.nextClass?.name ?? (
                    <span className="inline-flex items-center gap-1.5 text-brand">
                      <GraduationCap size={22} /> Graduated
                    </span>
                  )}
                </h2>
                <p className="text-sm text-muted mt-0.5">
                  {students.length} students
                  {needsDepartment && ` · choose a department for each student moving to ${detail?.nextClass?.name}`}
                </p>
              </div>
              {locked ? (
                <div className="flex items-center gap-3 text-sm">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-brand">
                    <Check size={16} /> Saved
                  </span>
                  <button onClick={() => setEditingDone(classId)} className="text-muted hover:text-ink underline underline-offset-2">
                    Edit decisions
                  </button>
                  <button onClick={() => setConfirming("clear")} className="text-danger hover:underline underline-offset-2">
                    Clear
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm">
                  <label htmlFor="pass-mark" className="text-muted">
                    Pass mark
                  </label>
                  <div className="flex items-center h-9 rounded-lg border border-line focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/15 bg-white overflow-hidden transition-colors">
                    <input
                      id="pass-mark"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={100}
                      value={passMark}
                      onChange={(e) => setPassMark(Math.min(100, Math.max(0, Math.round(Number(e.target.value) || 0))))}
                      className="w-14 h-full pl-3 pr-1 text-right outline-none bg-transparent tabular-nums text-ink font-semibold [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <span className="pr-3 text-sm text-muted select-none">%</span>
                  </div>
                  <button onClick={resetToPassMark} className="h-9 px-3 text-sm font-medium text-brand hover:bg-tint rounded-lg transition-colors">
                    Apply pass mark
                  </button>
                </div>
              )}
            </header>

            {isLoading ? (
              <div className="p-5 flex flex-col gap-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-10 rounded-lg bg-canvas animate-pulse" />
                ))}
              </div>
            ) : (
              <>
                <div className={`${rowGrid} hidden sm:grid px-5 py-2 bg-canvas border-b border-line text-xs font-medium text-muted`}>
                  <span>Student</span>
                  <span>Session average</span>
                  <span className="text-right">Next session</span>
                </div>
                <ul className="divide-y divide-line">
                  {students.map((s) => (
                    <PromotionRow
                      key={s.studentId}
                      student={s}
                      value={valueFor(s)}
                      onChange={(v) => setValue(s.studentId, v)}
                      passMark={passMark}
                      isFinalClass={isFinalClass}
                      needsDepartment={needsDepartment}
                      departments={departments}
                      locked={locked}
                    />
                  ))}
                </ul>
              </>
            )}

            {!locked && students.length > 0 && (
              <footer className="sticky bottom-0 flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-t border-line bg-white">
                <p className="text-sm text-muted">
                  <span className="font-semibold text-brand tabular-nums">{movingUp}</span>{" "}
                  {isFinalClass ? "graduating" : `to ${detail?.nextClass?.name}`}
                  <span className="mx-2 text-line">|</span>
                  <span className="font-semibold text-clay tabular-nums">{counts.repeated}</span> repeating
                  <span className="mx-2 text-line">|</span>
                  <span className="font-semibold text-ink tabular-nums">{counts.withdrawn}</span> withdrawn
                  {missingDepartments > 0 && (
                    <span className="block sm:inline sm:ml-3 text-clay">{missingDepartments} still need a department</span>
                  )}
                </p>
                <button
                  onClick={() => setConfirming("save")}
                  disabled={missingDepartments > 0 || savePromotion.isPending}
                  className={primaryButton}
                >
                  {savePromotion.isPending && <Loader2 size={16} className="animate-spin" />}
                  Save {progress?.className}
                </button>
              </footer>
            )}
          </section>
        </div>
      )}

      <AdminConfirm
        isOpen={confirming === "save"}
        onClose={() => setConfirming(null)}
        onConfirm={handleSave}
        isPending={savePromotion.isPending}
        title={`Save ${progress?.className} promotion?`}
        confirmText="Save"
        message={
          <>
            {isFinalClass
              ? `${counts.graduated} students will graduate`
              : `${counts.promoted} students will move to ${detail?.nextClass?.name}`}
            , {counts.repeated} will repeat {progress?.className} and {counts.withdrawn} will be withdrawn.
            <br />
            Nobody moves until the next session starts, and you can still change these until then.
          </>
        }
      />

      <AdminConfirm
        isOpen={confirming === "clear"}
        danger
        onClose={() => setConfirming(null)}
        onConfirm={handleClear}
        isPending={undoPromotion.isPending}
        title={`Clear ${progress?.className}'s decisions?`}
        confirmText="Clear decisions"
        message="Every student in this class goes back to undecided. Undecided students stay in their class when the next session starts."
      />
    </div>
  );
}
