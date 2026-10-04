"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import AdminConfirm from "@/components/admin/shared/AdminConfirm";
import TermFormModal, {
  TermFormValues,
} from "@/components/admin/sessions/TermFormModal";
import ReportDetailsModal from "@/components/admin/sessions/ReportDetailsModal";
import { panelClass, primaryButton } from "@/components/admin/shared/AdminModal";
import { mockSessions } from "@/constants/admin/mock.constants";
import { toast } from "@/store/toast.store";
import type {
  AdminSession,
  AdminTerm,
  TermReportDetails,
  TermStatus,
} from "@/types/admin.types";

const termTone: Record<TermStatus, "brand" | "muted" | "clay"> = {
  active: "brand",
  closed: "muted",
  upcoming: "clay",
};

const termOrder = ["1st Term", "2nd Term", "3rd Term"];

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

const termGrid =
  "grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_110px] items-center gap-x-4 gap-y-1";

// "2025/2026" -> "2026/2027"
const nextSessionName = (name?: string) => {
  const start = Number(name?.split("/")[0]);
  return start ? `${start + 1}/${start + 2}` : "";
};

type PendingAction = { kind: "activate" | "close"; session: AdminSession; term: AdminTerm };

export default function SessionsPage() {
  const [sessions, setSessions] = useState<AdminSession[]>(mockSessions);
  const [formFor, setFormFor] = useState<AdminSession | "new" | null>(null);
  const [pending, setPending] = useState<PendingAction | null>(null);
  const [detailsFor, setDetailsFor] = useState<{ session: AdminSession; term: AdminTerm } | null>(null);

  const handleSaveDetails = (reportDetails: TermReportDetails) => {
    if (!detailsFor) return;
    setSessions((prev) =>
      prev.map((s) => ({
        ...s,
        terms: s.terms.map((t) => (t.id === detailsFor.term.id ? { ...t, reportDetails } : t)),
      })),
    );
    toast.success(
      "Report sheet details saved",
      `${detailsFor.session.name} • ${detailsFor.term.name}`,
    );
    setDetailsFor(null);
  };

  const handleCreate = (values: TermFormValues) => {
    const term: AdminTerm = {
      id: crypto.randomUUID(),
      name: values.termName,
      startDate: values.startDate,
      endDate: values.endDate,
      status: values.makeCurrent ? "active" : "upcoming",
    };

    setSessions((prev) => {
      // Only one term (and session) can be active at a time.
      const base = values.makeCurrent
        ? prev.map((s) => ({
            ...s,
            isCurrent: false,
            terms: s.terms.map((t) =>
              t.status === "active" ? { ...t, status: "closed" as const } : t,
            ),
          }))
        : prev;

      if (formFor === "new") {
        return [
          { id: crypto.randomUUID(), name: values.sessionName, isCurrent: values.makeCurrent, terms: [term] },
          ...base,
        ];
      }
      return base.map((s) =>
        s.id === (formFor as AdminSession).id
          ? { ...s, isCurrent: values.makeCurrent || s.isCurrent, terms: [...s.terms, term] }
          : s,
      );
    });

    toast.success(
      formFor === "new" ? "Session created" : "Term added",
      `${values.sessionName} • ${values.termName}`,
    );
    setFormFor(null);
  };

  const handleConfirm = () => {
    if (!pending) return;
    const { kind, session, term } = pending;

    setSessions((prev) =>
      prev.map((s) => ({
        ...s,
        isCurrent: kind === "activate" ? s.id === session.id : s.isCurrent,
        terms: s.terms.map((t) => {
          if (t.id === term.id) return { ...t, status: kind === "activate" ? "active" : "closed" };
          if (kind === "activate" && t.status === "active") return { ...t, status: "closed" };
          return t;
        }),
      })),
    );

    toast.success(
      kind === "activate" ? "Term activated" : "Term closed",
      `${session.name} • ${term.name}`,
    );
    setPending(null);
  };

  const nextTermName = (session: AdminSession) =>
    termOrder.find((n) => !session.terms.some((t) => t.name === n)) ?? "1st Term";

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      <PageHeader
        title="Sessions & Terms"
        description="Open a new session, choose the active term, and add the signature and dates printed on report sheets."
        action={
          <button onClick={() => setFormFor("new")} className={`${primaryButton} self-start`}>
            <Plus size={16} /> New session
          </button>
        }
      />

      {sessions.map((session) => (
        <section key={session.id} className={`${panelClass} overflow-hidden`}>
          <header className="flex items-center justify-between gap-3 px-5 py-4 border-b border-line">
            <div className="flex items-baseline gap-3">
              <h2 className="text-lg font-bold text-ink tabular-nums">{session.name}</h2>
              {session.isCurrent && (
                <span className="text-xs font-semibold text-brand">Current session</span>
              )}
            </div>
            {session.terms.length < 3 && (
              <button
                onClick={() => setFormFor(session)}
                className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-dark"
              >
                <Plus size={15} /> Add term
              </button>
            )}
          </header>

          <div className={`${termGrid} hidden sm:grid px-5 py-2 bg-canvas border-b border-line text-xs font-medium text-muted`}>
            <span>Term</span>
            <span>Status</span>
            <span>Report sheet</span>
            <span />
          </div>

          <ul className="divide-y divide-line">
            {session.terms.map((term) => (
              <li key={term.id} className={`${termGrid} px-5 py-3.5`}>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink">{term.name}</p>
                  <p className="text-xs text-muted tabular-nums">
                    {formatDate(term.startDate)} – {formatDate(term.endDate)}
                  </p>
                </div>

                <div className="row-start-2 sm:row-start-auto">
                  <StatusBadge tone={termTone[term.status]}>{term.status}</StatusBadge>
                </div>

                <div className="row-start-3 sm:row-start-auto">
                  <button
                    onClick={() => setDetailsFor({ session, term })}
                    className={`text-sm text-left underline-offset-2 hover:underline ${
                      term.reportDetails ? "text-ink" : "text-clay font-medium"
                    }`}
                  >
                    {term.reportDetails
                      ? `Signed ${formatDate(term.reportDetails.signedDate)}`
                      : "Add signature & dates"}
                  </button>
                </div>

                <div className="row-span-3 sm:row-span-1 col-start-2 sm:col-start-auto row-start-1 sm:row-start-auto justify-self-end">
                  {term.status === "active" ? (
                    <button
                      onClick={() => setPending({ kind: "close", session, term })}
                      className="h-8 px-3 text-sm font-medium text-ink border border-line hover:border-ink/30 rounded-lg transition-colors"
                    >
                      Close term
                    </button>
                  ) : (
                    <button
                      onClick={() => setPending({ kind: "activate", session, term })}
                      className="h-8 px-3 text-sm font-medium text-brand hover:bg-tint rounded-lg transition-colors"
                    >
                      {term.status === "closed" ? "Reopen" : "Make active"}
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {detailsFor && (
        <ReportDetailsModal
          key={detailsFor.term.id}
          sessionName={detailsFor.session.name}
          term={detailsFor.term}
          onClose={() => setDetailsFor(null)}
          onSave={handleSaveDetails}
        />
      )}

      {formFor && (
        <TermFormModal
          isOpen
          onClose={() => setFormFor(null)}
          onSubmit={handleCreate}
          sessionName={formFor === "new" ? undefined : formFor.name}
          suggestedSessionName={nextSessionName(sessions[0]?.name)}
          suggestedTermName={formFor === "new" ? "1st Term" : nextTermName(formFor)}
        />
      )}

      <AdminConfirm
        isOpen={!!pending}
        onClose={() => setPending(null)}
        onConfirm={handleConfirm}
        title={pending?.kind === "close" ? "Close this term?" : "Make this the active term?"}
        message={
          pending?.kind === "close"
            ? `${pending.session.name} ${pending.term.name} will be locked. Teachers won't be able to edit its reports or results.`
            : `${pending?.session.name} ${pending?.term.name} will become the active term. Any other active term will be closed.`
        }
        confirmText={pending?.kind === "close" ? "Close term" : "Make active"}
      />
    </div>
  );
}
