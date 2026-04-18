"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Bell } from "lucide-react";

const DashboardHeader = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
    >
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          Welcome back, <span className="text-emerald-700">Student</span>! 👋
        </h1>
        <p className="text-gray-500 mt-1 font-medium flex items-center gap-2">
          <Calendar size={16} className="text-emerald-600" />
          {currentDate} • Term 2, 2025/2026
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-all shadow-sm relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
        </button>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;
