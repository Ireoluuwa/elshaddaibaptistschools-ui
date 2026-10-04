"use client";

import React, { useState } from "react";
import AdminModal, {
  inputClass,
  labelClass,
  primaryButton,
  secondaryButton,
} from "@/components/admin/shared/AdminModal";

export interface TermFormValues {
  sessionName: string;
  termName: string;
  startDate: string;
  endDate: string;
  makeCurrent: boolean;
}

interface TermFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: TermFormValues) => void;
  // When set, we're adding a term to this existing session.
  sessionName?: string;
  suggestedSessionName?: string;
  suggestedTermName: string;
}

const TermFormModal: React.FC<TermFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  sessionName,
  suggestedSessionName = "",
  suggestedTermName,
}) => {
  const isNewSession = !sessionName;
  const [values, setValues] = useState<TermFormValues>({
    sessionName: sessionName ?? suggestedSessionName,
    termName: suggestedTermName,
    startDate: "",
    endDate: "",
    makeCurrent: true,
  });

  const set = <K extends keyof TermFormValues>(key: K, value: TermFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const datesValid =
    values.startDate && values.endDate && values.endDate > values.startDate;
  const canSubmit = values.sessionName.trim() && values.termName.trim() && datesValid;

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={isNewSession ? "Start new session" : `Add term to ${sessionName}`}
      description={
        isNewSession
          ? "Create the session and its first term. You can add the other terms later."
          : "Add the next term to this session."
      }
      footer={
        <>
          <button onClick={onClose} className={secondaryButton}>
            Cancel
          </button>
          <button
            onClick={() => onSubmit(values)}
            disabled={!canSubmit}
            className={primaryButton}
          >
            {isNewSession ? "Create session" : "Add term"}
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        {isNewSession && (
          <div>
            <label className={labelClass}>Session name</label>
            <input
              value={values.sessionName}
              onChange={(e) => set("sessionName", e.target.value)}
              placeholder="e.g. 2026/2027"
              className={inputClass}
            />
          </div>
        )}
        <div>
          <label className={labelClass}>Term</label>
          <select
            value={values.termName}
            onChange={(e) => set("termName", e.target.value)}
            className={inputClass}
          >
            <option>1st Term</option>
            <option>2nd Term</option>
            <option>3rd Term</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Starts</label>
            <input
              type="date"
              value={values.startDate}
              onChange={(e) => set("startDate", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Ends</label>
            <input
              type="date"
              value={values.endDate}
              onChange={(e) => set("endDate", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        {values.startDate && values.endDate && !datesValid && (
          <p className="text-xs text-danger -mt-2">
            End date must be after the start date.
          </p>
        )}
        <label className="flex items-start gap-3 p-3 rounded-lg bg-tint cursor-pointer">
          <input
            type="checkbox"
            checked={values.makeCurrent}
            onChange={(e) => set("makeCurrent", e.target.checked)}
            className="mt-0.5 accent-brand w-4 h-4"
          />
          <span className="text-sm">
            <span className="font-medium text-ink">Make this the active term</span>
            <span className="block text-muted text-xs mt-0.5">
              Teachers will upload reports and results into this term.
            </span>
          </span>
        </label>
      </div>
    </AdminModal>
  );
};

export default TermFormModal;
