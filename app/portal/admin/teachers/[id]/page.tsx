"use client";

import React, { use } from "react";
import StaffDetailView from "@/components/admin/staff/StaffDetailView";
import { useAdminTeacher } from "@/hooks/admin-staff.hooks";

export default function AdminTeacherPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: teacher, isLoading, isError, refetch } = useAdminTeacher(id);

  return (
    <StaffDetailView
      role="teacher"
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
      account={
        teacher && {
          ...teacher,
          status: teacher.isActive ? { label: "active", tone: "brand" } : { label: "removed", tone: "muted" },
        }
      }
    />
  );
}
