"use client";

import React from "react";
import DashboardHeader from "@/components/student/dashboard/DashboardHeader";
import WeeklyReportWidget from "@/components/student/dashboard/WeeklyReportWidget";
import AssignmentsWidget from "@/components/student/dashboard/AssignmentsWidget";
import AnnouncementsWidget from "@/components/student/dashboard/AnnouncementsWidget";
import FinanceWidget from "@/components/student/dashboard/FinanceWidget";

export default function StudentDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto pb-10">
      <DashboardHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column (2/3 width on large screens) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="h-auto md:h-72">
             <WeeklyReportWidget />
          </div>
          <div className="flex-1 min-h-[350px]">
             <AssignmentsWidget />
          </div>
        </div>

        {/* Sidebar Column (1/3 width on large screens) */}
        <div className="flex flex-col gap-6">
          <div className="h-48 md:h-56 shrink-0">
             <FinanceWidget />
          </div>
          <div className="flex-1 min-h-[350px]">
             <AnnouncementsWidget />
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="text-center text-gray-400 text-xs py-8 mt-8 border-t border-gray-200/50">
        &copy; {new Date().getFullYear()} El-Shaddai Baptist Schools. All rights reserved.
      </footer>
    </div>
  );
}
