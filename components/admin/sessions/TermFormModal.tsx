"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertTriangle, Loader2 } from "lucide-react";
import AdminModal, {
  inputClass,
  labelClass,
  primaryButton,
  secondaryButton,
} from "@/components/admin/shared/AdminModal";
import { usePromotionSummary } from "@/hooks/promotions.hooks";
import type { TermName } from "@/types/session.types";

export interface TermFormValues {
  sessionName: string;
  termName: TermName;
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
  suggestedTermName: TermName;
  isSubmitting?: boolean;
}

const TermFormModal: React.FC<TermFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  sessionName,
  suggestedSessionName = "",
  suggestedTermName,
  isSubmitting = false,
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

  // Starting a session moves students into their new classes, so warn about
  // any class whose promotion hasn't been done yet.
  const { data: summary } = usePromotionSummary();
  const classesWithStudents = (summary?.classes ?? []).filter((c) => c.students > 0);
  const notPromoted = isNewSession
    ? classesWithStudents.filter((c) => !c.done).map((c) => c.className)
    : [];
  const [acknowledged, setAcknowledged] = useState(false);

  const datesValid =
    values.startDate && values.endDate && values.endDate > values.startDate;
  const canSubmit =
    values.sessionName.trim() &&
    values.termName.trim() &&
    datesValid &&
    !isSubmitting &&
    (notPromoted.length === 0 || acknowledged);

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
            {isSubmitting && <Loader2 size={16} className="animate-spin" />}
            {isSubmitting ? "Saving…" : isNewSession ? "Create session" : "Add term"}
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        {notPromoted.length > 0 && (
          <div className="rounded-lg bg-clay-soft border-l-4 border-clay px-4 py-3">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink">
              <AlertTriangle size={16} className="text-clay shrink-0" />
              {notPromoted.length === classesWithStudents.length
                ? "No classes have been promoted yet"
                : `${notPromoted.length} ${notPromoted.length === 1 ? "class hasn't" : "classes haven't"} been promoted`}
            </p>
            <p className="text-sm text-ink/80 mt-1">
              {notPromoted.join(", ")}. Students in{" "}
              {notPromoted.length === 1 ? "this class" : "these classes"} will stay where they are in
              the new session.{" "}
              <Link href="/portal/admin/promotion" className="font-semibold text-brand underline underline-offset-2">
                Go to Promotion
              </Link>
            </p>
            <label className="flex items-center gap-2 mt-3 text-sm text-ink cursor-pointer select-none">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
                className="w-4 h-4 accent-brand"
              />
              Start the new session anyway
            </label>
          </div>
        )}
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
            onChange={(e) => set("termName", e.target.value as TermName)}
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
