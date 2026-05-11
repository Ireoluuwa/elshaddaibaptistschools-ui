"use client";

import React from "react";
import { ClipboardList, ArrowRight, Clock, Calendar, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useStudentAssignments } from "@/hooks/assignment.hooks";

const AssignmentsWidget = () => {
  
  const { data, isLoading, isError } = useStudentAssignments(1, "active", 5);

  const assignments = data?.data || [];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
          <span className="w-1 h-4 bg-[#006442] rounded-full" />
          Latest Assignments
        </h2>
        <Link
          href="/portal/student/assignments"
          className="text-[10px] font-black text-gray-300 hover:text-[#006442] flex items-center gap-1 uppercase tracking-widest transition-colors"
        >
          View all <ArrowRight size={12} />
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 divide-y divide-gray-50 overflow-y-auto">
        {isLoading ? (
          <AssignmentsWidgetSkeleton />
        ) : isError ? (
          <div className="flex items-center justify-center h-full py-10 text-center px-6">
            <div className="flex flex-col items-center gap-2">
              <AlertCircle size={20} className="text-red-300" />
              <p className="text-xs text-gray-400 font-medium">Could not load assignments</p>
            </div>
          </div>
        ) : assignments.length > 0 ? (
          assignments.map((assignment) => {
            const isPastDue = new Date(assignment.dueDate) < new Date();
            return (
              <div
                key={assignment.id}
                className="group px-5 py-4 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-[#0e2e1d] leading-snug group-hover:text-[#006442] transition-colors truncate">
                      {assignment.title}
                    </h3>
                    <span className="flex items-center gap-1.5 mt-1.5">
                      <Clock size={11} className="text-gray-300 shrink-0" />
                      <span className={`text-[11px] font-medium ${isPastDue ? "text-red-500" : "text-gray-400"}`}>
                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </span>
                    </span>
                  </div>
                  <span className={`shrink-0 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isPastDue 
                      ? "bg-red-50 text-red-500" 
                      : "bg-[#006442]/5 text-[#006442]"
                  }`}>
                    {isPastDue ? "Past Due" : "Active"}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full py-10">
            <div className="flex flex-col items-center gap-2">
              <ClipboardList size={20} className="text-gray-200" />
              <p className="text-xs text-gray-400 font-medium">No active assignments</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-gray-50">
        <Link
          href="/portal/student/assignments"
          className="w-full text-center text-[10px] font-black text-gray-300 hover:text-[#006442] uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5"
        >
          <Calendar size={11} />
          All Assignments
        </Link>
      </div>
    </div>
  );
};

function AssignmentsWidgetSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="px-5 py-4 flex flex-col gap-2 animate-pulse">
          <div className="h-4 w-3/4 bg-gray-100 rounded-lg" />
          <div className="h-3 w-1/3 bg-gray-50 rounded-full" />
        </div>
      ))}
    </>
  );
}

export default AssignmentsWidget;
