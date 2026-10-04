"use client";

import React, { useState } from "react";
import { ImageUp, Trash2 } from "lucide-react";
import AdminModal, {
  inputClass,
  labelClass,
  primaryButton,
  secondaryButton,
} from "@/components/admin/shared/AdminModal";
import type { AdminTerm, TermReportDetails } from "@/types/admin.types";

interface ReportDetailsModalProps {
  sessionName: string;
  term: AdminTerm;
  onClose: () => void;
  onSave: (details: TermReportDetails) => void;
}

const ReportDetailsModal: React.FC<ReportDetailsModalProps> = ({
  sessionName,
  term,
  onClose,
  onSave,
}) => {
  const [details, setDetails] = useState<TermReportDetails>(
    term.reportDetails ?? {
      signatureUrl: "",
      signedDate: term.endDate,
      vacationDate: term.endDate,
      resumptionDate: "",
    },
  );

  const set = <K extends keyof TermReportDetails>(key: K, value: TermReportDetails[K]) =>
    setDetails((d) => ({ ...d, [key]: value }));

  // TODO: upload to storage once the backend endpoint exists; a data URL is enough to preview.
  const handleSignature = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => set("signatureUrl", reader.result as string);
    reader.readAsDataURL(file);
  };

  const canSave = details.signatureUrl && details.signedDate;

  return (
    <AdminModal
      isOpen
      onClose={onClose}
      title="Report sheet details"
      description={`${sessionName} • ${term.name}. Printed on every student's report sheet.`}
      footer={
        <>
          <button onClick={onClose} className={secondaryButton}>
            Cancel
          </button>
          <button onClick={() => onSave(details)} disabled={!canSave} className={primaryButton}>
            Save details
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <div>
          <label className={labelClass}>Signature</label>
          {details.signatureUrl ? (
            <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200">
              <img
                src={details.signatureUrl}
                alt="Signature"
                className="h-14 max-w-[200px] object-contain"
              />
              <button
                onClick={() => set("signatureUrl", "")}
                className="ml-auto p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                title="Remove signature"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center gap-1.5 p-5 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#006442]/40 cursor-pointer text-center transition-all">
              <ImageUp size={20} className="text-gray-400" />
              <span className="text-sm font-semibold text-secondary">Upload signature</span>
              <span className="text-xs text-gray-400">PNG with a transparent background works best</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleSignature(e.target.files?.[0])}
              />
            </label>
          )}
        </div>

        <div>
          <label className={labelClass}>Date signed</label>
          <input
            type="date"
            value={details.signedDate}
            onChange={(e) => set("signedDate", e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Vacation date</label>
            <input
              type="date"
              value={details.vacationDate}
              onChange={(e) => set("vacationDate", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>School resumes</label>
            <input
              type="date"
              value={details.resumptionDate}
              onChange={(e) => set("resumptionDate", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>
    </AdminModal>
  );
};

export default ReportDetailsModal;
