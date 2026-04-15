"use client";

import React from "react";
import DashboardHeader from "@/components/teacher/dashboard/DashboardHeader";
import ClassroomActions from "@/components/teacher/dashboard/ClassroomActions";
import PerformanceProfile from "@/components/teacher/dashboard/PerformanceProfile";

export default function TeacherDashboard() {
  return (
    <div className="max-w-5xl mx-auto">
      <DashboardHeader />
      <ClassroomActions />
      <PerformanceProfile />

      {/* Footer */}
      <footer className="text-center text-gray-300 text-xs py-6 border-t border-gray-100">
        &copy; {new Date().getFullYear()} EduPortal Teacher System. All rights
        reserved.
      </footer>
    </div>
  );
}
