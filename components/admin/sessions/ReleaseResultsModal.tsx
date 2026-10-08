"use client";

import React from "react";
import { Check, Loader2, TriangleAlert } from "lucide-react";
import AdminModal, { primaryButton, secondaryButton } from "@/components/admin/shared/AdminModal";
import { useResultsOverview } from "@/hooks/admin-results.hooks";
import { useSetResultsReleased } from "@/hooks/sessions.hooks";
import { apiErrorMessage } from "@/lib/api-error";
import { toast } from "@/store/toast.store";
import type { Term } from "@/types/session.types";

interface ReleaseResultsModalProps {
  sessionName: string;
  term: Term;
  onClose: () => void;
}

function CheckRow({ ok, label, detail }: { ok: boolean; label: string; detail?: string }) {
  return (
    <li className="flex items-start gap-3 py-2.5">
      <span
        className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
          ok ? "bg-tint text-brand" : "bg-clay-soft text-clay"
        }`}
      >
        {ok ? <Check size={13} strokeWidth={3} /> : <TriangleAlert size={12} strokeWidth={2.5} />}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink">{label}</p>
        {detail && <p className="text-xs text-muted mt-0.5">{detail}</p>}
      </div>
    </li>
  );
}

export default function ReleaseResultsModal({ sessionName, term, onClose }: ReleaseResultsModalProps) {
  const { data: classes = [], isLoading } = useResultsOverview(term.id);
  const release = useSetResultsReleased();

  const students = classes.reduce((n, c) => n + c.students, 0);
  const published = classes.reduce((n, c) => n + c.published, 0);
  const vpRemarks = classes.reduce((n, c) => n + c.vpRemarks, 0);
  const behind = classes.filter((c) => c.published < c.students).map((c) => `${c.className} ${c.published}/${c.students}`);
  const details = term.reportDetails;
  const detailsMissing = [
    !details?.signatureUrl && "signature",
    !details?.vacationDate && "vacation date",
    !details?.resumptionDate && "resumption date",
  ].filter(Boolean);

  const handleRelease = async () => {
    try {
      await release.mutateAsync({ termId: term.id, released: true });
      toast.success("Results released", `${sessionName} • ${term.name}`);
      onClose();
    } catch (err) {
      toast.error("Couldn't release results", apiErrorMessage(err));
    }
  };

  return (
    <AdminModal
      isOpen
      onClose={release.isPending ? () => {} : onClose}
      title="Release results to students?"
      description={`${sessionName} • ${term.name}`}
      footer={
        <>
          <button onClick={onClose} disabled={release.isPending} className={secondaryButton}>
            Cancel
          </button>
          <button onClick={handleRelease} disabled={release.isPending || isLoading} className={primaryButton}>
            {release.isPending && <Loader2 size={16} className="animate-spin" />}
            Release results
          </button>
        </>
      }
    >
      {isLoading ? (
        <div className="flex flex-col gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-10 rounded-lg bg-canvas animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <ul className="divide-y divide-line -my-1">
            <CheckRow
              ok={students > 0 && published === students}
              label={`${published} of ${students} results published`}
              detail={behind.length ? `Still waiting: ${behind.join(", ")}` : undefined}
            />
            <CheckRow
              ok={published > 0 && vpRemarks === published}
              label={`${vpRemarks} of ${published} V.P remarks added`}
            />
            <CheckRow
              ok={detailsMissing.length === 0}
              label="Report sheet signature and dates"
              detail={detailsMissing.length ? `Missing: ${detailsMissing.join(", ")}` : undefined}
            />
          </ul>
          <p className="text-sm text-muted leading-relaxed mt-4">
            Students will see their report sheet straight away. Anyone without a published result sees nothing until
            their teacher publishes it, and students who owe fees still see their result on hold. You can hide results
            again at any time.
          </p>
        </>
      )}
    </AdminModal>
  );
}
