"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Student } from "./types";

interface ReportHeaderProps {
  student: Student;
}

export const ReportHeader: React.FC<ReportHeaderProps> = ({ student }) => {
  const router = useRouter();

  return (
    <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => router.push("/portal/teacher/reports")}
          className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#0e2e1d] hover:border-gray-300 transition-all shadow-sm"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h2 className="text-[#0e2e1d] text-xl font-bold">{student.name}</h2>
          <p className="text-gray-500 text-sm">
            {student.class} • ID: {student.id}
          </p>
        </div>
      </div>
    </div>
  );
};
