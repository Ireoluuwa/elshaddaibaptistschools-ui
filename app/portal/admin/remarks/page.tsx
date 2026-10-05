"use client";

import React, { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import ClassNav from "@/components/admin/shared/ClassNav";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import RemarkReviewModal, { overallOf } from "@/components/admin/remarks/RemarkReviewModal";
import { panelClass } from "@/components/admin/shared/AdminModal";
import { useSessions } from "@/hooks/sessions.hooks";
import { useClasses } from "@/hooks/curriculum.hooks";
import { useClassResults, useResultsOverview, useSetVpRemark } from "@/hooks/admin-results.hooks";
import { apiErrorMessage } from "@/lib/api-error";
import { toast } from "@/store/toast.store";
import type { ClassResultRow, StudentTermResult } from "@/types/admin-results.types";

type ReviewableRow = ClassResultRow & { result: StudentTermResult };

// JSS classes before SS, then by name.
const classOrder = (a: { name: string }, b: { name: string }) =>
  Number(a.name.startsWith("SS")) - Number(b.name.startsWith("SS")) || a.name.localeCompare(b.name);

const rowGrid =
  "grid grid-cols-[minmax(0,1fr)_auto_16px] md:grid-cols-[220px_80px_minmax(0,1fr)_16px] items-center gap-x-4 gap-y-1";

export default function RemarksPage() {
  const { data: sessions = [] } = useSessions();
  const { data: rawClasses = [] } = useClasses();
  const classes = useMemo(() => [...rawClasses].sort(classOrder), [rawClasses]);

  const terms = useMemo(
    () => sessions.flatMap((s) => s.terms.map((t) => ({ ...t, label: `${s.name} · ${t.name}` }))),
    [sessions],
  );
  const [pickedTermId, setPickedTermId] = useState<string | null>(null);
  const termId = pickedTermId ?? terms.find((t) => t.status === "active")?.id ?? terms[0]?.id ?? null;
  const termLabel = terms.find((t) => t.id === termId)?.label ?? "";

  const [pickedClassId, setPickedClassId] = useState<string | null>(null);
  const classId = pickedClassId ?? classes[0]?.id ?? null;
  const currentClass = classes.find((c) => c.id === classId);

  const { data: overview = [] } = useResultsOverview(termId);
  const { data: rows = [], isLoading, isError, refetch } = useClassResults(termId, classId);
  const setVpRemark = useSetVpRemark(termId ?? "", classId ?? "");

  const reviewable = rows.filter((r): r is ReviewableRow => !!r.result);
  const remarked = reviewable.filter((r) => r.result.vpRemark).length;

  const [openId, setOpenId] = useState<string | null>(null);
  const openIndex = reviewable.findIndex((r) => r.studentId === openId);
  const open = openIndex >= 0 ? reviewable[openIndex] : null;

  const handleSave = async (remark: string, goNext: boolean) => {
    if (!open) return;
    try {
      await setVpRemark.mutateAsync({ resultId: open.result.id, vpRemark: remark.trim() });
      if (goNext && openIndex < reviewable.length - 1) {
        setOpenId(reviewable[openIndex + 1].studentId);
      } else {
        setOpenId(null);
        toast.success("Remark saved", `${open.firstName} ${open.lastName}`);
      }
    } catch (err) {
      toast.error("Couldn't save remark", apiErrorMessage(err));
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <PageHeader
        title="V.P's Remarks"
        description="Review each student's result and write the remark printed on their report sheet."
        action={
          <select
            value={termId ?? ""}
            onChange={(e) => setPickedTermId(e.target.value)}
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
          selected={classId ?? ""}
          onSelect={(id) => {
            setPickedClassId(id);
            setOpenId(null);
          }}
          items={classes.map((c) => {
            const progress = overview.find((o) => o.classId === c.id);
            return {
              key: c.id,
              label: c.name,
              detail: progress?.entered ? `${progress.entered} result${progress.entered === 1 ? "" : "s"}` : "No results yet",
              done: false,
            };
          })}
        />

        <section className={`${panelClass} overflow-hidden`}>
          <header className="flex flex-wrap items-end justify-between gap-3 px-5 py-4 border-b border-line">
            <div>
              <h2 className="text-xl font-bold text-ink">{currentClass?.name ?? "—"}</h2>
              <p className="text-sm text-muted mt-0.5">
                {reviewable.length === 0
                  ? "No results entered yet"
                  : `${remarked} of ${reviewable.length} students remarked`}
              </p>
            </div>
            {reviewable.length > remarked && (
              <button
                onClick={() => setOpenId((reviewable.find((r) => !r.result.vpRemark) ?? reviewable[0]).studentId)}
                className="h-9 px-3 text-sm font-semibold text-white bg-brand hover:bg-brand-dark rounded-lg transition-colors"
              >
                {remarked === 0 ? "Start reviewing" : "Continue reviewing"}
              </button>
            )}
          </header>

          {isLoading ? (
            <div className="p-5 flex flex-col gap-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 rounded-lg bg-canvas animate-pulse" />
              ))}
            </div>
          ) : isError ? (
            <p className="px-5 py-12 text-center text-sm text-muted">
              Couldn&apos;t load results.{" "}
              <button onClick={() => refetch()} className="font-semibold text-brand hover:underline">
                Try again
              </button>
            </p>
          ) : rows.length === 0 ? (
            <p className="px-5 py-12 text-center text-sm text-muted">No students in {currentClass?.name} this term.</p>
          ) : (
            <>
              <div className={`${rowGrid} hidden md:grid px-5 py-2 bg-canvas border-b border-line text-xs font-medium text-muted`}>
                <span>Student</span>
                <span>Overall</span>
                <span>V.P&apos;s remark</span>
                <span />
              </div>
              <ul className="divide-y divide-line">
                {rows.map((row) => {
                  const { result } = row;
                  const overall = result ? overallOf(result) : null;
                  return (
                    <li key={row.studentId}>
                      <button
                        onClick={() => setOpenId(row.studentId)}
                        disabled={!result}
                        className={`${rowGrid} w-full px-5 py-3 text-left hover:bg-canvas transition-colors group disabled:hover:bg-transparent disabled:cursor-default`}
                      >
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-ink truncate">
                            {row.lastName} {row.firstName}
                          </span>
                          <span className="block text-xs text-muted tabular-nums">
                            {row.username}
                            {result?.status === "DRAFT" && <span className="text-clay"> · draft</span>}
                          </span>
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
                          ) : result.vpRemark ? (
                            <span className="text-ink">{result.vpRemark}</span>
                          ) : (
                            <StatusBadge tone="clay">No remark yet</StatusBadge>
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

      {open && (
        <RemarkReviewModal
          key={open.studentId}
          row={open}
          className={currentClass?.name ?? ""}
          termLabel={termLabel}
          position={openIndex + 1}
          total={reviewable.length}
          isSaving={setVpRemark.isPending}
          onClose={() => setOpenId(null)}
          onPrev={openIndex > 0 ? () => setOpenId(reviewable[openIndex - 1].studentId) : undefined}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
