"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import AdminModal, {
  inputClass,
  labelClass,
  primaryButton,
  secondaryButton,
} from "@/components/admin/shared/AdminModal";
import { useAddClass } from "@/hooks/curriculum.hooks";
import { apiErrorMessage } from "@/lib/api-error";
import { toast } from "@/store/toast.store";
import type { SchoolClass } from "@/types/curriculum.types";

interface AddClassModalProps {
  existing: string[];
  onClose: () => void;
  onAdded: (schoolClass: SchoolClass) => void;
}

const AddClassModal: React.FC<AddClassModalProps> = ({ existing, onClose, onAdded }) => {
  const [name, setName] = useState("");
  const [isSenior, setIsSenior] = useState(false);
  const { mutateAsync, isPending } = useAddClass();

  const trimmed = name.trim().toUpperCase();
  const taken = existing.some((c) => c.toUpperCase() === trimmed);

  const handleAdd = async () => {
    try {
      onAdded(await mutateAsync({ name: trimmed, isSenior }));
    } catch (err) {
      toast.error("Couldn't add class", apiErrorMessage(err));
    }
  };

  return (
    <AdminModal
      isOpen
      onClose={onClose}
      title="Add a class"
      footer={
        <>
          <button onClick={onClose} className={secondaryButton}>Cancel</button>
          <button onClick={handleAdd} disabled={!trimmed || taken || isPending} className={primaryButton}>
            {isPending && <Loader2 size={16} className="animate-spin" />}
            Add class
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="class-name" className={labelClass}>Class name</label>
          <input
            id="class-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. JSS1"
            className={`${inputClass} ${taken ? "border-danger" : ""}`}
            autoFocus
          />
          {taken && <p className="text-xs text-danger mt-1.5">That class already exists.</p>}
        </div>
        <label className="flex items-start gap-3 p-3 rounded-lg bg-tint cursor-pointer">
          <input
            type="checkbox"
            checked={isSenior}
            onChange={(e) => setIsSenior(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-brand"
          />
          <span className="text-sm">
            <span className="font-medium text-ink">Senior class</span>
            <span className="block text-xs text-muted mt-0.5">
              Students choose a department (Science, Art, Commercial) and take different subjects.
            </span>
          </span>
        </label>
      </div>
    </AdminModal>
  );
};

export default AddClassModal;
