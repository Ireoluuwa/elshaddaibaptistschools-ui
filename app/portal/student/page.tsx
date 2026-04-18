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

      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
        {/* Main Column (2/3 width on large screens) */}
        <div className="contents lg:flex lg:flex-col lg:col-span-2 lg:gap-6">
          <div className="order-3 lg:order-none h-auto md:h-72">
             <WeeklyReportWidget />
          </div>
          <div className="order-2 lg:order-none flex-1 min-h-[350px]">
             <AssignmentsWidget />
          </div>
        </div>

        {/* Sidebar Column (1/3 width on large screens) */}
        <div className="contents lg:flex lg:flex-col lg:col-span-1 lg:gap-6">
          <div className="order-4 lg:order-none h-48 md:h-56 shrink-0">
             <FinanceWidget />
          </div>
          <div className="order-1 lg:order-none flex-1 min-h-[350px]">
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
