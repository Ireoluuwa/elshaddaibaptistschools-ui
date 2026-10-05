"use client";

import React, { useMemo, useState } from "react";
import { Loader2, Lock, Search, Unlock } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import ClassNav from "@/components/admin/shared/ClassNav";
import MoneyInput from "@/components/bursar/MoneyInput";
import { panelClass, primaryButton } from "@/components/admin/shared/AdminModal";
import { useBursaryOverview, useBursaryTerms, useClassFees, useSaveFees } from "@/hooks/bursary.hooks";
import { apiErrorMessage } from "@/lib/api-error";
import { naira } from "@/lib/money";
import { toast } from "@/store/toast.store";

const classOrder = (a: { className: string }, b: { className: string }) =>
  Number(a.className.startsWith("SS")) - Number(b.className.startsWith("SS")) || a.className.localeCompare(b.className);

const rowGrid =
  "grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,1fr)_170px_130px_70px] items-center gap-x-4 gap-y-2";

export default function StudentFeesPage() {
  const { data: terms = [] } = useBursaryTerms();
  const [pickedTermId, setPickedTermId] = useState<string | undefined>(undefined);
  const { data: overview } = useBursaryOverview(pickedTermId);
  const termId = overview?.term.id;
  const classes = useMemo(
    () => [...(overview?.classes ?? [])].filter((c) => c.students > 0).sort(classOrder),
    [overview],
  );

  const [pickedClassId, setPickedClassId] = useState<string | null>(null);
  const classId = pickedClassId ?? classes[0]?.classId ?? null;
  const currentClass = classes.find((c) => c.classId === classId);
  const { data, isLoading, isError, refetch } = useClassFees(classId, termId);
  const saveFees = useSaveFees();

  // Unsaved amounts by student.
  const [edits, setEdits] = useState<Record<string, number>>({});
  const [search, setSearch] = useState("");
  const [owingOnly, setOwingOnly] = useState(false);

  const students = data?.students ?? [];
  const amountOf = (id: string, saved: number) => edits[id] ?? saved;
  const changed = students.filter((s) => edits[s.studentId] !== undefined && edits[s.studentId] !== s.outstanding);
  const owing = students.filter((s) => amountOf(s.studentId, s.outstanding) > 0);
  const classOutstanding = owing.reduce((sum, s) => sum + amountOf(s.studentId, s.outstanding), 0);

  const q = search.toLowerCase();
  const visible = students.filter(
    (s) =>
      (!owingOnly || amountOf(s.studentId, s.outstanding) > 0) &&
      `${s.firstName} ${s.lastName} ${s.username}`.toLowerCase().includes(q),
  );

  const handleSave = async () => {
    if (!termId || !changed.length) return;
    try {
      await saveFees.mutateAsync({
        termId,
        fees: changed.map((s) => ({ studentId: s.studentId, outstanding: edits[s.studentId] })),
      });
      const onHold = changed.filter((s) => edits[s.studentId] > 0).length;
      setEdits({});
      toast.success(`${currentClass?.className} fees saved`, `${changed.length} updated · ${onHold} with results on hold`);
    } catch (err) {
      toast.error("Couldn't save fees", apiErrorMessage(err));
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <PageHeader
        title="Student Fees"
        description={`Outstanding balances${overview ? ` for ${overview.term.label}` : ""}. Students who owe can't see their result until it's cleared.`}
        action={
          <select
            value={pickedTermId ?? termId ?? ""}
            onChange={(e) => {
              setPickedTermId(e.target.value);
              setEdits({});
            }}
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
            if (changed.length && !confirm("You have unsaved changes in this class. Leave without saving?")) return;
            setPickedClassId(id);
            setEdits({});
          }}
          items={classes.map((c) => ({
            key: c.classId,
            label: c.className,
            detail: c.owing ? `${c.owing} owing` : "All cleared",
            done: c.owing === 0,
          }))}
        />

        <section className={`${panelClass} overflow-hidden`}>
          <header className="flex flex-wrap items-end justify-between gap-3 px-5 py-4 border-b border-line">
            <div>
              <h2 className="text-xl font-bold text-ink">{currentClass?.className ?? "—"}</h2>
              <p className="text-sm text-muted mt-0.5">
                {owing.length === 0 ? (
                  <span className="text-brand font-medium">Everyone has paid</span>
                ) : (
                  <>
                    <span className="font-semibold text-clay tabular-nums">{owing.length}</span> of {students.length} owing ·{" "}
                    <span className="font-semibold text-ink tabular-nums">{naira(classOutstanding)}</span> outstanding
                  </>
                )}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                  aria-label="Search students"
                  className="h-9 w-40 pl-8 pr-3 rounded-lg border border-line focus:border-brand outline-none text-sm text-ink bg-white"
                />
              </div>
              <label className="inline-flex items-center gap-2 text-sm text-ink cursor-pointer select-none">
                <input type="checkbox" checked={owingOnly} onChange={(e) => setOwingOnly(e.target.checked)} className="w-4 h-4 accent-brand" />
                Owing only
              </label>
            </div>
          </header>

          <div className={`${rowGrid} hidden sm:grid px-5 py-2 bg-canvas border-b border-line text-xs font-medium text-muted`}>
            <span>Student</span>
            <span>Outstanding</span>
            <span>Result</span>
            <span />
          </div>

          {isLoading ? (
            <div className="p-5 flex flex-col gap-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 rounded-lg bg-canvas animate-pulse" />
              ))}
            </div>
          ) : isError ? (
            <p className="px-5 py-12 text-center text-sm text-muted">
              Couldn&apos;t load fees.{" "}
              <button onClick={() => refetch()} className="font-semibold text-brand hover:underline">
                Try again
              </button>
            </p>
          ) : visible.length === 0 ? (
            <p className="px-5 py-12 text-center text-sm text-muted">
              {owingOnly ? "Nobody in this class owes fees." : "No students match."}
            </p>
          ) : (
            <ul className="divide-y divide-line">
              {visible.map((s) => {
                const amount = amountOf(s.studentId, s.outstanding);
                const isOwing = amount > 0;
                const edited = edits[s.studentId] !== undefined && edits[s.studentId] !== s.outstanding;
                return (
                  <li key={s.studentId} className={`${rowGrid} px-5 py-3 ${edited ? "bg-tint/50" : ""}`}>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-ink truncate">
                        {s.lastName} {s.firstName}
                      </p>
                      <p className="text-xs text-muted tabular-nums">
                        {s.username}
                        {s.department && ` · ${s.department}`}
                      </p>
                    </div>

                    <div className="row-start-2 sm:row-start-auto">
                      <MoneyInput
                        size="sm"
                        label={`Outstanding for ${s.firstName} ${s.lastName}`}
                        value={amount}
                        onChange={(v) => setEdits((e) => ({ ...e, [s.studentId]: v }))}
                        highlight={isOwing}
                      />
                    </div>

                    <span
                      className={`col-start-2 row-start-1 sm:col-start-auto sm:row-start-auto justify-self-end sm:justify-self-start inline-flex items-center gap-1.5 text-xs font-medium ${
                        isOwing ? "text-clay" : "text-brand"
                      }`}
                    >
                      {isOwing ? <Lock size={13} /> : <Unlock size={13} />}
                      {isOwing ? "On hold" : "Can view"}
                    </span>

                    <div className="row-start-2 col-start-2 sm:row-start-auto sm:col-start-auto justify-self-end">
                      {isOwing && (
                        <button
                          onClick={() => setEdits((e) => ({ ...e, [s.studentId]: 0 }))}
                          className="text-sm font-medium text-brand hover:underline underline-offset-2"
                        >
                          Cleared
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          <footer className="sticky bottom-0 flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-t border-line bg-white">
            <span className="text-sm text-muted">
              {changed.length === 0 ? "All changes saved" : `${changed.length} unsaved change${changed.length === 1 ? "" : "s"}`}
            </span>
            <button onClick={handleSave} disabled={changed.length === 0 || saveFees.isPending} className={primaryButton}>
              {saveFees.isPending && <Loader2 size={16} className="animate-spin" />}
              Save {currentClass?.className}
            </button>
          </footer>
        </section>
      </div>
    </div>
  );
}
