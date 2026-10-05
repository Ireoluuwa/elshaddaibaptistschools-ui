"use client";

import React, { useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
import AdminModal, { inputClass, primaryButton } from "@/components/admin/shared/AdminModal";
import { useAddDepartment, useDepartments, useRemoveDepartment } from "@/hooks/curriculum.hooks";
import { apiErrorMessage } from "@/lib/api-error";
import { toast } from "@/store/toast.store";

const DepartmentsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { data: departments = [], isLoading } = useDepartments();
  const addDepartment = useAddDepartment();
  const removeDepartment = useRemoveDepartment();
  const [name, setName] = useState("");

  const trimmed = name.trim();
  const taken = departments.some((d) => d.name.toLowerCase() === trimmed.toLowerCase());

  const add = async () => {
    if (!trimmed || taken || addDepartment.isPending) return;
    try {
      await addDepartment.mutateAsync(trimmed);
      setName("");
    } catch (err) {
      toast.error("Couldn't add department", apiErrorMessage(err));
    }
  };

  const remove = async (id: string, label: string) => {
    try {
      await removeDepartment.mutateAsync(id);
      toast.success("Department removed", label);
    } catch (err) {
      toast.error(`Couldn't remove ${label}`, apiErrorMessage(err));
    }
  };

  return (
    <AdminModal
      isOpen
      onClose={onClose}
      title="Departments"
      description="Senior students belong to one department, which decides some of their subjects."
      footer={<button onClick={onClose} className={primaryButton}>Done</button>}
    >
      <ul className="rounded-lg border border-line divide-y divide-line">
        {isLoading && <li className="px-4 py-3 text-sm text-muted">Loading…</li>}
        {departments.map((d) => (
          <li key={d.id} className="flex items-center justify-between px-4 py-2.5 text-sm">
            <span className="text-ink">{d.name}</span>
            <button
              onClick={() => remove(d.id, d.name)}
              disabled={removeDepartment.isPending}
              aria-label={`Remove ${d.name}`}
              className="p-1.5 rounded-md text-muted hover:text-danger hover:bg-clay-soft transition-colors disabled:opacity-40"
            >
              <X size={15} />
            </button>
          </li>
        ))}
        {!isLoading && departments.length === 0 && (
          <li className="px-4 py-3 text-sm text-muted">No departments yet.</li>
        )}
      </ul>

      <div className="flex gap-2 mt-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="New department"
          aria-label="New department"
          className={inputClass}
        />
        <button
          onClick={add}
          disabled={!trimmed || taken || addDepartment.isPending}
          className="h-10 px-3 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:bg-tint rounded-lg disabled:opacity-40 transition-colors shrink-0"
        >
          {addDepartment.isPending ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Add
        </button>
      </div>
      {taken && <p className="text-xs text-danger mt-1.5">That department already exists.</p>}
    </AdminModal>
  );
};

export default DepartmentsModal;
