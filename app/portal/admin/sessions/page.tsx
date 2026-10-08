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
import ReleaseResultsModal from "@/components/admin/sessions/ReleaseResultsModal";
import { panelClass, primaryButton } from "@/components/admin/shared/AdminModal";
import {
  useActivateTerm,
  useAddTerm,
  useCloseTerm,
  useCreateSession,
  useSessions,
  useSetResultsReleased,
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
  "grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1fr)_110px] items-center gap-x-4 gap-y-1";

// "2025/2026" -> "2026/2027"
const nextSessionName = (name?: string) => {
  const start = Number(name?.split("/")[0]);
  return start ? `${start + 1}/${start + 2}` : "";
};

// Start date of the term after this one, across sessions (3rd Term → next 1st Term).
const nextTermStart = (sessions: Session[], term: Term) =>
  sessions
    .flatMap((s) => s.terms)
    .map((t) => t.startDate)
    .filter((d) => d > term.startDate)
    .sort()[0];

const nextTermName = (session: Session) =>
  TERM_NAMES.find((n) => !session.terms.some((t) => t.name === n)) ?? "1st Term";

type PendingAction = { kind: "activate" | "close" | "hide"; session: Session; term: Term };

export default function SessionsPage() {
  const { data: sessions = [], isLoading, isError, refetch } = useSessions();
  const createSession = useCreateSession();
  const addTerm = useAddTerm();
  const activateTerm = useActivateTerm();
  const closeTerm = useCloseTerm();
  const setReleased = useSetResultsReleased();

  const [formFor, setFormFor] = useState<Session | "new" | null>(null);
  const [pending, setPending] = useState<PendingAction | null>(null);
  const [detailsFor, setDetailsFor] = useState<{ session: Session; term: Term } | null>(null);
  const [releaseFor, setReleaseFor] = useState<{ session: Session; term: Term } | null>(null);
  // Closing a term whose results are still hidden offers to release them in the same step.
  const [alsoRelease, setAlsoRelease] = useState(true);

  const askToClose = (session: Session, term: Term) => {
    setAlsoRelease(true);
    setPending({ kind: "close", session, term });
  };

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
    const label = `${session.name} • ${term.name}`;
    try {
      if (kind === "activate") {
        await activateTerm.mutateAsync(term.id);
        toast.success("Term activated", label);
      } else if (kind === "hide") {
        await setReleased.mutateAsync({ termId: term.id, released: false });
        toast.info("Results hidden from students", label);
      } else {
        await closeTerm.mutateAsync(term.id);
        const release = alsoRelease && !term.resultsReleasedAt;
        if (release) await setReleased.mutateAsync({ termId: term.id, released: true });
        toast.success(release ? "Term closed and results released" : "Term closed", label);
      }
      setPending(null);
    } catch (err) {
      toast.error("Couldn't update term", apiErrorMessage(err));
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      <PageHeader
        title="Sessions & Terms"
        description="Open a new session, choose the active term, release results to students, and add the dates printed on report sheets."
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
            <span>Results</span>
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
                  {term.resultsReleasedAt ? (
                    <p className="text-sm text-ink">
                      Released{" "}
                      <button
                        onClick={() => setPending({ kind: "hide", session, term })}
                        className="ml-1 text-xs font-medium text-muted hover:text-danger underline-offset-2 hover:underline"
                      >
                        Hide
                      </button>
                    </p>
                  ) : term.status === "upcoming" ? (
                    <p className="text-sm text-muted">Not started</p>
                  ) : (
                    <button
                      onClick={() => setReleaseFor({ session, term })}
                      className="text-sm font-medium text-clay text-left underline-offset-2 hover:underline"
                    >
                      Not released · Release
                    </button>
                  )}
                </div>

                <div className="row-start-4 sm:row-start-auto">
                  <button
                    onClick={() => setDetailsFor({ session, term })}
                    className={`text-sm text-left underline-offset-2 hover:underline ${
                      term.reportDetails ? "text-ink" : "text-clay font-medium"
                    }`}
                  >
                    {!term.reportDetails
                      ? "Add dates"
                      : term.reportDetails.signedDate
                        ? `Signed ${formatDate(term.reportDetails.signedDate)}`
                        : "Details added"}
                  </button>
                </div>

                <div className="row-span-4 sm:row-span-1 col-start-2 sm:col-start-auto row-start-1 sm:row-start-auto justify-self-end">
                  {term.status === "active" ? (
                    <button
                      onClick={() => askToClose(session, term)}
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
          nextTermStart={nextTermStart(sessions, detailsFor.term)}
          onClose={() => setDetailsFor(null)}
        />
      )}

      {releaseFor && (
        <ReleaseResultsModal
          key={releaseFor.term.id}
          sessionName={releaseFor.session.name}
          term={releaseFor.term}
          onClose={() => setReleaseFor(null)}
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
        title={
          pending?.kind === "close"
            ? "Close this term?"
            : pending?.kind === "hide"
              ? "Hide results from students?"
              : "Make this the active term?"
        }
        message={
          pending?.kind === "close" ? (
            <>
              <p>
                {pending.session.name} {pending.term.name} will be locked. Nobody, including admins, can change its
                results, weekly reports, V.P&apos;s remarks or report details until you reopen it.
              </p>
              {!pending.term.resultsReleasedAt && (
                <label className="mt-4 flex items-start gap-2.5 p-3 rounded-lg bg-canvas text-ink cursor-pointer">
                  <input
                    type="checkbox"
                    checked={alsoRelease}
                    onChange={(e) => setAlsoRelease(e.target.checked)}
                    className="mt-0.5 accent-brand"
                  />
                  <span>
                    <span className="font-medium">Also release results to students</span>
                    <span className="block text-xs text-muted mt-0.5">
                      Untick to keep them hidden. You can release them later from this page.
                    </span>
                  </span>
                </label>
              )}
            </>
          ) : pending?.kind === "hide" ? (
            `Students won't see ${pending.session.name} ${pending.term.name} results until you release them again. Nothing is deleted.`
          ) : (
            `${pending?.session.name} ${pending?.term.name} will become the active term. Any other active term will be closed.`
          )
        }
        confirmText={
          pending?.kind === "close" ? "Close term" : pending?.kind === "hide" ? "Hide results" : "Make active"
        }
        danger={pending?.kind === "hide"}
        isPending={activateTerm.isPending || closeTerm.isPending || setReleased.isPending}
      />
    </div>
  );
}
