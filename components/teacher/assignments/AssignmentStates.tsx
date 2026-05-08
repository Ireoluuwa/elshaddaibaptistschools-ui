"use client";

import React from "react";
import { Search, Loader2, AlertCircle } from "lucide-react";

export const AssignmentSkeleton = () => (
  <div className="px-6 py-5 animate-pulse border-b border-gray-50 last:border-0">
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <div className="h-4 w-1/3 bg-gray-100 rounded mb-2" />
        <div className="h-3 w-1/2 bg-gray-50 rounded mb-4" />
        <div className="flex gap-4">
          <div className="h-2 w-20 bg-gray-50 rounded" />
          <div className="h-2 w-20 bg-gray-50 rounded" />
        </div>
      </div>
      <div className="h-6 w-16 bg-gray-50 rounded-lg" />
    </div>
  </div>
);

export const AssignmentEmptyState = () => (
  <div className="px-6 py-24 text-center flex flex-col items-center gap-4">
    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
      <Search size={28} />
    </div>
    <div className="flex flex-col gap-1">
      <p className="text-gray-500 font-bold text-sm">No assignments found</p>
      <p className="text-gray-400 text-xs">Try adjusting your search or filters</p>
    </div>
  </div>
);

export const AssignmentErrorState = ({ message }: { message: string }) => (
  <div className="px-6 py-24 text-center flex flex-col items-center gap-4 bg-red-50/30">
    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-300">
      <AlertCircle size={28} />
    </div>
    <div className="flex flex-col gap-1">
      <p className="text-red-600 font-bold text-sm">Oops! Something went wrong</p>
      <p className="text-red-400 text-xs">{message}</p>
    </div>
  </div>
);

export const AssignmentLoadingMore = () => (
  <div className="p-10 flex justify-center bg-gray-50/5">
    <div className="flex items-center gap-3 text-[#006442] animate-in fade-in zoom-in duration-300">
      <Loader2 size={20} className="animate-spin" />
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">
        Fetching more assignments...
      </span>
    </div>
  </div>
);
