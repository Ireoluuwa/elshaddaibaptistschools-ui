"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import AdminModal, {
  inputClass,
  labelClass,
  primaryButton,
  secondaryButton,
} from "@/components/admin/shared/AdminModal";
import { useStaffAccountActions } from "@/hooks/admin-staff.hooks";
import { apiErrorMessage } from "@/lib/api-error";
import { toast } from "@/store/toast.store";
import type { UpdateStaffPayload } from "@/types/admin-staff.types";

export interface EditableStaff {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phoneNumber: string | null;
  address?: string | null;
}

interface EditStaffModalProps {
  role: "teacher" | "bursar";
  account: EditableStaff;
  onClose: () => void;
}

const EditStaffModal: React.FC<EditStaffModalProps> = ({ role, account, onClose }) => {
  const { update } = useStaffAccountActions(role);
  const initial = {
    firstName: account.firstName,
    lastName: account.lastName,
    username: account.username,
    email: account.email ?? "",
    phoneNumber: account.phoneNumber ?? "",
    address: account.address ?? "",
  };
  const [form, setForm] = useState(initial);
  const set = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const changes: UpdateStaffPayload = {};
  if (form.firstName.trim() !== initial.firstName) changes.firstName = form.firstName.trim();
  if (form.lastName.trim() !== initial.lastName) changes.lastName = form.lastName.trim();
  if (form.username.trim() !== initial.username) changes.username = form.username.trim();
  if (form.email.trim() !== initial.email) changes.email = form.email.trim() || null;
  if (form.phoneNumber.trim() !== initial.phoneNumber) changes.phoneNumber = form.phoneNumber.trim() || null;
  if (role === "teacher" && form.address.trim() !== initial.address) changes.address = form.address.trim() || null;

  const hasChanges = Object.keys(changes).length > 0;
  const valid = !!form.firstName.trim() && !!form.username.trim();

  const handleSave = async () => {
    try {
      await update.mutateAsync({ id: account.id, payload: changes });
      toast.success("Details saved", `${form.firstName} ${form.lastName}`.trim());
      onClose();
    } catch (err) {
      toast.error("Couldn't save details", apiErrorMessage(err));
    }
  };

  return (
    <AdminModal
      isOpen
      onClose={update.isPending ? () => {} : onClose}
      title="Edit details"
      footer={
        <>
          <button onClick={onClose} disabled={update.isPending} className={secondaryButton}>
            Cancel
          </button>
          <button onClick={handleSave} disabled={!hasChanges || !valid || update.isPending} className={primaryButton}>
            {update.isPending && <Loader2 size={16} className="animate-spin" />}
            Save details
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="s-first" className={labelClass}>First name</label>
            <input id="s-first" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="s-last" className={labelClass}>Last name</label>
            <input id="s-last" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} className={inputClass} />
          </div>
        </div>

        <div>
          <label htmlFor="s-username" className={labelClass}>Username</label>
          <input id="s-username" value={form.username} onChange={(e) => set("username", e.target.value)} className={inputClass} />
          {changes.username && (
            <p className="text-xs text-clay mt-1.5">They&apos;ll need to sign in with the new username.</p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="s-email" className={labelClass}>
              Email <span className="font-normal text-muted">(optional)</span>
            </label>
            <input id="s-email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="s-phone" className={labelClass}>
              Phone <span className="font-normal text-muted">(optional)</span>
            </label>
            <input id="s-phone" type="tel" value={form.phoneNumber} onChange={(e) => set("phoneNumber", e.target.value)} className={inputClass} />
          </div>
        </div>

        {role === "teacher" && (
          <div>
            <label htmlFor="s-address" className={labelClass}>
              Address <span className="font-normal text-muted">(optional)</span>
            </label>
            <input id="s-address" value={form.address} onChange={(e) => set("address", e.target.value)} className={inputClass} />
          </div>
        )}
      </div>
    </AdminModal>
  );
};

export default EditStaffModal;
