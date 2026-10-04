"use client";

import React from "react";
import { X } from "lucide-react";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg max-h-[90dvh] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-100">
        <div className="flex items-start justify-between gap-4 p-6 pb-4">
          <div>
            <h3 className="text-lg font-bold text-secondary">{title}</h3>
            {description && (
              <p className="text-sm text-gray-400 mt-1">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-6 pb-6 overflow-y-auto custom-scrollbar">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminModal;

export const inputClass =
  "w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-[#006442] focus:ring-1 focus:ring-[#006442] outline-none text-sm transition-all bg-white";

export const labelClass =
  "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5";

export const primaryButton =
  "h-10 px-5 inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-primary hover:bg-secondary rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

export const secondaryButton =
  "h-10 px-5 inline-flex items-center justify-center gap-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all";
