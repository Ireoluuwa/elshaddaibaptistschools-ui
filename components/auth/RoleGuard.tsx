"use client";

import { useAuthStore } from "@/store/auth.store";
import { useProfileQuery } from "@/hooks/auth.hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

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
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#006442] animate-spin" />
        <p className="mt-4 text-sm text-gray-500 font-medium">Verifying access...</p>
      </div>
    );
  }

  // Double check before rendering children
  if (!userProfile || userProfile.role.toLowerCase() !== allowedRole.toLowerCase()) {
    return null;
  }

  return <>{children}</>;
}
