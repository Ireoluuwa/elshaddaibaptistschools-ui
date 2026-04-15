"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  FileSpreadsheet,
  Download,
  CheckCircle2,
  AlertCircle,
  X,
  Info,
} from "lucide-react";
import { csvRequirements } from "@/constants/teacher/students.constants";

const BatchUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith(".csv")) {
        setSelectedFile(file);
        setIsComplete(false);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setIsComplete(false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setIsComplete(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleProcess = () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Section Header */}
      <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
            <span className="w-1 h-4 bg-[#006442] rounded-full" />
            Batch Upload
          </h2>
          <p className="text-xs text-gray-400 mt-1 ml-3">
            Import students via a standard CSV file.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#006442] bg-[#f0f7f4] hover:bg-[#006442]/10 rounded-lg transition-all"
        >
          <Download size={14} />
          Download Template
        </button>
      </div>

      <div className="p-6 flex flex-col gap-6">
        {/* Drag & Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center gap-3 p-10 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
            dragActive
              ? "border-[#006442] bg-[#f0f7f4]"
              : selectedFile
              ? "border-emerald-300 bg-emerald-50/50"
              : "border-gray-200 bg-gray-50/30 hover:border-gray-300 hover:bg-gray-50"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />

          {selectedFile ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <FileSpreadsheet size={20} className="text-emerald-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#0e2e1d]">
                  {selectedFile.name}
                </span>
                <span className="text-xs text-gray-400">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile();
                }}
                className="ml-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <>
              <div className="w-14 h-14 rounded-full bg-[#f0f7f4] flex items-center justify-center">
                <Upload size={24} className="text-[#006442]" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-[#0e2e1d]">
                  Drop your CSV file here
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  or click to browse from your computer
                </p>
              </div>
            </>
          )}
        </div>

        {/* CSV Requirements */}
        <div className="flex flex-col gap-2.5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
            <Info size={12} />
            CSV Requirements
          </h3>
          <div className="flex flex-col gap-1.5">
            {csvRequirements.map((req, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <AlertCircle size={12} className="text-orange-400 shrink-0" />
                <span className="text-gray-500 font-medium">{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Success Message */}
        {isComplete && (
          <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-emerald-800">
                Upload Complete
              </span>
              <span className="text-xs text-emerald-600">
                Students have been successfully imported and enrolled.
              </span>
            </div>
          </div>
        )}

        {/* Process Button */}
        <div className="flex justify-end pt-4 mt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={handleProcess}
            disabled={!selectedFile || isProcessing}
            className="h-11 px-8 bg-[#006442] hover:bg-[#005236] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : isComplete ? (
              <>
                <CheckCircle2 size={16} />
                Upload Complete
              </>
            ) : (
              <>
                <Upload size={16} />
                Process Batch
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BatchUpload;
