"use client";

import React from "react";
import AdminModal, { labelClass, secondaryButton } from "@/components/admin/shared/AdminModal";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import { useAdminStudent } from "@/hooks/admin-students.hooks";
import type { EnrollmentOutcome, StudentListItem } from "@/types/admin-students.types";

interface StudentDetailModalProps {
  student: StudentListItem;
  onClose: () => void;
}

const outcomeTone: Record<EnrollmentOutcome, "brand" | "clay" | "muted"> = {
  promoted: "brand",
  graduated: "brand",
  repeated: "clay",
  withdrawn: "muted",
};

const StudentDetailModal: React.FC<StudentDetailModalProps> = ({ student, onClose }) => {
  const { data: detail, isLoading, isError } = useAdminStudent(student.id);

  return (
    <AdminModal
      isOpen
      onClose={onClose}
      title={`${student.lastName} ${student.firstName}`}
      description={student.username}
      footer={
        <button onClick={onClose} className={secondaryButton}>
          Close
        </button>
      }
    >
      <div className="flex flex-col gap-6">
        <dl className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-canvas px-4 py-3">
            <dt className="text-xs text-muted">Current class</dt>
            <dd className="text-sm font-semibold text-ink mt-0.5">
              {student.className ?? "—"} {student.department && <span className="font-normal text-muted">{student.department}</span>}
            </dd>
          </div>
          <div className="rounded-lg bg-canvas px-4 py-3">
            <dt className="text-xs text-muted">Status</dt>
            <dd className="mt-1">
              <StatusBadge tone={student.status === "active" ? "brand" : "muted"}>{student.status}</StatusBadge>
            </dd>
          </div>
        </dl>

        <div>
          <p className={labelClass}>Class history</p>
          {isLoading ? (
            <div className="flex flex-col gap-2">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-11 rounded-lg bg-canvas animate-pulse" />
              ))}
            </div>
          ) : isError ? (
            <p className="text-sm text-danger">Couldn&apos;t load class history.</p>
          ) : !detail?.enrollments.length ? (
            <p className="text-sm text-muted">No class history yet.</p>
          ) : (
            <ul className="rounded-lg border border-line divide-y divide-line">
              {detail.enrollments.map((e) => (
                <li key={e.session} className="grid grid-cols-[90px_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 text-sm">
                  <span className="text-muted tabular-nums">{e.session}</span>
                  <span className="font-medium text-ink truncate">
                    {e.className} {e.department && <span className="font-normal text-muted">{e.department}</span>}
                  </span>
                  {e.outcome ? (
                    <StatusBadge tone={outcomeTone[e.outcome]}>{e.outcome}</StatusBadge>
                  ) : (
                    <StatusBadge tone="muted">{e.isCurrentSession ? "current" : "no outcome"}</StatusBadge>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminModal>
  );
};

export default StudentDetailModal;
