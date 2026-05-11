"use client";

import React, { useState, useEffect } from "react";
import { Search, Trash2, Paperclip, Pencil } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useAssignments, useDeleteAssignment } from "@/hooks/assignment.hooks";
import { 
  AssignmentSkeleton, 
  AssignmentEmptyState, 
  AssignmentErrorState, 
  AssignmentLoadingMore 
} from "./AssignmentStates";
import CreateAssignment from "./CreateAssignment";
import ConfirmModal from "@/components/shared/ConfirmModal";

const AssignmentList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editingAssignment, setEditingAssignment] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error
  } = useAssignments(debouncedSearch, statusFilter);

  const { mutate: deleteAssignment, isPending: isDeleting } = useDeleteAssignment();
  const { ref, inView } = useInView();

  // Debounce search to prevent API spam
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Infinite scroll trigger
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const assignments = data?.pages.flatMap(page => (page as any)?.data || (page as any)?.items || []) || [];

  const statusBadge = (dueDate: string) => {
    if (!dueDate) return null;
    const date = new Date(dueDate);
    if (isNaN(date.getTime())) return null;

    const isPastDue = date < new Date();
    const style = isPastDue 
      ? "text-red-600 bg-red-50" 
      : "text-emerald-700 bg-emerald-50";
    
    return (
      <span className={`inline-flex px-2.5 py-1 rounded-lg text-[11px] font-bold ${style}`}>
        {isPastDue ? "Past Due" : "Active"}
      </span>
    );
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = () => {
    if (deletingId) {
      deleteAssignment(deletingId, {
        onSuccess: () => setDeletingId(null),
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Edit Modal */}
      {editingAssignment && (
        <CreateAssignment 
          initialData={editingAssignment} 
          onClose={() => setEditingAssignment(null)} 
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal 
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={confirmDelete}
        isPending={isDeleting}
        title="Delete Assignment"
        message="Are you sure you want to delete this assignment? This action cannot be undone and students will no longer be able to access it."
        confirmText="Delete Assignment"
        variant="danger"
      />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col max-h-[800px]">
        {/* Search & Filter Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
          <div className="relative w-full sm:max-w-xs">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 h-9 rounded-lg border border-gray-200 focus:border-[#006442] focus:ring-1 focus:ring-[#006442] outline-none text-sm transition-all bg-white"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-3 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-[#006442] transition-all cursor-pointer font-medium text-gray-600"
          >
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Past Due">Past Due</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        {/* Assignment Items - Scrollable Container */}
        <div className="divide-y divide-gray-100 overflow-y-auto custom-scrollbar flex-1">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <AssignmentSkeleton key={i} />)
          ) : isError ? (
            <AssignmentErrorState message={error?.message || "Something went wrong"} />
          ) : assignments.length > 0 ? (
            <>
              {assignments.map((assignment, index) => (
                <div
                  key={assignment.id || `assignment-${index}`}
                  className="px-5 sm:px-6 py-5 hover:bg-gray-50/50 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="text-sm font-bold text-[#0e2e1d] truncate group-hover:text-[#006442] transition-colors">
                          {assignment.title}
                        </h3>
                        {assignment.attachmentUrl && (
                          <Paperclip size={13} className="text-gray-400 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-1 mb-3">
                        {assignment.description}
                      </p>
                      <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider font-bold">
                        <div className="flex items-center gap-1.5">
                          <span className="text-gray-300">Start:</span>
                          <span className="text-gray-500">{new Date(assignment.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-gray-300">Due:</span>
                          <span className="text-gray-500">{new Date(assignment.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 shrink-0">
                      {statusBadge(assignment.dueDate)}
                      <div className="flex items-center gap-1 ml-2">
                        <button 
                          onClick={() => setEditingAssignment(assignment)}
                          className="p-1.5 text-gray-400 hover:text-[#006442] hover:bg-[#f0f7f4] rounded-lg transition-all"
                        >
                          <Pencil size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(assignment.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Infinite Scroll Trigger */}
              <div ref={ref}>
                {isFetchingNextPage && <AssignmentLoadingMore />}
                {!hasNextPage && assignments.length > 5 && (
                  <div className="p-8 text-center">
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em]">
                      End of list
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <AssignmentEmptyState />
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentList;
