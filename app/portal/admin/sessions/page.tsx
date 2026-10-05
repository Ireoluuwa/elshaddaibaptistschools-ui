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
import {
  useActivateTerm,
  useAddTerm,
  useCloseTerm,
  useCreateSession,
  useSessions,
} from "@/hooks/sessions.hooks";
import { apiErrorMessage } from "@/lib/api-error";
import { toast } from "@/store/toast.store";
import { TERM_NAMES, type Session, type Term, type TermStatus } from "@/types/session.types";

const termTone: Record<TermStatus, "brand" | "muted" | "clay"> = {
  active: "brand",
  closed: "muted",
  upcoming: "clay",
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

const termGrid =
  "grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_110px] items-center gap-x-4 gap-y-1";

// "2025/2026" -> "2026/2027"
const nextSessionName = (name?: string) => {
  const start = Number(name?.split("/")[0]);
  return start ? `${start + 1}/${start + 2}` : "";
};

const nextTermName = (session: Session) =>
  TERM_NAMES.find((n) => !session.terms.some((t) => t.name === n)) ?? "1st Term";

type PendingAction = { kind: "activate" | "close"; session: Session; term: Term };

export default function SessionsPage() {
  const { data: sessions = [], isLoading, isError, refetch } = useSessions();
  const createSession = useCreateSession();
  const addTerm = useAddTerm();
  const activateTerm = useActivateTerm();
  const closeTerm = useCloseTerm();

  const [formFor, setFormFor] = useState<Session | "new" | null>(null);
  const [pending, setPending] = useState<PendingAction | null>(null);
  const [detailsFor, setDetailsFor] = useState<{ session: Session; term: Term } | null>(null);

  const handleCreate = async (values: TermFormValues) => {
    const term = {
      name: values.termName,
      startDate: values.startDate,
      endDate: values.endDate,
      makeActive: values.makeCurrent,
    };
    try {
      if (formFor === "new") {
        await createSession.mutateAsync({ name: values.sessionName, firstTerm: term });
        toast.success("Session created", `${values.sessionName} • ${values.termName}`);
      } else if (formFor) {
        await addTerm.mutateAsync({ sessionId: formFor.id, payload: term });
        toast.success("Term added", `${formFor.name} • ${values.termName}`);
      }
      setFormFor(null);
    } catch (err) {
      toast.error("Couldn't save", apiErrorMessage(err));
    }
  };

  const handleConfirm = async () => {
    if (!pending) return;
    const { kind, session, term } = pending;
    try {
      if (kind === "activate") await activateTerm.mutateAsync(term.id);
      else await closeTerm.mutateAsync(term.id);
      toast.success(kind === "activate" ? "Term activated" : "Term closed", `${session.name} • ${term.name}`);
      setPending(null);
    } catch (err) {
      toast.error("Couldn't update term", apiErrorMessage(err));
    }
  };

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

      {isLoading && (
        <div className={`${panelClass} p-5 flex flex-col gap-3`}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-10 rounded-lg bg-canvas animate-pulse" />
          ))}
        </div>
      )}

      {isError && (
        <div className={`${panelClass} px-5 py-10 text-center`}>
          <p className="text-sm text-muted">Couldn&apos;t load sessions.</p>
          <button onClick={() => refetch()} className="mt-2 text-sm font-semibold text-brand hover:underline">
            Try again
          </button>
        </div>
      )}

      {!isLoading && !isError && sessions.length === 0 && (
        <div className={`${panelClass} px-5 py-12 text-center`}>
          <p className="font-semibold text-ink">No sessions yet</p>
          <p className="text-sm text-muted mt-1">Start the first session to set up terms.</p>
        </div>
      )}

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
                    {!term.reportDetails
                      ? "Add signature & dates"
                      : term.reportDetails.signedDate
                        ? `Signed ${formatDate(term.reportDetails.signedDate)}`
                        : "Details added"}
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
          isSubmitting={createSession.isPending || addTerm.isPending}
        />
      )}

      <AdminConfirm
        isOpen={!!pending}
        onClose={() => setPending(null)}
        onConfirm={handleConfirm}
        title={pending?.kind === "close" ? "Close this term?" : "Make this the active term?"}
        message={
          pending?.kind === "close"
            ? `${pending.session.name} ${pending.term.name} will be locked. Nobody, including admins, can change its results, weekly reports, V.P's remarks or report details until you reopen it.`
            : `${pending?.session.name} ${pending?.term.name} will become the active term. Any other active term will be closed.`
        }
        confirmText={pending?.kind === "close" ? "Close term" : "Make active"}
        isPending={activateTerm.isPending || closeTerm.isPending}
      />
    </div>
  );
}
