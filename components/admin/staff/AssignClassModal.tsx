"use client";

import React, { useMemo, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import AdminModal, { primaryButton, secondaryButton } from "@/components/admin/shared/AdminModal";
import { useAdminTeachers, useAssignTeacherClass } from "@/hooks/admin-staff.hooks";
import { useClasses } from "@/hooks/curriculum.hooks";
import { apiErrorMessage } from "@/lib/api-error";
import { toast } from "@/store/toast.store";

interface AssignClassModalProps {
  teacherId: string;
  teacherName: string;
  currentClassId: string | null;
  onClose: () => void;
}

// JSS classes before SS, then by name.
const classOrder = (a: { name: string }, b: { name: string }) =>
  Number(a.name.startsWith("SS")) - Number(b.name.startsWith("SS")) || a.name.localeCompare(b.name);

const AssignClassModal: React.FC<AssignClassModalProps> = ({ teacherId, teacherName, currentClassId, onClose }) => {
  const { data: rawClasses = [] } = useClasses();
  const { data: teachers = [] } = useAdminTeachers();
  const assignClass = useAssignTeacherClass();
  const [selected, setSelected] = useState<string | null>(currentClassId);

  const classes = useMemo(() => [...rawClasses].sort(classOrder), [rawClasses]);

  // Other active teachers already on each class.
  const teachersOf = (classId: string) =>
    teachers
      .filter((t) => t.isActive && t.classId === classId && t.id !== teacherId)
      .map((t) => `${t.firstName} ${t.lastName}`.trim() || t.username);

  const handleSave = async () => {
    try {
      const updated = await assignClass.mutateAsync({ id: teacherId, classId: selected });
      toast.success(
        "Class updated",
        updated.className ? `${teacherName} now teaches ${updated.className}.` : `${teacherName} has no class.`,
      );
      onClose();
    } catch (err) {
      toast.error("Couldn't update class", apiErrorMessage(err));
    }
  };

  const option = (id: string | null, label: string, note: string) => {
    const active = selected === id;
    return (
      <button
        key={id ?? "none"}
        type="button"
        onClick={() => setSelected(id)}
        aria-pressed={active}
        className={`relative text-left rounded-lg border px-3 py-2.5 transition-colors ${
          active ? "border-brand bg-tint" : "border-line hover:border-ink/30 bg-white"
        }`}
      >
        <span className="block text-sm font-semibold text-ink">{label}</span>
        <span className={`block text-xs truncate ${note === "No teacher yet" ? "text-clay" : "text-muted"}`}>{note}</span>
        {active && (
          <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-brand text-white flex items-center justify-center">
            <Check size={11} strokeWidth={3} />
          </span>
        )}
      </button>
    );
  };

  return (
    <AdminModal
      isOpen
      onClose={assignClass.isPending ? () => {} : onClose}
      title="Class teacher of"
      description={`Choose the class ${teacherName} manages results and reports for.`}
      footer={
        <>
          <button onClick={onClose} disabled={assignClass.isPending} className={secondaryButton}>
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={selected === currentClassId || assignClass.isPending}
            className={primaryButton}
          >
            {assignClass.isPending && <Loader2 size={16} className="animate-spin" />}
            Save
          </button>
        </>
      }
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {classes.map((c) => {
          const others = teachersOf(c.id);
          return option(c.id, c.name, others.length ? `Also: ${others.join(", ")}` : "No teacher yet");
        })}
        {option(null, "No class", "Not a class teacher")}
      </div>
    </AdminModal>
  );
};

export default AssignClassModal;
