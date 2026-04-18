"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, BookOpen, Target, Clock } from "lucide-react";

const WeeklyReportWidget = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-full relative overflow-hidden group hover:shadow-md transition-shadow"
    >
      {/* Decorative gradient blob */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none transition-transform group-hover:scale-150 duration-700" />

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <TrendingUp className="text-emerald-600" size={20} />
          This Week's Report
        </h2>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
          Excellent
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 flex-1">
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-gray-500 text-sm font-medium">Avg Score</span>
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Target size={16} />
            </div>
          </div>
          <p className="text-3xl font-black text-gray-900">86<span className="text-lg text-gray-400 font-bold">%</span></p>
          <p className="text-emerald-600 text-xs font-medium mt-1">↑ +2.4% from last week</p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-gray-500 text-sm font-medium">Tasks</span>
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <BookOpen size={16} />
            </div>
          </div>
          <p className="text-3xl font-black text-gray-900">12<span className="text-lg text-gray-400 font-bold">/14</span></p>
          <p className="text-blue-600 text-xs font-medium mt-1">Completed</p>
        </div>

        <div className="col-span-2 bg-gradient-to-r from-[#0e2e1d] to-emerald-950 rounded-2xl p-4 flex items-center justify-between text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-emerald-300">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-white/70 text-xs font-medium mb-0.5">Attendance</p>
              <p className="text-lg font-bold text-white">100% Present</p>
            </div>
          </div>
          <span className="relative z-10 text-emerald-400 font-bold text-sm bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
            5 Days
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default WeeklyReportWidget;
