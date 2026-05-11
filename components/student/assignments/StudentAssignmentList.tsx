"use client";

import React, { useState, useEffect } from "react";
import { 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Download, 
  Clock, 
  AlertCircle,
  Calendar,
  Loader2
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useStudentAssignmentsInfinite } from "@/hooks/assignment.hooks";

export default function StudentAssignmentList() {
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { ref, inView } = useInView();

  const { 
    data, 
    isLoading, 
    isError, 
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useStudentAssignmentsInfinite(activeTab);

  // Trigger infinite scroll
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (isLoading) return <AssignmentListSkeleton />;
  
  if (isError) return (
    <div className="py-24 flex flex-col items-center justify-center text-center gap-4 bg-red-50/50 rounded-3xl border border-red-100">
      <AlertCircle size={32} className="text-red-500" />
      <div className="flex flex-col gap-1">
        <p className="text-sm font-bold text-red-600 uppercase tracking-tight">Failed to load assignments</p>
        <p className="text-xs text-red-400 font-medium">{(error as any)?.response?.data?.message || "Please check your connection and try again"}</p>
      </div>
    </div>
  );

  const assignments = data?.pages.flatMap(page => page.data) || [];

  return (
    <div className="min-h-[400px]">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-8">
          {(["active", "past"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setExpandedId(null);
              }}
              className={`pb-4 text-sm font-bold transition-all relative ${
                activeTab === tab ? "text-[#006442]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab === "active" ? "Latest Assignments" : "Due Assignments"}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#006442] rounded-full animate-in fade-in slide-in-from-left-2 duration-300" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Assignment List */}
      <div className="divide-y divide-gray-100">
        {assignments.length > 0 ? (
          <>
            {assignments.map((assignment) => (
              <div key={assignment.id} className="flex flex-col">
                <button
                  onClick={() => toggleExpand(assignment.id)}
                  className={`w-full py-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors text-left group px-2 rounded-xl`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="mb-1.5 flex items-center gap-2">
                      <h3 className="text-sm font-bold text-[#0e2e1d] uppercase tracking-tight group-hover:text-[#006442] transition-colors">
                        {assignment.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 text-[11px] font-medium text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-[#006442]/40" />
                        Deadline: <span className={activeTab === "past" ? "text-red-500 font-bold" : "text-gray-500 font-bold"}>
                          {new Date(assignment.dueDate).toLocaleDateString()}
                        </span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        Class: <span className="text-gray-500 font-bold uppercase">{assignment.schoolClass?.name || "N/A"}</span>
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
                  <div className="py-6 px-4 animate-in slide-in-from-top-2 duration-300">
                    <div className="max-w-2xl">
                      <div className="flex flex-col gap-6">
                        <div>
                          <h4 className="text-[10px] font-black text-[#006442] uppercase tracking-[0.2em] mb-3 opacity-60">
                            Task Description
                          </h4>
                          <p className="text-sm text-gray-500 leading-relaxed font-medium">
                            {assignment.description || "No description provided for this assignment."}
                          </p>
                        </div>

                        {assignment.attachmentUrl && (
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
                                    Assignment Attachment
                                  </p>
                                  <p className="text-[10px] text-gray-400 font-medium tracking-tight">
                                    Click to view or download
                                  </p>
                                </div>
                              </div>
                              <a 
                                href={assignment.attachmentUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#006442] bg-[#006442]/5 hover:bg-[#006442]/10 rounded-lg transition-all"
                              >
                                <Download size={14} />
                                Open File
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Infinite Scroll Trigger */}
            <div ref={ref} className="py-12 flex items-center justify-center">
               {isFetchingNextPage ? (
                 <div className="flex items-center gap-2 text-gray-400">
                   <Loader2 size={16} className="animate-spin text-[#006442]" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Loading more...</span>
                 </div>
               ) : hasNextPage ? (
                 <div className="h-4" /> // Spacer for intersection observer
               ) : (
                 <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em]">
                   End of list
                 </p>
               )}
            </div>
          </>
        ) : (
          <div className="py-24 flex flex-col items-center justify-center text-gray-300">
            <Clock size={32} className="opacity-10 mb-4" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              No {activeTab === "active" ? "latest" : "due"} assignments found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function AssignmentListSkeleton() {
  return (
    <div className="divide-y divide-gray-50 animate-pulse">
      <div className="flex gap-8 mb-6 border-b border-gray-100 pb-4">
        <div className="h-4 w-32 bg-gray-100 rounded-full" />
        <div className="h-4 w-32 bg-gray-50 rounded-full" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="py-6 flex flex-col gap-3 px-2">
          <div className="h-5 w-1/3 bg-gray-100 rounded-lg" />
          <div className="flex gap-4">
            <div className="h-3 w-24 bg-gray-50 rounded-full" />
            <div className="h-3 w-24 bg-gray-50 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
