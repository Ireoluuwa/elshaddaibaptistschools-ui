"use client";

import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp, FileText, Download, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { studentAssignments, StudentAssignment } from "@/constants/student/assignments.constants";

export default function StudentAssignmentList() {
  const [activeTab, setActiveTab] = useState<"Latest" | "Due">("Latest");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = studentAssignments.filter((a) => {
    if (activeTab === "Latest") {
      return a.status === "Pending";
    }
    return a.status === "Overdue";
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-[400px]">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-2">
        <div className="flex gap-8">
          {(["Latest", "Due"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold transition-all relative ${
                activeTab === tab ? "text-[#006442]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab === "Latest" ? "Latest Assignments" : "Due Assignments"}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#006442] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Assignment List */}
      <div className="divide-y divide-gray-100">
        {filtered.length > 0 ? (
          filtered.map((assignment) => (
            <div key={assignment.id} className="flex flex-col">
              <button
                onClick={() => toggleExpand(assignment.id)}
                className={`w-full py-5 flex items-center justify-between hover:bg-white/50 transition-colors text-left group`}
              >
                <div className="flex-1 min-w-0">
                  <div className="mb-1.5 flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#0e2e1d] uppercase tracking-tight group-hover:text-[#006442] transition-colors">
                      {assignment.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] font-medium text-gray-400">
                    <span className="flex items-center gap-1.5">
                      Deadline: <span className="text-gray-500 font-bold">{assignment.dueDate}</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0 pr-2 leading-none">
                  {expandedId === assignment.id ? (
                    <ChevronUp size={16} className="text-[#006442]" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-300 group-hover:text-gray-400" />
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              {expandedId === assignment.id && (
                <div className="py-6 animate-in slide-in-from-top-2 duration-300">
                  <div className="max-w-2xl">
                    <div className="flex flex-col gap-6">
                      <div>
                        <h4 className="text-[10px] font-black text-[#006442] uppercase tracking-[0.2em] mb-3 opacity-60">
                          Task Description
                        </h4>
                        <p className="text-sm text-gray-500 leading-relaxed font-medium">
                          {assignment.description}
                        </p>
                      </div>

                      {assignment.attachment && (
                        <div>
                          <h4 className="text-[10px] font-black text-[#006442] uppercase tracking-[0.2em] mb-4 opacity-60">
                            Resources & Files
                          </h4>
                          <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white hover:border-[#006442]/20 transition-all shadow-sm">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-[#006442]/5 flex items-center justify-center text-[#006442]">
                                <FileText size={20} />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-gray-700">
                                  {assignment.attachment.name}
                                </p>
                                <p className="text-[10px] text-gray-400 font-medium tracking-tight">
                                  {assignment.attachment.size}
                                </p>
                              </div>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#006442] bg-[#006442]/5 hover:bg-[#006442]/10 rounded-lg transition-all">
                              <Download size={14} />
                              Download
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="py-24 flex flex-col items-center justify-center text-gray-300">
            <Clock size={32} className="opacity-10 mb-4" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              No assignments found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
