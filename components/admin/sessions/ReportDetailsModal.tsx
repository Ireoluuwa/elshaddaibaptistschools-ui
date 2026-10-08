"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import AdminModal, {
  inputClass,
  labelClass,
  primaryButton,
  secondaryButton,
} from "@/components/admin/shared/AdminModal";
import { useUpdateReportDetails } from "@/hooks/sessions.hooks";
import { useStaffProfile } from "@/hooks/profile.hooks";
import { apiErrorMessage } from "@/lib/api-error";
import { toast } from "@/store/toast.store";
import type { Term } from "@/types/session.types";

interface ReportDetailsModalProps {
  sessionName: string;
  term: Term;
  onClose: () => void;
}

const ReportDetailsModal: React.FC<ReportDetailsModalProps> = ({
  sessionName,
  term,
  onClose,
}) => {
  const saved = term.reportDetails;
  const [signedDate, setSignedDate] = useState(
    saved?.signedDate ?? term.endDate,
  );
  const [vacationDate, setVacationDate] = useState(
    saved?.vacationDate ?? term.endDate,
  );
  const [resumptionDate, setResumptionDate] = useState(
    saved?.resumptionDate ?? "",
  );
  const { mutateAsync: saveDetails, isPending } = useUpdateReportDetails();
  // Report sheets always print the signature saved in the admin's Profile.
  const { data: myProfile, isLoading: profileLoading } = useStaffProfile();
  const signature = myProfile?.signatureUrl ?? null;

  const locked = term.status === "closed";
  const canSave = !!signedDate && !isPending;

  const handleSave = async () => {
    try {
      await saveDetails({
        termId: term.id,
        payload: {
          signedDate: signedDate || null,
          vacationDate: vacationDate || null,
          resumptionDate: resumptionDate || null,
        },
      });
      toast.success(
        "Report sheet details saved",
        `${sessionName} • ${term.name}`,
      );
      onClose();
    } catch (err) {
      toast.error("Couldn't save details", apiErrorMessage(err));
    }
  };

  return (
    <AdminModal
      isOpen
      onClose={isPending ? () => {} : onClose}
      title="Report sheet details"
      description={`${sessionName} • ${term.name}. Printed on every student's report sheet.`}
      footer={
        locked ? (
          <button onClick={onClose} className={secondaryButton}>
            Close
          </button>
        ) : (
          <>
            <button
              onClick={onClose}
              disabled={isPending}
              className={secondaryButton}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!canSave}
              className={primaryButton}
            >
              {isPending && <Loader2 size={16} className="animate-spin" />}
              {isPending ? "Saving…" : "Save details"}
            </button>
          </>
        )
      }
    >
      <div className="flex flex-col gap-4">
        {locked && (
          <p className="text-sm text-ink px-3 py-2.5 rounded-lg bg-clay-soft border-l-4 border-clay">
            This term is closed. Reopen it to change these details.
          </p>
        )}
        <div>
          <span className={labelClass}>Signature</span>
          {profileLoading ? (
            <div className="h-20 rounded-lg bg-canvas animate-pulse" />
          ) : signature ? (
            <div className="flex items-center gap-3 p-3 rounded-lg border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element -- storage URL */}
              <img src={signature} alt="Signature" className="h-14 max-w-[200px] object-contain" />
              <Link
                href="/portal/admin/profile"
                className="ml-auto text-sm font-medium text-brand hover:underline underline-offset-2"
              >
                Change in Profile
              </Link>
            </div>
          ) : (
            <p className="text-sm text-ink px-3 py-2.5 rounded-lg bg-clay-soft border-l-4 border-clay">
              No signature yet. Report sheets will be unsigned until you{" "}
              <Link href="/portal/admin/profile" className="font-semibold text-brand hover:underline">
                add one in your Profile
              </Link>
              .
            </p>
          )}
          <p className="text-xs text-muted mt-1.5">The signature in your Profile is used on every report sheet.</p>
        </div>

        <div>
          <label htmlFor="signed-date" className={labelClass}>
            Date signed
          </label>
          <input
            id="signed-date"
            type="date"
            value={signedDate}
            onChange={(e) => setSignedDate(e.target.value)}
            disabled={locked}
            className={`${inputClass} disabled:bg-canvas disabled:text-muted`}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="vacation-date" className={labelClass}>
              Vacation date
            </label>
            <input
              id="vacation-date"
              type="date"
              value={vacationDate}
              onChange={(e) => setVacationDate(e.target.value)}
              disabled={locked}
              className={`${inputClass} disabled:bg-canvas disabled:text-muted`}
            />
          </div>
          <div>
            <label htmlFor="resumption-date" className={labelClass}>
              School resumes
            </label>
            <input
              id="resumption-date"
              type="date"
              value={resumptionDate}
              onChange={(e) => setResumptionDate(e.target.value)}
              disabled={locked}
              className={`${inputClass} disabled:bg-canvas disabled:text-muted`}
            />
          </div>
        </div>
      </div>
    </AdminModal>
  );
};

export default ReportDetailsModal;
