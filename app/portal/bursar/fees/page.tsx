"use client";

import React, { useMemo, useState } from "react";
import { Lock, Search, Unlock } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import ClassNav from "@/components/admin/shared/ClassNav";
import MoneyInput from "@/components/bursar/MoneyInput";
import { panelClass, primaryButton } from "@/components/admin/shared/AdminModal";
import { mockStudents, promotionClasses } from "@/constants/admin/mock.constants";
import { currentTermLabel, mockStudentFees, naira } from "@/constants/bursar/mock.constants";
import { toast } from "@/store/toast.store";

const initialFees = Object.fromEntries(mockStudentFees.map((f) => [f.studentId, f.outstanding]));

const activeIn = (className: string) =>
  mockStudents.filter((s) => s.className === className && s.status === "active");

const rowGrid =
  "grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,1fr)_170px_130px_70px] items-center gap-x-4 gap-y-2";

export default function StudentFeesPage() {
  const [selectedClass, setSelectedClass] = useState(promotionClasses[0]);
  const [fees, setFees] = useState<Record<string, number>>(initialFees);
  const [saved, setSaved] = useState<Record<string, number>>(initialFees);
  const [search, setSearch] = useState("");
  const [owingOnly, setOwingOnly] = useState(false);

  const students = useMemo(() => activeIn(selectedClass), [selectedClass]);
  const q = search.toLowerCase();
  const visible = students.filter(
    (s) =>
      (!owingOnly || (fees[s.id] ?? 0) > 0) &&
      `${s.firstName} ${s.lastName} ${s.username}`.toLowerCase().includes(q),
  );

  const owingIn = (className: string, source: Record<string, number>) =>
    activeIn(className).filter((s) => (source[s.id] ?? 0) > 0);
  const owing = owingIn(selectedClass, fees);
  const classOutstanding = owing.reduce((sum, s) => sum + fees[s.id], 0);
  const changed = students.filter((s) => (fees[s.id] ?? 0) !== (saved[s.id] ?? 0));

  const setFee = (id: string, value: number) => setFees((f) => ({ ...f, [id]: value }));

  const handleSave = () => {
    // TODO: PATCH /bursary/fees { termId, fees: [{ studentId, outstanding }] }
    setSaved((s) => {
      const next = { ...s };
      changed.forEach((st) => (next[st.id] = fees[st.id] ?? 0));
      return next;
    });
    const nowOwing = changed.filter((s) => (fees[s.id] ?? 0) > 0).length;
    toast.success(
      `${selectedClass} fees saved`,
      `${changed.length} updated · ${nowOwing} with results on hold`,
    );
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <PageHeader
        title="Student Fees"
        description={`Outstanding balances for ${currentTermLabel}. Students who owe can't see their result until it's cleared.`}
      />

      <div className="grid lg:grid-cols-[220px_minmax(0,1fr)] gap-6 items-start">
        <ClassNav
          selected={selectedClass}
          onSelect={setSelectedClass}
          items={promotionClasses.map((c) => {
            const count = owingIn(c, saved).length;
            return {
              key: c,
              label: c,
              detail: count ? `${count} owing` : "All cleared",
              done: count === 0,
            };
          })}
        />

        <section className={`${panelClass} overflow-hidden`}>
          <header className="flex flex-wrap items-end justify-between gap-3 px-5 py-4 border-b border-line">
            <div>
              <h2 className="text-xl font-bold text-ink">{selectedClass}</h2>
              <p className="text-sm text-muted mt-0.5">
                {owing.length === 0 ? (
                  <span className="text-brand font-medium">Everyone has paid</span>
                ) : (
                  <>
                    <span className="font-semibold text-clay tabular-nums">{owing.length}</span> of{" "}
                    {students.length} owing ·{" "}
                    <span className="font-semibold text-ink tabular-nums">{naira(classOutstanding)}</span>{" "}
                    outstanding
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
                <input
                  type="checkbox"
                  checked={owingOnly}
                  onChange={(e) => setOwingOnly(e.target.checked)}
                  className="w-4 h-4 accent-brand"
                />
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

          {visible.length === 0 ? (
            <p className="px-5 py-12 text-center text-sm text-muted">
              {owingOnly ? "Nobody in this class owes fees." : "No students match."}
            </p>
          ) : (
            <ul className="divide-y divide-line">
              {visible.map((s) => {
                const amount = fees[s.id] ?? 0;
                const isOwing = amount > 0;
                const edited = amount !== (saved[s.id] ?? 0);
                return (
                  <li key={s.id} className={`${rowGrid} px-5 py-3 ${edited ? "bg-tint/50" : ""}`}>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-ink truncate">
                        {s.lastName} {s.firstName}
                      </p>
                      <p className="text-xs text-muted tabular-nums">{s.username}</p>
                    </div>

                    <div className="row-start-2 sm:row-start-auto">
                      <MoneyInput
                        size="sm"
                        label={`Outstanding for ${s.firstName} ${s.lastName}`}
                        value={amount}
                        onChange={(v) => setFee(s.id, v)}
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
                          onClick={() => setFee(s.id, 0)}
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
              {changed.length === 0
                ? "All changes saved"
                : `${changed.length} unsaved change${changed.length === 1 ? "" : "s"}`}
            </span>
            <button onClick={handleSave} disabled={changed.length === 0} className={primaryButton}>
              Save {selectedClass}
            </button>
          </footer>
        </section>
      </div>
    </div>
  );
}
