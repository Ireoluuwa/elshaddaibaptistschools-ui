"use client";

import React, { useState } from "react";
import { Search, Trash2, Paperclip } from "lucide-react";
import {
  mockAssignments,
  statusOptions,
  Assignment,
} from "@/constants/teacher/assignments.constants";

const AssignmentList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  const filtered = mockAssignments.filter((a) => {
    const matchesSearch = a.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All Statuses" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusBadge = (status: Assignment["status"]) => {
    const styles = {
      Active: "text-emerald-700 bg-emerald-50",
      "Past Due": "text-red-600 bg-red-50",
      Draft: "text-gray-500 bg-gray-100",
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
            placeholder="Search assignments..."
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
          {statusOptions.map((opt) => (
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
            <div
              key={assignment.id}
              className="px-5 sm:px-6 py-4 hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-[#0e2e1d] truncate">
                      {assignment.title}
                    </h3>
                    {assignment.hasAttachment && (
                      <Paperclip size={13} className="text-gray-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-gray-400 truncate">
                    {assignment.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    <span>
                      Start:{" "}
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
                <div className="flex items-center gap-2 shrink-0">
                  {statusBadge(assignment.status)}
                  <button className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
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

export default AssignmentList;
