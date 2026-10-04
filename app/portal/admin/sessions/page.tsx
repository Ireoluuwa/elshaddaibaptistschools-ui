"use client";

import React, { useState } from "react";
import { CalendarPlus, Plus } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import ConfirmModal from "@/components/shared/ConfirmModal";
import TermFormModal, {
  TermFormValues,
} from "@/components/admin/sessions/TermFormModal";
import { primaryButton } from "@/components/admin/shared/AdminModal";
import { mockSessions } from "@/constants/admin/mock.constants";
import { toast } from "@/store/toast.store";
import type { AdminSession, AdminTerm, TermStatus } from "@/types/admin.types";

const termTone: Record<TermStatus, "green" | "gray" | "blue"> = {
  active: "green",
  closed: "gray",
  upcoming: "blue",
};

const termOrder = ["1st Term", "2nd Term", "3rd Term"];

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

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
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <PageHeader
        title="Sessions & Terms"
        description="Open new sessions, switch the active term and close finished ones."
        action={
          <button onClick={() => setFormFor("new")} className={`${primaryButton} self-start`}>
            <CalendarPlus size={16} /> New session
          </button>
        }
      />

      <div className="flex flex-col gap-5">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`bg-white rounded-2xl border overflow-hidden ${
              session.isCurrent ? "border-emerald-200 shadow-sm" : "border-gray-100"
            }`}
          >
            <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <h2 className="text-secondary font-bold">{session.name}</h2>
                {session.isCurrent && <StatusBadge tone="green">Current</StatusBadge>}
              </div>
              {session.terms.length < 3 && (
                <button
                  onClick={() => setFormFor(session)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-secondary"
                >
                  <Plus size={16} /> Add term
                </button>
              )}
            </div>

            <ul className="divide-y divide-gray-100">
              {session.terms.map((term) => (
                <li
                  key={term.id}
                  className="flex flex-wrap items-center gap-x-4 gap-y-2 px-6 py-4"
                >
                  <div className="flex-1 min-w-[180px]">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-secondary">{term.name}</span>
                      <StatusBadge tone={termTone[term.status]}>{term.status}</StatusBadge>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {formatDate(term.startDate)} – {formatDate(term.endDate)}
                    </p>
                  </div>
                  {term.status === "active" ? (
                    <button
                      onClick={() => setPending({ kind: "close", session, term })}
                      className="h-8 px-3 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
                    >
                      Close term
                    </button>
                  ) : (
                    <button
                      onClick={() => setPending({ kind: "activate", session, term })}
                      className="h-8 px-3 text-xs font-semibold text-primary bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-all"
                    >
                      {term.status === "closed" ? "Reopen" : "Activate"}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

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

      <ConfirmModal
        isOpen={!!pending}
        onClose={() => setPending(null)}
        onConfirm={handleConfirm}
        variant="warning"
        title={pending?.kind === "close" ? "Close this term?" : "Make this the active term?"}
        message={
          pending?.kind === "close"
            ? `${pending.session.name} ${pending.term.name} will be locked. Teachers won't be able to edit its reports or results.`
            : `${pending?.session.name} ${pending?.term.name} will become the active term. Any other active term will be closed.`
        }
        confirmText={pending?.kind === "close" ? "Close term" : "Activate"}
      />
    </div>
  );
}
