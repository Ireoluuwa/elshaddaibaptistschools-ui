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
    </div>
  );
};

export default DashboardHeader;
