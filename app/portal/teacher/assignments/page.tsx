"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import AssignmentList from "@/components/teacher/assignments/AssignmentList";
import CreateAssignment from "@/components/teacher/assignments/CreateAssignment";

export default function AssignmentsPage() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-[#0e2e1d] text-2xl font-black tracking-tight uppercase">
            Assignments
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Create and manage student assignments.
          </p>
        </div>
        {!showCreate && (
          <button
            onClick={() => setShowCreate(true)}
            className="inline-flex items-center justify-center gap-2 h-10 px-5 bg-[#006442] hover:bg-[#005236] text-white text-sm font-semibold rounded-xl transition-all shadow-sm active:scale-95 self-start"
          >
            <Plus size={16} />
            New Assignment
          </button>
        )}
      </div>

      {/* Create Form */}
      {showCreate && (
        <CreateAssignment onClose={() => setShowCreate(false)} />
      )}

      {/* Assignment List */}
      <AssignmentList />

      {/* Footer */}
      <footer className="text-center text-gray-400 text-[11px] py-8 mt-4 font-medium uppercase tracking-[0.15em]">
        &copy; {new Date().getFullYear()} El-Shaddai Schools. Teacher Portal.
      </footer>
    </div>
  );
}
