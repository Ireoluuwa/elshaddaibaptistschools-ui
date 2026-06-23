"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, UploadCloud, AlertCircle, CheckCircle2 } from "lucide-react";
import * as XLSX from "xlsx";
import { useBulkUpsertResults, useResultsDashboardInit } from "@/hooks/result.hooks";
import { BulkUploadError, UpsertResultPayload } from "@/types/result";

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  termId: string;
}

const BulkUploadModal: React.FC<BulkUploadModalProps> = ({ isOpen, onClose, termId }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [validationErrors, setValidationErrors] = useState<BulkUploadError[]>([]);
  const [successCount, setSuccessCount] = useState<number | null>(null);

  const { data: init } = useResultsDashboardInit();
  const { mutate: bulkUpload, isPending } = useBulkUpsertResults();

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
      setValidationErrors([]);
      setSuccessCount(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setValidationErrors([]);
      setSuccessCount(null);
    }
  };

  const handleDownloadTemplate = () => {
    const students = init?.students ?? [];

    // Build rows: one per student (teacher fills in subjects manually or they load via API)
    // Template columns: Student Name | Student ID | Subject | Test 1 | Test 2 | Exam
    const rows = students.flatMap((s) => [
      { "Student Name": s.name, "Student ID": s.id, Subject: "", "Test 1": "", "Test 2": "", Exam: "" },
    ]);

    const ws = XLSX.utils.json_to_sheet(rows);

    // Lock the Student Name, Student ID columns (cols 0 and 1) by setting protection
    // SheetJS CE doesn't support cell-level protection natively, but we can set column widths
    // and add a note to the header row as a convention
    ws["!cols"] = [
      { wch: 25 }, // Student Name
      { wch: 15 }, // Student ID
      { wch: 28 }, // Subject
      { wch: 10 }, // Test 1
      { wch: 10 }, // Test 2
      { wch: 10 }, // Exam
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Results");
    XLSX.writeFile(wb, "results-template.xlsx");
  };

  const handleProcess = () => {
    if (!file || !termId) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows: any[] = XLSX.utils.sheet_to_json(sheet);

      // Group rows by studentId
      const grouped: Record<string, UpsertResultPayload> = {};

      for (const row of rows) {
        const studentId = String(row["Student ID"] ?? "").trim();
        const subjectName = String(row["Subject"] ?? "").trim();
        const test1 = Number(row["Test 1"]) || 0;
        const test2 = Number(row["Test 2"]) || 0;
        const exam = Number(row["Exam"]) || 0;

        if (!studentId || !subjectName) continue;

        if (!grouped[studentId]) {
          grouped[studentId] = {
            studentId,
            termId,
            scores: [],
            daysAttended: 0,
            totalDays: 65,
            status: "DRAFT",
          };
        }

        grouped[studentId].scores.push({ subjectName, test1, test2, exam });
      }

      const results = Object.values(grouped);

      if (results.length === 0) return;

      bulkUpload(
        { results },
        {
          onSuccess: (res) => {
            setSuccessCount(res.saved);
            setFile(null);
          },
          onError: (err: any) => {
            const apiErrors: BulkUploadError[] =
              err?.response?.data?.message?.errors ??
              err?.response?.data?.errors ??
              [];
            setValidationErrors(apiErrors);
          },
        }
      );
    };

    reader.readAsArrayBuffer(file);
  };

  const handleClose = () => {
    setFile(null);
    setValidationErrors([]);
    setSuccessCount(null);
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
            <h2 className="text-xl font-bold text-gray-900">Bulk Upload Results</h2>
          </div>

          <div className="p-4 sm:p-6 overflow-y-auto">
            {/* Success State */}
            {successCount !== null ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <CheckCircle2 size={48} className="text-emerald-500" />
                <p className="text-lg font-bold text-gray-900">
                  {successCount} result{successCount !== 1 ? "s" : ""} saved successfully
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
                      <h3 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-2">
                        <span className="sm:hidden text-emerald-600"><Download size={16} /></span>
                        1. Download Template
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed mb-4">
                        Download the pre-filled template with your class students. Fill in subject names and scores, then upload.
                      </p>
                      <button
                        onClick={handleDownloadTemplate}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors shadow-sm"
                      >
                        <Download size={14} />
                        Download Excel Template
                      </button>
                    </div>
                  </div>
                </div>

                <div className="relative flex items-center justify-center mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-100" />
                  </div>
                  <span className="relative bg-white px-4 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                    And Then
                  </span>
                </div>

                {/* Step 2: Upload */}
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">2. Upload Results</h3>
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

                {/* Validation Errors */}
                {validationErrors.length > 0 && (
                  <div className="mb-6 bg-red-50 border border-red-100 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle size={16} className="text-red-500 shrink-0" />
                      <p className="text-sm font-bold text-red-700">Upload failed — fix these subject names:</p>
                    </div>
                    <div className="max-h-40 overflow-y-auto flex flex-col gap-1.5">
                      {validationErrors.map((err, i) => (
                        <div key={i} className="text-xs text-red-700 bg-red-100 rounded-lg px-3 py-1.5">
                          <span className="font-bold">{err.studentName}</span>: &quot;{err.subjectName}&quot; → expected &quot;{err.expected}&quot;
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Warning */}
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex gap-3">
                  <AlertCircle size={18} className="text-orange-500 shrink-0 mt-0.5" />
                  <p className="text-xs font-semibold text-orange-800 leading-relaxed">
                    Uploading will overwrite existing entries for the students in the sheet.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          {successCount === null && (
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
