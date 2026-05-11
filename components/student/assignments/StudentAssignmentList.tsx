"use client";

import React, { useState } from "react";
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
import { useStudentAssignments } from "@/hooks/assignment.hooks";

export default function StudentAssignmentList() {
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useStudentAssignments(page);

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

  const assignments = data?.data || [];

  return (
    <div className="min-h-[400px]">
      {/* Assignment List */}
      <div className="divide-y divide-gray-100">
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
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
                      Deadline: <span className="text-gray-500 font-bold">{new Date(assignment.dueDate).toLocaleDateString()}</span>
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

      {/* Pagination Placeholder (if needed in future) */}
      {data?.meta && data.meta.totalPages > 1 && (
        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
             Page {data.meta.currentPage} of {data.meta.totalPages}
           </p>
           <div className="flex gap-2">
             <button 
               disabled={page === 1}
               onClick={() => setPage(p => p - 1)}
               className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-gray-50 rounded-lg disabled:opacity-30 transition-all"
             >
               Prev
             </button>
             <button 
               disabled={page === data.meta.totalPages}
               onClick={() => setPage(p => p + 1)}
               className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white bg-[#006442] rounded-lg disabled:opacity-30 transition-all"
             >
               Next
             </button>
           </div>
        </div>
      )}
    </div>
  );
}

function AssignmentListSkeleton() {
  return (
    <div className="divide-y divide-gray-50 animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="py-6 flex flex-col gap-3">
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
