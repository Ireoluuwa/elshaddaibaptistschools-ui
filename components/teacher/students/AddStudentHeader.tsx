"use client";

import React from "react";
import { UserPlus, Users } from "lucide-react";

interface AddStudentHeaderProps {
  activeTab: "manual" | "batch";
  setActiveTab: (tab: "manual" | "batch") => void;
}

const AddStudentHeader: React.FC<AddStudentHeaderProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[#0e2e1d] text-2xl font-black tracking-tight uppercase">
          Add Student
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Enroll new students manually or import in bulk via CSV.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("manual")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "manual"
              ? "bg-white text-[#0e2e1d] shadow-sm"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <UserPlus size={16} />
          Manual Entry
        </button>
        <button
          onClick={() => setActiveTab("batch")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "batch"
              ? "bg-white text-[#0e2e1d] shadow-sm"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <Users size={16} />
          Batch Upload
        </button>
      </div>
    </div>
  );
};

export default AddStudentHeader;
