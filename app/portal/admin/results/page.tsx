"use client";

import React, { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import AdminModal, { panelClass, primaryButton } from "@/components/admin/shared/AdminModal";
import {
  mockSessions,
  mockStudents,
  mockTeachers,
  promotionClasses,
} from "@/constants/admin/mock.constants";
import type { AdminStudent } from "@/types/admin.types";

type StudentResultStatus = "published" | "draft" | "missing";
type ClassStatus = "published" | "ready" | "in-progress" | "not-started";

const terms = mockSessions.flatMap((s) =>
  s.terms.map((t) => ({ id: t.id, label: `${s.name} · ${t.name}` })),
);
const latestTermId = mockSessions.find((s) => s.isCurrent)?.terms.at(-1)?.id ?? terms[0]?.id;

// TEMPORARY: sample statuses. Older terms are fully published; the latest term
// shows each stage so every state can be seen.
const latestPattern: Record<string, (i: number) => StudentResultStatus> = {
  JSS1: () => "published",
  JSS2: () => "draft",
  JSS3: (i) => (i < 6 ? "draft" : "missing"),
  SS1: () => "published",
  SS2: () => "missing",
  SS3: (i) => (i < 5 ? "published" : "draft"),
};

const statusFor = (termId: string, className: string, index: number): StudentResultStatus =>
  termId === latestTermId ? (latestPattern[className]?.(index) ?? "missing") : "published";

const classStatus = (statuses: StudentResultStatus[]): ClassStatus => {
  if (statuses.length && statuses.every((s) => s === "published")) return "published";
  if (statuses.length && statuses.every((s) => s !== "missing")) return "ready";
  if (statuses.some((s) => s !== "missing")) return "in-progress";
  return "not-started";
};

const classStatusLabel: Record<ClassStatus, { text: string; tone: "brand" | "clay" | "muted" }> = {
  published: { text: "Published", tone: "brand" },
  ready: { text: "Ready to publish", tone: "clay" },
  "in-progress": { text: "In progress", tone: "clay" },
  "not-started": { text: "Not started", tone: "muted" },
};

const studentStatusLabel: Record<StudentResultStatus, { text: string; tone: "brand" | "clay" | "muted" }> = {
  published: { text: "Published", tone: "brand" },
  draft: { text: "Draft", tone: "clay" },
  missing: { text: "Not entered", tone: "muted" },
};

const rowGrid =
  "grid grid-cols-[minmax(0,1fr)_auto_16px] sm:grid-cols-[80px_minmax(0,1fr)_minmax(0,1fr)_140px_16px] items-center gap-x-4 gap-y-1";

export default function ResultsOverviewPage() {
  const [termId, setTermId] = useState(latestTermId);
  const [openClass, setOpenClass] = useState<string | null>(null);

  const rows = useMemo(
    () =>
      promotionClasses.map((className) => {
        const students = mockStudents.filter((s) => s.className === className && s.status === "active");
        const statuses = students.map((_, i) => statusFor(termId, className, i));
        return {
          className,
          teacher: mockTeachers.find((t) => t.isActive && t.className === className),
          students: students.map((s, i) => ({ student: s, status: statuses[i] })),
          entered: statuses.filter((s) => s !== "missing").length,
          published: statuses.filter((s) => s === "published").length,
          status: classStatus(statuses),
        };
      }),
    [termId],
  );

  const count = (status: ClassStatus) => rows.filter((r) => r.status === status).length;
  const open = rows.find((r) => r.className === openClass);

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      <PageHeader
        title="Results Overview"
        description="See which classes have entered and published their results."
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

      {/* Summary */}
      <section className={panelClass}>
        <dl className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-line">
          {(
            [
              ["published", "Published"],
              ["ready", "Ready to publish"],
              ["in-progress", "In progress"],
              ["not-started", "Not started"],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="px-5 py-4">
              <dt className="text-sm text-muted">{label}</dt>
              <dd className={`text-2xl font-bold tabular-nums mt-0.5 ${key === "published" ? "text-brand" : key === "not-started" ? "text-muted" : "text-ink"}`}>
                {count(key)}
                <span className="text-sm font-normal text-muted"> / {rows.length}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* By class */}
      <section className={`${panelClass} overflow-hidden`}>
        <div className={`${rowGrid} hidden sm:grid px-5 py-2 bg-canvas border-b border-line text-xs font-medium text-muted`}>
          <span>Class</span>
          <span>Class teacher</span>
          <span>Results entered</span>
          <span>Status</span>
          <span />
        </div>
        <ul className="divide-y divide-line">
          {rows.map((r) => {
            const total = r.students.length;
            const pct = total ? (r.entered / total) * 100 : 0;
            const label = classStatusLabel[r.status];
            return (
              <li key={r.className}>
                <button
                  onClick={() => setOpenClass(r.className)}
                  className={`${rowGrid} w-full px-5 py-3.5 text-left hover:bg-canvas transition-colors group`}
                >
                  <span className="text-sm font-bold text-ink">{r.className}</span>
                  <span className="hidden sm:block text-sm text-muted truncate">
                    {r.teacher ? `${r.teacher.firstName} ${r.teacher.lastName}` : "No class teacher"}
                  </span>
                  <span className="col-span-3 sm:col-span-1 row-start-2 sm:row-start-auto flex items-center gap-3">
                    <span className="flex-1 h-1.5 rounded-full bg-tint overflow-hidden">
                      <span className="block h-full bg-brand rounded-full" style={{ width: `${pct}%` }} />
                    </span>
                    <span className="text-xs text-muted tabular-nums whitespace-nowrap">
                      {r.entered} of {total}
                    </span>
                  </span>
                  <span className="col-start-2 row-start-1 sm:col-start-auto sm:row-start-auto">
                    <StatusBadge tone={label.tone}>{label.text}</StatusBadge>
                  </span>
                  <ChevronRight
                    size={16}
                    className="col-start-3 row-start-1 sm:col-start-auto sm:row-start-auto text-muted/40 group-hover:text-brand transition-colors"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {open && (
        <AdminModal
          isOpen
          onClose={() => setOpenClass(null)}
          title={`${open.className} results`}
          description={`${terms.find((t) => t.id === termId)?.label} · ${open.entered} of ${open.students.length} entered, ${open.published} published`}
          footer={
            <button onClick={() => setOpenClass(null)} className={primaryButton}>
              Close
            </button>
          }
        >
          <ul className="rounded-lg border border-line divide-y divide-line">
            {open.students.map(({ student, status }: { student: AdminStudent; status: StudentResultStatus }) => (
              <li key={student.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-ink truncate">
                    {student.lastName} {student.firstName}
                  </span>
                  <span className="block text-xs text-muted tabular-nums">{student.username}</span>
                </span>
                <StatusBadge tone={studentStatusLabel[status].tone}>{studentStatusLabel[status].text}</StatusBadge>
              </li>
            ))}
          </ul>
          {open.status !== "published" && (
            <p className="text-xs text-muted mt-3">
              {open.teacher
                ? `${open.teacher.firstName} ${open.teacher.lastName} enters and publishes these results from the teacher portal.`
                : "Assign a class teacher so these results can be entered."}
            </p>
          )}
        </AdminModal>
      )}
    </div>
  );
}
