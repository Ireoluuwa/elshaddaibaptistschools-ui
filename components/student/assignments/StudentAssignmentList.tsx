"use client";

import React, { useState } from "react";
import { Search, Paperclip, ChevronDown, ChevronUp, Download, Eye, Upload } from "lucide-react";
import {
  mockStudentAssignments,
  studentStatusOptions,
  StudentAssignment,
} from "@/constants/student/assignments.constants";
import { motion, AnimatePresence } from "framer-motion";

const StudentAssignmentList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = mockStudentAssignments.filter((a) => {
    const matchesSearch = a.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) || 
      a.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All Statuses" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const statusBadge = (status: StudentAssignment["status"]) => {
    const styles = {
      Submitted: "text-emerald-700 bg-emerald-50",
      Overdue: "text-red-600 bg-red-50",
      Pending: "text-amber-700 bg-amber-50",
    };
    return (
      <span
        className={`inline-flex px-2.5 py-1 rounded-lg text-[11px] font-bold ${styles[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Controls */}
      <div className="p-4 sm:p-5 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Search assignments or subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 h-9 rounded-lg border border-gray-200 focus:border-[#006442] focus:ring-1 focus:ring-[#006442] outline-none text-sm transition-all bg-white"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 px-3 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-[#006442] transition-all cursor-pointer font-medium text-gray-600"
        >
          {studentStatusOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Assignment Items */}
      <div className="divide-y divide-gray-100">
        {filtered.length > 0 ? (
          filtered.map((assignment) => (
            <div key={assignment.id} className="flex flex-col">
              {/* Visible Row Header */}
              <div
                onClick={() => toggleExpand(assignment.id)}
                className={`px-5 sm:px-6 py-4 transition-colors cursor-pointer flex items-start justify-between gap-3 ${
                  expandedId === assignment.id ? "bg-emerald-50/30" : "hover:bg-gray-50/50"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-[#0e2e1d] truncate">
                      {assignment.title}
                    </h3>
                    {assignment.hasAttachment && (
                      <Paperclip size={13} className="text-gray-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 font-medium truncate">
                    {assignment.subject} &bull; {assignment.teacher}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    <span>
                      Given:{" "}
                      <span className="font-medium text-gray-500">
                        {assignment.startDate}
                      </span>
                    </span>
                    <span>
                      Due:{" "}
                      <span className="font-medium text-gray-500">
                        {assignment.dueDate}
                      </span>
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 shrink-0">
                  {statusBadge(assignment.status)}
                  <div className="text-gray-400 hidden sm:block">
                    {expandedId === assignment.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>
              </div>

              {/* Collapsible Content */}
              <AnimatePresence>
                {expandedId === assignment.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-dashed border-gray-100 bg-gray-50/30 flex flex-col gap-5">
                      {/* Description */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Instructions</h4>
                        <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
                          {assignment.description}
                        </p>
                      </div>

                      {/* Attachments & Actions Row */}
                      <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-end mt-2">
                        <div className="flex flex-col gap-2">
                          {assignment.hasAttachment && (
                            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm w-fit">
                              <Download size={16} className="text-[#006442]" />
                              Download Materials
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                          {assignment.status === "Submitted" ? (
                            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-800 rounded-lg text-sm font-bold w-full sm:w-auto justify-center">
                              <Eye size={16} />
                              View Submission {assignment.score && `(${assignment.score})`}
                            </div>
                          ) : (
                            <button className="flex items-center gap-2 px-6 py-2 bg-[#006442] hover:bg-[#005236] text-white rounded-lg text-sm font-bold transition-all shadow-sm active:scale-95 w-full sm:w-auto justify-center">
                              <Upload size={16} />
                              Submit Work
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        ) : (
          <div className="px-6 py-10 text-center text-gray-400 text-sm">
            No assignments found.
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAssignmentList;
