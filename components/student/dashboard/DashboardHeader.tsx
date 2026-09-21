"use client";

import React from "react";
import { useStudentProfile } from "@/hooks/profile.hooks";

const DashboardHeader = () => {
  const { data: profile, isLoading } = useStudentProfile();

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const fullName = profile
    ? `${profile.firstName || ""} ${profile.lastName || ""}`.trim()
    : "";
  const classLabel = profile
    ? `${profile.schoolClass || ""} ${profile.department || ""}`.trim()
    : "";

  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
      <div>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
          Dashboard
        </p>

        {isLoading ? (
          <div className="h-8 w-56 bg-gray-100 rounded-lg animate-pulse" />
        ) : (
          <h1 className="text-[#0e2e1d] text-2xl font-black tracking-tight flex flex-wrap items-center gap-3">
            {fullName ? `Welcome, ${fullName}` : "Welcome"}
            {profile?.studentId && (
              <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-bold font-mono">
                {profile.studentId}
              </span>
            )}
          </h1>
        )}

        <p className="text-gray-400 text-sm mt-1">
          {classLabel ? `${classLabel} • ${currentDate}` : currentDate}
        </p>
      </div>
    </div>
  );
};

export default DashboardHeader;
