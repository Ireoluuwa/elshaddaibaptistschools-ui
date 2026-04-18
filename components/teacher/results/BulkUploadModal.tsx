"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, UploadCloud, AlertCircle } from "lucide-react";

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BulkUploadModal: React.FC<BulkUploadModalProps> = ({ isOpen, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

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
          className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Bulk Upload Results</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[80vh]">
            {/* Step 1: Download Template */}
            <div className="bg-[#e8fbf3] rounded-2xl p-5 mb-8 border border-emerald-100">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <Download size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">1. Download Template</h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    Ensure your data is formatted correctly. Download our standard Excel template and fill in the student results before uploading.
                  </p>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors shadow-sm">
                    <Download size={14} />
                    Download Excel Template
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <span className="relative bg-white px-4 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                And Then
              </span>
            </div>

            {/* Step 2: Upload Results */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-900 mb-3">2. Upload Results</h3>
              <div
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
                  dragActive ? "border-emerald-500 bg-emerald-50" : "border-gray-200 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-300"
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
                  accept=".xlsx, .xls"
                  onChange={handleChange}
                />
                
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mx-auto mb-4">
                  <UploadCloud size={28} />
                </div>
                
                {file ? (
                  <div className="text-sm font-bold text-emerald-700 mb-1">{file.name}</div>
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

            {/* Warning Box */}
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex gap-3">
              <AlertCircle size={18} className="text-orange-500 shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-orange-800 leading-relaxed">
                Uploading will overwrite existing entries for the students in the sheet.
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              disabled={!file}
              className="px-6 py-2.5 text-sm font-bold text-white bg-[#65a990] hover:bg-[#528a75] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors shadow-sm"
            >
              Process Upload
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BulkUploadModal;
