"use client";

import React from "react";
import StudentAssignmentList from "@/components/student/assignments/StudentAssignmentList";

export default function StudentAssignmentsPage() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-[#0e2e1d] text-2xl font-black tracking-tight uppercase">
            Assignments
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            View your classwork and submit assignments.
          </p>
        </div>
      </div>

      {/* Assignment List */}
      <StudentAssignmentList />

      {/* Footer */}
      <footer className="text-center text-gray-400 text-[11px] py-8 mt-4 font-medium uppercase tracking-[0.15em]">
        &copy; {new Date().getFullYear()} El-Shaddai Schools. Student Portal.
      </footer>
    </div>
  );
}
