"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Award } from "lucide-react";

const WeeklyReportWidget = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-full relative overflow-hidden hover:shadow-md transition-shadow justify-center items-center text-center"
    >
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <TrendingUp className="text-emerald-600" size={16} />
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Weekly Report
        </h2>
      </div>

      <div className="mt-4 flex flex-col py-4 items-center justify-center flex-1">

        <div className="flex items-baseline justify-center gap-1 mb-3">
          <span className="text-6xl font-black text-gray-900 tracking-tighter">4.8</span>
          <span className="text-2xl font-bold text-gray-400">/ 5</span>
        </div>

        <p className="text-gray-500 font-medium text-sm max-w-xs">
          Outstanding performance this week. Keep up the great work on your assignments!
        </p>
      </div>
    </motion.div>
  );
};

export default WeeklyReportWidget;
