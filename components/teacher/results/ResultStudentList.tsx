"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";
import { mockStudents } from "@/constants/teacher/reports.constants";

export default function ResultStudentList() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = mockStudents.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Search */}
      <div className="p-5 border-b border-gray-100 bg-gray-50/50">
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
      </div>

      {/* Student List */}
      <div className="divide-y divide-gray-100">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <Link
              key={student.id}
              href={`/portal/teacher/results/${student.id}`}
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center overflow-hidden shrink-0">
                  <img
                    src="/no-profile.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="font-bold text-[#0e2e1d] text-sm">
                    {student.name}
                  </span>
                  <span className="text-gray-400 text-xs ml-2 font-mono">
                    {student.id}
                  </span>
                </div>
              </div>
              <ChevronRight
                size={16}
                className="text-gray-300 group-hover:text-[#006442] transition-colors"
              />
            </Link>
          ))
        ) : (
          <div className="px-6 py-10 text-center text-gray-400 text-sm">
            No students found.
          </div>
        )}
      </div>
    </div>
  );
}
