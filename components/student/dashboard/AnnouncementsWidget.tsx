"use client";

import React from "react";
import { motion } from "framer-motion";
import { Megaphone, Calendar } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "Mid-Term Break Commences Next Friday",
    date: "Oct 20",
  },
  {
    id: 2,
    title: "Science Fair Registration Now Open",
    date: "Oct 18",
  },
  {
    id: 3,
    title: "New Books Added to e-Library",
    date: "Oct 15",
  },
];

const AnnouncementsWidget = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Megaphone className="text-emerald-600" size={20} />
          Announcements
        </h2>
      </div>

      <div className="flex-1 flex flex-col gap-5">
        {announcements.map((item) => (
          <div key={item.id} className="group cursor-pointer border-l-2 border-transparent hover:border-emerald-500 pl-3 -ml-3 transition-all">
            <h3 className="text-sm font-bold text-gray-800 leading-snug group-hover:text-emerald-700 transition-colors">
              {item.title}
            </h3>
            <span className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-1">
              <Calendar size={12} /> {item.date}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AnnouncementsWidget;
