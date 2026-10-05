"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import AdminModal, { primaryButton } from "./AdminModal";

interface CredentialsModalProps {
  title: string;
  name: string;
  username: string;
  password: string;
  onClose: () => void;
  description?: string;
}

// Shows a new temporary password once, with a one-click copy of the full message.
const CredentialsModal: React.FC<CredentialsModalProps> = ({
  title,
  name,
  username,
  password,
  onClose,
  description = "Share these privately. The password won't be shown again.",
}) => {
  const [copied, setCopied] = useState(false);

  const message =
    `Here are the El-Shaddai portal sign-in details for ${name}.\n` +
    `Username: ${username}\nPassword: ${password}\n` +
    `Sign in at ${typeof window !== "undefined" ? window.location.origin : ""}/auth/login`;

  const copy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AdminModal
      isOpen
      onClose={onClose}
      title={title}
      description={description}
      footer={
        <button onClick={onClose} className={primaryButton}>
          Done
        </button>
      }
    >
      <dl className="rounded-lg border border-line divide-y divide-line text-sm">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <dt className="text-muted">Username</dt>
          <dd className="font-semibold text-ink">{username}</dd>
        </div>
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <dt className="text-muted">Temporary password</dt>
          <dd className="font-semibold text-ink font-mono tracking-wider">{password}</dd>
        </div>
      </dl>
      <button
        onClick={copy}
        className={`mt-3 w-full h-10 inline-flex items-center justify-center gap-2 text-sm font-semibold rounded-lg border transition-colors ${
          copied ? "border-brand text-brand bg-tint" : "border-line text-ink hover:border-ink/30"
        }`}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? "Copied — paste it into WhatsApp or SMS" : "Copy sign-in message"}
      </button>
    </AdminModal>
  );
};

export default CredentialsModal;
