"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Filter, Plus, FileEdit } from "lucide-react";
import { useInitTeacherDashboard } from "@/hooks/report.hooks";

export default function StudentList() {
  const [searchTerm, setSearchTerm] = useState("");
  // filterYear and filterTerm are commented out per instructions

  const { data: dashboardData, isLoading, isError } = useInitTeacherDashboard();

  const students = dashboardData?.students || [];

  const filteredStudents = students.filter((student) => {
    return student.name.toLowerCase().includes(searchTerm.toLowerCase());
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

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Filters commented out internationally */}
        </div>
      </div>

      {/* Student List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-medium">
            <tr>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4">Student ID</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              // Skeleton Loader
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
                      <div className="h-4 bg-gray-200 rounded w-32" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-24" />
                  </td>
                  <td className="px-6 py-4 flex justify-end">
                    <div className="h-8 bg-gray-200 rounded w-24" />
                  </td>
                </tr>
              ))
            ) : isError ? (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center text-red-500">
                  Failed to load students. Please try again.
                </td>
              </tr>
            ) : filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center overflow-hidden shrink-0">
                        <img src="/no-profile.png" alt="Profile" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-bold text-[#0e2e1d]">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-medium">{student.studentId}</td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/portal/teacher/reports/${student.id}`}
                      className="inline-flex items-center justify-center h-8 px-4 rounded-lg text-xs font-bold transition-all bg-[#0e2e1d] text-white hover:bg-[#0a2118]"
                    >
                      View Reports
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center text-gray-400">
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

