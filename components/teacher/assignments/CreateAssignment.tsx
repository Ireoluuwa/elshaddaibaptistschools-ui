"use client";

import React, { useState, useRef } from "react";
import {
  X,
  Upload,
  FileText,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";

interface CreateAssignmentProps {
  onClose: () => void;
}

const CreateAssignment: React.FC<CreateAssignmentProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const canSubmit = title.trim() !== "" && dueDate !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1500);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
          <span className="w-1 h-4 bg-[#006442] rounded-full" />
          New Assignment
        </h2>
        <button
          onClick={onClose}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-5 sm:p-6 flex flex-col gap-5">
        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Assignment Title
          </label>
          <input
            type="text"
            placeholder="e.g. Physics Project: Motion"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white focus:border-[#006442] focus:ring-1 focus:ring-[#006442] outline-none text-sm transition-all placeholder:text-gray-300"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Description
          </label>
          <textarea
            placeholder="Briefly describe the assignment..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:border-[#006442] focus:ring-1 focus:ring-[#006442] outline-none text-sm transition-all placeholder:text-gray-300 resize-none"
          />
        </div>

        {/* Due Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
            <CalendarDays size={12} />
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full sm:w-1/2 h-11 px-4 rounded-lg border border-gray-200 bg-white focus:border-[#006442] outline-none text-sm transition-all text-gray-600 cursor-pointer"
          />
        </div>

        {/* File Upload */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Attachment (optional)
          </label>

          {selectedFile ? (
            <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50/50">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                <FileText size={18} className="text-emerald-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#0e2e1d] truncate">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-400">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex items-center justify-center gap-2 w-full p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/30 hover:border-gray-300 hover:bg-gray-50 text-gray-400 hover:text-gray-500 transition-all cursor-pointer"
            >
              <Upload size={18} />
              <span className="text-sm font-medium">
                Upload document (PDF, DOC, IMG)
              </span>
            </button>
          )}

          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setSelectedFile(e.target.files[0]);
              }
            }}
            className="hidden"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-5 text-sm font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!canSubmit}
            className="h-10 px-6 bg-[#006442] hover:bg-[#005236] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaved ? (
              <>
                <CheckCircle2 size={16} />
                Created!
              </>
            ) : (
              "Create Assignment"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAssignment;
