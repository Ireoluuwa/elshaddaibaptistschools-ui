"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Filter, Plus, FileEdit } from "lucide-react";
import { mockStudents } from "@/constants/teacher/reports.constants";

export default function StudentList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("All");

  // Get unique classes for the filter dropdown
  const uniqueClasses = ["All", ...Array.from(new Set(mockStudents.map((s) => s.class)))];

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === "All" || student.class === filterClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Controls Bar */}
      <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/50">
        <div className="relative w-full md:max-w-xs">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 h-10 rounded-lg border border-gray-200 focus:border-[#006442] focus:ring-1 focus:ring-[#006442] outline-none text-sm transition-all bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter size={18} className="text-gray-400 shrink-0" />
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="w-full md:w-auto h-10 pl-3 pr-8 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-[#006442] transition-all cursor-pointer"
          >
            {uniqueClasses.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Student List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-medium">
            <tr>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Class</th>
              <th className="px-6 py-4">Status (Current Week)</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center overflow-hidden shrink-0">
                        <img src="/no-profile.png" alt="Profile" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-semibold text-[#0e2e1d]">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{student.id}</td>
                  <td className="px-6 py-4 text-gray-600">{student.class}</td>
                  <td className="px-6 py-4">
                    {student.status === "Submitted" ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Submitted
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/portal/teacher/reports/${student.id}`}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        student.status === "Submitted"
                          ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          : "bg-[#0e2e1d] text-white hover:bg-[#0a2118]"
                      }`}
                    >
                      {student.status === "Submitted" ? (
                        <>
                          <FileEdit size={14} /> Edit Report
                        </>
                      ) : (
                        <>
                          <Plus size={14} /> Write Report
                        </>
                      )}
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                  No students found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
