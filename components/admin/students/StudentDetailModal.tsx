"use client";

import React, { useState } from "react";
import { KeyRound, UserX } from "lucide-react";
import AdminModal, {
  inputClass,
  labelClass,
  primaryButton,
  secondaryButton,
} from "@/components/admin/shared/AdminModal";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import { departments, promotionClasses } from "@/constants/admin/mock.constants";
import type { AdminStudent } from "@/types/admin.types";

interface StudentDetailModalProps {
  student: AdminStudent;
  onClose: () => void;
  onSave: (student: AdminStudent) => void;
  onWithdraw: (student: AdminStudent) => void;
  onResetPassword: (student: AdminStudent) => void;
}

const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  onClose,
  onSave,
  onWithdraw,
  onResetPassword,
}) => {
  const [className, setClassName] = useState(student.className);
  const [department, setDepartment] = useState(student.department ?? "");
  const isSenior = className.startsWith("SS");
  const changed =
    className !== student.className || (isSenior && department !== (student.department ?? ""));

  return (
    <AdminModal
      isOpen
      onClose={onClose}
      title={`${student.lastName} ${student.firstName}`}
      description={student.username}
      footer={
        <>
          <button onClick={onClose} className={secondaryButton}>
            Close
          </button>
          <button
            disabled={!changed || (isSenior && !department)}
            onClick={() =>
              onSave({ ...student, className, department: isSenior ? department : undefined })
            }
            className={primaryButton}
          >
            Save changes
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-6">
        {/* Class */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Class</label>
            <select
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className={inputClass}
            >
              {promotionClasses.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          {isSenior && (
            <div>
              <label className={labelClass}>Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className={inputClass}
              >
                <option value="" disabled>
                  Select…
                </option>
                {departments.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* History */}
        <div>
          <p className={labelClass}>Class history</p>
          <ul className="rounded-xl border border-gray-100 divide-y divide-gray-100">
            {student.enrollments.map((e) => (
              <li key={e.session} className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="text-gray-500">{e.session}</span>
                <span className="font-semibold text-secondary">
                  {e.className} {e.department ?? ""}
                </span>
                {e.outcome ? (
                  <StatusBadge tone={e.outcome === "repeated" ? "amber" : "green"}>
                    {e.outcome}
                  </StatusBadge>
                ) : (
                  <StatusBadge tone="blue">in progress</StatusBadge>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Account actions */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onResetPassword(student)}
            className="h-9 px-3 inline-flex items-center gap-2 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
          >
            <KeyRound size={14} /> Reset password
          </button>
          {student.status === "active" && (
            <button
              onClick={() => onWithdraw(student)}
              className="h-9 px-3 inline-flex items-center gap-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all"
            >
              <UserX size={14} /> Withdraw student
            </button>
          )}
        </div>
      </div>
    </AdminModal>
  );
};

export default StudentDetailModal;
