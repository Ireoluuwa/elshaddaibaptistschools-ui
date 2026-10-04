"use client";

import React, { useMemo, useState } from "react";
import { Wand2 } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import { primaryButton } from "@/components/admin/shared/AdminModal";
import {
  mockSessions,
  mockStudents,
  promotionClasses,
  remarkBands,
} from "@/constants/admin/mock.constants";
import { toast } from "@/store/toast.store";

const terms = mockSessions.flatMap((s) =>
  s.terms.map((t) => ({ id: t.id, label: `${s.name} • ${t.name}` })),
);
// Default to the most recent term of the current session.
const defaultTermId =
  mockSessions.find((s) => s.isCurrent)?.terms.at(-1)?.id ?? terms[0]?.id;

const suggestRemark = (score: number) =>
  remarkBands.find((b) => score >= b.min)?.remark ?? "";

// Keyed by term + student so switching terms keeps each term's remarks separate.
const keyOf = (termId: string, studentId: string) => `${termId}:${studentId}`;

export default function RemarksPage() {
  const [termId, setTermId] = useState(defaultTermId);
  const [selectedClass, setSelectedClass] = useState(promotionClasses[0]);
  const [remarks, setRemarks] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<Record<string, string>>({});

  const students = useMemo(
    () =>
      mockStudents.filter(
        (s) => s.className === selectedClass && s.status === "active",
      ),
    [selectedClass],
  );

  const remarkFor = (id: string) => remarks[keyOf(termId, id)] ?? "";
  const setRemark = (id: string, value: string) =>
    setRemarks((r) => ({ ...r, [keyOf(termId, id)]: value }));

  const doneInClass = (className: string) =>
    mockStudents.filter(
      (s) =>
        s.className === className &&
        s.status === "active" &&
        saved[keyOf(termId, s.id)]?.trim(),
    ).length;

  const classTotal = (className: string) =>
    mockStudents.filter((s) => s.className === className && s.status === "active").length;

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
    toast.info("Remarks suggested", "Check them before saving.");
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
    <div className="max-w-5xl mx-auto flex flex-col gap-8">
      <PageHeader
        title="V.P's Remarks"
        description="Write the V.P's remark for each student's report sheet."
        action={
          <select
            value={termId}
            onChange={(e) => setTermId(e.target.value)}
            className="h-10 px-3 rounded-lg border border-gray-200 focus:border-[#006442] outline-none text-sm bg-white self-start"
          >
            {terms.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        }
      />

      {/* Class picker */}
      <div className="flex flex-wrap gap-2">
        {promotionClasses.map((c) => {
          const active = c === selectedClass;
          const done = doneInClass(c);
          const total = classTotal(c);
          return (
            <button
              key={c}
              onClick={() => setSelectedClass(c)}
              className={`h-9 px-4 inline-flex items-center gap-2 rounded-full text-sm font-semibold border transition-all ${
                active
                  ? "bg-secondary text-white border-secondary"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
              }`}
            >
              {c}
              <span
                className={`text-[11px] font-medium ${
                  active ? "text-white/60" : done === total ? "text-emerald-600" : "text-gray-400"
                }`}
              >
                {done}/{total}
              </span>
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Card header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div>
            <p className="text-secondary font-bold">{selectedClass}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {filled} of {students.length} students have a remark
            </p>
          </div>
          <button
            onClick={fillEmpty}
            className="h-9 px-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-all"
          >
            <Wand2 size={14} /> Suggest for empty ones
          </button>
        </div>

        {/* Shared suggestions for every remark input */}
        <datalist id="vp-remark-options">
          {remarkBands.map((b) => (
            <option key={b.remark} value={b.remark} />
          ))}
        </datalist>

        {students.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-gray-400">
            No active students in {selectedClass}.
          </p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {students.map((s) => {
              const score = s.annualAverage;
              return (
                <li key={s.id} className="px-6 py-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
                  <div className="flex items-center gap-3 md:w-64 shrink-0">
                    <div className="w-9 h-9 rounded-full bg-emerald-50 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                      {s.firstName[0]}
                      {s.lastName[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-secondary truncate">
                        {s.lastName} {s.firstName}
                      </p>
                      <p className="text-xs text-gray-400">
                        {score === null ? (
                          <span className="text-amber-600">No result yet</span>
                        ) : (
                          <>
                            Overall{" "}
                            <span
                              className={`font-bold ${score < 40 ? "text-red-500" : "text-secondary"}`}
                            >
                              {score.toFixed(1)}%
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <input
                    list="vp-remark-options"
                    value={remarkFor(s.id)}
                    onChange={(e) => setRemark(s.id, e.target.value)}
                    disabled={score === null}
                    placeholder={score === null ? "Waiting for result" : "Type a remark or pick one…"}
                    className="flex-1 h-10 px-3 rounded-lg border border-gray-200 focus:border-[#006442] focus:ring-1 focus:ring-[#006442] outline-none text-sm bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </li>
              );
            })}
          </ul>
        )}

        {/* Footer */}
        {students.length > 0 && (
          <div className="flex items-center justify-between gap-4 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <span className="text-xs text-gray-400">
              {unsaved ? "You have unsaved changes" : "All changes saved"}
            </span>
            <button onClick={handleSave} disabled={!unsaved} className={primaryButton}>
              Save {selectedClass}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
