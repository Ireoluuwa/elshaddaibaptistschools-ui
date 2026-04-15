"use client";

import React from "react";
import { Download, Plus } from "lucide-react";

const DashboardHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
      <div>
        <h1 className="text-[#0e2e1d] text-2xl font-black tracking-tight">
          Dashboard
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage your classroom, students, and curriculum efficiently.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-gray-300 hover:text-[#0e2e1d] transition-all">
          <Download size={16} />
          Export Data
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#006442] hover:bg-[#005236] text-white text-sm font-semibold transition-all shadow-sm">
          <Plus size={16} />
          New Class
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
