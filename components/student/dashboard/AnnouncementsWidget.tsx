"use client";

import React from "react";
import { Megaphone, Calendar, ChevronRight, Bell } from "lucide-react";

// Static for now — wire to a real endpoint when ready
const announcements = [
  {
    id: 1,
    title: "Mid-Term Break Commences Next Friday",
    date: "May 10, 2026",
    tag: "Holiday",
    tagColor: "bg-amber-50 text-amber-600",
  },
  {
    id: 2,
    title: "Science Fair Registration Now Open",
    date: "May 8, 2026",
    tag: "Event",
    tagColor: "bg-violet-50 text-violet-600",
  },
  {
    id: 3,
    title: "New Books Added to e-Library",
    date: "May 5, 2026",
    tag: "Update",
    tagColor: "bg-sky-50 text-sky-600",
  },
  {
    id: 4,
    title: "Third Term Exam Timetable Released",
    date: "May 3, 2026",
    tag: "Exams",
    tagColor: "bg-rose-50 text-rose-600",
  },
];

const AnnouncementsWidget = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
          <span className="w-1 h-4 bg-[#006442] rounded-full" />
          Announcements
        </h2>
        <div className="w-7 h-7 bg-[#006442]/5 rounded-full flex items-center justify-center">
          <Megaphone size={14} className="text-[#006442]" />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 divide-y divide-gray-50 overflow-y-auto">
        {announcements.map((item) => (
          <div
            key={item.id}
            className="group px-5 py-4 hover:bg-gray-50/50 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-[#0e2e1d] leading-snug group-hover:text-[#006442] transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <span className="flex items-center gap-1.5 mt-2">
                  <Calendar size={11} className="text-gray-300 shrink-0" />
                  <span className="text-[11px] text-gray-400 font-medium">{item.date}</span>
                </span>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${item.tagColor}`}>
                  {item.tag}
                </span>
                <ChevronRight size={14} className="text-gray-200 group-hover:text-[#006442] transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-gray-50">
        <button className="w-full text-center text-[10px] font-black text-gray-300 hover:text-[#006442] uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5">
          <Bell size={11} />
          All Announcements
        </button>
      </div>
    </div>
  );
};

export default AnnouncementsWidget;
