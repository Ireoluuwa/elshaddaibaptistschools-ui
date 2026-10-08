"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileCheck2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Period {
  id: string;
  name: string;
  terms: { id: string; name: string; isCurrent: boolean }[];
}

interface ResultCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  periods: Period[];
  activeTermId: string | null;
  isLoadingPeriods: boolean;
}

const ResultCheckerModal: React.FC<ResultCheckerModalProps> = ({
  isOpen,
  onClose,
  periods,
  activeTermId,
  isLoadingPeriods,
}) => {
  const router = useRouter();
  // Empty means "not chosen yet": fall back to the session and term that are current.
  const [sessionId, setSessionId] = useState("");
  const [termId, setTermId] = useState("");

  if (!isOpen) return null;

  const session =
    periods.find((p) => p.id === sessionId) ??
    periods.find((p) => p.terms.some((t) => t.id === activeTermId)) ??
    periods[0];
  const terms = session?.terms ?? [];
  const selectedTermId =
    terms.find((t) => t.id === termId)?.id ??
    terms.find((t) => t.id === activeTermId)?.id ??
    terms[terms.length - 1]?.id ??
    "";

  const selectClass =
    "w-full h-11 px-3 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-[#006442] transition-colors cursor-pointer text-gray-700 font-medium shadow-sm hover:border-gray-300 disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-[#006442] flex items-center justify-between px-6 py-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileCheck2 size={20} />
              Result Checker
            </h2>
            <button
              onClick={onClose}
              className="text-emerald-100 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form */}
          <div className="p-6 flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="result-session" className="text-sm font-bold text-gray-700">
                Session
              </label>
              <select
                id="result-session"
                value={session?.id ?? ""}
                onChange={(e) => {
                  setSessionId(e.target.value);
                  setTermId("");
                }}
                disabled={isLoadingPeriods || periods.length === 0}
                className={selectClass}
              >
                {isLoadingPeriods ? (
                  <option value="">Loading sessions...</option>
                ) : periods.length === 0 ? (
                  <option value="">No sessions available</option>
                ) : (
                  periods.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="result-term" className="text-sm font-bold text-gray-700">
                Term
              </label>
              <select
                id="result-term"
                value={selectedTermId}
                onChange={(e) => setTermId(e.target.value)}
                disabled={isLoadingPeriods || terms.length === 0}
                className={selectClass}
              >
                {isLoadingPeriods ? (
                  <option value="">Loading terms...</option>
                ) : terms.length === 0 ? (
                  <option value="">No terms in this session</option>
                ) : (
                  terms.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <button
              disabled={!selectedTermId}
              onClick={() => {
                onClose();
                router.push(`/report-sheet?termId=${selectedTermId}`);
              }}
              className="mt-2 w-full h-11 px-6 bg-[#006442] hover:bg-[#005236] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-lg flex items-center justify-center transition-all shadow-md active:scale-[0.98]"
            >
              Check Result
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResultCheckerModal;
