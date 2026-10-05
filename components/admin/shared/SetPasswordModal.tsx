"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Loader2, Wand2 } from "lucide-react";
import AdminModal, {
  inputClass,
  labelClass,
  primaryButton,
  secondaryButton,
} from "@/components/admin/shared/AdminModal";
import { useSetStudentPassword } from "@/hooks/admin-students.hooks";
import { apiErrorMessage } from "@/lib/api-error";
import { generatePassword } from "@/lib/password";
import { toast } from "@/store/toast.store";

const MIN_LENGTH = 6;

interface SetPasswordModalProps {
  studentId: string;
  studentName: string;
  onClose: () => void;
  onChanged: (credentials: { username: string; password: string }) => void;
}

const SetPasswordModal: React.FC<SetPasswordModalProps> = ({ studentId, studentName, onClose, onChanged }) => {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const { mutateAsync, isPending } = useSetStudentPassword();

  const tooShort = password.length > 0 && password.length < MIN_LENGTH;
  const canSave = password.length >= MIN_LENGTH && !isPending;

  const handleSave = async () => {
    try {
      const { username } = await mutateAsync({ id: studentId, newPassword: password });
      onChanged({ username, password });
    } catch (err) {
      toast.error("Couldn't change password", apiErrorMessage(err));
    }
  };

  return (
    <AdminModal
      isOpen
      onClose={isPending ? () => {} : onClose}
      title="Change password"
      description={`Set a new password for ${studentName}. Their old password stops working.`}
      footer={
        <>
          <button onClick={onClose} disabled={isPending} className={secondaryButton}>
            Cancel
          </button>
          <button onClick={handleSave} disabled={!canSave} className={primaryButton}>
            {isPending && <Loader2 size={16} className="animate-spin" />}
            {isPending ? "Saving…" : "Change password"}
          </button>
        </>
      }
    >
      <label htmlFor="new-student-password" className={labelClass}>
        New password
      </label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            id="new-student-password"
            type={show ? "text" : "password"}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && canSave && handleSave()}
            className={`${inputClass} pr-10 font-mono`}
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-muted hover:text-ink"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            setPassword(generatePassword());
            setShow(true);
          }}
          className="h-10 px-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:bg-tint rounded-lg transition-colors shrink-0"
        >
          <Wand2 size={15} /> Generate
        </button>
      </div>
      <p className={`text-xs mt-1.5 ${tooShort ? "text-clay" : "text-muted"}`}>
        {tooShort ? `${MIN_LENGTH - password.length} more characters needed` : `At least ${MIN_LENGTH} characters.`}
      </p>
    </AdminModal>
  );
};

export default SetPasswordModal;
