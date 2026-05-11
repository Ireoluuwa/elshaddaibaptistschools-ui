"use client";

import React from "react";
import DashboardHeader from "@/components/student/dashboard/DashboardHeader";
import StudentActions from "@/components/student/dashboard/StudentActions";
import AssignmentsWidget from "@/components/student/dashboard/AssignmentsWidget";
import AnnouncementsWidget from "@/components/student/dashboard/AnnouncementsWidget";


export default function StudentDashboardPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <DashboardHeader />

      {/* Quick Action Cards — matching teacher layout */}
      <StudentActions />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assignments — takes 2 columns */}
        <div className="lg:col-span-2 min-h-[400px]">
          <AssignmentsWidget />
        </div>

        {/* Sidebar — Announcements */}
        <div className="min-h-[300px]">
          <AnnouncementsWidget />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-300 text-xs py-6 border-t border-gray-100 mt-10">
        &copy; {new Date().getFullYear()} El-Shaddai Baptist Schools. All rights reserved.
      </footer>
    </div>
  );
}
