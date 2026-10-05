"use client";

import React, { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import AdminModal, { panelClass, primaryButton } from "@/components/admin/shared/AdminModal";
import { useSessions } from "@/hooks/sessions.hooks";
import { useAdminTeachers } from "@/hooks/admin-staff.hooks";
import { useClassResults, useResultsOverview } from "@/hooks/admin-results.hooks";
import type { ClassProgress } from "@/types/admin-results.types";

type ClassStatus = "published" | "ready" | "in-progress" | "not-started" | "empty";

const statusOf = (c: ClassProgress): ClassStatus => {
  if (c.students === 0) return "empty";
  if (c.published === c.students) return "published";
  if (c.entered === c.students) return "ready";
  if (c.entered > 0) return "in-progress";
  return "not-started";
};

const statusLabel: Record<ClassStatus, { text: string; tone: "brand" | "clay" | "muted" }> = {
  published: { text: "Published", tone: "brand" },
  ready: { text: "Ready to publish", tone: "clay" },
  "in-progress": { text: "In progress", tone: "clay" },
  "not-started": { text: "Not started", tone: "muted" },
  empty: { text: "No students", tone: "muted" },
};

// JSS classes before SS, then by name.
const classOrder = (a: { className: string }, b: { className: string }) =>
  Number(a.className.startsWith("SS")) - Number(b.className.startsWith("SS")) || a.className.localeCompare(b.className);

const rowGrid =
  "grid grid-cols-[minmax(0,1fr)_auto_16px] sm:grid-cols-[80px_minmax(0,1fr)_minmax(0,1fr)_140px_16px] items-center gap-x-4 gap-y-1";

export default function ResultsOverviewPage() {
  const { data: sessions = [] } = useSessions();
  const { data: teachers = [] } = useAdminTeachers();
  const terms = useMemo(
    () => sessions.flatMap((s) => s.terms.map((t) => ({ ...t, label: `${s.name} · ${t.name}` }))),
    [sessions],
  );
  const [pickedTermId, setPickedTermId] = useState<string | null>(null);
  const termId = pickedTermId ?? terms.find((t) => t.status === "active")?.id ?? terms[0]?.id ?? null;
  const termLabel = terms.find((t) => t.id === termId)?.label ?? "";

  const { data: overview = [], isLoading, isError, refetch } = useResultsOverview(termId);
  const rows = useMemo(() => [...overview].sort(classOrder), [overview]);

  const [openClass, setOpenClass] = useState<ClassProgress | null>(null);
  const { data: openRows = [], isLoading: openLoading } = useClassResults(termId, openClass?.classId);

  const teachersOf = (classId: string) =>
    teachers
      .filter((t) => t.isActive && t.classId === classId)
      .map((t) => `${t.firstName} ${t.lastName}`.trim() || t.username);

  const counts = (status: ClassStatus) => rows.filter((r) => statusOf(r) === status).length;
  const withStudents = rows.filter((r) => r.students > 0).length;

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      <PageHeader
        title="Results Overview"
        description="See which classes have entered and published their results."
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
                {isLoading ? "—" : counts(key)}
                <span className="text-sm font-normal text-muted"> / {withStudents}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={`${panelClass} overflow-hidden`}>
        <div className={`${rowGrid} hidden sm:grid px-5 py-2 bg-canvas border-b border-line text-xs font-medium text-muted`}>
          <span>Class</span>
          <span>Class teacher</span>
          <span>Results entered</span>
          <span>Status</span>
          <span />
        </div>
        <ul className="divide-y divide-line">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <li key={i} className="px-5 py-3.5">
                <div className="h-8 rounded-lg bg-canvas animate-pulse" />
              </li>
            ))
          ) : isError ? (
            <li className="px-5 py-12 text-center text-sm text-muted">
              Couldn&apos;t load results.{" "}
              <button onClick={() => refetch()} className="font-semibold text-brand hover:underline">
                Try again
              </button>
            </li>
          ) : (
            rows.map((r) => {
              const pct = r.students ? (r.entered / r.students) * 100 : 0;
              const label = statusLabel[statusOf(r)];
              const classTeachers = teachersOf(r.classId);
              return (
                <li key={r.classId}>
                  <button
                    onClick={() => setOpenClass(r)}
                    disabled={r.students === 0}
                    className={`${rowGrid} w-full px-5 py-3.5 text-left hover:bg-canvas transition-colors group disabled:hover:bg-transparent disabled:cursor-default`}
                  >
                    <span className="text-sm font-bold text-ink">{r.className}</span>
                    <span className="hidden sm:block text-sm text-muted truncate">
                      {classTeachers.length ? classTeachers.join(", ") : <span className="text-clay">No class teacher</span>}
                    </span>
                    <span className="col-span-3 sm:col-span-1 row-start-2 sm:row-start-auto flex items-center gap-3">
                      <span className="flex-1 h-1.5 rounded-full bg-tint overflow-hidden">
                        <span className="block h-full bg-brand rounded-full" style={{ width: `${pct}%` }} />
                      </span>
                      <span className="text-xs text-muted tabular-nums whitespace-nowrap">
                        {r.entered} of {r.students}
                      </span>
                    </span>
                    <span className="col-start-2 row-start-1 sm:col-start-auto sm:row-start-auto">
                      <StatusBadge tone={label.tone}>{label.text}</StatusBadge>
                    </span>
                    <ChevronRight
                      size={16}
                      className={`col-start-3 row-start-1 sm:col-start-auto sm:row-start-auto transition-colors ${
                        r.students ? "text-muted/40 group-hover:text-brand" : "invisible"
                      }`}
                    />
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </section>

      {openClass && (
        <AdminModal
          isOpen
          onClose={() => setOpenClass(null)}
          title={`${openClass.className} results`}
          description={`${termLabel} · ${openClass.entered} of ${openClass.students} entered, ${openClass.published} published`}
          footer={
            <button onClick={() => setOpenClass(null)} className={primaryButton}>
              Close
            </button>
          }
        >
          {openLoading ? (
            <div className="flex flex-col gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-11 rounded-lg bg-canvas animate-pulse" />
              ))}
            </div>
          ) : (
            <ul className="rounded-lg border border-line divide-y divide-line">
              {openRows.map((row) => (
                <li key={row.studentId} className="flex items-center justify-between gap-3 px-4 py-2.5">
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-ink truncate">
                      {row.lastName} {row.firstName}
                    </span>
                    <span className="block text-xs text-muted tabular-nums">{row.username}</span>
                  </span>
                  {!row.result ? (
                    <StatusBadge tone="muted">Not entered</StatusBadge>
                  ) : row.result.status === "PUBLISHED" ? (
                    <StatusBadge tone="brand">Published</StatusBadge>
                  ) : (
                    <StatusBadge tone="clay">Draft</StatusBadge>
                  )}
                </li>
              ))}
            </ul>
          )}
          {openClass.published < openClass.students && (
            <p className="text-xs text-muted mt-3">
              {teachersOf(openClass.classId).length
                ? `${teachersOf(openClass.classId).join(", ")} enter${teachersOf(openClass.classId).length === 1 ? "s" : ""} and publish${teachersOf(openClass.classId).length === 1 ? "es" : ""} these results from the teacher portal.`
                : "Assign a class teacher so these results can be entered."}
            </p>
          )}
        </AdminModal>
      )}
    </div>
  );
}
