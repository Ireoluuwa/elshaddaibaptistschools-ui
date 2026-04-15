"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Filter, Plus, FileEdit } from "lucide-react";
import { mockStudents } from "@/constants/teacher/reports.constants";

export default function StudentList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("2023/2024");
  const [filterTerm, setFilterTerm] = useState("Term 1");

  const academicYears = ["2023/2024", "2022/2023"];
  const terms = ["Term 1", "Term 2", "Term 3"];

  const filteredStudents = mockStudents.filter((student) => {
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
          <Filter size={18} className="text-gray-400 shrink-0" />
          
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="w-full md:w-auto h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-[#006442] transition-all cursor-pointer font-medium text-gray-600"
          >
            {academicYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
            className="w-full md:w-auto h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-[#006442] transition-all cursor-pointer font-medium text-gray-600"
          >
            {terms.map((term) => (
              <option key={term} value={term}>
                {term}
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
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4">Student ID</th>
              <th className="px-6 py-4 text-right">Actions</th>
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
                      <span className="font-bold text-[#0e2e1d]">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-medium">{student.id}</td>
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
