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
  wide?: boolean;
}

const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  wide,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <div className={`relative w-full ${wide ? "sm:max-w-3xl" : "sm:max-w-lg"} max-h-[92dvh] flex flex-col bg-white rounded-t-xl sm:rounded-xl shadow-xl`}>
        <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4 border-b border-line">
          <div>
            <h3 className="text-base font-semibold text-ink">{title}</h3>
            {description && <p className="text-sm text-muted mt-0.5">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1 -mr-1 text-muted hover:text-ink rounded-md transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5 overflow-y-auto custom-scrollbar">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-line">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminModal;

export const inputClass =
  "w-full h-10 px-3 rounded-lg border border-line focus:border-brand focus:ring-2 focus:ring-brand/15 outline-none text-sm text-ink bg-white transition-colors placeholder:text-muted/60";

export const labelClass = "block text-sm font-medium text-ink mb-1.5";

export const primaryButton =
  "h-10 px-4 inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap text-sm font-semibold text-white bg-brand hover:bg-brand-dark rounded-lg transition-colors disabled:opacity-40 disabled:pointer-events-none";

export const secondaryButton =
  "h-10 px-4 inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap text-sm font-semibold text-ink bg-white border border-line hover:border-ink/30 rounded-lg transition-colors";

export const dangerButton =
  "h-10 px-4 inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap text-sm font-semibold text-white bg-danger hover:bg-danger/90 rounded-lg transition-colors";

// Plain white surface used for every panel in the admin portal.
export const panelClass = "bg-white rounded-xl border border-line";
