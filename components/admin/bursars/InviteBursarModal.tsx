"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import AdminModal, {
  inputClass,
  labelClass,
  primaryButton,
  secondaryButton,
} from "@/components/admin/shared/AdminModal";

export interface InviteValues {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
}

interface InviteBursarModalProps {
  takenUsernames: string[];
  onClose: () => void;
  onInvite: (values: InviteValues) => void;
  isSubmitting?: boolean;
}

const suggestUsername = (lastName: string) =>
  lastName.trim() ? `bursar.${lastName.trim().toLowerCase().replace(/[^a-z]/g, "")}` : "";

const InviteBursarModal: React.FC<InviteBursarModalProps> = ({ takenUsernames, onClose, onInvite, isSubmitting = false }) => {
  const [values, setValues] = useState<InviteValues>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
  });
  // Keep suggesting a username from the last name until the admin edits it.
  const [usernameEdited, setUsernameEdited] = useState(false);

  const set = (key: keyof InviteValues, value: string) =>
    setValues((v) => {
      const next = { ...v, [key]: value };
      if (key === "lastName" && !usernameEdited) next.username = suggestUsername(value);
      return next;
    });

  const usernameTaken = takenUsernames.includes(values.username.trim().toLowerCase());
  const canInvite =
    values.firstName.trim() && values.lastName.trim() && values.username.trim() && !usernameTaken;

  return (
    <AdminModal
      isOpen
      onClose={onClose}
      title="Invite a bursar"
      description="We'll create their account and give you sign-in details to share with them."
      footer={
        <>
          <button onClick={onClose} className={secondaryButton}>
            Cancel
          </button>
          <button onClick={() => onInvite(values)} disabled={!canInvite || isSubmitting} className={primaryButton}>
            {isSubmitting && <Loader2 size={16} className="animate-spin" />}
            Create account
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="bursar-first" className={labelClass}>First name</label>
            <input id="bursar-first" value={values.firstName} onChange={(e) => set("firstName", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="bursar-last" className={labelClass}>Last name</label>
            <input id="bursar-last" value={values.lastName} onChange={(e) => set("lastName", e.target.value)} className={inputClass} />
          </div>
        </div>

        <div>
          <label htmlFor="bursar-username" className={labelClass}>Username</label>
          <input
            id="bursar-username"
            value={values.username}
            onChange={(e) => {
              setUsernameEdited(true);
              set("username", e.target.value);
            }}
            placeholder="e.g. bursar.adebayo"
            className={`${inputClass} ${usernameTaken ? "border-danger focus:border-danger" : ""}`}
          />
          <p className={`text-xs mt-1.5 ${usernameTaken ? "text-danger" : "text-muted"}`}>
            {usernameTaken ? "That username is already in use." : "They'll use this to sign in."}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="bursar-email" className={labelClass}>
              Email <span className="font-normal text-muted">(optional)</span>
            </label>
            <input id="bursar-email" type="email" value={values.email} onChange={(e) => set("email", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="bursar-phone" className={labelClass}>
              Phone <span className="font-normal text-muted">(optional)</span>
            </label>
            <input id="bursar-phone" type="tel" value={values.phoneNumber} onChange={(e) => set("phoneNumber", e.target.value)} className={inputClass} />
          </div>
        </div>
      </div>
    </AdminModal>
  );
};

export default InviteBursarModal;
