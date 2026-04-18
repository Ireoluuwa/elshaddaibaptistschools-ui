"use client";

import React from "react";
import { motion } from "framer-motion";
import { Megaphone, Calendar } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "Mid-Term Break Commences Next Friday",
    category: "General",
    date: "Oct 20",
    isUrgent: true,
  },
  {
    id: 2,
    title: "Science Fair Registration Now Open",
    category: "Events",
    date: "Oct 18",
    isUrgent: false,
  },
  {
    id: 3,
    title: "New Books Added to e-Library",
    category: "Academics",
    date: "Oct 15",
    isUrgent: false,
  },
];

const AnnouncementsWidget = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full blur-3xl opacity-50 transform translate-x-12 -translate-y-12" />

      <div className="flex items-center justify-between mb-6 relative z-10">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Megaphone className="text-blue-600" size={20} />
          Announcements
        </h2>
      </div>

      <div className="flex-1 flex flex-col gap-4 relative z-10">
        {announcements.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  item.isUrgent
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors"
                }`}
              >
                {item.category}
              </span>
              <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                <Calendar size={10} /> {item.date}
              </span>
            </div>
            <h3 className="text-sm font-bold text-gray-800 leading-snug group-hover:text-emerald-700 transition-colors">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AnnouncementsWidget;
