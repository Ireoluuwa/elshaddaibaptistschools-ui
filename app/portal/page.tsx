"use client";

import { useProfileQuery } from "@/hooks/auth.hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardSkeleton from "@/components/shared/DashboardSkeleton";

export default function PortalIndex() {
  const router = useRouter();
  const { data: userProfile, isLoading, isError } = useProfileQuery();

  useEffect(() => {
    if (userProfile) {
      
      router.replace(`/portal/${userProfile.role.toLowerCase()}`);
    } else if (isError) {
      router.replace("/auth/login");
    }
  }, [userProfile, isError, router]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return null;
}
