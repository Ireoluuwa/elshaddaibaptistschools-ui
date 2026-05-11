"use client";

import React from "react";

const DashboardHeader = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
      <div>
        <h1 className="text-[#0e2e1d] text-2xl font-black tracking-tight">
          Dashboard
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          {currentDate}
        </p>
      </div>
    </div>
  );
};

export default DashboardHeader;
