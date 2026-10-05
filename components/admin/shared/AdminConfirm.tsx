"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import AdminModal, { dangerButton, primaryButton, secondaryButton } from "./AdminModal";

interface AdminConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: React.ReactNode;
  confirmText: string;
  danger?: boolean;
  isPending?: boolean;
}

const AdminConfirm: React.FC<AdminConfirmProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  danger,
  isPending = false,
}) => (
  <AdminModal
    isOpen={isOpen}
    onClose={isPending ? () => {} : onClose}
    title={title}
    footer={
      <>
        <button onClick={onClose} disabled={isPending} className={secondaryButton}>
          Cancel
        </button>
        <button onClick={onConfirm} disabled={isPending} className={danger ? dangerButton : primaryButton}>
          {isPending && <Loader2 size={16} className="animate-spin" />}
          {confirmText}
        </button>
      </>
    }
  >
    <div className="text-sm text-muted leading-relaxed">{message}</div>
  </AdminModal>
);

export default AdminConfirm;
