"use client";

import React, { use } from "react";
import StaffDetailView from "@/components/admin/staff/StaffDetailView";
import { useAdminBursar } from "@/hooks/admin-staff.hooks";
import type { BursarStatus } from "@/types/admin-staff.types";

const statusTone: Record<BursarStatus, "brand" | "clay" | "muted"> = {
  active: "brand",
  invited: "clay",
  removed: "muted",
};

export default function AdminBursarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: bursar, isLoading, isError, refetch } = useAdminBursar(id);

  return (
    <StaffDetailView
      role="bursar"
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
      account={
        bursar && {
          ...bursar,
          isActive: bursar.status !== "removed",
          status: { label: bursar.status, tone: statusTone[bursar.status] },
        }
      }
    />
  );
}
