"use client";

import { useAuthStore } from "@/store/auth.store";
import { useProfileQuery } from "@/hooks/auth.hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardSkeleton from "@/components/shared/DashboardSkeleton";

export default function RoleGuard({
  children,
  allowedRole,
}: {
  children: React.ReactNode;
  allowedRole: string;
}) {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();


  const { data: userProfile, isLoading, isError } = useProfileQuery();

  useEffect(() => {
    if (userProfile) {
      setUser(userProfile);


      if (userProfile.role.toLowerCase() !== allowedRole.toLowerCase()) {
        router.push(`/portal/${userProfile.role.toLowerCase()}`);
      }
    } else if (isError) {
      router.push("/auth/login");
    }
  }, [userProfile, isError, allowedRole, router, setUser]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }
  if (!userProfile || userProfile.role.toLowerCase() !== allowedRole.toLowerCase()) {
    return null;
  }

  return <>{children}</>;
}
