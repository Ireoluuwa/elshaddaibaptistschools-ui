"use client";

import React, { useState, useEffect } from "react";
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
  const [selectedTermId, setSelectedTermId] = useState("");

  // Default to active term once data arrives
  useEffect(() => {
    if (activeTermId && !selectedTermId) {
      setSelectedTermId(activeTermId);
    }
  }, [activeTermId]);

  if (!isOpen) return null;

  const allTerms = periods.flatMap((year) =>
    year.terms.map((term) => ({
      termId: term.id,
      label: `${year.name} — ${term.name}`,
    }))
  );

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
              <label className="text-sm font-bold text-gray-700">Select Term</label>
              <select
                value={selectedTermId}
                onChange={(e) => setSelectedTermId(e.target.value)}
                disabled={isLoadingPeriods}
                className="w-full h-11 px-3 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-[#006442] transition-colors cursor-pointer text-gray-700 font-medium shadow-sm hover:border-gray-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoadingPeriods ? (
                  <option value="">Loading periods...</option>
                ) : allTerms.length === 0 ? (
                  <option value="">No terms available</option>
                ) : (
                  allTerms.map((t) => (
                    <option key={t.termId} value={t.termId}>
                      {t.label}
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
