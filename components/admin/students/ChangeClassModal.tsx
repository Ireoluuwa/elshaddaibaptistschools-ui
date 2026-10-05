"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import AdminModal, {
  inputClass,
  labelClass,
  primaryButton,
  secondaryButton,
} from "@/components/admin/shared/AdminModal";
import { useClasses, useDepartments } from "@/hooks/curriculum.hooks";
import { useChangeStudentClass } from "@/hooks/admin-students.hooks";
import { apiErrorMessage } from "@/lib/api-error";
import { toast } from "@/store/toast.store";
import type { StudentDetail } from "@/types/admin-students.types";

interface ChangeClassModalProps {
  student: StudentDetail;
  onClose: () => void;
}

const ChangeClassModal: React.FC<ChangeClassModalProps> = ({ student, onClose }) => {
  const { data: classes = [] } = useClasses();
  const { data: departments = [] } = useDepartments();
  const { mutateAsync, isPending } = useChangeStudentClass();

  const currentClassId = classes.find((c) => c.name === student.className)?.id ?? "";
  const currentDeptId = departments.find((d) => d.name === student.department)?.id ?? "";
  const [classId, setClassId] = useState<string | null>(null);
  const [departmentId, setDepartmentId] = useState<string | null>(null);

  const chosenClassId = classId ?? currentClassId;
  const chosenDeptId = departmentId ?? currentDeptId;
  const chosen = classes.find((c) => c.id === chosenClassId);
  const needsDepartment = !!chosen?.isSenior;
  const changed =
    chosenClassId !== currentClassId || (needsDepartment && chosenDeptId !== currentDeptId);
  const canSave = !!chosen && changed && (!needsDepartment || !!chosenDeptId) && !isPending;

  const handleSave = async () => {
    try {
      await mutateAsync({
        id: student.id,
        classId: chosenClassId,
        departmentId: needsDepartment ? chosenDeptId : undefined,
      });
      toast.success("Class changed", `${student.firstName} is now in ${chosen?.name}.`);
      onClose();
    } catch (err) {
      toast.error("Couldn't change class", apiErrorMessage(err));
    }
  };

  return (
    <AdminModal
      isOpen
      onClose={isPending ? () => {} : onClose}
      title="Change class"
      description={`Moves ${student.firstName} now and updates their class for this session.`}
      footer={
        <>
          <button onClick={onClose} disabled={isPending} className={secondaryButton}>
            Cancel
          </button>
          <button onClick={handleSave} disabled={!canSave} className={primaryButton}>
            {isPending && <Loader2 size={16} className="animate-spin" />}
            Change class
          </button>
        </>
      }
    >
      <div className={`grid gap-3 ${needsDepartment ? "grid-cols-2" : "grid-cols-1"}`}>
        <div>
          <label htmlFor="class-select" className={labelClass}>Class</label>
          <select
            id="class-select"
            value={chosenClassId}
            onChange={(e) => setClassId(e.target.value)}
            className={inputClass}
          >
            <option value="" disabled>
              Choose a class
            </option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        {needsDepartment && (
          <div>
            <label htmlFor="department-select" className={labelClass}>Department</label>
            <select
              id="department-select"
              value={chosenDeptId}
              onChange={(e) => setDepartmentId(e.target.value)}
              className={inputClass}
            >
              <option value="" disabled>
                Choose…
              </option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </AdminModal>
  );
};

export default ChangeClassModal;
