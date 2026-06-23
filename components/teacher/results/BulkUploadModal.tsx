"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, UploadCloud, AlertCircle, CheckCircle2 } from "lucide-react";
import * as XLSX from "xlsx";
import { useUpsertResult } from "@/hooks/result.hooks";

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string;
  studentName: string;
  termId: string;
  subjects: string[];
}

const BulkUploadModal: React.FC<BulkUploadModalProps> = ({
  isOpen,
  onClose,
  studentId,
  studentName,
  termId,
  subjects,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const { mutate: upsertResult, isPending } = useUpsertResult();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      setFile(e.dataTransfer.files[0]);
      setParseError(null);
      setSaved(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setParseError(null);
      setSaved(false);
    }
  };

  // Template: one row per subject, subject column pre-filled (locked by convention)
  // Columns: Subject | Test 1 (/15) | Test 2 (/15) | Exam (/70)
  const handleDownloadTemplate = () => {
    // Metadata rows at the top so the teacher knows whose sheet this is
    const metaRows = [
      ["Student:", studentName],
      ["Student ID:", studentId],
      ["Term ID:", termId],
      [],
      ["Subject", "Test 1 (/15)", "Test 2 (/15)", "Exam (/70)"],
    ];

    const subjectRows = subjects.map((name) => [name, "", "", ""]);

    const ws = XLSX.utils.aoa_to_sheet([...metaRows, ...subjectRows]);

    ws["!cols"] = [
      { wch: 30 }, // Subject
      { wch: 14 }, // Test 1
      { wch: 14 }, // Test 2
      { wch: 12 }, // Exam
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Result");
    XLSX.writeFile(wb, `result-${studentName.replace(/\s+/g, "-").toLowerCase()}.xlsx`);
  };

  const handleProcess = () => {
    if (!file || !termId) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      // Sheet has 4 metadata rows then a header row (row index 4), then subject rows
      // We read from row 5 onwards (0-indexed: rows 0-3 = metadata, row 4 = header)
      const allRows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Find the header row (the one that starts with "Subject")
      const headerRowIndex = allRows.findIndex(
        (row) => String(row[0] ?? "").trim().toLowerCase() === "subject"
      );

      if (headerRowIndex === -1) {
        setParseError("Could not find the Subject column header. Make sure you are using the downloaded template.");
        return;
      }

      const dataRows = allRows.slice(headerRowIndex + 1);

      const scores = dataRows
        .filter((row) => row[0] && String(row[0]).trim())
        .map((row) => ({
          subjectName: String(row[0]).trim(),
          test1: Number(row[1]) || 0,
          test2: Number(row[2]) || 0,
          exam: Number(row[3]) || 0,
        }));

      if (scores.length === 0) {
        setParseError("No subject rows found in the file. Fill in at least one subject row.");
        return;
      }

      upsertResult(
        { studentId, termId, scores, daysAttended: 0, totalDays: 65, status: "DRAFT" },
        {
          onSuccess: () => {
            setSaved(true);
            setFile(null);
          },
          onError: (err: any) => {
            const msg =
              err?.response?.data?.message?.message ||
              err?.response?.data?.message ||
              "Upload failed. Check that all subject names match the curriculum exactly.";
            setParseError(typeof msg === "string" ? msg : JSON.stringify(msg));
          },
        }
      );
    };

    reader.readAsArrayBuffer(file);
  };

  const handleClose = () => {
    setFile(null);
    setParseError(null);
    setSaved(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative bg-white rounded-2xl sm:rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center p-4 sm:p-6 border-b border-gray-100 gap-3 shrink-0">
            <button
              onClick={handleClose}
              className="p-2 -ml-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Bulk Upload Results</h2>
              <p className="text-xs text-gray-400 font-medium mt-0.5">{studentName}</p>
            </div>
          </div>

          <div className="p-4 sm:p-6 overflow-y-auto">
            {saved ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <CheckCircle2 size={48} className="text-emerald-500" />
                <p className="text-lg font-bold text-gray-900">Result saved successfully</p>
                <p className="text-sm text-gray-400">
                  Scores for <span className="font-semibold text-gray-600">{studentName}</span> have been saved as a draft.
                </p>
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-[#006442] text-white text-sm font-bold rounded-xl"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                {/* Step 1: Download Template */}
                <div className="bg-[#e8fbf3] rounded-2xl p-4 sm:p-5 mb-6 border border-emerald-100">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 hidden sm:flex items-center justify-center text-emerald-600 shrink-0">
                      <Download size={20} />
                    </div>
                    <div className="w-full">
                      <h3 className="text-sm font-bold text-gray-900 mb-1">1. Download Template</h3>
                      <p className="text-xs text-gray-600 leading-relaxed mb-4">
                        Download the pre-filled sheet for <span className="font-semibold">{studentName}</span>. Subject names are fixed — only fill in the score columns.
                      </p>
                      <button
                        onClick={handleDownloadTemplate}
                        disabled={subjects.length === 0}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200 hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                      >
                        <Download size={14} />
                        Download Excel Template
                      </button>
                      {subjects.length === 0 && (
                        <p className="text-[11px] text-orange-500 mt-2">
                          No subjects found for this student&apos;s class. Set up curriculum mappings first.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="relative flex items-center justify-center mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-100" />
                  </div>
                  <span className="relative bg-white px-4 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                    Then Upload
                  </span>
                </div>

                {/* Step 2: Upload */}
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">2. Upload Completed Sheet</h3>
                  <div
                    className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-colors ${
                      dragActive
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-gray-200 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      accept=".xlsx,.xls"
                      onChange={handleChange}
                    />
                    <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mx-auto mb-4">
                      <UploadCloud size={28} />
                    </div>
                    {file ? (
                      <div className="text-sm font-bold text-emerald-700 mb-4">{file.name}</div>
                    ) : (
                      <>
                        <p className="text-sm font-bold text-gray-700 mb-1">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-400 mb-5 tracking-wide">XLSX, XLS (Max. 10MB)</p>
                      </>
                    )}
                    <label
                      htmlFor="file-upload"
                      className="inline-flex cursor-pointer items-center justify-center px-6 py-2.5 bg-[#006442] hover:bg-[#004e33] text-white text-sm font-bold rounded-lg transition-colors shadow-md"
                    >
                      {file ? "Change File" : "Select File"}
                    </label>
                  </div>
                </div>

                {/* Error */}
                {parseError && (
                  <div className="mb-6 flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
                    <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <p className="text-xs font-semibold text-red-700 leading-relaxed">{parseError}</p>
                  </div>
                )}

                {/* Warning */}
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex gap-3">
                  <AlertCircle size={18} className="text-orange-500 shrink-0 mt-0.5" />
                  <p className="text-xs font-semibold text-orange-800 leading-relaxed">
                    Uploading will overwrite any existing scores for this student in the selected term.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          {!saved && (
            <div className="p-4 border-t border-gray-100 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 bg-gray-50/50 shrink-0">
              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-5 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleProcess}
                disabled={!file || isPending}
                className="w-full sm:w-auto px-6 py-2.5 text-sm font-bold text-white bg-[#006442] hover:bg-[#005236] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors shadow-sm"
              >
                {isPending ? "Processing..." : "Process Upload"}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BulkUploadModal;
