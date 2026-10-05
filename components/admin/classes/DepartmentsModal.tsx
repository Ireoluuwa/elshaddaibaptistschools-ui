"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import AdminModal, { inputClass, primaryButton } from "@/components/admin/shared/AdminModal";

interface DepartmentsModalProps {
  departments: string[];
  onClose: () => void;
  onAdd: (name: string) => void;
  onRemove: (name: string) => void;
}

const DepartmentsModal: React.FC<DepartmentsModalProps> = ({ departments, onClose, onAdd, onRemove }) => {
  const [name, setName] = useState("");
  const trimmed = name.trim();
  const taken = departments.some((d) => d.toLowerCase() === trimmed.toLowerCase());

  const add = () => {
    if (!trimmed || taken) return;
    onAdd(trimmed);
    setName("");
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
        {departments.map((d) => (
          <li key={d} className="flex items-center justify-between px-4 py-2.5 text-sm">
            <span className="text-ink">{d}</span>
            <button
              onClick={() => onRemove(d)}
              aria-label={`Remove ${d}`}
              className="p-1.5 rounded-md text-muted hover:text-danger hover:bg-clay-soft transition-colors"
            >
              <X size={15} />
            </button>
          </li>
        ))}
        {departments.length === 0 && <li className="px-4 py-3 text-sm text-muted">No departments yet.</li>}
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
          disabled={!trimmed || taken}
          className="h-10 px-3 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:bg-tint rounded-lg disabled:opacity-40 transition-colors shrink-0"
        >
          <Plus size={16} /> Add
        </button>
      </div>
      {taken && <p className="text-xs text-danger mt-1.5">That department already exists.</p>}
    </AdminModal>
  );
};

export default DepartmentsModal;
