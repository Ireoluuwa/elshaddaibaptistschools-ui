"use client";

import React from "react";
import { Shield, BookOpen, GraduationCap } from "lucide-react";

export default function ReadOnlyFields() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-6">
      <div>
        <h2 className="text-[#0e2e1d] text-lg font-bold mb-1">Account & Assignment</h2>
        <p className="text-gray-400 text-xs">This information is managed by the school administration and cannot be changed.</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <Shield size={18} className="text-blue-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Username / ID</p>
            <p className="text-[#0e2e1d] font-medium">TCH-2023-001</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <BookOpen size={18} className="text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Assigned Subject</p>
            <p className="text-[#0e2e1d] font-medium">Mathematics & Physics</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
            <GraduationCap size={18} className="text-orange-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Assigned Classes</p>
            <p className="text-[#0e2e1d] font-medium">SS1, SS2</p>
          </div>
        </div>
      </div>
    </div>
  );
}
