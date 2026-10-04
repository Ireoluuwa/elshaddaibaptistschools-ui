"use client";

import React from "react";
import AdminModal, { dangerButton, primaryButton, secondaryButton } from "./AdminModal";

interface AdminConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: React.ReactNode;
  confirmText: string;
  danger?: boolean;
}

const AdminConfirm: React.FC<AdminConfirmProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  danger,
}) => (
  <AdminModal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    footer={
      <>
        <button onClick={onClose} className={secondaryButton}>
          Cancel
        </button>
        <button onClick={onConfirm} className={danger ? dangerButton : primaryButton}>
          {confirmText}
        </button>
      </>
    }
  >
    <div className="text-sm text-muted leading-relaxed">{message}</div>
  </AdminModal>
);

export default AdminConfirm;
