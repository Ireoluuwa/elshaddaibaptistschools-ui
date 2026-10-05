"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ImageUp, Loader2, Trash2 } from "lucide-react";
import AdminModal, {
  inputClass,
  labelClass,
  primaryButton,
  secondaryButton,
} from "@/components/admin/shared/AdminModal";
import { useUpdateReportDetails } from "@/hooks/sessions.hooks";
import { storageService } from "@/services/storage.service";
import { apiErrorMessage } from "@/lib/api-error";
import { toast } from "@/store/toast.store";
import type { Term } from "@/types/session.types";

interface ReportDetailsModalProps {
  sessionName: string;
  term: Term;
  onClose: () => void;
}

const ReportDetailsModal: React.FC<ReportDetailsModalProps> = ({ sessionName, term, onClose }) => {
  const saved = term.reportDetails;
  const [signatureUrl, setSignatureUrl] = useState(saved?.signatureUrl ?? "");
  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const [signedDate, setSignedDate] = useState(saved?.signedDate ?? term.endDate);
  const [vacationDate, setVacationDate] = useState(saved?.vacationDate ?? term.endDate);
  const [resumptionDate, setResumptionDate] = useState(saved?.resumptionDate ?? "");
  const [isUploading, setIsUploading] = useState(false);
  const { mutateAsync: saveDetails, isPending } = useUpdateReportDetails();

  // Preview a newly picked file locally; it's only uploaded on save.
  const previewUrl = useMemo(
    () => (signatureFile ? URL.createObjectURL(signatureFile) : null),
    [signatureFile],
  );
  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const shownSignature = previewUrl ?? signatureUrl;
  const busy = isUploading || isPending;
  const canSave = !!shownSignature && !!signedDate && !busy;

  const removeSignature = () => {
    setSignatureFile(null);
    setSignatureUrl("");
  };

  const handleSave = async () => {
    try {
      let url = signatureUrl;
      if (signatureFile) {
        setIsUploading(true);
        url = await storageService.uploadSignature(signatureFile, term.id);
      }
      await saveDetails({
        termId: term.id,
        payload: {
          signatureUrl: url || null,
          signedDate: signedDate || null,
          vacationDate: vacationDate || null,
          resumptionDate: resumptionDate || null,
        },
      });
      toast.success("Report sheet details saved", `${sessionName} • ${term.name}`);
      onClose();
    } catch (err) {
      toast.error("Couldn't save details", apiErrorMessage(err));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AdminModal
      isOpen
      onClose={busy ? () => {} : onClose}
      title="Report sheet details"
      description={`${sessionName} • ${term.name}. Printed on every student's report sheet.`}
      footer={
        <>
          <button onClick={onClose} disabled={busy} className={secondaryButton}>
            Cancel
          </button>
          <button onClick={handleSave} disabled={!canSave} className={primaryButton}>
            {busy && <Loader2 size={16} className="animate-spin" />}
            {isUploading ? "Uploading…" : isPending ? "Saving…" : "Save details"}
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <div>
          <span className={labelClass}>Signature</span>
          {shownSignature ? (
            <div className="flex items-center gap-3 p-3 rounded-lg border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element -- local preview or storage URL */}
              <img src={shownSignature} alt="Signature" className="h-14 max-w-[200px] object-contain" />
              <button
                onClick={removeSignature}
                disabled={busy}
                className="ml-auto p-2 rounded-lg text-muted hover:text-danger transition-colors"
                title="Remove signature"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center gap-1.5 p-5 rounded-lg border border-dashed border-muted/40 hover:border-brand hover:bg-tint cursor-pointer text-center transition-colors">
              <ImageUp size={20} className="text-brand" />
              <span className="text-sm font-medium text-ink">Upload signature</span>
              <span className="text-xs text-muted">PNG with a transparent background works best</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setSignatureFile(e.target.files?.[0] ?? null)}
              />
            </label>
          )}
        </div>

        <div>
          <label htmlFor="signed-date" className={labelClass}>Date signed</label>
          <input id="signed-date" type="date" value={signedDate} onChange={(e) => setSignedDate(e.target.value)} className={inputClass} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="vacation-date" className={labelClass}>Vacation date</label>
            <input id="vacation-date" type="date" value={vacationDate} onChange={(e) => setVacationDate(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="resumption-date" className={labelClass}>School resumes</label>
            <input id="resumption-date" type="date" value={resumptionDate} onChange={(e) => setResumptionDate(e.target.value)} className={inputClass} />
          </div>
        </div>
      </div>
    </AdminModal>
  );
};

export default ReportDetailsModal;
