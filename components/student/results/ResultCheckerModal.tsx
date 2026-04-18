"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileCheck2 } from "lucide-react";
import { academicYears, terms } from "@/constants/teacher/results.constants";
import { useRouter } from "next/navigation";

interface ResultCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResultCheckerModal: React.FC<ResultCheckerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();

  if (!isOpen) return null;

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

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header Theme - Forest Green */}
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

          {/* Form Content */}
          <div className="p-6 flex flex-col gap-5">
            {/* Session Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-700">Session</label>
              <select
                defaultValue="2023/2024"
                className="w-full h-11 px-3 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-[#006442] transition-colors cursor-pointer text-gray-700 font-medium shadow-sm hover:border-gray-300"
              >
                {academicYears.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Term Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-700">Select Term</label>
              <select
                defaultValue="1st Term"
                className="w-full h-11 px-3 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-[#006442] transition-colors cursor-pointer text-gray-700 font-medium shadow-sm hover:border-gray-300"
              >
                {terms.map((term) => (
                  <option key={term} value={term}>{term}</option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button 
              onClick={() => {
                onClose();
                router.push("/report-sheet");
              }}
              className="mt-2 w-full h-11 px-6 bg-[#006442] hover:bg-[#005236] text-white text-sm font-bold rounded-lg flex items-center justify-center transition-all shadow-md active:scale-[0.98]"
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
